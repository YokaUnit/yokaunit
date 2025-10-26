import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"
import { PrivateToolClient } from "./PrivateToolClient"

export const metadata: Metadata = {
  title: "企業向け特別分析ツール｜限定公開・高度なデータ分析・レポート生成 | YokaUnit",
  description: "【限定公開】企業向け特別分析ツール。高度なデータ分析、レポート生成、カスタムダッシュボードなどの機能を提供。ログイン・アクセスコードが必要な企業専用ツール。",
  keywords: [
    "企業向けツール",
    "特別分析ツール",
    "データ分析",
    "レポート生成",
    "ダッシュボード",
    "カスタム分析",
    "企業専用",
    "限定公開",
    "高度な分析",
    "ビジネス分析",
    "データ可視化",
    "レポート作成",
    "分析ツール",
    "企業サービス",
    "B2Bツール",
    "データエクスポート",
    "カスタマイズ",
    "専用ツール",
    "YokaUnit",
    "ヨカユニット"
  ],
  openGraph: {
    title: "企業向け特別分析ツール｜限定公開・高度なデータ分析・レポート生成",
    description: "【限定公開】企業向け特別分析ツール。高度なデータ分析、レポート生成、カスタムダッシュボードなどの機能を提供。ログイン・アクセスコードが必要な企業専用ツール。",
    url: "https://yokaunit.com/tools/private-tool",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/private-tool-analysis.png",
        width: 1200,
        height: 630,
        alt: "企業向け特別分析ツール - 限定公開・高度なデータ分析・レポート生成"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "企業向け特別分析ツール🔒｜限定公開・高度なデータ分析",
    description: "【限定公開】企業向け特別分析ツール✨ 高度なデータ分析・レポート生成・カスタムダッシュボード📊 ログイン・アクセスコードが必要な企業専用ツール🏢",
    images: ["/ogp/private-tool-analysis.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/private-tool"
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1
    }
  }
}

export default function PrivateToolPage() {
  return (
    <>
      <ViewCounter toolSlug="private-tool" />
      <SiteHeader />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "企業向け特別分析ツール", href: "/tools/private-tool" },
              ]}
            />
            <PrivateToolClient />
          </div>
        </main>
        <RelatedTools currentToolSlug="private-tool" />
        <SiteFooter />
      </div>
    </>
  )
}