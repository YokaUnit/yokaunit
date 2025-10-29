"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PlayingCard {
  id: number
  suit: "♠" | "♥" | "♦" | "♣" | "🃏"
  value: string
  color: "red" | "black" | "joker"
  numericValue: number
}

const suits = ["♠", "♥", "♦", "♣"] as const
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const

const createDeck = (): PlayingCard[] => {
  const deck: PlayingCard[] = []
  
  // 通常のカード
  suits.forEach((suit, suitIndex) => {
    values.forEach((value, valueIndex) => {
      deck.push({
        id: suitIndex * 13 + valueIndex,
        suit,
        value,
        color: suit === "♥" || suit === "♦" ? "red" : "black",
        numericValue: valueIndex + 1
      })
    })
  })
  
  // ジョーカー
  deck.push({
    id: 52,
    suit: "🃏",
    value: "JOKER",
    color: "joker",
    numericValue: 0
  })
  
  return deck
}

const shuffleDeck = (deck: PlayingCard[]): PlayingCard[] => {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function CardStackClientPage() {
  const [allCards, setAllCards] = useState<PlayingCard[]>([])
  const [availableCards, setAvailableCards] = useState<PlayingCard[]>([])
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null)
  const [gameMode, setGameMode] = useState<"high-low" | "joker-russian" | "mark-prediction">("high-low")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [prediction, setPrediction] = useState<"high" | "low" | "joker" | "spade" | "heart" | "diamond" | "club">("high")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const deck = createDeck()
    const shuffledDeck = shuffleDeck(deck)
    setAllCards(shuffledDeck)
    setAvailableCards(shuffledDeck)
  }, [])

  const drawCard = () => {
    if (availableCards.length === 0 || isAnimating) return
    
    setIsAnimating(true)
    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const drawnCard = availableCards[randomIndex]
    
    setCurrentCard(drawnCard)
    setAvailableCards(prev => prev.filter((_, index) => index !== randomIndex))
    
    setTimeout(() => {
      setIsAnimating(false)
      setShowResult(true)
    }, 1000)
  }

  const makePrediction = (pred: "high" | "low" | "joker" | "spade" | "heart" | "diamond" | "club") => {
    if (!currentCard || isAnimating) return
    
    setPrediction(pred)
    drawCard()
  }

  const checkResult = () => {
    if (!currentCard) return
    
    let isCorrect = false
    
    switch (gameMode) {
      case "high-low":
        if (prediction === "high" && currentCard.numericValue > 7) isCorrect = true
        if (prediction === "low" && currentCard.numericValue < 7) isCorrect = true
        if (currentCard.value === "7") isCorrect = false
        break
      case "joker-russian":
        if (prediction === "joker" && currentCard.suit === "🃏") isCorrect = true
        if (prediction !== "joker" && currentCard.suit !== "🃏") isCorrect = true
        break
      case "mark-prediction":
        if (prediction === "spade" && currentCard.suit === "♠") isCorrect = true
        if (prediction === "heart" && currentCard.suit === "♥") isCorrect = true
        if (prediction === "diamond" && currentCard.suit === "♦") isCorrect = true
        if (prediction === "club" && currentCard.suit === "♣") isCorrect = true
        break
    }
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }
    
    setShowResult(false)
  }

  const resetGame = () => {
    const deck = createDeck()
    const shuffledDeck = shuffleDeck(deck)
    setAllCards(shuffledDeck)
    setAvailableCards(shuffledDeck)
    setCurrentCard(null)
    setScore(0)
    setStreak(0)
    setGameOver(false)
    setShowResult(false)
    setIsAnimating(false)
  }

  const getCardColor = (card: PlayingCard) => {
    switch (card.color) {
      case "red": return "text-red-600"
      case "black": return "text-black"
      case "joker": return "text-purple-600"
      default: return "text-gray-600"
    }
  }

  const getCardBackground = (card: PlayingCard) => {
    switch (card.color) {
      case "red": return "bg-red-50 border-red-200"
      case "black": return "bg-gray-50 border-gray-200"
      case "joker": return "bg-purple-50 border-purple-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ゲームモード選択 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setGameMode("high-low")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              gameMode === "high-low"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ハイ&ロー
          </button>
          <button
            onClick={() => setGameMode("joker-russian")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              gameMode === "joker-russian"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ジョーカーロシアンルーレット
          </button>
          <button
            onClick={() => setGameMode("mark-prediction")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              gameMode === "mark-prediction"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            マーク予想ゲーム
          </button>
        </div>
      </div>

      {/* スコア表示 */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          スコア: {score} | 連続: {streak}
        </div>
        <div className="text-sm text-gray-600">
          残りカード: {availableCards.length}枚
        </div>
      </div>

      {/* カード表示エリア */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-32 h-48 rounded-lg border-2 shadow-lg flex flex-col justify-between p-4 ${getCardBackground(currentCard)}`}
            >
              <div className="text-left">
                <div className={`text-2xl font-bold ${getCardColor(currentCard)}`}>
                  {currentCard.value}
                </div>
                <div className={`text-3xl ${getCardColor(currentCard)}`}>
                  {currentCard.suit}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl ${getCardColor(currentCard)}`}>
                  {currentCard.suit}
                </div>
                <div className={`text-2xl font-bold ${getCardColor(currentCard)}`}>
                  {currentCard.value}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-32 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-4xl mb-2">🃏</div>
                <div className="text-sm">カードを引く</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 予想ボタン */}
      {!currentCard && !isAnimating && (
        <div className="text-center">
          {gameMode === "high-low" && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                次のカードは7より高い？低い？
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => makePrediction("low")}
                  className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  低い (1-6)
                </button>
                <button
                  onClick={() => makePrediction("high")}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  高い (8-13)
                </button>
              </div>
            </div>
          )}
          
          {gameMode === "joker-russian" && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                次のカードはジョーカー？
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => makePrediction("joker")}
                  className="px-8 py-4 bg-purple-500 text-white rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  ジョーカー
                </button>
                <button
                  onClick={() => makePrediction("high")}
                  className="px-8 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  通常カード
                </button>
              </div>
            </div>
          )}
          
          {gameMode === "mark-prediction" && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                次のカードのマークは？
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => makePrediction("spade")}
                  className="px-6 py-4 bg-gray-800 text-white rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  ♠ スペード
                </button>
                <button
                  onClick={() => makePrediction("heart")}
                  className="px-6 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  ♥ ハート
                </button>
                <button
                  onClick={() => makePrediction("diamond")}
                  className="px-6 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  ♦ ダイヤ
                </button>
                <button
                  onClick={() => makePrediction("club")}
                  className="px-6 py-4 bg-gray-800 text-white rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  ♣ クラブ
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 結果表示 */}
      {showResult && currentCard && (
        <div className="text-center mb-6">
          <div className="text-xl font-semibold text-gray-700 mb-4">
            結果: {currentCard.value} {currentCard.suit}
          </div>
          <button
            onClick={checkResult}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            次のカードへ
          </button>
        </div>
      )}

      {/* リセットボタン */}
      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          ゲームリセット
        </button>
      </div>

      {/* ゲーム説明 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ゲームルール</h3>
        <div className="space-y-3 text-sm text-gray-600">
          {gameMode === "high-low" && (
            <>
              <p>• 次のカードが7より高いか低いかを予想します</p>
              <p>• 7が出た場合は負けです</p>
              <p>• 正解するとスコアが1ポイント増加します</p>
            </>
          )}
          {gameMode === "joker-russian" && (
            <>
              <p>• 次のカードがジョーカーか通常カードかを予想します</p>
              <p>• ジョーカーは1枚しかありません</p>
              <p>• 正解するとスコアが1ポイント増加します</p>
            </>
          )}
          {gameMode === "mark-prediction" && (
            <>
              <p>• 次のカードのマーク（スート）を予想します</p>
              <p>• スペード、ハート、ダイヤ、クラブから選択</p>
              <p>• 正解するとスコアが1ポイント増加します</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
