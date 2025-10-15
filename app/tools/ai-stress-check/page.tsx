import type { Metadata } from "next"
import AIStressCheckClientPage from "./AIStressCheckClientPage"

export const metadata: Metadata = {
  title: "AIストレス耐性診断｜無料AI診断で心の強さをチェック - YokaUnit",
  description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。仕事・人間関係・変化への対応力をAIがチェックし、個別アドバイスを提供。完全無料・登録不要でスマホ・PCから今すぐAI診断！",
  keywords: [
    "AIストレス耐性診断",
    "AIストレス診断",
    "AIメンタル診断",
    "ストレス耐性",
    "AIストレスチェック",
    "AI心理診断",
    "AIメンタルヘルス",
    "AIストレス管理",
    "AIプレッシャー耐性",
    "AI回復力診断",
    "AIレジリエンス",
    "無料AI診断",
    "AI診断ツール",
    "AI心の強さ",
    "AIストレス対処法",
    "AIメンタル強化",
    "AIストレス測定",
    "AI心理テスト",
    "AIストレス分析",
    "AIメンタルケア",
    "人工知能診断",
    "AI精神分析"
  ],
  openGraph: {
    title: "AIストレス耐性診断｜無料AI診断で心の強さをチェック",
    description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。仕事・人間関係・変化への対応力をAIがチェックし、個別アドバイスを提供。",
    url: "https://yokaunit.com/tools/ai-stress-check",
    siteName: "YokaUnit",
    images: [
      {
        url: "https://yokaunit.com/ogp/ai-stress-check-diagnosis.png",
        width: 1200,
        height: 630,
        alt: "AIストレス耐性診断 - 無料AI診断ツール"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AIストレス耐性診断｜無料AI診断で心の強さをチェック",
    description: "最新AIがあなたのストレス耐性を無料で診断！6つの質問でメンタルの強さ・回復力・プレッシャー耐性をAI分析。",
    images: ["https://yokaunit.com/ogp/ai-stress-check-diagnosis.png"]
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/ai-stress-check"
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

export default function AIStressCheckPage() {
  return <AIStressCheckClientPage />
}
