"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Tile, GRID_SIZE, CELL_SIZE, CELL_GAP } from "../lib/types"
import { cellColor } from "../lib/game-logic"

interface GameWindowProps {
  board: Tile[]
  score: number
  bestScore: number
  isGameOver: boolean
  gameVisible: boolean
  gamePosition: { x: number; y: number }
  gameSize: { width: number; height: number }
  isMinimized: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onMinimize: () => void
  onClose: () => void
  onResizeMouseDown: (e: React.MouseEvent) => void
  onInitializeGame: () => void
}

export function GameWindow({
  board,
  score,
  bestScore,
  isGameOver,
  gameVisible,
  gamePosition,
  gameSize,
  isMinimized,
  onMouseDown,
  onMinimize,
  onClose,
  onResizeMouseDown,
  onInitializeGame,
}: GameWindowProps) {
  if (!gameVisible) return null

  return (
    <AnimatePresence>
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
          onMouseDown={onMouseDown}
        >
          <span className="text-xs font-medium">計算機</span>
          <div className="flex items-center gap-1">
            <button
              onClick={onMinimize}
              className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs hover:bg-yellow-500"
            >
              -
            </button>
            <button
              onClick={onClose}
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
                        fontSize: tile.value >= 1000 ? "0.6rem" : "0.75rem",
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
                onClick={onInitializeGame}
                className="bg-[#8f7a66] text-white px-2 py-0.5 rounded text-xs hover:bg-[#9f8a76]"
              >
                新しいゲーム
              </button>
            </div>

            <div className="mt-1 text-xs text-center text-gray-500">矢印キーで操作 | ESCで隠す | Fで全画面</div>

            {isGameOver && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg text-center">
                  <h3 className="font-bold mb-2 text-sm">ゲーム終了！</h3>
                  <p className="text-xs mb-2">スコア: {score}</p>
                  <button
                    onClick={onInitializeGame}
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
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={onResizeMouseDown}>
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
