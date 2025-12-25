import ChinchiroClientPage from "./ChinchiroClientPage"
import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("chinchiro", {
    title: "3Dチンチロサイコロ｜物理エンジンでリアルに転がる無料Webゲーム - YokaUnit",
    description:
      "【完全無料】物理エンジンでリアルに転がる3DチンチロサイコロのWebゲーム！ゾロ目・シゴロ・ヒフミ・しょんべん（枠外）も忠実に再現。スマホ・PC対応の無料ブラウザゲームで、登録不要・即プレイ可能。飲み会・パーティー・暇つぶしに最適なオンラインサイコロゲーム。",
    keywords:
      "チンチロ,チンチロリン,サイコロゲーム,3Dサイコロ,無料ブラウザゲーム,Webゲーム,オンラインサイコロ,物理演算,リアルな動き,しょんべん,スマホでも遊べるゲーム,飲み会ミニゲーム,サイコロシミュレーター,Webサイコロ,ブラウザゲーム",
    openGraph: {
      title: "3Dチンチロサイコロ｜物理エンジンでリアルに転がる無料Webゲーム - YokaUnit",
      description:
        "【完全無料】物理エンジンでリアルに転がる3DチンチロサイコロのWebゲーム！ゾロ目・シゴロ・ヒフミ・しょんべんも忠実に再現。スマホ・PC対応の無料ブラウザゲームで、登録不要・即プレイ可能。",
      type: "website",
      url: "https://yokaunit.com/tools/chinchiro",
      siteName: "YokaUnit",
    },
    twitter: {
      card: "summary_large_image",
      title: "3Dチンチロサイコロ🎲物理エンジンでリアルに転がる無料Webゲーム",
      description:
        "【完全無料】物理エンジンでリアルに転がる3DチンチロサイコロのWebゲーム🎮 ゾロ目・シゴロ・ヒフミ・しょんべんも忠実に再現✨ スマホ・PC対応で登録不要・即プレイ可能🆓",
      creator: "@yokaunit",
    },
    alternates: { canonical: "https://yokaunit.com/tools/chinchiro" },
    robots: { index: true, follow: true },
  })
}

export default async function ChinchiroPage() {
  const imageUrl = await getToolImageUrl("chinchiro")
  const tool = await getToolBySlug("chinchiro")
  const toolImageUrl = tool?.image_url || null
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "3Dチンチロサイコロ",
            description: "物理エンジンでリアルに転がる3DチンチロサイコロのWebゲーム。ゾロ目・シゴロ・ヒフミ・しょんべん（枠外）も忠実に再現。スマホ・PC対応の無料ブラウザゲームで、登録不要・即プレイ可能。",
            url: "https://yokaunit.com/tools/chinchiro",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, WebGL, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug="chinchiro" />
      <ChinchiroClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "3Dチンチロサイコロ"} />
      <ScrollToTop />
    </>
  )
}
