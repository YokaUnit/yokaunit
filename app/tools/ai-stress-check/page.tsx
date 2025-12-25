import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import AIStressCheckClientPage from "./AIStressCheckClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ai-stress-check", {
    title: "AIストレス耐性診断｜AIが分析するメンタル強度・回復力チェック - YokaUnit",
    description: "AIがあなたのストレス耐性・メンタルの強さ・回復力を無料診断。6つの質問で仕事・人間関係・プレッシャーへの強さをAI分析。登録不要・スマホ対応で今すぐチェック！",
    keywords: [
      "AIストレス耐性診断",
      "AIストレスチェック",
      "ストレス耐性テスト",
      "ストレス診断 無料",
      "メンタル強度診断",
      "AIメンタルチェック",
      "AI心理テスト",
      "AIストレス分析",
      "AIメンタル診断",
      "AIメンタルヘルス",
      "AIストレス測定",
      "AI回復力診断",
      "AIレジリエンス診断",
      "ストレス自己診断",
      "AIストレス耐性テスト",
      "AIストレス対処法",
      "AIメンタル強化",
      "AI心理分析",
      "ストレス耐性チェック",
      "AIメンタルケア"
    ],
    openGraph: {
      title: "AIストレス耐性診断｜無料AI診断で心の強さをチェック",
      description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。仕事・人間関係・変化への対応力をAIがチェックし、個別アドバイスを提供。",
      url: "https://yokaunit.com/tools/ai-stress-check",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "AIストレス耐性診断｜無料AI診断で心の強さをチェック",
      description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。",
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/ai-stress-check"
    },
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

export default async function AIStressCheckPage() {
  const today = new Date().toISOString().split("T")[0]
  const imageUrl = await getToolImageUrl("ai-stress-check")
  const tool = await getToolBySlug("ai-stress-check")
  const toolImageUrl = tool?.image_url || null
  
  const webApplicationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AIストレス耐性診断",
    description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。",
    url: "https://yokaunit.com/tools/ai-stress-check",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    browserRequirements: "HTML5, JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    featureList: [
      "AIによるストレス耐性の分析",
      "6つの質問で簡単診断",
      "メンタル強度・回復力・プレッシャー耐性の評価",
      "個別化されたアドバイス",
      "完全無料・登録不要",
      "スマホ・PC対応",
      "プライバシー保護"
    ],
    screenshot: imageUrl,
    image: [imageUrl],
    author: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
    publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
    datePublished: tool?.created_at || "2024-01-01",
    dateModified: tool?.updated_at || today,
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "AIストレス耐性診断は無料ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
        }
      },
      {
        "@type": "Question",
        name: "診断結果は信頼できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "心理学的理論に基づいたAI分析システムを使用しており、参考値として信頼性の高い結果を提供しています。ただし、診断結果は参考値として活用することをお勧めします。"
        }
      },
      {
        "@type": "Question",
        name: "どのくらい時間がかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "6つの質問に答えるだけで、数分程度で診断結果が表示されます。"
        }
      },
      {
        "@type": "Question",
        name: "診断結果は保存されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いいえ、診断結果はブラウザに保存されません。プライバシーを保護しています。"
        }
      },
      {
        "@type": "Question",
        name: "スマホからでも診断できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、スマホ・タブレット・PCのすべてのデバイスからご利用いただけます。レスポンシブデザインで最適化されています。"
        }
      }
    ]
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd),
        }}
      />
      <ViewCounter toolSlug="ai-stress-check" />
      <AIStressCheckClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "AIストレス耐性診断"} />
      <ScrollToTop />
    </>
  )
}
