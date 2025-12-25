"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ToolHeroImage } from "@/components/tool-hero-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RefreshCw, HelpCircle } from "lucide-react"
import { useConnect4Game } from "./hooks/useConnect4Game"
import { GameBoard } from "./components/GameBoard"
import type { Player } from "./lib/game-logic"

interface Connect4ClientPageProps {
  toolImageUrl?: string | null
  toolTitle?: string
}

export default function Connect4ClientPage({ toolImageUrl = null, toolTitle = "コネクトフォー" }: Connect4ClientPageProps) {
  const { gameState, makeMove, resetGame } = useConnect4Game()
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeCoin, setActiveCoin] = useState<{ player: Player; column: number; row: number } | null>(null)
  const [fallingCells, setFallingCells] = useState<number[]>([])

  const handleColumnClick = (col: number) => {
    if (isAnimating || gameState.status !== "playing") return

    // 次の空き行を計算
    let targetRow = -1
    for (let row = 5; row >= 0; row--) {
      if (gameState.board[row][col] === null) {
        targetRow = row
        break
      }
    }

    if (targetRow === -1) return // 列が満杯

    // アニメーション中はmakeMoveを呼ばず、アニメーション完了後に呼ぶ
    const currentPlayer = gameState.currentPlayer
    setIsAnimating(true)
    setActiveCoin({
      player: currentPlayer,
      column: col,
      row: targetRow,
    })

    // 落下中のセルを順番に色付け（コインが通過するセル、目標位置も含む）
    setFallingCells([])
    const fallDuration = 400 // 落下時間（ミリ秒）
    const totalRows = targetRow + 1 // 目標位置も含む
    const delayPerRow = fallDuration / totalRows
    
    // コインが通過するセルを順番に色付け（上から下へ、目標位置も含む）
    for (let row = 0; row <= targetRow; row++) {
      setTimeout(() => {
        setFallingCells((prev) => {
          // 前のセルを削除して、現在のセルのみを表示
          return [row]
        })
      }, row * delayPerRow)
    }
    
    // 最終位置に到達したら、セルの色付けをクリアしてコインを配置
    // クロージャーでcolとcurrentPlayerを保持して確実にmakeMoveを呼び出す
    setTimeout(() => {
      setFallingCells([])
      makeMove(col)
      setIsAnimating(false)
      setActiveCoin(null)
      setFallingCells([])
    }, fallDuration)
  }

  const handleCoinLanded = () => {
    // この関数はGameBoardから呼ばれる可能性があるため、残しておく
    // ただし、メインの処理はhandleColumnClick内のsetTimeoutで行う
    setIsAnimating(false)
    setActiveCoin(null)
    setFallingCells([])
  }

  const getStatusMessage = () => {
    switch (gameState.status) {
      case "red-wins":
        return "赤の勝利！"
      case "yellow-wins":
        return "黄色の勝利！"
      case "draw":
        return "引き分け！"
      default:
        return `${gameState.currentPlayer === "red" ? "赤" : "黄色"}のターン`
    }
  }

  const getStatusColor = () => {
    switch (gameState.status) {
      case "red-wins":
        return "text-red-600"
      case "yellow-wins":
        return "text-yellow-600"
      case "draw":
        return "text-gray-600"
      default:
        return gameState.currentPlayer === "red" ? "text-red-600" : "text-yellow-600"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundAnimation />
      <div className="relative z-10">
        <SiteHeader />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "コネクトフォー", href: "/tools/connect4" },
              ]}
            />

            <div className="max-w-4xl mx-auto mt-4 md:mt-6">
            {/* ツール画像 */}
            {toolImageUrl && (
              <ToolHeroImage imageUrl={toolImageUrl} title={toolTitle} />
            )}

            {/* ヒーローセクション */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">コネクトフォー</h1>
              <p className="text-gray-600">スムーズな落下アニメーションで楽しむ4目並べゲーム</p>
            </div>

            <div>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">ゲーム</CardTitle>
                      <CardDescription>横・縦・斜めで4つ揃えたら勝利！</CardDescription>
                    </div>
                    <Button onClick={resetGame} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      リセット
                    </Button>
                  </div>
                </CardHeader>
                <CardContent style={{ paddingTop: '40px', paddingBottom: '20px', overflow: 'visible' }}>
                  {/* ステータス表示 */}
                  <div className="mb-6 md:mb-8 text-center">
                    <div className={`text-xl md:text-2xl font-bold ${getStatusColor()}`}>{getStatusMessage()}</div>
                    {gameState.status !== "playing" && (
                      <div className="mt-2">
                        <Trophy className="w-6 h-6 mx-auto text-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* ゲームボード */}
                  <div className="flex justify-center" style={{ overflow: 'visible', position: 'relative' }}>
                    <GameBoard
                      board={gameState.board}
                      currentPlayer={gameState.currentPlayer}
                      onColumnClick={handleColumnClick}
                      isAnimating={isAnimating}
                      activeCoin={activeCoin}
                      onCoinLanded={handleCoinLanded}
                      fallingCells={fallingCells}
                    />
                  </div>

                  {/* ルール説明 */}
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">遊び方</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• 上からコインを落として、横・縦・斜めで4つ揃えたら勝利</li>
                          <li>• 赤と黄色が交互にプレイ</li>
                          <li>• コインがスムーズに落ちて盤面に入ります</li>
                          <li>• 列が満杯の場合は選択できません</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

            {/* SEO記事セクション */}
            <div className="mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              🎯 コネクトフォー完全ガイド：4つ並べ・4目並べゲーム・戦略・アルゴリズムの科学
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">🎯</span>
                  コネクトフォーとは
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                  コネクトフォー（Connect Four、4つ並べ・4目並べ）は、1974年にMilton Bradley社が発売した2人対戦のボードゲームです。
                  7×6のグリッドに、交互にコインを落とし、横・縦・斜めのいずれかで4つ揃えたら勝利するシンプルながらも戦略的なゲームです。
                  コネクトフォーは「4つ並べ」「4目並べ」とも呼ばれ、世界中で親しまれている人気のボードゲームです。
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  このゲームは、数学的には「完全情報ゲーム」として分類され、先手必勝の戦略が存在することが証明されています。
                  しかし、実戦では心理戦や読み合いが重要で、非常に奥深いゲームとして親しまれています。
                  コネクトフォー（connect4）は、シンプルなルールながら深い戦略性を持つ、まさに「k」の文字が象徴するような完成度の高いゲームです。
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🎮</span>
                    基本的なルール
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-green-50 p-3 md:p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">勝利条件</h4>
                      <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                        <li>• 横方向に4つ揃える</li>
                        <li>• 縦方向に4つ揃える</li>
                        <li>• 斜め方向（左上→右下）に4つ揃える</li>
                        <li>• 斜め方向（右上→左下）に4つ揃える</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-3 md:p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">ゲームの流れ</h4>
                      <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                        <li>• 2人のプレイヤーが交互にコインを落とす</li>
                        <li>• 上から下にコインが落ちる</li>
                        <li>• 列が満杯の場合は選択できない</li>
                        <li>• 盤面が満杯で勝者がいない場合は引き分け</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🧠</span>
                    戦略とテクニック
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">攻撃戦略</h4>
                      <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                        <li>• 複数の勝利ラインを作る</li>
                        <li>• 相手の防御をかいくぐる</li>
                        <li>• 中央列を優先的に使う</li>
                        <li>• 相手の勝利を阻止しながら攻撃</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-3 md:p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">防御戦略</h4>
                      <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                        <li>• 相手の勝利ラインを阻止</li>
                        <li>• 危険な列を先に埋める</li>
                        <li>• 相手の戦略を読み取る</li>
                        <li>• 時間をかけて慎重に判断</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 md:p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">🔬</span>
                  数学的・アルゴリズム的側面
                </h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">ゲーム理論</h4>
                    <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                      <li>• <strong>完全情報ゲーム</strong>: すべての情報が公開されている</li>
                      <li>• <strong>ゼロサムゲーム</strong>: 一方の勝利は他方の敗北</li>
                      <li>• <strong>先手必勝</strong>: 最適な戦略で先手が必ず勝てる</li>
                      <li>• <strong>ミニマックスアルゴリズム</strong>: 最適な手を計算する手法</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">アルゴリズム</h4>
                    <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                      <li>• <strong>勝敗判定</strong>: 4つ揃ったかをチェック</li>
                      <li>• <strong>探索アルゴリズム</strong>: 最適な手を探索</li>
                      <li>• <strong>評価関数</strong>: 盤面の優劣を評価</li>
                      <li>• <strong>枝刈り</strong>: 不要な探索を省略</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">📱</span>
                  オンライン版の特徴
                </h3>
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">スムーズなアニメーション</h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      コインが上から落ちるスムーズなアニメーションで、リアルなゲーム体験を提供します。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">モバイル対応</h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      スマートフォンやタブレットでも快適にプレイできるレスポンシブデザインです。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">無料・登録不要</h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      ブラウザですぐに遊べる無料ゲーム。登録やダウンロードは不要です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">🎓</span>
                  教育効果と応用
                </h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">教育的価値</h4>
                    <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                      <li>• <strong>論理的思考</strong>: 先を読む力が身につく</li>
                      <li>• <strong>戦略的思考</strong>: 攻撃と防御のバランス</li>
                      <li>• <strong>パターン認識</strong>: 勝利パターンの発見</li>
                      <li>• <strong>集中力</strong>: 長時間の集中が必要</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">応用分野</h4>
                    <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                      <li>• <strong>AI開発</strong>: ゲームAIの研究</li>
                      <li>• <strong>アルゴリズム学習</strong>: 探索アルゴリズムの実践</li>
                      <li>• <strong>ゲーム理論</strong>: 戦略ゲームの理解</li>
                      <li>• <strong>プログラミング教育</strong>: ゲーム開発の教材</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </main>

        <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="connect4" limit={8} />

        <RelatedTools currentToolSlug="connect4" />
      </div>
      <SiteFooter />
    </div>
  )
}

