export interface SEOData {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  keywords?: string[]
  canonical?: string
}

export const defaultSEO: SEOData = {
  title: "YokaUnit - ユーザーの「あったらいいな」を実現するツール集",
  description:
    "SEO対策済みの便利なWebツールを多数公開中。パスワード生成、相性診断、ゲームなど、あなたの「あったらいいな」を実現します。",
  ogImage: "/ogp/logofull.png",
  twitterImage: "/ogp/logofull.png",
  keywords: [
    "Webツール",
    "無料ツール",
    "オンラインツール",
    "便利ツール",
    "パスワード生成",
    "相性診断",
    "ゲーム",
    "YokaUnit",
  ],
}

export function generateSEOData(data: Partial<SEOData>, baseUrl = "https://yokaunit.com"): SEOData {
  const seoData = { ...defaultSEO, ...data }

  return {
    ...seoData,
    ogTitle: seoData.ogTitle || seoData.title,
    ogDescription: seoData.ogDescription || seoData.description,
    ogUrl: seoData.ogUrl || baseUrl,
    ogImage: seoData.ogImage?.startsWith("http") ? seoData.ogImage : `${baseUrl}${seoData.ogImage}`,
    twitterTitle: seoData.twitterTitle || seoData.title,
    twitterDescription: seoData.twitterDescription || seoData.description,
    twitterImage: seoData.twitterImage?.startsWith("http") ? seoData.twitterImage : `${baseUrl}${seoData.twitterImage}`,
    canonical: seoData.canonical || baseUrl,
  }
}

export const toolSEOData = {
  password: {
    title: "強力パスワード生成ツール - 安全で覚えやすいパスワードを無料生成 | YokaUnit",
    description:
      "セキュリティ専門家推奨の強力パスワードを無料で生成。大文字・小文字・数字・記号を組み合わせた安全なパスワードを瞬時に作成。コピー機能付きで使いやすい。",
    keywords: ["パスワード生成", "強力パスワード", "セキュリティ", "パスワード作成", "安全", "無料ツール"],
  },
  chinchiro: {
    title: "チンチロリン - 本格サイコロゲーム無料プレイ | YokaUnit",
    description:
      "昔懐かしいチンチロリンゲームをブラウザで無料プレイ。3つのサイコロで役を作る伝統的なゲーム。ルール説明付きで初心者でも安心。",
    keywords: ["チンチロリン", "サイコロゲーム", "無料ゲーム", "ブラウザゲーム", "伝統ゲーム", "オンラインゲーム"],
  },
}
