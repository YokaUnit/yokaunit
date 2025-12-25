# 画像ストレージの使い方ガイド

## 現在の仕組み

### 1. データベース構造
- `tools`テーブルの`image_url`カラムに画像URLを保存
- URL形式: `https://zphkclbhhouulgfsfawi.supabase.co/storage/v1/object/public/toolsimage/tools/xxx.png`

### 2. 画像表示の流れ
```
toolsテーブル → image_url取得 → Next.js Imageコンポーネントで表示
```

### 3. Supabase Storageの構造
```
Bucket: toolsimage
  └── tools/
      ├── ai-seishinnenrei.png
      ├── ai-mote.png
      └── ...
```

## Supabase Storageの使い方

### バケットの設定（Supabase Dashboard）

1. **バケット作成**
   - Supabase Dashboard → Storage → New bucket
   - バケット名: `toolsimage`
   - Public: ✅ 有効（公開バケット）

2. **ポリシー設定（RLS）**
   ```sql
   -- 全員が読み取り可能
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'toolsimage');
   ```

### 画像アップロード方法

#### 方法1: Supabase Dashboardから手動アップロード
1. Supabase Dashboard → Storage → `toolsimage` → `tools`フォルダ
2. Upload files
3. アップロード後、URLをコピー
4. `tools`テーブルの`image_url`にURLを保存

#### 方法2: プログラムからアップロード（推奨）

```typescript
import { supabase } from "@/lib/supabase"

async function uploadToolImage(file: File, toolSlug: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${toolSlug}.${fileExt}`
  const filePath = `tools/${fileName}`

  // アップロード
  const { data, error } = await supabase.storage
    .from('toolsimage')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true // 既存ファイルを上書き
    })

  if (error) {
    throw error
  }

  // 公開URLを取得
  const { data: { publicUrl } } = supabase.storage
    .from('toolsimage')
    .getPublicUrl(filePath)

  return publicUrl
}
```

## 画像最適化の推奨事項

### 1. 画像サイズ
- **推奨サイズ**: 800×533px（3:2アスペクト比）
- **最大ファイルサイズ**: 500KB以下
- **形式**: WebP（推奨）またはPNG/JPEG

### 2. 画像の事前最適化
アップロード前に画像を最適化することを推奨：

```bash
# ImageMagickを使用（例）
convert input.png -resize 800x533 -quality 85 -format webp output.webp

# またはオンラインツール
# - Squoosh (https://squoosh.app/)
# - TinyPNG (https://tinypng.com/)
```

### 3. 複数サイズの生成（将来的に）
- サムネイル: 400×267px
- 中サイズ: 800×533px
- 大サイズ: 1536×1024px（OGP用）

## 現在の問題点と解決策

### 問題: 画像読み込みが遅い
**原因**:
1. 画像サイズが大きい（1536×1024px）
2. 最適化されていない
3. 同時に多数の画像を読み込んでいる

**解決策**:
1. ✅ 優先読み込みと遅延読み込みを実装済み
2. ⏳ 画像サイズを最適化（800×533px推奨）
3. ⏳ WebP形式への変換
4. ⏳ CDNの利用（将来的に）

## 実装例: 画像アップロード機能

管理画面に画像アップロード機能を追加する場合の実装例：

```typescript
// lib/actions/storage.ts
import { createServerSupabaseClient } from "@/lib/supabase"

export async function uploadToolImage(
  file: File,
  toolSlug: string
): Promise<string> {
  const supabase = createServerSupabaseClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${toolSlug}.${fileExt}`
  const filePath = `tools/${fileName}`

  // アップロード
  const { data, error } = await supabase.storage
    .from('toolsimage')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  // 公開URLを取得
  const { data: { publicUrl } } = supabase.storage
    .from('toolsimage')
    .getPublicUrl(filePath)

  return publicUrl
}

// ツールの画像URLを更新
export async function updateToolImageUrl(
  toolSlug: string,
  imageUrl: string
): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('tools')
    .update({ image_url: imageUrl })
    .eq('slug', toolSlug)

  if (error) throw error
}
```

