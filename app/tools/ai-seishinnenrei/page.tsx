import type { Metadata } from "next"
import AiSeishinnenreiClientPage from "./AiSeishinnenreiClientPage"
import { ViewCounter } from "@/components/view-counter"

export const metadata: Metadata = {
  title: "AI精神年齢診断｜無料で本格チェック＆心理テスト・実年齢との差も分析",
  description:
    "AIがあなたの精神年齢を診断！簡単な選択式テストで心理年齢を数値化し、実年齢との差も分析。本格チェックが完全無料・登録不要で今すぐ体験できます。",
  keywords: "AI精神年齢診断,心理年齢,メンタル年齢,精神年齢,無料診断,心理テスト,年齢診断,AI診断,心理分析,メンタル診断,精神年齢テスト,心理年齢チェック",
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
    canonical: "https://yokaunit.com/tools/ai-seishinnenrei",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/ai-seishinnenrei",
    siteName: "YokaUnit",
    title: "AI精神年齢診断｜無料で本格チェック＆心理テスト・実年齢との差も分析",
    description: "AIがあなたの精神年齢を診断！簡単な選択式テストで心理年齢を数値化し、実年齢との差も分析。本格チェックが完全無料・登録不要で今すぐ体験できます。",
    images: [
      {
        url: "/ogp/ai-seishinnenrei-diagnosis.png",
        width: 1200,
        height: 630,
        alt: "AI精神年齢診断 - 無料心理年齢診断ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "AI精神年齢診断｜無料で本格チェック＆心理テスト・実年齢との差も分析",
    description: "AIがあなたの精神年齢を診断！簡単な選択式テストで心理年齢を数値化し、実年齢との差も分析。本格チェックが完全無料・登録不要で今すぐ体験できます。",
    images: ["/ogp/ai-seishinnenrei-diagnosis.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function AiSeishinnenreiPage() {
  return (
    <>
      <ViewCounter toolSlug="ai-seishinnenrei" />
      <AiSeishinnenreiClientPage />
    </>
  )
}
