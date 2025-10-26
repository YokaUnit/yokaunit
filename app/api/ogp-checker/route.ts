import { NextRequest, NextResponse } from "next/server"

// メモリキャッシュ（本番環境ではRedis等を使用推奨）
const cache = new Map<string, { data: any; timestamp: number }>()
const imageCache = new Map<string, { data: ArrayBuffer; contentType: string; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分
const IMAGE_CACHE_DURATION = 30 * 60 * 1000 // 30分

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const imageUrl = searchParams.get("imageUrl")

  // 画像プロキシ機能
  if (imageUrl) {
    return await proxyImage(imageUrl)
  }

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // URLの検証
    new URL(url)
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
  }

  // キャッシュチェック
  const cacheKey = url
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    const response_data = NextResponse.json(cached.data)
    response_data.headers.set('Access-Control-Allow-Origin', '*')
    response_data.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response_data.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response_data.headers.set('Cache-Control', 'public, max-age=300') // 5分キャッシュ
    return response_data
  }

  try {
    // HTMLを取得
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGP-Checker/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      redirect: 'follow',
      timeout: 10000,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    
    // メタデータを抽出
    const metaData = extractMetaData(html, url)
    
    // キャッシュに保存
    cache.set(cacheKey, { data: metaData, timestamp: Date.now() })
    
    // CORSヘッダーを追加
    const response_data = NextResponse.json(metaData)
    response_data.headers.set('Access-Control-Allow-Origin', '*')
    response_data.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response_data.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response_data.headers.set('Cache-Control', 'public, max-age=300') // 5分キャッシュ
    
    return response_data
  } catch (error) {
    console.error("Error fetching URL:", error)
    const errorResponse = NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch URL" },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

async function proxyImage(imageUrl: string) {
  try {
    // URLの検証
    new URL(imageUrl)
  } catch {
    return NextResponse.json({ error: "Invalid image URL format" }, { status: 400 })
  }

  // 画像キャッシュチェック
  const cached = imageCache.get(imageUrl)
  if (cached && Date.now() - cached.timestamp < IMAGE_CACHE_DURATION) {
    return new NextResponse(cached.data, {
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=1800', // 30分キャッシュ
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGP-Checker/1.0)',
        'Accept': 'image/*',
      },
      timeout: 10000,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/jpeg'

    // 画像キャッシュに保存
    imageCache.set(imageUrl, { 
      data: imageData, 
      contentType, 
      timestamp: Date.now() 
    })

    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=1800', // 30分キャッシュ
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error("Error fetching image:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch image" },
      { status: 500 }
    )
  }
}

function extractMetaData(html: string, baseUrl: string) {
  const metaData: any = {}

  // 正規表現でメタタグを抽出
  const metaRegex = /<meta[^>]+>/gi
  const linkRegex = /<link[^>]+>/gi
  const titleRegex = /<title[^>]*>([^<]*)<\/title>/i

  // titleタグ
  const titleMatch = html.match(titleRegex)
  if (titleMatch) {
    metaData.title = titleMatch[1].trim()
  }

  // metaタグ
  const metaMatches = html.match(metaRegex) || []
  metaMatches.forEach((meta) => {
    const nameMatch = meta.match(/name=["']([^"']+)["']/i)
    const propertyMatch = meta.match(/property=["']([^"']+)["']/i)
    const contentMatch = meta.match(/content=["']([^"']+)["']/i)
    
    if (contentMatch) {
      const content = contentMatch[1]
      
      if (nameMatch) {
        const name = nameMatch[1].toLowerCase()
        switch (name) {
          case 'description':
            metaData.description = content
            break
          case 'keywords':
            metaData.keywords = content
            break
          case 'author':
            metaData.author = content
            break
          case 'robots':
            metaData.robots = content
            break
          case 'viewport':
            metaData.viewport = content
            break
          case 'charset':
            metaData.charset = content
            break
          case 'theme-color':
            metaData.themeColor = content
            break
        }
      }
      
      if (propertyMatch) {
        const property = propertyMatch[1].toLowerCase()
        switch (property) {
          case 'og:title':
            metaData.title = metaData.title || content
            break
          case 'og:description':
            metaData.description = metaData.description || content
            break
          case 'og:image':
            metaData.image = resolveUrl(content, baseUrl)
            break
          case 'og:url':
            metaData.url = resolveUrl(content, baseUrl)
            break
          case 'og:site_name':
            metaData.siteName = content
            break
          case 'og:type':
            metaData.type = content
            break
          case 'og:locale':
            metaData.locale = content
            break
        }
      }
    }
  })

  // Twitter Card
  const twitterMatches = html.match(metaRegex) || []
  twitterMatches.forEach((meta) => {
    const nameMatch = meta.match(/name=["']([^"']+)["']/i)
    const contentMatch = meta.match(/content=["']([^"']+)["']/i)
    
    if (nameMatch && contentMatch) {
      const name = nameMatch[1].toLowerCase()
      const content = contentMatch[1]
      
      switch (name) {
        case 'twitter:card':
          metaData.twitterCard = content
          break
        case 'twitter:title':
          metaData.twitterTitle = content
          break
        case 'twitter:description':
          metaData.twitterDescription = content
          break
        case 'twitter:image':
          metaData.twitterImage = resolveUrl(content, baseUrl)
          break
        case 'twitter:site':
          metaData.twitterSite = content
          break
        case 'twitter:creator':
          metaData.twitterCreator = content
          break
      }
    }
  })

  // linkタグ
  const linkMatches = html.match(linkRegex) || []
  linkMatches.forEach((link) => {
    const relMatch = link.match(/rel=["']([^"']+)["']/i)
    const hrefMatch = link.match(/href=["']([^"']+)["']/i)
    
    if (relMatch && hrefMatch) {
      const rel = relMatch[1].toLowerCase()
      const href = resolveUrl(hrefMatch[1], baseUrl)
      
      switch (rel) {
        case 'canonical':
          metaData.canonical = href
          break
        case 'icon':
        case 'shortcut icon':
          metaData.favicon = href
          break
        case 'apple-touch-icon':
          metaData.appleTouchIcon = href
          break
        case 'manifest':
          metaData.manifest = href
          break
      }
    }
  })

  return metaData
}

function resolveUrl(url: string, baseUrl: string): string {
  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return url
  }
}
