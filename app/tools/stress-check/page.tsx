import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import StressCheckClientPage from "./StressCheckClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("stress-check", {
    title: "ストレス耐性診断｜無料AI診断で心の強さをチェック - YokaUnit",
    description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。仕事・人間関係・変化への対応力をチェックし、個別アドバイスを提供。完全無料・登録不要でスマホ・PCから今すぐ診断！",
    keywords: [
    "ストレス耐性診断",
    "ストレス診断",
    "メンタル診断",
    "ストレス耐性",
    "ストレスチェック",
    "心理診断",
    "メンタルヘルス",
    "ストレス管理",
    "プレッシャー耐性",
    "回復力診断",
    "レジリエンス",
    "無料診断",
    "AI診断",
    "心の強さ",
    "ストレス対処法",
    "メンタル強化",
    "ストレス測定",
    "心理テスト",
    "ストレス分析",
    "メンタルケア"
    ],
    openGraph: {
      title: "ストレス耐性診断｜無料AI診断で心の強さをチェック",
      description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。仕事・人間関係・変化への対応力をチェックし、個別アドバイスを提供。",
      url: "https://yokaunit.com/tools/stress-check",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "ストレス耐性診断｜無料AI診断で心の強さをチェック",
      description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。"
    },
    alternates: { canonical: "https://yokaunit.com/tools/stress-check" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  })
}

export default async function StressCheckPage() {
  const imageUrl = await getToolImageUrl("stress-check")
  const tool = await getToolBySlug("stress-check")
  const toolImageUrl = tool?.image_url || null
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ストレス耐性診断",
            description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。",
            url: "https://yokaunit.com/tools/stress-check",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug="stress-check" />
      <StressCheckClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "ストレス耐性診断"} />
      <ScrollToTop />
    </>
  )
}
