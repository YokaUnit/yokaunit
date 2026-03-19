import type { Metadata } from "next"
import { SkinTypeDiagnosisClient } from "./SkinTypeDiagnosisClient"

export const metadata: Metadata = {
  title: "肌質診断 | YokaUnit Beauty",
  description:
    "乾燥肌・脂性肌・混合肌・普通肌など、あなたの素肌タイプを1〜2分で無料チェック。Webで完結・登録不要で、タイプ別のケアの方向性が分かります。",
  alternates: { canonical: "https://yokaunit.com/beauty/diagnosis/skin-type" },
  openGraph: {
    title: "肌質診断（無料）｜YokaUnit Beauty",
    description: "あなたの素肌タイプを1〜2分でチェック。Webで完結・登録不要で、ケアの方向性が分かります。",
    url: "https://yokaunit.com/beauty/diagnosis/skin-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "肌質診断（無料）｜YokaUnit Beauty",
    description: "あなたの素肌タイプを1〜2分でチェック。Webで完結・登録不要で、ケアの方向性が分かります。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function SkinTypeDiagnosisPage() {
  return <SkinTypeDiagnosisClient />
}

