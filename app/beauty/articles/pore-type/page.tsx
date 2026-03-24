import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "毛穴タイプ別ケアの正解 | YokaUnit Beauty",
  description:
    "黒ずみ・開き・たるみ・詰まり毛穴の原因と、やりがちなNG、タイプ別のOKケアを分かりやすく整理。診断結果から今日の行動に落とし込みます。",
  keywords: [
    "毛穴タイプ診断",
    "黒ずみ毛穴",
    "開き毛穴",
    "たるみ毛穴",
    "詰まり毛穴",
    "いちご鼻",
    "毛穴パック",
    "毛穴ケア",
    "YokaUnit Beauty",
  ],
  alternates: { canonical: "https://yokaunit.com/beauty/articles/pore-type" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "毛穴タイプ別ケアの正解｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込む毛穴タイプ別ガイド。NG/OKと1週間の整え方。",
    url: "https://yokaunit.com/beauty/articles/pore-type",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp",
        width: 1600,
        height: 1200,
        alt: "毛穴タイプ別ケアの解説",
      },
    ],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "毛穴タイプ別ケアの正解｜YokaUnit Beauty",
    description: "診断結果を“行動”に落とし込む毛穴タイプ別ガイド。",
    images: ["https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp"],
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

const poreTypeSections = [
  {
    title: "黒ずみ毛穴",
    image: "/beauty/diagnosis/pore-type/result-blackhead-closeup-4x3.webp",
    alt: "黒ずみ毛穴のイメージ",
    points: [
      "やさしいクレンジングで“こすらず落とす”を徹底する",
      "週1〜2回の酵素洗顔やマイルド角質ケアでため込まない",
      "毛穴パックや強いスクラブの頻度を下げる",
    ],
  },
  {
    title: "開き毛穴",
    image: "/beauty/diagnosis/pore-type/result-open-4x3.webp",
    alt: "開き毛穴のイメージ",
    points: [
      "保湿の土台（化粧水→乳液/クリーム）を先に整える",
      "皮脂コントロールはTゾーン中心のポイント使い",
      "拭き取りや洗顔のやりすぎを避ける",
    ],
  },
  {
    title: "たるみ毛穴",
    image: "/beauty/diagnosis/pore-type/result-sagging-4x3.webp",
    alt: "たるみ毛穴のイメージ",
    points: [
      "保湿＋ハリケア（ビタミンC/レチノールなど）を継続する",
      "UVケアを毎日行い、光老化を減らす",
      "摩擦を減らし、こすらない塗り方に統一する",
    ],
  },
  {
    title: "詰まり毛穴",
    image: "/beauty/diagnosis/pore-type/result-clogged-closeup-4x3.webp",
    alt: "詰まり毛穴のイメージ",
    points: [
      "洗いすぎをやめて、保湿で角質をやわらかくする",
      "ピーリング・酵素洗顔は週1〜2回に留める",
      "詰まりにくいベースメイクを選ぶ",
    ],
  },
]

const ngSections = [
  {
    step: "01",
    title: "貼って剥がすパックを頻繁に使う",
    image: "/beauty/diagnosis/pore-type/ng-pack-closeup-4x3.webp",
    alt: "黒いピールオフパックを剥がす途中",
    text: "一時的にすっきりしても、角質を剥がしすぎるとバリア機能が落ち、黒ずみや開きが悪化しやすくなります。",
  },
  {
    step: "02",
    title: "スクラブでゴシゴシこする",
    image: "/beauty/diagnosis/pore-type/ng-scrub-4x3.webp",
    alt: "スクラブの使いすぎイメージ",
    text: "摩擦が増えるほど赤みや乾燥を招きやすく、毛穴トラブルが長引くことがあります。頻度は週1回程度が目安です。",
  },
  {
    step: "03",
    title: "温めた後に保湿せず放置する",
    image: "/beauty/diagnosis/pore-type/ng-steamer-4x3.webp",
    alt: "スチーマー後の保湿不足イメージ",
    text: "温めた後は乾燥しやすいため、化粧水・乳液で水分と油分を補う工程が重要です。",
  },
]

const ingredientMap = [
  {
    type: "黒ずみ毛穴",
    ingredients: "ビタミンC誘導体、ナイアシンアミド、酵素洗顔",
    point: "角栓をため込まない習慣を優先",
  },
  {
    type: "開き毛穴",
    ingredients: "セラミド、アミノ酸系保湿、ナイアシンアミド",
    point: "まず水分と油分のバランス調整",
  },
  {
    type: "たるみ毛穴",
    ingredients: "レチノール、ビタミンC、ペプチド",
    point: "ハリ感ケアとUVをセットで継続",
  },
  {
    type: "詰まり毛穴",
    ingredients: "酵素洗顔、AHA/BHA（低頻度）、高保湿成分",
    point: "洗いすぎを止めて角質をやわらげる",
  },
]

export default function PoreTypeArticlePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "毛穴タイプ別ケアの正解",
    description: metadata.description,
    inLanguage: "ja-JP",
    mainEntityOfPage: "https://yokaunit.com/beauty/articles/pore-type",
    image: ["https://yokaunit.com/beauty/diagnosis/pore-type/hero-main-4x3.webp"],
    author: { "@type": "Organization", name: "YokaUnit Beauty" },
    publisher: {
      "@type": "Organization",
      name: "YokaUnit Beauty",
      logo: { "@type": "ImageObject", url: "https://yokaunit.com/logo_heart.png" },
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "YokaUnit Beauty", item: "https://yokaunit.com/beauty" },
      { "@type": "ListItem", position: 2, name: "解説記事", item: "https://yokaunit.com/beauty/articles" },
      { "@type": "ListItem", position: 3, name: "毛穴タイプ別ケアの正解", item: "https://yokaunit.com/beauty/articles/pore-type" },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="flex-1 relative isolate">
        <article className="bg-white/70 backdrop-blur-[2px]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-wider text-rose-500 mb-2">GUIDE</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">毛穴タイプ別ケアの正解</h1>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
                毛穴は「取ればOK」ではなく、タイプに合わせて“ため込まない仕組み”を作るのが最短です。ここでは診断結果を、今日の行動に落とし込むための要点だけをまとめます。
              </p>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm mb-8">
                <Image
                  src="/beauty/diagnosis/pore-type/hero-main-4x3.webp"
                  alt="毛穴タイプ別ケアの解説イメージ"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 mb-8 md:p-5">
                <p className="text-sm font-semibold text-gray-900 mb-2">まずは診断してタイプを確認</p>
                <p className="text-xs text-gray-600 mb-3">黒ずみ/開き/たるみ/詰まりのどれが強いかで、優先するケアが変わります。</p>
                <Link
                  href="/beauty/diagnosis/pore-type"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  毛穴タイプ診断へ
                </Link>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 mb-8 md:p-5">
                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-2">この記事の使い方（最短ルート）</h2>
                <ol className="list-decimal pl-5 text-[15px] text-gray-700 leading-relaxed space-y-1.5">
                  <li>診断結果のタイプを確認する</li>
                  <li>タイプ別ポイントで「先にやること」を1つ決める</li>
                  <li>NG行動を1つだけやめる</li>
                  <li>1週間ミニ習慣を続けて、肌の反応を見る</li>
                </ol>
              </div>

              <section className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">タイプ別：まずやること（優先順位）</h2>
                  <ul className="text-[15px] text-gray-700 space-y-2 leading-relaxed">
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

                <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">タイプ別の見え方とケアポイント</h2>
                  <div className="space-y-6">
                    {poreTypeSections.map((section) => (
                      <div key={section.title} className="grid grid-cols-1 gap-4 md:grid-cols-[210px_minmax(0,1fr)] md:items-start">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-100 bg-white">
                          <Image
                            src={section.image}
                            alt={section.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 220px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-2">{section.title}</h3>
                          <ul className="text-[15px] text-gray-700 space-y-2 leading-relaxed">
                            {section.points.map((point) => (
                              <li key={point} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">やりがちなNG（最優先でやめる）</h2>
                  <div className="space-y-4">
                    {ngSections.map((ng) => (
                      <div key={ng.step} className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/40 p-3.5 md:grid-cols-[210px_minmax(0,1fr)] md:p-4">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-white">
                          <Image src={ng.image} alt={ng.alt} fill sizes="(max-width: 768px) 100vw, 210px" className="object-cover" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-gray-900 mb-1">
                            <span className="mr-2 text-rose-600">{ng.step}</span>
                            {ng.title}
                          </p>
                          <p className="text-[15px] text-gray-700 leading-relaxed">{ng.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">1週間で整える“ミニ習慣”</h2>
                  <ol className="list-decimal pl-5 text-[15px] text-gray-700 space-y-2 leading-relaxed">
                    <li>夜のクレンジングを丁寧に（30〜40秒、こすらない）</li>
                    <li>洗顔後すぐに保湿（化粧水→乳液/クリーム）</li>
                    <li>週1〜2回だけ角質ケア（やりすぎない）</li>
                    <li>日焼け止めは毎日（ほお〜フェイスラインまで）</li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">タイプ別：成分選びの目安</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-600">
                          <th className="px-2 py-2 font-semibold">タイプ</th>
                          <th className="px-2 py-2 font-semibold">注目したい成分</th>
                          <th className="px-2 py-2 font-semibold">使い方のポイント</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredientMap.map((row) => (
                          <tr key={row.type} className="border-b border-gray-50 align-top">
                            <td className="px-2 py-3 font-semibold text-gray-900">{row.type}</td>
                            <td className="px-2 py-3 text-gray-700">{row.ingredients}</td>
                            <td className="px-2 py-3 text-gray-700">{row.point}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    ※ 成分は一例です。刺激を感じる場合は使用頻度を下げ、肌状態に合わせて調整してください。
                  </p>
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

