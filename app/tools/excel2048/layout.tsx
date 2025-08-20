import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Excel風2048ゲーム｜表計算作業に見える隠しゲーム",
  description:
    "Microsoft Excelそっくりな見た目の2048パズルゲーム！表計算作業をしているように見えて実はゲーム。仕事中でも上司にバレずに2048パズルを楽しめる隠しゲームです。完全無料・登録不要で即プレイ可能。",
  keywords: [
    "Excel2048",
    "Excel風ゲーム",
    "隠しゲーム",
    "仕事中ゲーム",
    "バレないゲーム",
    "2048パズル",
    "表計算風ゲーム",
    "スプレッドシート",
    "オフィス風",
    "Microsoft Excel",
    "偽装ゲーム",
    "ステルスゲーム",
    "オフィスゲーム",
    "休憩時間",
    "ブラウザゲーム",
    "無料ゲーム",
    "パズルゲーム",
    "数字パズル",
    "論理ゲーム",
    "頭脳ゲーム",
    "YokaUnit",
    "ヨカユニット",
    "ウェブゲーム",
    "HTML5ゲーム",
    "レスポンシブゲーム",
    "モバイル対応",
    "スマホゲーム",
    "タブレット対応",
    "カモフラージュ",
    "偽装画面",
    "作業風",
    "ビジネスツール風",
    "Excel風インターフェース",
    "セル操作",
    "ワークシート",
    "全画面表示",
    "フルスクリーン"
  ],
  openGraph: {
    title: "Excel風2048ゲーム｜表計算作業に見える隠しゲーム - YokaUnit",
    description:
      "Microsoft Excelそっくりな見た目の2048パズルゲーム！表計算作業をしているように見えて実はゲーム。仕事中でも上司にバレずに2048パズルを楽しめる隠しゲームです。",
    url: "https://yokaunit.com/tools/excel2048",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "Excel風2048ゲーム - 表計算作業に見える隠しゲーム",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel風2048ゲーム🎮 表計算作業に見える隠しゲーム",
    description:
      "Microsoft Excelそっくりな見た目の2048パズル！表計算作業をしているように見えて実はゲーム😎 完全無料・登録不要✨ 全画面表示でさらに本格的！",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/excel2048",
  },
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
}

export default function Excel2048Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}