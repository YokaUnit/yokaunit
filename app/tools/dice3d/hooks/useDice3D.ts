"use client"

import { useState, useRef, useCallback } from "react"
import { getRandomSpawnPosition, getDiceColor, DEFAULT_PHYSICS } from "../lib/dice-physics"
import type { DicePhysicsSettings } from "../lib/dice-physics"
import type { Dice3DRef } from "../components/Dice3D"

interface DiceResult {
  id: number
  value: number
  color: string
}

interface DiceInstance {
  id: number
  position: [number, number, number]
  color: string
  ref: React.RefObject<Dice3DRef>
}

export function useDice3D() {
  const [diceInstances, setDiceInstances] = useState<DiceInstance[]>([])
  const [diceResults, setDiceResults] = useState<DiceResult[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [physics, setPhysics] = useState<DicePhysicsSettings>(DEFAULT_PHYSICS)
  const nextDiceId = useRef(1)

  // サイコロを追加
  const addDice = useCallback((count: number = 1) => {
    setDiceInstances(prev => {
      const newDice: DiceInstance[] = []
      
      for (let i = 0; i < count; i++) {
        const id = nextDiceId.current++
        const position = getRandomSpawnPosition(prev.length + i, prev.length + count)
        const color = getDiceColor(prev.length + i)
        
        newDice.push({
          id,
          position,
          color,
          ref: { current: null },
        })
      }
      
      return [...prev, ...newDice]
    })
  }, [])

  // すべてのサイコロを削除
  const clearAllDice = useCallback(() => {
    setDiceInstances([])
    setDiceResults([])
    nextDiceId.current = 1
  }, [])

  // 最後のサイコロを削除
  const removeLastDice = useCallback(() => {
    setDiceInstances(prev => prev.slice(0, -1))
    setDiceResults(prev => prev.slice(0, -1))
  }, [])

  // すべてのサイコロを振る
  const rollAllDice = useCallback(() => {
    if (diceInstances.length === 0 || isRolling) return
    
    setIsRolling(true)
    setDiceResults([])
    
    diceInstances.forEach(dice => {
      dice.ref.current?.roll()
    })
  }, [diceInstances, isRolling])

  // すべてのサイコロをリセット
  const resetAllDice = useCallback(() => {
    setIsRolling(false)
    setDiceResults([])
    
    diceInstances.forEach(dice => {
      dice.ref.current?.reset()
    })
  }, [diceInstances])

  // サイコロが静止した時の処理
  const handleDiceRest = useCallback((id: number, value: number) => {
    setDiceResults(prev => {
      const newResults = [...prev]
      const existingIndex = newResults.findIndex(result => result.id === id)
      const dice = diceInstances.find(d => d.id === id)
      
      const result: DiceResult = {
        id,
        value,
        color: dice?.color || "#ffffff",
      }
      
      if (existingIndex >= 0) {
        newResults[existingIndex] = result
      } else {
        newResults.push(result)
      }
      
      // すべてのサイコロが静止したかチェック
      if (newResults.length === diceInstances.length) {
        setIsRolling(false)
      }
      
      return newResults
    })
  }, [diceInstances])

  // 物理設定を更新
  const updatePhysics = useCallback((newPhysics: Partial<DicePhysicsSettings>) => {
    setPhysics(prev => ({ ...prev, ...newPhysics }))
  }, [])

  // 統計情報を計算
  const getStatistics = useCallback(() => {
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

  return {
    // State
    diceInstances,
    diceResults,
    isRolling,
    physics,
    
    // Actions
    addDice,
    clearAllDice,
    removeLastDice,
    rollAllDice,
    resetAllDice,
    updatePhysics,
    
    // Handlers
    handleDiceRest,
    
    // Utils
    getStatistics,
  }
}
