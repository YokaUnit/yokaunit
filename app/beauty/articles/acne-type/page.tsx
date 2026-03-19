import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "ニキビタイプ別の原因と整え方 | YokaUnit Beauty",
  description:
    "皮脂・詰まり・乾燥刺激・生活リズムの“原因傾向”別に、ニキビの整え方を分かりやすく解説。診断結果から今日の行動に落とし込みます。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles/acne-type" },
  openGraph: {
    title: "ニキビタイプ別の原因と整え方｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込むニキビタイプ別ガイド。NG/OKと1週間の整え方。",
    url: "https://yokaunit.com/beauty/articles/acne-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ニキビタイプ別の原因と整え方｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込むニキビタイプ別ガイド。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

export default function AcneTypeArticlePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">ニキビタイプ別の原因と整え方</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                ニキビは「とにかく乾かす/とにかく攻める」では安定しません。まずは原因の傾向を見極め、やることを絞るのが最短です。
              </p>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-2">まずはタイプ診断</p>
                <p className="text-xs text-gray-600 mb-3">皮脂・詰まり・乾燥刺激・生活リズムのどれが強いかで、優先順位が変わります。</p>
                <Link
                  href="/beauty/diagnosis/acne-type"
                  className="inline-flex items-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  ニキビタイプ診断へ
                </Link>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">タイプ別：最初にやること</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li><span className="font-semibold text-gray-900">皮脂・炎症</span>：洗いすぎを避けて皮脂バランスを安定。ビタミンC/ナイアシンアミドを一点投入。</li>
                    <li><span className="font-semibold text-gray-900">角栓・詰まり</span>：クレンジングの精度＋週1〜2回のマイルド角質ケアで“ため込まない”。</li>
                    <li><span className="font-semibold text-gray-900">乾燥・刺激</span>：攻めのケアを止めて“守りの保湿”。摩擦・拭き取りを減らす。</li>
                    <li><span className="font-semibold text-gray-900">生活リズム</span>：ケアを固定化し、睡眠・ストレスの波を小さくする。</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">最優先NG（悪化しやすい）</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>つぶす/触る（炎症と跡の原因）</li>
                    <li>角質ケアのやりすぎ（刺激ニキビに寄る）</li>
                    <li>さっぱり一辺倒で保湿を抜く（バリア低下）</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">1週間で整えるチェックリスト</h2>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>洗顔は朝晩2回まで、泡で30秒</li>
                    <li>夜はクレンジングを丁寧に（こすらない）</li>
                    <li>刺激が出たアイテムは一旦停止して“安定優先”</li>
                    <li>枕カバー/スマホ画面など触れるものを清潔に</li>
                  </ol>
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

