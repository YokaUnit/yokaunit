"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Clock,
  Car,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Phone,
  Train,
  Crown,
  Bath,
  Globe,
  JapaneseYenIcon as Yen,
  Users,
  Award,
  Info,
  Share2,
  Copy,
  Check,
  Map,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OnsenBreadcrumbs } from "../components/OnsenBreadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import type { OnsenData } from "../lib/onsen-data"

// マップコンポーネントを動的インポート（SSR無効）
const OnsenDetailMap = dynamic(() => import("../components/OnsenDetailMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">地図を読み込み中...</p>
      </div>
    </div>
  ),
})

interface OnsenDetailPageClientProps {
  onsen: OnsenData
}

export default function OnsenDetailPageClient({ onsen }: OnsenDetailPageClientProps) {
  const [copied, setCopied] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = `${onsen.name} - 日本温泉ランキング#${onsen.ranking}の名湯をチェック！`

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "line":
        window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text + " " + url)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy: ", err)
        }
        break
    }
  }

  // 画像URLの処理 - ポップアップと同じロジックを適用
  const getImageUrl = () => {
    if (!onsen.image_url) {
      return "/placeholder.svg?height=300&width=400&text=温泉画像"
    }

    // URLをそのまま返す（ポップアップと同じ処理）
    return onsen.image_url
  }

  // 画像エラー時のフォールバック
  const handleImageError = () => {
    console.log(`画像読み込みエラー: ${onsen.name} - ${onsen.image_url}`)
    setImageError(true)
  }

  // 画像読み込み成功時の処理
  const handleImageLoad = () => {
    console.log(`画像読み込み成功: ${onsen.name} - ${onsen.image_url}`)
    setImageError(false)
  }

  // 構造化データ生成
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "SpaOrSalon"],
    name: onsen.name,
    description: onsen.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: onsen.address,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: onsen.latitude,
      longitude: onsen.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: onsen.rating,
      reviewCount: onsen.reviews_count,
      bestRating: 5,
      worstRating: 1,
    },
    openingHours: onsen.opening_hours,
    telephone: onsen.phone,
    url: onsen.website_url,
    image: getImageUrl(),
    priceRange: onsen.admission_fee_adult ? `¥${onsen.admission_fee_adult}` : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <SiteHeader />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-3 md:px-4 py-2 md:py-8 max-w-6xl">
            {/* パンくずリスト - モバイルでコンパクト */}
            <div className="mb-2 md:mb-8">
              <OnsenBreadcrumbs currentPage={onsen.name} />
            </div>

            {/* 戻るボタン - モバイルでコンパクト */}
            <div className="mb-2 md:mb-8 flex flex-col sm:flex-row gap-1 md:gap-3">
              <Link href="/tools/onsenmap">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto gap-1 md:gap-2 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white/90 text-xs md:text-sm h-8 md:h-auto"
                >
                  <ArrowLeft className="w-3 md:w-4 h-3 md:h-4" />
                  マップに戻る
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto gap-1 md:gap-2 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white/90 text-xs md:text-sm h-8 md:h-auto"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(onsen.name + " " + onsen.address)}`,
                    "_blank",
                  )
                }
              >
                <Map className="w-3 md:w-4 h-3 md:h-4" />
                Google マップで開く
              </Button>
            </div>

            {/* ヒーローセクション - モバイルでコンパクト */}
            <Card className="mb-3 md:mb-8 border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                {/* 背景グラデーション */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
                <CardContent className="relative p-2 md:p-8">
                  <div className="flex flex-col gap-2 md:gap-8">
                    {/* モバイル：縦並び、デスクトップ：横並び */}
                    <div className="order-2 md:order-1 flex-1">
                      <div className="flex flex-wrap items-center gap-1 md:gap-3 mb-1 md:mb-4">
                        <Badge
                          variant="destructive"
                          className="text-xs md:text-base font-bold px-2 md:px-4 py-1 md:py-2 shadow-lg"
                        >
                          <Crown className="w-3 md:w-5 h-3 md:h-5 mr-1 md:mr-2" />
                          日本温泉ランキング #{onsen.ranking}
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          {onsen.region}
                        </Badge>
                      </div>
                      <h1 className="text-base md:text-4xl lg:text-5xl font-bold mb-1 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight break-words">
                        {onsen.name}
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-6 mb-2 md:mb-6">
                        <div className="flex items-center gap-1 md:gap-2">
                          <Star className="w-4 md:w-6 h-4 md:h-6 text-yellow-500 fill-current" />
                          <span className="text-sm md:text-2xl font-bold">{onsen.rating}</span>
                          <span className="text-xs md:text-base text-gray-500">({onsen.reviews_count}件の口コミ)</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2">
                          <Award className="w-3 md:w-5 h-3 md:h-5 text-orange-500" />
                          <span className="text-xs md:text-lg font-semibold text-orange-600">名湯認定</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-lg text-gray-700 leading-relaxed mb-2 md:mb-6 break-words line-clamp-3 md:line-clamp-none">
                        {onsen.description}
                      </p>

                      {/* 料金ハイライト - モバイルでコンパクト */}
                      <div className="inline-flex items-center gap-1 md:gap-3 bg-green-50 px-2 md:px-4 py-1 md:py-3 rounded-lg border border-green-200 w-full sm:w-auto">
                        <Yen className="w-3 md:w-5 h-3 md:h-5 text-green-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs text-green-600 font-medium block">入浴料</span>
                          <div className="text-xs md:text-xl font-bold text-green-700 break-words">
                            大人 {onsen.admission_fee_adult || 1450}円　小人 {onsen.admission_fee_child || 450}円
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 画像 - モバイルでコンパクト */}
                    <div className="order-1 md:order-2 w-full md:w-80 lg:w-96 flex-shrink-0">
                      <div className="relative aspect-video md:aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden shadow-xl">
                        {!imageError && onsen.image_url ? (
                          <img
                            src={getImageUrl() || "/placeholder.svg"}
                            alt={`${onsen.name}の温泉画像`}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            loading="eager"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <div className="text-center text-blue-600">
                              <Bath className="w-8 md:w-12 h-8 md:h-12 mx-auto mb-2" />
                              <p className="text-xs md:text-sm font-medium">{onsen.name}</p>
                              <p className="text-xs text-blue-500">温泉画像</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* マップセクション - 改善されたデザイン */}
            <Card className="mb-3 md:mb-8 bg-white/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="flex items-center gap-1 md:gap-2 text-sm md:text-xl">
                  <Map className="w-4 md:w-6 h-4 md:h-6 text-blue-600" />
                  位置・アクセス
                </CardTitle>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  地図上のボタンからGoogle マップでルート検索や詳細表示ができます
                </p>
              </CardHeader>
              <CardContent className="p-2 md:p-6 pt-0">
                <OnsenDetailMap onsen={onsen} />
              </CardContent>
            </Card>

            {/* シェアボタン - モバイルでコンパクト */}
            <Card className="mb-3 md:mb-8 bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="p-2 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-4">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Share2 className="w-3 md:w-5 h-3 md:h-5 text-blue-600" />
                    <span className="text-xs md:text-base font-semibold text-gray-700">この温泉をシェア</span>
                  </div>
                  <div className="flex gap-1 md:gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("twitter")}
                      className="flex-1 sm:flex-none text-xs h-7 md:h-auto bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                    >
                      Twitter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("facebook")}
                      className="flex-1 sm:flex-none text-xs h-7 md:h-auto bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                    >
                      Facebook
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("line")}
                      className="flex-1 sm:flex-none text-xs h-7 md:h-auto bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                    >
                      LINE
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("copy")}
                      className="flex-1 sm:flex-none text-xs h-7 md:h-auto bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? "コピー済み" : "URL"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 詳細情報グリッド - モバイルで1列、デスクトップで2列 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 mb-3 md:mb-8">
              {/* 基本情報 */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="flex items-center gap-1 md:gap-2 text-sm md:text-xl">
                    <Info className="w-4 md:w-6 h-4 md:h-6 text-blue-600" />
                    基本情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-4 text-xs md:text-base">
                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin className="w-3 md:w-5 h-3 md:h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-medium text-gray-700 block">住所</span>
                      <span className="text-gray-600 break-words">{onsen.address}</span>
                    </div>
                  </div>
                  {onsen.phone && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Phone className="w-3 md:w-5 h-3 md:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-700 block">電話番号</span>
                        <a href={`tel:${onsen.phone}`} className="text-blue-600 hover:underline break-all">
                          {onsen.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {onsen.opening_hours && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Clock className="w-3 md:w-5 h-3 md:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-700 block">営業時間</span>
                        <span className="text-gray-600 break-words">{onsen.opening_hours}</span>
                      </div>
                    </div>
                  )}
                  {onsen.holiday && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Calendar className="w-3 md:w-5 h-3 md:h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-700 block">定休日</span>
                        <span className="text-gray-600 break-words">{onsen.holiday}</span>
                      </div>
                    </div>
                  )}
                  {onsen.parking_spaces && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Car className="w-3 md:w-5 h-3 md:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-700 block">駐車場</span>
                        <span className="text-gray-600">{onsen.parking_spaces}台</span>
                      </div>
                    </div>
                  )}
                  {onsen.nearest_station && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Train className="w-3 md:w-5 h-3 md:h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-700 block">最寄り駅</span>
                        <span className="text-gray-600 break-words">{onsen.nearest_station}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 設備・料金 */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="flex items-center gap-1 md:gap-2 text-sm md:text-xl">
                    <Bath className="w-4 md:w-6 h-4 md:h-6 text-blue-600" />
                    設備・料金
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-4 text-xs md:text-base">
                  {onsen.equipment && onsen.equipment.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700 block mb-1 md:mb-2">設備</span>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {onsen.equipment.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="bg-blue-50 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center gap-1 md:gap-2 mb-1">
                        <Users className="w-3 md:w-4 h-3 md:h-4 text-blue-600" />
                        <span className="font-medium text-blue-700 text-xs md:text-sm">大人料金</span>
                      </div>
                      <span className="text-lg md:text-2xl font-bold text-blue-800">
                        ¥{onsen.admission_fee_adult || 1450}
                      </span>
                    </div>
                    <div className="bg-green-50 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center gap-1 md:gap-2 mb-1">
                        <Users className="w-3 md:w-4 h-3 md:h-4 text-green-600" />
                        <span className="font-medium text-green-700 text-xs md:text-sm">小人料金</span>
                      </div>
                      <span className="text-lg md:text-2xl font-bold text-green-800">
                        ¥{onsen.admission_fee_child || 450}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 詳細説明セクション - モバイルでコンパクト */}
            <div className="space-y-3 md:space-y-8">
              {onsen.history_description && (
                <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-xl text-amber-700">温泉の歴史と特徴</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-base text-gray-700 leading-relaxed break-words">
                      {onsen.history_description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {onsen.spring_quality_description && (
                <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-xl text-blue-700">泉質と効能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-base text-gray-700 leading-relaxed break-words">
                      {onsen.spring_quality_description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {onsen.access_description && (
                <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-xl text-green-700">アクセス情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-base text-gray-700 leading-relaxed break-words">
                      {onsen.access_description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {onsen.recommendation_description && (
                <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-xl text-purple-700">おすすめポイント</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-base text-gray-700 leading-relaxed break-words">
                      {onsen.recommendation_description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* アクションボタン - Google マップ表記を明確化 */}
            <Card className="mt-3 md:mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
              <CardContent className="p-2 md:p-6">
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                  {onsen.website_url && (
                    <Button
                      asChild
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg text-xs md:text-base h-8 md:h-auto"
                    >
                      <a href={onsen.website_url} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                        公式サイト
                        <ExternalLink className="w-3 md:w-4 h-3 md:h-4 ml-1 md:ml-2" />
                      </a>
                    </Button>
                  )}
                  {onsen.affiliate_link && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 shadow-lg text-xs md:text-base h-8 md:h-auto bg-transparent"
                    >
                      <a href={onsen.affiliate_link} target="_blank" rel="noopener noreferrer">
                        <Calendar className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                        予約・詳細
                        <ExternalLink className="w-3 md:w-4 h-3 md:h-4 ml-1 md:ml-2" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(onsen.name + " " + onsen.address)}`,
                        "_blank",
                      )
                    }
                    className="flex-1 border-green-300 text-green-600 hover:bg-green-50 shadow-lg text-xs md:text-base h-8 md:h-auto"
                  >
                    <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                    Google マップで見る
                    <ExternalLink className="w-3 md:w-4 h-3 md:h-4 ml-1 md:ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 戻るボタン（下部） - モバイルでコンパクト */}
            <div className="mt-3 md:mt-8 text-center">
              <Link href="/tools/onsenmap">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-1 md:gap-2 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 text-xs md:text-base h-8 md:h-auto"
                >
                  <ArrowLeft className="w-3 md:w-4 h-3 md:h-4" />
                  温泉ランキングマップに戻る
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
