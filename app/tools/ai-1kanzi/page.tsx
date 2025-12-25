import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import Ai1KanziClientPage from "./Ai1KanziClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ai-1kanzi", {
    title: "【30秒診断】性格を漢字1文字で診断｜悪い漢字も出るAI診断【無料・登録不要】",
    description:
      "AIが30秒で診断！5つの質問に答えるだけ。あなたの性格を漢字1文字で診断。「悪」「陰」「邪」など悪い漢字も出る可能性あり。登録不要・完全無料・10万人以上が利用中。結果をSNSでシェアしよう！",
    keywords:
      "AI漢字診断,性格診断,漢字1文字,性格分析,AI診断,無料診断,心理テスト,性格テスト,漢字診断,性格を漢字で表す,性格診断ツール,AI性格診断,無料性格診断,性格診断アプリ,自分を漢字で表す",
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
      canonical: "https://yokaunit.com/tools/ai-1kanzi",
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: "https://yokaunit.com/tools/ai-1kanzi",
      siteName: "YokaUnit",
      title: "【30秒診断】性格を漢字1文字で診断｜悪い漢字も出るAI診断【無料・登録不要】",
      description:
        "AIが30秒で診断！5つの質問に答えるだけ。あなたの性格を漢字1文字で診断。「悪」「陰」「邪」など悪い漢字も出る可能性あり。登録不要・完全無料・10万人以上が利用中。結果をSNSでシェアしよう！",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "【30秒診断】性格を漢字1文字で診断｜悪い漢字も出るAI診断【無料・登録不要】",
      description:
        "AIが30秒で診断！5つの質問に答えるだけ。あなたの性格を漢字1文字で診断。「悪」「陰」「邪」など悪い漢字も出る可能性あり。登録不要・完全無料・10万人以上が利用中。",
    },
    verification: {
      google: "your-google-verification-code",
    },
  })
}

export default async function Ai1KanziPage() {
  const imageUrl = await getToolImageUrl("ai-1kanzi")
  const tool = await getToolBySlug("ai-1kanzi")
  const toolImageUrl = tool?.image_url || null
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AIが診断！あなたの性格を漢字1文字で表すと？",
            description:
              "AIがあなたの性格を漢字1文字で診断。「悪」「陰」「邪」などの悪い漢字も出る可能性あり！5つの質問に答えるだけで、あなたの性格を最もよく表す漢字1文字を選びます。完全無料・登録不要・スマホ対応。",
            url: "https://yokaunit.com/tools/ai-1kanzi",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "漢字診断は無料ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
                }
              },
              {
                "@type": "Question",
                name: "診断結果は信頼できますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "心理学的理論に基づいたAI分析システムを使用しており、参考値として信頼性の高い結果を提供しています。"
                }
              },
              {
                "@type": "Question",
                name: "悪い漢字（悪・陰・邪など）も出る可能性がありますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "はい、「悪」「陰」「邪」「怠」「愚」「暗」「冷」「虚」「偽」「惰」などの悪い漢字も出る可能性があります。ただし、悪い漢字にもそれぞれ意味があり、ユーモアを交えて解説します。"
                }
              },
              {
                "@type": "Question",
                name: "スマホからでも診断できますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "はい、スマホ・タブレット・PCのすべてのデバイスからご利用いただけます。レスポンシブデザインで最適化されており、モバイルでも快適に診断できます。"
                }
              }
            ]
          }),
        }}
      />
      <ViewCounter toolSlug="ai-1kanzi" />
      <Ai1KanziClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "AIが診断！あなたの性格を漢字1文字で表すと？"} />
      <ScrollToTop />
    </>
  )
}

