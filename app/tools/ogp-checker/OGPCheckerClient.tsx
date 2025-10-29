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
    const maxScore = 100

    // 基本メタデータ (40点)
    if (metaData.title) score += 10
    if (metaData.description) score += 10
    if (metaData.image) score += 10
    if (metaData.url) score += 10

    // OGPメタデータ (30点)
    if (metaData.siteName) score += 5
    if (metaData.type) score += 5
    if (metaData.locale) score += 5
    if (metaData.canonical) score += 5
    if (metaData.robots) score += 5
    if (metaData.keywords) score += 5

    // Twitter Card (20点)
    if (metaData.twitterCard) score += 5
    if (metaData.twitterTitle) score += 5
    if (metaData.twitterDescription) score += 5
    if (metaData.twitterImage) score += 5

    // 追加メタデータ (10点)
    if (metaData.author) score += 3
    if (metaData.publishedTime) score += 3
    if (metaData.modifiedTime) score += 2
    if (metaData.section) score += 2

    return Math.min(score, maxScore)
  }

  const checkOGP = async (targetUrl: string) => {
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

      toast({
        title: "チェック完了",
        description: "OGPメタデータを取得しました",
      })

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
  }

  const checkBatchOGP = async () => {
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
            error: err instanceof Error ? err.message : 'Unknown error'
          }
        }
      })

      const results = await Promise.all(promises)
      setResults(results)
      setHistory(prev => [...results, ...prev.slice(0, 19 - results.length)])

      toast({
        title: "一括チェック完了",
        description: `${results.length}件のURLをチェックしました`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setBatchLoading(false)
    }
  }

  const addUrl = () => {
    if (url.trim() && !urls.includes(url.trim())) {
      setUrls(prev => [...prev, url.trim()])
      setUrl("")
    }
  }

  const removeUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "コピーしました",
      description: "クリップボードにコピーしました",
    })
  }

  const downloadResults = () => {
    const csvContent = [
      ['URL', 'タイトル', '説明', '画像', 'SEOスコア', 'エラー'],
      ...results.map(result => [
        result.url,
        result.metaData.title || '',
        result.metaData.description || '',
        result.metaData.image || '',
        result.seoScore.toString(),
        result.error || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ogp-check-results-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">単一URL</TabsTrigger>
                <TabsTrigger value="batch">一括チェック</TabsTrigger>
              </TabsList>
              
              <TabsContent value="single" className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkOGP(url)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => checkOGP(url)}
                    disabled={!url || loading}
                    className="px-6"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="batch" className="space-y-4">
                <div className="space-y-3">
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">URL一覧 ({urls.length}件)</span>
                        <Button 
                          onClick={checkBatchOGP}
                          disabled={batchLoading}
                          size="sm"
                        >
                          {batchLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Search className="h-4 w-4 mr-2" />
                          )}
                          一括チェック
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {urls.map((url, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm flex-1 truncate">{url}</span>
                            <Button
                              onClick={() => removeUrl(index)}
                              variant="ghost"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* エラー表示 */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4"
        >
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* 結果表示 */}
      {metaData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 px-4"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                チェック結果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SEOスコア */}
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {calculateSEOScore(metaData)}/100
                </div>
                <div className="text-sm text-gray-600">SEOスコア</div>
              </div>

              {/* プレビュー */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3">プレビュー</h3>
                <div className="max-w-md mx-auto">
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    {metaData.image && (
                      <div className="mb-3">
                        <img
                          src={getProxiedImageUrl(metaData.image)}
                          alt={metaData.alt || metaData.title || "OGP画像"}
                          className="w-full h-32 object-cover rounded"
                          onLoad={() => handleImageLoad(metaData.image!)}
                          onError={() => handleImageError(metaData.image!)}
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className="font-semibold text-blue-600 text-sm">
                        {metaData.siteName || "サイト名"}
                      </div>
                      <div className="font-bold text-lg line-clamp-2">
                        {metaData.title || "タイトル"}
                      </div>
                      <div className="text-gray-600 text-sm line-clamp-2">
                        {metaData.description || "説明"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* メタデータ詳細 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    基本メタデータ
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">タイトル</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.title, true)}
                        {getStatusBadge(metaData.title, true)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">説明</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.description, true)}
                        {getStatusBadge(metaData.description, true)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">画像</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.image, true)}
                        {getStatusBadge(metaData.image, true)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">URL</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.url, true)}
                        {getStatusBadge(metaData.url, true)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter Card
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Card Type</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.twitterCard)}
                        {getStatusBadge(metaData.twitterCard)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">タイトル</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.twitterTitle)}
                        {getStatusBadge(metaData.twitterTitle)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">説明</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.twitterDescription)}
                        {getStatusBadge(metaData.twitterDescription)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">画像</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metaData.twitterImage)}
                        {getStatusBadge(metaData.twitterImage)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => copyToClipboard(metaData.url || '')}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  URLコピー
                </Button>
                <Button
                  onClick={() => window.open(metaData.url, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  サイトを開く
                </Button>
                {metaData.image && (
                  <Button
                    onClick={() => window.open(metaData.image, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    画像を開く
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 一括チェック結果 */}
      {results.length > 0 && activeTab === "batch" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 px-4"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  一括チェック結果 ({results.length}件)
                </CardTitle>
                <Button onClick={downloadResults} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  CSVダウンロード
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">
                          {result.seoScore}/100
                        </span>
                        {result.error ? (
                          <Badge variant="destructive">エラー</Badge>
                        ) : (
                          <Badge variant="default">成功</Badge>
                        )}
                      </div>
                      <Button
                        onClick={() => window.open(result.url, '_blank')}
                        variant="ghost"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 truncate mb-1">
                      {result.url}
                    </div>
                    {result.error ? (
                      <div className="text-sm text-red-600">
                        エラー: {result.error}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-800">
                        {result.metaData.title || "タイトルなし"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* SEO記事 */}
      <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔍 OGPチェッカー完全ガイド：メタデータ最適化・SNSマーケティング・SEO技術の科学</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              OGPの基礎知識
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">OGPとは</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Open Graph Protocol</strong>: Facebookが開発</li>
                  <li>• <strong>メタデータ標準</strong>: SNSでの表示制御</li>
                  <li>• <strong>視覚的プレビュー</strong>: 画像・タイトル・説明</li>
                  <li>• <strong>エンゲージメント向上</strong>: クリック率の改善</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">主要メタデータ</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>og:title</strong>: ページのタイトル</li>
                  <li>• <strong>og:description</strong>: ページの説明</li>
                  <li>• <strong>og:image</strong>: 表示画像</li>
                  <li>• <strong>og:url</strong>: ページのURL</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📱</span>
              SNSマーケティング戦略
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Twitter Card</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  twitter:card: summary_large_image<br/>
                  twitter:title: ページタイトル<br/>
                  twitter:description: ページ説明<br/>
                  twitter:image: 画像URL
                </div>
                <p className="text-sm text-gray-600">
                  Twitterでの表示を最適化する
                  メタデータ設定。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Facebook Card</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  og:type: website<br/>
                  og:site_name: サイト名<br/>
                  og:locale: ja_JP<br/>
                  og:image:width: 1200
                </div>
                <p className="text-sm text-gray-600">
                  Facebookでの表示を最適化する
                  メタデータ設定。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              SEO最適化テクニック
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">画像最適化</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-purple-600">推奨サイズ</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 1200x630px (推奨)</li>
                      <li>• 600x315px (最小)</li>
                      <li>• アスペクト比: 1.91:1</li>
                      <li>• ファイルサイズ: 8MB以下</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-blue-600">画像形式</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• JPEG: 写真に適している</li>
                      <li>• PNG: 透明背景が必要</li>
                      <li>• WebP: 高圧縮率</li>
                      <li>• SVG: ベクター画像</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">メタデータ最適化</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>タイトル</strong>: 60文字以内で魅力的に</li>
                  <li>• <strong>説明</strong>: 160文字以内で要点をまとめる</li>
                  <li>• <strong>キーワード</strong>: 自然な形で含める</li>
                  <li>• <strong>ブランディング</strong>: 一貫性のある表現</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              効果測定と分析
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">エンゲージメント指標</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  クリック率 (CTR)<br/>
                  インプレッション数<br/>
                  エンゲージメント率<br/>
                  リーチ数
                </div>
                <p className="text-sm text-gray-600">
                  SNSでの投稿パフォーマンスを
                  測定する指標。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">SEO指標</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  検索順位<br/>
                  オーガニックトラフィック<br/>
                  バウンス率<br/>
                  滞在時間
                </div>
                <p className="text-sm text-gray-600">
                  検索エンジンでの
                  パフォーマンス指標。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">コンバージョン指標</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  コンバージョン率<br/>
                  売上・利益<br/>
                  リード獲得数<br/>
                  顧客獲得コスト
                </div>
                <p className="text-sm text-gray-600">
                  ビジネス目標達成度を
                  測定する指標。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              実践的な最適化手法
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">A/Bテスト</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-red-600">テスト要素</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 画像の種類・色</li>
                      <li>• タイトルの表現</li>
                      <li>• 説明文の長さ</li>
                      <li>• 呼びかけの文言</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-green-600">分析手法</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 統計的有意性の確認</li>
                      <li>• サンプルサイズの確保</li>
                      <li>• 期間の設定</li>
                      <li>• 結果の解釈</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">継続的改善</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>データ分析</strong>: 定期的なパフォーマンス確認</li>
                  <li>• <strong>競合分析</strong>: 他社の成功事例研究</li>
                  <li>• <strong>トレンド対応</strong>: 最新のSNS機能活用</li>
                  <li>• <strong>ユーザーフィードバック</strong>: 実際の反応を重視</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              OGPチェッカーは、効果的なメタデータ戦略の構築に不可欠なツールです。
              適切な設定により、SNSでのエンゲージメント向上とSEO効果の改善が期待できます。
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
              <span>#OGPチェッカー</span>
              <span>#メタデータ</span>
              <span>#SNSマーケティング</span>
              <span>#SEO</span>
              <span>#最適化</span>
              <span>#YokaUnit</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
