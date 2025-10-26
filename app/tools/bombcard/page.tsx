import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { BombCardGameClient } from "./BombCardGameClient"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"

export const metadata: Metadata = {
  title: "爆弾カードゲーム｜みんなで楽しめる無料パーティーゲーム・ブラウザゲーム | YokaUnit",
  description: "【完全無料】みんなで楽しめる爆弾カードゲーム！カードを選んで爆弾を避けよう！最後まで生き残った人の勝利です。スマホ・PC対応で登録不要。パーティー・飲み会・イベントに最適な無料ブラウザゲーム。",
  keywords: [
    "爆弾カードゲーム",
    "パーティーゲーム",
    "カードゲーム",
    "無料ゲーム",
    "ブラウザゲーム",
    "スマホゲーム",
    "PCゲーム",
    "飲み会ゲーム",
    "イベントゲーム",
    "みんなでゲーム",
    "マルチプレイ",
    "オンラインゲーム",
    "登録不要",
    "即プレイ",
    "YokaUnit",
    "ヨカユニット",
    "爆弾ゲーム",
    "運試しゲーム",
    "確率ゲーム",
    "ハラハラゲーム",
    "緊張感",
    "盛り上がるゲーム",
    "簡単ゲーム",
    "ルール簡単",
    "子どもも楽しめる",
    "大人も楽しめる",
    "家族ゲーム",
    "友達ゲーム",
    "同僚ゲーム",
    "学級レク",
    "懇親会",
    "歓送迎会"
  ],
  openGraph: {
    title: "爆弾カードゲーム｜みんなで楽しめる無料パーティーゲーム・ブラウザゲーム",
    description: "【完全無料】みんなで楽しめる爆弾カードゲーム！カードを選んで爆弾を避けよう！最後まで生き残った人の勝利です。スマホ・PC対応で登録不要。パーティー・飲み会・イベントに最適。",
    url: "https://yokaunit.com/tools/bombcard",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/bombcard-game.png",
        width: 1200,
        height: 630,
        alt: "爆弾カードゲーム - みんなで楽しめる無料パーティーゲーム"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "爆弾カードゲーム💣｜みんなで楽しめる無料パーティーゲーム",
    description: "【完全無料】みんなで楽しめる爆弾カードゲーム✨ カードを選んで爆弾を避けよう🎯 最後まで生き残った人の勝利🏆 スマホ・PC対応で登録不要📱",
    images: ["/ogp/bombcard-game.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/bombcard"
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

const breadcrumbItems = [
  { label: "ホーム", href: "/" },
  { label: "ツール一覧", href: "/tools" },
  { label: "爆弾カードゲーム", href: "/tools/bombcard" },
]

export default function BombCardGamePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ViewCounter toolSlug="bombcard" />
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">💣 爆弾カードゲーム</h1>
            <p className="text-gray-600">カードを選んで爆弾を避けよう！最後まで生き残った人の勝利です。</p>
          </div>
          <BombCardGameClient />
        </div>
      </main>
      
      <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="bombcard" limit={8} />
      <RelatedTools currentToolSlug="bombcard" />
      
      <SiteFooter />
    </div>
  )
}
