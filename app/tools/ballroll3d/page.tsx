import BallRoll3DClientPage from "./BallRoll3DClientPage"
import type { Metadata } from "next"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

// メタデータ
export const metadata: Metadata = {
  title: "ボール転がし3D｜ギリギリを攻める物理パチンコ風ゲーム - YokaUnit",
  description:
    "パワーと角度でボールを飛ばし、落ちる直前の“ギリギリ”で止められるかを競う3D物理ゲーム。障害物・壁・コインなしのシンプルな駆け引き。スマホ・PC対応。",
  keywords:
    "ボール転がし3D,物理演算,パチンコ風,ブラウザゲーム,ギリギリ,シンプルゲーム,スマホ対応,PC対応",
  openGraph: {
    title: "ボール転がし3D｜ギリギリを攻める物理パチンコ風ゲーム - YokaUnit",
    description:
      "パワーと角度でボールを飛ばし、落ちる直前の“ギリギリ”で止められるかを競う3D物理ゲーム。障害物・壁・コインなしのシンプルな駆け引き。",
    type: "website",
    url: "https://yokaunit.com/tools/ballroll3d",
    images: [
      {
        url: "https://yokaunit.com/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "ボール転がし3D - YokaUnit",
      },
    ],
    siteName: "YokaUnit",
  },
  twitter: {
    card: "summary_large_image",
    title: "ボール転がし3D🎯ギリギリを攻める物理ゲーム",
    description:
      "パワーと角度でボールを飛ばし、落ちる直前の“ギリギリ”で止められるかを競うシンプル3D物理ゲーム。",
    images: ["https://yokaunit.com/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/ballroll3d",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BallRoll3DPage() {
  return (
    <>
      <ViewCounter toolSlug="ballroll3d" />
      <BallRoll3DClientPage />
      <ScrollToTop />
    </>
  )
}


