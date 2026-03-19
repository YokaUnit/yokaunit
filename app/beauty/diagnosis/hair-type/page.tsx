import type { Metadata } from "next"
import { HairTypeDiagnosisClient } from "./HairTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "髪質診断 | YokaUnit Beauty",
  description:
    "髪の状態・頭皮環境・ダメージ傾向から、あなたの髪質タイプとヘアケアの方向性を無料でチェック。1〜2分で完了、Webで完結・登録不要。",
  alternates: { canonical: "https://yokaunit.com/beauty/diagnosis/hair-type" },
  openGraph: {
    title: "髪質診断（無料）｜YokaUnit Beauty",
    description: "髪と頭皮の状態から、髪質タイプとヘアケアの方向性を1〜2分でチェック。Webで完結・登録不要。",
    url: "https://yokaunit.com/beauty/diagnosis/hair-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "髪質診断（無料）｜YokaUnit Beauty",
    description: "髪と頭皮の状態から、髪質タイプとヘアケアの方向性を1〜2分でチェック。Webで完結・登録不要。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function HairTypeDiagnosisPage() {
  return <HairTypeDiagnosisClient />
}

