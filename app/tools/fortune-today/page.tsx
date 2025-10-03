import type { Metadata } from "next"
import FortuneTodayClientPage from "./FortuneTodayClientPage"

export const metadata: Metadata = {
  title: "今日の運勢｜無料占い・星座占い・恋愛運・仕事運・金運 - YokaUnit",
  description: "今日の運勢を無料で占える星座占いツール。12星座別に総合運・恋愛運・仕事運・金運を診断し、ラッキー行動とアドバイスを提供。毎日更新される運勢で今日一日を素敵に過ごそう。登録不要・完全無料でスマホ・PCから今すぐ占える！",
  keywords: [
    "今日の運勢",
    "無料占い",
    "星座占い",
    "恋愛運",
    "仕事運", 
    "金運",
    "総合運",
    "12星座",
    "占い無料",
    "今日の占い",
    "星座運勢",
    "運気",
    "ラッキー",
    "牡羊座",
    "牡牛座",
    "双子座",
    "蟹座",
    "獅子座",
    "乙女座",
    "天秤座",
    "蠍座",
    "射手座",
    "山羊座",
    "水瓶座",
    "魚座",
    "運勢 今日",
    "占い 今日",
    "星座 占い",
    "恋愛 運勢",
    "仕事 運勢",
    "金 運勢",
    "無料 占い",
    "占い 無料",
    "運勢 無料",
    "今日 ラッキー",
    "運気 アップ",
    "占い アプリ",
    "占い ツール",
    "毎日 占い",
    "デイリー占い",
    "スマホ 占い",
    "オンライン占い",
    "当たる占い",
    "人気占い"
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  category: "Lifestyle",
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
    canonical: "https://yokaunit.com/tools/fortune-today",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/fortune-today",
    siteName: "YokaUnit",
    title: "今日の運勢｜無料占い・星座占い・恋愛運・仕事運・金運",
    description: "今日の運勢を無料で占える星座占いツール。12星座別に総合運・恋愛運・仕事運・金運を診断し、ラッキー行動とアドバイスを提供。毎日更新される運勢で今日一日を素敵に過ごそう。",
    images: [
      {
        url: "/ogp/fortune-today.png",
        width: 1200,
        height: 630,
        alt: "今日の運勢占い - 無料星座占いツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "今日の運勢🔮無料占い・星座占い・恋愛運・仕事運・金運",
    description: "今日の運勢を無料で占える星座占いツール✨ 12星座別に総合運・恋愛運・仕事運・金運を診断📊 ラッキー行動とアドバイス付き🍀",
    images: ["/ogp/fortune-today.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function FortuneTodayPage() {
  return (
    <>
      {/* 構造化データ - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "今日の運勢占い",
            "description": "12星座別に今日の運勢を無料で占えるオンライン占いツール。総合運・恋愛運・仕事運・金運を診断し、ラッキー行動とアドバイスを提供。",
            "url": "https://yokaunit.com/tools/fortune-today",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Any",
            "browserRequirements": "HTML5, JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY"
            },
            "featureList": [
              "12星座対応の運勢診断",
              "総合運・恋愛運・仕事運・金運の4項目診断",
              "毎日更新される運勢結果",
              "ラッキー行動とアドバイス提供",
              "完全無料・登録不要",
              "スマホ・PC対応",
              "SNSシェア機能"
            ],
            "screenshot": "https://yokaunit.com/ogp/fortune-today.png",
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
                "name": "今日の運勢占いは無料で使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、完全無料でご利用いただけます。登録も不要で、12星座すべての運勢を毎日占うことができます。"
                }
              },
              {
                "@type": "Question",
                "name": "どの星座に対応していますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "牡羊座、牡牛座、双子座、蟹座、獅子座、乙女座、天秤座、蠍座、射手座、山羊座、水瓶座、魚座の12星座すべてに対応しています。"
                }
              },
              {
                "@type": "Question",
                "name": "どんな運勢を占えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "総合運、恋愛運、仕事運、金運の4つの運勢を0-100点で数値化して診断します。さらにラッキー行動や注意点もお伝えします。"
                }
              },
              {
                "@type": "Question",
                "name": "スマートフォンでも使えますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、スマートフォン、タブレット、PCのどの端末でもご利用いただけます。レスポンシブデザインで最適化されています。"
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
                "name": "今日の運勢",
                "item": "https://yokaunit.com/tools/fortune-today"
              }
            ]
          })
        }}
      />

      <FortuneTodayClientPage />
    </>
  )
}