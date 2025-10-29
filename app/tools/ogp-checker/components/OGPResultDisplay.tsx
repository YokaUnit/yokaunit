"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
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
  Download,
  Share2
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

interface OGPResultDisplayProps {
  metaData: OGPMetaData
  seoScore: number
  onCopyToClipboard: (text: string) => void
  onOpenExternal: (url: string) => void
  onShare: (data: OGPMetaData) => void
  onExport: (data: OGPMetaData) => void
  getProxiedImageUrl: (url: string) => string
  handleImageLoad: (url: string) => void
  handleImageError: (url: string) => void
}

export function OGPResultDisplay({
  metaData,
  seoScore,
  onCopyToClipboard,
  onOpenExternal,
  onShare,
  onExport,
  getProxiedImageUrl,
  handleImageLoad,
  handleImageError
}: OGPResultDisplayProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              チェック結果
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(seoScore)}`}>
              {getScoreIcon(seoScore)}
              <span className="font-bold">SEOスコア: {seoScore}/100</span>
              <Badge variant="secondary" className="ml-2">
                {getScoreText(seoScore)}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* プレビューセクション */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                SNSプレビュー
              </h4>
              <div className="border rounded-lg p-4 bg-gray-50">
                {metaData.image && (
                  <div className="mb-3">
                    <img
                      src={getProxiedImageUrl(metaData.image)}
                      alt="OGP Image"
                      className="w-full h-32 object-cover rounded"
                      onLoad={() => handleImageLoad(metaData.image!)}
                      onError={() => handleImageError(metaData.image!)}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <h5 className="font-semibold text-blue-600 text-sm">
                    {metaData.title || "タイトルなし"}
                  </h5>
                  <p className="text-gray-600 text-xs">
                    {metaData.description || "説明なし"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {metaData.url || "URLなし"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                メタデータ詳細
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">タイトル:</span>
                  <span className="font-medium">{metaData.title || "なし"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">説明:</span>
                  <span className="font-medium">{metaData.description || "なし"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">画像:</span>
                  <span className="font-medium">{metaData.image ? "あり" : "なし"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">サイト名:</span>
                  <span className="font-medium">{metaData.siteName || "なし"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">タイプ:</span>
                  <span className="font-medium">{metaData.type || "なし"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Twitter Card プレビュー */}
          {metaData.twitterCard && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter Card プレビュー
              </h4>
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex gap-3">
                  {metaData.twitterImage && (
                    <img
                      src={getProxiedImageUrl(metaData.twitterImage)}
                      alt="Twitter Card Image"
                      className="w-16 h-16 object-cover rounded"
                      onLoad={() => handleImageLoad(metaData.twitterImage!)}
                      onError={() => handleImageError(metaData.twitterImage!)}
                    />
                  )}
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
              </div>
            </div>
          )}

          {/* Facebook Card プレビュー */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook Card プレビュー
            </h4>
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex gap-3">
                {metaData.image && (
                  <img
                    src={getProxiedImageUrl(metaData.image)}
                    alt="Facebook Card Image"
                    className="w-16 h-16 object-cover rounded"
                    onLoad={() => handleImageLoad(metaData.image!)}
                    onError={() => handleImageError(metaData.image!)}
                  />
                )}
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
            </div>
          </div>

          {/* デバイス別プレビュー */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                モバイルプレビュー
              </h4>
              <div className="border rounded-lg p-3 bg-gray-50 max-w-xs mx-auto">
                <div className="bg-white rounded p-2">
                  {metaData.image && (
                    <img
                      src={getProxiedImageUrl(metaData.image)}
                      alt="Mobile Preview"
                      className="w-full h-20 object-cover rounded mb-2"
                      onLoad={() => handleImageLoad(metaData.image!)}
                      onError={() => handleImageError(metaData.image!)}
                    />
                  )}
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
                    {metaData.image && (
                      <img
                        src={getProxiedImageUrl(metaData.image)}
                        alt="Desktop Preview"
                        className="w-20 h-20 object-cover rounded"
                        onLoad={() => handleImageLoad(metaData.image!)}
                        onError={() => handleImageError(metaData.image!)}
                      />
                    )}
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

          {/* アクションボタン */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopyToClipboard(metaData.url || "")}
            >
              <Copy className="h-3 w-3 mr-1" />
              URLコピー
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenExternal(metaData.url || "")}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              サイトを開く
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(metaData)}
            >
              <Share2 className="h-3 w-3 mr-1" />
              シェア
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(metaData)}
            >
              <Download className="h-3 w-3 mr-1" />
              エクスポート
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
