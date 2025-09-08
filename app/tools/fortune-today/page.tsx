import type { Metadata } from "next"
import FortuneTodayClientPage from "./FortuneTodayClientPage"

export const metadata: Metadata = {
  title: "今日の運勢AI｜星座×行動で分かる無料AI占いツール| yokaunit",
  description:
    "【完全無料】AIが星座と今日の行動から運勢を診断！総合運・恋愛運・仕事運・金運を0-100で数値化。ラッキー行動とアドバイスも。登録不要で今すぐ占い開始。",
  keywords: "今日の運勢AI,星座占い,AI占い,無料占い,恋愛運,仕事運,金運,総合運,ラッキー行動,運勢診断,12星座,占い無料,AI運勢,今日の占い,星座運勢,運気アップ",
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
    canonical: "https://yokaunit.com/tools/fortune-today",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/fortune-today",
    siteName: "YokaUnit",
    title: "今日の運勢AI｜星座×行動で分かる無料AI占いツール",
    description: "【完全無料】AIが星座と今日の行動から運勢を診断！総合運・恋愛運・仕事運・金運を0-100で数値化。",
    images: [
      {
        url: "/ogp/fortune-today.png",
        width: 1200,
        height: 630,
        alt: "今日の運勢占い - 無料AI占いツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "今日の運勢AI｜星座×行動で分かる無料AI占いツール",
    description: "【完全無料】AIが星座と今日の行動から運勢を診断！総合運・恋愛運・仕事運・金運を0-100で数値化。",
    images: ["/ogp/fortune-today.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function FortuneTodayPage() {
  return <FortuneTodayClientPage />
}
