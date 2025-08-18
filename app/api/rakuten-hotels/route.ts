import { NextRequest, NextResponse } from 'next/server'

// 緯度・経度からキーワードを生成する関数
function getKeywordFromCoordinates(lat: number, lng: number): string {
  // 座標に基づいて適切な地域キーワードを返す
  if (lat >= 35.0 && lat <= 36.5 && lng >= 138.5 && lng <= 140.5) {
    return '東京'  // 東京地域
  } else if (lat >= 34.0 && lat <= 35.5 && lng >= 134.5 && lng <= 136.5) {
    return '大阪' // 関西地方
  } else if (lat >= 42.5 && lat <= 44.5 && lng >= 140.5 && lng <= 142.5) {
    return '札幌' // 北海道
  } else {
    // デフォルトは東京
    return '東京'
  }
}

// 楽天トラベルAPIの設定
const RAKUTEN_API_CONFIG = {
  applicationId: '1011285080477164382',
  affiliateId: '4b2ecc18.18aa4717.4b2ecc19.83d49175',
  baseUrl: 'https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426',
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

  // 楽天トラベルキーワード検索APIのパラメータを構築
  // 座標に基づいて適切なキーワードを生成
  const keyword = getKeywordFromCoordinates(parseFloat(latitude), parseFloat(longitude))
  
  const params = new URLSearchParams({
    applicationId: RAKUTEN_API_CONFIG.applicationId,
    affiliateId: RAKUTEN_API_CONFIG.affiliateId,
    keyword: keyword,  // 地域キーワード
    hits: '30',        // 件数を適度に増やす
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