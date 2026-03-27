import { Fragment } from "react"
import { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import Link from "next/link"
import Image from "next/image"
import {
  Droplets,
  Minus,
  HelpCircle,
  FileText,
  Pipette,
  ShoppingBag,
  ArrowRight,
  ScanLine,
  CircleAlert,
  ListOrdered,
} from "lucide-react"

export const metadata: Metadata = {
  title: "YokaUnit Beauty｜無料の美容診断ツール（登録不要）",
  description:
    "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要で無料診断できます。",
  keywords: [
    "美容診断",
    "肌質診断",
    "毛穴タイプ診断",
    "ニキビタイプ診断",
    "スキンケアルーティン診断",
    "髪質診断",
    "スキンケア診断",
    "コスメ診断",
    "無料診断ツール",
    "YokaUnit Beauty",
  ],
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
    title: "診断で見つかる、あなたに合う美容。｜YokaUnit Beauty",
    description:
      "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要。",
    url: "https://yokaunit.com/beauty",
    siteName: "YokaUnit Beauty",
    images: [
      {
        url: "https://yokaunit.com/beauty/hero-skin.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit Beauty｜美容診断ツール",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "診断で見つかる、あなたに合う美容。｜YokaUnit Beauty",
    description:
      "肌質・毛穴・パーソナルカラーなどを診断し、あなたに合うスキンケアやコスメを見つけられる美容サイト。Web上で完結・登録不要。",
    images: ["https://yokaunit.com/beauty/hero-skin.png"],
  },
  alternates: {
    canonical: "https://yokaunit.com/beauty",
  },
}

// 説明文の一部を太字にする用 { bold: string }、それ以外は string
const diagnosisTools: {
  href: string
  title: string
  description: (string | { bold: string })[]
  icon: typeof Droplets
  imageSrc: string
  imageAlt: string
  available: boolean
}[] = [
  {
    href: "/beauty/diagnosis/pore-type",
    title: "毛穴タイプ診断",
    description: [
      "毛穴の状態をもとに、",
      { bold: "開き・詰まり・たるみなどのタイプ" },
      " を診断します。",
    ],
    icon: ScanLine,
    imageSrc: "/beauty/scan_image/pore-type-zoom-scan-4x3.webp",
    imageAlt: "毛穴タイプ診断のスキャンイメージ",
    available: true,
  },
  {
    href: "/beauty/diagnosis/acne-type",
    title: "ニキビタイプ診断",
    description: [
      "ニキビの ",
      { bold: "原因・タイプ" },
      " を分析し、適したケア方法を診断します。",
    ],
    icon: CircleAlert,
    imageSrc: "/beauty/scan_image/acne-type-cheek-scan-4x3.webp",
    imageAlt: "ニキビタイプ診断のスキャンイメージ",
    available: true,
  },
  {
    href: "/beauty/diagnosis/skin-type",
    title: "肌質診断",
    description: [
      "あなたの肌の ",
      { bold: "水分・皮脂バランス" },
      " を分析し、最適なスキンケアタイプを診断します。",
    ],
    icon: Droplets,
    imageSrc: "/beauty/scan_image/skin-type-tzone-balance-4x3.webp",
    imageAlt: "肌質診断のスキャンイメージ",
    available: true,
  },
  {
    href: "/beauty/diagnosis/hair-type",
    title: "髪質診断",
    description: [
      "髪の状態や頭皮環境から ",
      { bold: "最適なヘアケア方法" },
      " を診断します。",
    ],
    icon: Minus,
    imageSrc: "/beauty/scan_image/hair-type-strand-scan-4x3.webp",
    imageAlt: "髪質診断のスキャンイメージ",
    available: true,
  },
  {
    href: "/beauty/tools/skincare-routine",
    title: "スキンケアルーティン診断",
    description: [
      "あなたの肌に合った ",
      { bold: "洗顔・保湿・UVケア" },
      " の順番とアイテムを診断します。",
    ],
    icon: ListOrdered,
    imageSrc: "/beauty/scan_image/skincare-routine-step-overlay-4x3.webp",
    imageAlt: "スキンケアルーティン診断のスキャンイメージ",
    available: true,
  },
]

const usageFlowSteps = [
  {
    title: "診断",
    description: "AIを活用した一連の分析ステップを完了します。",
    icon: HelpCircle,
  },
  {
    title: "タイプを知る",
    description: "あなた独自のプロフィールに基づいた詳細な分析結果を受け取ります。",
    icon: FileText,
  },
  {
    title: "ケア方法を学ぶ",
    description: "あなたの肌の状態と目的に合わせた最適なケアステップや手順を確認します。",
    icon: Pipette,
  },
  {
    title: "自分に合う製品に出会う",
    description: "あなたのタイプに本当に効果のある、厳選された製品を見つけます。",
    icon: ShoppingBag,
  },
]

export default function BeautyHomePage() {
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YokaUnit Beauty",
    url: "https://yokaunit.com/beauty",
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: "YokaUnit Beauty",
      logo: { "@type": "ImageObject", url: "https://yokaunit.com/logo_heart.png" },
    },
  }

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "YokaUnit Beauty｜無料の美容診断ツール（登録不要）",
    url: "https://yokaunit.com/beauty",
    inLanguage: "ja-JP",
    isPartOf: { "@type": "WebSite", name: "YokaUnit Beauty", url: "https://yokaunit.com/beauty" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://yokaunit.com/beauty/hero-skin.png",
    },
    description: metadata.description,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "YokaUnit Beauty", item: "https://yokaunit.com/beauty" },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop variant="beauty" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="flex-1 relative isolate">
        {/* Hero Section */}
        <section className="bg-white/70 backdrop-blur-[2px]">
          <div className="container mx-auto px-4 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Copy + CTA */}
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  診断で見つかる、あなたに合う美容。
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto lg:mx-0 mb-2 leading-relaxed">
                  肌質・毛穴・パーソナルカラーなどを診断し、
                  <br className="hidden sm:block" />
                  あなたに合うスキンケアやコスメを見つけられる美容サイト。
                </p>
                <p className="text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8">
                  Web上で完結。登録不要で今すぐ診断できます。
                </p>
                <div className="flex flex-nowrap justify-center lg:justify-start gap-2 sm:gap-3">
                  <Link
                    href="/beauty/diagnosis/pore-type"
                    className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-600 transition-colors sm:px-6 sm:py-3 sm:text-sm"
                  >
                    無料で診断する
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                  </Link>
                  <Link
                    href="#flow"
                    className="inline-flex items-center justify-center rounded-full border-2 border-rose-500 bg-white px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors sm:px-6 sm:py-3 sm:text-sm"
                  >
                    診断について見る
                  </Link>
                </div>
              </div>
              {/* Right: Image + 99.4% overlay */}
              <div className="flex-1 w-full max-w-lg order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
                  <Image
                    src="/beauty/hero-skin.png"
                    alt="スキンケアをしている女性"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
                      <ScanLine className="h-5 w-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                        ANALYSIS ACCURACY
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">99.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 美容診断ツール */}
        <section id="tools" className="bg-rose-50/70 backdrop-blur-[2px] py-12 md:py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-2">
              美容診断ツール
            </h2>
            <div className="w-12 h-0.5 bg-rose-500 mx-auto mb-6" />
            <p className="text-center text-sm text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
              いくつかの質問に答えるだけで、
              <br />
              あなたのタイプと最適なケアがわかります。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {diagnosisTools.map((item) => {
                const Icon = item.icon
                const disabledClasses = !item.available ? "pointer-events-none opacity-70" : ""
                return (
                  <Link
                    key={item.title}
                    href={item.available ? item.href : "#"}
                    className={`group relative flex flex-col rounded-2xl border border-gray-100 bg-white/95 p-5 md:p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 ${disabledClasses}`}
                  >
                    <div className="relative mb-4 w-full overflow-hidden rounded-xl border border-rose-100/70 bg-gray-50 aspect-[4/3]">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-500 shadow-sm ring-1 ring-rose-100">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-center mb-3">{item.title}</h3>
                    <p className="text-xs text-gray-600 text-center flex-1 leading-relaxed">
                      {item.description.map((part, i) =>
                        typeof part === "string" ? (
                          <Fragment key={i}>{part}</Fragment>
                        ) : (
                          <span key={i} className="font-semibold text-gray-900">
                            {part.bold}
                          </span>
                        )
                      )}
                    </p>
                    {item.available ? (
                      <span className="mt-4 inline-flex items-center justify-center self-center rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-700 transition-all duration-200 group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:text-rose-800">
                        診断する
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs text-center mt-4">準備中</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ご利用の流れ */}
        <section id="flow" className="bg-white/70 backdrop-blur-[2px] py-12 md:py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-2">
              ご利用の流れ
            </h2>
            <div className="w-12 h-0.5 bg-rose-500 mx-auto mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {usageFlowSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="relative rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm flex flex-col overflow-hidden"
                  >
                    {/* 番号リボン（左上・細めのリボン） */}
                    <div
                      className="absolute left-0 top-0 flex h-10 w-7 items-center justify-center rounded-br-md bg-rose-500 text-xs font-bold text-white"
                      style={{
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 mb-4 mx-auto">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-center mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-600 text-center">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 診断結果に基づくおすすめ */}
        <section className="bg-rose-50/65 backdrop-blur-[2px] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  診断後のおすすめ導線
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  診断でタイプを知ったら、次は「何をやめて、何を足すか」を具体化します。
                  まずは解説記事で優先順位を整理し、次にアイテムカテゴリを絞って、最後に相性のよい候補を比較。
                  遠回りしない導線で、買い物の失敗を減らす設計です。
                </p>
                <Link
                  href="/beauty/articles"
                  className="inline-flex items-center text-rose-600 text-sm font-semibold hover:text-rose-700"
                >
                  解説記事から選び方を見る
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 w-full lg:max-w-md">
                {[
                  { title: "1. 理由を知る", body: "タイプ別のNGと優先ケアを把握" },
                  { title: "2. 候補を絞る", body: "成分・価格帯で迷いを減らす" },
                  { title: "3. 比較して選ぶ", body: "自分に合う1つを決める" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm aspect-[3/4] flex flex-col"
                  >
                    <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
                      <div className="h-20 w-16 rounded-lg bg-white/70 border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-semibold md:h-24 md:w-20">
                        STEP
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-50">
                      <p className="text-[11px] font-semibold text-gray-900 leading-tight mb-1">{item.title}</p>
                      <p className="text-[10px] text-gray-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}
