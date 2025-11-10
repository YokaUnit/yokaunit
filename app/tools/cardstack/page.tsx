import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
import CardStackClientPage from "./CardStackClientPage"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("cardstack", {
    title: "トランプ山札めくるだけ｜ハイ&ロー・ジョーカーロシアンルーレット・マーク予想ゲーム【無料】 - YokaUnit",
    description: "【完全無料】トランプの山札をめくるだけのシンプルゲーム！ハイ&ロー、ジョーカーロシアンルーレット、マーク予想ゲームが楽しめる。確率論とゲーム理論を学べる教育ツール。完全無料・登録不要で即プレイ可能。",
    keywords: [
      "トランプ山札めくるだけ",
      "ハイ&ロー",
      "ジョーカーロシアンルーレット",
      "マーク予想ゲーム",
      "トランプゲーム",
      "カードゲーム",
      "確率ゲーム",
      "運試し",
      "オンラインゲーム",
      "無料ゲーム",
      "スペード",
      "ハート",
      "ダイヤ",
      "クラブ",
      "ジョーカー",
      "暇つぶし",
      "確率論",
      "ゲーム理論",
      "統計学",
      "数学",
      "教育ツール",
      "YokaUnit",
      "ヨカユニット",
      "ウェブゲーム",
      "HTML5ゲーム",
      "レスポンシブゲーム",
      "モバイル対応",
      "スマホゲーム",
      "タブレット対応",
      "ブラウザゲーム",
      "即プレイ",
      "登録不要"
    ],
    openGraph: {
      title: "トランプ山札めくるだけ｜ハイ&ロー・ジョーカーロシアンルーレット・マーク予想ゲーム【無料】 - YokaUnit",
      description: "【完全無料】トランプの山札をめくるだけのシンプルゲーム！ハイ&ロー、ジョーカーロシアンルーレット、マーク予想ゲームが楽しめる。確率論とゲーム理論を学べる教育ツール。",
      url: "https://yokaunit.com/tools/cardstack",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "トランプ山札めくるだけ｜ハイ&ロー・ジョーカーロシアンルーレット・マーク予想ゲーム【無料】 - YokaUnit",
      description: "【完全無料】トランプの山札をめくるだけのシンプルゲーム！ハイ&ロー、ジョーカーロシアンルーレット、マーク予想ゲームが楽しめる。確率論とゲーム理論を学べる教育ツール。",
    },
  })
}

export default function CardStackPage() {
  return (
    <>
      <ViewCounter toolSlug="cardstack" />
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "トランプ山札めくるだけ", href: "/tools/cardstack" },
              ]}
            />

            <div className="max-w-4xl mx-auto mt-6">
              {/* ヘッダー */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-3xl shadow-xl">
                    <span className="text-4xl">🃏</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">トランプ山札めくるだけ</h1>
                <h2 className="text-lg md:text-xl text-gray-600 mb-4">ハイ&ロー・ジョーカーロシアンルーレット・マーク予想ゲーム</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  トランプの山札をめくるだけのシンプルゲーム。確率論とゲーム理論を学べる教育ツールとしても活用できます
                </p>
              </div>

              {/* メインゲーム */}
              <CardStackClientPage />

              {/* 関連ツール */}
              <div className="mt-8">
                <RelatedTools currentToolSlug="cardstack" />
              </div>

              {/* カテゴリツール */}
              <div className="mt-8">
                <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="cardstack" limit={8} />
              </div>

              {/* 使い方ガイド */}
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">使い方ガイド</h2>
                <div className="space-y-4">
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">ハイ&ローゲームのルール</summary>
                    <p className="mt-3 text-gray-600">
                      現在のカードより高いカードが出るか低いカードが出るかを予想します。
                      正解するとスコアが加算され、間違えるとゲームオーバーです。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">ジョーカーロシアンルーレットのルール</summary>
                    <p className="mt-3 text-gray-600">
                      山札にジョーカーが1枚混入しています。ジョーカーを引くとゲームオーバーです。
                      リスクを取って続行するか、安全に終了するかを選択できます。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">マーク予想ゲームのルール</summary>
                    <p className="mt-3 text-gray-600">
                      次のカードのマーク（スペード、ハート、ダイヤ、クラブ）を予想します。
                      正解するとスコアが加算され、間違えるとゲームオーバーです。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">山札の仕組み</summary>
                    <p className="mt-3 text-gray-600">
                      一度引いたカードは山札から除外され、履歴として表示されます。リセットボタンを押すまで山札は減り続けます。これにより、残りカードの確率が変化していく戦略性があります。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">無料で遊べますか？</summary>
                    <p className="mt-3 text-gray-600">
                      はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。
                    </p>
                  </details>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ 関連キーワード</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "ハイ&ロー", "トランプ", "山札", "ジョーカーロシアンルーレット", "マーク予想ゲーム",
                      "カードゲーム", "運試し", "確率ゲーム", "オンラインゲーム", "無料ゲーム",
                      "スペード", "ハート", "ダイヤ", "クラブ", "ジョーカー", "暇つぶし"
                    ].map((keyword) => (
                      <span key={keyword} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* SEO記事 */}
              <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🃏 トランプ山札めくるだけ完全ガイド：確率論・ゲーム理論・カード文化の科学</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎲</span>
                      確率論の基礎と応用
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">基本的な確率計算</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>組み合わせ論</strong>: カードの組み合わせ</li>
                          <li>• <strong>条件付き確率</strong>: 既知情報の活用</li>
                          <li>• <strong>期待値</strong>: 長期的な収益性</li>
                          <li>• <strong>分散</strong>: リスクの定量化</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">高度な確率理論</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>ベイズ定理</strong>: 情報更新の理論</li>
                          <li>• <strong>マルコフ連鎖</strong>: 状態遷移の分析</li>
                          <li>• <strong>モンテカルロ法</strong>: シミュレーション</li>
                          <li>• <strong>確率過程</strong>: 時間変化の分析</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🧠</span>
                      認知バイアスと心理学的要素
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">ギャンブラーの誤謬</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          過去の結果 ≠ 将来の確率<br/>
                          各試行は独立<br/>
                          確率は一定<br/>
                          記憶バイアス
                        </div>
                        <p className="text-sm text-gray-600">
                          過去の結果が将来に
                          影響しないことを理解。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">確証バイアス</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          支持情報に注目<br/>
                          反対情報を無視<br/>
                          選択的記憶<br/>
                          客観性の欠如
                        </div>
                        <p className="text-sm text-gray-600">
                          自分の信念を支持する
                          情報のみに注目する傾向。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎮</span>
                      現代のカードゲーム文化
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">デジタル化とオンラインゲーム</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-purple-600">オンラインの利点</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 世界中との対戦</li>
                              <li>• 統計データの収集</li>
                              <li>• AI技術の活用</li>
                              <li>• 迅速なバランス調整</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-blue-600">教育ツールとして</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 数学・統計学の学習</li>
                              <li>• 確率論の理解</li>
                              <li>• 組み合わせ論の習得</li>
                              <li>• 期待値計算の実践</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">ゲーム理論の応用</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>ナッシュ均衡</strong>: 最適戦略の分析</li>
                          <li>• <strong>ミニマックス理論</strong>: リスク最小化</li>
                          <li>• <strong>協力ゲーム</strong>: チーム戦略</li>
                          <li>• <strong>非協力ゲーム</strong>: 個人最適化</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      統計分析とデータサイエンス
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">大数の法則</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          試行回数 ↑<br/>
                          理論確率に収束<br/>
                          偶然の影響減少<br/>
                          統計的安定性
                        </div>
                        <p className="text-sm text-gray-600">
                          大量試行で理論値に
                          近づく現象。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">中心極限定理</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          結果分布<br/>
                          正規分布に近似<br/>
                          平均と分散<br/>
                          統計的予測
                        </div>
                        <p className="text-sm text-gray-600">
                          結果の分布が
                          正規分布に近づく。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">仮説検定</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          カイ二乗検定<br/>
                          t検定<br/>
                          有意水準<br/>
                          統計的有意性
                        </div>
                        <p className="text-sm text-gray-600">
                          統計的手法による
                          仮説の検証。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      実践的な戦略とスキル向上
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">戦略的思考</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-red-600">リスク管理</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• リスク許容度の設定</li>
                              <li>• ポートフォリオ理論</li>
                              <li>• 損失の最小化</li>
                              <li>• 期待値の最大化</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-green-600">意思決定</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 情報の収集と分析</li>
                              <li>• 複数選択肢の評価</li>
                              <li>• 時間的制約の考慮</li>
                              <li>• 結果の予測と評価</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">継続的学習</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>パターン認識</strong>: 結果の傾向分析</li>
                          <li>• <strong>戦略調整</strong>: 状況に応じた最適化</li>
                          <li>• <strong>スキル向上</strong>: 計算速度と精度の向上</li>
                          <li>• <strong>心理的安定</strong>: 感情のコントロール</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      トランプ山札めくるだけは、確率論とゲーム理論を学ぶ優れたツールです。
                      楽しみながら数学的思考力を向上させましょう。
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                      <span>#トランプゲーム</span>
                      <span>#確率論</span>
                      <span>#ゲーム理論</span>
                      <span>#統計学</span>
                      <span>#カード文化</span>
                      <span>#YokaUnit</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      
      <ScrollToTop />
      <SiteFooter />
    </>
  )
}