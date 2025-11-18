import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import RouletteClientPage from "./RouletteClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("roulette", {
    title: "ルーレットメーカー｜最強の抽選アプリ・カスタマイズ可能 - YokaUnit",
    description: "カスタマイズ可能なルーレットメーカー。重み付け、複数当選、除外モードなど豊富な機能で、美しいアニメーションと直感的なUIを提供。完全無料・登録不要で今すぐ使える！",
    keywords: [
      "ルーレット",
      "ルーレットメーカー",
      "抽選",
      "ランダム",
      "くじ",
      "抽選ツール",
      "無料",
      "アニメーション",
      "重み付け",
      "確率",
      "複数当選",
      "除外モード",
      "カスタマイズ",
      "当選",
      "抽選アプリ",
      "ルーレットアプリ",
      "オンラインルーレット",
      "デジタルルーレット",
      "抽選システム",
      "ランダム選択",
      "ルーレットゲーム",
      "ルーレット作成",
      "ルーレット生成",
    ],
    authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
    creator: "YokaUnit",
    publisher: "YokaUnit",
    category: "Game",
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
      canonical: "https://yokaunit.com/tools/roulette",
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: "https://yokaunit.com/tools/roulette",
      siteName: "YokaUnit",
      title: "ルーレットメーカー｜最強の抽選アプリ・カスタマイズ可能",
      description: "カスタマイズ可能なルーレットメーカー。重み付け、複数当選、除外モードなど豊富な機能で、美しいアニメーションと直感的なUIを提供。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "🎰ルーレットメーカー｜最強の抽選アプリ・カスタマイズ可能",
      description: "カスタマイズ可能なルーレットメーカー✨ 重み付け・複数当選・除外モード対応🎯 美しいアニメーション付き🎬",
    },
    verification: {
      google: "your-google-verification-code",
    },
  })
}

export default async function RoulettePage() {
  const imageUrl = await getToolImageUrl("roulette")
  
  return (
    <>
      {/* 構造化データ - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ルーレットメーカー",
            "description": "カスタマイズ可能なルーレットメーカー。重み付け、複数当選、除外モードなど豊富な機能で、美しいアニメーションと直感的なUIを提供。",
            "url": "https://yokaunit.com/tools/roulette",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Any",
            "browserRequirements": "HTML5, JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY"
            },
            "featureList": [
              "カスタマイズ可能な項目設定",
              "重み付け抽選モード",
              "複数当選モード",
              "除外モード",
              "美しい3Dアニメーション",
              "抽選履歴の保存",
              "結果のシェア機能",
              "完全無料・登録不要",
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
                "name": "ルーレットメーカーは無料で使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに使用を開始できます。"
                }
              },
              {
                "@type": "Question",
                "name": "どのような抽選モードがありますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "通常モード（均等確率）、重み付けモード（確率調整）、複数当選モード（複数選択）、除外モード（1つ除外）の4つのモードがあります。"
                }
              },
              {
                "@type": "Question",
                "name": "項目の数に制限はありますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "項目の数に特に制限はありませんが、表示の都合上、適度な数（10-20個程度）を推奨しています。"
                }
              },
              {
                "@type": "Question",
                "name": "抽選履歴は保存されますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、最新50件までの抽選履歴が保存されます。ページをリロードすると履歴はリセットされます。"
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
                "name": "ルーレット",
                "item": "https://yokaunit.com/tools/roulette"
              }
            ]
          })
        }}
      />

      <ViewCounter toolSlug="roulette" />
      <RouletteClientPage />
      <ScrollToTop />
    </>
  )
}

