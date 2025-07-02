import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "企業向けWebサイト制作・システム開発｜売上アップに直結するSEO特化サイト",
  description:
    "YokaUnitの企業向けサービスで売上アップを実現！モバイルファーストのUI設計とSEO最適化で検索上位表示を狙います。月額25万円〜、一式80万円〜の柔軟な料金体系。無料相談受付中です。",
  keywords: [
    "企業向けWebサイト制作",
    "SEO対策",
    "UI/UXデザイン",
    "システム開発",
    "売上アップ",
    "検索上位表示",
    "モバイルファースト",
    "レスポンシブデザイン",
    "DXコンサルティング",
    "Webシステム開発",
    "セキュリティ対策",
    "保守運用",
    "無料相談",
  ],
  openGraph: {
    title: "企業向けWebサイト制作・システム開発｜売上アップに直結するSEO特化サイト - YokaUnit",
    description:
      "売上アップに直結するWebサイト制作！モバイルファーストのUI設計とSEO最適化で検索上位表示を実現。月額25万円〜の柔軟な料金体系で、制作から運用まで完全サポートいたします。",
    url: "https://yokaunit.com/corporate",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit企業向けサービス - 売上アップに直結するWebサイト制作",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "企業向けWebサイト制作🚀 売上アップに直結するSEO特化サイト",
    description:
      "モバイルファーストのUI設計とSEO最適化で検索上位表示を実現✨ 月額25万円〜の柔軟な料金体系で制作から運用まで完全サポート💼 無料相談受付中！",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/corporate",
  },
}

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
