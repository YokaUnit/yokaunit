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
        initialLoadingState[url] = true
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
                            src={metaData.image} 
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
                                  src={metaData.image} 
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
                                  src={metaData.twitterImage} 
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
      </motion.div>
    </div>
  )
}
