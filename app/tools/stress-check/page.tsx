import type { Metadata } from "next"
import StressCheckClientPage from "./StressCheckClientPage"

export const metadata: Metadata = {
  title: "ストレス耐性診断｜無料AI診断で心の強さをチェック - YokaUnit",
  description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。仕事・人間関係・変化への対応力をチェックし、個別アドバイスを提供。完全無料・登録不要でスマホ・PCから今すぐ診断！",
  keywords: [
    "ストレス耐性診断",
    "ストレス診断",
    "メンタル診断",
    "ストレス耐性",
    "ストレスチェック",
    "心理診断",
    "メンタルヘルス",
    "ストレス管理",
    "プレッシャー耐性",
    "回復力診断",
    "レジリエンス",
    "無料診断",
    "AI診断",
    "心の強さ",
    "ストレス対処法",
    "メンタル強化",
    "ストレス測定",
    "心理テスト",
    "ストレス分析",
    "メンタルケア"
  ],
  openGraph: {
    title: "ストレス耐性診断｜無料AI診断で心の強さをチェック",
    description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。仕事・人間関係・変化への対応力をチェックし、個別アドバイスを提供。",
    url: "https://yokaunit.com/tools/stress-check",
    siteName: "YokaUnit",
    images: [
      {
        url: "https://yokaunit.com/ogp/stress-check-diagnosis.png",
        width: 1200,
        height: 630,
        alt: "ストレス耐性診断 - 無料AI診断ツール"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ストレス耐性診断｜無料AI診断で心の強さをチェック",
    description: "AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性を分析。",
    images: ["https://yokaunit.com/ogp/stress-check-diagnosis.png"]
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/stress-check"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function StressCheckPage() {
  return <StressCheckClientPage />
}
