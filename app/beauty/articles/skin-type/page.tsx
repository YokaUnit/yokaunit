import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "肌質別スキンケアの組み立て | YokaUnit Beauty",
  description:
    "乾燥肌・脂性肌・混合肌・普通肌の違いと、やるべき順番（洗顔→保湿→UV）を整理。診断結果から“最短で安定する”考え方を解説します。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles/skin-type" },
  openGraph: {
    title: "肌質別スキンケアの組み立て｜YokaUnit Beauty",
    description: "肌質診断の結果を、今日のケア手順に落とし込むガイド。",
    url: "https://yokaunit.com/beauty/articles/skin-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "肌質別スキンケアの組み立て｜YokaUnit Beauty",
    description: "肌質診断の結果を、今日のケア手順に落とし込むガイド。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function SkinTypeArticlePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">肌質別スキンケアの組み立て</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                肌が安定しないときほど、やることを増やしがち。まずは「順番」と「優先順位」を揃えると、肌は戻りやすいです。
              </p>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-2">肌質診断で“土台”を確認</p>
                <p className="text-xs text-gray-600 mb-3">乾燥/脂性/混合/普通で、保湿の量・皮脂対策のやり方が変わります。</p>
                <Link
                  href="/beauty/diagnosis/skin-type"
                  className="inline-flex items-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  肌質診断へ
                </Link>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">結論：まず揃える3ステップ</h2>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>洗顔（落としすぎない）</li>
                    <li>保湿（化粧水→乳液/クリーム）</li>
                    <li>UV（毎日）</li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">肌質別：やりがちNG</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li><span className="font-semibold text-gray-900">乾燥肌</span>：さっぱり系だけで保湿不足</li>
                    <li><span className="font-semibold text-gray-900">脂性肌</span>：テカりが怖くて保湿を抜く（逆に皮脂が増える）</li>
                    <li><span className="font-semibold text-gray-900">混合肌</span>：全顔を同じケアで統一（部分最適が必要）</li>
                    <li><span className="font-semibold text-gray-900">普通肌</span>：攻めの成分を増やしすぎて刺激に寄る</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">1週間の整え方（最短ルート）</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    1週間は“固定ルーティン”で揺れを減らす期間。新しいアイテムを増やしすぎず、反応を見ながら微調整します。
                  </p>
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

