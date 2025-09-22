import type { Metadata } from "next"
import AiMoteClientPage from "./AiMoteClientPage"

export const metadata: Metadata = {
  title: "AIモテ度診断｜無料でできる恋愛相性・モテ診断ツール| yokaunit",
  description:
    "【完全無料】AIがあなたのモテ度を0-100%で数値化！ポジティブ度・社交性・共感力を最新AI技術で分析し、無限のモテタイプを判定。登録不要で今すぐ診断開始。恋愛相性診断・性格診断も。",
  keywords: "AIモテ度診断,恋愛診断,モテ度,AI診断,ポジティブ度,社交性,共感力,無料診断,恋愛相性,性格診断,恋愛タイプ,モテ度チェック,恋愛診断無料,AI恋愛診断,モテ度測定,恋愛心理テスト",
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/ai-mote",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/ai-mote",
    siteName: "YokaUnit",
    title: "AIモテ度診断｜無料でできる恋愛相性・モテ診断ツール【2024年最新版】",
    description: "【完全無料】AIがあなたのモテ度を0-100%で数値化！ポジティブ度・社交性・共感力を最新AI技術で分析。登録不要で今すぐ診断開始。",
    images: [
      {
        url: "/ogp/ai-mote-diagnosis.png",
        width: 1200,
        height: 630,
        alt: "AIモテ度診断 - 無料恋愛相性診断ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "AIモテ度診断｜無料でできる恋愛相性・モテ診断ツール",
    description: "【完全無料】AIがあなたのモテ度を0-100%で数値化！ポジティブ度・社交性・共感力を最新AI技術で分析。",
    images: ["/ogp/ai-mote-diagnosis.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function AiMotePage() {
  return <AiMoteClientPage />
}
