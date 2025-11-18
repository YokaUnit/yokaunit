import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
import Connect4ClientPage from "./Connect4ClientPage"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("connect4", {
    title: "コネクトフォー｜4つ並べ・4目並べゲーム【無料・登録不要】",
    description:
      "コネクトフォー（4つ並べ・4目並べ）ゲーム！上からコインを落として、横・縦・斜めで4つ揃えて勝利しよう。スムーズなアニメーションで楽しめる無料・登録不要のブラウザゲーム。",
    keywords: [
      "コネクトフォー",
      "4つ並べ",
      "4目並べ",
      "4つ揃え",
      "コネクト4",
      "connect4",
      "connect four",
      "4目並べゲーム",
      "4つ並べゲーム",
      "コインゲーム",
      "無料ゲーム",
      "ブラウザゲーム",
      "2人対戦ゲーム",
      "パズルゲーム",
      "ボードゲーム",
      "戦略ゲーム",
      "無料ツール",
      "登録不要",
      "YokaUnit",
      "ヨカユニット",
      "便利ツール",
      "オンラインツール",
    ],
    openGraph: {
      title: "コネクトフォー｜4つ並べ・4目並べゲーム【無料・登録不要】",
      description:
        "コネクトフォー（4つ並べ・4目並べ）ゲーム！上からコインを落として、横・縦・斜めで4つ揃えて勝利しよう。スムーズなアニメーションで楽しめる無料・登録不要のブラウザゲーム。",
      type: "website",
      url: "https://yokaunit.com/tools/connect4",
      siteName: "YokaUnit",
    },
    twitter: {
      card: "summary_large_image",
      title: "コネクトフォー🎯4つ並べ・4目並べゲーム",
      description:
        "コネクトフォー（4つ並べ・4目並べ）✨ 上からコインを落として、横・縦・斜めで4つ揃えて勝利しよう🎮 スムーズなアニメーションで楽しめる無料・登録不要のブラウザゲーム🆓",
      creator: "@yokaunit",
    },
    alternates: { canonical: "https://yokaunit.com/tools/connect4" },
    robots: { index: true, follow: true },
  })
}

export default async function Connect4Page() {
  const imageUrl = await getToolImageUrl("connect4")
  
  return (
    <>
      {/* 構造化データ - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "コネクトフォー｜4つ並べ・4目並べゲーム",
            "description": "コネクトフォー（4つ並べ・4目並べ）ゲーム！上からコインを落として、横・縦・斜めで4つ揃えて勝利しよう。スムーズなアニメーションで楽しめる無料・登録不要のブラウザゲーム。",
            "url": "https://yokaunit.com/tools/connect4",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Any",
            "browserRequirements": "HTML5, JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY"
            },
            "featureList": [
              "4つ並べ・4目並べゲーム",
              "スムーズなコイン落下アニメーション",
              "2人対戦モード",
              "横・縦・斜めで4つ揃えて勝利",
              "完全無料・登録不要",
              "スマホ・PC対応",
              "レスポンシブデザイン"
            ],
            "screenshot": imageUrl,
            "image": [imageUrl],
            "author": {
              "@type": "Organization",
              "name": "YokaUnit",
              "url": "https://yokaunit.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "YokaUnit",
              "url": "https://yokaunit.com"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
          })
        }}
      />

      {/* 構造化データ - Game */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            "name": "コネクトフォー｜4つ並べ・4目並べゲーム",
            "description": "コネクトフォー（4つ並べ・4目並べ）は、7×6のグリッドに交互にコインを落とし、横・縦・斜めで4つ揃えたら勝利する2人対戦のボードゲームです。",
            "url": "https://yokaunit.com/tools/connect4",
            "image": "https://yokaunit.com/ogp/yokaunit-common.png",
            "genre": ["ボードゲーム", "パズルゲーム", "戦略ゲーム", "2人対戦ゲーム"],
            "numberOfPlayers": "2",
            "playMode": "MultiPlayer",
            "gamePlatform": ["Web Browser", "Mobile Web"],
            "operatingSystem": ["Any"],
            "applicationCategory": "Game",
            "isAccessibleForFree": true,
            "inLanguage": "ja-JP",
            "publisher": {
              "@type": "Organization",
              "name": "YokaUnit",
              "url": "https://yokaunit.com"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
          })
        }}
      />

      <ViewCounter toolSlug="connect4" />
      <Connect4ClientPage />
      <ScrollToTop />
    </>
  )
}

