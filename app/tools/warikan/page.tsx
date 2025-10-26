import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { WarikanClient } from "./WarikanClient"

export const metadata: Metadata = {
  title: "割り勘計算機｜人数・金額・端数処理を自動計算・無料オンライン計算機 - YokaUnit",
  description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算！スマホ・PC対応で外出先でも便利。端数処理（切り上げ・切り捨て・四捨五入）・個別金額設定・履歴保存機能付き。飲み会・旅行・イベントの会計に最適。",
  keywords: [
    "割り勘計算機",
    "割り勘",
    "会計",
    "計算機",
    "端数処理",
    "切り上げ",
    "切り捨て",
    "四捨五入",
    "飲み会",
    "旅行",
    "イベント",
    "会計",
    "無料",
    "オンライン",
    "スマホ",
    "PC",
    "履歴保存",
    "個別金額",
    "人数計算",
    "金額計算",
    "自動計算",
    "便利ツール",
    "YokaUnit",
    "ヨカユニット"
  ],
  openGraph: {
    title: "割り勘計算機｜人数・金額・端数処理を自動計算・無料オンライン計算機",
    description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算！スマホ・PC対応で外出先でも便利。端数処理（切り上げ・切り捨て・四捨五入）・個別金額設定・履歴保存機能付き。飲み会・旅行・イベントの会計に最適。",
    url: "https://yokaunit.com/tools/warikan",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/warikan-calculator.png",
        width: 1200,
        height: 630,
        alt: "割り勘計算機 - 人数・金額・端数処理を自動計算"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "割り勘計算機💰｜人数・金額・端数処理を自動計算",
    description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算✨ スマホ・PC対応で外出先でも便利📱 端数処理・個別金額設定・履歴保存機能付き📊",
    images: ["/ogp/warikan-calculator.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/warikan"
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

export default function WarikanPage() {
  return (
    <>
      <ViewCounter toolSlug="warikan" />
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />
        <div className="relative z-10 container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "割り勘計算ツール", href: "/tools/warikan" },
            ]}
          />
          <WarikanClient />
        </div>
      </div>
      <CategoryTools category="計算" title="関連ツール（計算）" currentToolSlug="warikan" limit={8} />
      <RelatedTools currentToolSlug="warikan" />
      <SiteFooter />
    </>
  )
}