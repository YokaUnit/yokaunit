"use client"

import { motion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ToolHeroImage } from "@/components/tool-hero-image"
import { useExcel2048Game } from "./hooks/useExcel2048Game"
import { ExcelInterface } from "./components/ExcelInterface"
import { GameWindow } from "./components/GameWindow"
import { FullscreenGame } from "./components/FullscreenGame"
import { useEffect } from "react"

interface Excel2048ClientPageProps {
  toolImageUrl?: string | null
  toolTitle?: string
}

export default function Excel2048ClientPage({ toolImageUrl = null, toolTitle = "Excel風2048" }: Excel2048ClientPageProps) {
  const game = useExcel2048Game()

  const breadcrumbItems = [
    { href: "/tools", label: "ツール一覧" },
    { href: "/tools/excel2048", label: "Excel風2048" },
  ]

  // SEO設定と構造化データ
  useEffect(() => {
    // 構造化データ
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Excel風2048",
      "description": "Microsoft Excelそっくりな見た目の2048パズルゲーム・仕事中でもバレない隠しゲーム",
      "url": window.location.href,
      "genre": "Puzzle",
      "gameLocation": "Online",
      "numberOfPlayers": {
        "@type": "QuantitativeValue",
        "value": 1
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "applicationCategory": "Game",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "featureList": [
        "Microsoft Excelそっくりな見た目",
        "仕事中でもバレない隠しゲーム",
        "完全無料・登録不要",
        "スマホ・PC・タブレット対応",
        "キーボード操作対応",
        "フルスクリーン対応"
      ],
      "screenshot": "https://yokaunit.com/ogp/excel2048-game.png",
      "author": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0]
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="max-w-4xl mx-auto mt-6">
              {/* ツール画像 */}
              {toolImageUrl && (
                <ToolHeroImage imageUrl={toolImageUrl} title={toolTitle} />
              )}
              {/* ヘッダー */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-3xl shadow-xl">
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Excel風2048</h1>
                <h2 className="text-lg md:text-xl text-gray-600 mb-4">Microsoft Excelそっくりな見た目の2048パズルゲーム</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  仕事中でもバレない隠しゲームとして設計された、Excelの見た目を完全再現した2048パズルゲーム
                </p>
              </div>

              {/* メインゲーム */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <ExcelInterface onGameOpen={game.openGame} />
              </motion.div>

              {/* フルスクリーンボタン */}
              <div className="text-center mb-8">
                <Button
                  onClick={() => {
                    if (!game.isFullscreen) game.toggleFullscreen()
                  }}
                  variant="outline"
                  className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 px-6 rounded-xl"
                >
                  <Maximize2 className="h-5 w-5 mr-2" />
                  フルスクリーンでプレイ
                </Button>
              </div>

              {/* カテゴリツール */}
              <div className="mt-8">
                <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="excel2048" limit={8} />
              </div>

              {/* 使い方ガイド */}
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">使い方ガイド</h2>
                <div className="space-y-4">
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">基本的な操作方法</summary>
                    <p className="mt-3 text-gray-600">
                      矢印キー（↑↓←→）またはWASDキーで数字を移動させます。同じ数字のタイルが接触すると合体し、2倍の数字になります。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">Excel風の見た目について</summary>
                    <p className="mt-3 text-gray-600">
                      このゲームはMicrosoft Excelの見た目を完全に再現しています。仕事中でも上司にバレずにゲームを楽しむことができます。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">フルスクリーンモード</summary>
                    <p className="mt-3 text-gray-600">
                      フルスクリーンボタン（または F キー）で切り替えできます。ESC キーではフルスクリーンは終了せず、ゲームウィンドウのみ最小化します。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">ESC キーの使い方</summary>
                    <ul className="mt-3 text-gray-600 list-disc pl-6 space-y-1">
                      <li>ポップアップ表示のゲームウィンドウ: ESC で最小化/復元</li>
                      <li>フルスクリーン表示: ESC でゲームウィンドウのみ最小化（フルスクリーンは維持）</li>
                      <li>フルスクリーンの終了は画面右上ボタンか F キーで実行</li>
                    </ul>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">目標と戦略</summary>
                    <p className="mt-3 text-gray-600">
                      目標は2048のタイルを作ることです。大きな数字を一つの角に集める「角戦略」が効果的です。
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

              {/* 関連キーワード */}
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ 関連キーワード</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Excel風2048", "Microsoft Excel", "隠しゲーム", "仕事中ゲーム", "バレないゲーム",
                    "2048パズル", "Excel風ゲーム", "表計算風", "プログラマー", "オフィスワーカー",
                    "偽装ゲーム", "ステルスゲーム", "オフィスゲーム", "休憩時間", "ブラウザゲーム",
                    "無料ゲーム", "パズルゲーム", "数字パズル", "論理ゲーム", "頭脳ゲーム",
                    "YokaUnit", "ヨカユニット", "ウェブゲーム", "HTML5ゲーム", "レスポンシブゲーム",
                    "モバイル対応", "スマホゲーム", "タブレット対応", "キーボード操作", "フルスクリーン",
                    "職場でバレないゲーム", "在宅勤務の息抜き", "サボり防止の小休憩", "こっそり遊べるゲーム",
                    "生産性向上のマイクロブレイク", "ビジネスツール風ゲーム", "Excel偽装ゲーム"
                  ].map((keyword) => (
                    <span key={keyword} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>

              {/* 仕事中にバレずに遊べる工夫（SEOセクション） */}
              <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🕶️ 仕事中にバレずに遊べる工夫</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Excel風2048は、表計算ソフトの見た目を再現しつつ、短時間でリフレッシュできるマイクロブレイク用のゲームとして設計されています。
                    タブ切り替えの必要がなく、画面上でも自然に見えるため、周囲の目を気にせず休憩できます。
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>UIがExcel風で、遠目には作業画面に見える</li>
                    <li>ESCで即座にウィンドウを最小化（フルスクリーン中は無効）</li>
                    <li>Fキーで素早くフルスクリーン切替（誤操作防止のためESCでは終了しません）</li>
                    <li>矢印キー操作でマウス移動が少なく、作業の流れを崩しにくい</li>
                  </ul>
                  <p className="text-xs text-gray-500">
                    注意: 実際の業務規則や就業規則に従い、休憩時間にお楽しみください。
                  </p>
                </div>
              </section>

              {/* SEO記事 */}
              <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 Excel風2048完全ガイド：UIデザイン・ゲーム理論・職場文化の科学</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎨</span>
                      UIデザインと認知心理学
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">スキーマ理論の応用</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>既存知識の活用</strong>: Excel操作経験の転用</li>
                          <li>• <strong>学習コストの軽減</strong>: 新しいUIの習得不要</li>
                          <li>• <strong>直感的操作</strong>: セル選択とキーボード操作</li>
                          <li>• <strong>メンタルモデル</strong>: 表計算ソフトの概念</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">認知負荷理論</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>内在的負荷軽減</strong>: 学習内容の複雑さ軽減</li>
                          <li>• <strong>外在的負荷軽減</strong>: UI操作の習得不要</li>
                          <li>• <strong>関連負荷増加</strong>: ゲームルールに集中</li>
                          <li>• <strong>転移学習</strong>: 既存スキルの活用</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      ゲーム理論と戦略的思考
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">2048パズルの数学的構造</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          2の累乗: 2, 4, 8, 16...<br/>
                          目標: 2048 (2^11)<br/>
                          角戦略: 最適解<br/>
                          確率的要素: ランダム配置
                        </div>
                        <p className="text-sm text-gray-600">
                          数学的に証明された
                          最適戦略の存在。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">確率論とリスク管理</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          安全な手 vs リスク<br/>
                          確率計算<br/>
                          期待値分析<br/>
                          意思決定理論
                        </div>
                        <p className="text-sm text-gray-600">
                          確率的要素による
                          リスク管理の学習。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🏢</span>
                      職場環境とデジタルワークカルチャー
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">マイクロブレイクの重要性</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-purple-600">生産性向上</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 集中力の維持</li>
                              <li>• ストレス軽減</li>
                              <li>• 脳の疲労回復</li>
                              <li>• 作業効率向上</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-blue-600">認知負荷管理</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• マルチタスキング対応</li>
                              <li>• 負荷の調整</li>
                              <li>• 集中力のリセット</li>
                              <li>• 追加負荷の最小化</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">職場での活用場面</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>短時間休憩</strong>: 5-10分の効果的な休憩</li>
                          <li>• <strong>ストレス軽減</strong>: 精神的負荷の軽減</li>
                          <li>• <strong>集中力回復</strong>: 作業効率の向上</li>
                          <li>• <strong>チームビルディング</strong>: 同僚との交流</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎮</span>
                      ゲーミフィケーションとユーザーエンゲージメント
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">親しみやすさ</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          既存UIの模倣<br/>
                          技術的障壁の低下<br/>
                          学習コストの削減<br/>
                          アクセシビリティ向上
                        </div>
                        <p className="text-sm text-gray-600">
                          既存ソフトウェアの
                          見た目を活用。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">エンゲージメント</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          スコアシステム<br/>
                          達成感の提供<br/>
                          継続的プレイ<br/>
                          競争要素
                        </div>
                        <p className="text-sm text-gray-600">
                          ゲーム要素による
                          継続的な関与。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">学習効果</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          戦略的思考<br/>
                          数学的概念<br/>
                          確率論の理解<br/>
                          意思決定スキル
                        </div>
                        <p className="text-sm text-gray-600">
                          教育的価値の
                          高いゲーム体験。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📈</span>
                      パフォーマンス向上とスキル開発
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">認知スキルの向上</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-red-600">戦略的思考</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 長期的計画</li>
                              <li>• リスク評価</li>
                              <li>• 最適化思考</li>
                              <li>• パターン認識</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-green-600">数学的思考</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 確率計算</li>
                              <li>• 期待値分析</li>
                              <li>• 論理的推論</li>
                              <li>• 問題解決</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">実践的応用</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>業務効率化</strong>: 戦略的思考の業務への応用</li>
                          <li>• <strong>意思決定</strong>: リスク評価と最適化</li>
                          <li>• <strong>問題解決</strong>: 論理的アプローチの習得</li>
                          <li>• <strong>チームワーク</strong>: 協調的な問題解決</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Excel風2048は、UIデザインの心理学とゲーム理論を融合した革新的なツールです。
                      職場環境での活用を通じて、生産性とスキル向上を実現しましょう。
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                      <span>#Excel風2048</span>
                      <span>#UIデザイン</span>
                      <span>#ゲーム理論</span>
                      <span>#職場文化</span>
                      <span>#生産性向上</span>
                      <span>#YokaUnit</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 最新のツール（ページ最下部に移動） */}
              <div className="mt-12">
                <RelatedTools currentToolSlug="excel2048" />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <SiteFooter />
      <ScrollToTop />
      
      {/* ウィンドウ表示のゲーム */}
      <GameWindow
        board={game.board}
        score={game.score}
        bestScore={game.bestScore}
        isGameOver={game.isGameOver}
        gameVisible={game.gameVisible}
        gamePosition={game.gamePosition}
        gameSize={game.gameSize}
        isMinimized={game.isMinimized}
        onMouseDown={game.handleMouseDown}
        onMinimize={game.minimizeGame}
        onClose={game.closeGame}
        onResizeMouseDown={game.handleResizeMouseDown}
        onInitializeGame={game.initializeGame}
      />

      {/* フルスクリーンゲーム */}
      {game.isFullscreen && (
        <FullscreenGame
          board={game.board}
          score={game.score}
          bestScore={game.bestScore}
          isGameOver={game.isGameOver}
          gameVisible={game.gameVisible}
          gamePosition={game.gamePosition}
          gameSize={game.gameSize}
          isMinimized={game.isMinimized}
          onGameOpen={game.openGame}
          onMouseDown={game.handleMouseDown}
          onMinimize={game.minimizeGame}
          onClose={game.closeGame}
          onResizeMouseDown={game.handleResizeMouseDown}
          onInitializeGame={game.initializeGame}
          onToggleFullscreen={game.toggleFullscreen}
        />
      )}
    </>
  )
}