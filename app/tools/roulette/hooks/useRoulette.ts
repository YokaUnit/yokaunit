"use client"

import { useState, useCallback } from "react"
import type { RouletteItem, RouletteResult, RouletteConfig, RouletteStep, RouletteMode } from "../lib/types"

const DEFAULT_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
  "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B739", "#95A5A6"
]

export function useRoulette() {
  const [step, setStep] = useState<RouletteStep>("setup")
  const [items, setItems] = useState<RouletteItem[]>([])
  const [mode, setMode] = useState<RouletteMode>("normal")
  const [result, setResult] = useState<RouletteResult | null>(null)
  const [history, setHistory] = useState<RouletteResult[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [pendingTargetIndex, setPendingTargetIndex] = useState<number | null>(null)
  const [multipleCount, setMultipleCount] = useState(3)
  const [allowDuplicates, setAllowDuplicates] = useState(false)

  // 項目を追加
  const addItem = useCallback((name: string, weight: number = 1, emoji?: string) => {
    const newItem: RouletteItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      name,
      weight: Math.max(0.1, weight), // 最小値0.1
      color: DEFAULT_COLORS[items.length % DEFAULT_COLORS.length],
      emoji
    }
    setItems(prev => [...prev, newItem])
  }, [items.length])

  // 項目を削除
  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  // 項目を更新
  const updateItem = useCallback((id: string, updates: Partial<RouletteItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }, [])

  // 重み付きランダム選択
  const weightedRandom = useCallback((items: RouletteItem[]): RouletteItem => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
    let random = Math.random() * totalWeight

    for (const item of items) {
      random -= item.weight
      if (random <= 0) {
        return item
      }
    }
    return items[items.length - 1]
  }, [])

  // 通常ランダム選択
  const normalRandom = useCallback((items: RouletteItem[]): RouletteItem => {
    return items[Math.floor(Math.random() * items.length)]
  }, [])

  // 複数当選
  const multipleRandom = useCallback((items: RouletteItem[], count: number, allowDuplicates: boolean): RouletteItem[] => {
    const selected: RouletteItem[] = []
    const availableItems = [...items]

    for (let i = 0; i < count && availableItems.length > 0; i++) {
      const selectedItem = mode === "weighted" 
        ? weightedRandom(availableItems)
        : normalRandom(availableItems)
      
      selected.push(selectedItem)
      
      if (!allowDuplicates) {
        const index = availableItems.findIndex(item => item.id === selectedItem.id)
        if (index !== -1) {
          availableItems.splice(index, 1)
        }
      }
    }

    return selected
  }, [mode, weightedRandom, normalRandom])

  // ルーレットを実行
  const spinRoulette = useCallback(() => {
    if (items.length === 0 || isSpinning) return

    setIsSpinning(true)
    setStep("spinning")

    // アニメーション時間（2-4秒）
    const spinDuration = 2000 + Math.random() * 2000
    // 先に当選を決定し、ターゲットインデックスをUIへ伝える（減速してそこへ止まる）
    let selectedItem: RouletteItem
    let selectedItems: RouletteItem[] = []

    switch (mode) {
      case "multiple":
        selectedItems = multipleRandom(items, multipleCount, allowDuplicates)
        selectedItem = selectedItems[0]
        break
      case "weighted":
        selectedItem = weightedRandom(items)
        break
      case "elimination":
        if (items.length <= 1) {
          selectedItem = items[0]
        } else {
          const excludedIndex = Math.floor(Math.random() * items.length)
          const remainingItems = items.filter((_, index) => index !== excludedIndex)
          selectedItem = normalRandom(remainingItems)
        }
        break
      default:
        selectedItem = normalRandom(items)
    }

    const targetIndex = items.findIndex(it => it.id === selectedItem.id)
    setPendingTargetIndex(targetIndex >= 0 ? targetIndex : 0)

    // 所定時間後に確定
    setTimeout(() => {
      const newResult: RouletteResult = {
        item: selectedItem,
        timestamp: new Date(),
        spinDuration
      }

      setResult(newResult)
      setHistory(prev => [newResult, ...prev].slice(0, 50))
      setStep("result")
      setIsSpinning(false)
      setPendingTargetIndex(null)
    }, spinDuration)
  }, [items, mode, multipleCount, allowDuplicates, isSpinning, weightedRandom, normalRandom, multipleRandom])

  // リセット
  const reset = useCallback(() => {
    setStep("setup")
    setResult(null)
    setIsSpinning(false)
  }, [])

  // 全リセット
  const resetAll = useCallback(() => {
    setItems([])
    setResult(null)
    setHistory([])
    setStep("setup")
    setIsSpinning(false)
    setMode("normal")
    setMultipleCount(3)
    setAllowDuplicates(false)
  }, [])

  return {
    step,
    items,
    mode,
    result,
    history,
    isSpinning,
    pendingTargetIndex,
    multipleCount,
    allowDuplicates,
    setStep,
    setMode,
    setMultipleCount,
    setAllowDuplicates,
    addItem,
    removeItem,
    updateItem,
    spinRoulette,
    reset,
    resetAll
  }
}

