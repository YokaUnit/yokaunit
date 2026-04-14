import type { Tool } from "@/lib/types/tool"

const SITE_ORIGIN = "https://yokaunit.com"
const DEFAULT_OGP_IMAGE = `${SITE_ORIGIN}/ogp/yokaunit-common.png`

const SUPABASE_PUBLIC_STORAGE_PATH_PREFIX = "/storage/v1/object/public/"

/**
 * Supabase Storage の public URL を、自ドメインのプロキシURLに変換する。
 *
 * 目的:
 * - ブラウザ/クローラが Supabase を直接叩かないようにする
 * - CDN キャッシュを効かせ、Supabase の Cached Egress を抑える
 */
export function toProxiedSupabasePublicImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null

  // 既に自ドメインの相対URL（/api/... や /ogp/...）ならそのまま
  if (imageUrl.startsWith("/")) return imageUrl

  let u: URL
  try {
    u = new URL(imageUrl)
  } catch {
    return imageUrl
  }

  // Supabase Storage public URL 以外は触らない
  const idx = u.pathname.indexOf(SUPABASE_PUBLIC_STORAGE_PATH_PREFIX)
  if (idx === -1) return imageUrl

  const rest = u.pathname.slice(idx + SUPABASE_PUBLIC_STORAGE_PATH_PREFIX.length) // bucket/path...
  const [bucket, ...pathParts] = rest.split("/").filter(Boolean)
  const objectPath = pathParts.join("/")
  if (!bucket || !objectPath) return imageUrl

  const qp = new URLSearchParams()
  qp.set("bucket", bucket)
  qp.set("path", objectPath)
  return `/api/image-proxy?${qp.toString()}`
}

/** DB から返った tool 行の image_url を常にサイト内プロキシ URL に揃える（二重適用は冪等） */
export function mapToolWithProxiedImage(tool: Tool | null): Tool | null {
  if (!tool) return null
  return { ...tool, image_url: toProxiedSupabasePublicImageUrl(tool.image_url) }
}

export function mapToolsWithProxiedImages(tools: Tool[]): Tool[] {
  return tools.map((t) => ({ ...t, image_url: toProxiedSupabasePublicImageUrl(t.image_url) }))
}

/**
 * OGP / Twitter / JSON-LD 用。
 * 相対プロキシ URL・生の Supabase Storage URL のどちらでも yokaunit.com 上の絶対 URL に揃える。
 */
export function absoluteToolImageUrlForMetadata(imageUrl: string | null | undefined): string {
  if (!imageUrl) return DEFAULT_OGP_IMAGE
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    const proxied = toProxiedSupabasePublicImageUrl(imageUrl)
    if (proxied && proxied.startsWith("/api/image-proxy?")) {
      return `${SITE_ORIGIN}${proxied}`
    }
    return imageUrl
  }
  return imageUrl.startsWith("/") ? `${SITE_ORIGIN}${imageUrl}` : `${SITE_ORIGIN}/${imageUrl}`
}

