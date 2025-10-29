import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
// eslint-disable-next-line import/no-unresolved
import ThreeCardBattleClient from "./ThreeCardBattleClient"
import { CategoryTools } from "@/components/category-tools"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"

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
      <ViewCounter toolSlug="3cardbattle" />
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
          

          {/* SEO記事セクション */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 3カード選択バトル完全ガイド：心理戦・確率論・パーティーゲームの極意</h2>
              
              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎮</span>
                    3カード選択バトルの魅力と歴史
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    3カード選択バトルは、3枚のカード（A/B/C）から当たりを選ぶだけの
                    シンプルなゲームです。その単純さこそが最大の魅力で、
                    誰でもすぐに理解でき、年齢を問わず楽しめます。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    このゲームは、確率論、心理学、ゲーム理論の要素を
                    含んでおり、単なる運任せではなく、
                    戦略的思考と心理戦が重要な要素となっています。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🧠</span>
                      基本ルールと戦略的思考
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-gray-900 mb-2">基本ルール</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 3枚のカード（A/B/C）から1枚を選択</li>
                          <li>• 当たりのカードを選べば+1点</li>
                          <li>• 複数ラウンドでスコアを競う</li>
                          <li>• 最高得点者が勝利</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-semibold text-gray-900 mb-2">戦略的アプローチ</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 他プレイヤーの選択パターン分析</li>
                          <li>• 確率論に基づく選択</li>
                          <li>• 心理戦とブラフの活用</li>
                          <li>• リスク管理と期待値計算</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-gray-900 mb-2">上級テクニック</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 相手の心理を読む技術</li>
                          <li>• 偽のパターンで相手を惑わす</li>
                          <li>• 統計的分析による最適解</li>
                          <li>• ゲーム理論の応用</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      確率論と数学的分析
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="font-semibold text-gray-900 mb-2">基本確率</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 各カードの当たり確率: 1/3 (33.33%)</li>
                          <li>• 独立事象として扱える</li>
                          <li>• 過去の結果は未来に影響しない</li>
                          <li>• 期待値は常に一定</li>
                        </ul>
                      </div>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-semibold text-gray-900 mb-2">統計的分析</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 大数の法則の適用</li>
                          <li>• 標準偏差と分散の計算</li>
                          <li>• 信頼区間の設定</li>
                          <li>• 仮説検定の実施</li>
                        </ul>
                      </div>
                      
                      <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                        <h4 className="font-semibold text-gray-900 mb-2">心理的バイアス</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ギャンブラーの誤謬</li>
                          <li>• 確証バイアス</li>
                          <li>• アンカリング効果</li>
                          <li>• 損失回避の心理</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎪</span>
                    パーティーゲームとしての活用
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">場面別活用方法</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>飲み会・パーティー</strong>: アイスブレイクと盛り上がり</li>
                        <li>• <strong>オンライン会議</strong>: リモートワークの息抜き</li>
                        <li>• <strong>学級レク</strong>: 教育現場での活用</li>
                        <li>• <strong>社内イベント</strong>: チームビルディング</li>
                        <li>• <strong>家族ゲーム</strong>: 世代を超えた楽しみ</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">教育的効果</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>確率思考</strong>: 数学的思考力の向上</li>
                        <li>• <strong>心理分析</strong>: 人間心理の理解</li>
                        <li>• <strong>戦略思考</strong>: 論理的判断力の育成</li>
                        <li>• <strong>コミュニケーション</strong>: 対話と観察力</li>
                        <li>• <strong>リスク管理</strong>: 意思決定能力の向上</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎲</span>
                    ゲーム理論と最適戦略
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ナッシュ均衡</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        純粋戦略: 1/3ずつ<br/>
                        混合戦略: ランダム<br/>
                        最適解: 期待値最大化
                      </div>
                      <p className="text-sm text-gray-600">
                        ゲーム理論における最適戦略。
                        相手の戦略を考慮した解。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ミニマックス戦略</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        最悪ケース想定<br/>
                        リスク最小化<br/>
                        保守的アプローチ
                      </div>
                      <p className="text-sm text-gray-600">
                        最悪の場合を想定した
                        リスク回避型の戦略。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">期待値最大化</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        確率 × 報酬<br/>
                        長期視点<br/>
                        統計的最適化
                      </div>
                      <p className="text-sm text-gray-600">
                        長期的な期待値を
                        最大化する戦略。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    よくある誤解と注意点
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">確率に関する誤解</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-red-600">よくある誤解</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 連続で外れたら次は当たり</li>
                            <li>• 特定のカードに偏りがある</li>
                            <li>• パターンを見つけられる</li>
                            <li>• 運をコントロールできる</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-green-600">正しい理解</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 各回は独立した事象</li>
                            <li>• 確率は常に1/3</li>
                            <li>• ランダム性は予測不可能</li>
                            <li>• 戦略は心理面に焦点</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">適切なゲームプレイ</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>楽しさ重視</strong>: 勝敗よりも楽しさを優先</li>
                        <li>• <strong>適度な時間</strong>: 長時間のプレイは避ける</li>
                        <li>• <strong>公平性</strong>: 全員が楽しめる環境作り</li>
                        <li>• <strong>学習機会</strong>: 確率や心理の学習に活用</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    デジタル時代の3カードゲーム
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">オンライン化のメリット</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">技術的メリット</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 正確なランダム生成</li>
                            <li>• 自動スコア計算</li>
                            <li>• 履歴の保存・分析</li>
                            <li>• リアルタイム対戦</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">社会的メリット</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 遠隔地との対戦</li>
                            <li>• 大勢での同時プレイ</li>
                            <li>• データ分析の活用</li>
                            <li>• アクセシビリティ向上</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">YokaUnit 3カード選択バトルの特徴</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>高精度ランダム</strong>: 暗号学的に安全な乱数生成</li>
                        <li>• <strong>マルチプレイ対応</strong>: 最大6人までの同時対戦</li>
                        <li>• <strong>無限ラウンド</strong>: 0設定で無制限プレイ</li>
                        <li>• <strong>リアルタイム更新</strong>: 即座にスコアと結果を表示</li>
                        <li>• <strong>モバイル対応</strong>: スマホ・タブレットで快適プレイ</li>
                        <li>• <strong>プライバシー保護</strong>: ブラウザ内完結でデータ漏洩なし</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🧩</span>
                    心理学と行動経済学の観点
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">認知バイアスの影響</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">代表性ヒューリスティック</h5>
                          <p className="text-xs text-gray-600">
                            小さなサンプルから全体を
                            推測してしまう傾向
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">利用可能性ヒューリスティック</h5>
                          <p className="text-xs text-gray-600">
                            記憶しやすい情報を
                            過大評価する傾向
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">アンカリング効果</h5>
                          <p className="text-xs text-gray-600">
                            最初の情報に
                            過度に依存する傾向
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">確証バイアス</h5>
                          <p className="text-xs text-gray-600">
                            自分の仮説を支持する
                            情報のみを重視する傾向
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">行動経済学の応用</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>プロスペクト理論</strong>: 損失回避とリスク選好の非対称性</li>
                        <li>• <strong>フレーミング効果</strong>: 問題の提示方法による判断の変化</li>
                        <li>• <strong>現状維持バイアス</strong>: 変化を避けようとする傾向</li>
                        <li>• <strong>社会的証明</strong>: 他者の行動に影響される心理</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    YokaUnitの3カード選択バトルは、単純なゲームの中に
                    深い戦略性と心理戦の要素を含んでいます。
                    この記事が、より楽しく効果的なゲームプレイの参考になれば幸いです。
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>#3カード選択バトル</span>
                    <span>#確率ゲーム</span>
                    <span>#心理戦</span>
                    <span>#パーティーゲーム</span>
                    <span>#ゲーム理論</span>
                    <span>#行動経済学</span>
                    <span>#YokaUnit</span>
                  </div>
                </div>
              </div>
            </div>
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


