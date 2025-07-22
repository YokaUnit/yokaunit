"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Play } from "lucide-react"

interface GameSetupProps {
  cardCount: number
  setCardCount: (count: number) => void
  maxCards: number
  minCards: number
  onStartGame: (playerNames: string[]) => void
}

export function GameSetup({ cardCount, setCardCount, maxCards, minCards, onStartGame }: GameSetupProps) {
  const [playerInput, setPlayerInput] = useState("")

  const handleStartGame = () => {
    const playerNames = playerInput
      .split(/[\n,]/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0)

    if (playerNames.length >= 2) {
      onStartGame(playerNames)
    }
  }

  const handleCardCountChange = (value: number[]) => {
    setCardCount(value[0])
  }

  const handleCardCountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") return // 空の場合は何もしない
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= minCards && numValue <= maxCards) {
      setCardCount(numValue)
    }
  }

  const playerNames = playerInput
    .split(/[\n,]/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0)

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-800">ゲーム設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="players" className="text-sm font-medium">
              プレイヤー名（改行またはカンマ区切り）
            </Label>
            <Textarea
              id="players"
              placeholder="田中&#10;佐藤&#10;山田"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              className="min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {playerNames.length > 0 && (
              <div className="text-sm text-gray-600">
                プレイヤー数: {playerNames.length}人
                {playerNames.length < 2 && <span className="text-red-500 ml-2">（2人以上必要）</span>}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">カード枚数: {cardCount}枚</Label>
            <Slider
              value={[cardCount]}
              onValueChange={handleCardCountChange}
              max={maxCards}
              min={minCards}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{minCards}枚</span>
              <Input
                type="number"
                min={minCards}
                max={maxCards}
                value={cardCount}
                onChange={handleCardCountInputChange}
                className="w-20 h-8 text-center text-sm"
              />
              <span className="text-xs text-gray-500">{maxCards}枚</span>
            </div>
          </div>

          <Button
            onClick={handleStartGame}
            disabled={playerNames.length < 2}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            ゲーム開始！
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
