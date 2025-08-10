import { NextRequest, NextResponse } from 'next/server'

// 緯度・経度から地域コードを判定する関数
function getRegionFromCoordinates(lat: number, lng: number) {
  // 簡易的な地域判定（実際のプロジェクトではより詳細な判定が必要）
  if (lat >= 35.5 && lat <= 36.0 && lng >= 139.0 && lng <= 140.0) {
    return { middle: 'kanto', small: 'tokyo', detail: 'A' }  // 東京
  } else if (lat >= 34.5 && lat <= 35.0 && lng >= 135.0 && lng <= 136.0) {
    return { middle: 'kansai', small: 'osaka', detail: 'A' } // 大阪
  } else if (lat >= 34.8 && lat <= 35.2 && lng >= 135.5 && lng <= 136.0) {
    return { middle: 'kansai', small: 'kyoto', detail: 'A' } // 京都
  } else if (lat >= 43.0 && lat <= 44.0 && lng >= 141.0 && lng <= 142.0) {
    return { middle: 'hokkaido', small: 'sapporo', detail: 'A' } // 札幌
  } else {
    // デフォルトは東京
    return { middle: 'kanto', small: 'tokyo', detail: 'A' }
  }
}

// 楽天トラベルAPIの設定
const RAKUTEN_API_CONFIG = {
  applicationId: '1011285080477164382',
  affiliateId: '4b2ecc18.18aa4717.4b2ecc19.83d49175',
  baseUrl: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426',
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')
  const radius = searchParams.get('radius') || '3'

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: 'latitude and longitude are required' },
      { status: 400 }
    )
  }

  console.log('楽天API サーバーサイドリクエスト:', { latitude, longitude, radius })

  // 楽天トラベル空室検索APIのパラメータを構築
  // 緯度・経度から地域を判定して地域コードを設定
  const regionCode = getRegionFromCoordinates(parseFloat(latitude), parseFloat(longitude))
  
  // チェックイン・チェックアウト日を設定（明日・明後日）
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  
  const checkinDate = tomorrow.toISOString().split('T')[0]
  const checkoutDate = dayAfterTomorrow.toISOString().split('T')[0]
  
  const params = new URLSearchParams({
    applicationId: RAKUTEN_API_CONFIG.applicationId,
    affiliateId: RAKUTEN_API_CONFIG.affiliateId,
    largeClassCode: 'japan',
    middleClassCode: regionCode.middle,
    smallClassCode: regionCode.small,
    detailClassCode: regionCode.detail,
    checkinDate: checkinDate,
    checkoutDate: checkoutDate,
    adultNum: '2',
    hits: '10',
    responseType: 'small',
    sort: 'standard',
    format: 'json'
  })

  const url = `${RAKUTEN_API_CONFIG.baseUrl}?${params}`
  console.log('楽天API URL:', url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YokaunitApp/1.0'
      }
    })

    console.log('楽天API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('楽天API error:', response.status, errorText)
      
      return NextResponse.json(
        { 
          error: 'Rakuten API error',
          status: response.status,
          details: errorText
        },
        { status: response.status }
      )
    }

    const data = await response.json()
          console.log('楽天API success, hotels count:', data.hotels?.length || 0)
      console.log('楽天API response structure:', Object.keys(data))
      
      // データが空の場合の詳細ログ
      if (!data.hotels || data.hotels.length === 0) {
        console.log('楽天API 空のレスポンス詳細:')
        console.log('- data:', JSON.stringify(data, null, 2))
      } else {
        console.log('楽天API 最初のホテル情報:')
        const firstHotel = data.hotels[0]?.hotel?.[0]?.hotelBasicInfo
        console.log('- hotel name:', firstHotel?.hotelName)
        console.log('- hotel info:', {
          name: firstHotel?.hotelName,
          minCharge: firstHotel?.hotelMinCharge,
          reviewAverage: firstHotel?.reviewAverage,
          address: firstHotel?.address1 + firstHotel?.address2
        })
      }

    return NextResponse.json(data)
    
  } catch (error) {
    console.error('楽天API fetch error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch from Rakuten API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 