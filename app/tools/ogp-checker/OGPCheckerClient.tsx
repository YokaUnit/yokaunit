"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Image as ImageIcon,
  Eye,
  Globe,
  Twitter,
  Facebook,
  Smartphone,
  Monitor,
  Loader2,
  Plus,
  Trash2,
  Download,
  History,
  BarChart3,
  Lightbulb,
  Clock,
  CheckSquare,
  Square,
  Upload,
  FileText,
  Share2,
  Star,
  TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"

interface OGPMetaData {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
  type?: string
  locale?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterSite?: string
  twitterCreator?: string
  canonical?: string
  robots?: string
  keywords?: string
  author?: string
  viewport?: string
  charset?: string
  favicon?: string
  appleTouchIcon?: string
  manifest?: string
  themeColor?: string
  error?: string
}

interface CheckResult {
  url: string
  metaData: OGPMetaData
  timestamp: number
  score: number
}

export function OGPCheckerClient() {
  const [url, setUrl] = useState("")
  const [urls, setUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [batchLoading, setBatchLoading] = useState(false)
  const [metaData, setMetaData] = useState<OGPMetaData | null>(null)
  const [results, setResults] = useState<CheckResult[]>([])
  const [error, setError] = useState("")
  const [imageLoading, setImageLoading] = useState<{[key: string]: boolean}>({})
  const [history, setHistory] = useState<CheckResult[]>([])
  const [activeTab, setActiveTab] = useState("single")
  const { toast } = useToast()

  const handleImageLoad = (imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: false }))
  }

  const handleImageError = (imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: false }))
    console.warn(`Failed to load image: ${imageUrl}`)
  }

  const getProxiedImageUrl = (originalUrl: string) => {
    if (!originalUrl) return ''
    return `/api/ogp-checker?imageUrl=${encodeURIComponent(originalUrl)}`
  }

  const calculateSEOScore = (metaData: OGPMetaData): number => {
    let score = 0
    let maxScore = 0

    // 基本メタデータ (40点)
    maxScore += 40
    if (metaData.title && metaData.title.length > 0) score += 10
    if (metaData.description && metaData.description.length > 0) score += 10
    if (metaData.title && metaData.title.length <= 60) score += 10
    if (metaData.description && metaData.description.length <= 160) score += 10

    // OGP設定 (30点)
    maxScore += 30
    if (metaData.image) score += 15
    if (metaData.url) score += 5
    if (metaData.siteName) score += 5
    if (metaData.type) score += 5

    // Twitter Card設定 (20点)
    maxScore += 20
    if (metaData.twitterCard) score += 10
    if (metaData.twitterImage) score += 5
    if (metaData.twitterSite) score += 5

    // その他のメタデータ (10点)
    maxScore += 10
    if (metaData.canonical) score += 3
    if (metaData.keywords) score += 2
    if (metaData.author) score += 2
    if (metaData.robots) score += 3

    return Math.round((score / maxScore) * 100)
  }

  const addUrl = () => {
    if (url.trim() && !urls.includes(url.trim())) {
      setUrls([...urls, url.trim()])
      setUrl("")
    }
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const batchCheck = async () => {
    if (urls.length === 0) return

    setBatchLoading(true)
    setResults([])
    const newResults: CheckResult[] = []

    for (const checkUrl of urls) {
      try {
        const response = await fetch(`/api/ogp-checker?url=${encodeURIComponent(checkUrl)}`)
        if (response.ok) {
          const data = await response.json()
          const score = calculateSEOScore(data)
          const result: CheckResult = {
            url: checkUrl,
            metaData: data,
            timestamp: Date.now(),
            score
          }
          newResults.push(result)
        }
      } catch (err) {
        console.error(`Error checking ${checkUrl}:`, err)
      }
    }

    setResults(newResults)
    setHistory(prev => [...newResults, ...prev].slice(0, 50)) // 履歴は50件まで
    setBatchLoading(false)
  }

  const exportResults = () => {
    const csvContent = [
      ['URL', 'タイトル', '説明', 'OGP画像', 'SEOスコア', 'チェック日時'],
      ...results.map(result => [
        result.url,
        result.metaData.title || '',
        result.metaData.description || '',
        result.metaData.image || '',
        result.score.toString(),
        new Date(result.timestamp).toLocaleString('ja-JP')
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ogp-check-results-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const extractMetaData = async (url: string) => {
    setLoading(true)
    setError("")
    setMetaData(null)

    try {
      // CORS対応のため、プロキシ経由でアクセス
      const response = await fetch(`/api/ogp-checker?url=${encodeURIComponent(url)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setMetaData(data)
      
      // SEOスコアを計算
      const score = calculateSEOScore(data)
      
      // 履歴に保存
      const result: CheckResult = {
        url: url,
        metaData: data,
        timestamp: Date.now(),
        score
      }
      setHistory(prev => [result, ...prev].slice(0, 50))
      
      // 画像のローディング状態を初期化
      const imageUrls = [data.image, data.twitterImage].filter(Boolean)
      const initialLoadingState: {[key: string]: boolean} = {}
      imageUrls.forEach(url => {
        if (url) {
          initialLoadingState[url] = true
        }
      })
      setImageLoading(initialLoadingState)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "メタデータの取得に失敗しました"
      setError(errorMessage)
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError("URLを入力してください")
      return
    }

    if (!validateUrl(url)) {
      setError("正しいURLを入力してください")
      return
    }

    extractMetaData(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "コピーしました",
      description: "クリップボードにコピーされました",
    })
  }

  const getStatusIcon = (value: string | undefined, required: boolean = false) => {
    if (!value) {
      return required ? <XCircle className="h-4 w-4 text-red-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getStatusBadge = (value: string | undefined, required: boolean = false) => {
    if (!value) {
      return required ? <Badge variant="destructive">必須項目なし</Badge> : <Badge variant="secondary">推奨項目なし</Badge>
    }
    return <Badge variant="default">設定済み</Badge>
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* ヘッダー */}
      <div className="text-center mb-6 md:mb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            🔍 OGPチェッカー
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
            URLを入力するだけで、メタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
            <Badge variant="outline" className="text-xs md:text-sm px-2 py-1">完全無料</Badge>
            <Badge variant="outline" className="text-xs md:text-sm px-2 py-1">登録不要</Badge>
            <Badge variant="outline" className="text-xs md:text-sm px-2 py-1">リアルタイム確認</Badge>
            <Badge variant="outline" className="text-xs md:text-sm px-2 py-1">SEO最適化</Badge>
          </div>
        </motion.div>
      </div>

      {/* 入力フォーム */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 md:mb-8 px-4"
      >
        <Card className="shadow-lg">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="flex items-center text-lg md:text-xl">
              <Search className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
              URL入力
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              チェックしたいウェブサイトのURLを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-10 md:h-11">
                <TabsTrigger value="single" className="text-xs md:text-sm px-2 md:px-4">単体チェック</TabsTrigger>
                <TabsTrigger value="batch" className="text-xs md:text-sm px-2 md:px-4">バッチチェック</TabsTrigger>
                <TabsTrigger value="history" className="text-xs md:text-sm px-2 md:px-4">履歴</TabsTrigger>
              </TabsList>

              {/* 単体チェック */}
              <TabsContent value="single" className="space-y-3 md:space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 h-10 md:h-11 text-sm md:text-base"
                      disabled={loading}
                    />
                    <Button type="submit" disabled={loading || !url.trim()} className="h-10 md:h-11 px-4 md:px-6">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          <span className="hidden sm:inline">チェック中...</span>
                          <span className="sm:hidden">中...</span>
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">チェック</span>
                          <span className="sm:hidden">実行</span>
                        </>
                      )}
                    </Button>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </TabsContent>

              {/* バッチチェック */}
              <TabsContent value="batch" className="space-y-3 md:space-y-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 h-10 md:h-11 text-sm md:text-base"
                      disabled={batchLoading}
                    />
                    <Button onClick={addUrl} disabled={!url.trim() || urls.includes(url.trim())} className="h-10 md:h-11 px-3 md:px-4">
                      <Plus className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">追加</span>
                      <span className="sm:hidden">+</span>
                    </Button>
                  </div>
                  
                  {urls.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">チェック対象URL ({urls.length}件)</div>
                      <div className="max-h-32 md:max-h-40 overflow-y-auto space-y-2">
                        {urls.map((urlItem, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-xs md:text-sm flex-1 truncate">{urlItem}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeUrl(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          onClick={batchCheck} 
                          disabled={batchLoading}
                          className="flex-1 h-10 md:h-11"
                        >
                          {batchLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              <span className="hidden sm:inline">バッチチェック中...</span>
                              <span className="sm:hidden">チェック中...</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare className="h-4 w-4 mr-2" />
                              <span className="hidden sm:inline">バッチチェック実行</span>
                              <span className="sm:hidden">実行</span>
                            </>
                          )}
                        </Button>
                        {results.length > 0 && (
                          <Button onClick={exportResults} variant="outline" className="h-10 md:h-11 px-3 md:px-4">
                            <Download className="h-4 w-4 mr-1 md:mr-2" />
                            <span className="hidden sm:inline">エクスポート</span>
                            <span className="sm:hidden">出力</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 履歴 */}
              <TabsContent value="history" className="space-y-3 md:space-y-4">
                {history.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">チェック履歴 ({history.length}件)</div>
                    <div className="max-h-48 md:max-h-60 overflow-y-auto space-y-2">
                      {history.map((item, index) => (
                        <div key={index} className="p-3 border rounded hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs md:text-sm font-medium truncate flex-1 mr-2">
                              {item.url}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "destructive"} className="text-xs">
                                {item.score}点
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setUrl(item.url)
                                  setActiveTab("single")
                                  extractMetaData(item.url)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString('ja-JP')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-6 md:py-8">
                    <History className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-gray-300" />
                    <p className="text-sm md:text-base">チェック履歴がありません</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* バッチチェック結果表示 */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 md:mb-8 px-4"
        >
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                バッチチェック結果 ({results.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 md:space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="p-3 md:p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs md:text-sm font-medium text-blue-600 truncate">
                          {result.url}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleString('ja-JP')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"} className="text-xs">
                          {result.score}点
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setUrl(result.url)
                            setActiveTab("single")
                            setMetaData(result.metaData)
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 text-xs md:text-sm">
                      <div>
                        <span className="font-medium">タイトル:</span>
                        <div className="text-gray-600 truncate">
                          {result.metaData.title || "未設定"}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">説明:</span>
                        <div className="text-gray-600 truncate">
                          {result.metaData.description || "未設定"}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">OGP画像:</span>
                        <div className="text-gray-600 truncate">
                          {result.metaData.image ? "設定済み" : "未設定"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 結果表示 */}
      {metaData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-4"
        >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4 md:mb-6 h-10 md:h-11">
                <TabsTrigger value="overview" className="text-xs md:text-sm px-1 md:px-3">概要</TabsTrigger>
                <TabsTrigger value="score" className="text-xs md:text-sm px-1 md:px-3">スコア</TabsTrigger>
                <TabsTrigger value="ogp" className="text-xs md:text-sm px-1 md:px-3">OGP</TabsTrigger>
                <TabsTrigger value="twitter" className="text-xs md:text-sm px-1 md:px-3">Twitter</TabsTrigger>
                <TabsTrigger value="meta" className="text-xs md:text-sm px-1 md:px-3">メタ</TabsTrigger>
              </TabsList>

            {/* 概要タブ */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* 基本情報 */}
                <Card>
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <Globe className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
                      基本情報
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium">タイトル</span>
                      {getStatusIcon(metaData.title, true)}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 break-words">
                      {metaData.title || "設定されていません"}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium">説明</span>
                      {getStatusIcon(metaData.description, true)}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 break-words">
                      {metaData.description || "設定されていません"}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium">URL</span>
                      {getStatusIcon(metaData.url)}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 break-words">
                      {metaData.url || "設定されていません"}
                    </div>
                  </CardContent>
                </Card>

                {/* OGP画像 */}
                <Card>
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <ImageIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                      OGP画像
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium">画像URL</span>
                      {getStatusIcon(metaData.image, true)}
                    </div>
                    {metaData.image ? (
                      <div className="space-y-2">
                        <div className="relative">
                          {imageLoading[metaData.image] !== false && (
                            <div className="w-full h-24 md:h-32 bg-gray-100 border rounded flex items-center justify-center">
                              <Loader2 className="h-4 w-4 md:h-6 md:w-6 animate-spin text-gray-400" />
                            </div>
                          )}
                          <img 
                            src={getProxiedImageUrl(metaData.image)} 
                            alt="OGP画像" 
                            className={`w-full h-24 md:h-32 object-cover rounded border ${imageLoading[metaData.image] === false ? 'block' : 'hidden'}`}
                            onError={() => handleImageError(metaData.image!)}
                            onLoad={() => handleImageLoad(metaData.image!)}
                          />
                        </div>
                        <div className="text-xs text-gray-500 break-words">
                          {metaData.image}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => copyToClipboard(metaData.image!)}
                            className="h-8 px-3 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            コピー
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => window.open(metaData.image!, '_blank')}
                            className="h-8 px-3 text-xs"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            開く
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs md:text-sm text-gray-500">設定されていません</div>
                    )}
                  </CardContent>
                </Card>

                {/* プレビュー */}
                <Card className="md:col-span-2 lg:col-span-1">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <Eye className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-500" />
                      プレビュー
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 md:space-y-4">
                      {/* Facebook/一般OGPプレビュー */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Facebook className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                          <span className="text-xs md:text-sm font-medium">Facebook/一般OGP</span>
                        </div>
                        <div className="border rounded p-2 md:p-3 bg-gray-50">
                          <div className="flex gap-2 md:gap-3">
                            {metaData.image ? (
                              <div className="relative">
                                <img 
                                  src={getProxiedImageUrl(metaData.image)} 
                                  alt="OGP画像" 
                                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                                  onError={() => handleImageError(metaData.image!)}
                                  onLoad={() => handleImageLoad(metaData.image!)}
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                画像なし
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs md:text-sm font-semibold text-blue-600 truncate">
                                {metaData.siteName || "サイト名"}
                              </div>
                              <div className="text-xs md:text-sm font-bold text-gray-900 line-clamp-2">
                                {metaData.title || "タイトルが設定されていません"}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {metaData.description || "説明が設定されていません"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Twitter Cardプレビュー */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Twitter className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                          <span className="text-xs md:text-sm font-medium">Twitter Card</span>
                        </div>
                        <div className="border rounded p-2 md:p-3 bg-gray-50">
                          <div className="flex gap-2 md:gap-3">
                            {metaData.twitterImage ? (
                              <div className="relative">
                                <img 
                                  src={getProxiedImageUrl(metaData.twitterImage)} 
                                  alt="Twitter画像" 
                                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                                  onError={() => handleImageError(metaData.twitterImage!)}
                                  onLoad={() => handleImageLoad(metaData.twitterImage!)}
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                画像なし
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs md:text-sm font-semibold text-blue-400 truncate">
                                {metaData.twitterSite || "Twitterサイト"}
                              </div>
                              <div className="text-xs md:text-sm font-bold text-gray-900 line-clamp-2">
                                {metaData.twitterTitle || metaData.title || "タイトルが設定されていません"}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {metaData.twitterDescription || metaData.description || "説明が設定されていません"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* SEOスコアタブ */}
            <TabsContent value="score">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* スコア表示 */}
                <Card>
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                      SEOスコア
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold mb-2">
                        {metaData ? calculateSEOScore(metaData) : 0}
                        <span className="text-base md:text-lg text-gray-500">/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-3 md:mb-4">
                        <div 
                          className={`h-2 md:h-3 rounded-full ${
                            calculateSEOScore(metaData!) >= 80 ? 'bg-green-500' : 
                            calculateSEOScore(metaData!) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${calculateSEOScore(metaData!)}%` }}
                        ></div>
                      </div>
                      <Badge variant={
                        calculateSEOScore(metaData!) >= 80 ? "default" : 
                        calculateSEOScore(metaData!) >= 60 ? "secondary" : "destructive"
                      } className="text-xs md:text-sm">
                        {calculateSEOScore(metaData!) >= 80 ? "優秀" : 
                         calculateSEOScore(metaData!) >= 60 ? "良好" : "要改善"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 改善提案 */}
                <Card>
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <Lightbulb className="h-4 w-4 md:h-5 md:w-5 mr-2 text-yellow-500" />
                      改善提案
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 md:space-y-3">
                      {!metaData?.title && (
                        <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                          <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-red-800">タイトルが設定されていません</div>
                            <div className="text-red-600">ページタイトルを設定してください</div>
                          </div>
                        </div>
                      )}
                      {!metaData?.description && (
                        <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                          <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-red-800">説明が設定されていません</div>
                            <div className="text-red-600">メタディスクリプションを設定してください</div>
                          </div>
                        </div>
                      )}
                      {!metaData?.image && (
                        <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                          <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-red-800">OGP画像が設定されていません</div>
                            <div className="text-red-600">1200×630pxのOGP画像を設定してください</div>
                          </div>
                        </div>
                      )}
                      {metaData?.title && metaData.title.length > 60 && (
                        <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-yellow-800">タイトルが長すぎます</div>
                            <div className="text-yellow-600">60文字以内に短縮することをお勧めします</div>
                          </div>
                        </div>
                      )}
                      {metaData?.description && metaData.description.length > 160 && (
                        <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-yellow-800">説明が長すぎます</div>
                            <div className="text-yellow-600">160文字以内に短縮することをお勧めします</div>
                          </div>
                        </div>
                      )}
                      {metaData?.title && metaData?.description && metaData?.image && 
                       metaData.title.length <= 60 && metaData.description.length <= 160 && (
                        <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mt-0.5" />
                          <div className="text-xs md:text-sm">
                            <div className="font-medium text-green-800">基本設定は完璧です！</div>
                            <div className="text-green-600">Twitter Cardやその他のメタデータも確認してみましょう</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* OGPタブ */}
            <TabsContent value="ogp">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                    Open Graph Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { key: "og:title", value: metaData.title, required: true },
                      { key: "og:description", value: metaData.description, required: true },
                      { key: "og:image", value: metaData.image, required: true },
                      { key: "og:url", value: metaData.url, required: false },
                      { key: "og:site_name", value: metaData.siteName, required: false },
                      { key: "og:type", value: metaData.type, required: false },
                      { key: "og:locale", value: metaData.locale, required: false },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {item.key}
                            </code>
                            {getStatusBadge(item.value, item.required)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 break-words">
                            {item.value || "設定されていません"}
                          </div>
                        </div>
                        {item.value && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(item.value!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Twitterタブ */}
            <TabsContent value="twitter">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Twitter className="h-5 w-5 mr-2 text-blue-400" />
                    Twitter Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { key: "twitter:card", value: metaData.twitterCard, required: true },
                      { key: "twitter:title", value: metaData.twitterTitle, required: false },
                      { key: "twitter:description", value: metaData.twitterDescription, required: false },
                      { key: "twitter:image", value: metaData.twitterImage, required: false },
                      { key: "twitter:site", value: metaData.twitterSite, required: false },
                      { key: "twitter:creator", value: metaData.twitterCreator, required: false },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {item.key}
                            </code>
                            {getStatusBadge(item.value, item.required)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 break-words">
                            {item.value || "設定されていません"}
                          </div>
                        </div>
                        {item.value && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(item.value!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* メタデータタブ */}
            <TabsContent value="meta">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Monitor className="h-5 w-5 mr-2 text-gray-600" />
                    メタデータ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { key: "title", value: metaData.title, required: true },
                      { key: "description", value: metaData.description, required: true },
                      { key: "keywords", value: metaData.keywords, required: false },
                      { key: "author", value: metaData.author, required: false },
                      { key: "canonical", value: metaData.canonical, required: false },
                      { key: "robots", value: metaData.robots, required: false },
                      { key: "viewport", value: metaData.viewport, required: false },
                      { key: "charset", value: metaData.charset, required: false },
                      { key: "favicon", value: metaData.favicon, required: false },
                      { key: "apple-touch-icon", value: metaData.appleTouchIcon, required: false },
                      { key: "manifest", value: metaData.manifest, required: false },
                      { key: "theme-color", value: metaData.themeColor, required: false },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {item.key}
                            </code>
                            {getStatusBadge(item.value, item.required)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 break-words">
                            {item.value || "設定されていません"}
                          </div>
                        </div>
                        {item.value && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(item.value!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}

      {/* 使い方ガイド */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 md:mt-12 px-4"
      >
        <Card>
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-lg md:text-xl">📚 使い方ガイド</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">🎯 このツールでできること</h3>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li>• OGP画像・タイトル・説明の確認</li>
                  <li>• Twitter Card設定の検証</li>
                  <li>• Facebook Card設定の検証</li>
                  <li>• SEOスコア分析（0-100点）</li>
                  <li>• 改善提案の自動生成</li>
                  <li>• バッチチェック（複数URL同時）</li>
                  <li>• チェック履歴の保存</li>
                  <li>• CSV形式でのエクスポート</li>
                  <li>• プレビュー表示での視覚的確認</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">💡 活用シーン</h3>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li>• ブログ記事のSNS最適化</li>
                  <li>• ウェブサイトのSEO改善</li>
                  <li>• メタデータの設定確認</li>
                  <li>• 競合サイトの分析</li>
                  <li>• クライアントサイトの検証</li>
                  <li>• 開発・デザイン作業の効率化</li>
                  <li>• 複数サイトの一括チェック</li>
                  <li>• SEOレポートの作成</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 md:p-4 rounded">
              <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">🔧 SEO最適化のポイント</h3>
              <div className="text-xs md:text-sm text-blue-700 space-y-1">
                <p>• OGP画像は1200×630px推奨（最小600×315px）</p>
                <p>• タイトルは30文字以内、説明は120文字以内が理想</p>
                <p>• Twitter Cardは「summary_large_image」がおすすめ</p>
                <p>• 画像のalt属性も適切に設定しましょう</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO記事 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔍 OGPチェッカー完全ガイド：メタデータ最適化・SNSマーケティング・SEO技術の科学</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    OGPとメタデータの基礎
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Open Graph Protocol</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>og:title</strong>: ページタイトル</li>
                        <li>• <strong>og:description</strong>: ページ説明</li>
                        <li>• <strong>og:image</strong>: 表示画像</li>
                        <li>• <strong>og:url</strong>: ページURL</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Twitter Card</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>twitter:card</strong>: カードタイプ</li>
                        <li>• <strong>twitter:title</strong>: タイトル</li>
                        <li>• <strong>twitter:description</strong>: 説明</li>
                        <li>• <strong>twitter:image</strong>: 画像</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    SNSマーケティングとエンゲージメント
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">クリック率の向上</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        魅力的なタイトル<br/>
                        適切な説明文<br/>
                        視覚的インパクト<br/>
                        ブランド認知度向上
                      </div>
                      <p className="text-sm text-gray-600">
                        適切なメタデータ設定で
                        クリック率を大幅向上。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">エンゲージメント向上</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        シェア数の増加<br/>
                        コメント誘発<br/>
                        ブランド露出<br/>
                        ユーザー行動分析
                      </div>
                      <p className="text-sm text-gray-600">
                        ソーシャルメディアでの
                        エンゲージメント向上。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔧</span>
                    技術的実装とベストプラクティス
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">メタタグの実装</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-purple-600">基本実装</h5>
                          <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                            &lt;meta property="og:title"<br/>
                            &nbsp;&nbsp;content="タイトル" /&gt;<br/>
                            &lt;meta property="og:image"<br/>
                            &nbsp;&nbsp;content="画像URL" /&gt;
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-blue-600">画像最適化</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 1200×630px推奨</li>
                            <li>• ファイルサイズ1MB以下</li>
                            <li>• JPEG/PNG形式</li>
                            <li>• alt属性の設定</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">品質チェック項目</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>タイトル長</strong>: 60文字以内が最適</li>
                        <li>• <strong>説明文長</strong>: 160文字以内が最適</li>
                        <li>• <strong>画像サイズ</strong>: 1200×630px推奨</li>
                        <li>• <strong>URL設定</strong>: 正しいcanonical URL</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    データ分析とパフォーマンス測定
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">効果測定指標</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        クリック率(CTR)<br/>
                        エンゲージメント率<br/>
                        シェア数<br/>
                        トラフィック増加
                      </div>
                      <p className="text-sm text-gray-600">
                        メタデータの効果を
                        定量的に測定。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">バッチチェック</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        複数URL一括<br/>
                        サイト全体チェック<br/>
                        効率的な管理<br/>
                        レポート生成
                      </div>
                      <p className="text-sm text-gray-600">
                        大量のURLを
                        効率的にチェック。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">競合分析</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        ベンチマーキング<br/>
                        業界ベストプラクティス<br/>
                        改善点特定<br/>
                        戦略立案
                      </div>
                      <p className="text-sm text-gray-600">
                        競合サイトとの
                        比較分析。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    未来のメタデータ技術
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">技術の進化</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-red-600">構造化データ</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• JSON-LD形式</li>
                            <li>• Schema.org語彙</li>
                            <li>• リッチスニペット</li>
                            <li>• 知識パネル</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-green-600">AI技術活用</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 自動生成</li>
                            <li>• 最適化提案</li>
                            <li>• コンテンツ分析</li>
                            <li>• パーソナライズ</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">実践的活用</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>定期チェック</strong>: 月次でのメタデータ品質確認</li>
                        <li>• <strong>A/Bテスト</strong>: 異なるタイトル・説明文のテスト</li>
                        <li>• <strong>自動化</strong>: CI/CDパイプラインでの自動チェック</li>
                        <li>• <strong>監視</strong>: リアルタイムでの品質監視</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    OGPチェッカーは、メタデータ最適化とSNSマーケティングの成功を支援する
                    包括的なツールです。効果的な活用で、デジタルマーケティングの成果を最大化しましょう。
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>#OGPチェッカー</span>
                    <span>#メタデータ</span>
                    <span>#SNSマーケティング</span>
                    <span>#SEO技術</span>
                    <span>#デジタルマーケティング</span>
                    <span>#YokaUnit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}

                <h3 className="text-2xl font-bold text-blue-700 mb-4">🌐 OGP（Open Graph Protocol）の技術的基盤</h3>
                <p className="mb-4">
                  OGP（Open Graph Protocol）は、Facebookが2010年に開発したメタデータ標準です。
                  このプロトコルは、ウェブページの内容を構造化されたメタデータとして表現し、
                  ソーシャルメディアプラットフォームがより豊かなプレビューを提供できるようにします。
                </p>
                
                <p className="mb-4">
                  OGPは、HTMLのheadセクションに配置されるメタタグとして実装されます。
                  主要なプロパティには、og:title、og:description、og:image、og:urlなどがあり、
                  これらの情報により、ソーシャルメディアでの共有時に
                  魅力的なプレビューカードが生成されます。
                </p>

                <h3 className="text-2xl font-bold text-green-700 mb-4">📱 ソーシャルメディアプラットフォーム別最適化</h3>
                
                <h4 className="text-xl font-bold text-indigo-600 mb-3">Facebook・Instagram最適化</h4>
                <p className="mb-4">
                  FacebookとInstagramでは、OGPタグが主要なメタデータソースとして機能します。
                  推奨される画像サイズは1200×630ピクセルで、
                  アスペクト比は1.91:1が最適です。
                  タイトルは60文字以内、説明文は160文字以内に収めることが重要です。
                </p>
                
                <p className="mb-4">
                  また、Facebookでは、og:typeプロパティを適切に設定することで、
                  より詳細な情報を提供できます。
                  記事の場合は「article」、ウェブサイトの場合は「website」を指定し、
                  必要に応じてog:article:authorやog:article:published_timeなどの
                  追加プロパティも設定できます。
                </p>

                <h4 className="text-xl font-bold text-blue-600 mb-3">Twitter Card最適化</h4>
                <p className="mb-4">
                  Twitterでは、独自のTwitter Cardシステムを使用します。
                  主要なカードタイプには、summary、summary_large_image、
                  app、playerなどがあります。
                  最も一般的なsummary_large_imageカードでは、
                  画像サイズは1200×675ピクセルが推奨されます。
                </p>
                
                <p className="mb-4">
                  Twitter Cardの設定には、twitter:card、twitter:title、
                  twitter:description、twitter:imageなどのメタタグを使用します。
                  これらのタグは、OGPタグと併用することで、
                  両プラットフォームでの最適な表示を実現できます。
                </p>

                <h4 className="text-xl font-bold text-purple-600 mb-3">LinkedIn・その他プラットフォーム</h4>
                <p className="mb-4">
                  LinkedInは、OGPタグを主要なメタデータソースとして使用します。
                  画像サイズは1200×627ピクセルが推奨され、
                  タイトルは200文字以内、説明文は256文字以内に収めることが重要です。
                </p>
                
                <p className="mb-4">
                  その他のプラットフォーム（Discord、Slack、WhatsAppなど）も
                  OGPタグをサポートしており、
                  適切に設定されたOGPタグにより、
                  これらのプラットフォームでも魅力的なプレビューが表示されます。
                </p>

                <h3 className="text-2xl font-bold text-orange-700 mb-4">🎯 SEO最適化とメタデータ戦略</h3>
                
                <h4 className="text-xl font-bold text-red-600 mb-3">検索エンジン最適化</h4>
                <p className="mb-4">
                  メタデータは、SEOにおいて重要な役割を果たします。
                  適切に設定されたタイトルと説明文は、
                  検索結果でのクリック率（CTR）向上に寄与します。
                  また、構造化されたメタデータは、
                  検索エンジンがコンテンツを理解するのに役立ちます。
                </p>
                
                <p className="mb-4">
                  OGPチェッカーを使用することで、
                  メタデータの設定状況を客観的に評価し、
                  SEOスコアを数値化できます。
                  このスコアは、タイトルの長さ、説明文の適切性、
                  画像の存在とサイズ、その他の技術的要件を
                  総合的に評価して算出されます。
                </p>

                <h4 className="text-xl font-bold text-yellow-600 mb-3">コンテンツマーケティング戦略</h4>
                <p className="mb-4">
                  効果的なコンテンツマーケティングには、
                  魅力的なメタデータの設定が不可欠です。
                  OGPチェッカーを使用して、
                  競合サイトのメタデータを分析し、
                  より効果的な戦略を立案することができます。
                </p>
                
                <p className="mb-4">
                  また、A/Bテストの一環として、
                  異なるタイトルや説明文をテストし、
                  クリック率やエンゲージメント率の向上を
                  測定することも可能です。
                </p>

                <h3 className="text-2xl font-bold text-teal-700 mb-4">🔧 技術的実装とベストプラクティス</h3>
                
                <h4 className="text-xl font-bold text-pink-600 mb-3">メタタグの実装方法</h4>
                <p className="mb-4">
                  メタタグの実装は、HTMLのheadセクションで行います。
                  基本的なOGPタグの実装例は以下の通りです：
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <pre className="text-sm text-gray-800">
{`<meta property="og:title" content="ページタイトル" />
<meta property="og:description" content="ページの説明文" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />`}
                  </pre>
                </div>

                <h4 className="text-xl font-bold text-blue-600 mb-3">画像最適化の技術</h4>
                <p className="mb-4">
                  OGP画像の最適化には、複数の技術的要件があります。
                  画像のファイルサイズは1MB以下に抑え、
                  JPEGまたはPNG形式で保存することが推奨されます。
                  また、画像のアスペクト比は1.91:1（Facebook）または
                  16:9（Twitter）に合わせることが重要です。
                </p>
                
                <p className="mb-4">
                  さらに、画像のalt属性も適切に設定し、
                  アクセシビリティを確保することも重要です。
                  これにより、スクリーンリーダーを使用するユーザーも
                  画像の内容を理解できるようになります。
                </p>

                <h3 className="text-2xl font-bold text-indigo-700 mb-4">📊 データ分析とパフォーマンス測定</h3>
                
                <h4 className="text-xl font-bold text-green-600 mb-3">メタデータの効果測定</h4>
                <p className="mb-4">
                  メタデータの効果を測定するには、
                  複数の指標を総合的に分析する必要があります。
                  クリック率（CTR）、エンゲージメント率、
                  ソーシャルシェア数、トラフィック増加率などが
                  重要な指標となります。
                </p>
                
                <p className="mb-4">
                  OGPチェッカーのバッチ機能を使用することで、
                  複数のページのメタデータを一括でチェックし、
                  サイト全体のメタデータ品質を
                  効率的に管理することができます。
                </p>

                <h4 className="text-xl font-bold text-purple-600 mb-3">競合分析とベンチマーキング</h4>
                <p className="mb-4">
                  競合サイトのメタデータを分析することで、
                  業界のベストプラクティスを理解し、
                  自社サイトの改善点を特定できます。
                  OGPチェッカーを使用して、
                  競合サイトのメタデータ設定を調査し、
                  より効果的な戦略を立案することができます。
                </p>

                <h3 className="text-2xl font-bold text-red-700 mb-4">🚀 未来のメタデータ技術</h3>
                
                <h4 className="text-xl font-bold text-orange-600 mb-3">構造化データの進化</h4>
                <p className="mb-4">
                  メタデータ技術は、構造化データの進化とともに
                  発展し続けています。
                  JSON-LD形式の構造化データにより、
                  より詳細で正確な情報を提供できるようになりました。
                </p>
                
                <p className="mb-4">
                  また、Schema.orgの語彙を使用することで、
                  検索エンジンがコンテンツをより深く理解し、
                  リッチスニペットや知識パネルの表示が
                  可能になります。
                </p>

                <h4 className="text-xl font-bold text-teal-600 mb-3">AI技術の活用</h4>
                <p className="mb-4">
                  人工知能技術の発展により、
                  メタデータの自動生成や最適化が
                  可能になりつつあります。
                  AI技術を使用して、
                  コンテンツの内容を分析し、
                  最適なタイトルや説明文を
                  自動生成するシステムが開発されています。
                </p>

                <h3 className="text-2xl font-bold text-pink-700 mb-4">💡 実践的な活用方法</h3>
                
                <h4 className="text-xl font-bold text-indigo-600 mb-3">ブログ・メディアサイトでの活用</h4>
                <p className="mb-4">
                  ブログやメディアサイトでは、
                  記事ごとに適切なメタデータを設定することが重要です。
                  OGPチェッカーを使用して、
                  記事公開前にメタデータの設定状況を確認し、
                  必要に応じて改善を行うことができます。
                </p>

                <h4 className="text-xl font-bold text-green-600 mb-3">ECサイト・企業サイトでの活用</h4>
                <p className="mb-4">
                  ECサイトや企業サイトでは、
                  商品ページやサービスページの
                  メタデータ最適化が重要です。
                  適切なメタデータにより、
                  ソーシャルメディアでの商品紹介や
                  サービス宣伝の効果が向上します。
                </p>

                <h3 className="text-2xl font-bold text-blue-700 mb-4">🎯 まとめ：メタデータが変えるデジタル体験</h3>
                
                <p className="mb-4">
                  OGPチェッカーは、現代のデジタルマーケティングにおいて
                  不可欠なツールです。
                  適切に設定されたメタデータにより、
                  ソーシャルメディアでのエンゲージメント向上、
                  SEO効果の改善、ブランド認知度の向上など、
                  様々な効果が期待できます。
                </p>
                
                <p className="mb-4">
                  技術の進歩により、メタデータの重要性は
                  今後も増大し続けます。
                  OGPチェッカーを活用して、
                  効果的なメタデータ戦略を構築し、
                  デジタルマーケティングの成功を
                  実現しましょう。
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
