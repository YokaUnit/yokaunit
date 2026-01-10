# Supabase使用量分析レポート

## 🔍 調査結果サマリー

Supabaseの無料枠をオーバーしている原因として、以下のツール/機能が最もキャパシティを消費している可能性が高いです。

## ⚠️ 最も問題の可能性が高いツール

### 1. **onsenmap（温泉マップ）ツール** - 🔴 最優先で対策が必要

**問題点：**
- `getOnsenData()` が `select("*")` で全温泉データを取得
- 同じデータを複数回取得している

**具体的な使用箇所：**

#### `app/tools/onsenmap/[slug]/page.tsx`
```typescript
// 問題: 同じ関数が3回も呼び出されている
export async function generateMetadata({ params }) {
  const onsens = await getOnsenDataSorted()  // 1回目
  // ...
}

export async function generateStaticParams() {
  const onsens = await getOnsenDataSorted()  // 2回目
  // ...
}

export default async function OnsenDetailPage({ params }) {
  const onsens = await getOnsenDataSorted()  // 3回目
  // ...
}
```

**影響：**
- 各温泉詳細ページで3回も全温泉データを取得
- ビルド時（generateStaticParams）とランタイム（generateMetadata、default export）の両方で実行
- 温泉データが100件ある場合、1ページあたり300回のクエリ相当

#### `app/tools/onsenmap/OnsenMapClient.tsx`
```typescript
// クライアントサイドでページロード時に実行
useEffect(() => {
  const [onsenData, accommodationData] = await Promise.all([
    getOnsenDataSorted(),  // 全温泉データ取得
    getAccommodationData()  // 楽天API呼び出し（重い処理）
  ])
}, [])
```

**影響：**
- メインページのロード時に毎回全温泉データを取得
- データ量が多い可能性（全カラムを取得）

---

### 2. **ツール一覧関連** - 🟡 中程度の影響

**問題点：**
- `getTools()` が複数の場所で呼び出される
- ホームページやツール一覧ページで頻繁に実行される

**具体的な使用箇所：**

#### `app/tools/page.tsx`
```typescript
// 全ツールを一度に取得
const { tools: fetchedTools } = await getTools({})
```

#### `components/tools-showcase.tsx`
```typescript
// 並列で2回のクエリを実行
const [popularResult, newResult] = await Promise.all([
  getTools({ limit: displayCount, isPopular: true }),
  getTools({ limit: displayCount + 5, userRole: "basic" })
])
```

**影響：**
- ホームページやツール一覧ページで複数回クエリが実行される
- ただし、`limit`が設定されているため、全データ取得ではない

---

### 3. **認証関連** - 🟢 軽度の影響

**問題点：**
- 全ページで認証状態をチェック
- プロフィール取得が頻繁に実行される

**影響：**
- 軽量なクエリだが、全ページで実行されるため累積で影響がある可能性

---

## 📊 推奨される対策

### 優先度1: onsenmapツールの最適化（最優先）

#### 対策1: データ取得の最適化
```typescript
// 現在: 全カラムを取得
select("*")

// 推奨: 必要なカラムのみ取得
select("id, slug, name, description, region, latitude, longitude, ranking, rating, image_url")
```

#### 対策2: キャッシュの実装
- Next.jsのキャッシュ機能を活用
- `generateStaticParams`で取得したデータを再利用

#### 対策3: 重複取得の削減
```typescript
// [slug]/page.tsx を最適化
// 1回の取得で3つの関数にデータを渡す
```

#### 対策4: ページネーションの導入
- 全データを一度に取得せず、必要な分だけ取得
- 地図表示時は表示範囲内のデータのみ取得

### 優先度2: ツール一覧の最適化

#### 対策1: クエリの統合
- 複数の`getTools()`呼び出しを1回に統合
- クライアントサイドでフィルタリング

#### 対策2: キャッシュの強化
- ISR（Incremental Static Regeneration）の活用
- データ更新頻度に応じたキャッシュ期間の設定

### 優先度3: 全体的な最適化

#### 対策1: クエリの最適化
- `select("*")` を避け、必要なカラムのみ取得
- インデックスの確認と追加

#### 対策2: リアルタイム機能の見直し
- 不要なリアルタイム購読を削除
- 必要な場合のみリアルタイム機能を使用

#### 対策3: ストレージ使用量の確認
- 画像ファイルのサイズ最適化
- 不要なファイルの削除

---

## 🔧 即座に実施できる対策

1. **onsenmapツールの`[slug]/page.tsx`を修正**
   - 3回の`getOnsenDataSorted()`呼び出しを1回に統合
   - データを共有する仕組みを実装

2. **`select("*")`を必要なカラムのみに変更**
   - `getOnsenData()`のクエリを最適化
   - データ転送量を削減

3. **Next.jsのキャッシュを活用**
   - `unstable_cache`や`revalidate`を使用
   - ビルド時のデータ取得を最適化

---

## 📈 期待される効果

- **onsenmapツールの最適化**: 約70-80%の使用量削減が期待できる
- **ツール一覧の最適化**: 約20-30%の使用量削減が期待できる
- **全体的な最適化**: 累積で10-20%の使用量削減が期待できる

---

## 🎯 次のステップ

1. onsenmapツールの`[slug]/page.tsx`を最優先で修正
2. `getOnsenData()`のクエリを最適化（必要なカラムのみ取得）
3. キャッシュ機能の実装
4. 他のツールでも同様の問題がないか確認

