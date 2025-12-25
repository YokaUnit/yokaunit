"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
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
  FileText,
  Share2,
  RefreshCw,
  Settings,
  Zap,
  Target,
  Award,
  Activity,
  Layers,
  PieChart,
  BarChart
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tag?: string
  width?: string
  height?: string
  alt?: string
}

interface CheckResult {
  url: string
  metaData: OGPMetaData
  seoScore: number
  timestamp: number
  error?: string
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
  const [resultTab, setResultTab] = useState("overview")
  const { toast } = useToast()
  const shouldRenderPreviewImages = useMemo(() => resultTab === "preview", [resultTab])
  const shouldRenderSocialImages = useMemo(() => resultTab === "social", [resultTab])


  // URLパラメータから初期URLを読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlParam = params.get('url')
      if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam)
        setUrl(decodedUrl)
        // 自動チェック（少し遅延させてUIが準備できてから）
        setTimeout(() => {
          checkOGP(decodedUrl)
        }, 500)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('ogp-checker-history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }
  }, [])

  // 履歴をローカルストレージに保存
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('ogp-checker-history', JSON.stringify(history))
    }
  }, [history])

  const handleImageLoad = useCallback((imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: false }))
  }, [])

  const handleImageError = useCallback((imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: false }))
    console.warn(`Failed to load image: ${imageUrl}`)
  }, [])

  const getProxiedImageUrl = useCallback((originalUrl: string) => {
    if (!originalUrl) return ""
    try {
      const url = new URL(originalUrl)
      return `/api/ogp-checker?imageUrl=${encodeURIComponent(originalUrl)}`
    } catch {
      return originalUrl
    }
  }, [])

  const calculateSEOScore = useCallback((data: OGPMetaData): number => {
    let score = 0
    
    // 基本メタデータ（60点）
    if (data.title) score += 15
    if (data.description) score += 15
    if (data.image) score += 15
    if (data.url) score += 15
    
    // 品質ボーナス（40点）
    if (data.title && data.title.length >= 30 && data.title.length <= 60) score += 10
    if (data.description && data.description.length >= 100 && data.description.length <= 160) score += 10
    if (data.image && data.width && data.height) {
      const width = parseInt(data.width)
      const height = parseInt(data.height)
      if (width >= 1536 && height >= 1024) score += 10
    }
    if (data.twitterCard) score += 10
    
    return Math.min(score, 100)
  }, [])

  const checkOGP = useCallback(async (targetUrl: string) => {
    setLoading(true)
    setError("")
    setMetaData(null)

    try {
      const response = await fetch('/api/ogp-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      const seoScore = calculateSEOScore(data)
      const result: CheckResult = {
        url: targetUrl,
        metaData: data,
        seoScore,
        timestamp: Date.now()
      }

      setMetaData(data)
      setResults(prev => [result, ...prev.slice(0, 9)])
      setHistory(prev => [result, ...prev.slice(0, 19)])

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [calculateSEOScore, toast])

  const checkBatchOGP = useCallback(async () => {
    if (urls.length === 0) return
    
    setBatchLoading(true)
    setResults([])

    try {
      const promises = urls.map(async (targetUrl) => {
        try {
          const response = await fetch('/api/ogp-checker', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: targetUrl }),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          
          if (data.error) {
            throw new Error(data.error)
          }

          const seoScore = calculateSEOScore(data)
          return {
            url: targetUrl,
            metaData: data,
            seoScore,
            timestamp: Date.now()
          }
        } catch (err) {
          return {
            url: targetUrl,
            metaData: {} as OGPMetaData,
            seoScore: 0,
            timestamp: Date.now(),
            error: err instanceof Error ? err.message : 'Unknown error occurred'
          }
        }
      })

      const results = await Promise.all(promises)
      setResults(results)
      setHistory(prev => [...results, ...prev.slice(0, 19 - results.length)])

      toast({
        title: "バッチチェック完了",
        description: `${results.length}件のURLをチェックしました`,
      })

    } catch (err) {
      toast({
        title: "エラー",
        description: "バッチチェック中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setBatchLoading(false)
    }
  }, [urls, calculateSEOScore, toast])

  const addUrl = useCallback(() => {
    if (url.trim() && !urls.includes(url.trim())) {
      setUrls(prev => [...prev, url.trim()])
      setUrl("")
    }
  }, [url, urls])

  const removeUrl = useCallback((index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index))
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "コピーしました",
        description: "クリップボードにコピーしました",
      })
    } catch (err) {
      toast({
        title: "コピー失敗",
        description: "クリップボードにコピーできませんでした",
        variant: "destructive",
      })
    }
  }, [toast])

  const exportResults = useCallback(() => {
    const csvContent = [
      ['URL', 'タイトル', '説明', '画像', 'SEOスコア', 'エラー'].join(','),
      ...results.map(result => [
        result.url,
        result.metaData.title || '',
        result.metaData.description || '',
        result.metaData.image || '',
        result.seoScore,
        result.error || ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ogp-check-results-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }, [results])

  const shareResult = useCallback(async (data: OGPMetaData) => {
    const shareText = `OGPチェック結果: ${data.title || 'タイトルなし'} - SEOスコア: ${calculateSEOScore(data)}/100`
    const shareUrl = data.url || window.location.href
    const toolUrl = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: "OGPチェック結果",
          text: shareText,
          url: toolUrl,
        })
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${toolUrl}`)
        toast({
          title: "結果をコピーしました",
          description: "SNSでシェアして友達と比べてみよう！",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }, [toast, calculateSEOScore])

  const shareToTwitter = useCallback((data: OGPMetaData) => {
    const text = encodeURIComponent(`OGPチェック結果: ${data.title || 'タイトルなし'} - SEOスコア: ${calculateSEOScore(data)}/100`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }, [calculateSEOScore])

  const shareToFacebook = useCallback((data: OGPMetaData) => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }, [])

  const shareToLine = useCallback((data: OGPMetaData) => {
    const text = encodeURIComponent(`OGPチェック結果: ${data.title || 'タイトルなし'} - SEOスコア: ${calculateSEOScore(data)}/100`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank')
  }, [calculateSEOScore])

  const exportSingleResult = useCallback((data: OGPMetaData) => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ogp-result-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem('ogp-checker-history')
    toast({
      title: "履歴をクリアしました",
      description: "チェック履歴が削除されました",
    })
  }, [toast])

  const recheckUrl = useCallback((url: string) => {
    setUrl(url)
    setActiveTab("single")
    checkOGP(url)
  }, [checkOGP])

  const removeFromHistory = useCallback((index: number) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }, [])

  const getScoreColor = useCallback((score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }, [])

  const getScoreIcon = useCallback((score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />
    if (score >= 60) return <AlertTriangle className="h-4 w-4" />
    return <XCircle className="h-4 w-4" />
  }, [])

  const getScoreText = useCallback((score: number) => {
    if (score >= 80) return "優秀"
    if (score >= 60) return "良好"
    return "要改善"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* ヘッダー */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-2 break-words">
            <span className="block sm:inline">OGPチェッカー（無料）</span>
            <span className="block sm:inline sm:ml-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">📝ブロガー必見</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4 px-2 break-words">
            メタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック！
            <br className="hidden sm:block" />
            <span className="block sm:inline text-xs sm:text-sm md:text-base text-purple-600 font-semibold">WordPressでも使える・技術知識不要・初心者でも簡単</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">SEOスコア分析・改善提案・バッチチェック対応</span>
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-blue-900 text-center font-semibold mb-2 break-words px-1">
              <span className="text-base sm:text-lg">📝</span> <strong>ブロガー必見！</strong> WordPressしか使えない方も、詳しいことがわからない方も大丈夫！
            </p>
            <p className="text-xs sm:text-sm text-blue-800 text-center break-words px-1">
              <strong>URLからチェックしてあなたのWebサイトのOGP設定を確認しましょう！</strong><br />
              無料でメタデータの最適化状況を詳細分析します
            </p>
          </div>
        </motion.div>

        {/* メインコンテンツ */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 h-auto">
              <TabsTrigger value="single" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 min-h-[44px]">
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">単一チェック</span>
                <span className="xs:hidden">単一</span>
              </TabsTrigger>
              <TabsTrigger value="batch" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 min-h-[44px]">
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">バッチチェック</span>
                <span className="xs:hidden">バッチ</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 min-h-[44px]">
                <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>履歴</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 min-h-[44px]">
                <PieChart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>分析</span>
              </TabsTrigger>
            </TabsList>

            {/* 単一チェックタブ */}
            <TabsContent value="single" className="space-y-4 sm:space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="break-words">URLからチェック</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm mt-2 break-words">
                    ウェブサイトのOGPメタデータをチェックしてSEOスコアを分析します
                    <br className="hidden sm:block" />
                    <span className="block sm:inline text-xs sm:text-sm text-purple-600 font-semibold">WordPress・技術知識不要・初心者でも簡単</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && checkOGP(url)}
                      className="flex-1 text-sm sm:text-base min-h-[44px]"
                    />
                    <Button 
                      onClick={() => checkOGP(url)}
                      disabled={loading || !url.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 min-h-[44px] w-full sm:w-auto px-6"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      ) : (
                        <>
                          <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                          <span className="text-sm sm:text-base">チェック</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">💡</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm break-words">ブックマークレットで簡単チェック</h4>
                        <p className="text-xs text-blue-800 mb-2 sm:mb-3 break-words">
                          現在表示中のページをワンクリックでチェックできます。下のボタンをブックマークバーにドラッグ＆ドロップしてください。
                        </p>
                        <a
                          href={`javascript:(function(){window.open('https://yokaunit.com/tools/ogp-checker?url='+encodeURIComponent(window.location.href),'_blank');})();`}
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors min-h-[44px] flex items-center justify-center break-words"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "ブックマークレット",
                              description: "このリンクをブックマークバーにドラッグ＆ドロップしてください",
                            })
                          }}
                        >
                          🔖 <span className="hidden sm:inline">OGPチェッカー（ドラッグしてブックマーク）</span>
                          <span className="sm:hidden">ブックマークに追加</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* エラー表示 */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="mb-6">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 結果表示 - 詳細なタブ機能 */}
              <AnimatePresence>
                {metaData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                          <span className="break-words">チェック結果</span>
                        </CardTitle>
                        <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1 rounded-full text-xs sm:text-sm ${getScoreColor(calculateSEOScore(metaData))} w-full sm:w-auto justify-center sm:justify-start`}>
                          {getScoreIcon(calculateSEOScore(metaData))}
                          <span className="font-bold break-words">SEO: {calculateSEOScore(metaData)}/100</span>
                          <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                            {getScoreText(calculateSEOScore(metaData))}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
                      <Tabs value={resultTab} onValueChange={setResultTab}>
                        <TabsList className="grid w-full grid-cols-5 gap-1 h-auto">
                          <TabsTrigger value="overview" className="flex items-center justify-center gap-1 text-[10px] sm:text-xs py-2 sm:py-2.5 min-h-[44px]">
                            <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">概要</span>
                          </TabsTrigger>
                          <TabsTrigger value="preview" className="flex items-center justify-center gap-1 text-[10px] sm:text-xs py-2 sm:py-2.5 min-h-[44px]">
                            <Monitor className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">プレビュー</span>
                          </TabsTrigger>
                          <TabsTrigger value="metadata" className="flex items-center justify-center gap-1 text-[10px] sm:text-xs py-2 sm:py-2.5 min-h-[44px]">
                            <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">メタ</span>
                          </TabsTrigger>
                          <TabsTrigger value="social" className="flex items-center justify-center gap-1 text-[10px] sm:text-xs py-2 sm:py-2.5 min-h-[44px]">
                            <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">SNS</span>
                          </TabsTrigger>
                          <TabsTrigger value="analysis" className="flex items-center justify-center gap-1 text-[10px] sm:text-xs py-2 sm:py-2.5 min-h-[44px]">
                            <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">分析</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                          {/* SEOスコア表示 */}
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 mb-4">
                              <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 break-words">
                                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                                SEOスコア分析
                              </h4>
                              <div className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${getScoreColor(calculateSEOScore(metaData))} w-full sm:w-auto justify-center sm:justify-start`}>
                                {getScoreIcon(calculateSEOScore(metaData))}
                                <span className="font-bold text-sm sm:text-base md:text-lg break-words">{calculateSEOScore(metaData)}/100</span>
                                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                                  {getScoreText(calculateSEOScore(metaData))}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* スコア詳細 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                  <span className="break-words">基本メタデータ (60点)</span>
                                </h5>
                                <div className="space-y-2 sm:space-y-3">
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.title ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">タイトル (og:title)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.title ? 'text-green-600' : 'text-red-600'}`}>
                                      {metaData.title ? '15点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.description ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">説明文 (og:description)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.description ? 'text-green-600' : 'text-red-600'}`}>
                                      {metaData.description ? '15点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.image ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">画像 (og:image)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.image ? 'text-green-600' : 'text-red-600'}`}>
                                      {metaData.image ? '15点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.url ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">URL (og:url)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.url ? 'text-green-600' : 'text-red-600'}`}>
                                      {metaData.url ? '15点' : '0点'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-600 flex-shrink-0" />
                                  <span className="break-words">品質ボーナス (40点)</span>
                                </h5>
                                <div className="space-y-2 sm:space-y-3">
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.title && metaData.title.length >= 30 && metaData.title.length <= 60 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">タイトル長さ (30-60文字)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.title && metaData.title.length >= 30 && metaData.title.length <= 60 ? 'text-green-600' : 'text-yellow-600'}`}>
                                      {metaData.title && metaData.title.length >= 30 && metaData.title.length <= 60 ? '10点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.description && metaData.description.length >= 100 && metaData.description.length <= 160 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">説明文長さ (100-160文字)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.description && metaData.description.length >= 100 && metaData.description.length <= 160 ? 'text-green-600' : 'text-yellow-600'}`}>
                                      {metaData.description && metaData.description.length >= 100 && metaData.description.length <= 160 ? '10点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.image && metaData.width && metaData.height && parseInt(metaData.width) >= 1536 && parseInt(metaData.height) >= 1024 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">画像サイズ (1536×1024px以上)</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.image && metaData.width && metaData.height && parseInt(metaData.width) >= 1536 && parseInt(metaData.height) >= 1024 ? 'text-green-600' : 'text-yellow-600'}`}>
                                      {metaData.image && metaData.width && metaData.height && parseInt(metaData.width) >= 1536 && parseInt(metaData.height) >= 1024 ? '10点' : '0点'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white rounded-lg gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${metaData.twitterCard ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                      <span className="text-xs sm:text-sm font-medium break-words">Twitter Card設定</span>
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${metaData.twitterCard ? 'text-green-600' : 'text-yellow-600'}`}>
                                      {metaData.twitterCard ? '10点' : '0点'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 基本情報 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                                基本情報
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">URL</span>
                                    <span className="font-medium text-gray-900 break-all text-xs sm:text-sm">{metaData.url || "設定されていません"}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">サイト名</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.siteName || "設定されていません"}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">タイプ</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.type || "設定されていません"}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">言語</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.locale || "設定されていません"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                                コンテンツ情報
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">タイトル</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.title || "設定されていません"}</span>
                                    {metaData.title && (
                                      <span className="text-[10px] sm:text-xs text-gray-500 block mt-0.5 sm:mt-1">
                                        {metaData.title.length}文字
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">説明文</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.description || "設定されていません"}</span>
                                    {metaData.description && (
                                      <span className="text-[10px] sm:text-xs text-gray-500 block mt-0.5 sm:mt-1">
                                        {metaData.description.length}文字
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">画像</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.image ? "設定済み" : "設定されていません"}</span>
                                    {metaData.image && metaData.width && metaData.height && (
                                      <span className="text-[10px] sm:text-xs text-gray-500 block mt-0.5 sm:mt-1">
                                        {metaData.width}×{metaData.height}px
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs sm:text-sm text-gray-600 block mb-0.5">Twitter Card</span>
                                    <span className="font-medium text-gray-900 text-xs sm:text-sm break-words">{metaData.twitterCard || "設定されていません"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="preview" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />
                                モバイルプレビュー
                              </h4>
                          <div className="border rounded-lg p-3 bg-gray-50 max-w-xs mx-auto">
                                <div className="bg-white rounded p-2">
                                  {(() => {
                                    const displayImg = metaData.image || metaData.twitterImage
                                    if (!shouldRenderPreviewImages) {
                                      return (
                                        <div className="w-full h-20 rounded mb-2 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                          プレビュ―タブを開くと画像を読み込みます
                                        </div>
                                      )
                                    }

                                    if (!displayImg) {
                                      return (
                                        <div className="w-full h-20 rounded mb-2 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                          画像が設定されていません
                                        </div>
                                      )
                                    }

                                    const isLoading = imageLoading[displayImg] ?? true

                                    return (
                                      <div className="relative w-full h-20 mb-2">
                                        {isLoading && (
                                          <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                          </div>
                                        )}
                                        <img
                                          src={getProxiedImageUrl(displayImg)}
                                          alt="Mobile Preview"
                                          className={`w-full h-20 object-cover rounded transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                          loading="lazy"
                                          onLoad={() => handleImageLoad(displayImg)}
                                          onError={() => handleImageError(displayImg)}
                                        />
                                      </div>
                                    )
                                  })()}
                                  <h6 className="font-semibold text-xs text-gray-900">
                                    {metaData.title || "タイトルなし"}
                                  </h6>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {metaData.description || "説明なし"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Monitor className="h-4 w-4" />
                                デスクトッププレビュー
                              </h4>
                              <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="bg-white rounded p-3">
                                  <div className="flex gap-3">
                                    {(() => {
                                      const displayImg = metaData.image || metaData.twitterImage
                                      if (!shouldRenderPreviewImages) {
                                        return (
                                          <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-2">
                                            タブを開くと画像を読み込みます
                                          </div>
                                        )
                                      }

                                      if (!displayImg) {
                                        return (
                                          <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-2">
                                            画像なし
                                          </div>
                                        )
                                      }

                                      const isLoading = imageLoading[displayImg] ?? true

                                      return (
                                        <div className="relative w-20 h-20">
                                          {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                            </div>
                                          )}
                                          <img
                                            src={getProxiedImageUrl(displayImg)}
                                            alt="Desktop Preview"
                                            className={`w-20 h-20 object-cover rounded transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                            loading="lazy"
                                            onLoad={() => handleImageLoad(displayImg)}
                                            onError={() => handleImageError(displayImg)}
                                          />
                                        </div>
                                      )
                                    })()}
                                    <div className="flex-1">
                                      <h6 className="font-semibold text-sm text-gray-900">
                                        {metaData.title || "タイトルなし"}
                                      </h6>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {metaData.description || "説明なし"}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {metaData.url || "URLなし"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="metadata" className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                              <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                <FileText className="h-5 w-5 text-blue-600" />
                                Open Graph メタデータ
                              </h4>
                              <div className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.title ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:title</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.title || "設定されていません"}
                                  </div>
                                  {metaData.title && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {metaData.title.length}文字
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.description ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:description</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.description || "設定されていません"}
                                  </div>
                                  {metaData.description && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {metaData.description.length}文字
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.image ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:image</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.image || "設定されていません"}
                                  </div>
                                  {metaData.image && metaData.width && metaData.height && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {metaData.width}×{metaData.height}px
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.url ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:url</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.url || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.siteName ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:site_name</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.siteName || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.type ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">og:type</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.type || "設定されていません"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                              <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                <Settings className="h-5 w-5 text-purple-600" />
                                その他メタデータ
                              </h4>
                              <div className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.keywords ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">keywords</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.keywords || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.author ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">author</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.author || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.publishedTime ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">article:published_time</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.publishedTime || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.modifiedTime ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">article:modified_time</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.modifiedTime || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.section ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">article:section</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.section || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.tag ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">article:tag</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.tag || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.canonical ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">canonical</span>
                                  </div>
                                  <div className="text-sm text-gray-900 break-words">
                                    {metaData.canonical || "設定されていません"}
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${metaData.robots ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">robots</span>
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {metaData.robots || "設定されていません"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="social" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Twitter className="h-4 w-4" />
                                Twitter Card
                              </h4>
                              <div className="border rounded-lg p-4 bg-blue-50">
                                <div className="flex gap-3">
                                  {(() => {
                                    const displayImg = metaData.twitterImage

                                    if (!shouldRenderSocialImages) {
                                      return (
                                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                                          タブを開くと画像を読み込みます
                                        </div>
                                      )
                                    }

                                    if (!displayImg) {
                                      return (
                                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                                          画像なし
                                        </div>
                                      )
                                    }

                                    const isLoading = imageLoading[displayImg] ?? true

                                    return (
                                      <div className="relative w-16 h-16">
                                        {isLoading && (
                                          <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                          </div>
                                        )}
                                        <img
                                          src={getProxiedImageUrl(displayImg)}
                                          alt="Twitter Card Image"
                                          className={`w-16 h-16 object-cover rounded transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                          loading="lazy"
                                          onLoad={() => handleImageLoad(displayImg)}
                                          onError={() => handleImageError(displayImg)}
                                        />
                                      </div>
                                    )
                                  })()}
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 text-sm">
                                      {metaData.twitterTitle || metaData.title || "タイトルなし"}
                                    </h5>
                                    <p className="text-gray-600 text-xs mt-1">
                                      {metaData.twitterDescription || metaData.description || "説明なし"}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                      {metaData.url || "URLなし"}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-600">
                                  <div className="flex justify-between">
                                    <span>Card Type:</span>
                                    <span>{metaData.twitterCard || "なし"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Site:</span>
                                    <span>{metaData.twitterSite || "なし"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Creator:</span>
                                    <span>{metaData.twitterCreator || "なし"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Facebook className="h-4 w-4" />
                                Facebook Card
                              </h4>
                              <div className="border rounded-lg p-4 bg-blue-50">
                                <div className="flex gap-3">
                                  {(() => {
                                    const displayImg = metaData.image

                                    if (!shouldRenderSocialImages) {
                                      return (
                                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                                          タブを開くと画像を読み込みます
                                        </div>
                                      )
                                    }

                                    if (!displayImg) {
                                      return (
                                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                                          画像なし
                                        </div>
                                      )
                                    }

                                    const isLoading = imageLoading[displayImg] ?? true

                                    return (
                                      <div className="relative w-16 h-16">
                                        {isLoading && (
                                          <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                          </div>
                                        )}
                                        <img
                                          src={getProxiedImageUrl(displayImg)}
                                          alt="Facebook Card Image"
                                          className={`w-16 h-16 object-cover rounded transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                          loading="lazy"
                                          onLoad={() => handleImageLoad(displayImg)}
                                          onError={() => handleImageError(displayImg)}
                                        />
                                      </div>
                                    )
                                  })()}
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 text-sm">
                                      {metaData.title || "タイトルなし"}
                                    </h5>
                                    <p className="text-gray-600 text-xs mt-1">
                                      {metaData.description || "説明なし"}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                      {metaData.url || "URLなし"}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-600">
                                  <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span>{metaData.type || "なし"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Site Name:</span>
                                    <span>{metaData.siteName || "なし"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Locale:</span>
                                    <span>{metaData.locale || "なし"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="analysis" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                改善提案
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                {!metaData.title && (
                                  <div className="p-2.5 sm:p-3 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-xs sm:text-sm text-red-800 break-words">
                                      <strong>タイトルが設定されていません</strong><br />
                                      og:titleメタタグを追加してください
                                    </p>
                                  </div>
                                )}
                                {!metaData.description && (
                                  <div className="p-2.5 sm:p-3 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-xs sm:text-sm text-red-800 break-words">
                                      <strong>説明文が設定されていません</strong><br />
                                      og:descriptionメタタグを追加してください
                                    </p>
                                  </div>
                                )}
                                {!metaData.image && (
                                  <div className="p-2.5 sm:p-3 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-xs sm:text-sm text-red-800 break-words">
                                      <strong>OGP画像が設定されていません</strong><br />
                                      og:imageメタタグを追加してください
                                    </p>
                                  </div>
                                )}
                                {metaData.title && metaData.title.length < 30 && (
                                  <div className="p-2.5 sm:p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                    <p className="text-xs sm:text-sm text-yellow-800 break-words">
                                      <strong>タイトルが短すぎます</strong><br />
                                      30文字以上60文字以下を推奨します
                                    </p>
                                  </div>
                                )}
                                {metaData.description && metaData.description.length < 100 && (
                                  <div className="p-2.5 sm:p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                    <p className="text-xs sm:text-sm text-yellow-800 break-words">
                                      <strong>説明文が短すぎます</strong><br />
                                      100文字以上160文字以下を推奨します
                                    </p>
                                  </div>
                                )}
                                {metaData.image && metaData.width && metaData.height && (
                                  (() => {
                                    const width = parseInt(metaData.width)
                                    const height = parseInt(metaData.height)
                                    if (width < 1536 || height < 1024) {
                                      return (
                                        <div className="p-2.5 sm:p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                          <p className="text-xs sm:text-sm text-yellow-800 break-words">
                                            <strong>画像サイズが小さいです</strong><br />
                                            1536×1024px以上を推奨します
                                          </p>
                                        </div>
                                      )
                                    }
                                    return null
                                  })()
                                )}
                                {calculateSEOScore(metaData) >= 80 && (
                                  <div className="p-2.5 sm:p-3 bg-green-50 border-l-4 border-green-500 rounded">
                                    <p className="text-xs sm:text-sm text-green-800 break-words">
                                      <strong>優秀なOGP設定です！</strong><br />
                                      すべての推奨項目が適切に設定されています
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                                アクション
                              </h4>
                              <div className="space-y-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(metaData.url || "")}
                                  className="w-full justify-start min-h-[44px] text-xs sm:text-sm"
                                >
                                  <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                  <span className="break-words">URLをコピー</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(metaData.url, '_blank')}
                                  className="w-full justify-start min-h-[44px] text-xs sm:text-sm"
                                >
                                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                  <span className="break-words">サイトを開く</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => shareResult(metaData)}
                                  className="w-full justify-start min-h-[44px] text-xs sm:text-sm"
                                >
                                  <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                  <span className="break-words">結果をシェア</span>
                                </Button>
                                <div className="grid grid-cols-3 gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => shareToTwitter(metaData)}
                                    className="w-full justify-center bg-blue-50 hover:bg-blue-100 border-blue-200 min-h-[44px] p-0"
                                  >
                                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => shareToFacebook(metaData)}
                                    className="w-full justify-center bg-blue-50 hover:bg-blue-100 border-blue-200 min-h-[44px] p-0"
                                  >
                                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => shareToLine(metaData)}
                                    className="w-full justify-center bg-green-50 hover:bg-green-100 border-green-200 min-h-[44px] p-0"
                                  >
                                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => exportSingleResult(metaData)}
                                  className="w-full justify-start min-h-[44px] text-xs sm:text-sm"
                                >
                                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                  <span className="break-words">結果をエクスポート</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* バッチチェックタブ */}
            <TabsContent value="batch" className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    バッチチェック
                  </CardTitle>
                  <CardDescription>
                    複数のURLを一度にチェックして比較分析します
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addUrl()}
                      className="flex-1"
                    />
                    <Button onClick={addUrl} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {urls.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">チェック対象URL ({urls.length}件)</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {urls.map((urlItem, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600 flex-1 truncate">{urlItem}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeUrl(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={checkBatchOGP}
                        disabled={batchLoading}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        {batchLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <BarChart3 className="h-4 w-4 mr-2" />
                        )}
                        バッチチェック実行
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* バッチ結果表示 */}
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          バッチチェック結果 ({results.length}件)
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(Math.round(results.reduce((sum, result) => sum + result.seoScore, 0) / results.length))}`}>
                            {getScoreIcon(Math.round(results.reduce((sum, result) => sum + result.seoScore, 0) / results.length))}
                            <span className="font-bold">平均スコア: {Math.round(results.reduce((sum, result) => sum + result.seoScore, 0) / results.length)}/100</span>
                          </div>
                          <Button onClick={exportResults} size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            CSV出力
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* 統計サマリー */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results.filter(result => !result.error).length}</div>
                          <div className="text-xs text-green-600">成功</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{results.filter(result => result.error).length}</div>
                          <div className="text-xs text-red-600">エラー</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{results.filter(r => r.seoScore >= 80).length}</div>
                          <div className="text-xs text-blue-600">優秀(80+)</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{results.filter(r => r.seoScore >= 60 && r.seoScore < 80).length}</div>
                          <div className="text-xs text-yellow-600">良好(60-79)</div>
                        </div>
                      </div>

                      {/* 結果一覧 */}
                      <div className="space-y-3">
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-sm font-medium text-gray-600 truncate">
                                  {result.url}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getScoreColor(result.seoScore)}`}>
                                  {getScoreIcon(result.seoScore)}
                                  {result.seoScore}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {getScoreText(result.seoScore)}
                                </Badge>
                              </div>
                            </div>
                            
                            {result.error ? (
                              <div className="text-red-600 text-xs bg-red-50 p-2 rounded">
                                <strong>エラー:</strong> {result.error}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                  <span>タイトル:</span>
                                  <span className="truncate ml-2 max-w-xs">
                                    {result.metaData.title || "なし"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>説明:</span>
                                  <span className="truncate ml-2 max-w-xs">
                                    {result.metaData.description || "なし"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>画像:</span>
                                  <span className="ml-2">
                                    {result.metaData.image ? "あり" : "なし"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Twitter Card:</span>
                                  <span className="ml-2">
                                    {result.metaData.twitterCard ? "あり" : "なし"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* 履歴タブ */}
            <TabsContent value="history" className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      チェック履歴
                    </CardTitle>
                    <Button onClick={clearHistory} size="sm" variant="outline">
                      <Trash2 className="h-3 w-3 mr-1" />
                      履歴をクリア
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>まだチェック履歴がありません</p>
                      <p className="text-sm">URLをチェックすると履歴に保存されます</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {history.slice(0, 20).map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {(() => {
                                  const date = new Date(item.timestamp)
                                  const now = new Date()
                                  const diffMs = now.getTime() - date.getTime()
                                  const diffMins = Math.floor(diffMs / 60000)
                                  const diffHours = Math.floor(diffMs / 3600000)
                                  const diffDays = Math.floor(diffMs / 86400000)

                                  if (diffMins < 1) return "たった今"
                                  if (diffMins < 60) return `${diffMins}分前`
                                  if (diffHours < 24) return `${diffHours}時間前`
                                  if (diffDays < 7) return `${diffDays}日前`
                                  return date.toLocaleDateString('ja-JP')
                                })()}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600 truncate flex-1">
                              {item.url}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getScoreColor(item.seoScore)}`}>
                              {getScoreIcon(item.seoScore)}
                              {item.seoScore}
                            </div>
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => recheckUrl(item.url)}
                                className="h-6 w-6 p-0"
                              >
                                <RefreshCw className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromHistory(index)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {history.length > 20 && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                      最新20件を表示中（全{history.length}件）
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 分析タブ */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    分析ダッシュボード
                  </CardTitle>
                  <CardDescription>
                    チェック履歴からOGP最適化の傾向を分析します
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>分析データがありません</p>
                      <p className="text-sm">URLをチェックすると分析データが蓄積されます</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* スコア分布 */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BarChart className="h-4 w-4" />
                          スコア分布
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {history.filter(h => h.seoScore >= 80).length}
                            </div>
                            <div className="text-sm text-green-600">優秀 (80+)</div>
                            <div className="text-xs text-gray-500">
                              {Math.round((history.filter(h => h.seoScore >= 80).length / history.length) * 100)}%
                            </div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">
                              {history.filter(h => h.seoScore >= 60 && h.seoScore < 80).length}
                            </div>
                            <div className="text-sm text-yellow-600">良好 (60-79)</div>
                            <div className="text-xs text-gray-500">
                              {Math.round((history.filter(h => h.seoScore >= 60 && h.seoScore < 80).length / history.length) * 100)}%
                            </div>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                              {history.filter(h => h.seoScore < 60).length}
                            </div>
                            <div className="text-sm text-red-600">要改善 (&lt;60)</div>
                            <div className="text-xs text-gray-500">
                              {Math.round((history.filter(h => h.seoScore < 60).length / history.length) * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 改善提案 */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          改善提案
                        </h4>
                        <div className="space-y-3">
                          {history.filter(h => !h.metaData.title).length > 0 && (
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                              <p className="text-sm text-red-800">
                                <strong>タイトル未設定:</strong> {history.filter(h => !h.metaData.title).length}件
                              </p>
                            </div>
                          )}
                          {history.filter(h => !h.metaData.description).length > 0 && (
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                              <p className="text-sm text-red-800">
                                <strong>説明文未設定:</strong> {history.filter(h => !h.metaData.description).length}件
                              </p>
                            </div>
                          )}
                          {history.filter(h => !h.metaData.image).length > 0 && (
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                              <p className="text-sm text-red-800">
                                <strong>OGP画像未設定:</strong> {history.filter(h => !h.metaData.image).length}件
                              </p>
                            </div>
                          )}
                          {history.filter(h => !h.metaData.twitterCard).length > 0 && (
                            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                              <p className="text-sm text-yellow-800">
                                <strong>Twitter Card未設定:</strong> {history.filter(h => !h.metaData.twitterCard).length}件
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 統計情報 */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          統計情報
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{history.length}</div>
                            <div className="text-xs text-blue-600">総チェック数</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">
                              {Math.round(history.reduce((sum, h) => sum + h.seoScore, 0) / history.length)}
                            </div>
                            <div className="text-xs text-purple-600">平均スコア</div>
                          </div>
                          <div className="text-center p-3 bg-indigo-50 rounded-lg">
                            <div className="text-xl font-bold text-indigo-600">
                              {Math.max(...history.map(h => h.seoScore))}
                            </div>
                            <div className="text-xs text-indigo-600">最高スコア</div>
                          </div>
                          <div className="text-center p-3 bg-pink-50 rounded-lg">
                            <div className="text-xl font-bold text-pink-600">
                              {Math.min(...history.map(h => h.seoScore))}
                            </div>
                            <div className="text-xs text-pink-600">最低スコア</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}