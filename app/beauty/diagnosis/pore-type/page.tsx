import type { Metadata } from "next"
import { PoreTypeDiagnosisClient } from "./PoreTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "毛穴タイプ診断 | YokaUnit Beauty",
  description:
    "黒ずみ毛穴・開き毛穴・たるみ毛穴・詰まり毛穴の中から、あなたの毛穴タイプをチェックできる無料の毛穴診断ツール。毛穴悩みの原因とケアの方向性を知ることができます。",
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
    "YokaUnit Beauty",
  ],
  alternates: { canonical: "https://yokaunit.com/beauty/diagnosis/pore-type" },
  openGraph: {
    title: "毛穴タイプ診断（無料）｜YokaUnit Beauty",
    description:
      "黒ずみ・開き・たるみ・詰まり毛穴のタイプを1〜2分でチェック。Webで完結・登録不要。",
    url: "https://yokaunit.com/beauty/diagnosis/pore-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "毛穴タイプ診断（無料）｜YokaUnit Beauty",
    description: "毛穴タイプを1〜2分でチェック。Webで完結・登録不要。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function PoreTypeDiagnosisPage() {
  return <PoreTypeDiagnosisClient />
}

