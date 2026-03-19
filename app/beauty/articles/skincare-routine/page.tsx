import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "スキンケアルーティン最短最適化 | YokaUnit Beauty",
  description:
    "朝/夜/週1〜2回の優先順位を整理し、増やしすぎずに肌を安定させるルーティン設計を解説。診断結果をそのまま行動にできます。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles/skincare-routine" },
  openGraph: {
    title: "スキンケアルーティン最短最適化｜YokaUnit Beauty",
    description: "スキンケアルーティン診断の結果を“続く習慣”に落とし込むガイド。",
    url: "https://yokaunit.com/beauty/articles/skincare-routine",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "スキンケアルーティン最短最適化｜YokaUnit Beauty",
    description: "スキンケアルーティン診断の結果を“続く習慣”に落とし込むガイド。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function SkincareRoutineArticlePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">スキンケアルーティン最短最適化</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                ルーティンは「足し算」より「順番」と「優先順位」。まずは“毎日続く形”に整えるのが、肌を安定させる最短ルートです。
              </p>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-2">診断で自分の優先順位を決める</p>
                <p className="text-xs text-gray-600 mb-3">時間/悩み/生活に合わせて、やることを絞れます。</p>
                <Link
                  href="/beauty/tools/skincare-routine"
                  className="inline-flex items-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  ルーティン診断へ
                </Link>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">毎日：絶対に外さない4つ</h2>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>夜のクレンジング（必要な日だけでOK）</li>
                    <li>洗顔（泡で短時間、落としすぎない）</li>
                    <li>保湿（化粧水→乳液/クリーム）</li>
                    <li>UV（毎日）</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">週1〜2回：入れるならこれ</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    酵素洗顔/マイルドピーリング/集中保湿のどれか1つ。やりすぎると逆効果になりやすいので、頻度は控えめが正解です。
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

