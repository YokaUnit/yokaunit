import { useState, useEffect, useCallback } from "react"
import { UuidVersion, UuidFormat, UuidSettings, UuidHistory, UuidValidationResult } from './types'
import { generateUuidString, validateUuid, calculateUuidStats } from './utils'
import { useToast } from "@/hooks/use-toast"

export const useUuidGenerator = () => {
  const [uuid, setUuid] = useState("")
  const [multipleUuids, setMultipleUuids] = useState<string[]>([])
  const [uuidCount, setUuidCount] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationTime, setGenerationTime] = useState(0)

  const { toast } = useToast()

  // UUID生成（アニメーション付き）
  const generateUuid = useCallback(async (settings: UuidSettings) => {
    setIsGenerating(true)
    
    // アニメーション効果のため少し遅延
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const startTime = performance.now()
    const newUuid = generateUuidString(settings)
    const endTime = performance.now()
    
    setUuid(newUuid)
    setGenerationTime(endTime - startTime)
    
    setIsGenerating(false)
    return newUuid
  }, [])

  // 複数UUID生成
  const generateMultipleUuids = useCallback(async (settings: UuidSettings) => {
    setIsGenerating(true)
    
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const startTime = performance.now()
    const newUuids = []
    for (let i = 0; i < uuidCount; i++) {
      newUuids.push(generateUuidString(settings))
    }
    const endTime = performance.now()
    
    setMultipleUuids(newUuids)
    setGenerationTime(endTime - startTime)
    
    setIsGenerating(false)
    return newUuids
  }, [uuidCount])

  return {
    uuid,
    setUuid,
    multipleUuids,
    setMultipleUuids,
    uuidCount,
    setUuidCount,
    isGenerating,
    generationTime,
    generateUuid,
    generateMultipleUuids
  }
}

export const useUuidHistory = () => {
  const [uuidHistory, setUuidHistory] = useState<UuidHistory[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [historyFilter, setHistoryFilter] = useState<"all" | "favorites">("all")
  const [stats, setStats] = useState(calculateUuidStats([]))

  const { toast } = useToast()

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('uuid-history')
    const savedFavorites = localStorage.getItem('uuid-favorites')
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
        setUuidHistory(parsed)
        setStats(calculateUuidStats(parsed))
      } catch (error) {
        console.error('履歴の読み込みに失敗しました:', error)
      }
    }
    
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)))
      } catch (error) {
        console.error('お気に入りの読み込みに失敗しました:', error)
      }
    }
  }, [])

  // 履歴をローカルストレージに保存
  useEffect(() => {
    if (uuidHistory.length > 0) {
      localStorage.setItem('uuid-history', JSON.stringify(uuidHistory))
      setStats(calculateUuidStats(uuidHistory))
    }
  }, [uuidHistory])

  // お気に入りをローカルストレージに保存
  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem('uuid-favorites', JSON.stringify(Array.from(favorites)))
    }
  }, [favorites])

  // 履歴に追加
  const addToHistory = useCallback((uuid: string, settings: UuidSettings, isValid: boolean = true) => {
    const historyItem: UuidHistory = {
      id: Date.now().toString(),
      uuid,
      timestamp: new Date(),
      settings: { ...settings },
      isValid,
      isFavorite: false
    }
    
    setUuidHistory(prev => [historyItem, ...prev.slice(0, 199)]) // 最新200件まで保持
  }, [])

  // お気に入り切り替え
  const toggleFavorite = useCallback((uuidId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(uuidId)) {
        newFavorites.delete(uuidId)
      } else {
        newFavorites.add(uuidId)
      }
      return newFavorites
    })
    
    // 履歴のisFavoriteも更新
    setUuidHistory(prev => 
      prev.map(item => 
        item.id === uuidId 
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    )
  }, [])

  // 履歴から削除
  const removeFromHistory = useCallback((uuidId: string) => {
    setUuidHistory(prev => prev.filter(item => item.id !== uuidId))
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      newFavorites.delete(uuidId)
      return newFavorites
    })
  }, [])

  // 履歴をクリア
  const clearHistory = useCallback(() => {
    setUuidHistory([])
    setFavorites(new Set())
    localStorage.removeItem('uuid-history')
    localStorage.removeItem('uuid-favorites')
    setStats(calculateUuidStats([]))
    toast({
      title: "履歴をクリアしました",
      description: "すべてのUUID履歴が削除されました",
    })
  }, [toast])

  // フィルタされた履歴を取得
  const filteredHistory = uuidHistory.filter(item => 
    historyFilter === "all" || favorites.has(item.id)
  )

  return {
    uuidHistory,
    favorites,
    historyFilter,
    setHistoryFilter,
    stats,
    addToHistory,
    toggleFavorite,
    removeFromHistory,
    clearHistory,
    filteredHistory
  }
}

export const useUuidSettings = () => {
  const [settings, setSettings] = useState<UuidSettings>({
    version: "v4",
    format: {
      uppercase: false,
      includeHyphens: true,
      brackets: false
    }
  })

  return {
    settings,
    setSettings
  }
}

export const useUuidValidation = () => {
  const [validationInput, setValidationInput] = useState("")
  const [validationResults, setValidationResults] = useState<UuidValidationResult>({
    isValid: false,
  })

  // バリデーション実行
  useEffect(() => {
    if (validationInput.trim()) {
      const results = validateUuid(validationInput.trim())
      setValidationResults(results)
    } else {
      setValidationResults({ isValid: false })
    }
  }, [validationInput])

  const validateUuidInput = useCallback((input: string) => {
    setValidationInput(input)
    return validateUuid(input)
  }, [])

  return {
    validationInput,
    setValidationInput,
    validationResults,
    validateUuidInput
  }
}

export const useClipboard = () => {
  const [copied, setCopied] = useState(false)
  const [copiedIndexes, setCopiedIndexes] = useState<number[]>([])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
      return true
    } catch (error) {
      console.error('コピーに失敗しました:', error)
      return false
    }
  }, [])

  const copyMultipleUuid = useCallback(async (index: number, uuid: string) => {
    const success = await copyToClipboard(uuid)
    if (success) {
      setCopiedIndexes((prev) => [...prev, index])
      setTimeout(() => {
        setCopiedIndexes((prev) => prev.filter((i) => i !== index))
      }, 3000)
    }
    return success
  }, [copyToClipboard])

  const copyAllUuids = useCallback(async (uuids: string[]) => {
    const allUuids = uuids.join("\n")
    const success = await copyToClipboard(allUuids)
    if (success) {
      setCopiedIndexes([...Array(uuids.length).keys()])
      setTimeout(() => setCopiedIndexes([]), 3000)
    }
    return success
  }, [copyToClipboard])

  return {
    copied,
    copiedIndexes,
    copyToClipboard,
    copyMultipleUuid,
    copyAllUuids
  }
}
