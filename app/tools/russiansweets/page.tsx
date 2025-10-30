import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CategoryTools } from "@/components/category-tools"
import { RelatedTools } from "@/components/related-tools"
import RussianSweetsClient from "./RussianSweetsClient"
import { ViewCounter } from "@/components/view-counter"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("russian-sweets", {
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
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ロシアンスイーツ｜お菓子の外れを引いたら負け！",
      description: "SNSで話題の“お菓子ロシアンゲーム”を無料プレイ。2人で交互に選び、外れを引いたら即アウト。スマホ1台で遊べる心理×運ゲー。",
      site: "@yokaunit",
      creator: "@yokaunit",
    },
    alternates: { canonical: "https://yokaunit.com/tools/russian-sweets" },
  })
}

export default function RussianSweetsPage() {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "ツール一覧", href: "/tools" },
    { label: "ロシアンスイーツ", href: "/tools/russian-sweets" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <ViewCounter toolSlug="russiansweets" />
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

          {/* SEO記事セクション */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🍰 ロシアンスイーツ完全ガイド：心理戦・確率論・SNSトレンドゲームの世界</h2>
              
              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    ロシアンスイーツの歴史とSNSブーム
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ロシアンスイーツ（お菓子ロシアンゲーム）は、2024年にSNSで爆発的に人気となった
                    2人用の心理戦ゲームです。YouTube、TikTok、Instagramなどで
                    「お菓子の外れを引いたら負け」というシンプルなルールが
                    多くの人々を魅了し、瞬く間にトレンドとなりました。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    その人気の理由は、運と心理戦の絶妙なバランス、
                    そして誰でもすぐに理解できるシンプルなルールにあります。
                    特に若い世代を中心に、友達同士やカップル間で
                    楽しまれている新しいゲーム文化の代表格です。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎮</span>
                      基本ルールと戦略的要素
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-gray-900 mb-2">基本ルール</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 2人で交互にスイーツを選択</li>
                          <li>• 事前に外れスイーツを設定</li>
                          <li>• 外れを引いたら即アウト</li>
                          <li>• 自爆の可能性もあり</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-semibold text-gray-900 mb-2">心理戦の要素</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 相手の選択パターン分析</li>
                          <li>• ブラフとフェイント</li>
                          <li>• リスク管理と判断</li>
                          <li>• 表情や反応の読み取り</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-gray-900 mb-2">戦略的アプローチ</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 確率論に基づく選択</li>
                          <li>• 相手の心理を読む技術</li>
                          <li>• リスクとリターンの評価</li>
                          <li>• ゲーム理論の応用</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      確率論と数学的分析
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="font-semibold text-gray-900 mb-2">基本確率</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 外れスイーツの確率: 1/総数</li>
                          <li>• 自爆の確率: 1/総数</li>
                          <li>• 安全な選択の確率: (総数-2)/総数</li>
                          <li>• 期待値の計算</li>
                        </ul>
                      </div>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-semibold text-gray-900 mb-2">動的確率</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 選択後の確率変化</li>
                          <li>• 残りスイーツ数の影響</li>
                          <li>• 相手の行動パターン</li>
                          <li>• ベイズ確率の応用</li>
                        </ul>
                      </div>
                      
                      <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                        <h4 className="font-semibold text-gray-900 mb-2">最適戦略</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ミニマックス戦略</li>
                          <li>• 期待値最大化</li>
                          <li>• リスク回避戦略</li>
                          <li>• 心理的要素の考慮</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    SNSとデジタル時代のゲーム文化
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">SNSブームの要因</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>視覚的インパクト</strong>: カラフルなスイーツとドキドキ感</li>
                        <li>• <strong>シェアしやすさ</strong>: 短時間で完結するエンターテイメント</li>
                        <li>• <strong>参加型コンテンツ</strong>: 視聴者も一緒に楽しめる</li>
                        <li>• <strong>バズりやすい要素</strong>: 予想外の展開と笑い</li>
                        <li>• <strong>世代を超えた楽しさ</strong>: 年齢問わず理解できる</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">デジタル化のメリット</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>アクセシビリティ</strong>: スマホ1台でどこでもプレイ</li>
                        <li>• <strong>拡散性</strong>: SNSでのシェアと拡散</li>
                        <li>• <strong>記録性</strong>: ゲーム結果の保存と分析</li>
                        <li>• <strong>カスタマイズ性</strong>: ルールや見た目の調整</li>
                        <li>• <strong>グローバル化</strong>: 言語の壁を越えた普及</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎪</span>
                    社会的・心理的効果
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">コミュニケーション</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        アイスブレイク<br/>
                        緊張緩和<br/>
                        笑いの共有<br/>
                        関係性構築
                      </div>
                      <p className="text-sm text-gray-600">
                        短時間で人との距離を
                        縮める効果。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">心理的効果</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        ドキドキ感<br/>
                        期待と不安<br/>
                        達成感<br/>
                        ストレス解消
                      </div>
                      <p className="text-sm text-gray-600">
                        適度な緊張感による
                        心理的な刺激。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">教育的価値</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        確率の理解<br/>
                        リスク管理<br/>
                        意思決定<br/>
                        心理分析
                      </div>
                      <p className="text-sm text-gray-600">
                        遊びながら学べる
                        数学的・心理的要素。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    責任あるゲームプレイと注意点
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">適切な楽しみ方</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-red-600">避けるべき行為</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 過度な賭け事</li>
                            <li>• 依存的なプレイ</li>
                            <li>• 相手への強要</li>
                            <li>• 不適切な罰ゲーム</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-green-600">推奨される使い方</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 適度な時間でのプレイ</li>
                            <li>• 楽しさを重視</li>
                            <li>• 全員が納得するルール</li>
                            <li>• 教育的な活用</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">健全なゲーム文化</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>娯楽性重視</strong>: 勝敗よりも楽しさを優先</li>
                        <li>• <strong>相互尊重</strong>: 相手の気持ちを考慮</li>
                        <li>• <strong>適度な時間</strong>: 長時間のプレイは避ける</li>
                        <li>• <strong>安全な環境</strong>: 安心してプレイできる環境作り</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    デジタル時代のロシアンスイーツ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">オンライン化のメリット</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">技術的メリット</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 正確なランダム生成</li>
                            <li>• リアルタイム結果</li>
                            <li>• 履歴の自動保存</li>
                            <li>• マルチプラットフォーム対応</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">社会的メリット</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 遠隔地との交流</li>
                            <li>• アクセシビリティ向上</li>
                            <li>• 文化的普及</li>
                            <li>• グローバルな拡散</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">YokaUnit ロシアンスイーツの特徴</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>美しいUI/UX</strong>: カラフルで直感的なインターフェース</li>
                        <li>• <strong>高精度ランダム</strong>: 暗号学的に安全な乱数生成</li>
                        <li>• <strong>モバイル最適化</strong>: スマホ・タブレットで快適プレイ</li>
                        <li>• <strong>履歴機能</strong>: 過去の結果を記録・分析</li>
                        <li>• <strong>カスタマイズ</strong>: スイーツ数やルールの調整</li>
                        <li>• <strong>プライバシー保護</strong>: ブラウザ内完結でデータ漏洩なし</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎭</span>
                    ゲーム文化とエンターテイメント
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">現代のゲーム文化</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">SNS時代の特徴</h5>
                          <p className="text-xs text-gray-600">
                            短時間で完結、視覚的インパクト、
                            シェアしやすさ、バズりやすさ
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">エンターテイメント性</h5>
                          <p className="text-xs text-gray-600">
                            予想外の展開、笑いの要素、
                            ドキドキ感、参加型コンテンツ
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">社会的意義</h5>
                          <p className="text-xs text-gray-600">
                            コミュニケーション促進、
                            世代間交流、文化の普及
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">教育的価値</h5>
                          <p className="text-xs text-gray-600">
                            確率の理解、心理分析、
                            リスク管理、意思決定
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">文化的影響</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>新しいコミュニケーション</strong>: デジタル時代の交流方法</li>
                        <li>• <strong>エンターテイメントの進化</strong>: インタラクティブな楽しみ方</li>
                        <li>• <strong>グローバル文化</strong>: 国境を越えたゲーム文化</li>
                        <li>• <strong>世代間の橋渡し</strong>: 年齢を超えた共通体験</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    YokaUnitのロシアンスイーツは、SNS時代の新しいゲーム文化を
                    体現した革新的なエンターテイメントです。
                    この記事が、楽しく責任あるゲームプレイの参考になれば幸いです。
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>#ロシアンスイーツ</span>
                    <span>#お菓子ゲーム</span>
                    <span>#心理戦</span>
                    <span>#SNSゲーム</span>
                    <span>#2人用ゲーム</span>
                    <span>#確率ゲーム</span>
                    <span>#YokaUnit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


