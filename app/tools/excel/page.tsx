"use client"

import type React from "react"

import Link from "next/link"
import { Home, Minimize2, Square, X } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const GRID_SIZE = 4
const CELL_SIZE = 2.5 // さらに小さく
const CELL_GAP = 0.2

type Tile = {
  value: number
  id: string
  mergedFrom?: Tile[]
  justMerged?: boolean
  isNew?: boolean
  row: number
  col: number
}

export default function ExcelPage() {
  const [gameVisible, setGameVisible] = useState(false)
  const [gamePosition, setGamePosition] = useState({ x: 300, y: 200 })
  const [gameSize, setGameSize] = useState({ width: 220, height: 280 }) // 初期サイズを小さく
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // 2048 Game State
  const [board, setBoard] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  // Generate column headers A-Z, AA-AZ, etc.
  const generateColumns = () => {
    const columns = []
    for (let i = 0; i < 21; i++) {
      if (i < 26) {
        columns.push(String.fromCharCode(65 + i))
      } else {
        columns.push("A" + String.fromCharCode(65 + (i - 26)))
      }
    }
    return columns
  }

  const columns = generateColumns()

  // 2048 Game Logic
  useEffect(() => {
    if (gameVisible && board.length === 0) {
      initializeGame()
    }
    const storedBestScore = localStorage.getItem("excel-2048-bestScore")
    if (storedBestScore) setBestScore(Number.parseInt(storedBestScore))
  }, [gameVisible])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("excel-2048-bestScore", score.toString())
    }
  }, [score, bestScore])

  const initializeGame = () => {
    const newBoard: Tile[] = []
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setIsGameOver(false)
  }

  const addNewTile = (board: Tile[]) => {
    const emptyTiles = []
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!board.some((tile) => tile.row === row && tile.col === col)) {
          emptyTiles.push({ row, col })
        }
      }
    }
    if (emptyTiles.length > 0) {
      const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
      board.push({
        value: Math.random() < 0.9 ? 2 : 4,
        id: `${row}-${col}-${Date.now()}`,
        row,
        col,
        isNew: true,
      })
    }
  }

  const move = (direction: "up" | "down" | "left" | "right") => {
    if (isGameOver) return

    let newBoard = board.map((tile) => ({ ...tile, justMerged: false, isNew: false }))
    let changed = false
    let newScore = score

    const sortedTiles = [...newBoard].sort((a, b) => {
      if (direction === "up" || direction === "down") {
        return direction === "up" ? a.row - b.row : b.row - a.row
      } else {
        return direction === "left" ? a.col - b.col : b.col - a.col
      }
    })

    for (const tile of sortedTiles) {
      const { row, col } = tile
      let newRow = row
      let newCol = col

      while (true) {
        newRow += direction === "up" ? -1 : direction === "down" ? 1 : 0
        newCol += direction === "left" ? -1 : direction === "right" ? 1 : 0

        if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
          newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0
          newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0
          break
        }

        const targetTile = newBoard.find((t) => t.row === newRow && t.col === newCol)
        if (targetTile) {
          if (targetTile.value === tile.value && !targetTile.justMerged) {
            newBoard = newBoard.filter((t) => t !== targetTile && t !== tile)
            newBoard.push({
              value: tile.value * 2,
              id: tile.id,
              row: newRow,
              col: newCol,
              justMerged: true,
            })
            newScore += tile.value * 2
            changed = true
          } else {
            newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0
            newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0
          }
          break
        }
      }

      if (newRow !== row || newCol !== col) {
        changed = true
        tile.row = newRow
        tile.col = newCol
      }
    }

    if (changed) {
      addNewTile(newBoard)
      setBoard(newBoard)
      setScore(newScore)
      if (isGameOverState(newBoard)) {
        setIsGameOver(true)
      }
    } else if (isGameOverState(newBoard)) {
      setIsGameOver(true)
    }
  }

  const isGameOverState = (board: Tile[]) => {
    if (board.length < GRID_SIZE * GRID_SIZE) return false

    for (const tile of board) {
      const { row, col, value } = tile
      if (
        (row > 0 && board.some((t) => t.row === row - 1 && t.col === col && t.value === value)) ||
        (row < GRID_SIZE - 1 && board.some((t) => t.row === row + 1 && t.col === col && t.value === value)) ||
        (col > 0 && board.some((t) => t.row === row && t.col === col - 1 && t.value === value)) ||
        (col < GRID_SIZE - 1 && board.some((t) => t.row === row && t.col === col + 1 && t.value === value))
      ) {
        return false
      }
    }
    return true
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!gameVisible) return

      // ESCキーで最小化/復元をトグル
      if (e.key === "Escape") {
        e.preventDefault()
        setIsMinimized(!isMinimized)
        return
      }

      // 最小化中は矢印キーを無効化
      if (isMinimized) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          move("up")
          break
        case "ArrowDown":
          e.preventDefault()
          move("down")
          break
        case "ArrowLeft":
          e.preventDefault()
          move("left")
          break
        case "ArrowRight":
          e.preventDefault()
          move("right")
          break
      }
    },
    [gameVisible, isMinimized, board, score, isGameOver],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const cellColor = (value: number) => {
    switch (value) {
      case 2:
        return "bg-[#eee4da] text-[#776e65]"
      case 4:
        return "bg-[#ede0c8] text-[#776e65]"
      case 8:
        return "bg-[#f2b179] text-white"
      case 16:
        return "bg-[#f59563] text-white"
      case 32:
        return "bg-[#f67c5f] text-white"
      case 64:
        return "bg-[#f65e3b] text-white"
      case 128:
        return "bg-[#edcf72] text-white"
      case 256:
        return "bg-[#edcc61] text-white"
      case 512:
        return "bg-[#edc850] text-white"
      case 1024:
        return "bg-[#edc53f] text-white"
      case 2048:
        return "bg-[#edc22e] text-white"
      default:
        return "bg-[#cdc1b4]"
    }
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isResizing) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - gamePosition.x,
      y: e.clientY - gamePosition.y,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setGamePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    },
    [isDragging, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  // Resize handler
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)

    const handleResizeMove = (e: MouseEvent) => {
      const newWidth = Math.max(180, e.clientX - gamePosition.x) // 最小幅を180pxに
      const newHeight = Math.max(220, e.clientY - gamePosition.y) // 最小高さを220pxに
      setGameSize({ width: newWidth, height: newHeight })
    }

    const handleResizeUp = () => {
      setIsResizing(false)
      window.removeEventListener("mousemove", handleResizeMove)
      window.removeEventListener("mouseup", handleResizeUp)
    }

    window.addEventListener("mousemove", handleResizeMove)
    window.addEventListener("mouseup", handleResizeUp)
  }

  const openGame = () => {
    setGameVisible(true)
    setIsMinimized(false)
  }

  const closeGame = () => {
    setGameVisible(false)
    setBoard([])
  }

  const minimizeGame = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Home Link */}
      <div className="absolute top-2 left-2 z-50">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
          <Home size={20} />
          <span className="text-sm">ホーム</span>
        </Link>
      </div>

      {/* Title Bar */}
      <div className="bg-green-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/20 rounded"></div>
          <span className="text-sm font-medium">Book1 - Excel</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-white/20 rounded">
            <Minimize2 size={14} />
          </button>
          <button className="p-1 hover:bg-white/20 rounded">
            <Square size={14} />
          </button>
          <button className="p-1 hover:bg-red-500 rounded">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 py-1">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-green-600 font-medium">ファイル</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">ホーム</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">挿入</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">ページレイアウト</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">数式</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">データ</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">校閲</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">表示</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">チーム</span>
          <div className="ml-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="実行したい操作を入力してください..."
              className="px-2 py-1 border border-gray-300 rounded text-xs w-48"
            />
            <span className="text-xs">サインイン</span>
            <span className="text-xs">共有</span>
          </div>
        </div>
      </div>

      {/* Ribbon Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 py-2">
        <div className="flex items-center gap-4">
          {/* Clipboard Section */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <div className="w-8 h-6 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                <span className="text-xs">📋</span>
              </div>
              <div className="text-xs">
                <div>貼り付け</div>
                <div className="text-gray-500">コピー</div>
                <div className="text-gray-500">書式のコピー/貼り付け</div>
              </div>
            </div>
            <span className="text-xs text-gray-600">クリップボード</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Font Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                <option>游ゴシック</option>
              </select>
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                <option>11</option>
              </select>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
                  B
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs italic">
                  I
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs underline">
                  U
                </button>
              </div>
            </div>
            <span className="text-xs text-gray-600">フォント</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Alignment Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
            </div>
            <span className="text-xs text-gray-600">配置</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Number Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs">%</span>
              <span className="text-xs">,</span>
              <span className="text-xs">00</span>
              <span className="text-xs">.0</span>
            </div>
            <span className="text-xs text-gray-600">数値</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Styles Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="px-2 py-1 bg-yellow-200 text-xs rounded">条件付き書式</div>
              <div className="px-2 py-1 bg-pink-200 text-xs rounded">悪い</div>
              <div className="px-2 py-1 bg-green-200 text-xs rounded">良い</div>
            </div>
            <span className="text-xs text-gray-600">スタイル</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Cells Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">挿入</button>
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">削除</button>
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">書式</button>
            </div>
            <span className="text-xs text-gray-600">セル</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Editing Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="text-xs">Σ オート SUM</button>
              <button className="text-xs">フィル</button>
              <button className="text-xs">クリア</button>
              <button className="text-xs">並べ替えとフィルター</button>
              <button className="text-xs">検索と選択</button>
            </div>
            <span className="text-xs text-gray-600">編集</span>
          </div>
        </div>
      </div>

      {/* Name Box and Formula Bar */}
      <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <input type="text" value="N9" className="w-16 text-xs border border-gray-300 rounded px-1 py-0.5" readOnly />
          <span className="text-gray-400">✓</span>
          <span className="text-gray-400">✗</span>
          <span className="text-gray-400">fx</span>
        </div>
        <input type="text" className="flex-1 text-xs border-none outline-none" placeholder="" />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Row Numbers */}
          <div className="bg-gray-100 border-r border-gray-300">
            <div className="w-12 h-6 border-b border-gray-300 bg-gray-200"></div>
            {Array.from({ length: 27 }, (_, i) => (
              <div
                key={i}
                className="w-12 h-6 border-b border-gray-300 flex items-center justify-center text-xs text-gray-600 bg-gray-100"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Column Headers */}
            <div className="flex bg-gray-100 border-b border-gray-300">
              {columns.map((col) => (
                <div
                  key={col}
                  className="w-20 h-6 border-r border-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 bg-gray-200"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Grid Cells */}
            {Array.from({ length: 27 }, (_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {columns.map((col, colIndex) => (
                  <div
                    key={`${col}${rowIndex + 1}`}
                    className={`w-20 h-6 border-r border-b border-gray-300 flex items-center justify-center text-xs cursor-pointer ${
                      col === "N" && rowIndex === 8 ? "bg-white border-2 border-green-500" : "bg-white hover:bg-gray-50"
                    } ${col === "A" && rowIndex === 1 ? "text-blue-600 font-medium hover:underline" : ""}`}
                    onClick={() => {
                      if (col === "A" && rowIndex === 1) {
                        openGame()
                      }
                    }}
                  >
                    {col === "A" && rowIndex === 1 ? "2048" : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs">Sheet1</div>
            <button className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center text-xs">
              +
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>準備完了</span>
          <div className="flex items-center gap-1">
            <button>📊</button>
            <button>📈</button>
            <button>📋</button>
            <span>-</span>
            <span>🔍</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Hidden 2048 Game Window */}
      <AnimatePresence>
        {gameVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bg-white border border-gray-300 shadow-2xl rounded-lg overflow-hidden z-50 select-none"
            style={{
              left: gamePosition.x,
              top: gamePosition.y,
              width: gameSize.width,
              height: isMinimized ? 30 : gameSize.height,
            }}
          >
            {/* Game Window Header */}
            <div
              className="bg-gray-100 border-b border-gray-300 px-2 py-1 flex items-center justify-between cursor-move"
              onMouseDown={handleMouseDown}
            >
              <span className="text-xs font-medium">計算機</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={minimizeGame}
                  className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs hover:bg-yellow-500"
                >
                  -
                </button>
                <button
                  onClick={closeGame}
                  className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-xs hover:bg-red-500"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Game Content */}
            {!isMinimized && (
              <div className="p-1.5 bg-[#faf8ef] h-full overflow-hidden">
                <div className="flex justify-between items-center mb-1.5">
                  <h2 className="text-sm font-bold text-[#776e65]">2048</h2>
                  <div className="flex gap-1">
                    <div className="bg-[#bbada0] px-1.5 py-0.5 rounded text-white text-xs">
                      <div className="text-xs">スコア</div>
                      <div className="font-bold text-xs">{score}</div>
                    </div>
                    <div className="bg-[#bbada0] px-1.5 py-0.5 rounded text-white text-xs">
                      <div className="text-xs">ベスト</div>
                      <div className="font-bold text-xs">{bestScore}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#bbada0] p-1 rounded-lg w-fit mx-auto">
                  <div
                    className="relative"
                    style={{
                      width: `${CELL_SIZE * GRID_SIZE + CELL_GAP * (GRID_SIZE - 1)}rem`,
                      height: `${CELL_SIZE * GRID_SIZE + CELL_GAP * (GRID_SIZE - 1)}rem`,
                    }}
                  >
                    {/* Background grid */}
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                      <div
                        key={`cell-${index}`}
                        className="absolute bg-[#cdc1b4] rounded"
                        style={{
                          width: `${CELL_SIZE}rem`,
                          height: `${CELL_SIZE}rem`,
                          left: `${(index % GRID_SIZE) * (CELL_SIZE + CELL_GAP)}rem`,
                          top: `${Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP)}rem`,
                        }}
                      />
                    ))}
                    {/* Tiles */}
                    <AnimatePresence>
                      {board.map((tile) => (
                        <motion.div
                          key={tile.id}
                          initial={
                            tile.isNew
                              ? {
                                  scale: 0,
                                  x: tile.col * (CELL_SIZE + CELL_GAP) + "rem",
                                  y: tile.row * (CELL_SIZE + CELL_GAP) + "rem",
                                }
                              : { scale: 0 }
                          }
                          animate={{
                            scale: 1,
                            x: tile.col * (CELL_SIZE + CELL_GAP) + "rem",
                            y: tile.row * (CELL_SIZE + CELL_GAP) + "rem",
                          }}
                          exit={{ scale: 0 }}
                          transition={
                            tile.isNew ? { duration: 0.15 } : { x: { duration: 0.15 }, y: { duration: 0.15 } }
                          }
                          className={`absolute rounded flex items-center justify-center text-xs font-bold ${cellColor(tile.value)}`}
                          style={{
                            width: `${CELL_SIZE}rem`,
                            height: `${CELL_SIZE}rem`,
                            fontSize: tile.value >= 1000 ? "0.6rem" : "0.75rem", // 大きい数字は小さく
                          }}
                        >
                          {tile.value}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-1.5 text-center">
                  <button
                    onClick={initializeGame}
                    className="bg-[#8f7a66] text-white px-2 py-0.5 rounded text-xs hover:bg-[#9f8a76]"
                  >
                    新しいゲーム
                  </button>
                </div>

                <div className="mt-1 text-xs text-center text-gray-500">矢印キーで操作 | ESCで隠す</div>

                {isGameOver && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <h3 className="font-bold mb-2 text-sm">ゲーム終了！</h3>
                      <p className="text-xs mb-2">スコア: {score}</p>
                      <button
                        onClick={initializeGame}
                        className="bg-[#8f7a66] text-white px-2 py-1 rounded text-xs hover:bg-[#9f8a76]"
                      >
                        もう一度
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Resize Handle */}
            {!isMinimized && (
              <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeMouseDown}>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
