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
import { useExcel2048Game } from "./hooks/useExcel2048Game"
import { ExcelInterface } from "./components/ExcelInterface"
import { GameWindow } from "./components/GameWindow"
import { FullscreenGame } from "./components/FullscreenGame"
import { useEffect } from "react"

export default function Excel2048ClientPage() {
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
        "Microsoft Excel風インターフェース",
        "隠しゲーム機能",
        "2048パズルゲーム",
        "仕事中でもバレない",
        "完全無料",
        "登録不要",
        "スマホ対応",
        "全画面表示対応"
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

    let scriptTag = document.querySelector('#excel2048-structured-data')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'excel2048-structured-data'
      ;(scriptTag as HTMLScriptElement).type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

    return () => {
      const existingScript = document.querySelector('#excel2048-structured-data')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

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

          {/* SEO用のコンテンツセクション */}
          <motion.div 
            className="mt-8 max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* 機能紹介 */}
            <section className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 ゲームモード紹介</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-3">📊 Excel風UI</h3>
                  <p className="text-gray-600 text-sm">
                    Microsoft Excelそっくりなインターフェース。表計算作業をしているように見えます。
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-3">🎯 2048パズル</h3>
                  <p className="text-gray-600 text-sm">
                    数字のタイルを合成して2048を目指す定番パズルゲーム。
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-3">👔 隠しモード</h3>
                  <p className="text-gray-600 text-sm">
                    ESCキーでゲームを隠せるステルス機能付き。仕事中でも安心。
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-3">📱 全画面対応</h3>
                  <p className="text-gray-600 text-sm">
                    Fキーで全画面表示。スマホ・タブレットでも快適にプレイ。
                  </p>
                </div>
              </div>
            </section>

            {/* よくある質問 */}
            <section className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ よくある質問</h2>
              <div className="space-y-4">
                <details className="bg-white rounded-lg shadow-md p-6">
                  <summary className="font-bold cursor-pointer">Excel風2048とはどんなゲームですか？</summary>
                  <p className="mt-3 text-gray-600">
                    Microsoft Excelそっくりな見た目の2048パズルゲームです。表計算ソフトで作業をしているように見えて、実は2048パズルを楽しめる隠しゲーム機能付きです。
                  </p>
                </details>
                <details className="bg-white rounded-lg shadow-md p-6">
                  <summary className="font-bold cursor-pointer">仕事中にバレずにプレイできますか？</summary>
                  <p className="mt-3 text-gray-600">
                    はい。Excel風のインターフェースで表計算作業をしているように見えます。ESCキーでゲームを瞬時に隠すことができ、セルA2をクリックして再開できます。
                  </p>
                </details>
                <details className="bg-white rounded-lg shadow-md p-6">
                  <summary className="font-bold cursor-pointer">無料で遊べますか？</summary>
                  <p className="mt-3 text-gray-600">
                    はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。
                  </p>
                </details>
                <details className="bg-white rounded-lg shadow-md p-6">
                  <summary className="font-bold cursor-pointer">スマホでも遊べますか？</summary>
                  <p className="mt-3 text-gray-600">
                    はい、スマートフォンやタブレットでも快適にプレイできます。全画面表示機能もあり、どんなデバイスでも楽しめます。
                  </p>
                </details>
              </div>
            </section>

            {/* 使い方ガイド */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                🎯 使い方ガイド
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">セルA2をクリック</h3>
                  <p className="text-blue-700 text-sm">
                    Excelのセル「A2」をクリックして2048ゲームを開始
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">矢印キーで操作</h3>
                  <p className="text-blue-700 text-sm">
                    矢印キーでタイルを移動し、同じ数字を合成
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">2048を目指そう</h3>
                  <p className="text-blue-700 text-sm">
                    数字を合成して2048のタイルを作成してクリア
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📋 ショートカットキー</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div><kbd className="px-2 py-1 bg-gray-200 rounded">ESC</kbd> ゲーム隠す</div>
                  <div><kbd className="px-2 py-1 bg-gray-200 rounded">F</kbd> 全画面</div>
                  <div><kbd className="px-2 py-1 bg-gray-200 rounded">R</kbd> リスタート</div>
                  <div><kbd className="px-2 py-1 bg-gray-200 rounded">↑↓←→</kbd> 移動</div>
                </div>
              </div>
            </section>

            {/* 関連キーワード */}
            <section className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ 関連キーワード</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Excel風2048", "エクセル2048", "隠しゲーム", "仕事中ゲーム", "バレないゲーム",
                  "2048パズル", "スプレッドシート風", "オフィス風ゲーム", "Microsoft Excel",
                  "表計算ソフト風", "偽装ゲーム", "ステルスゲーム", "無料ゲーム", "ブラウザゲーム"
                ].map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
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
      
      <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="excel2048" limit={8} />
      <RelatedTools currentToolSlug="excel2048" />
      
      <SiteFooter />
    </div>
  )
}
