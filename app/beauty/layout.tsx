import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "YokaUnit Beauty",
  description:
    "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要で無料診断できます。",
  openGraph: {
    title: "診断で見つかる、あなたに合う美容。｜YokaUnit Beauty",
    description:
      "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要。",
    url: "https://yokaunit.com/beauty",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "https://yokaunit.com/logo_heart.png",
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
    title: "診断で見つかる、あなたに合う美容。｜YokaUnit Beauty",
    description:
      "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
  icons: {
    icon: [
      { url: "/logo_heart.png", sizes: "any" },
      { url: "/logo_heart.png", sizes: "32x32", type: "image/png" },
      { url: "/logo_heart.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo_heart.png",
    apple: [{ url: "/logo_heart.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function BeautyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

