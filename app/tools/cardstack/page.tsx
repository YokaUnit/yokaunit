"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PlayingCard {
  id: number
  suit: "♠" | "♥" | "♦" | "♣"
  value: string
  color: "red" | "black"
}

// トランプカードのデータ
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

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        id: id++,
        suit: suit.symbol,
        value,
        color: suit.color,
      })
    })
  })

  // シャッフル
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }

  return deck
}

export default function PlayingCardStack() {
  const [cards, setCards] = useState<PlayingCard[]>(() => createDeck())

  const removeCard = (id: number) => {
    setCards((prevCards) => {
      const newCards = prevCards.filter((card) => card.id !== id)

      // 新しいカードを追加（デッキから次のカード）
      if (newCards.length > 0) {
        const remainingCards = createDeck().filter((card) => !newCards.some((existing) => existing.id === card.id))
        if (remainingCards.length > 0) {
          const newCard = remainingCards[0]
          return [...newCards, newCard]
        }
      }

      // カードがなくなったら新しいデッキを作成
      if (newCards.length === 0) {
        return createDeck()
      }

      return newCards
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-800">Playing Card Stack</h1>
      <p className="mb-6 text-gray-600">Drag cards to remove them from the stack</p>

      <div className="relative h-[400px] w-[280px]">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 5).map((card, index) => (
            <PlayingCardComponent
              key={card.id}
              card={card}
              index={index}
              removeCard={removeCard}
              totalCards={Math.min(cards.length, 5)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p>Cards remaining: {cards.length}</p>
      </div>
    </main>
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
  const cardColor = isRed ? "text-red-500" : "text-black"
  const shadowColor = isRed ? "rgba(239, 68, 68, 0.3)" : "rgba(0, 0, 0, 0.3)"

  // スーツマークの配置パターンを取得
  const getSuitPattern = () => {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className={`text-8xl ${cardColor}`}>{card.suit}</div>
      </div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, x: xOffset }}
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
        transition: { duration: 0.3 },
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
      style={{
        zIndex,
        boxShadow: `0 ${5 + index * 3}px ${15 + index * 5}px ${shadowColor}`,
      }}
      className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-xl bg-white border-2 border-gray-300 active:cursor-grabbing"
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
        {/* 左上のスーツと数字 */}
        <div className={`flex flex-col items-start ${cardColor}`}>
          <div className="text-lg font-bold leading-none">{card.value}</div>
          <div className="text-lg leading-none">{card.suit}</div>
        </div>

        {/* 中央のスーツパターン */}
        {getSuitPattern()}

        {/* 右下のスーツと数字（逆さま） */}
        <div className={`flex flex-col items-end ${cardColor} rotate-180 self-end`}>
          <div className="text-lg font-bold leading-none">{card.value}</div>
          <div className="text-lg leading-none">{card.suit}</div>
        </div>

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
