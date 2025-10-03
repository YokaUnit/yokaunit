import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { BombCardGameClient } from "./BombCardGameClient"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"

export const metadata: Metadata = {
  title: "爆弾カードゲーム | YokaUnit",
  description: "みんなで楽しめる爆弾カードゲーム。カードを選んで爆弾を避けよう！",
}

const breadcrumbItems = [
  { label: "ホーム", href: "/" },
  { label: "ツール一覧", href: "/tools" },
  { label: "爆弾カードゲーム", href: "/tools/bombcard" },
]

export default function BombCardGamePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
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
      
      <RelatedTools currentToolSlug="bombcard" />
      
      <SiteFooter />
    </div>
  )
}
