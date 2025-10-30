"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export type HistoryItem = {
  id: number
  score: number
  brink: number
  angle: number
  power: number
  result: string
}

export function useBallRoll3DGame() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [score, setScore] = useState(0)
  const [brinkDistance, setBrinkDistance] = useState(0)
  const [resultLabel, setResultLabel] = useState("待機中")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [resetTrigger, setResetTrigger] = useState(0)
  const [isLaunched, setIsLaunched] = useState(false)
  // ドラッグ発射専用にするため角度/パワー/外部トリガーは撤廃
  const [roundOver, setRoundOver] = useState(false)

  const edgeZ = useRef(20)
  const lastBallZ = useRef(-6)
  const [currentBallZ, setCurrentBallZ] = useState(0)

  const updateBallPosition = useCallback((pos: [number, number, number]) => {
    lastBallZ.current = pos[2]
    setCurrentBallZ(pos[2])
  }, [])

  const onLaunch = useCallback(() => {
    if (roundOver || isLaunched) return
    setIsLaunched(true)
    setResultLabel("発射中…")
  }, [roundOver, isLaunched])

  const finalizeRound = useCallback((didFall: boolean, stopZ: number) => {
    if (roundOver) return
    setRoundOver(true)
    const distanceToEdge = Math.max(0, edgeZ.current - stopZ)
    setBrinkDistance(distanceToEdge)

    let s = 0
    let label = ""
    if (didFall) {
      s = 0
      label = "落下"
    } else {
      // 距離が小さいほど高得点: 1000点を基準、距離1mで-300点、以後逓減
      s = Math.max(0, Math.floor(1000 - distanceToEdge * 300))
      label = distanceToEdge < 0.2 ? "神ギリ" : distanceToEdge < 0.5 ? "超ギリ" : distanceToEdge < 1 ? "ギリ" : "普通"
    }
    setScore(s)
    setResultLabel(label)

    const item: HistoryItem = {
      id: Date.now(),
      score: s,
      brink: distanceToEdge,
      angle: 0,
      power: 0,
      result: label,
    }
    setHistory((prev) => [item, ...prev].slice(0, 12))
  }, [])

  const onFall = useCallback(() => {
    finalizeRound(true, lastBallZ.current)
  }, [finalizeRound])

  const onRestNearEdge = useCallback(() => {
    finalizeRound(false, lastBallZ.current)
  }, [finalizeRound])

  const resetRound = useCallback(() => {
    setIsLaunched(false)
    setRoundOver(false)
    setScore(0)
    setBrinkDistance(0)
    setResultLabel("待機中")
    lastBallZ.current = 0
    setResetTrigger((p) => p + 1)
  }, [])

  // ボタン発射は廃止（ドラッグのみ）

  // 共有
  const shareGame = useCallback(() => {
    try {
      if (navigator.share) {
        navigator
          .share({
            title: "ボール転がし3D - YokaUnit",
            text: `スコア:${score} 点｜ギリギリ距離:${brinkDistance.toFixed(2)}m`,
            url: window.location.href,
          })
          .catch(() => fallbackShare())
      } else {
        fallbackShare()
      }
    } catch {
      fallbackShare()
    }
  }, [score, brinkDistance])

  const fallbackShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
  }, [])

  return {
    // state
    soundEnabled,
    score,
    brinkDistance,
    resultLabel,
    history,
    resetTrigger,
    isLaunched,
    currentBallZ,

    // actions
    setSoundEnabled,
    updateBallPosition,
    onLaunch,
    onFall,
    onRestNearEdge,
    resetRound,
    shareGame,
    setEdgeZ: (v: number) => {
      edgeZ.current = v
    },
  }
}


