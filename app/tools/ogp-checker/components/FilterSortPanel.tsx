"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Filter, 
  Search, 
  SortAsc, 
  SortDesc,
  X,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"

interface CheckResult {
  url: string
  metaData: {
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
  seoScore: number
  timestamp: number
  error?: string
}

interface FilterSortPanelProps {
  results: CheckResult[]
  filteredResults: CheckResult[]
  onFilterChange: (filtered: CheckResult[]) => void
  onExport: () => void
  onClearFilters: () => void
}

export function FilterSortPanel({
  results,
  filteredResults,
  onFilterChange,
  onExport,
  onClearFilters
}: FilterSortPanelProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [scoreRange, setScoreRange] = React.useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = React.useState<'score' | 'date' | 'url' | 'title'>('score')
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  const [showErrors, setShowErrors] = React.useState(true)
  const [showWarnings, setShowWarnings] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(true)
  const [hasImage, setHasImage] = React.useState<boolean | null>(null)
  const [hasTwitterCard, setHasTwitterCard] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    let filtered = [...results]

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(result =>
        result.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.metaData.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.metaData.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // スコアフィルター
    filtered = filtered.filter(result =>
      result.seoScore >= scoreRange[0] && result.seoScore <= scoreRange[1]
    )

    // エラー・警告・成功フィルター
    filtered = filtered.filter(result => {
      if (result.error) return showErrors
      if (result.seoScore < 60) return showWarnings
      if (result.seoScore >= 60) return showSuccess
      return true
    })

    // 画像フィルター
    if (hasImage !== null) {
      filtered = filtered.filter(result => !!result.metaData.image === hasImage)
    }

    // Twitter Cardフィルター
    if (hasTwitterCard !== null) {
      filtered = filtered.filter(result => !!result.metaData.twitterCard === hasTwitterCard)
    }

    // ソート
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'score':
          aValue = a.seoScore
          bValue = b.seoScore
          break
        case 'date':
          aValue = a.timestamp
          bValue = b.timestamp
          break
        case 'url':
          aValue = a.url
          bValue = b.url
          break
        case 'title':
          aValue = a.metaData.title || ''
          bValue = b.metaData.title || ''
          break
        default:
          aValue = a.seoScore
          bValue = b.seoScore
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    onFilterChange(filtered)
  }, [
    results,
    searchTerm,
    scoreRange,
    sortBy,
    sortOrder,
    showErrors,
    showWarnings,
    showSuccess,
    hasImage,
    hasTwitterCard,
    onFilterChange
  ])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />
    if (score >= 60) return <AlertTriangle className="h-4 w-4" />
    return <XCircle className="h-4 w-4" />
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return "優秀"
    if (score >= 60) return "良好"
    return "要改善"
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            フィルター・ソート
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {filteredResults.length}/{results.length}件
            </Badge>
            <Button onClick={onExport} size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              エクスポート
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 検索バー */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="URL、タイトル、説明で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* フィルター設定 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* スコアフィルター */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              スコア範囲: {scoreRange[0]} - {scoreRange[1]}
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={scoreRange[0]}
                onChange={(e) => setScoreRange([parseInt(e.target.value) || 0, scoreRange[1]])}
                className="w-20"
              />
              <span className="flex items-center">-</span>
              <Input
                type="number"
                min="0"
                max="100"
                value={scoreRange[1]}
                onChange={(e) => setScoreRange([scoreRange[0], parseInt(e.target.value) || 100])}
                className="w-20"
              />
            </div>
          </div>

          {/* ソート設定 */}
          <div>
            <label className="text-sm font-medium mb-2 block">ソート基準</label>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">SEOスコア</SelectItem>
                <SelectItem value="date">日時</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="title">タイトル</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ソート順序 */}
          <div>
            <label className="text-sm font-medium mb-2 block">ソート順序</label>
            <div className="flex gap-2">
              <Button
                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('desc')}
                className="flex-1"
              >
                <SortDesc className="h-3 w-3 mr-1" />
                降順
              </Button>
              <Button
                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('asc')}
                className="flex-1"
              >
                <SortAsc className="h-3 w-3 mr-1" />
                昇順
              </Button>
            </div>
          </div>
        </div>

        {/* 状態フィルター */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={showSuccess ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowSuccess(!showSuccess)}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            成功 ({results.filter(r => r.seoScore >= 60 && !r.error).length})
          </Button>
          <Button
            variant={showWarnings ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowWarnings(!showWarnings)}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            警告 ({results.filter(r => r.seoScore < 60 && !r.error).length})
          </Button>
          <Button
            variant={showErrors ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowErrors(!showErrors)}
          >
            <XCircle className="h-3 w-3 mr-1" />
            エラー ({results.filter(r => r.error).length})
          </Button>
        </div>

        {/* メタデータフィルター */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={hasImage === true ? 'default' : hasImage === false ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => {
              if (hasImage === true) setHasImage(false)
              else if (hasImage === false) setHasImage(null)
              else setHasImage(true)
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            画像あり ({results.filter(r => r.metaData.image).length})
          </Button>
          <Button
            variant={hasTwitterCard === true ? 'default' : hasTwitterCard === false ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => {
              if (hasTwitterCard === true) setHasTwitterCard(false)
              else if (hasTwitterCard === false) setHasTwitterCard(null)
              else setHasTwitterCard(true)
            }}
          >
            <Target className="h-3 w-3 mr-1" />
            Twitter Card ({results.filter(r => r.metaData.twitterCard).length})
          </Button>
        </div>

        {/* クリアフィルター */}
        {(searchTerm || scoreRange[0] !== 0 || scoreRange[1] !== 100 || 
          !showErrors || !showWarnings || !showSuccess || 
          hasImage !== null || hasTwitterCard !== null) && (
          <div className="flex justify-end">
            <Button onClick={onClearFilters} size="sm" variant="outline">
              <RefreshCw className="h-3 w-3 mr-1" />
              フィルターをクリア
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
