import type { Metadata } from "next"
import AIStressCheckClientPage from "./AIStressCheckClientPage"
import { ViewCounter } from "@/components/view-counter"

export const metadata: Metadata = {
  title: "AIストレス耐性診断｜AIが分析するメンタル強度・回復力チェック - YokaUnit",
  description: "AIがあなたのストレス耐性・メンタルの強さ・回復力を無料診断。6つの質問で仕事・人間関係・プレッシャーへの強さをAI分析。登録不要・スマホ対応で今すぐチェック！",
  keywords: [
    "AIストレス耐性診断",
    "AIストレスチェック",
    "ストレス耐性テスト",
    "ストレス診断 無料",
    "メンタル強度診断",
    "AIメンタルチェック",
    "AI心理テスト",
    "AIストレス分析",
    "AIメンタル診断",
    "AIメンタルヘルス",
    "AIストレス測定",
    "AI回復力診断",
    "AIレジリエンス診断",
    "ストレス自己診断",
    "AIストレス耐性テスト",
    "AIストレス対処法",
    "AIメンタル強化",
    "AI心理分析",
    "ストレス耐性チェック",
    "AIメンタルケア"
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
  return (
    <>
      <ViewCounter toolSlug="ai-stress-check" />
      <AIStressCheckClientPage />
    </>
  )
}
