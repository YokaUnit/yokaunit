import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "YokaUnit Beauty - 無料で使える美容診断サイト",
    template: "%s | YokaUnit Beauty",
  },
  description:
    "YokaUnit Beautyは、肌質診断などの美容診断ツールで「自分に本当に合う美容」が分かる無料の美容専門サイトです。登録不要・完全無料で使えます。",
  openGraph: {
    title: "YokaUnit Beauty - 無料で使える美容診断サイト",
    description:
      "肌質診断などの美容診断ツールで「自分に本当に合う美容」が分かる、YokaUnit内の美容専門エリアです。",
    url: "https://yokaunit.com/beauty",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "/logo_heart.png",
        width: 800,
        height: 800,
        alt: "YokaUnit Beauty ロゴ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit Beauty - 無料で使える美容診断サイト",
    description:
      "肌質診断などの美容診断ツールで「自分に本当に合う美容」が分かる、YokaUnit内の美容専門エリアです。",
    images: ["/logo_heart.png"],
  },
  icons: {
    icon: [{ url: "/logo_heart.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/logo_heart.png",
    apple: [{ url: "/logo_heart.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function BeautyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

