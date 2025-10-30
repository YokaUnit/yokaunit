import ChinchiroClientPage from "./ChinchiroClientPage"
import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { ViewCounter } from "@/components/view-counter"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("chinchiro", {
    title: "3Dチンチロサイコロ｜物理エンジンでリアルに転がる無料ゲーム - YokaUnit",
    description:
      "物理エンジンでリアルに転がる3Dチンチロサイコロ。ゾロ目、シゴロ、ヒフミ、そしてしょんべん（枠外）も忠実に再現。スマホ・PCどちらでも無料ですぐにブラウザで遊べます。",
    keywords:
      "チンチロ,チンチロリン,サイコロゲーム,3Dサイコロ,無料ブラウザゲーム,物理演算,リアルな動き,しょんべん,スマホでも遊べるゲーム,飲み会ミニゲーム,サイコロシミュレーター",
    openGraph: {
      title: "3Dチンチロサイコロ｜物理エンジンでリアルに転がる無料ゲーム - YokaUnit",
      description:
        "物理エンジンでリアルに転がる3Dチンチロサイコロ。ゾロ目、シゴロ、ヒフミ、そしてしょんべん（枠外）も忠実に再現。スマホ・PCどちらでも無料ですぐにブラウザで遊べます。",
      type: "website",
      url: "https://yokaunit.com/tools/chinchiro",
      siteName: "YokaUnit",
    },
    twitter: {
      card: "summary_large_image",
      title: "3Dチンチロサイコロ🎲物理エンジンでリアルに転がる無料ゲーム",
      description:
        "物理エンジンでリアルに転がる3Dチンチロサイコロ🎮 ゾロ目、シゴロ、ヒフミ、しょんべんも忠実に再現✨ スマホ・PCどちらでも無料ですぐに遊べます🆓",
      creator: "@yokaunit",
    },
    alternates: { canonical: "https://yokaunit.com/tools/chinchiro" },
    robots: { index: true, follow: true },
  })
}

export default function ChinchiroPage() {
  return (
    <>
      <ViewCounter toolSlug="chinchiro" />
      <ChinchiroClientPage />
    </>
  )
}
