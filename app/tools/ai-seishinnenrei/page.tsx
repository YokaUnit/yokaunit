import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import AiSeishinnenreiClientPage from "./AiSeishinnenreiClientPage"
import { ViewCounter } from "@/components/view-counter"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ai-seishinnenrei", {
    title: "AI精神年齢診断｜あなたの心理年齢は何歳？無料でAIが即診断",
    description:
      "AIがあなたの精神年齢（心理年齢）を即診断。5つの質問に答えるだけで数値化し、実年齢との差や特徴もわかる。完全無料・登録不要・スマホ対応。",
    keywords:
      "AI精神年齢診断,心理年齢,メンタル年齢,精神年齢,無料診断,心理テスト,年齢診断,AI診断,心理分析,メンタル診断,精神年齢テスト,心理年齢チェック,あなたの心理年齢は何歳,性格診断,自己分析",
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
      title: "AI精神年齢診断｜あなたの心理年齢は何歳？無料でAIが即診断",
      description:
        "AIがあなたの精神年齢（心理年齢）を即診断。5つの質問に答えるだけで数値化し、実年齢との差や特徴もわかる。完全無料・登録不要・スマホ対応。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "AI精神年齢診断｜あなたの心理年齢は何歳？無料でAIが即診断",
      description:
        "AIがあなたの精神年齢（心理年齢）を即診断。5つの質問に答えるだけで数値化し、実年齢との差や特徴もわかる。完全無料・登録不要・スマホ対応。",
    },
    verification: {
      google: "your-google-verification-code",
    },
  })
}

export default function AiSeishinnenreiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI精神年齢診断",
            description:
              "AIがあなたの精神年齢（心理年齢）を即診断。5つの質問に答えるだけで数値化し、実年齢との差や特徴もわかる。完全無料・登録不要・スマホ対応。",
            url: "https://yokaunit.com/tools/ai-seishinnenrei",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [
              "https://yokaunit.com/ogp/yokaunit-common.png"
            ],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "精神年齢が実年齢と大きく違うのは普通ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "一般的です。人生経験や価値観、性格によって精神的成熟度には個人差があります。"
                }
              },
              {
                "@type": "Question",
                name: "精神年齢は変化しますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "変化します。経験や環境の影響を受け、時間とともに成熟度は変わります。"
                }
              }
            ]
          }),
        }}
      />
      <ViewCounter toolSlug="ai-seishinnenrei" />
      <AiSeishinnenreiClientPage />
    </>
  )
}
