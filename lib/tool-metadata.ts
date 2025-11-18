import type { Metadata } from "next"
import { getToolBySlug } from "@/lib/actions/tools"

// 相対パスを完全なURLに変換する関数
function getAbsoluteImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return "https://yokaunit.com/ogp/yokaunit-common.png"
  }
  
  // 既に完全なURLの場合はそのまま返す
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }
  
  // 相対パスの場合は完全なURLに変換
  const baseUrl = "https://yokaunit.com"
  return imageUrl.startsWith("/") 
    ? `${baseUrl}${imageUrl}` 
    : `${baseUrl}/${imageUrl}`
}

export async function generateToolMetadata(slug: string, defaults: Partial<Metadata> = {}): Promise<Metadata> {
  let tool: Awaited<ReturnType<typeof getToolBySlug>> = null
  try {
    tool = await getToolBySlug(slug)
  } catch (_err) {
    // If not found or multiple rows, silently fall back to common OGP
    tool = null
  }

  const imageUrl = getAbsoluteImageUrl(tool?.image_url || "/ogp/yokaunit-common.png")

  const merged: Metadata = {
    ...defaults,
    openGraph: {
      ...(defaults.openGraph || {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: tool?.title || (typeof defaults.title === "string" ? defaults.title : "") || "YokaUnit",
        },
      ],
    },
    twitter: {
      ...(defaults.twitter || {}),
      card: (defaults.twitter as any)?.card || "summary_large_image",
      images: [imageUrl],
    },
  }

  return merged
}


