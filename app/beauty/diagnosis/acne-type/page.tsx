import type { Metadata } from "next"
import { AcneTypeDiagnosisClient } from "./AcneTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "ニキビタイプ診断 | YokaUnit Beauty",
  description:
    "ニキビの原因傾向（皮脂・角栓・乾燥刺激・生活習慣など）から、あなたのニキビタイプとケアの方向性を無料でチェック。1〜2分で完了、Webで完結・登録不要。",
  alternates: { canonical: "https://yokaunit.com/beauty/diagnosis/acne-type" },
  openGraph: {
    title: "ニキビタイプ診断（無料）｜YokaUnit Beauty",
    description:
      "ニキビの原因傾向から、あなたのニキビタイプとケアの方向性を1〜2分でチェック。Webで完結・登録不要。",
    url: "https://yokaunit.com/beauty/diagnosis/acne-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ニキビタイプ診断（無料）｜YokaUnit Beauty",
    description:
      "ニキビの原因傾向から、あなたのニキビタイプとケアの方向性を1〜2分でチェック。Webで完結・登録不要。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function AcneTypeDiagnosisPage() {
  return <AcneTypeDiagnosisClient />
}

