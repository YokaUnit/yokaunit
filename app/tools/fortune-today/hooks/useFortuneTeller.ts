"use client"

import { useState, useCallback } from "react"
import type { FortuneInput, FortuneResult, FortuneStep } from "../lib/types"
import { calculateFortune } from "../lib/fortune-calculator"

export function useFortuneTeller() {
  const [step, setStep] = useState<FortuneStep>("intro")
  const [input, setInput] = useState<FortuneInput | null>(null)
  const [result, setResult] = useState<FortuneResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const startFortune = useCallback(() => {
    setStep("input")
  }, [])

  const calculateFortuneResult = useCallback(async (fortuneInput: FortuneInput) => {
    setIsCalculating(true)
    setInput(fortuneInput)
    
    try {
      // 短時間の演出（高速化）
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // AI運勢計算（非同期、高速化済み）
      const fortuneResult = await calculateFortune(fortuneInput)
      setResult(fortuneResult)
      setStep("result")
    } catch (error) {
      console.error("Fortune calculation failed:", error)
      // エラーハンドリング - デフォルト値を設定
      setResult({
        totalFortune: 50,
        loveFortune: 50,
        workFortune: 50,
        moneyFortune: 50,
        luckyAction: "深呼吸をする",
        caution: "慌てず落ち着いて行動",
        advice: "今日は普通の日。いつものペースで過ごしましょう。",
        emotionalMessage: "今日も一日お疲れ様です。",
        overallAssessment: "今日は平穏な一日になりそうです。自分らしく過ごしてください。"
      })
      setStep("result")
    } finally {
      setIsCalculating(false)
    }
  }, [])

  const resetFortune = useCallback(() => {
    setStep("intro")
    setInput(null)
    setResult(null)
    setIsCalculating(false)
  }, [])

  return {
    step,
    input,
    result,
    isCalculating,
    startFortune,
    calculateFortuneResult,
    resetFortune
  }
}
