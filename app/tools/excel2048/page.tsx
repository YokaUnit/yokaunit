import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import Excel2048ClientPage from "./Excel2048ClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("excel2048", {
    title: "Excel風2048｜エクセルそっくり見た目の2048パズルゲーム・仕事中でもバレない無料ゲーム | yokaunit",
    description:
      "【完全無料】Microsoft Excelそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。スプレッドシート風のインターフェースでこっそり2048に挑戦。登録不要・ブラウザですぐプレイ。",
    keywords: [
      "Excel風2048",
      "エクセル2048",
      "隠しゲーム",
      "仕事中ゲーム",
      "バレないゲーム",
      "2048パズル",
      "スプレッドシート風ゲーム",
      "Excel風インターフェース",
      "オフィス風ゲーム",
      "Microsoft Excel",
      "表計算ソフト風",
      "偽装ゲーム",
      "ステルスゲーム",
      "カモフラージュゲーム",
      "会社でゲーム",
      "職場ゲーム",
      "休憩時間ゲーム",
      "ブラウザゲーム",
      "無料ゲーム",
      "パズルゲーム",
      "数字パズル",
      "論理ゲーム",
      "頭脳ゲーム",
      "YokaUnit",
      "ヨカユニット",
      "ウェブゲーム",
      "HTML5ゲーム",
      "レスポンシブゲーム",
      "モバイル対応",
      "スマホゲーム",
      "タブレット対応",
      "Excel偽装",
      "スプレッドシート偽装",
      "作業風画面",
      "Excel見た目",
      "表計算風",
      "セル操作",
      "ワークシート",
      "Microsoft Office風",
      "Office365風",
      "仕事風ゲーム",
      "業務風ゲーム",
      "こっそりゲーム",
      "内緒ゲーム",
      "職場でバレないゲーム",
      "在宅勤務の息抜き",
      "マイクロブレイク",
      "短時間リフレッシュ",
      "こっそり遊べる",
    ],
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
      canonical: "https://yokaunit.com/tools/excel2048",
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: "https://yokaunit.com/tools/excel2048",
      siteName: "YokaUnit",
      title: "Excel風2048｜エクセルそっくり見た目の2048パズルゲーム・仕事中でもバレない無料ゲーム",
      description: "【完全無料】Microsoft Excelそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。スプレッドシート風のインターフェースでこっそり2048に挑戦。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "Excel風2048📊｜エクセルそっくり見た目の2048パズルゲーム",
      description: "Microsoft Excelそっくりな見た目の2048パズルゲーム🎮 仕事中でも上司にバレずにゲームを楽しめる隠しゲーム💼 スプレッドシート風のインターフェース📋 完全無料🆓",
    },
    verification: {
      google: "your-google-verification-code",
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=no",
    },
  })
}

export default async function Excel2048Page() {
  const today = new Date().toISOString().split("T")[0]
  const imageUrl = await getToolImageUrl("excel2048")
  const tool = await getToolBySlug("excel2048")
  const toolImageUrl = tool?.image_url || null
  
  const webApplicationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Excel風2048",
    description: "Microsoft Excelそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。スプレッドシート風のインターフェースでこっそり2048に挑戦。",
    url: "https://yokaunit.com/tools/excel2048",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "HTML5, JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    featureList: [
      "Microsoft Excelそっくりの見た目",
      "2048パズルゲーム",
      "仕事中でもバレにくいデザイン",
      "スプレッドシート風インターフェース",
      "完全無料・登録不要",
      "スマホ・PC対応",
      "キーボード操作対応"
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
        name: "Excel風2048は無料で遊べますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。"
        }
      },
      {
        "@type": "Question",
        name: "本当にExcelそっくりに見えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、Microsoft Excelのスプレッドシート風のデザインを採用しており、一見すると表計算ソフトのように見えます。ただし、実際のExcelではありませんので、その点はご注意ください。"
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
        name: "2048のルールを教えてください",
        acceptedAnswer: {
          "@type": "Answer",
          text: "同じ数字のタイルを合わせることで、より大きな数字を作っていくパズルゲームです。矢印キーまたはスワイプでタイルを動かし、2048のタイルを作ることが目標です。"
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
      <ViewCounter toolSlug="excel2048" />
      <Excel2048ClientPage toolImageUrl={toolImageUrl} toolTitle={tool?.title || "Excel風2048"} />
      <ScrollToTop />
    </>
  )
}
