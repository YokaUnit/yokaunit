"use client"

import { motion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackgroundAnimation } from "@/components/background-animation"
import { useExcel2048Game } from "./hooks/useExcel2048Game"
import { ExcelInterface } from "./components/ExcelInterface"
import { GameWindow } from "./components/GameWindow"
import { FullscreenGame } from "./components/FullscreenGame"

export default function Excel2048ClientPage() {
  const game = useExcel2048Game()

  const breadcrumbItems = [
    { href: "/tools", label: "ツール一覧" },
    { href: "/tools/excel2048", label: "Excel風2048" },
  ]

  // 全画面表示の場合
  if (game.isFullscreen) {
    return (
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* ツール説明セクション */}
          <motion.div 
            className="mb-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Excel風2048ゲーム
            </h1>
            <p className="text-gray-600 mb-4">
              Microsoft Excelそっくりな見た目の2048パズルゲーム！表計算作業をしているように見えて実はゲーム。
              仕事中でも上司にバレずに2048パズルを楽しめる隠しゲームです。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">隠しゲーム</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">2048パズル</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Excel風</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">仕事中対応</span>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="text-amber-800 text-sm">
                <strong>操作方法：</strong> セルA2をクリックして「2048」を開始。矢印キーでタイルを移動、同じ数字を合体させて2048を目指そう！
                ESCキーでゲームを隠す、Fキーで全画面表示ができます。
              </p>
            </div>
          </motion.div>

          {/* ゲーム画面 */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* 全画面表示ボタン */}
            <Button
              onClick={game.toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-700"
              size="sm"
              title="全画面表示 (Fキー)"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              全画面
            </Button>
            
            <ExcelInterface onGameOpen={game.openGame} />
          </motion.div>
        </div>
      </main>

      <SiteFooter />
      <ScrollToTop />
      
      {/* ゲームウィンドウ */}
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
    </div>
  )
}
