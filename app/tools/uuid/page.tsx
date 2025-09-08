import type { Metadata } from "next"
import UuidGeneratorClientPage from "./UuidGeneratorClientPage"

export const metadata: Metadata = {
  title: "UUID生成ツール｜PostgreSQL対応のUUIDを無料生成・開発者向けツール | yokaunit",
  description:
    "【完全無料】PostgreSQL UUID型対応（8-4-4-4-12形式）のUUID生成ツール。v1～v4、Nil UUID対応。一括生成・バリデーション機能付き。開発者必携の高機能UUIDジェネレーター。ブラウザ完結でセキュア。",
  keywords: [
    "UUID生成",
    "UUID generator",
    "PostgreSQL UUID",
    "8-4-4-4-12",
    "UUID v1",
    "UUID v4",
    "Nil UUID",
    "GUID生成",
    "ユニークID",
    "一意識別子",
    "開発者ツール",
    "データベース",
    "プログラミング",
    "Web開発",
    "システム開発",
    "無料ツール",
    "UUID validator",
    "UUID検証",
    "16進数",
    "ハイフン付き",
    "RFC4122",
    "タイムスタンプ",
    "ランダムUUID",
    "一括生成",
    "バリデーション",
    "コピー機能",
    "開発効率",
    "YokaUnit",
    "ヨカユニット",
    "UUID作成",
    "識別子生成",
    "データ管理",
    "API開発",
    "マイクロサービス",
    "分散システム",
    "主キー生成",
    "セッションID",
    "トークン生成",
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/uuid",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/uuid",
    siteName: "YokaUnit",
    title: "UUID生成ツール｜PostgreSQL対応のUUIDを無料生成・開発者向けツール",
    description: "PostgreSQL UUID型対応（8-4-4-4-12形式）のUUID生成ツール。v1～v4、Nil UUID対応。一括生成・バリデーション機能付き。開発者必携の高機能UUIDジェネレーター。",
    images: [
      {
        url: "/ogp/uuid-generator.png",
        width: 1200,
        height: 630,
        alt: "UUID生成ツール - PostgreSQL対応の開発者向けUUIDジェネレーター",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "UUID生成ツール🔧｜PostgreSQL対応のUUID無料生成",
    description: "PostgreSQL UUID型対応（8-4-4-4-12形式）✨ v1～v4、Nil UUID対応🛠️ 一括生成・バリデーション機能付き📋 開発者必携ツール🚀",
    images: ["/ogp/uuid-generator.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
}

export default function UuidGeneratorPage() {
  return <UuidGeneratorClientPage />
}
