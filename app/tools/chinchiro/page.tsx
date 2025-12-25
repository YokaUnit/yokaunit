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
  const today = new Date().toISOString().split("T")[0]
  const imageUrl = await getToolImageUrl("chinchiro")
  const tool = await getToolBySlug("chinchiro")
  const toolImageUrl = tool?.image_url || null
  
  const webApplicationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3Dチンチロサイコロ",
    description: "物理エンジンでリアルに転がる3DチンチロサイコロのWebゲーム。ゾロ目・シゴロ・ヒフミ・しょんべん（枠外）も忠実に再現。スマホ・PC対応の無料ブラウザゲームで、登録不要・即プレイ可能。",
    url: "https://yokaunit.com/tools/chinchiro",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "HTML5, WebGL, JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    featureList: [
      "リアルな3D物理エンジン",
      "ゾロ目・シゴロ・ヒフミ・しょんべんの再現",
      "美しいアニメーション",
      "完全無料・登録不要",
      "スマホ・PC対応",
      "レスポンシブデザイン"
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
        name: "チンチロは無料で遊べますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。"
        }
      },
      {
        "@type": "Question",
        name: "チンチロのルールを教えてください",
        acceptedAnswer: {
          "@type": "Answer",
          text: "3つのサイコロを振り、出目によって勝敗が決まります。ゾロ目（3つ同じ数字）が最も強く、シゴロ（4,5,6）、ヒフミ（1,2,3）の順で強いです。しょんべん（枠外）は負けとなります。"
        }
      },
      {
        "@type": "Question",
        name: "スマートフォンでも遊べますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、スマートフォン、タブレット、PCのどの端末でもご利用いただけます。レスポンシブデザインで最適化されています。"
        }
      },
      {
        "@type": "Question",
        name: "物理エンジンとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "リアルな物理法則に基づいてサイコロの動きをシミュレートする技術です。実際のサイコロを振ったような自然な動きと回転を再現しています。"
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
      <ViewCounter toolSlug="chinchiro" />
      <ChinchiroClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "3Dチンチロサイコロ"} />
      <ScrollToTop />
    </>
  )
}
