"use client"

import { useState, useCallback } from "react"
import { getRandomSpawnPosition, getDiceColor, DEFAULT_PHYSICS } from "../lib/dice-physics"
import type { DicePhysicsSettings } from "../lib/dice-physics"

interface DiceResult {
  id: number
  value: number
  color: string
}

interface DiceInstance {
  id: number
  position: [number, number, number]
  color: string
}

interface Statistics {
  total: number
  average: number
  count: number
  distribution: Record<number, number>
}

export function useDice3D() {
  const [diceInstances, setDiceInstances] = useState<DiceInstance[]>([])
  const [diceResults, setDiceResults] = useState<DiceResult[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [physics, setPhysics] = useState<DicePhysicsSettings>(DEFAULT_PHYSICS)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [rollTrigger, setRollTrigger] = useState(0)
  const [allDiceStopped, setAllDiceStopped] = useState(false)

  // サイコロを追加
  const addDice = useCallback((count: number = 1) => {
    setDiceInstances(prev => {
      const newDice: DiceInstance[] = []
      
      for (let i = 0; i < count; i++) {
        const id = prev.length + i + 1
        const position = getRandomSpawnPosition(prev.length + i, prev.length + count)
        const color = getDiceColor(prev.length + i)
        
        newDice.push({
          id,
          position,
          color,
        })
      }
      
      return [...prev, ...newDice]
    })
  }, [])

  // すべてのサイコロを削除
  const clearAllDice = useCallback(() => {
    setDiceInstances([])
    setDiceResults([])
    setIsRolling(false)
    setAllDiceStopped(false)
  }, [])

  // 最後のサイコロを削除
  const removeLastDice = useCallback(() => {
    setDiceInstances(prev => prev.slice(0, -1))
    setDiceResults(prev => prev.slice(0, -1))
  }, [])

  // すべてのサイコロを振る（高速化）
  const rollAllDice = useCallback(() => {
    if (diceInstances.length === 0) return
    
    setIsRolling(true)
    setDiceResults([])
    setAllDiceStopped(false)
    setRollTrigger(prev => prev + 1)
  }, [diceInstances.length]) // isRollingの依存関係を削除

  // すべてのサイコロをリセット
  const resetAllDice = useCallback(() => {
    setIsRolling(false)
    setDiceResults([])
    setAllDiceStopped(false)
    setResetTrigger(prev => prev + 1)
  }, [])

  // サイコロが静止した時の処理（高速化）
  const handleDiceRest = useCallback((index: number, value: number) => {
    setDiceResults(prev => {
      const newResults = [...prev]
      const existingIndex = newResults.findIndex(result => result.id === index + 1)
      const dice = diceInstances.find(d => d.id === index + 1)
      
      const result: DiceResult = {
        id: index + 1,
        value,
        color: dice?.color || "#ffffff",
      }
      
      if (existingIndex >= 0) {
        newResults[existingIndex] = result
      } else {
        newResults.push(result)
      }
      
      // すべてのサイコロが静止したかチェック（遅延なしで即座に処理）
      if (newResults.length === diceInstances.length) {
        setAllDiceStopped(true)
        setIsRolling(false) // 遅延を削除
      }
      
      return newResults
    })
  }, [diceInstances])

  // 物理設定を更新
  const updatePhysics = useCallback((newPhysics: Partial<DicePhysicsSettings>) => {
    setPhysics(prev => ({ ...prev, ...newPhysics }))
  }, [])

  // 統計情報を計算
  const getStatistics = useCallback((): Statistics | null => {
    if (diceResults.length === 0) return null
    
    const values = diceResults.map(r => r.value)
    const sum = values.reduce((a, b) => a + b, 0)
    const average = sum / values.length
    const counts = values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {} as Record<number, number>)
    
    return {
      total: sum,
      average: Math.round(average * 100) / 100,
      count: values.length,
      distribution: counts,
    }
  }, [diceResults])

  // 初期サイコロを追加（1回だけ）
  const initializeDice = useCallback(() => {
    if (diceInstances.length === 0) {
      addDice(1)
    }
  }, [diceInstances.length, addDice])

  return {
    // State
    diceInstances,
    diceResults,
    isRolling,
    physics,
    resetTrigger,
    rollTrigger,
    allDiceStopped,
    
    // Actions
    addDice,
    clearAllDice,
    removeLastDice,
    rollAllDice,
    resetAllDice,
    updatePhysics,
    initializeDice,
    
    // Handlers
    handleDiceRest,
    
    // Utils
    getStatistics,
  }
}