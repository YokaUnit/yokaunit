"use client"

import { Button } from "@/components/ui/button"
import { Minimize2 } from "lucide-react"
import { ExcelInterface } from "./ExcelInterface"
import { GameWindow } from "./GameWindow"
import { Tile } from "../lib/types"

interface FullscreenGameProps {
  board: Tile[]
  score: number
  bestScore: number
  isGameOver: boolean
  gameVisible: boolean
  gamePosition: { x: number; y: number }
  gameSize: { width: number; height: number }
  isMinimized: boolean
  onGameOpen: () => void
  onMouseDown: (e: React.MouseEvent) => void
  onMinimize: () => void
  onClose: () => void
  onResizeMouseDown: (e: React.MouseEvent) => void
  onInitializeGame: () => void
  onToggleFullscreen: () => void
}

export function FullscreenGame({
  board,
  score,
  bestScore,
  isGameOver,
  gameVisible,
  gamePosition,
  gameSize,
  isMinimized,
  onGameOpen,
  onMouseDown,
  onMinimize,
  onClose,
  onResizeMouseDown,
  onInitializeGame,
  onToggleFullscreen,
}: FullscreenGameProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* 全画面時の閉じるボタン */}
      <Button
        onClick={onToggleFullscreen}
        className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700"
        size="sm"
        title="全画面を終了 (Fキー)"
      >
        <Minimize2 className="w-4 h-4 mr-2" />
        全画面終了
      </Button>
      
      <ExcelInterface onGameOpen={onGameOpen} />
      
      <GameWindow
        board={board}
        score={score}
        bestScore={bestScore}
        isGameOver={isGameOver}
        gameVisible={gameVisible}
        gamePosition={gamePosition}
        gameSize={gameSize}
        isMinimized={isMinimized}
        onMouseDown={onMouseDown}
        onMinimize={onMinimize}
        onClose={onClose}
        onResizeMouseDown={onResizeMouseDown}
        onInitializeGame={onInitializeGame}
      />
    </div>
  )
}
