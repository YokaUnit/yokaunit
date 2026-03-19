import type { Metadata } from "next"
import { SkincareRoutineDiagnosisClient } from "./SkincareRoutineDiagnosisClient"

export const metadata: Metadata = {
  title: "スキンケアルーティン診断 | YokaUnit Beauty",
  description:
    "肌質・悩み・生活スタイルから、朝/夜のスキンケアルーティンを無料で提案。必要なステップと優先順位が1〜2分で分かります。Webで完結・登録不要。",
  alternates: { canonical: "https://yokaunit.com/beauty/tools/skincare-routine" },
  openGraph: {
    title: "スキンケアルーティン診断（無料）｜YokaUnit Beauty",
    description: "肌質・悩み・生活スタイルから、朝/夜のスキンケアルーティンを提案。Webで完結・登録不要。",
    url: "https://yokaunit.com/beauty/tools/skincare-routine",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "スキンケアルーティン診断（無料）｜YokaUnit Beauty",
    description: "肌質・悩み・生活スタイルから、朝/夜のスキンケアルーティンを提案。Webで完結・登録不要。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function SkincareRoutineDiagnosisPage() {
  return <SkincareRoutineDiagnosisClient />
}

