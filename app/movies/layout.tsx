import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { StructuredDataScriptServer } from "@/components/seo/structured-data-script-server"
import { generateMoviesPageJsonLd } from "@/lib/seo/movies-jsonld"

const pageTitle =
  "YokaUnit Movies | 何を観るか迷ったとき｜配信と評価で候補を絞る"

const description =
  "今夜・週末に何を観るか決まらないとき向け。Netflix・Prime・U-NEXT など契約中のVODで観れる映画・ドラマを絞り込み、Filmarks・映画.com の平均も一覧。見るか迷ってる人が候補を減らすためのデモです（数値はデモ）。"

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description,
  keywords: [
    "YokaUnit Movies",
    "何を観るか迷う",
    "映画 何見るか迷う",
    "ドラマ おすすめ 迷う",
    "映画 決められない",
    "次に観る作品 決めたい",
    "映画 配信",
    "ドラマ 配信",
    "Netflix",
    "Prime Video",
    "U-NEXT",
    "Hulu",
    "Disney+",
    "Filmarks",
    "映画.com",
    "VOD",
    "VOD 検索",
    "サブスク 何見る",
    "映画 今夜 何見る",
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  alternates: {
    canonical: "/movies",
  },
  openGraph: {
    title: pageTitle,
    description,
    url: "https://yokaunit.com/movies",
    siteName: "YokaUnit",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "entertainment",
  applicationName: "YokaUnit Movies",
  other: {
    "apple-mobile-web-app-title": "YokaUnit Movies",
  },
  icons: {
    icon: [{ url: "/movies/logo_movies.png", type: "image/png", sizes: "any" }],
    shortcut: "/movies/logo_movies.png",
    apple: [{ url: "/movies/logo_movies.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#06080f",
}

export default function MoviesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StructuredDataScriptServer
        data={generateMoviesPageJsonLd()}
        id="movies-jsonld"
      />
      {children}
    </>
  )
}
