"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PlayingCard {
  id: number
  suit: "♠" | "♥" | "♦" | "♣" | "🃏"
  value: string
  color: "red" | "black" | "joker"
  isDrawn: boolean
}

// 54枚のトランプカードのデータ（ジョーカー2枚含む）
const createDeck = (): PlayingCard[] => {
  const suits: Array<{ symbol: "♠" | "♥" | "♦" | "♣"; color: "red" | "black" }> = [
    { symbol: "♠", color: "black" },
    { symbol: "♥", color: "red" },
    { symbol: "♦", color: "red" },
    { symbol: "♣", color: "black" },
  ]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  const deck: PlayingCard[] = []
  let id = 1

  // 通常の52枚
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        id: id++,
        suit: suit.symbol,
        value,
        color: suit.color,
        isDrawn: false,
      })
    })
  })

  // ジョーカー2枚追加
  deck.push({
    id: id++,
    suit: "🃏",
    value: "JOKER",
    color: "joker",
    isDrawn: false,
  })
  
  deck.push({
    id: id++,
    suit: "🃏", 
    value: "JOKER",
    color: "joker",
    isDrawn: false,
  })

  return deck
}

// デッキをシャッフル（引けるカードのみ）
const getShuffledAvailableCards = (allCards: PlayingCard[]): PlayingCard[] => {
  const availableCards = allCards.filter(card => !card.isDrawn)
  const shuffled = [...availableCards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function CardStackClientPage() {
  const [allCards, setAllCards] = useState<PlayingCard[]>([])
  const [availableCards, setAvailableCards] = useState<PlayingCard[]>([])
  const [isClient, setIsClient] = useState(false)

  // クライアントサイドでのみ初期化
  useEffect(() => {
    setIsClient(true)
    const initialDeck = createDeck()
    setAllCards(initialDeck)
    setAvailableCards(getShuffledAvailableCards(initialDeck))
  }, [])

  const removeCard = (id: number) => {
    // 引いたカードをマークする
    setAllCards(prevAllCards => 
      prevAllCards.map(card => 
        card.id === id ? { ...card, isDrawn: true } : card
      )
    )

    // 利用可能なカードから削除
    setAvailableCards(prevCards => {
      const newCards = prevCards.filter((card) => card.id !== id)

      // カードがなくなったら新しくシャッフル
      if (newCards.length === 0) {
        // 全カードをリセット
        const resetCards = createDeck()
        setAllCards(resetCards)
        return getShuffledAvailableCards(resetCards)
      }

      return newCards
    })
  }

  const resetDeck = () => {
    const newDeck = createDeck()
    setAllCards(newDeck)
    setAvailableCards(getShuffledAvailableCards(newDeck))
  }

  const drawnCount = allCards.filter(card => card.isDrawn).length

  // クライアントサイドレンダリングが完了するまで何も表示しない
  if (!isClient) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
        <p className="mb-6 text-gray-600">読み込み中...</p>
        <div className="relative h-[400px] w-[280px] mb-8 bg-gray-100 rounded-xl animate-pulse"></div>
        <div className="text-center text-gray-600 mb-6">
          <p>準備中...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <p className="mb-6 text-gray-600">カードをドラッグして山札から引いてください</p>

      <div className="relative h-[400px] w-[280px] mb-8">
        <AnimatePresence mode="popLayout">
          {availableCards.slice(0, 5).map((card, index) => (
            <PlayingCardComponent
              key={card.id}
              card={card}
              index={index}
              removeCard={removeCard}
              totalCards={Math.min(availableCards.length, 5)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center text-gray-600 mb-6">
        <p>残りカード: {availableCards.length}枚</p>
        <p>引いたカード: {drawnCount}枚</p>
      </div>

      <button
        onClick={resetDeck}
        className="mb-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        🔄 デッキをリセット
      </button>

      {/* 54枚全てのカード表示（テーブル形式） */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">全カード状況</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 overflow-x-auto">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-xs font-bold text-black px-1 py-1">♠</td>
                {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map(value => {
                  const card = allCards.find(c => c.suit === "♠" && c.value === value)
                  return <td key={value} className="text-center px-1 py-1"><SmallCard card={card!} /></td>
                })}
              </tr>
              <tr>
                <td className="text-xs font-bold text-red-500 px-1 py-1">♥</td>
                {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map(value => {
                  const card = allCards.find(c => c.suit === "♥" && c.value === value)
                  return <td key={value} className="text-center px-1 py-1"><SmallCard card={card!} /></td>
                })}
              </tr>
              <tr>
                <td className="text-xs font-bold text-red-500 px-1 py-1">♦</td>
                {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map(value => {
                  const card = allCards.find(c => c.suit === "♦" && c.value === value)
                  return <td key={value} className="text-center px-1 py-1"><SmallCard card={card!} /></td>
                })}
              </tr>
              <tr>
                <td className="text-xs font-bold text-black px-1 py-1">♣</td>
                {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map(value => {
                  const card = allCards.find(c => c.suit === "♣" && c.value === value)
                  return <td key={value} className="text-center px-1 py-1"><SmallCard card={card!} /></td>
                })}
              </tr>
              <tr>
                <td className="text-xs font-bold text-purple-600 px-1 py-1">🃏</td>
                {allCards.filter(card => card.suit === "🃏").map((card, index) => (
                  <td key={card.id} className="text-center px-1 py-1"><SmallCard card={card} /></td>
                ))}
                {/* 残りのセルを空にする */}
                {Array.from({ length: 11 }, (_, i) => (
                  <td key={`empty-${i}`} className="px-1 py-1"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

// 小さなカードコンポーネント
interface SmallCardProps {
  card: PlayingCard
}

function SmallCard({ card }: SmallCardProps) {
  const isRed = card.color === "red"
  const isJoker = card.color === "joker"
  const cardColor = isJoker ? "text-purple-600" : isRed ? "text-red-500" : "text-black"
  
  return (
    <div 
      className={`
        w-7 h-9 rounded border border-gray-300 shadow-sm flex items-center justify-center text-xs
        ${card.isDrawn 
          ? "bg-gray-200 opacity-40 grayscale" 
          : "bg-white"
        }
      `}
    >
      {isJoker ? (
        <div className={`text-sm ${card.isDrawn ? "text-gray-400" : cardColor}`}>
          🃏
        </div>
      ) : (
        <div className={`${card.isDrawn ? "text-gray-400" : cardColor} font-bold text-xs`}>
          {card.value}
        </div>
      )}
    </div>
  )
}

interface CardProps {
  card: PlayingCard
  index: number
  removeCard: (id: number) => void
  totalCards: number
}

function PlayingCardComponent({ card, index, removeCard, totalCards }: CardProps) {
  const zIndex = totalCards - index
  const yOffset = index * 8
  const xOffset = index * 2
  const rotation = index * -2

  const isRed = card.color === "red"
  const isJoker = card.color === "joker"
  const cardColor = isJoker ? "text-purple-600" : isRed ? "text-red-500" : "text-black"
  const shadowColor = "rgba(0, 0, 0, 0.3)" // 全て黒系統の影に統一

  // スーツマークの配置パターンを取得
  const getSuitPattern = () => {
    if (isJoker) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-8xl text-purple-600">🃏</div>
        </div>
      )
    }
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className={`text-8xl ${cardColor}`}>{card.suit}</div>
      </div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ 
        opacity: 0, 
        y: yOffset, // 最終位置と同じ場所から開始
        x: xOffset,
        scale: 0, // 完全に小さく（見えない）
        rotateZ: rotation,
      }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.02,
        rotateZ: rotation,
      }}
      exit={{
        opacity: 0,
        x: Math.random() > 0.5 ? 300 : -300,
        y: -200,
        rotateZ: Math.random() * 30 - 15,
        transition: { duration: 0.5 },
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 45,
        mass: 1,
        delay: index * 0.3, // さらに長い遅延で段階的に表示
      }}
      style={{
        zIndex,
        boxShadow: `0 ${5 + index * 3}px ${15 + index * 5}px ${shadowColor}`,
      }}
      className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-xl bg-white border-2 border-gray-400 active:cursor-grabbing"
      drag={index === 0}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (index === 0) {
          const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2))
          if (distance > 100) {
            removeCard(card.id)
          }
        }
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow: `0 ${10 + index * 3}px ${25 + index * 5}px ${shadowColor}`,
      }}
    >
      <div className="relative flex h-full w-full flex-col p-3">
        {!isJoker && (
          <>
            {/* 左上のスーツと数字 */}
            <div className={`flex flex-col items-start ${cardColor}`}>
              <div className="text-lg font-bold leading-none">{card.value}</div>
              <div className="text-lg leading-none">{card.suit}</div>
            </div>
          </>
        )}

        {/* 中央のスーツパターン */}
        {getSuitPattern()}

        {!isJoker && (
          <>
            {/* 右下のスーツと数字（逆さま） */}
            <div className={`flex flex-col items-end ${cardColor} rotate-180 self-end`}>
              <div className="text-lg font-bold leading-none">{card.value}</div>
              <div className="text-lg leading-none">{card.suit}</div>
            </div>
          </>
        )}

        {/* ドラッグインジケーター（一番上のカードのみ） */}
        {index === 0 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <motion.div
              className="h-1 w-8 rounded-full bg-gray-400"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}