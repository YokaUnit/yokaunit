import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "YokaUnit Movies",
  description:
    "映画・ドラマの配信サービスと Filmarks・映画.com の平均（デモ値）を一覧するページです。",
  openGraph: {
    title: "YokaUnit Movies｜配信と評価の一覧",
    description:
      "契約中のサービスに合わせて絞り込み。評価の下限もスライダーで調整できます（デモ）。",
    url: "https://yokaunit.com/movies",
    siteName: "YokaUnit Movies",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit Movies",
    description: "配信サービスと評価を同じ画面で見るためのデモページです。",
  },
}

export default function MoviesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
