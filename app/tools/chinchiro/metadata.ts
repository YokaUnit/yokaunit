import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "チンチロゲーム | 無料オンラインサイコロゲーム",
  description:
    "チンチロは3つのサイコロを振って役を作る日本の伝統的なゲームです。ピンゾロ、ゾロ目、シゴロなどの役を揃えて遊べる無料オンラインゲーム。スマホでも楽しめます。",
  keywords: [
    "チンチロ",
    "サイコロゲーム",
    "オンラインゲーム",
    "無料ゲーム",
    "ピンゾロ",
    "ゾロ目",
    "シゴロ",
    "3D",
    "ブラウザゲーム",
  ],
  openGraph: {
    title: "チンチロゲーム | 無料オンラインサイコロゲーム - YokaUnit",
    description:
      "3つのサイコロを振って役を作る日本の伝統的なゲーム。ピンゾロ、ゾロ目、シゴロなどの役を揃えて遊べる無料オンラインゲーム。",
    url: "https://yokaunit.com/tools/chinchiro",
    type: "website",
    images: [
      {
        url: "/ogp/chinchiro-game.png",
        width: 1200,
        height: 630,
        alt: "チンチロゲーム - YokaUnit",
      },
    ],
    siteName: "YokaUnit",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "チンチロゲーム | 無料オンラインサイコロゲーム - YokaUnit",
    description:
      "3つのサイコロを振って役を作る日本の伝統的なゲーム。ピンゾロ、ゾロ目、シゴロなどの役を揃えて遊べる無料オンラインゲーム。",
    images: ["/ogp/chinchiro-game.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "/tools/chinchiro",
  },
}
