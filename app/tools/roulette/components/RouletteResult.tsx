"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Share2, Trophy } from "lucide-react"
import type { RouletteResult } from "../lib/types"

interface RouletteResultProps {
  result: RouletteResult
  onReset: () => void
  onShare?: () => void
}

export function RouletteResult({ result, onReset, onShare }: RouletteResultProps) {
  const confettiColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#F7DC6F"]
  const [windowHeight, setWindowHeight] = useState(800)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight)
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* 結果表示 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 shadow-2xl">
          {/* ゴールドのリング輝き */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl" style={{
              boxShadow: "inset 0 0 60px rgba(255,215,0,0.2)"
            }} />
          </div>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-8xl mb-4">
              {result.item.emoji || "🎉"}
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: result.item.color }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {result.item.name}
            </motion.h2>
            <div className="text-lg text-gray-600">
              {new Date(result.timestamp).toLocaleString("ja-JP")}
            </div>
          </motion.div>

          {/* パーティクル効果 */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                y: -100,
                x: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: windowHeight + 100,
                x: (Math.random() - 0.5) * 200,
                opacity: [1, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </Card>
      </motion.div>

      {/* アクションボタン */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
          size="lg"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          もう一度回す
        </Button>
        {onShare && (
          <Button
            onClick={onShare}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg"
            size="lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            結果をシェア
          </Button>
        )}
      </div>
    </div>
  )
}

interface RouletteHistoryProps {
  history: RouletteResult[]
}

export function RouletteHistory({ history }: RouletteHistoryProps) {
  if (history.length === 0) return null

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
        抽選履歴 ({history.length}件)
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((result, index) => (
          <div
            key={`${result.item.id}-${result.timestamp.getTime()}`}
            className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
            style={{ backgroundColor: `${result.item.color}10` }}
          >
            <div className="text-2xl">{result.item.emoji || "🎲"}</div>
            <div className="flex-1">
              <div className="font-medium">{result.item.name}</div>
              <div className="text-xs text-gray-500">
                {result.timestamp.toLocaleString("ja-JP")}
              </div>
            </div>
            <div className="text-sm text-gray-600">#{history.length - index}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

