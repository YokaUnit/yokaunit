import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
// eslint-disable-next-line import/no-unresolved
import ThreeCardBattleClient from "./ThreeCardBattleClient"
import { CategoryTools } from "@/components/category-tools"
import { RelatedTools } from "@/components/related-tools"

export const metadata: Metadata = {
  title: "3カード選択バトル｜当たりを当ててスコアを競う無料ゲーム | YokaUnit",
  description:
    "3カード選択バトルは、3枚のカードから当たりを選ぶシンプルな無料ブラウザゲーム。プレイヤー数とラウンド数（無限可）を設定してスコアを競えます。スマホ・PC対応。",
  keywords: [
    "3カード選択バトル",
    "カードゲーム",
    "三択",
    "当たり",
    "無料ゲーム",
    "ブラウザゲーム",
    "マルチプレイ",
    "スコア",
    "YokaUnit",
    "ヨカユニット",
  ],
  openGraph: {
    title: "3カード選択バトル｜当たりを当ててスコアを競う無料ゲーム",
    description:
      "3カード選択バトルは、3枚のカードから当たりを選ぶシンプルな無料ゲーム。プレイヤー数とラウンド（無限対応）を設定してみんなで対戦。スマホ・PC対応。",
    url: "https://yokaunit.com/tools/3cardbattle",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "3カード選択バトル - YokaUnit",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3カード選択バトル｜当たりを当ててスコアを競う無料ゲーム",
    description:
      "3カード選択バトルは、3枚のカードから当たりを選ぶ無料ブラウザゲーム。プレイヤー数とラウンド（無限）を設定して、みんなでスコアを競おう。",
    images: ["/ogp/yokaunit-common.png"],
    site: "@yokaunit",
    creator: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/3cardbattle",
  },
}

export default function ThreeCardBattlePage() {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "ツール一覧", href: "/tools" },
    { label: "3枚カードバトル", href: "/tools/3cardbattle" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} />
          <ThreeCardBattleClient />

          {/* 関連ツール（ゲーム）と最新ツール - SEO本文の上 */}
          <div className="mt-10">
            <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="3cardbattle" limit={8} />
          </div>
          

          {/* SEO用コンテンツ */}
          <div className="mt-10 space-y-8 max-w-4xl mx-auto">
            <section className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3カード選択バトルとは？</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  3カード選択バトルは、<strong>3枚のカード（A/B/C）から当たりを選ぶ</strong>だけのシンプルなブラウザゲームです。
                  直感的なルールで、<strong>子どもから大人まで</strong>誰でもすぐに楽しめます。<strong>ラウンド無制限（0指定）</strong>にも対応し、
                  友達・家族・同僚とのちょっとした勝負や、<strong>アイスブレイク</strong>にも最適です。
                </p>
                <p>
                  <strong>スマホ・PC・タブレット対応</strong>の<strong>無料ブラウザゲーム</strong>で、インストール不要・登録不要。
                  飲み会・オンライン飲み会・リモートワークの休憩・学級レク・社内イベント・文化祭の出し物など、
                  さまざまなシーンの<strong>ミニゲーム</strong>として活躍します。
                </p>
                <p>
                  類義ワード例: 三択ゲーム／カード当てゲーム／確率ゲーム／ハイ&ロー風ゲーム／ロシアンルーレット風ゲーム／
                  ランダム当たり判定／カジュアルパーティーゲーム／手軽な対戦ゲーム／シンプルルール／短時間ゲーム。
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">遊び方</h2>
              <div className="space-y-3 text-gray-700">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>プレイヤー数・ラウンド数（<strong>0=無限</strong>）・各プレイヤー名を設定して「ゲーム開始」。</li>
                  <li>「◯◯のターン！」のアナウンスに従って、当該プレイヤーが<strong>A/B/C</strong>のいずれかを選択。</li>
                  <li>全員が選んだら当たりをリビール。<strong>HITで+1点</strong>（スコア加算）。</li>
                  <li>ラウンドを重ね、最終的な合計点でランキングを決定（有限の場合）。</li>
                </ol>
                <p className="text-sm text-gray-600">
                  コツ: 人の選択傾向を読んだり、<strong>均等に散らす心理戦</strong>を仕掛けたり、同じカードに賭け続ける戦略もアリ。
                  完全ランダムの当たり判定でも、<strong>読み合い・駆け引き・盛り上がり</strong>が生まれます。
                </p>
              </div>
            </section>

            <section className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">特徴・ポイント</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><strong>ターンアナウンス</strong>でゲームらしい没入感。</li>
                <li><strong>HIT/MISSの色分け</strong>で結果が即わかる。</li>
                <li><strong>スコア/履歴</strong>が自動更新。途中合流にも便利。</li>
                <li><strong>ラウンド無限モード</strong>でBGM代わりの継続プレイも。</li>
                <li>学級レクリエーション、オンライン懇親会、文化祭、社内イベントに。</li>
                <li>検索想定語: 「三択ゲーム 無料」「カード当てゲーム」「ブラウザ パーティーゲーム」「手軽 対戦 ゲーム」など。</li>
              </ul>
            </section>

            <section className="bg-gray-50/90 rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">よくある質問</h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold">Q. 無限ラウンドはどうやって設定しますか？</p>
                  <p>A. ラウンド数のスライダーを<strong>0</strong>にすると無限になります。</p>
                </div>
                <div>
                  <p className="font-semibold">Q. スマホでも遊べますか？</p>
                  <p>A. はい。スマホ・タブレット・PCに対応しています。</p>
                </div>
                <div>
                  <p className="font-semibold">Q. 何人まで参加できますか？</p>
                  <p>A. 最大<strong>6人</strong>まで同時プレイ可能です（人数は設定で変更できます）。</p>
                </div>
                <div>
                  <p className="font-semibold">Q. BGMや効果音は入れられますか？</p>
                  <p>A. 現状は未対応ですが、需要があれば対応を検討します。</p>
                </div>
              </div>
            </section>

            <section className="text-center text-xs text-gray-500">
              <strong>関連キーワード:</strong> 3カード選択バトル 三択カード カード当てゲーム 確率ゲーム ロシアンルーレット風 ハイ&ロー風 
              パーティーゲーム 無料 ブラウザゲーム オンラインゲーム カジュアル ミニゲーム 学級レク 懇親会 文化祭 社内イベント
            </section>
          </div>

          {/* 最新のツール（SEOセクションの下） */}
          <div className="mt-6">
            <RelatedTools currentToolSlug="3cardbattle" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


