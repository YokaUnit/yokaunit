import { NextResponse } from 'next/server'

// 楽天トラベルAPIの設定
const RAKUTEN_API_CONFIG = {
  applicationId: '1011285080477164382',
  affiliateId: '4b2ecc18.18aa4717.4b2ecc19.83d49175',
  baseUrl: 'https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426',
}

export async function GET() {
  console.log('楽天API認証テスト開始')
  
  // チェックイン・チェックアウト日を動的に生成（今日から30日後、31日後）
  const today = new Date()
  const checkinDate = new Date(today)
  checkinDate.setDate(today.getDate() + 30) // 30日後
  const checkoutDate = new Date(today)
  checkoutDate.setDate(today.getDate() + 31) // 31日後
  
  const checkinDateStr = checkinDate.toISOString().split('T')[0]
  const checkoutDateStr = checkoutDate.toISOString().split('T')[0]
  
  console.log('生成された日付:', { checkinDateStr, checkoutDateStr })
  
  // 楽天トラベルキーワード検索APIを使用（シンプルなキーワード検索）
  const params = new URLSearchParams({
    applicationId: RAKUTEN_API_CONFIG.applicationId,
    affiliateId: RAKUTEN_API_CONFIG.affiliateId,
    keyword: '東京',
    hits: '5',
    format: 'json'
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