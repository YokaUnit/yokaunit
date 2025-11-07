"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-mobile"
import type { Player } from "../lib/game-logic"

interface GameBoardProps {
  board: Player[][]
  currentPlayer: Player
  onColumnClick: (col: number) => void
  isAnimating: boolean
  activeCoin: { player: Player; column: number; row: number } | null
  onCoinLanded: () => void
  fallingCells: number[] // 落下中のセル（行番号の配列）
}

const ROWS = 6
const COLS = 7
const CELL_SIZE_DESKTOP = 60
const CELL_SIZE_MOBILE = 40
const CELL_GAP_DESKTOP = 10
const CELL_GAP_MOBILE = 6
const BOARD_PADDING_DESKTOP = 20
const BOARD_PADDING_MOBILE = 12

export function GameBoard({
  board,
  currentPlayer,
  onColumnClick,
  isAnimating,
  activeCoin,
  onCoinLanded,
  fallingCells,
}: GameBoardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)

  const CELL_SIZE = isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP
  const CELL_GAP = isMobile ? CELL_GAP_MOBILE : CELL_GAP_DESKTOP
  const BOARD_PADDING = isMobile ? BOARD_PADDING_MOBILE : BOARD_PADDING_DESKTOP

  const getCellPosition = useCallback(
    (row: number, col: number) => {
      return {
        x: BOARD_PADDING + col * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2,
        y: BOARD_PADDING + row * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2,
      }
    },
    [CELL_SIZE, CELL_GAP, BOARD_PADDING]
  )

  const getColumnCenterX = useCallback(
    (col: number) => {
      return BOARD_PADDING + col * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2
    },
    [CELL_SIZE, CELL_GAP, BOARD_PADDING]
  )

  const getNextEmptyRow = useCallback(
    (col: number) => {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
          return row
        }
      }
      return -1
    },
    [board]
  )

  const boardWidth = COLS * CELL_SIZE + (COLS - 1) * CELL_GAP + BOARD_PADDING * 2
  const boardHeight = ROWS * CELL_SIZE + (ROWS - 1) * CELL_GAP + BOARD_PADDING * 2
  const buttonRowHeight = isMobile ? 50 : 70

  return (
    <div className="relative mx-auto" style={{ width: boardWidth, paddingTop: buttonRowHeight }}>
      {/* ボタン行（GameBoardの上に配置） */}
      <div 
        className="absolute left-0 right-0 flex justify-center items-center z-20"
        style={{ 
          top: 0,
          width: boardWidth,
          height: buttonRowHeight
        }}
      >
        {Array(COLS)
          .fill(null)
          .map((_, col) => {
            const isFull = board[0][col] !== null
            const isHovered = hoveredColumn === col
            const columnCenterX = getColumnCenterX(col)

            return (
              <button
                key={col}
                onClick={() => !isFull && !isAnimating && onColumnClick(col)}
                onMouseEnter={() => setHoveredColumn(col)}
                onMouseLeave={() => setHoveredColumn(null)}
                disabled={isFull || isAnimating}
                className={`${isMobile ? "w-9 h-9 border-2" : "w-14 h-14 border-4"} rounded-full transition-all flex-shrink-0 absolute ${
                  isFull
                    ? "bg-gray-400 border-gray-500 cursor-not-allowed"
                    : isHovered
                      ? "scale-110 shadow-lg"
                      : "bg-white border-gray-300 hover:bg-gray-100 cursor-pointer"
                }`}
                style={{
                  left: columnCenterX - (isMobile ? 18 : 28),
                  top: isMobile ? 5 : 10,
                  backgroundColor: isFull
                    ? "#9ca3af"
                    : isHovered
                      ? currentPlayer === "red"
                        ? "#fee2e2"
                        : "#fef9c3"
                      : "#ffffff",
                  borderColor: isFull ? "#6b7280" : isHovered ? (currentPlayer === "red" ? "#ef4444" : "#eab308") : "#d1d5db",
                }}
              >
                {isHovered && !isFull && (
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: currentPlayer === "red" ? "#ef4444" : "#eab308",
                      opacity: 0.5,
                    }}
                  />
                )}
              </button>
            )
          })}
      </div>

      {/* ゲームボード（青い枠） */}
      <div
        className="relative bg-blue-600 rounded-lg p-3 md:p-5 shadow-2xl"
        style={{
          width: boardWidth,
          height: boardHeight,
          marginTop: 0,
        }}
      >
        {/* ボードの背景（穴） */}
        {Array(ROWS)
          .fill(null)
          .map((_, row) =>
            Array(COLS)
              .fill(null)
              .map((_, col) => {
                const pos = getCellPosition(row, col)
                // コインが通過中のセルのみ色付け（目標位置も含む）
                const isFalling = activeCoin && activeCoin.column === col && fallingCells.includes(row)
                const coinColor = activeCoin?.player === "red" ? "#ef4444" : "#eab308"
                
                return (
                  <motion.div
                    key={`${row}-${col}`}
                    className="absolute rounded-full border-2"
                    initial={{ backgroundColor: "#1e3a8a" }}
                    animate={{
                      backgroundColor: isFalling ? coinColor : "#1e3a8a",
                      opacity: isFalling ? 0.7 : 1,
                      scale: isFalling ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.15,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: pos.x - CELL_SIZE / 2,
                      top: pos.y - CELL_SIZE / 2,
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      borderColor: "#1e1b4b",
                    }}
                  />
                )
              })
          )}

        {/* 配置済みのコイン */}
        {board.map((row, rowIndex) =>
          row.map((player, colIndex) => {
            if (!player) return null
            // アニメーション中のコインの位置は表示しない（アニメーション完了後にmakeMoveでボードに追加される）
            if (activeCoin && activeCoin.row === rowIndex && activeCoin.column === colIndex) {
              return null
            }
            const pos = getCellPosition(rowIndex, colIndex)
            const borderWidth = isMobile ? 2 : 3
            const highlightSize = isMobile ? 8 : 16
            return (
              <div
                key={`placed-${rowIndex}-${colIndex}`}
                className="absolute rounded-full shadow-lg"
                style={{
                  left: pos.x - CELL_SIZE / 2,
                  top: pos.y - CELL_SIZE / 2,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: player === "red" ? "#ef4444" : "#eab308",
                  border: `${borderWidth}px solid ${player === "red" ? "#dc2626" : "#ca8a04"}`,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                  zIndex: 10,
                }}
              >
                <div
                  className="absolute rounded-full bg-white/40 blur-sm"
                  style={{
                    top: isMobile ? 4 : 8,
                    left: isMobile ? 4 : 8,
                    width: highlightSize,
                    height: highlightSize,
                  }}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
