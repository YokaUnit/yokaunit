# SEO実装ガイド

このドキュメントでは、作成したSEOコンポーネントとユーティリティの使用方法を説明します。

## 作成したコンポーネント・ユーティリティ

### 1. 構造化データユーティリティ (`lib/seo/structured-data.ts`)

#### `generateWebApplicationStructuredData()`
ツールページ用のWebApplication構造化データを生成します。

```typescript
import { generateWebApplicationStructuredData } from "@/lib/seo/structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import { StructuredDataScriptServer } from "@/components/seo/structured-data-script"

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug)
  
  const structuredData = generateWebApplicationStructuredData(tool, {
    applicationCategory: "GameApplication", // オプション
    featureList: [
      "無料で利用可能",
      "登録不要",
      "ブラウザで即利用可能",
      // ツール固有の機能
    ],
    browserRequirements: "HTML5, JavaScript", // オプション
  })

  return (
    <>
      {structuredData && (
        <StructuredDataScriptServer 
          data={structuredData} 
          id="webapplication-structured-data" 
        />
      )}
      {/* ページコンテンツ */}
    </>
  )
}
```

#### `generateBreadcrumbStructuredData()`
パンくずリストの構造化データを生成します（既に`Breadcrumbs`コンポーネントに組み込み済み）。

#### `generateFAQStructuredData()`
FAQページの構造化データを生成します（`FAQSection`コンポーネントで使用）。

#### `generateOrganizationStructuredData()` / `generateWebSiteStructuredData()`
サイト全体の構造化データ（`app/layout.tsx`に既に追加済み）。

---

### 2. 内部リンクコンポーネント (`components/seo/internal-links.tsx`)

#### `RelatedTools`
関連ツールを表示するコンポーネント（内部リンク強化用）。

```typescript
import { RelatedTools } from "@/components/seo/internal-links"

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug)
  
  return (
    <div>
      {/* メインコンテンツ */}
      
      {/* 関連ツールセクション */}
      <RelatedTools
        currentToolSlug={tool.slug}
        category={tool.category}
        limit={6}
        title="関連ツール"
      />
    </div>
  )
}
```

#### `CategoryToolsList`
カテゴリー内のツール一覧を表示（カテゴリーページ用）。

```typescript
import { CategoryToolsList } from "@/components/seo/internal-links"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <div>
      <h1>{params.category}のツール</h1>
      <CategoryToolsList 
        category={params.category}
        limit={12}
      />
    </div>
  )
}
```

---

### 3. FAQセクション (`components/seo/faq-section.tsx`)

FAQセクションを表示し、自動的にFAQ構造化データを追加します。

```typescript
import { FAQSection } from "@/components/seo/faq-section"

const faqs = [
  {
    question: "このツールは無料ですか？",
    answer: "はい、完全に無料でご利用いただけます。登録も不要です。",
  },
  {
    question: "スマホで使えますか？",
    answer: "はい、スマートフォンやタブレットでも利用可能です。",
  },
  // 追加のFAQ...
]

export default function ToolPage() {
  return (
    <div>
      {/* メインコンテンツ */}
      
      <FAQSection faqs={faqs} title="よくある質問" />
    </div>
  )
}
```

---

## 実装手順：ツールページの改善例

### ステップ1: 構造化データの追加

既存のツールページ（例：`app/tools/ai-seishinnenrei/page.tsx`）に構造化データを追加：

```typescript
import { getToolBySlug } from "@/lib/actions/tools"
import { generateWebApplicationStructuredData } from "@/lib/seo/structured-data"
import { StructuredDataScriptServer } from "@/components/seo/structured-data-script"

export default async function AiSeishinnenreiPage() {
  const tool = await getToolBySlug("ai-seishinnenrei")
  
  const structuredData = generateWebApplicationStructuredData(tool, {
    applicationCategory: "LifestyleApplication",
    featureList: [
      "AIによる心理年齢診断",
      "5つの質問で即診断",
      "完全無料・登録不要",
      "スマホ対応",
    ],
  })

  return (
    <>
      {structuredData && (
        <StructuredDataScriptServer 
          data={structuredData} 
          id="webapplication-structured-data" 
        />
      )}
      {/* 既存のコンテンツ */}
    </>
  )
}
```

### ステップ2: 関連ツールの追加

ツールページの下部に関連ツールセクションを追加：

```typescript
import { RelatedTools } from "@/components/seo/internal-links"

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug)
  
  return (
    <div>
      {/* メインコンテンツ */}
      
      {/* ページ下部に追加 */}
      <RelatedTools
        currentToolSlug={tool.slug}
        category={tool.category}
        limit={6}
      />
    </div>
  )
}
```

### ステップ3: FAQセクションの追加

主要なツールページにFAQセクションを追加：

```typescript
import { FAQSection } from "@/components/seo/faq-section"

const faqs = [
  {
    question: "AI精神年齢診断とは何ですか？",
    answer: "5つの質問に答えるだけで、AIがあなたの心理年齢を診断する無料ツールです。",
  },
  {
    question: "結果はどのように表示されますか？",
    answer: "診断結果は、あなたの心理年齢とともに、性格の特徴を説明します。",
  },
  {
    question: "診断結果は保存されますか？",
    answer: "いいえ、診断結果はブラウザに保存されません。プライバシーを保護しています。",
  },
]

export default function ToolPage() {
  return (
    <div>
      {/* メインコンテンツ */}
      
      <FAQSection faqs={faqs} />
    </div>
  )
}
```

### ステップ4: 詳細な説明セクションの追加

各ツールページに500-1000文字程度の詳細な説明セクションを追加：

```typescript
export default function ToolPage() {
  return (
    <div>
      {/* ツールのメイン機能 */}
      
      {/* 詳細説明セクション */}
      <section className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">このツールについて</h2>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            AI精神年齢診断は、5つの簡単な質問に答えるだけで、
            あなたの心理年齢をAIが診断する無料のオンラインツールです。
          </p>
          <p>
            このツールは、心理学の研究に基づいたアルゴリズムを使用しており、
            あなたの回答パターンから心理年齢を分析します。
          </p>
          {/* さらに詳細な説明を追加 */}
        </div>
      </section>
      
      {/* 使い方セクション */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">使い方</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>「診断を開始」ボタンをクリック</li>
          <li>5つの質問に正直に答える</li>
          <li>診断結果を確認する</li>
        </ol>
      </section>
    </div>
  )
}
```

---

## カテゴリーページの作成

新しいカテゴリーページを作成して、カテゴリーごとのランディングページを実装：

```typescript
// app/tools/category/[category]/page.tsx
import { Metadata } from "next"
import { CategoryToolsList } from "@/components/seo/internal-links"
import { getTools } from "@/lib/actions/tools"

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  return {
    title: `${params.category}のツール一覧`,
    description: `${params.category}カテゴリーの無料オンラインツール一覧。YokaUnitで${params.category}に関する便利なツールを見つけましょう。`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { tools } = await getTools({ category: params.category })
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{params.category}のツール</h1>
      <p className="text-gray-600 mb-8">
        {params.category}カテゴリーの便利なツール一覧です。すべて無料で、登録不要ですぐに使えます。
      </p>
      
      <CategoryToolsList category={params.category} limit={20} />
    </div>
  )
}
```

---

## チェックリスト

各ツールページで以下を確認：

- [ ] WebApplication構造化データが追加されている
- [ ] パンくずリストが表示されている（既に実装済み）
- [ ] 関連ツールセクションが追加されている
- [ ] FAQセクションが追加されている（主要ツールのみ）
- [ ] 詳細な説明セクション（500-1000文字）が追加されている
- [ ] メタタグ（title, description）が最適化されている
- [ ] Canonical URLが設定されている

---

## 次のステップ

1. **優先度の高いツールページから順に改善**
   - 人気ツール（`is_popular = true`）
   - 新着ツール（`is_new = true`）

2. **カテゴリーページの作成**
   - `/tools/category/[category]` ルートの実装

3. **コンテンツの継続的な拡充**
   - 各ツールページの説明を段階的に拡充
   - FAQの追加

4. **モニタリング**
   - Google Search Consoleでインデックス状況を確認
   - 検索流入の推移を分析
