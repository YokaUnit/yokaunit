"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, useAnimation } from "framer-motion"
import { useMobileDetector } from "../hooks/use-mobile-detector"
import { Trophy, Target, Clock, Zap } from "lucide-react"

interface GameState {
  score: number
  level: number
  timeLeft: number
  targetReached: boolean
  gameOver: boolean
  gameStarted: boolean
}

interface TargetPosition {
  x: number
  y: number
}

export default function BalloonGame() {
  const isMobile = useMobileDetector()
  const containerRef = useRef<HTMLDivElement>(null)
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    timeLeft: 60,
    targetReached: false,
    gameOver: false,
    gameStarted: false,
  })

  const [targetPosition, setTargetPosition] = useState<TargetPosition>({ x: 0, y: 0 })
  const [balloonPosition, setBalloonPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [distance, setDistance] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotation = useMotionValue(0)

  const controls = useAnimation()

  // 目標地点をランダムに設定
  const generateTarget = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const padding = 100

    setTargetPosition({
      x: padding + Math.random() * (rect.width - padding * 2),
      y: padding + Math.random() * (rect.height - padding * 2),
    })
  }, [])

  // 初期位置を設定
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    x.set(centerX)
    y.set(centerY)
    setBalloonPosition({ x: centerX, y: centerY })
  }, [x, y])

  // ゲーム開始
  const startGame = () => {
    setGameState((prev) => ({ ...prev, gameStarted: true, gameOver: false, score: 0, level: 1, timeLeft: 60 }))
    generateTarget()

    // タイマー開始
    gameTimerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          return { ...prev, timeLeft: 0, gameOver: true, gameStarted: false }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
  }

  // ゲームリセット
  const resetGame = () => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
    }
    setGameState({
      score: 0,
      level: 1,
      timeLeft: 60,
      targetReached: false,
      gameOver: false,
      gameStarted: false,
    })
    generateTarget()
    if (containerRef.current) {
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      x.set(centerX)
      y.set(centerY)
      setBalloonPosition({ x: centerX, y: centerY })
    }
  }

  // 距離を計算
  useEffect(() => {
    if (!gameState.gameStarted) return

    const updateDistance = () => {
      const dx = balloonPosition.x - targetPosition.x
      const dy = balloonPosition.y - targetPosition.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      setDistance(dist)

      // 目標到達判定（50px以内）
      if (dist < 50 && !gameState.targetReached) {
        setGameState((prev) => {
          const pointsEarned = Math.max(100 - Math.floor(dist), 10) * prev.level
          const newScore = prev.score + pointsEarned
          const newLevel = newScore >= prev.level * 500 ? prev.level + 1 : prev.level
          const newTimeLeft = Math.min(prev.timeLeft + 10, 120) // ボーナスタイム（最大120秒）

          return {
            ...prev,
            score: newScore,
            level: newLevel,
            timeLeft: newTimeLeft,
            targetReached: true,
          }
        })

        // 成功アニメーション
        controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 0.3 },
        })

        // 次の目標を生成
        setTimeout(() => {
          generateTarget()
          setGameState((prev) => ({ ...prev, targetReached: false }))
        }, 1000)
      }
    }

    updateDistance()
    const interval = setInterval(updateDistance, 100)
    return () => clearInterval(interval)
  }, [balloonPosition, targetPosition, gameState.targetReached, gameState.gameStarted, gameState.level, controls, generateTarget])

  // ドラッグ処理
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!gameState.gameStarted || gameState.gameOver) return
    e.preventDefault()
    setIsDragging(true)
    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const newX = e.clientX - rect.left
    const newY = e.clientY - rect.top

    // コンテナ内に制限
    const clampedX = Math.max(50, Math.min(rect.width - 50, newX))
    const clampedY = Math.max(50, Math.min(rect.height - 50, newY))

    x.set(clampedX)
    y.set(clampedY)
    setBalloonPosition({ x: clampedX, y: clampedY })

    // 回転エフェクト
    const dx = clampedX - balloonPosition.x
    rotation.set(rotation.get() + dx * 0.1)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    document.removeEventListener("pointermove", handlePointerMove)
    document.removeEventListener("pointerup", handlePointerUp)
  }

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // 目標地点の色を距離に応じて変更
  const targetColor = distance < 100 ? "#10b981" : distance < 200 ? "#f59e0b" : "#ef4444"
  const targetScale = distance < 100 ? 1.2 : distance < 200 ? 1.1 : 1

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 overflow-hidden rounded-2xl"
    >
      {/* ゲームUI */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-900">スコア: {gameState.score}</span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-gray-900">レベル: {gameState.level}</span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-500" />
          <span className="font-bold text-gray-900">残り時間: {gameState.timeLeft}秒</span>
        </div>
        {gameState.gameStarted && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="font-bold text-gray-900">距離: {Math.floor(distance)}px</span>
          </div>
        )}
      </div>

      {/* ゲーム開始/リセットボタン */}
      {!gameState.gameStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {gameState.gameOver ? "ゲームオーバー！" : "バルーンゲーム"}
            </h2>
            {gameState.gameOver && (
              <div className="mb-6">
                <p className="text-2xl font-bold text-yellow-500 mb-2">最終スコア: {gameState.score}</p>
                <p className="text-lg text-gray-600">レベル: {gameState.level}</p>
              </div>
            )}
            <p className="text-gray-600 mb-6">
              {gameState.gameOver
                ? "バルーンを目標地点に導いてスコアを獲得しよう！"
                : "バルーンをドラッグして目標地点に到達させよう！"}
            </p>
            <button
              onClick={gameState.gameOver ? resetGame : startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              {gameState.gameOver ? "もう一度プレイ" : "ゲーム開始"}
            </button>
          </div>
        </div>
      )}

      {/* 目標地点 */}
      {gameState.gameStarted && (
        <motion.div
          className="absolute z-10"
          style={{
            left: targetPosition.x,
            top: targetPosition.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [targetScale, targetScale * 1.1, targetScale],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: targetColor,
            }}
          >
            <Target className="w-8 h-8 text-white" />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: targetColor,
              opacity: 0.3,
            }}
          />
        </motion.div>
      )}

      {/* バルーン */}
      <motion.div
        className="absolute z-20 cursor-grab active:cursor-grabbing"
        style={{
          x,
          y,
          rotate: rotation,
        }}
        animate={controls}
        onPointerDown={handlePointerDown}
      >
        <motion.div
          className="w-24 h-32 rounded-full shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffaaaa 100%)",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* バルーンのハイライト */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-white/40 rounded-full blur-sm" />
          {/* バルーンの紐 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-gray-400 to-gray-600" />
        </motion.div>
      </motion.div>

      {/* 成功エフェクト */}
      {gameState.targetReached && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="text-6xl font-bold text-white drop-shadow-2xl">
            🎉 +{Math.max(100 - Math.floor(distance), 10) * gameState.level}pt
          </div>
        </motion.div>
      )}

      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

