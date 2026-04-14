import type { Metadata } from "next"
import { getToolBySlug } from "@/lib/actions/tools"
import { absoluteToolImageUrlForMetadata } from "@/lib/image-proxy"

export async function generateToolMetadata(slug: string, defaults: Partial<Metadata> = {}): Promise<Metadata> {
  let tool: Awaited<ReturnType<typeof getToolBySlug>> = null
  try {
    tool = await getToolBySlug(slug)
  } catch (_err) {
    // If not found or multiple rows, silently fall back to common OGP
    tool = null
  }

  const imageUrl = absoluteToolImageUrlForMetadata(tool?.image_url || "/ogp/yokaunit-common.png")

  const merged: Metadata = {
    ...defaults,
    openGraph: {
      ...(defaults.openGraph || {}),
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
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


