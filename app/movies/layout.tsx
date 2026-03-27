import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { StructuredDataScriptServer } from "@/components/seo/structured-data-script-server"
import { generateMoviesPageJsonLd } from "@/lib/seo/movies-jsonld"

const pageTitle =
  "YokaUnit Movies | 映画をどのVODで見れるか一発で検索"

const description =
  "契約中のVODに合わせて映画・ドラマを絞り込み。Filmarks・映画.com の評価も一覧で確認。Netflix・Prime Video・U-NEXT・Hulu・Disney+ などに対応（掲載の数値はデモ）。"

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description,
  keywords: [
    "YokaUnit Movies",
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
    "サブスク 映画",
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
    title: "YokaUnit Movies — 映画・ドラマの配信と評価一覧",
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
