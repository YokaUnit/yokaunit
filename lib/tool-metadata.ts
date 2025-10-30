import type { Metadata } from "next"
import { getToolBySlug } from "@/lib/actions/tools"

export async function generateToolMetadata(slug: string, defaults: Partial<Metadata> = {}): Promise<Metadata> {
  const tool = await getToolBySlug(slug)

  const imageUrl = tool?.image_url || "/ogp/yokaunit-common.png"

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


