import { Dice3DClientPage } from "./Dice3DClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "3Dサイコロシミュレーター | 物理エンジン搭載の高精度サイコロツール - YokaUnit",
  description: "リアルな物理エンジンを使った3Dサイコロシミュレーター。複数のサイコロを同時に振って、投げる力や回転を自由に調整可能。統計機能付きで確率の検証にも最適。完全無料でブラウザですぐ使える高品質なサイコロツールです。",
  keywords: [
    "3Dサイコロ",
    "サイコロシミュレーター", 
    "物理エンジン",
    "サイコロ投げ",
    "確率計算",
    "統計ツール",
    "ランダム生成",
    "ゲーム用サイコロ",
    "TRPG",
    "ボードゲーム",
    "無料ツール",
    "オンラインサイコロ",
    "リアルタイム物理",
    "3Dシミュレーション",
    "WebGL",
    "Three.js"
  ],
  openGraph: {
    title: "3Dサイコロシミュレーター | 物理エンジン搭載の高精度サイコロツール",
    description: "リアルな物理エンジンを使った3Dサイコロシミュレーター。複数のサイコロを同時に振って、投げる力や回転を自由に調整可能。統計機能付きで確率の検証にも最適。",
    url: "https://yokaunit.com/tools/dice3d",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "3Dサイコロシミュレーター - YokaUnit",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3Dサイコロシミュレーター🎲 | 物理エンジン搭載",
    description: "リアルな物理エンジンを使った3Dサイコロシミュレーター✨ 複数のサイコロを同時に振って統計も確認できる！",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/dice3d",
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

export default function Dice3DPage() {
  return <Dice3DClientPage />
}