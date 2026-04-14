import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import SleepPostureCheckClientPage from "./SleepPostureCheckClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

const SLUG = "sleep-posture-check"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata(SLUG, {
    title: "あなたの首、もう限界かも？睡眠姿勢セルフチェック｜無料・約3分 - YokaUnit",
    description:
      "約3分・10問の選択式で、首まわりと睡眠環境の傾向タイプをチェック。寝姿勢・枕・朝の感覚・就寝前スマホなどから生活習慣のヒントを表示。医療診断ではなく目安として。無料・登録不要。",
    keywords: [
      "睡眠姿勢",
      "セルフチェック",
      "首",
      "枕",
      "寝姿勢",
      "横向き",
      "仰向け",
      "スマホ 首",
      "睡眠の質",
      "枕 選び方",
      "無料診断",
      "チェック",
    ],
    openGraph: {
      title: "あなたの首、もう限界かも？睡眠姿勢セルフチェック｜無料・約3分",
      description:
        "10問の選択式で首まわり×睡眠の傾向タイプをチェック。生活習慣のヒントを目安として表示します。",
      url: `https://yokaunit.com/tools/${SLUG}`,
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "あなたの首、もう限界かも？睡眠姿勢セルフチェック",
      description: "約3分で首まわりと睡眠環境の傾向をチェック。無料・登録不要。",
    },
    alternates: { canonical: `https://yokaunit.com/tools/${SLUG}` },
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
  })
}

export default async function SleepPostureCheckPage() {
  const imageUrl = await getToolImageUrl(SLUG)
  let tool = null
  let toolImageUrl: string | null = null
  try {
    tool = await getToolBySlug(SLUG)
    toolImageUrl = tool?.image_url || null
  } catch (error) {
    console.warn("Tool not found in database, using default values:", error)
  }

  const title = tool?.title || "あなたの首、もう限界かも？睡眠姿勢セルフチェック"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: title,
            description:
              "選択式の質問で首まわりと睡眠環境の傾向をチェックする無料ツール。医療診断ではありません。",
            url: `https://yokaunit.com/tools/${SLUG}`,
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug={SLUG} />
      <SleepPostureCheckClientPage toolImageUrl={toolImageUrl} toolTitle={title} />
      <ScrollToTop />
    </>
  )
}
