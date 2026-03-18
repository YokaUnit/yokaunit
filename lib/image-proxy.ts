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

