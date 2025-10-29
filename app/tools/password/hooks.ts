import { useState, useEffect, useCallback } from "react"
import { PasswordSettings, PasswordHistory, PasswordStrengthAnalysis } from './types'
import { analyzePasswordStrength, generatePasswordString } from './utils'
import { useToast } from "@/hooks/use-toast"

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState("")
  const [multiplePasswords, setMultiplePasswords] = useState<string[]>([])
  const [passwordCount, setPasswordCount] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthAnalysis, setStrengthAnalysis] = useState<PasswordStrengthAnalysis>({
    strength: 0,
    length: 0,
    complexity: 0,
    entropy: 0,
    timeToCrack: ""
  })

  const { toast } = useToast()

  // パスワード強度の詳細分析
  useEffect(() => {
    if (!password) return
    
    const analysis = analyzePasswordStrength(password)
    setPasswordStrength(analysis.strength)
    setStrengthAnalysis(analysis)
  }, [password])

  // パスワード生成（アニメーション付き）
  const generatePassword = useCallback(async (settings: PasswordSettings) => {
    setIsGenerating(true)
    
    // アニメーション効果のため少し遅延
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const newPassword = generatePasswordString(settings)
    setPassword(newPassword)
    
    setIsGenerating(false)
    return newPassword
  }, [])

  // 複数パスワード生成
  const generateMultiplePasswords = useCallback(async (settings: PasswordSettings) => {
    setIsGenerating(true)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newPasswords = []
    for (let i = 0; i < passwordCount; i++) {
      newPasswords.push(generatePasswordString(settings))
    }
    setMultiplePasswords(newPasswords)
    
    setIsGenerating(false)
    return newPasswords
  }, [passwordCount])

  return {
    password,
    setPassword,
    multiplePasswords,
    setMultiplePasswords,
    passwordCount,
    setPasswordCount,
    isGenerating,
    passwordStrength,
    strengthAnalysis,
    generatePassword,
    generateMultiplePasswords
  }
}

export const usePasswordHistory = () => {
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistory[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [historyFilter, setHistoryFilter] = useState<"all" | "favorites">("all")

  const { toast } = useToast()

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('password-history')
    const savedFavorites = localStorage.getItem('password-favorites')
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
        setPasswordHistory(parsed)
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
    if (passwordHistory.length > 0) {
      localStorage.setItem('password-history', JSON.stringify(passwordHistory))
    }
  }, [passwordHistory])

  // お気に入りをローカルストレージに保存
  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem('password-favorites', JSON.stringify(Array.from(favorites)))
    }
  }, [favorites])

  // 履歴に追加
  const addToHistory = useCallback((password: string, settings: PasswordSettings, strength: number) => {
    const historyItem: PasswordHistory = {
      id: Date.now().toString(),
      password,
      timestamp: new Date(),
      settings: { ...settings },
      strength,
      isFavorite: false
    }
    
    setPasswordHistory(prev => [historyItem, ...prev.slice(0, 99)]) // 最新100件まで保持
  }, [])

  // お気に入り切り替え
  const toggleFavorite = useCallback((passwordId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(passwordId)) {
        newFavorites.delete(passwordId)
      } else {
        newFavorites.add(passwordId)
      }
      return newFavorites
    })
    
    // 履歴のisFavoriteも更新
    setPasswordHistory(prev => 
      prev.map(item => 
        item.id === passwordId 
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    )
  }, [])

  // 履歴から削除
  const removeFromHistory = useCallback((passwordId: string) => {
    setPasswordHistory(prev => prev.filter(item => item.id !== passwordId))
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      newFavorites.delete(passwordId)
      return newFavorites
    })
  }, [])

  // 履歴をクリア
  const clearHistory = useCallback(() => {
    setPasswordHistory([])
    setFavorites(new Set())
    localStorage.removeItem('password-history')
    localStorage.removeItem('password-favorites')
    toast({
      title: "履歴をクリアしました",
      description: "すべてのパスワード履歴が削除されました",
    })
  }, [toast])

  // フィルタされた履歴を取得
  const filteredHistory = passwordHistory.filter(item => 
    historyFilter === "all" || favorites.has(item.id)
  )

  return {
    passwordHistory,
    favorites,
    historyFilter,
    setHistoryFilter,
    addToHistory,
    toggleFavorite,
    removeFromHistory,
    clearHistory,
    filteredHistory
  }
}

export const usePasswordSettings = () => {
  const [settings, setSettings] = useState<PasswordSettings>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
    customCharset: "",
    preset: "strong"
  })

  return {
    settings,
    setSettings
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

  const copyMultiplePassword = useCallback(async (index: number, password: string) => {
    const success = await copyToClipboard(password)
    if (success) {
      setCopiedIndexes((prev) => [...prev, index])
      setTimeout(() => {
        setCopiedIndexes((prev) => prev.filter((i) => i !== index))
      }, 3000)
    }
    return success
  }, [copyToClipboard])

  const copyAllPasswords = useCallback(async (passwords: string[]) => {
    const allPasswords = passwords.join("\n")
    const success = await copyToClipboard(allPasswords)
    if (success) {
      setCopiedIndexes([...Array(passwords.length).keys()])
      setTimeout(() => setCopiedIndexes([]), 3000)
    }
    return success
  }, [copyToClipboard])

  return {
    copied,
    copiedIndexes,
    copyToClipboard,
    copyMultiplePassword,
    copyAllPasswords
  }
}
