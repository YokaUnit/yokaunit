"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  History,
  Clock,
  Trash2,
  RefreshCw
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

interface HistoryDisplayProps {
  history: CheckResult[]
  onClearHistory: () => void
  onRecheck: (url: string) => void
  onRemoveFromHistory: (index: number) => void
}

export function HistoryDisplay({ 
  history, 
  onClearHistory, 
  onRecheck, 
  onRemoveFromHistory 
}: HistoryDisplayProps) {
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

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
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
  }

  if (history.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            チェック履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>まだチェック履歴がありません</p>
            <p className="text-sm">URLをチェックすると履歴に保存されます</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            チェック履歴 ({history.length}件)
          </div>
          <Button onClick={onClearHistory} size="sm" variant="outline">
            <Trash2 className="h-3 w-3 mr-1" />
            履歴をクリア
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                    {formatTimestamp(item.timestamp)}
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
                    onClick={() => onRecheck(item.url)}
                    className="h-6 w-6 p-0"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveFromHistory(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {history.length > 20 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            最新20件を表示中（全{history.length}件）
          </div>
        )}
      </CardContent>
    </Card>
  )
}
