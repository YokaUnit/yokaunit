import type { Tool } from "@/lib/actions/tools"

// 相対パスを完全なURLに変換する関数
function getAbsoluteImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return "https://yokaunit.com/ogp/yokaunit-common.png"
  }
  
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }
  
  const baseUrl = "https://yokaunit.com"
  return imageUrl.startsWith("/") 
    ? `${baseUrl}${imageUrl}` 
    : `${baseUrl}/${imageUrl}`
}

/**
 * ツールのWebApplication構造化データを生成
 */
export function generateWebApplicationStructuredData(
  tool: Tool | null,
  options?: {
    applicationCategory?: string
    featureList?: string[]
    browserRequirements?: string
    additionalProperties?: Record<string, unknown>
  }
) {
  if (!tool) {
    return null
  }

  const imageUrl = getAbsoluteImageUrl(tool.image_url)
  const toolUrl = `https://yokaunit.com${tool.href}`

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: toolUrl,
    applicationCategory: options?.applicationCategory || "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: options?.browserRequirements || "HTML5, JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    featureList: options?.featureList || [
      "無料で利用可能",
      "登録不要",
      "ブラウザで即利用可能",
    ],
    screenshot: imageUrl,
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: "YokaUnit",
      url: "https://yokaunit.com",
    },
    publisher: {
      "@type": "Organization",
      name: "YokaUnit",
      url: "https://yokaunit.com",
    },
    datePublished: tool.created_at || "2024-01-01",
    dateModified: tool.updated_at || tool.created_at || new Date().toISOString(),
    ...options?.additionalProperties,
  }
}

/**
 * パンくずリスト構造化データを生成
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `https://yokaunit.com${item.url}`,
    })),
  }
}

/**
 * FAQ構造化データを生成
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Organization構造化データを生成
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YokaUnit",
    url: "https://yokaunit.com",
    logo: "https://yokaunit.com/ogp/yokaunit-common.png",
    description: "登録不要・今すぐ使える無料の便利ツール集",
    sameAs: [
      // SNSアカウントがあれば追加
      // "https://twitter.com/yokaunit",
      // "https://www.facebook.com/yokaunit",
    ],
  }
}

/**
 * WebSite構造化データを生成（サイト検索機能用）
 */
export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YokaUnit",
    url: "https://yokaunit.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yokaunit.com/tools?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Article構造化データを生成（ブログ記事用）
 */
export function generateArticleStructuredData(options: {
  headline: string
  description: string
  imageUrl?: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    image: options.imageUrl 
      ? getAbsoluteImageUrl(options.imageUrl)
      : "https://yokaunit.com/ogp/yokaunit-common.png",
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: {
      "@type": "Organization",
      name: options.author || "YokaUnit",
      url: "https://yokaunit.com",
    },
    publisher: {
      "@type": "Organization",
      name: "YokaUnit",
      url: "https://yokaunit.com",
      logo: {
        "@type": "ImageObject",
        url: "https://yokaunit.com/ogp/yokaunit-common.png",
      },
    },
  }
}
