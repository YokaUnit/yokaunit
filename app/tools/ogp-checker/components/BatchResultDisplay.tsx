"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus
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

interface BatchResultDisplayProps {
  results: CheckResult[]
  onExport: () => void
}

export function BatchResultDisplay({ results, onExport }: BatchResultDisplayProps) {
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

  const getScoreTrendIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-3 w-3 text-green-600" />
    if (score >= 60) return <Minus className="h-3 w-3 text-yellow-600" />
    return <TrendingDown className="h-3 w-3 text-red-600" />
  }

  const averageScore = results.length > 0 
    ? Math.round(results.reduce((sum, result) => sum + result.seoScore, 0) / results.length)
    : 0

  const successCount = results.filter(result => !result.error).length
  const errorCount = results.filter(result => result.error).length

  const scoreDistribution = {
    excellent: results.filter(r => r.seoScore >= 80).length,
    good: results.filter(r => r.seoScore >= 60 && r.seoScore < 80).length,
    poor: results.filter(r => r.seoScore < 60).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              バッチチェック結果 ({results.length}件)
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(averageScore)}`}>
                {getScoreIcon(averageScore)}
                <span className="font-bold">平均スコア: {averageScore}/100</span>
              </div>
              <Button onClick={onExport} size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                CSV出力
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 統計サマリー */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-xs text-green-600">成功</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-xs text-red-600">エラー</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{scoreDistribution.excellent}</div>
              <div className="text-xs text-blue-600">優秀(80+)</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{scoreDistribution.good}</div>
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
                    {getScoreTrendIcon(result.seoScore)}
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

          {/* 改善提案 */}
          {results.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">改善提案</h4>
              <div className="text-sm text-blue-800 space-y-1">
                {scoreDistribution.poor > 0 && (
                  <div>• {scoreDistribution.poor}件のサイトでOGPメタデータの追加が必要です</div>
                )}
                {results.filter(r => !r.metaData.image).length > 0 && (
                  <div>• {results.filter(r => !r.metaData.image).length}件のサイトでOGP画像の設定が必要です</div>
                )}
                {results.filter(r => !r.metaData.twitterCard).length > 0 && (
                  <div>• {results.filter(r => !r.metaData.twitterCard).length}件のサイトでTwitter Cardの設定が必要です</div>
                )}
                {averageScore < 60 && (
                  <div>• 全体的なOGP最適化レベルを向上させることをお勧めします</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
