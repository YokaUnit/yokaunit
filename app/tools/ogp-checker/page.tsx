import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"
import { OGPCheckerClient } from "./OGPCheckerClient"

export const metadata: Metadata = {
  title: "OGPチェッカー｜無料メタデータ・SNS最適化ツール - ブロガー・SEO必携",
  description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック！SEOスコア分析・改善提案・バッチチェック対応。ブロガー・マーケター・SEO担当者必携の最強ツール。",
  keywords: [
    "OGPチェッカー",
    "OGPチェッカー 無料",
    "OGPチェッカー オンライン",
    "メタデータチェッカー",
    "メタデータチェッカー 無料",
    "OGP画像確認",
    "OGP画像 サイズ",
    "OGP画像 最適化",
    "Twitter Card確認",
    "Twitter Card チェッカー",
    "Facebook Card確認",
    "Facebook Card チェッカー",
    "メタタグ確認",
    "メタタグチェッカー",
    "SEOチェッカー",
    "SEOチェッカー 無料",
    "OGP検証",
    "OGP検証ツール",
    "メタデータ検証",
    "メタデータ検証ツール",
    "Open Graph確認",
    "Open Graph チェッカー",
    "SNS最適化",
    "SNS最適化ツール",
    "ソーシャルメディア最適化",
    "ソーシャルメディア ツール",
    "OGP画像生成",
    "OGP画像生成ツール",
    "メタデータ生成",
    "メタデータ生成ツール",
    "SEO分析",
    "SEO分析ツール",
    "ウェブサイト分析",
    "ウェブサイト分析ツール",
    "ブロガーツール",
    "ブロガー 便利ツール",
    "マーケティングツール",
    "マーケティング 便利ツール",
    "SEOツール",
    "SEOツール 無料",
    "無料OGPチェッカー",
    "無料メタデータチェッカー",
    "オンラインOGPチェッカー",
    "オンラインメタデータチェッカー",
    "OGP画像最適化",
    "メタデータ最適化",
    "SNS投稿最適化",
    "SNS投稿 ツール",
    "OGP画像生成",
    "メタデータ生成",
    "SEOスコア",
    "SEOスコア 分析",
    "バッチチェック",
    "バッチチェック ツール",
    "YokaUnit",
    "ヨカユニット",
    "便利ツール",
    "無料ツール",
    "オンラインツール"
  ],
  openGraph: {
    title: "OGPチェッカー｜無料メタデータ・SNS最適化ツール - ブロガー・SEO必携",
    description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック！SEOスコア分析・改善提案・バッチチェック対応。ブロガー・マーケター・SEO担当者必携の最強ツール。",
    url: "https://yokaunit.com/tools/ogp-checker",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/ogp-checker-tool.png",
        width: 1200,
        height: 630,
        alt: "OGPチェッカー - 無料メタデータ・SNS最適化ツール"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OGPチェッカー🔍｜無料メタデータ・SNS最適化ツール",
    description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック✨ SEOスコア分析・改善提案・バッチチェック対応📊 ブロガー・マーケター・SEO担当者必携の最強ツール🛠️",
    images: ["/ogp/ogp-checker-tool.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/ogp-checker"
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

export default function OGPCheckerPage() {
  return (
    <>
      <ViewCounter toolSlug="ogp-checker" />
      <SiteHeader />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "OGPチェッカー", href: "/tools/ogp-checker" },
              ]}
            />
            <OGPCheckerClient />
          </div>
        </main>
        <RelatedTools currentToolSlug="ogp-checker" />
        <SiteFooter />
      </div>
    </>
  )
}
