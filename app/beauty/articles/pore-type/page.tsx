import type { Metadata } from "next"
import Link from "next/link"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "毛穴タイプ別ケアの正解 | YokaUnit Beauty",
  description:
    "黒ずみ・開き・たるみ・詰まり毛穴の原因と、やりがちなNG、タイプ別のOKケアを分かりやすく整理。診断結果から今日の行動に落とし込みます。",
  alternates: { canonical: "https://yokaunit.com/beauty/articles/pore-type" },
  openGraph: {
    title: "毛穴タイプ別ケアの正解｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込む毛穴タイプ別ガイド。NG/OKと1週間の整え方。",
    url: "https://yokaunit.com/beauty/articles/pore-type",
    siteName: "YokaUnit Beauty",
    images: [{ url: "https://yokaunit.com/logo_heart.png", width: 800, height: 800, alt: "YokaUnit Beauty" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "毛穴タイプ別ケアの正解｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込む毛穴タイプ別ガイド。",
    images: ["https://yokaunit.com/logo_heart.png"],
  },
}

const faqs = [
  {
    q: "毛穴パックは毎週やっていい？",
    a: "基本はおすすめしません。角栓を物理的に抜く刺激で毛穴周りが傷つき、黒ずみ・開きが悪化しやすいです。週1の“マイルド角質ケア”に置き換える方が安定しやすいです。",
  },
  {
    q: "黒ずみ毛穴は洗えば洗うほど良くなる？",
    a: "逆です。洗いすぎは乾燥→皮脂増加→角栓が溜まりやすくなる流れを作りがち。大切なのは“落とす強さ”より“ため込まない習慣化”です。",
  },
  {
    q: "開き毛穴は収れん化粧水で閉じる？",
    a: "一時的に引き締まって見えることはありますが、根本は水分・皮脂バランス。保湿の土台を整えて、皮脂の過剰分泌を抑える方が効きます。",
  },
]

export default function PoreTypeArticlePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">毛穴タイプ別ケアの正解</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                毛穴は「取ればOK」ではなく、タイプに合わせて“ため込まない仕組み”を作るのが最短です。ここでは診断結果を、今日の行動に落とし込むための要点だけをまとめます。
              </p>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-8">
                <p className="text-sm font-semibold text-gray-900 mb-2">まずは診断してタイプを確認</p>
                <p className="text-xs text-gray-600 mb-3">黒ずみ/開き/たるみ/詰まりのどれが強いかで、優先するケアが変わります。</p>
                <Link
                  href="/beauty/diagnosis/pore-type"
                  className="inline-flex items-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  毛穴タイプ診断へ
                </Link>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">タイプ別：まずやること（優先順位）</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>
                      <span className="font-semibold text-gray-900">黒ずみ毛穴</span>：やさしいクレンジング＋週1〜2回のマイルド角質ケア
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">開き毛穴</span>：保湿の土台づくり＋皮脂コントロールは“ポイント使い”
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">たるみ毛穴</span>：ハリケア（ビタミンC/レチノール等）＋UV徹底＋摩擦ゼロ
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">詰まり毛穴</span>：洗いすぎ停止＋保湿で角質をやわらげる＋週1〜2回の酵素/ピーリング
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">やりがちなNG（最優先でやめる）</h2>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>毛穴パック/角栓押し出し/スクラブのやりすぎ</li>
                    <li>テカりが気になって保湿を省く（インナードライ悪化）</li>
                    <li>クレンジング・洗顔の摩擦（黒ずみ/たるみの原因になりやすい）</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">1週間で整える“ミニ習慣”</h2>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>夜のクレンジングを丁寧に（30〜40秒、こすらない）</li>
                    <li>洗顔後すぐに保湿（化粧水→乳液/クリーム）</li>
                    <li>週1〜2回だけ角質ケア（やりすぎない）</li>
                    <li>日焼け止めは毎日（ほお〜フェイスラインまで）</li>
                  </ol>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3">よくある質問</h2>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <details key={f.q} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                      <summary className="cursor-pointer text-sm font-semibold text-gray-900">{f.q}</summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
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

