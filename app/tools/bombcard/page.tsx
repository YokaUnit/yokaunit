import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { BombCardGameClient } from "./BombCardGameClient"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("bombcard", {
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
      locale: "ja_JP",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "爆弾カードゲーム💣｜みんなで楽しめる無料パーティーゲーム",
      description: "【完全無料】みんなで楽しめる爆弾カードゲーム✨ カードを選んで爆弾を避けよう🎯 最後まで生き残った人の勝利🏆 スマホ・PC対応で登録不要📱",
      creator: "@yokaunit",
      site: "@yokaunit"
    },
    alternates: { canonical: "https://yokaunit.com/tools/bombcard" },
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
  })
}

const breadcrumbItems = [
  { label: "ホーム", href: "/" },
  { label: "ツール一覧", href: "/tools" },
  { label: "爆弾カードゲーム", href: "/tools/bombcard" },
]

export default async function BombCardGamePage() {
  const imageUrl = await getToolImageUrl("bombcard")
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "爆弾カードゲーム",
            description: "みんなで楽しめる爆弾カードゲーム！カードを選んで爆弾を避けよう！最後まで生き残った人の勝利です。",
            url: "https://yokaunit.com/tools/bombcard",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
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

      {/* SEO記事セクション */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💣 爆弾カードゲーム完全ガイド：確率論・心理戦・パーティーゲームの極意</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                爆弾カードゲームの魅力と歴史
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                爆弾カードゲームは、複数のプレイヤーが順番にカードを選び、
                爆弾を避けながら最後まで生き残ることを目指す
                シンプルで緊張感のあるパーティーゲームです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                その魅力は、運と戦略の絶妙なバランスにあります。
                単純なルールながら、プレイヤー同士の心理戦や
                確率論的思考が重要な要素となり、
                年齢を問わず楽しめるゲームとして人気を博しています。
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
                      <li>• 複数のカードから1枚ずつ選択</li>
                      <li>• 爆弾カードを引いたら即アウト</li>
                      <li>• 最後まで生き残った人が勝利</li>
                      <li>• 順番にカードを選ぶ</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-gray-900 mb-2">戦略的要素</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 残りカード数の分析</li>
                      <li>• 爆弾の位置の推測</li>
                      <li>• 他プレイヤーの行動観察</li>
                      <li>• リスク管理と判断</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-gray-900 mb-2">心理戦の要素</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 相手の選択パターン分析</li>
                      <li>• ブラフとフェイント</li>
                      <li>• 表情や反応の読み取り</li>
                      <li>• 緊張感の利用</li>
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
                      <li>• 爆弾カードの確率: 1/総数</li>
                      <li>• 安全なカードの確率: (総数-1)/総数</li>
                      <li>• 期待値の計算</li>
                      <li>• 条件付き確率の応用</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-2">動的確率</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 選択後の確率変化</li>
                      <li>• 残りカード数の影響</li>
                      <li>• ベイズ確率の応用</li>
                      <li>• 最適戦略の導出</li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-semibold text-gray-900 mb-2">統計的分析</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 生存確率の計算</li>
                      <li>• 期待生存時間</li>
                      <li>• リスク評価指標</li>
                      <li>• モンテカルロシミュレーション</li>
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
                    <li>• <strong>家族ゲーム</strong>: 世代を超えた楽しみ</li>
                    <li>• <strong>学級レク</strong>: 教育現場での活用</li>
                    <li>• <strong>社内イベント</strong>: チームビルディング</li>
                    <li>• <strong>オンライン会議</strong>: リモートワークの息抜き</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">教育的効果</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>確率思考</strong>: 数学的思考力の向上</li>
                    <li>• <strong>リスク管理</strong>: 意思決定能力の育成</li>
                    <li>• <strong>心理分析</strong>: 人間心理の理解</li>
                    <li>• <strong>コミュニケーション</strong>: 対話と観察力</li>
                    <li>• <strong>ストレス管理</strong>: 緊張感への対処</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                心理学的側面と行動分析
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">認知バイアス</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    確証バイアス<br/>
                    アンカリング効果<br/>
                    利用可能性ヒューリスティック<br/>
                    代表性ヒューリスティック
                  </div>
                  <p className="text-sm text-gray-600">
                    人間の判断における
                    認知的な偏り。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">感情の影響</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    緊張と不安<br/>
                    期待と興奮<br/>
                    恐怖と回避<br/>
                    達成感と満足
                  </div>
                  <p className="text-sm text-gray-600">
                    ゲーム中の感情が
                    判断に与える影響。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">社会的要素</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    社会的証明<br/>
                    同調圧力<br/>
                    競争意識<br/>
                    協調と対立
                  </div>
                  <p className="text-sm text-gray-600">
                    他者との関係が
                    行動に与える影響。
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
                        <li>• 過度な緊張感の演出</li>
                        <li>• プレッシャーの強要</li>
                        <li>• 長時間の連続プレイ</li>
                        <li>• 不適切な罰ゲーム</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1 text-green-600">推奨される使い方</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 適度な緊張感でのプレイ</li>
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
                デジタル時代の爆弾カードゲーム
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
                  <h4 className="font-semibold text-gray-900 mb-2">YokaUnit 爆弾カードゲームの特徴</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>美しいUI/UX</strong>: 直感的で分かりやすいインターフェース</li>
                    <li>• <strong>高精度ランダム</strong>: 暗号学的に安全な乱数生成</li>
                    <li>• <strong>モバイル最適化</strong>: スマホ・タブレットで快適プレイ</li>
                    <li>• <strong>履歴機能</strong>: 過去の結果を記録・分析</li>
                    <li>• <strong>カスタマイズ</strong>: カード数やルールの調整</li>
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
                      <h5 className="font-semibold text-sm mb-1">エンターテイメント性</h5>
                      <p className="text-xs text-gray-600">
                        緊張感、ドキドキ感、
                        予想外の展開、笑いの要素
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
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">文化的影響</h5>
                      <p className="text-xs text-gray-600">
                        新しいコミュニケーション、
                        エンターテイメントの進化
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">文化的価値</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>コミュニケーションツール</strong>: 人との距離を縮める効果</li>
                    <li>• <strong>学習機会</strong>: 確率や心理の学習に活用</li>
                    <li>• <strong>ストレス解消</strong>: 適度な緊張感による気分転換</li>
                    <li>• <strong>創造性向上</strong>: 戦略的思考力の育成</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                YokaUnitの爆弾カードゲームは、シンプルなルールの中に
                深い戦略性と心理戦の要素を含んでいます。
                この記事が、楽しく責任あるゲームプレイの参考になれば幸いです。
              </p>
              <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                <span>#爆弾カードゲーム</span>
                <span>#パーティーゲーム</span>
                <span>#確率ゲーム</span>
                <span>#心理戦</span>
                <span>#マルチプレイ</span>
                <span>#無料ゲーム</span>
                <span>#YokaUnit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <RelatedTools currentToolSlug="bombcard" />
      </div>
      
      <ScrollToTop />
      <SiteFooter />
    </div>
  )
}
