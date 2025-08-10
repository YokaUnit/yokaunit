import { NextResponse } from 'next/server'

// 楽天トラベルAPIの設定
const RAKUTEN_API_CONFIG = {
  applicationId: '1011285080477164382',
  affiliateId: '4b2ecc18.18aa4717.4b2ecc19.83d49175',
  baseUrl: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426',
}

export async function GET() {
  console.log('楽天API認証テスト開始')
  
  // 楽天トラベル空室検索APIを使用（地域コード指定）
  // 東京都（関東地方）のホテルを検索
  const params = new URLSearchParams({
    applicationId: RAKUTEN_API_CONFIG.applicationId,
    affiliateId: RAKUTEN_API_CONFIG.affiliateId,
    largeClassCode: 'japan',      // 日本
    middleClassCode: 'kanto',     // 関東
    smallClassCode: 'tokyo',      // 東京
    detailClassCode: 'A',         // 東京都詳細クラスコード
    checkinDate: '2025-01-25',    // チェックイン日（明日）
    checkoutDate: '2025-01-26',   // チェックアウト日（明後日）
    adultNum: '2',                // 大人2名
    hits: '5',                    // 取得件数
    responseType: 'small',        // レスポンスタイプ
    sort: 'standard',             // ソート
    format: 'json'                // フォーマット
  })

  const url = `${RAKUTEN_API_CONFIG.baseUrl}?${params}`
  console.log('テスト用楽天API URL:', url)
  console.log('パラメータ:', Object.fromEntries(params))

  try {
    const response = await fetch(url)
    
    console.log('楽天API response status:', response.status)
    console.log('楽天API response headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('楽天API raw response (最初の500文字):', responseText.substring(0, 500))

    if (!response.ok) {
      console.error('楽天API error response:', responseText)
      
      return NextResponse.json({
        success: false,
        status: response.status,
        error: responseText,
        testUrl: url
      })
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({
        success: false,
        error: 'Invalid JSON response',
        rawResponse: responseText.substring(0, 1000)
      })
    }

    console.log('楽天API parsed response:', {
      hasHotels: !!data.hotels,
      hotelsCount: data.hotels?.length || 0,
      responseKeys: Object.keys(data)
    })

    return NextResponse.json({
      success: true,
      hotelsCount: data.hotels?.length || 0,
      data: data,
      testUrl: url
    })
    
  } catch (error) {
    console.error('楽天API fetch error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      testUrl: url
    })
  }
} 