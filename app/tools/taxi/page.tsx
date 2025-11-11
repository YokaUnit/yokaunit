import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import Script from "next/script"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
// @ts-expect-error -- クライアントコンポーネントを直接読み込むため型解決を抑制
import TaxiClient from "./TaxiClient"

const faqItems = [
  {
    question: "このタクシー運賃計算ツールは無料で利用できますか？",
    answer:
      "はい、YokaUnitのタクシー運賃計算ツールは完全無料でお使いいただけます。登録も不要で、スマートフォン・PC どちらからでもご利用可能です。",
  },
  {
    question: "距離や時間の計算はどこまで正確ですか？",
    answer:
      "乗車地・目的地を入力すると、公共ルートサービス（OSRM/Nominatim）の推奨経路を基に距離と所要時間を算出します。渋滞や道路規制などリアルタイム要素は含まれないため、目安としてご利用ください。",
  },
  {
    question: "深夜割増や高速料金などの条件も反映できますか？",
    answer:
      "はい。深夜・早朝割増、有料道路、迎車料金、クーポン割引など、実際の乗車シーンで発生する主要な条件をすべて設定できます。さらに、全国主要エリアの料金プリセットやカスタム料金表にも対応しています。",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("taxi", {
    title: "タクシー運賃計算ツール｜距離・時間・割増で料金を正確シミュレーション - YokaUnit",
    description:
      "【無料】タクシー運賃計算ツールで首都圏・全国主要都市の料金体系を網羅。距離・時間・深夜割増・予約料・高速料金・割引などを細かく設定して、リアルな乗車料金をその場で試算・比較できます。",
    keywords: [
      "タクシー運賃",
      "タクシー料金",
      "タクシーシミュレーター",
      "タクシー計算",
      "深夜割増",
      "配車予約料",
      "遠距離割引",
      "タクシー初乗り",
      "タクシー検索",
      "料金検索",
      "見積",
      "東京タクシー",
      "大阪タクシー",
      "福岡タクシー",
      "札幌タクシー",
      "YokaUnit",
      "ヨカユニット",
    ],
    openGraph: {
      title: "タクシー運賃計算ツール｜距離・時間・割増で料金を正確シミュレーション",
      description:
        "距離・所要時間・深夜割増・高速料金など、最新のタクシー運賃ルールに合わせて瞬時に試算できる無料オンラインツールです。",
      url: "https://yokaunit.com/tools/taxi",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "タクシー運賃計算ツール🚕｜距離・時間・割増で料金を正確シミュレーション",
      description:
        "首都圏・大阪・福岡など全国主要エリアのタクシー料金を一括比較。深夜・迎車・高速料金まで柔軟にシミュレーションできます。",
      creator: "@yokaunit",
      site: "@yokaunit",
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/taxi",
    },
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
  })
}

export default function TaxiFareToolPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "タクシー運賃計算ツール",
    url: "https://yokaunit.com/tools/taxi",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
  }

  return (
    <>
      <Script id="taxi-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="taxi-app-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(appJsonLd)}
      </Script>
      <ViewCounter toolSlug="taxi" />
      <SiteHeader />
      <div className="relative min-h-screen">
        <BackgroundAnimation />
        <div className="relative z-10 container mx-auto px-4 py-6 space-y-10 lg:space-y-16">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "タクシー運賃計算ツール", href: "/tools/taxi" },
            ]}
          />

          <section className="mx-auto w-full max-w-5xl rounded-3xl bg-white/85 p-6 shadow-xl ring-1 ring-blue-100/70 backdrop-blur sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                  <span>🚖</span> 1分で料金目安が分かる無料ツール
                </p>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  乗車地と目的地を入力するだけで、タクシー料金の目安と内訳を瞬時に表示
                </h1>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  全国主要都市の料金表をプリセット。深夜割増、迎車料金、高速料金、クーポン割引まで細かく設定できるので、出発前の料金チェックや配車アプリ比較に最適です。
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-2xl bg-blue-50/70 px-3 py-2 text-sm font-medium text-blue-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">①</span>
                    乗車地・目的地を入力
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-blue-50/70 px-3 py-2 text-sm font-medium text-blue-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">②</span>
                    条件を選んで計算する
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-blue-50/70 px-3 py-2 text-sm font-medium text-blue-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">③</span>
                    料金と内訳を確認・共有
                  </div>
                </div>
              </div>
              <dl className="grid w-full gap-4 rounded-2xl bg-blue-600/5 p-4 text-sm text-blue-900 shadow-inner ring-1 ring-blue-100 sm:grid-cols-2 lg:max-w-xs lg:grid-cols-1">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-blue-600">対応エリア</dt>
                  <dd className="text-base font-semibold">全国主要都市の料金プリセットを搭載</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-blue-600">利用料金</dt>
                  <dd className="text-base font-semibold">完全無料・ログイン不要・スマホ最適化</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-blue-600">シミュレーション</dt>
                  <dd className="text-base font-semibold">深夜割増・高速料金・割引もワンクリック</dd>
                </div>
              </dl>
            </div>
          </section>

          <div data-id="taxi-calculator-root" id="taxi-calculator">
            <TaxiClient />
          </div>
        </div>
      </div>

      <CategoryTools category="計算" title="関連ツール（計算）" currentToolSlug="taxi" limit={8} />
      <RelatedTools currentToolSlug="taxi" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="space-y-14">
          <section className="grid gap-6 rounded-3xl bg-white/85 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">タクシー運賃が決まる3つのポイント</h2>
              <p className="text-base leading-relaxed text-slate-600">
                日本のタクシー料金は「初乗り距離」「距離・時間加算」「割増・割引」の組み合わせで決まります。本ツールは最新の料金テーブルをプリセットしており、実際の乗車シーンを想定した試算が可能です。
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <span className="mt-1 text-xl">①</span>
                  <div>
                    <h3 className="text-base font-semibold text-blue-900">初乗り運賃と距離</h3>
                    <p>最初の1km前後までは初乗り料金として固定。地域や事業者によって距離と金額が異なります。</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <span className="mt-1 text-xl">②</span>
                  <div>
                    <h3 className="text-base font-semibold text-emerald-900">距離加算・時間加算</h3>
                    <p>一定距離ごと、または低速時の一定秒数ごとに追加料金が発生します。渋滞が予想される場合は「低速時間」を多めに設定しましょう。</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                  <span className="mt-1 text-xl">③</span>
                  <div>
                    <h3 className="text-base font-semibold text-amber-900">割増・割引・諸費用</h3>
                    <p>深夜割増、迎車料金、高速料金、クーポン割引などの条件を組み合わせることで、支払い金額に近い数値を算出できます。</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-full rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-slate-900">代表的な料金プリセット</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
                  <strong className="block text-slate-900">東京23区・武蔵野・三鷹</strong>
                  初乗り500円（1.052km）／以降237mごとに100円
                </li>
                <li className="rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
                  <strong className="block text-slate-900">大阪市域</strong>
                  初乗り680円（1.5km）／以降296mごとに80円
                </li>
                <li className="rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
                  <strong className="block text-slate-900">名古屋市域</strong>
                  初乗り680円（1.27km）／以降233mごとに90円
                </li>
                <li className="rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
                  <strong className="block text-slate-900">札幌・福岡など</strong>
                  地域ごとの最新テーブルをプリセットで搭載
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-3xl bg-white/85 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">よくある質問</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-800">
                    {item.question}
                    <span className="text-slate-500 transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-8 text-white shadow-2xl sm:p-10">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">今すぐタクシー料金の目安をチェック</h2>
              <p className="text-base text-blue-50 sm:text-lg">
                出張や観光、深夜帰宅など「どれくらいかかる？」をすぐに把握。シェアやお気に入り登録で、いつでも同じ条件で再計算できます。
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#taxi-calculator"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:translate-y-0.5 hover:bg-blue-50 sm:w-auto sm:px-8"
                >
                  無料でタクシー料金を試算する
                </a>
                <span className="text-xs uppercase tracking-[0.3em] text-blue-100">登録不要・完全無料</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ScrollToTop />
      <SiteFooter />
    </>
  )
}

