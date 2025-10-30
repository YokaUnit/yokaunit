import { NextRequest, NextResponse } from "next/server"

// メモリキャッシュ（本番環境ではRedis等を使用推奨）
const cache = new Map<string, { data: any; timestamp: number }>()
const imageCache = new Map<string, { data: ArrayBuffer; contentType: string; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分
const IMAGE_CACHE_DURATION = 30 * 60 * 1000 // 30分

async function handleOGPCheck(request: NextRequest, url: string) {
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
    // HTMLを取得（AbortControllerでタイムアウト制御）
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja,en;q=0.5',
        'Connection': 'keep-alive',
      },
      redirect: 'follow',
      signal: controller.signal,
      // Next.js fetch caches by default in some modes; we want fresh content for checks
      cache: 'no-store',
    })
    clearTimeout(timeoutId)

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

  return await handleOGPCheck(request, url)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required in request body" }, { status: 400 })
    }

    return await handleOGPCheck(request, url)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': new URL(imageUrl).origin,
      },
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeoutId)

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

  // 正規表現でメタ/リンクタグを抽出
  const metaRegex = /<meta[^>]+>/gi
  const linkRegex = /<link[^>]+>/gi
  const titleRegex = /<title[^>]*>([^<]*)<\/title>/i

  // titleタグ
  const titleMatch = html.match(titleRegex)
  if (titleMatch) {
    metaData.title = titleMatch[1].trim()
  }

  // 画像候補（出現順を維持）
  type ImageCandidate = { url: string; width?: number; height?: number; alt?: string }
  const imageCandidates: ImageCandidate[] = []
  const pushOrUpdateLast = (partial: Partial<ImageCandidate> & { url?: string }) => {
    if (partial.url) {
      imageCandidates.push({ url: resolveUrl(partial.url, baseUrl) })
      return
    }
    const last = imageCandidates[imageCandidates.length - 1]
    if (last) {
      if (typeof partial.width === 'number') last.width = partial.width
      if (typeof partial.height === 'number') last.height = partial.height
      if (typeof partial.alt === 'string') last.alt = partial.alt
    }
  }

  // metaタグ（一般 + OG + Twitter）
  const metaMatches = html.match(metaRegex) || []
  metaMatches.forEach((meta) => {
    const nameMatch = meta.match(/name=["']([^"']+)["']/i)
    const propertyMatch = meta.match(/property=["']([^"']+)["']/i)
    const contentMatch = meta.match(/content=["']([^"']+)["']/i)
    if (!contentMatch) return
    const content = contentMatch[1]

    if (nameMatch) {
      const name = nameMatch[1].toLowerCase()
      switch (name) {
        case 'description':
          if (!metaData.description) metaData.description = content
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
        // Twitter
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
        case 'twitter:image:src':
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

    if (propertyMatch) {
      const property = propertyMatch[1].toLowerCase()
      switch (property) {
        // Twitter as property as well
        case 'twitter:image':
        case 'twitter:image:src':
          metaData.twitterImage = resolveUrl(content, baseUrl)
          break
        case 'og:title':
          if (!metaData.title) metaData.title = content
          break
        case 'og:description':
          if (!metaData.description) metaData.description = content
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
        // 画像関連（順序に基づきwidth/height/altを直前の候補に付与）
        case 'og:image':
        case 'og:image:url':
        case 'og:image:secure_url':
          pushOrUpdateLast({ url: content })
          break
        case 'og:image:width': {
          const n = parseInt(content, 10)
          if (!Number.isNaN(n)) pushOrUpdateLast({ width: n })
          break
        }
        case 'og:image:height': {
          const n = parseInt(content, 10)
          if (!Number.isNaN(n)) pushOrUpdateLast({ height: n })
          break
        }
        case 'og:image:alt':
          pushOrUpdateLast({ alt: content })
          break
      }
    }
  })

  // linkタグ
  const linkMatches = html.match(linkRegex) || []
  linkMatches.forEach((link) => {
    const relMatch = link.match(/rel=["']([^"']+)["']/i)
    const hrefMatch = link.match(/href=["']([^"']+)["']/i)
    if (!(relMatch && hrefMatch)) return
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
  })

  // itemprop="image" や 非OGP系の画像指定
  const itempropImageRegex = /<meta[^>]+itemprop=["']image["'][^>]*>/gi
  const itempropMatches = html.match(itempropImageRegex) || []
  itempropMatches.forEach((meta) => {
    const contentMatch = meta.match(/content=["']([^"']+)["']/i)
    if (contentMatch) {
      const candidateUrl = resolveUrl(contentMatch[1], baseUrl)
      if (candidateUrl) {
        // 既に候補が無ければ最初の候補として追加
        // もしくはOGP/Twitterが無い場合のフォールバックとして利用
        // 幅高さ情報は無いので候補として最後に追加
        // 型の再利用
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        imageCandidates.push({ url: candidateUrl })
      }
    }
  })

  // JSON-LDのimageを解析
  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let jsonLdMatch: RegExpExecArray | null
  while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
    const jsonText = jsonLdMatch[1].trim()
    try {
      const data = JSON.parse(jsonText)
      const collectImages = (node: any) => {
        if (!node) return
        const pushImage = (u: string) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          imageCandidates.push({ url: resolveUrl(u, baseUrl) })
        }
        if (typeof node.image === 'string') {
          pushImage(node.image)
        } else if (Array.isArray(node.image)) {
          node.image.forEach((u: any) => {
            if (typeof u === 'string') pushImage(u)
            else if (u && typeof u.url === 'string') pushImage(u.url)
          })
        } else if (node.image && typeof node.image.url === 'string') {
          pushImage(node.image.url)
        }
        // ArticleやBlogPosting等の代表画像も拾う
        if (node.thumbnailUrl && typeof node.thumbnailUrl === 'string') {
          pushImage(node.thumbnailUrl)
        }
        if (Array.isArray(node['@graph'])) node['@graph'].forEach(collectImages)
      }
      collectImages(data)
    } catch {
      // ignore JSON parse errors
    }
  }

  // 画像候補から最良を選択
  const pickBestImage = (candidates: ImageCandidate[]): ImageCandidate | undefined => {
    if (candidates.length === 0) return undefined
    // 面積が最大のものを優先（幅高さ未設定は0扱い、最後の定義も考慮）
    const scored = candidates.map((c, idx) => ({ c, idx, area: (c.width || 0) * (c.height || 0) }))
    scored.sort((a, b) => b.area - a.area || a.idx - b.idx)
    return scored[0].c
  }

  const chosen = pickBestImage(imageCandidates)
  if (chosen) {
    metaData.image = chosen.url
    if (chosen.width) metaData.width = String(chosen.width)
    if (chosen.height) metaData.height = String(chosen.height)
    if (chosen.alt) metaData.alt = chosen.alt
  }

  // 最低限のURLが無ければbaseUrlを設定（多くのサイトでog:url不在なため）
  if (!metaData.url) metaData.url = baseUrl

  // 画像が取れない場合はTwitter画像をフォールバック
  if (!metaData.image && metaData.twitterImage) {
    metaData.image = metaData.twitterImage
  }

  return metaData
}

function resolveUrl(url: string, baseUrl: string): string {
  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return url
  }
}
