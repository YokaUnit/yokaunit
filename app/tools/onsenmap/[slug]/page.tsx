import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getOnsenDataSorted } from "../lib/onsen-data"
import OnsenDetailPageClient from "./OnsenDetailPageClient"
import { ScrollToTop } from "@/components/scroll-to-top"

interface OnsenDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: OnsenDetailPageProps): Promise<Metadata> {
  const onsens = await getOnsenDataSorted()
  const onsen = onsens.find((o) => o.slug === params.slug)

  if (!onsen) {
    return {
      title: "温泉が見つかりません | yokaunit",
    }
  }

  return {
    title: `${onsen.name} | 日本温泉ランキング#${onsen.ranking} | yokaunit`,
    description: `${onsen.name}の詳細情報。日本温泉ランキング${onsen.ranking}位の名湯。評価${onsen.rating}/5.0、${onsen.region}地方の人気温泉。料金・営業時間・アクセス情報をチェック。`,
    keywords: `${onsen.name},温泉,${onsen.region},日本温泉ランキング,名湯,温泉情報`,
    openGraph: {
      title: `${onsen.name} | 日本温泉ランキング#${onsen.ranking}`,
      description: `${onsen.description}`,
      images: [onsen.image_url || "/ogp/yokaunit-common.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${onsen.name} | 日本温泉ランキング#${onsen.ranking}`,
      description: `${onsen.description}`,
      images: [onsen.image_url || "/ogp/yokaunit-common.png"],
    },
  }
}

export async function generateStaticParams() {
  const onsens = await getOnsenDataSorted()
  return onsens.map((onsen) => ({
    slug: onsen.slug,
  }))
}

export default async function OnsenDetailPage({ params }: OnsenDetailPageProps) {
  const onsens = await getOnsenDataSorted()
  const onsen = onsens.find((o) => o.slug === params.slug)

  if (!onsen) {
    notFound()
  }

  return (
    <>
      <OnsenDetailPageClient onsen={onsen} />
      <ScrollToTop />
    </>
  )
}
