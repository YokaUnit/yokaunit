import type { Metadata } from "next"
import { PoreTypeDiagnosisClient } from "./PoreTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "毛穴タイプ診断 | YokaUnit Beauty",
  description:
    "黒ずみ毛穴・開き毛穴・たるみ毛穴・詰まり毛穴の中から、あなたの毛穴タイプをチェックできる無料の毛穴診断ツール。タイプ別の結論・NGケア・ケアプランと、検索ニーズに沿った解説付き。",
  keywords: [
    "毛穴タイプ診断",
    "毛穴診断",
    "黒ずみ毛穴",
    "開き毛穴",
    "たるみ毛穴",
    "詰まり毛穴",
    "毛穴ケア",
    "スキンケア診断",
    "無料診断",
    "毛穴パック",
    "角栓",
    "いちご鼻",
    "YokaUnit Beauty",
  ],
  alternates: { canonical: "https://yokaunit.com/beauty/diagnosis/pore-type" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "毛穴タイプ診断（無料）｜YokaUnit Beauty",
    description:
      "黒ずみ・開き・たるみ・詰まり毛穴のタイプを1〜2分でチェック。Webで完結・登録不要。",
    url: "https://yokaunit.com/beauty/diagnosis/pore-type",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp",
        width: 1600,
        height: 1200,
        alt: "毛穴タイプ診断（黒ずみ・開き・たるみ・詰まり）",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "毛穴タイプ診断（無料）｜YokaUnit Beauty",
    description: "毛穴タイプを1〜2分でチェック。Webで完結・登録不要。",
    images: ["https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp"],
  },
}

export default function PoreTypeDiagnosisPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "毛穴タイプ診断",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "ja-JP",
    url: "https://yokaunit.com/beauty/diagnosis/pore-type",
    image: "https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp",
    description:
      "黒ずみ・開き・たるみ・詰まり毛穴のタイプを1〜2分でチェックできる無料診断。タイプ別のケア方針とNG行動を確認できます。",
    publisher: {
      "@type": "Organization",
      name: "YokaUnit Beauty",
      logo: {
        "@type": "ImageObject",
        url: "https://yokaunit.com/logo_heart.png",
      },
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "毛穴タイプ診断は無料ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "無料で利用できます。登録なしでWeb上で完結します。",
        },
      },
      {
        "@type": "Question",
        name: "診断結果は医療診断ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "医療診断ではなく、回答内容にもとづく傾向チェックです。赤みや痛みなど症状が強い場合は皮膚科受診を優先してください。",
        },
      },
      {
        "@type": "Question",
        name: "同点の場合はどう判定されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "タイプの点数が同点の場合は、最初の質問「一番気になる悩み」の回答を優先して判定します。",
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "YokaUnit Beauty",
        item: "https://yokaunit.com/beauty",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "毛穴タイプ診断",
        item: "https://yokaunit.com/beauty/diagnosis/pore-type",
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PoreTypeDiagnosisClient />
    </>
  )
}

