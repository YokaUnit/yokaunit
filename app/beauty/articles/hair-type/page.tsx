import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "髪質別ヘアケアの選び方 | YokaUnit Beauty",
  description:
    "頭皮ベタつき・乾燥広がり・ダメージ集中・細毛ぺたんこのタイプ別に、最短で手触りを整えるヘアケアの考え方を解説します。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles/hair-type" },
  openGraph: {
    title: "髪質別ヘアケアの選び方｜YokaUnit Beauty",
    description: "髪質診断の結果を“行動”に落とし込むガイド。",
    url: "https://yokaunit.com/beauty/articles/hair-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "髪質別ヘアケアの選び方｜YokaUnit Beauty",
    description: "髪質診断の結果を“行動”に落とし込むガイド。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function HairTypeArticlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1 relative isolate">
        <article className="bg-white/70 backdrop-blur-[2px]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-wider text-rose-500 mb-2">GUIDE</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">髪質別ヘアケアの選び方</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                ヘアケアは「良いものを足す」より、「自分のタイプに合う最小構成」にする方が結果が出やすいです。
              </p>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-2">まずは髪質診断</p>
                <p className="text-xs text-gray-600 mb-3">頭皮・広がり・ダメージ・細毛のどれが強いかで、選ぶべき軸が変わります。</p>
                <Link
                  href="/beauty/diagnosis/hair-type"
                  className="inline-flex items-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  髪質診断へ
                </Link>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">タイプ別：まず揃えるもの</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li><span className="font-semibold text-gray-900">頭皮ベタつき</span>：頭皮の洗い方＋すすぎの質。毛先は軽めに保湿。</li>
                    <li><span className="font-semibold text-gray-900">乾燥・広がり</span>：アウトバス保湿＋摩擦/熱ダメージ対策。</li>
                    <li><span className="font-semibold text-gray-900">ダメージ</span>：補修＋熱保護。濡れ髪放置をやめる。</li>
                    <li><span className="font-semibold text-gray-900">細毛・ぺたんこ</span>：根元の乾かし方＋重すぎない保湿。</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

