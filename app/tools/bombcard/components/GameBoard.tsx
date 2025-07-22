"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCcw, RotateCcw, Trophy, Settings } from "lucide-react"
import { GameCard } from "./GameCard"
import { PlayerInfo } from "./PlayerInfo"
import type { GameState } from "../hooks/useBombCardGame"

interface GameBoardProps {
  gameState: GameState
  cardCount: number
  setCardCount: (count: number) => void
  maxCards: number
  minCards: number
  onSelectCard: (index: number) => void
  onResetGame: () => void
  onPlayAgain: () => void
  onResetCardCount: () => void
}

export function GameBoard({
  gameState,
  cardCount,
  setCardCount,
  maxCards,
  minCards,
  onSelectCard,
  onResetGame,
  onPlayAgain,
  onResetCardCount,
}: GameBoardProps) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  const remainingCards = currentPlayer?.remainingCards || 0

  // ゲーム終了時の表示
  if (gameState.gamePhase === "finished") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 space-y-4">
        {/* 勝利メッセージ */}
        <div className="text-center space-y-4 mb-6">
          <div className="relative">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
            <div className="absolute -top-2 -right-2 text-2xl animate-pulse">🎉</div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            ゲーム終了！
          </h2>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 border-2 border-yellow-300">
            <p className="text-xl font-bold text-gray-800">
              🏆 <span className="text-yellow-700">{gameState.winner}</span> の勝利！
            </p>
          </div>
        </div>

        {/* プレイヤー結果 */}
        <div className="w-full max-w-md">
          <PlayerInfo
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            showCardReduction={false}
          />
        </div>

        {/* コントロール */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center justify-center gap-2 bg-white/90 rounded-xl p-3 border border-gray-200">
            <Label htmlFor="cardCount" className="text-sm font-medium text-gray-700">
              カード枚数:
            </Label>
            <Input
              id="cardCount"
              type="number"
              min={minCards}
              max={maxCards}
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className="w-16 text-center border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              もう一度
            </Button>
            <Button
              onClick={onResetGame}
              variant="outline"
              className="px-4 py-3 rounded-xl border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col p-2 gap-2">
      {/* ヘッダー - 現在のプレイヤー */}
      <div className="bg-gradient-to-r from-orange-200/60 to-red-200/60 rounded-xl p-3 text-center shadow-lg border border-orange-300/50">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
          <p className="text-lg font-black text-orange-900 truncate">{currentPlayer?.name}</p>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
        </div>
        <p className="text-orange-800 text-sm font-bold mt-1">のターン - 残り {remainingCards}枚</p>
      </div>

      {/* カードグリッド */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 flex justify-center">
            <div
              className={`grid justify-items-center ${remainingCards <= 6 ? "gap-3" : "gap-2"} ${
                remainingCards <= 3
                  ? "grid-cols-3"
                  : remainingCards <= 6
                    ? "grid-cols-3"
                    : remainingCards <= 9
                      ? "grid-cols-3"
                      : "grid-cols-4"
              }`}
            >
              {Array.from({ length: remainingCards }).map((_, index) => (
                <GameCard
                  key={index}
                  index={index}
                  isSelected={gameState.selectedCardIndex === index}
                  isFlipped={gameState.isCardFlipped}
                  isBomb={gameState.isBombCard && gameState.selectedCardIndex === index}
                  onClick={() => onSelectCard(index)}
                  disabled={gameState.gamePhase !== "playing"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* プレイヤー情報 */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
        <PlayerInfo
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          showCardReduction={gameState.showCardReduction}
        />
      </div>

      {/* 設定パネル */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-3 h-3 text-gray-600" />
          <span className="text-xs font-medium text-gray-700">設定</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="cardCount" className="text-xs text-gray-600 whitespace-nowrap">
              カード:
            </Label>
            <Input
              id="cardCount"
              type="number"
              min={minCards}
              max={maxCards}
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className="w-12 text-center text-xs border-gray-300 focus:border-blue-500 h-8"
            />
          </div>
          <div className="flex gap-1">
            <Button
              onClick={onResetCardCount}
              variant="outline"
              size="sm"
              className="text-xs px-2 py-1 rounded-lg border-gray-300 hover:bg-gray-50 bg-transparent h-8"
            >
              枚数をリセット
            </Button>
            <Button
              onClick={onResetGame}
              variant="outline"
              size="sm"
              className="text-xs px-2 py-1 rounded-lg border-gray-300 hover:bg-gray-50 bg-transparent h-8"
            >
              最初から
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
