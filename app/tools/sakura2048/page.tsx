import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { Sakura2048Client } from "./Sakura2048Client"

export const metadata: Metadata = {
  title: "サクラ2048｜サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム【無料】 - YokaUnit",
  description: "【完全無料】サクラエディタそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。コードを書いているフリをしながら2048パズルに挑戦。完全無料・登録不要で即プレイ可能。",
  keywords: [
    "サクラ2048",
    "サクラエディタ",
    "隠しゲーム",
    "仕事中ゲーム",
    "バレないゲーム",
    "2048パズル",
    "エディタ風ゲーム",
    "コーディング風",
    "プログラマー",
    "テキストエディタ",
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
    "開発者ツール"
  ],
  openGraph: {
    title: "サクラ2048｜サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム",
    description: "【完全無料】サクラエディタそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。コードを書いているフリをしながら2048パズルに挑戦。",
    url: "https://yokaunit.com/tools/sakura2048",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/sakura2048-game.png",
        width: 1200,
        height: 630,
        alt: "サクラ2048 - サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "サクラ2048🎮｜サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム",
    description: "【完全無料】サクラエディタそっくりな見た目の2048パズルゲーム✨ 仕事中でも上司にバレずにゲームを楽しめる隠しゲーム💼 コードを書いているフリをしながら2048パズルに挑戦🎯",
    images: ["/ogp/sakura2048-game.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/sakura2048"
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

export default function Sakura2048Page() {
  return (
    <>
      <ViewCounter toolSlug="sakura2048" />
      <SiteHeader />
      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { href: "/tools", label: "ツール一覧" },
                { href: "/tools/sakura2048", label: "サクラエディタ風2048" },
              ]}
            />
            <Sakura2048Client />
          </div>
        </main>
        <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="sakura2048" limit={8} />
        <RelatedTools currentToolSlug="sakura2048" />
        <SiteFooter />
      </div>
    </>
  )
}