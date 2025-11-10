import { Dice3DClientPage } from "./Dice3DClientPage"
import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("dice3d", {
    title: "サイコロ｜無料オンラインサイコロ・3Dサイコロシミュレーター - YokaUnit",
    description: "無料でサイコロを振れるオンラインツール。リアルな3D物理エンジンでサイコロを投げ、TRPG・ボードゲーム・すごろくに最適。1個から複数個まで同時に振れて、確率計算・統計機能付き。スマホ・PCで今すぐ使える！",
    keywords: [
      "サイコロ",
      "オンラインサイコロ",
      "サイコロ振り",
      "無料サイコロ",
      "3Dサイコロ",
      "サイコロシミュレーター",
      "ダイス",
      "dice",
      "サイコロゲーム",
      "TRPG サイコロ",
      "ボードゲーム サイコロ",
      "すごろく サイコロ",
      "サイコロアプリ",
      "サイコロツール",
      "ランダム サイコロ",
      "確率 サイコロ",
      "統計 サイコロ",
      "物理エンジン サイコロ",
      "リアル サイコロ",
      "バーチャル サイコロ",
      "デジタル サイコロ",
      "サイコロ 複数",
      "サイコロ 同時",
      "サイコロ 計算",
      "サイコロ 無料",
      "サイコロ オンライン",
      "サイコロ ブラウザ",
      "サイコロ スマホ",
      "サイコロ PC",
      "サイコロ ウェブ"
    ],
    openGraph: {
      title: "サイコロ｜無料オンラインサイコロ・3Dサイコロシミュレーター",
      description: "無料でサイコロを振れるオンラインツール。リアルな3D物理エンジンでサイコロを投げ、TRPG・ボードゲーム・すごろくに最適。1個から複数個まで同時に振れて、確率計算・統計機能付き。",
      url: "https://yokaunit.com/tools/dice3d",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "サイコロ🎲無料オンラインサイコロ・3Dサイコロシミュレーター",
      description: "無料でサイコロを振れるオンラインツール✨ リアルな3D物理エンジンでTRPG・ボードゲーム・すごろくに最適🎮 複数個同時に振れて統計機能付き📊",
      creator: "@yokaunit",
      site: "@yokaunit",
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/dice3d",
    },
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
    authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
    creator: "YokaUnit",
    publisher: "YokaUnit",
    category: "Games",
  })
}

export default function Dice3DPage() {
  return (
    <>
      {/* 構造化データ - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "無料オンラインサイコロ・3Dサイコロシミュレーター",
            "description": "無料でサイコロを振れるオンラインツール。リアルな3D物理エンジンでサイコロを投げ、TRPG・ボードゲーム・すごろくに最適。",
            "url": "https://yokaunit.com/tools/dice3d",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Any",
            "browserRequirements": "HTML5, WebGL, JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY"
            },
            "featureList": [
              "リアルな3D物理エンジン",
              "複数サイコロ同時投げ",
              "TRPG・ボードゲーム対応",
              "確率計算・統計機能",
              "スマホ・PC対応",
              "完全無料・登録不要",
              "物理パラメーター調整",
              "結果履歴表示"
            ],
            "screenshot": "https://yokaunit.com/ogp/yokaunit-common.png",
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

      {/* 構造化データ - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "オンラインサイコロは無料で使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、完全無料でご利用いただけます。登録も不要で、ブラウザですぐにサイコロを振ることができます。"
                }
              },
              {
                "@type": "Question", 
                "name": "TRPGやボードゲームで使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、TRPG（テーブルトークRPG）やボードゲーム、すごろくなど様々なゲームでご利用いただけます。複数のサイコロを同時に振ることも可能です。"
                }
              },
              {
                "@type": "Question",
                "name": "スマートフォンでも使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、スマートフォン、タブレット、PCのどの端末でもご利用いただけます。レスポンシブデザインで最適化されています。"
                }
              },
              {
                "@type": "Question",
                "name": "何個までサイコロを同時に振れますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "複数個のサイコロを同時に振ることができます。物理エンジンによりリアルなサイコロの動きを再現しています。"
                }
              }
            ]
          })
        }}
      />

      {/* 構造化データ - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://yokaunit.com"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "ツール一覧",
                "item": "https://yokaunit.com/tools"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "サイコロ",
                "item": "https://yokaunit.com/tools/dice3d"
              }
            ]
          })
        }}
      />

      <ViewCounter toolSlug="dice3d" />
      <Dice3DClientPage />
      <ScrollToTop />
    </>
  )
}