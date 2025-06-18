import { SEOHead } from "@/components/seo-head"
import { generateSEOData } from "@/lib/seo"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import ToolsPageClient from "./ToolsPageClient"

export const metadata: Metadata = {
  title: "ツール一覧 - 便利なWebツール集｜無料で使える実用ツール | YokaUnit",
  description:
    "パスワード生成、ゲーム、診断ツールなど様々な便利ツールを一覧で表示。すべて無料で使える実用的なWebツール集。",
  keywords: ["ツール一覧", "Webツール", "無料ツール", "便利ツール", "オンラインツール"],
  openGraph: {
    title: "ツール一覧 - 便利なWebツール集｜無料で使える実用ツール",
    description: "パスワード生成、ゲーム、診断ツールなど様々な便利ツールを一覧で表示。",
    url: "https://yokaunit.com/tools",
    images: [{ url: "/ogp/logofull.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ツール一覧 - 便利なWebツール集｜無料で使える実用ツール",
    description: "パスワード生成、ゲーム、診断ツールなど様々な便利ツールを一覧で表示。",
    images: ["/ogp/logofull.png"],
  },
}

export default function ToolsPage() {
  const seoData = generateSEOData({
    title: "ツール一覧 - 便利なWebツール集｜無料で使える実用ツール | YokaUnit",
    description:
      "パスワード生成、ゲーム、診断ツールなど様々な便利ツールを一覧で表示。すべて無料で使える実用的なWebツール集。",
    keywords: ["ツール一覧", "Webツール", "無料ツール", "便利ツール", "オンラインツール"],
    ogUrl: "https://yokaunit.com/tools",
  })

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <ToolsPageClient />
        <SiteFooter />
      </div>
    </>
  )
}
