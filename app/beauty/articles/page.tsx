import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "美容診断の解説記事 | YokaUnit Beauty",
  description:
    "毛穴・ニキビ・肌質・スキンケアルーティン・髪質の診断結果をもとに、タイプ別の原因とケアの考え方を分かりやすく解説します。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles" },
  openGraph: {
    title: "美容診断の解説記事｜YokaUnit Beauty",
    description:
      "診断結果を“行動”に落とし込むための解説記事。タイプ別の原因・NG・OKケアをまとめています。",
    url: "https://yokaunit.com/beauty/articles",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "美容診断の解説記事｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込むための解説記事。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

const articles = [
  {
    href: "/beauty/articles/pore-type",
    title: "毛穴タイプ別ケアの正解",
    description: "黒ずみ・開き・たるみ・詰まりの原因と、やりがちなNGを整理。",
    toolHref: "/beauty/diagnosis/pore-type",
  },
  {
    href: "/beauty/articles/acne-type",
    title: "ニキビタイプ別の原因と整え方",
    description: "皮脂/詰まり/乾燥刺激/生活リズムの違いを分かりやすく解説。",
    toolHref: "/beauty/diagnosis/acne-type",
  },
  {
    href: "/beauty/articles/skin-type",
    title: "肌質別スキンケアの組み立て",
    description: "乾燥・脂性・混合・普通の“やるべき順番”を整理。",
    toolHref: "/beauty/diagnosis/skin-type",
  },
  {
    href: "/beauty/articles/skincare-routine",
    title: "スキンケアルーティン最短最適化",
    description: "朝/夜/週1の優先順位と、増やしすぎないコツ。",
    toolHref: "/beauty/tools/skincare-routine",
  },
  {
    href: "/beauty/articles/hair-type",
    title: "髪質別ヘアケアの選び方",
    description: "頭皮・広がり・ダメージ・細毛のタイプ別に整える。",
    toolHref: "/beauty/diagnosis/hair-type",
  },
]

export default function BeautyArticlesIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1 relative isolate">
        <section className="bg-white/70 backdrop-blur-[2px]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">診断結果を、今日の行動に。</h1>
              <p className="text-sm md:text-base text-gray-600">
                診断でタイプが分かったら、次は「どうケアするか」。タイプ別に、原因・NG・OKを短く分かりやすくまとめます。
              </p>
            </div>

            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {articles.map((a) => (
                <div key={a.href} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h2 className="font-bold text-gray-900 mb-2">{a.title}</h2>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{a.description}</p>
                  <div className="flex flex-col gap-2">
                    <Link className="inline-flex items-center text-rose-600 text-sm font-semibold" href={a.href}>
                      記事を読む <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                    <Link className="inline-flex items-center text-gray-700 text-xs" href={a.toolHref}>
                      診断ツールへ <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

