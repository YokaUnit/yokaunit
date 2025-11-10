import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import AiSeishinnenreiClientPage from "./AiSeishinnenreiClientPage"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ai-seishinnenrei", {
    title: "AI精神年齢診断｜心理年齢を5つの質問で即チェック【無料・登録不要】",
    description:
      "たった5つの質問でAIがあなたの心理年齢を即診断！実年齢との差や性格の特徴もわかる完全無料ツール。登録不要・スマホ対応で簡単にチェックできます。",
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
      title: "AI精神年齢診断｜心理年齢を5つの質問で即チェック【無料・登録不要】",
      description:
        "たった5つの質問でAIがあなたの心理年齢を即診断！実年齢との差や性格の特徴もわかる完全無料ツール。登録不要・スマホ対応で簡単にチェックできます。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "AI精神年齢診断｜心理年齢を5つの質問で即チェック【無料・登録不要】",
      description:
        "たった5つの質問でAIがあなたの心理年齢を即診断！実年齢との差や性格の特徴もわかる完全無料ツール。登録不要・スマホ対応で簡単にチェックできます。",
    },
    verification: {
      google: "your-google-verification-code",
    },
  })
}

export default function AiSeishinnenreiPage() {
  const today = new Date().toISOString().split("T")[0]

  const webApplicationLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI精神年齢診断",
    description:
      "たった5つの質問でAIがあなたの心理年齢を即診断！実年齢との差や性格の特徴もわかる完全無料ツール。登録不要・スマホ対応で簡単にチェックできます。",
    url: "https://yokaunit.com/tools/ai-seishinnenrei",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    browserRequirements: "HTML5, JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    featureList: [
      "簡単5つの選択式質問",
      "AI分析による精神年齢診断",
      "実年齢との詳細比較",
      "個別化されたアドバイス",
      "完全無料・登録不要",
      "スマホ・PC対応",
      "結果シェア機能"
    ],
    screenshot: "https://yokaunit.com/ogp/ai-seishinnenrei-diagnosis.png",
    image: ["https://yokaunit.com/ogp/yokaunit-common.png"],
    author: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
    publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
    datePublished: "2024-01-01",
    dateModified: today
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "精神年齢が実年齢と大きく違うのは普通ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "はい、精神年齢と実年齢に差があるのは一般的です。人生経験や価値観、性格によって精神的成熟度は個人差があります。大人びている人もいれば、若々しい心を持つ人もいて、それぞれに魅力があります。"
        }
      },
      {
        "@type": "Question",
        name: "精神年齢は変化しますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "精神年齢は人生経験や環境の変化によって変動します。新しい経験を積んだり、価値観が変わったりすることで、精神年齢も変化していきます。"
        }
      },
      {
        "@type": "Question",
        name: "診断結果はどのように活用できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "自己理解を深めるツールとして活用できます。人間関係や恋愛、キャリア選択の参考にしたり、自分の特徴を理解することで、より良い人生の選択ができるでしょう。"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd),
        }}
      />
      <ViewCounter toolSlug="ai-seishinnenrei" />
      <AiSeishinnenreiClientPage />
      <ScrollToTop />
    </>
  )
}
