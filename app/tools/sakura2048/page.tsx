"use client"

import { useState, useEffect, useCallback } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackgroundAnimation } from "@/components/background-animation"
import { motion } from "framer-motion"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SakuraEditor() {
  const [board, setBoard] = useState<number[][]>(() => {
    const newBoard = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0))
    // 初期配置
    addRandomTile(newBoard)
    addRandomTile(newBoard)
    return newBoard
  })
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("sakura2048-best") || "0")
    }
    return 0
  })

  // SEO設定を強化
  useEffect(() => {
    document.title = "サクラ2048｜サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム【無料】"
    
    // メタディスクリプション
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "サクラエディタそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。コードを書いているフリをしながら2048パズルに挑戦。完全無料・登録不要で即プレイ可能。"
      )
    }

    // キーワード
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "サクラ2048,サクラエディタ,隠しゲーム,仕事中ゲーム,バレないゲーム,2048パズル,エディタ風ゲーム,コーディング風,プログラマー,テキストエディタ,偽装ゲーム,ステルスゲーム,オフィスゲーム,休憩時間,ブラウザゲーム,無料ゲーム,パズルゲーム,数字パズル,論理ゲーム,頭脳ゲーム,YokaUnit,ヨカユニット,ウェブゲーム,HTML5ゲーム,レスポンシブゲーム,モバイル対応,スマホゲーム,タブレット対応,カモフラージュ,偽装画面,作業風,開発者ツール"
      )
    }

    // OGPタグ
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute("content", "サクラ2048｜サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム - YokaUnit")
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "サクラエディタそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。コードを書いているフリをしながら2048パズルに挑戦。"
      )
    }

    // 構造化データ
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "サクラ2048",
      "description": "サクラエディタ風2048ゲーム・仕事中でもバレない隠しゲーム",
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
        "サクラエディタ風インターフェース",
        "隠しゲーム機能",
        "2048パズルゲーム",
        "仕事中でもバレない",
        "完全無料",
        "登録不要",
        "スマホ対応"
      ]
    }

    let scriptTag = document.querySelector('#sakura2048-structured-data')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'sakura2048-structured-data'
      ;(scriptTag as HTMLScriptElement).type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)
  }, [])
  const [gameOver, setGameOver] = useState(false)
  const [showBorders, setShowBorders] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [showColors, setShowColors] = useState(false)
  const [currentTab, setCurrentTab] = useState<"game" | "help">("game")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // ランダムな位置に2または4を追加
  function addRandomTile(board: number[][]) {
    const emptyCells: [number, number][] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j])
        }
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      board[row][col] = Math.random() < 0.9 ? 2 : 4
    }
  }

  // 配列を左に移動・マージ
  function moveLeft(row: number[]): { newRow: number[]; points: number } {
    const filtered = row.filter((val) => val !== 0)
    const newRow = [...filtered]
    let points = 0

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2
        points += newRow[i]
        newRow[i + 1] = 0
      }
    }

    const finalRow = newRow.filter((val) => val !== 0)
    while (finalRow.length < 4) {
      finalRow.push(0)
    }

    return { newRow: finalRow, points }
  }

  // ボードを回転
  function rotateBoard(board: number[][]): number[][] {
    const newBoard = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0))
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newBoard[j][3 - i] = board[i][j]
      }
    }
    return newBoard
  }

  // ゲーム移動処理
  function move(direction: string) {
    if (gameOver) return

    let newBoard = board.map((row) => [...row])
    let totalPoints = 0
    let moved = false

    // 方向に応じてボードを回転
    if (direction === "up") {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)))
    } else if (direction === "right") {
      newBoard = rotateBoard(rotateBoard(newBoard))
    } else if (direction === "down") {
      newBoard = rotateBoard(newBoard)
    }

    // 左移動処理
    for (let i = 0; i < 4; i++) {
      const { newRow, points } = moveLeft(newBoard[i])
      if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
        moved = true
      }
      newBoard[i] = newRow
      totalPoints += points
    }

    // ボードを元の向きに戻す
    if (direction === "up") {
      newBoard = rotateBoard(newBoard)
    } else if (direction === "right") {
      newBoard = rotateBoard(rotateBoard(newBoard))
    } else if (direction === "down") {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)))
    }

    if (moved) {
      addRandomTile(newBoard)
      setBoard(newBoard)
      setScore((prev) => {
        const newScore = prev + totalPoints
        if (newScore > bestScore) {
          setBestScore(newScore)
          if (typeof window !== "undefined") {
            localStorage.setItem("sakura2048-best", newScore.toString())
          }
        }
        return newScore
      })
      setMoveCount((prev) => prev + 1)

      // ゲームオーバーチェック
      if (isGameOver(newBoard)) {
        setGameOver(true)
      }
    }
  }

  // ゲームオーバー判定
  function isGameOver(board: number[][]): boolean {
    // 空きセルがあるかチェック
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false
      }
    }

    // 隣接セルとマージ可能かチェック
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j]
        if (
          (i > 0 && board[i - 1][j] === current) ||
          (i < 3 && board[i + 1][j] === current) ||
          (j > 0 && board[i][j - 1] === current) ||
          (j < 3 && board[i][j + 1] === current)
        ) {
          return false
        }
      }
    }

    return true
  }

  // 数値の色を取得
  function getNumberColor(value: number): string {
    if (!showColors) return ""

    const colors: { [key: number]: string } = {
      2: "text-red-600",
      4: "text-blue-600",
      8: "text-green-600",
      16: "text-purple-600",
      32: "text-yellow-600",
      64: "text-pink-600",
      128: "text-indigo-600",
      256: "text-orange-600",
      512: "text-teal-600",
      1024: "text-red-800",
      2048: "text-blue-800 font-bold",
    }

    return colors[value] || "text-gray-800"
  }

  // キーボード操作
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (currentTab === "help") return

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          move("left")
          break
        case "ArrowRight":
          e.preventDefault()
          move("right")
          break
        case "ArrowUp":
          e.preventDefault()
          move("up")
          break
        case "ArrowDown":
          e.preventDefault()
          move("down")
          break
        case "b":
        case "B":
          // Bキーで枠表示切り替え
          setShowBorders((prev) => !prev)
          break
        case "r":
        case "R":
          // Rキーでリスタート
          resetGame()
          break
        case "c":
        case "C":
          // Cキーで色切り替え
          setShowColors((prev) => !prev)
          break
        case "f":
        case "F":
          // Fキーで全画面切り替え
          setIsFullscreen((prev) => !prev)
          break
      }
    },
    [board, gameOver, currentTab],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  // ゲームリセット
  function resetGame() {
    const newBoard = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0))
    addRandomTile(newBoard)
    addRandomTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setMoveCount(0)
  }

  // 2048達成チェック
  function has2048(): boolean {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 2048) return true
      }
    }
    return false
  }

  // テキストエリアの内容を生成（枠なし版）
  function generateTextContent(): string {
    let content = `// 2048 - スコア: ${score} | ベスト: ${bestScore}\n`
    content += `// 矢印キー:操作 | B:枠切替 | R:リスタート | C:色切替\n`

    if (has2048() && !gameOver) {
      content += `// 2048達成！おめでとうございます！\n`
    }

    if (gameOver) {
      content += `// ゲームオーバー！\n`
    }

    content += `\n`

    for (let i = 0; i < 4; i++) {
      let line = ""
      for (let j = 0; j < 4; j++) {
        const value = board[i][j]
        if (value === 0) {
          line += "    " // 4文字分の空白
        } else {
          line += value.toString().padEnd(4, " ")
        }
      }
      content += line + "\n"
    }

    content += "\n"
    content += `// 手数: ${moveCount} | 効率度: ${moveCount > 0 ? Math.round(score / moveCount) : 0}点/手\n`

    if (gameOver) {
      content += "// リスタート: Rキーまたは🔄ボタン\n"
    }

    return content
  }

  // テキストエリアの内容を生成（枠あり版）
  function generateBorderedContent(): string {
    let content = `// 2048 - スコア: ${score} | ベスト: ${bestScore}\n`
    content += `// 矢印キー:操作 | B:枠切替 | R:リスタート | C:色切替\n`

    if (has2048() && !gameOver) {
      content += `// 2048達成！おめでとうございます！\n`
    }

    if (gameOver) {
      content += `// ゲームオーバー！\n`
    }

    content += `\n`

    // 上枠
    content += "┌────┬────┬────┬────┐\n"

    for (let i = 0; i < 4; i++) {
      let line = "│"
      for (let j = 0; j < 4; j++) {
        const value = board[i][j]
        if (value === 0) {
          line += "    " // 4文字分の空白
        } else {
          line += value.toString().padStart(4, " ")
        }
        line += "│"
      }
      content += line + "\n"

      // 区切り線（最後の行以外）
      if (i < 3) {
        content += "├────┼────┼────┼────┤\n"
      }
    }

    // 下枠
    content += "└────┴────┴────┴────┘\n"

    content += "\n"
    content += `// 手数: ${moveCount} | 効率度: ${moveCount > 0 ? Math.round(score / moveCount) : 0}点/手\n`

    if (gameOver) {
      content += "// リスタート: Rキーまたは🔄ボタン\n"
    }

    return content
  }

  // 色付きテキストエリアの内容を生成（枠なし版）
  function generateColoredTextContent() {
    const lines = []
    lines.push(
      <span key="header1" className="text-green-600">
        // 2048 - スコア: {score} | ベスト: {bestScore}
      </span>,
    )
    lines.push(<br key="br1" />)
    lines.push(
      <span key="header2" className="text-green-600">
        // 矢印キー:操作 | B:枠切替 | R:リスタート | C:色切替
      </span>,
    )
    lines.push(<br key="br2" />)

    if (has2048() && !gameOver) {
      lines.push(
        <span key="win" className="text-yellow-600 font-bold">
          // 2048達成！おめでとうございます！
        </span>,
      )
      lines.push(<br key="br3" />)
    }

    if (gameOver) {
      lines.push(
        <span key="over" className="text-red-600">
          // ゲームオーバー！
        </span>,
      )
      lines.push(<br key="br4" />)
    }

    lines.push(<br key="br5" />)

    for (let i = 0; i < 4; i++) {
      const rowElements = []
      for (let j = 0; j < 4; j++) {
        const value = board[i][j]
        if (value === 0) {
          rowElements.push(
            <span key={`${i}-${j}`} className="whitespace-pre">
              {"    "}
            </span>,
          )
        } else {
          rowElements.push(
            <span key={`${i}-${j}`} className={`${getNumberColor(value)} whitespace-pre`}>
              {value.toString().padEnd(4, " ")}
            </span>,
          )
        }
      }
      lines.push(<div key={`row-${i}`}>{rowElements}</div>)
    }

    lines.push(<br key="br6" />)
    lines.push(
      <span key="stats" className="text-blue-600">
        // 手数: {moveCount} | 効率度: {moveCount > 0 ? Math.round(score / moveCount) : 0}点/手
      </span>,
    )
    lines.push(<br key="br7" />)

    if (gameOver) {
      lines.push(
        <span key="restart" className="text-purple-600">
          // リスタート: Rキーまたは🔄ボタン
        </span>,
      )
      lines.push(<br key="br8" />)
    }

    return lines
  }

  // 色付きテキストエリアの内容を生成（枠あり版）- 完全修正版
  function generateColoredBorderedContent() {
    const lines = []
    lines.push(
      <span key="header1" className="text-green-600">
        // 2048 - スコア: {score} | ベスト: {bestScore}
      </span>,
    )
    lines.push(<br key="br1" />)
    lines.push(
      <span key="header2" className="text-green-600">
        // 矢印キー:操作 | B:枠切替 | R:リスタート | C:色切替
      </span>,
    )
    lines.push(<br key="br2" />)

    if (has2048() && !gameOver) {
      lines.push(
        <span key="win" className="text-yellow-600 font-bold">
          // 2048達成！おめでとうございます！
        </span>,
      )
      lines.push(<br key="br3" />)
    }

    if (gameOver) {
      lines.push(
        <span key="over" className="text-red-600">
          // ゲームオーバー！
        </span>,
      )
      lines.push(<br key="br4" />)
    }

    lines.push(<br key="br5" />)

    // 上枠
    lines.push(
      <div key="top-border" className="text-gray-800">
        ┌────┬────┬────┬────┐
      </div>,
    )

    for (let i = 0; i < 4; i++) {
      const rowElements = []

      // 行の開始の│
      rowElements.push(
        <span key={`border-start-${i}`} className="text-gray-800">
          │
        </span>,
      )

      for (let j = 0; j < 4; j++) {
        const value = board[i][j]

        // セルの内容（必ず4文字分の幅を確保）
        if (value === 0) {
          // 空のセルは4文字分の空白
          rowElements.push(
            <span key={`cell-${i}-${j}`} className="text-gray-800 whitespace-pre">
              {"    "}
            </span>,
          )
        } else {
          // 数字がある場合は右詰めで4文字分
          const paddedValue = value.toString().padStart(4, " ")
          rowElements.push(
            <span key={`cell-${i}-${j}`} className={`${getNumberColor(value)} whitespace-pre`}>
              {paddedValue}
            </span>,
          )
        }

        // セル間の│
        rowElements.push(
          <span key={`border-${i}-${j}`} className="text-gray-800">
            │
          </span>,
        )
      }

      lines.push(<div key={`row-${i}`}>{rowElements}</div>)

      // 区切り線（最後の行以外）
      if (i < 3) {
        lines.push(
          <div key={`mid-border-${i}`} className="text-gray-800">
            ├────┼────┼────┼────┤
          </div>,
        )
      }
    }

    // 下枠
    lines.push(
      <div key="bottom-border" className="text-gray-800">
        └────┴────┴────┴────┘
      </div>,
    )

    lines.push(<br key="br6" />)
    lines.push(
      <span key="stats" className="text-blue-600">
        // 手数: {moveCount} | 効率度: {moveCount > 0 ? Math.round(score / moveCount) : 0}点/手
      </span>,
    )
    lines.push(<br key="br7" />)

    if (gameOver) {
      lines.push(
        <span key="restart" className="text-purple-600">
          // リスタート: Rキーまたは🔄ボタン
        </span>,
      )
      lines.push(<br key="br8" />)
    }

    return lines
  }

  // ヘルプ画面の内容
  function generateHelpContent(): string {
    return `// 2048ゲーム 使い方ガイド
// ========================================

// 【ゲームの目的】
// 数字のタイルを移動・合成して2048を作る

// 【基本操作】
// ↑↓←→  : タイルを移動
// R      : ゲームをリスタート
// B      : 枠表示の切り替え
// C      : 色表示の切り替え

// 【ゲームルール】
// 1. 矢印キーでタイルを移動
// 2. 同じ数字のタイルがぶつかると合成される
// 3. 合成されたタイルは倍の数字になる
// 4. 移動後、新しいタイル(2または4)が出現
// 5. 2048のタイルを作ると勝利
// 6. 移動できなくなるとゲームオーバー

// 【表示モード】
// 枠なし : シンプルな数字表示
// 枠あり : 罫線で区切られた表示
// 色なし : 通常の黒文字
// 色あり : 数字ごとに色分け表示

// 【スコアシステム】
// - 合成時に合成後の数字がスコアに加算
// - ベストスコアは自動保存される
// - 効率度 = スコア ÷ 手数

// 【攻略のコツ】
// 1. 大きな数字を角に集める
// 2. 一方向に偏らせて移動する
// 3. 小さな数字から順番に合成
// 4. 空きスペースを確保する

// 【ショートカット一覧】
// R : リスタート
// B : 枠表示切り替え
// C : 色表示切り替え
// ↑↓←→ : ゲーム操作

// 【バージョン情報】
// 2048 for Sakura Editor v1.0
// 開発: よかユニット

// ========================================
// 2048タブに戻るには「2048」タブをクリック`
  }

  const breadcrumbItems = [
    { href: "/tools", label: "ツール一覧" },
    { href: "/tools/sakura2048", label: "サクラエディタ風2048" },
  ]

  // 全画面表示の切り替え
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // 全画面表示時のコンテンツ
  const GameContent = () => (
    <div className="min-h-[800px] bg-gray-100 flex flex-col">
      {/* タイトルバー */}
      <div className="bg-gray-200 border-b border-gray-300 px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">📝</span>
          </div>
          <span className="text-sm">(無題1)(更新) - sakura 2.1.1.3</span>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-5 bg-gray-300 hover:bg-gray-400 text-xs">_</button>
          <button className="w-6 h-5 bg-gray-300 hover:bg-gray-400 text-xs">□</button>
          <button className="w-6 h-5 bg-red-500 hover:bg-red-600 text-white text-xs">×</button>
        </div>
      </div>

      {/* メニューバー */}
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1">
        <div className="flex gap-4 text-sm">
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">ファイル(F)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">編集(E)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">支援(C)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">検索(S)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">ツール(T)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">設定(O)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">ウィンドウ(W)</span>
          <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">ヘルプ(H)</span>
        </div>
      </div>

      {/* ツールバー */}
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1">
        <div className="flex gap-1">
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">📄</button>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">📁</button>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">💾</button>
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">✂️</button>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">📋</button>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">📄</button>
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">↶</button>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">↷</button>
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400">🔍</button>
          {/* リスタートボタン */}
          <button
            onClick={resetGame}
            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-xs border border-gray-400"
            title="リスタート (Rキー)"
          >
            🔄
          </button>
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          {/* 枠切り替えボタン */}
          <button
            onClick={() => setShowBorders(!showBorders)}
            className={`w-6 h-6 text-xs border border-gray-400 ${showBorders ? "bg-blue-200 hover:bg-blue-300" : "bg-gray-200 hover:bg-gray-300"}`}
            title="枠表示切り替え (Bキー)"
          >
            ⊞
          </button>
          {/* 色切り替えボタン */}
          <button
            onClick={() => setShowColors(!showColors)}
            className={`w-6 h-6 text-xs border border-gray-400 ${showColors ? "bg-red-200 hover:bg-red-300" : "bg-gray-200 hover:bg-gray-300"}`}
            title="色表示切り替え (Cキー)"
          >
            🎨
          </button>
        </div>
      </div>

      {/* タブバー */}
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1">
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentTab("game")}
            className={`px-3 py-1 text-xs border border-gray-400 ${currentTab === "game" ? "bg-white border-b-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            2048
          </button>
          <button
            onClick={() => setCurrentTab("help")}
            className={`px-3 py-1 text-xs border border-gray-400 ${currentTab === "help" ? "bg-white border-b-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            使い方
          </button>
        </div>
      </div>

      {/* ルーラー */}
      <div className="bg-white border-b border-gray-300 px-8 py-1">
        <div className="flex text-xs text-gray-600 font-mono">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="w-8 text-center border-r border-gray-200">
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* メインエディタエリア */}
      <div className="flex-1 flex">
        {/* 行番号 */}
        <div className="bg-gray-50 border-r border-gray-300 px-2 py-2 min-w-12">
          <div className="text-xs text-gray-600 font-mono leading-5">
            {Array.from({ length: 40 }, (_, i) => (
              <div key={i} className="text-right">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* テキストエリア */}
        <div className="flex-1 bg-white p-2">
          {currentTab === "game" ? (
            showColors ? (
              <div className="text-sm font-mono leading-5">
                {showBorders ? generateColoredBorderedContent() : generateColoredTextContent()}
              </div>
            ) : (
              <pre className="text-sm font-mono leading-5 whitespace-pre-wrap">
                {showBorders ? generateBorderedContent() : generateTextContent()}
              </pre>
            )
          ) : (
            <pre className="text-sm font-mono leading-5 whitespace-pre-wrap text-green-600">
              {generateHelpContent()}
            </pre>
          )}
        </div>
      </div>

      {/* ステータスバー */}
      <div className="bg-gray-200 border-t border-gray-300 px-2 py-1 flex items-center justify-between text-xs">
        <div className="flex gap-4">
          <span>40行</span>
          <span>1桁</span>
          <span>CRLF</span>
          <span>CRLF</span>
        </div>
        <div className="flex gap-4">
          <span>SJIS</span>
          <span className="bg-red-600 text-white px-1">REC</span>
          <span>挿入</span>
          <span className="text-gray-400">{showBorders ? "枠ON" : "枠OFF"}</span>
          <span className="text-gray-400">{showColors ? "色ON" : "色OFF"}</span>
          <span className="text-gray-400">ベスト:{bestScore}</span>
        </div>
      </div>
    </div>
  )

  // 全画面表示の場合
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-100">
        {/* 全画面時の閉じるボタン */}
        <Button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-700"
          size="sm"
          title="全画面を終了 (Fキー)"
        >
          <Minimize2 className="w-4 h-4 mr-2" />
          全画面終了
        </Button>
        <GameContent />
      </div>
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
              サクラエディタ風2048ゲーム
            </h1>
            <p className="text-gray-600 mb-4">
              サクラエディタそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲームです。
              コードを書いているフリをしながら2048パズルに挑戦してください。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">隠しゲーム</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">2048パズル</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">エディタ風</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">仕事中対応</span>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="text-amber-800 text-sm">
                <strong>操作方法：</strong> 矢印キーでタイルを移動、同じ数字を合体させて2048を目指そう！
                Bキー：枠表示切替、Rキー：リスタート、Cキー：色表示切替、Fキー：全画面表示
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
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-700"
              size="sm"
              title="全画面表示 (Fキー)"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              全画面
            </Button>
                        <GameContent />
          </motion.div>
        </div>
      </main>

      <SiteFooter />
      <ScrollToTop />
    </div>
  )
}
