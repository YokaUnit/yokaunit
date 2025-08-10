import { createServerSupabaseClient } from "@/lib/supabase"

// 楽天トラベルAPIの設定（サーバーサイドで使用）
const RAKUTEN_API_CONFIG = {
  applicationId: '1011285080477164382',
  affiliateId: '4b2ecc18.18aa4717.4b2ecc19.83d49175'
}

// 楽天APIレスポンスの型定義
interface RakutenHotelResponse {
  hotels: Array<{
    hotel: Array<{
      hotelBasicInfo: {
        hotelNo: number
        hotelName: string
        hotelInformationUrl: string
        planListUrl: string
        dpPlanListUrl: string
        reviewUrl: string
        hotelKanaName: string
        hotelSpecial: string
        hotelMinCharge: number
        latitude: number
        longitude: number
        postalCode: string
        address1: string
        address2: string
        telephoneNo: string
        faxNo: string
        access: string
        parkingInformation: string
        nearestStation: string
        hotelImageUrl: string
        hotelThumbnailUrl: string
        roomImageUrl: string
        roomThumbnailUrl: string
        hotelMapImageUrl: string
        reviewCount: number
        reviewAverage: number
        userReview: string
      }
    }>
  }>
}

export interface OnsenData {
  id: number
  slug: string
  name: string
  description: string
  region: string
  address: string
  latitude: number
  longitude: number
  image_url: string | null
  photo_gallery: string[] | null
  rating: number
  reviews_count: number
  ranking: number
  equipment: string[] | null
  admission_fee_adult: number | null
  admission_fee_child: number | null
  opening_hours: string | null
  holiday: string | null
  parking_spaces: number | null
  phone: string | null
  nearest_station: string | null
  website_url: string | null
  affiliate_link: string | null
  history_description: string | null
  spring_quality_description: string | null
  access_description: string | null
  recommendation_description: string | null
  created_at: string
  updated_at: string
}

export interface AccommodationData {
  id: number
  name: string
  type: string
  description: string
  address: string
  latitude: number
  longitude: number
  image_url: string | null
  rating: number
  reviews_count: number
  price_range: {
    min: number
    max: number
  }
  check_in: string
  check_out: string
  onsen_bath: boolean
  wifi: boolean
  parking: boolean
  jalan_link: string | null
  rakuten_link: string | null
  official_website: string | null
  distance_to_onsen: number | null
  related_onsen_id: number | null
  created_at: string
  updated_at: string
}

// 楽天トラベルAPIから宿泊施設データを取得（サーバーサイド経由）
async function fetchRakutenHotels(latitude: number, longitude: number, radius: number = 3): Promise<AccommodationData[]> {
  // サーバーサイドのAPIルート経由で楽天APIを呼び出し
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString()
  })

  const url = `/api/rakuten-hotels?${params}`
  console.log('サーバーサイドAPI経由で楽天API呼び出し:', url)
  console.log('座標:', { latitude, longitude, radius })

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    console.log('サーバーサイドAPI response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      console.error('サーバーサイドAPI error:', response.status, errorData)
      return []
    }

    const data: RakutenHotelResponse = await response.json()
    console.log('楽天API response data structure:', {
      hasHotels: !!data.hotels,
      hotelsLength: data.hotels?.length || 0,
      firstHotelStructure: data.hotels?.[0] ? Object.keys(data.hotels[0]) : [],
      rawResponseKeys: Object.keys(data)
    })
    
    if (!data.hotels || data.hotels.length === 0) {
      console.log('楽天API: No hotels found for coordinates:', latitude, longitude)
      return []
    }

    console.log('楽天API: 正常にホテルデータを取得しました:', data.hotels.length, '件')

    return data.hotels.map((hotelWrapper, index) => {
      try {
        const hotel = hotelWrapper.hotel[0]
        const hotelInfo = hotel.hotelBasicInfo

        // 楽天のアフィリエイトリンクを生成
        const rakutenLink = `${hotelInfo.dpPlanListUrl}?f_ik=${RAKUTEN_API_CONFIG.affiliateId}`

        return {
          id: hotelInfo.hotelNo,
          name: hotelInfo.hotelName,
          type: 'hotel',
          description: hotelInfo.hotelSpecial || hotelInfo.userReview || `${hotelInfo.hotelName}の宿泊施設`,
          address: `${hotelInfo.address1}${hotelInfo.address2}`,
          latitude: hotelInfo.latitude,
          longitude: hotelInfo.longitude,
          image_url: hotelInfo.hotelImageUrl || hotelInfo.hotelThumbnailUrl,
          rating: hotelInfo.reviewAverage || 0,
          reviews_count: hotelInfo.reviewCount || 0,
          price_range: {
            min: hotelInfo.hotelMinCharge || 8000,
            max: hotelInfo.hotelMinCharge ? hotelInfo.hotelMinCharge * 2 : 16000
          },
          check_in: '15:00',
          check_out: '10:00',
          onsen_bath: hotelInfo.hotelSpecial?.includes('温泉') || hotelInfo.hotelName.includes('温泉') || false,
          wifi: true,
          parking: !!hotelInfo.parkingInformation,
          jalan_link: null,
          rakuten_link: rakutenLink,
          official_website: hotelInfo.hotelInformationUrl,
          distance_to_onsen: null,
          related_onsen_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      } catch (itemError) {
        console.error('ホテルデータ変換エラー (インデックス:', index, '):', itemError)
        return null
      }
    }).filter(Boolean) as AccommodationData[]
    
  } catch (error) {
    console.error('楽天API fetch error:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack)
    }
    return []
  }
}

// 2点間の距離を計算（km）
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // 地球の半径（km）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// データベースから温泉データを取得
export async function getOnsenData(): Promise<OnsenData[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("onsens").select("*").order("ranking", { ascending: true })

  if (error) {
    console.error("Error fetching onsen data:", error)
    return []
  }

  return data || []
}

// 個別温泉データ取得
export async function getOnsenBySlug(slug: string): Promise<OnsenData | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("onsens").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching onsen by slug:", error)
    return null
  }

  return data
}

// 地域別温泉データ取得
export async function getOnsenByRegion(region: string): Promise<OnsenData[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("onsens")
    .select("*")
    .eq("region", region)
    .order("ranking", { ascending: true })

  if (error) {
    console.error("Error fetching onsen by region:", error)
    return []
  }

  return data || []
}

// ランキング順でソート済みデータ取得
export async function getOnsenDataSorted(): Promise<OnsenData[]> {
  return getOnsenData()
}

// 宿泊施設データを楽天APIから取得（複数の温泉地点を基準に）
export async function getAccommodationData(): Promise<AccommodationData[]> {
  try {
    console.log('宿泊施設データ取得開始')
    
    // 主要温泉地の座標を取得
    const onsens = await getOnsenData()
    
    if (onsens.length === 0) {
      console.log('温泉データが見つかりません')
      return []
    }

    console.log(`取得した温泉数: ${onsens.length}`)

    // まず東京駅周辺でテスト（固定座標）
    console.log('🏨 楽天API テスト: 東京駅周辺で検索中...')
    const tokyoStationTest = await fetchRakutenHotels(35.6812, 139.7671, 5)
    console.log('🏨 東京駅周辺テスト結果:', tokyoStationTest.length, '件')
    
    if (tokyoStationTest.length > 0) {
      console.log('🏨 東京駅周辺ホテル例:', tokyoStationTest.slice(0, 2).map(h => ({ name: h.name, rating: h.rating })))
    }
    
    if (tokyoStationTest.length > 0) {
      console.log('✓ 楽天API正常動作確認。温泉地周辺を検索します。')
      
      // API制限を考慮して上位1位のみの温泉地周辺のホテルを取得
      const topOnsens = onsens.slice(0, 1)
      console.log('検索対象温泉:', topOnsens.map(o => ({ name: o.name, lat: o.latitude, lng: o.longitude })))
      
      const accommodationPromises = topOnsens.map(onsen => 
        fetchRakutenHotels(onsen.latitude, onsen.longitude, 10) // 10km範囲で検索
      )

      console.log('楽天API並列リクエスト実行中...')
      const accommodationResults = await Promise.all(accommodationPromises)
    
      // 結果をフラット化し、重複を除去
      const allAccommodations = accommodationResults.flat()
      console.log(`楽天APIから取得した宿泊施設数: ${allAccommodations.length}`)
      
      const uniqueAccommodations = new Map<number, AccommodationData>()
      
      allAccommodations.forEach((accommodation: AccommodationData) => {
        if (!uniqueAccommodations.has(accommodation.id)) {
          // 最寄りの温泉までの距離を計算
          let minDistance = Infinity
          let nearestOnsenId = null
          
          topOnsens.forEach((onsen: any) => {
          const distance = calculateDistance(
            accommodation.latitude, 
            accommodation.longitude,
            onsen.latitude,
            onsen.longitude
          )
          if (distance < minDistance) {
            minDistance = distance
            nearestOnsenId = onsen.id
          }
        })
        
        accommodation.distance_to_onsen = Math.round(minDistance * 10) / 10 // 小数点1桁
        accommodation.related_onsen_id = nearestOnsenId
        
        uniqueAccommodations.set(accommodation.id, accommodation)
      }
    })

    const finalAccommodations = Array.from(uniqueAccommodations.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 30) // 最大30件に制限
    
    console.log(`最終的な宿泊施設数: ${finalAccommodations.length}`)
    
    // デバッグ用：最初の3件の宿泊施設情報を出力
    if (finalAccommodations.length > 0) {
      console.log('宿泊施設データサンプル (最初の3件):')
      finalAccommodations.slice(0, 3).forEach((acc, index) => {
        console.log(`${index + 1}. ${acc.name} (緯度: ${acc.latitude}, 経度: ${acc.longitude}, 評価: ${acc.rating})`)
      })
    } else {
      console.warn('⚠️ 宿泊施設データが0件です。楽天APIの取得に失敗している可能性があります。')
    }
    
      return finalAccommodations

    } else {
      console.warn('⚠️ 楽天API動作不良。東京駅周辺のデータを使用します。')
      return tokyoStationTest // 空配列が返される
    }

  } catch (error) {
    console.error("Error fetching accommodation data from Rakuten API:", error)
    return []
  }
}

// 宿泊施設タイプのラベル取得
export function getAccommodationTypeLabel(type: string): string {
  const typeLabels: { [key: string]: string } = {
    hotel: "ホテル",
    ryokan: "旅館",
    guesthouse: "ゲストハウス",
    pension: "ペンション",
    minshuku: "民宿",
  }

  return typeLabels[type] || type
}
