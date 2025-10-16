import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CategoryTools } from "@/components/category-tools"
import { RelatedTools } from "@/components/related-tools"
import RussianSweetsClient from "./RussianSweetsClient"

export const metadata: Metadata = {
  title: "ロシアンスイーツ｜お菓子の外れを引いたら負け！2人で遊べるブラウザゲーム | YokaUnit",
  description:
    "今SNSで話題の“お菓子ロシアンゲーム”をYokaUnitで無料プレイ。2人で交互にスイーツを選び、相手が決めた“外れ”を引いたら即アウト！スマホ1台で手軽に遊べる、運と心理戦が交錯するドキドキ対戦ツール。",
  keywords: [
    "ロシアンスイーツ",
    "お菓子 ロシアン ゲーム",
    "お菓子 外れ ゲーム",
    "お菓子 ゲーム 友達",
    "お菓子 罰ゲーム",
    "ブラウザ ロシアン ゲーム",
    "二人用 ゲーム",
    "2人 プレイ 無料",
    "心理戦 ゲーム",
    "パーティーゲーム",
    "スマホ1台 ゲーム",
    "修学旅行 ゲーム",
    "罰ゲーム 付き ゲーム",
  ],
  openGraph: {
    title: "ロシアンスイーツ｜お菓子の外れを引いたら負け！2人用ゲーム",
    description:
      "お菓子ロシアンゲームを無料で。お互いの“外れ”を設定し、散らばるスイーツから交互に選択。外れを引いたら即アウト！スマホ1台でOK。",
    url: "https://yokaunit.com/tools/russian-sweets",
    siteName: "YokaUnit",
    images: [{ url: "/ogp/yokaunit-common.png", width: 1200, height: 630, alt: "ロシアンスイーツ - YokaUnit" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ロシアンスイーツ｜お菓子の外れを引いたら負け！",
    description: "SNSで話題の“お菓子ロシアンゲーム”を無料プレイ。2人で交互に選び、外れを引いたら即アウト。スマホ1台で遊べる心理×運ゲー。",
    images: ["/ogp/yokaunit-common.png"],
    site: "@yokaunit",
    creator: "@yokaunit",
  },
  alternates: { canonical: "https://yokaunit.com/tools/russian-sweets" },
}

export default function RussianSweetsPage() {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "ツール一覧", href: "/tools" },
    { label: "ロシアンスイーツ", href: "/tools/russian-sweets" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} />
          <RussianSweetsClient />

          <div className="mt-10">
            <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="russian-sweets" limit={8} />
          </div>
          <div className="mt-6">
            <RelatedTools currentToolSlug="russian-sweets" />
          </div>

          <div className="mt-10 space-y-8 max-w-4xl mx-auto">
            <section className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ロシアンスイーツとは？</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  ロシアンスイーツは、<strong>2人用の心理×運</strong>ブラウザゲームです。ランダムに散らばるケーキの中から交互に1つずつ選び、
                  あらかじめ互いが設定した<strong>“外れスイーツ”</strong>を引いたほうが<strong>即アウト</strong>。<strong>自爆</strong>もありで、読み合いと笑いが生まれます。
                </p>
                <p>
                  今、SNS（YouTube・TikTok）で流行中の<strong>お菓子ロシアンゲーム</strong>のWeb版。<strong>スマホ1台</strong>で手軽に遊べて、
                  飲み会・修学旅行・休憩時間・パーティー・文化祭など、<strong>その場で盛り上がる</strong>ミニゲームとして最適です。
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">遊び方ルール</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>プレイヤーA/Bがそれぞれ<strong>アウトのスイーツ</strong>を秘密に選ぶ。</li>
                <li>ゲームスタート。画面には<strong>複数のスイーツ（最大20）</strong>がランダム配置。</li>
                <li>交互に1つずつスイーツを選ぶ。選んだスイーツは<strong>消えて選べなくなる</strong>。</li>
                <li>誰かが相手（または自分）の<strong>アウト</strong>を引いたら<strong>即負け</strong>。</li>
              </ol>
            </section>

            <section className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">YokaUnit向けの特徴</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>ローカル通信不要：<strong>1画面で2人プレイ</strong>可能（スマホを渡し合うだけ）</li>
                <li>スイーツテーマで<strong>華やかなUI</strong>（タップ時のふわっと演出）</li>
                <li><strong>ランダム配置×自爆リスク</strong>で盛り上がる（<strong>トレンド性</strong>も高い）</li>
                <li>履歴・スコア制・3本勝負など<strong>拡張も容易</strong></li>
                <li><strong>SNSシェア導線</strong>や「ネタ用」表記の追加で<strong>拡散性</strong>も強化可能</li>
              </ul>
            </section>

            <section className="text-center text-xs text-gray-500">
              <strong>関連キーワード:</strong> お菓子 ロシアン ゲーム, お菓子 外れ ゲーム, お菓子 ゲーム 友達, お菓子 罰ゲーム, ブラウザ ロシアン ゲーム, 二人用 ゲーム, 2人 プレイ 無料, 心理戦 ゲーム, パーティーゲーム, スマホ1台 ゲーム
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


