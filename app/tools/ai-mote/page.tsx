import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import AiMoteClientPage from "./AiMoteClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ai-mote", {
    title: "【30秒診断】AIモテ度診断｜0-100%で数値化！恋愛モテ度をAI分析【無料・登録不要】",
    description:
      "AIが30秒で診断！3つの質問に答えるだけ。あなたのモテ度を0-100%で数値化。ポジティブ度・社交性・共感力を分析し、無限のモテタイプを判定。登録不要・完全無料・10万人以上が利用中。結果をSNSでシェアしよう！",
    keywords: "AIモテ度診断,恋愛診断,モテ度,AI診断,ポジティブ度,社交性,共感力,無料診断,恋愛相性,性格診断,恋愛タイプ,モテ度チェック,恋愛診断無料,AI恋愛診断,モテ度測定,恋愛心理テスト",
    authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
    creator: "YokaUnit",
    publisher: "YokaUnit",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/ai-mote",
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: "https://yokaunit.com/tools/ai-mote",
      siteName: "YokaUnit",
      title: "【30秒診断】AIモテ度診断｜0-100%で数値化！恋愛モテ度をAI分析【無料・登録不要】",
      description: "AIが30秒で診断！3つの質問に答えるだけ。あなたのモテ度を0-100%で数値化。ポジティブ度・社交性・共感力を分析し、無限のモテタイプを判定。登録不要・完全無料・10万人以上が利用中。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "【30秒診断】AIモテ度診断｜0-100%で数値化！恋愛モテ度をAI分析【無料・登録不要】",
      description: "AIが30秒で診断！3つの質問に答えるだけ。あなたのモテ度を0-100%で数値化。ポジティブ度・社交性・共感力を分析。登録不要・完全無料。",
    },
    verification: {
      google: "your-google-verification-code",
    },
  })
}

export default async function AiMotePage() {
  const imageUrl = await getToolImageUrl("ai-mote")
  const tool = await getToolBySlug("ai-mote")
  const toolImageUrl = tool?.image_url || null
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AIモテ度診断",
            description: "AIがあなたのモテ度を0-100%で数値化！ポジティブ度・社交性・共感力を最新AI技術で分析。",
            url: "https://yokaunit.com/tools/ai-mote",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug="ai-mote" />
      <AiMoteClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "AIモテ度診断"} />
      <ScrollToTop />
    </>
  )
}
