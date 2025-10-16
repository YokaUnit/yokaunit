import type { Metadata } from "next"
import OnsenMapClientPage from "./OnsenMapClientPage"
import { ViewCounter } from "@/components/view-counter"

export const metadata: Metadata = {
  title: "2025年温泉ランキングマップ | 日本全国の名湯100選 | yokaunit",
  description:
    "2025年最新の日本温泉ランキングを地図で探索。全国100選の名湯を評価・口コミ・料金で比較検索。草津温泉、有馬温泉など人気温泉の詳細情報をチェック。",
  keywords: "温泉ランキング,温泉マップ,日本温泉,名湯,草津温泉,有馬温泉,温泉検索,温泉比較,2025年",
  openGraph: {
    title: "2025年温泉ランキングマップ | 日本全国の名湯100選",
    description: "日本全国の温泉ランキングを地図で探索。評価・料金・口コミで比較検索できる温泉ガイド。",
    images: ["/ogp/yokaunit-common.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "2025年温泉ランキングマップ | 日本全国の名湯100選",
    description: "日本全国の温泉ランキングを地図で探索。評価・料金・口コミで比較検索できる温泉ガイド。",
    images: ["/ogp/yokaunit-common.png"],
  },
}

export default function OnsenMapPage() {
  return (
    <>
      <ViewCounter toolSlug="onsenmap" />
      <OnsenMapClientPage />
    </>
  )
}
