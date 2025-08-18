"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Crown, X, MapPin, Menu, Hotel } from "lucide-react"
import { getOnsenDataSorted, getAccommodationData, type OnsenData, type AccommodationData } from "./lib/onsen-data"
import AccommodationList from "./components/AccommodationList"

// React Leafletを動的インポート（SSR回避）
const OnsenMap = dynamic(() => import("./components/OnsenMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">地図を読み込み中...</p>
      </div>
    </div>
  ),
})

export default function OnsenMapClient() {
  const [onsens, setOnsens] = useState<OnsenData[]>([])
  const [accommodations, setAccommodations] = useState<AccommodationData[]>([])
  const [filteredOnsens, setFilteredOnsens] = useState<OnsenData[]>([])
  const [selectedOnsen, setSelectedOnsen] = useState<OnsenData | null>(null)
  const [searchSelectedOnsen, setSearchSelectedOnsen] = useState<OnsenData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"ranking" | "rating" | "reviews">("ranking")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showDesktopSearch, setShowDesktopSearch] = useState(false)
  const [searchTab, setSearchTab] = useState<"onsens" | "accommodations">("onsens")
  const mapRef = useRef<L.Map>(null)

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // データ読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [onsenData, accommodationData] = await Promise.all([getOnsenDataSorted(), getAccommodationData()])
        console.log('OnsenMapClient データ読み込み完了:')
        console.log('- 温泉データ数:', onsenData.length)
        console.log('- 宿泊施設データ数:', accommodationData.length)
        
        setOnsens(onsenData)
        setAccommodations(accommodationData)
        setFilteredOnsens(onsenData)
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // フィルタリング処理
  useEffect(() => {
    let filtered = [...onsens]

    // 地域フィルター
    if (selectedRegion !== "all") {
      filtered = filtered.filter((onsen) => onsen.region === selectedRegion)
    }

    // 検索フィルター
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (onsen) =>
          onsen.name.toLowerCase().includes(term) ||
          onsen.region.toLowerCase().includes(term) ||
          onsen.address.toLowerCase().includes(term) ||
          (onsen.description && onsen.description.toLowerCase().includes(term)),
      )
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews_count - a.reviews_count
        default:
          return a.ranking - b.ranking
      }
    })

    setFilteredOnsens(filtered)
  }, [onsens, selectedRegion, searchTerm, sortBy])

  // 地域一覧を取得
  const regions = Array.from(new Set(onsens.map((onsen) => onsen.region))).sort()

  // 温泉選択ハンドラー
  const handleOnsenSelect = (onsen: OnsenData) => {
    setSelectedOnsen(onsen)
    setSearchSelectedOnsen(null)
    if (isMobile) {
      setShowMobileSearch(false)
    } else {
      setShowDesktopSearch(false)
    }
  }

  // 検索結果から温泉選択
  const handleSearchOnsenSelect = (onsen: OnsenData) => {
    setSearchSelectedOnsen(onsen)
    setSelectedOnsen(onsen)
    if (isMobile) {
      setShowMobileSearch(false)
    } else {
      setShowDesktopSearch(false)
    }
  }

  // 検索結果から宿泊施設選択
  const handleSearchAccommodationSelect = (accommodation: AccommodationData) => {
    // 宿泊施設の位置にズームして、そのピンのポップアップを開く
    setSelectedOnsen(null)
    setSearchSelectedOnsen(null)
    
    // マップを宿泊施設の位置に移動（ズームレベル15で詳細表示）
    if (mapRef.current) {
      mapRef.current.setView([accommodation.latitude, accommodation.longitude], 15, {
        animate: true,
        duration: 1,
      })

      // 少し遅れてポップアップを開く
      setTimeout(() => {
        if (mapRef.current) {
          // @ts-ignore
          mapRef.current.eachLayer((layer: any) => {
            // Leafletのマーカーかどうかを動的に確認
            if (layer.getLatLng && typeof layer.openPopup === 'function') {
              const markerLatLng = layer.getLatLng()
              // 宿泊施設の座標と一致するマーカーを探す
              if (
                Math.abs(markerLatLng.lat - accommodation.latitude) < 0.0001 &&
                Math.abs(markerLatLng.lng - accommodation.longitude) < 0.0001
              ) {
                layer.openPopup()
              }
            }
          })
        }
      }, 500)
    }
    
    if (isMobile) {
      setShowMobileSearch(false)
    } else {
      setShowDesktopSearch(false)
    }
  }

  // フィルターリセット
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedRegion("all")
    setSortBy("ranking")
  }

  // ズーム変更ハンドラー（宿泊施設表示制御用）
  const handleZoomChange = (zoomLevel: number) => {
    // ズームレベルに応じて宿泊施設の表示を制御
    // 現在は OnsenMap コンポーネント内で処理
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">温泉データを読み込み中</h2>
          <p className="text-gray-600">しばらくお待ちください...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* 地図エリア（フルスクリーン） */}
      <div className="flex-1 relative">
        <OnsenMap
          onsens={filteredOnsens}
          accommodations={accommodations}
          selectedOnsen={selectedOnsen}
          onOnsenSelect={handleOnsenSelect}
          searchSelectedOnsen={searchSelectedOnsen}
          onZoomChange={handleZoomChange}
          mapRef={mapRef}
        />

        {/* 検索ボタン - 地図の右上に配置（透明） */}
        <div className="absolute top-4 right-4 z-30">
          {/* デスクトップ用検索ボタン */}
          <div className="hidden md:block">
            <Sheet open={showDesktopSearch} onOpenChange={setShowDesktopSearch}>
              <Button
                onClick={() => setShowDesktopSearch(true)}
                className="shadow-xl bg-white/70 hover:bg-white/80 text-gray-700 border border-gray-200/50 backdrop-blur-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                温泉・宿泊施設検索
                {(searchTerm || selectedRegion !== "all" || sortBy !== "ranking") && (
                  <Badge variant="destructive" className="ml-2 h-4 w-4 p-0 text-xs animate-pulse">
                    !
                  </Badge>
                )}
              </Button>
              <SheetContent side="bottom" className="h-[85vh] z-50 flex flex-col">
                <SheetHeader className="mb-4 flex-shrink-0">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    温泉・宿泊施設検索
                  </SheetTitle>
                </SheetHeader>

                {/* 検索フォーム */}
                <div className="space-y-4 mb-4 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="温泉名・地域で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                    {searchTerm && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="flex-1 h-10">
                        <SelectValue placeholder="地域" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全地域</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={sortBy}
                      onValueChange={(value: "ranking" | "rating" | "reviews") => setSortBy(value)}
                    >
                      <SelectTrigger className="flex-1 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ranking">ランキング</SelectItem>
                        <SelectItem value="rating">評価順</SelectItem>
                        <SelectItem value="reviews">口コミ数</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-bold px-2 py-1 text-xs">
                      {filteredOnsens.length}件の温泉
                    </Badge>
                    {(searchTerm || selectedRegion !== "all" || sortBy !== "ranking") && (
                      <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs h-7 bg-transparent">
                        <X className="w-3 h-3 mr-1" />
                        リセット
                      </Button>
                    )}
                  </div>


                </div>

                {/* タブ付き検索結果リスト */}
                <Tabs value={searchTab} onValueChange={(value) => setSearchTab(value as "onsens" | "accommodations")} className="flex-1 flex flex-col min-h-0">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="onsens" className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      温泉 ({filteredOnsens.length})
                    </TabsTrigger>
                    <TabsTrigger value="accommodations" className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      宿泊施設 ({accommodations.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="onsens" className="flex-1 overflow-y-auto min-h-0 mt-4">
                  <div className="space-y-2 pb-4">
                    {filteredOnsens.map((onsen) => (
                      <Card
                        key={onsen.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedOnsen?.id === onsen.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => handleSearchOnsenSelect(onsen)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  onsen.ranking <= 3
                                    ? "bg-red-500"
                                    : onsen.ranking <= 10
                                      ? "bg-orange-500"
                                      : "bg-blue-500"
                                }`}
                              >
                                {onsen.ranking}
                              </div>
                              {onsen.ranking <= 3 && <Crown className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{onsen.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">{onsen.name}</h3>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{onsen.region}</span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{onsen.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="accommodations" className="flex-1 overflow-y-auto min-h-0 mt-4">
                    <AccommodationList
                      accommodations={accommodations}
                      onAccommodationSelect={handleSearchAccommodationSelect}
                    />
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>

          {/* モバイル用検索ボタン */}
          <div className="md:hidden">
            <Sheet open={showMobileSearch} onOpenChange={setShowMobileSearch}>
              <Button
                onClick={() => setShowMobileSearch(true)}
                className="shadow-xl bg-white/70 hover:bg-white/80 text-gray-700 border border-gray-200/50 backdrop-blur-sm"
              >
                <Menu className="w-4 h-4 mr-2" />
                検索
                {(searchTerm || selectedRegion !== "all" || sortBy !== "ranking") && (
                  <Badge variant="destructive" className="ml-2 h-4 w-4 p-0 text-xs animate-pulse">
                    !
                  </Badge>
                )}
              </Button>
              <SheetContent side="bottom" className="h-[85vh] z-50 flex flex-col">
                <SheetHeader className="mb-4 flex-shrink-0">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    温泉・宿泊施設検索
                  </SheetTitle>
                </SheetHeader>

                {/* 検索フォーム */}
                <div className="space-y-4 mb-4 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="温泉名・地域で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                    {searchTerm && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="flex-1 h-10">
                        <SelectValue placeholder="地域" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全地域</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={sortBy}
                      onValueChange={(value: "ranking" | "rating" | "reviews") => setSortBy(value)}
                    >
                      <SelectTrigger className="flex-1 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ranking">ランキング</SelectItem>
                        <SelectItem value="rating">評価順</SelectItem>
                        <SelectItem value="reviews">口コミ数</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-bold px-2 py-1 text-xs">
                      {filteredOnsens.length}件の温泉
                    </Badge>
                    {(searchTerm || selectedRegion !== "all" || sortBy !== "ranking") && (
                      <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs h-7 bg-transparent">
                        <X className="w-3 h-3 mr-1" />
                        リセット
                      </Button>
                    )}
                  </div>


                </div>

                {/* タブ付き検索結果リスト */}
                <Tabs value={searchTab} onValueChange={(value) => setSearchTab(value as "onsens" | "accommodations")} className="flex-1 flex flex-col min-h-0">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="onsens" className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      温泉 ({filteredOnsens.length})
                    </TabsTrigger>
                    <TabsTrigger value="accommodations" className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      宿泊施設 ({accommodations.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="onsens" className="flex-1 overflow-y-auto min-h-0 mt-4">
                  <div className="space-y-2 pb-4">
                    {filteredOnsens.map((onsen) => (
                      <Card
                        key={onsen.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedOnsen?.id === onsen.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => handleSearchOnsenSelect(onsen)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  onsen.ranking <= 3
                                    ? "bg-red-500"
                                    : onsen.ranking <= 10
                                      ? "bg-orange-500"
                                      : "bg-blue-500"
                                }`}
                              >
                                {onsen.ranking}
                              </div>
                              {onsen.ranking <= 3 && <Crown className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{onsen.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">{onsen.name}</h3>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{onsen.region}</span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{onsen.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="accommodations" className="flex-1 overflow-y-auto min-h-0 mt-4">
                    <AccommodationList
                      accommodations={accommodations}
                      onAccommodationSelect={handleSearchAccommodationSelect}
                    />
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
