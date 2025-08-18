'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, ExternalLink, Loader2 } from 'lucide-react'
import { AccommodationData } from '../lib/onsen-data'

interface RecommendedHotelsProps {
  title?: string
  maxHotels?: number
}

export default function RecommendedHotels({ 
  title = "楽天トラベル おすすめホテル", 
  maxHotels = 6 
}: RecommendedHotelsProps) {
  const [hotels, setHotels] = useState<AccommodationData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendedHotels = async () => {
      try {
        setIsLoading(true)
        
        // API制限を考慮して東京のみから検索（テスト用）
        const locations = [
          { name: '東京', lat: 35.6812, lng: 139.7671, radius: 5 }
        ]

        const hotelPromises = locations.map(async (location) => {
          try {
            const response = await fetch(
              `/api/rakuten-hotels?latitude=${location.lat}&longitude=${location.lng}&radius=${location.radius}`
            )
            
            if (!response.ok) {
              console.warn(`${location.name}のホテル取得に失敗:`, response.status)
              return []
            }
            
            const data = await response.json()
            
            if (data.hotels && data.hotels.length > 0) {
              return data.hotels.slice(0, 2).map((hotel: any) => ({
                id: parseInt(hotel.hotel[0].hotelBasicInfo.hotelNo) || Math.random(),
                name: hotel.hotel[0].hotelBasicInfo.hotelName || 'ホテル名不明',
                latitude: (() => {
                  const rawLat = parseFloat(hotel.hotel[0].hotelBasicInfo.latitude)
                  if (rawLat >= 24 && rawLat <= 46) return rawLat
                  const lat3 = rawLat / 10000
                  if (lat3 >= 24 && lat3 <= 46) return lat3
                  const lat2 = rawLat / 1000000
                  if (lat2 >= 24 && lat2 <= 46) return lat2
                  return location.lat
                })(),
                longitude: (() => {
                  const rawLng = parseFloat(hotel.hotel[0].hotelBasicInfo.longitude)
                  if (rawLng >= 123 && rawLng <= 146) return rawLng
                  const lng3 = rawLng / 10000
                  if (lng3 >= 123 && lng3 <= 146) return lng3
                  const lng2 = rawLng / 1000000
                  if (lng2 >= 123 && lng2 <= 146) return lng2
                  return location.lng
                })(),
                rating: parseFloat(hotel.hotel[0].hotelBasicInfo.reviewAverage) || 0,
                price: parseInt(hotel.hotel[0].hotelBasicInfo.hotelMinCharge) || 0,
                image_url: hotel.hotel[0].hotelBasicInfo.hotelImageUrl || '/placeholder.jpg',
                url: hotel.hotel[0].hotelBasicInfo.hotelInformationUrl || '#',
                address: hotel.hotel[0].hotelBasicInfo.address1 + hotel.hotel[0].hotelBasicInfo.address2 || `${location.name}周辺`,
                area: location.name
              }))
            }
            return []
          } catch (error) {
            console.warn(`${location.name}のホテル取得エラー:`, error)
            return []
          }
        })

        const results = await Promise.all(hotelPromises)
        const allHotels = results.flat().slice(0, maxHotels)
        
        console.log('おすすめホテル取得完了:', allHotels.length, '件')
        setHotels(allHotels)
        
      } catch (error) {
        console.error('おすすめホテル取得エラー:', error)
        setError('ホテル情報の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendedHotels()
  }, [maxHotels])

  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">ホテル情報を取得中...</span>
        </div>
      </div>
    )
  }

  if (error || hotels.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            {error || 'ホテル情報が見つかりませんでした'}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
          >
            再読み込み
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={hotel.image_url}
                alt={hotel.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg'
                }}
              />
              {hotel.area && (
                <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                  <MapPin className="w-3 h-3 mr-1" />
                  {hotel.area}
                </Badge>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
                {hotel.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {hotel.rating > 0 && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {hotel.price > 0 && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        ¥{hotel.price.toLocaleString()}〜
                      </div>
                      <div className="text-xs text-gray-500">1泊1室</div>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {hotel.address}
                </p>
                
                <Button 
                  asChild
                  className="w-full"
                  size="sm"
                >
                  <a 
                    href={hotel.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    詳細を見る
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          ※ 価格・空室状況は楽天トラベルサイトでご確認ください
        </p>
      </div>
    </div>
  )
} 