import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  MapPin,
  MessageSquareText,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackgroundAnimation } from "@/components/background-animation"
import { StoreSiteHeader } from "@/app/store/lp/_components/store-site-header"
import { StoreSiteFooter } from "@/app/store/lp/_components/store-site-footer"

export const metadata: Metadata = {
  title: "YokaUnit Store",
  description:
    "YokaUnit Store は、湘南のお店を誰でも簡単に見つけられるプラットフォーム。お店は無料でHP化でき、集客・口コミ・クーポン・診断・特集記事で来店を後押しします。",
  keywords: [
    "YokaUnit Store",
    "地域集客",
    "湘南",
    "藤沢",
    "鎌倉",
    "茅ヶ崎",
    "店舗ページ",
    "口コミ",
    "クーポン",
    "スタンプラリー",
    "診断",
    "特集記事",
    "MEO",
    "SEO",
    "無料",
  ],
  openGraph: {
    title: "湘南のお店が見つかる｜YokaUnit Store",
    description:
      "湘南の魅力ある店舗を無料でHP化。口コミ・クーポン・診断・特集で回遊と来店を増やす地域特化型プラットフォーム。",
    url: "https://yokaunit.com/store",
    siteName: "YokaUnit Store",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://yokaunit.com/store",
  },
}

const worries = [
  "お店の魅力が伝わっていない（見つけてもらえない）",
  "Googleマップ（MEO）や検索（SEO）で上位に出ない",
  "SNSは頑張っているのに、来店・予約に繋がりにくい",
  "営業時間やメニュー更新が負担で、放置になってしまう",
  "口コミやクーポンの“集め方・見せ方”が整っていない",
]

const featureCards = [
  {
    no: "01",
    title: (
      <>
        湘南のお店専用の
        <br />
        <span className="font-black">フルカスタムHP</span>
      </>
    ),
    description:
      "単なるテンプレではなく、ヒアリングしながら構成・文章・写真の見せ方・導線まで一緒に設計。ベース構造は揃えつつ、中身はお店ごとにフルカスタムで作っていきます。",
    icon: BadgeCheck,
  },
  {
    no: "02",
    title: (
      <>
        <span className="font-black">SEO / MEO</span>を
        <br />
        最初から最適化
      </>
    ),
    description:
      "タイトル/メタ/構造化データ、Googleマップ導線までツールで下書きを用意しつつ、最後は人の目で調整。『地域×ジャンル×店舗』で見つかる土台を一緒に整えます。",
    icon: MapPin,
  },
  {
    no: "03",
    title: (
      <>
        診断・特集・マップで
        <br />
        <span className="font-black">回遊</span>を伸ばす
      </>
    ),
    description:
      "「あなたに合う湘南カフェは？」「家族で行きたい湘南の遊び場」などの診断や特集記事、マップ企画を自由に設計。お店ごとのアイデアを活かした導線を一緒に考えます。",
    icon: Sparkles,
  },
  {
    no: "04",
    title: (
      <>
        あなた専用の
        <br />
        <span className="font-black">クーポン / 企画</span>
      </>
    ),
    description:
      "「初来店10％OFF」「診断結果でドリンク1杯無料」「スタンプラリー」「フォトコンテスト」など、クーポンや企画の形は自由。ツールで運用しやすくしつつ、中身はお店ごとのアイデアをベースに一緒に作ります。",
    icon: MessageSquareText,
  },
]

const flow = [
  {
    title: "無料相談・ヒアリング",
    description: "業種・地域・現状の集客方法・やってみたい企画（クーポン/診断/特集など）をお伺いします。",
    icon: PhoneCall,
  },
  {
    title: "情報共有・下書き作成",
    description: "住所/営業時間/メニュー/写真などを共有いただき、こちらでHP構成と文章の下書きを作成します。",
    icon: Building2,
  },
  {
    title: "公開・導線づくり",
    description: "店舗ページを公開し、SNS・QRコード・店内POPなど、集客導線のアイデアも一緒に形にします。",
    icon: Sparkles,
  },
  {
    title: "数字を見ながら改善",
    description: "アクセスや口コミ、クーポン利用状況を見ながら、文言や企画を少しずつチューニングしていきます。",
    icon: BarChart3,
  },
]

const seoAuto = [
  "「地域名＋ジャンル＋店舗名」を軸にタイトル・H1・メタを最適化",
  "店舗情報からメタディスクリプションを自動生成",
  "構造化データ（LocalBusiness等）を前提に設計",
  "地域→ジャンル→店舗の内部リンクで回遊を作る",
]

const meoAuto = [
  "Googleマップ導線（地図・電話・ルート）を標準搭載",
  "レビュー誘導の導線（QR/リンク）を用意",
  "営業時間/住所の整合性を保ちやすい入力フォーム",
  "写真・投稿・SNS誘導と組み合わせて相乗効果を狙う",
]

export default function StoreHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreSiteHeader />
      <main className="flex-1 relative overflow-hidden">
        <BackgroundAnimation />
        <ScrollToTop />

        {/* Hero */}
        <section className="relative isolate" id="top">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/Store/enoshima.jpeg"
              alt="湘南・江の島の風景"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-white/0" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/25 to-slate-950/55" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                湘南（藤沢・鎌倉・茅ヶ崎）限定の先行募集
              </div>

              <p className="mt-8 text-xs md:text-sm font-semibold tracking-[0.18em] text-white/90 drop-shadow">
                ＼ 湘南の店舗さまへ ／
              </p>
              <h1 className="mt-3 text-3xl md:text-6xl font-black text-white leading-[1.05] drop-shadow">
                <span className="text-yellow-200">地域特化</span>のホームページ、
                <br />
                <span className="text-white">無料で</span>作りませんか？
              </h1>

              <p className="mt-6 text-sm md:text-lg text-white/90 leading-relaxed drop-shadow">
                店舗情報を入力するだけで、モバイル最適化済みの店舗ページを自動生成。
                <br className="hidden sm:block" />
                SEO / MEO を前提に、口コミ・クーポン導線まで整えて公開します。
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  { label: "無料HP化", icon: BadgeCheck },
                  { label: "SEO/MEO最適化", icon: Search },
                  { label: "口コミ・クーポン導線", icon: MessageSquareText },
                ].map((b) => {
                  const Icon = b.icon
                  return (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur"
                    >
                      <Icon className="h-4 w-4" />
                      {b.label}
                    </span>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-8 py-3 text-sm font-black text-slate-950 shadow-sm hover:bg-yellow-200 transition-colors"
                >
                  お店を無料掲載する
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <Link
                  href="#concept"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition-colors"
                >
                  仕組みを見る
                </Link>
              </div>

              <p className="mt-6 text-[11px] text-white/70">
                ※ 無料提供は品質維持のため上限を設けます（運用状況に応じて段階移行）。
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <svg viewBox="0 0 1440 90" className="h-14 w-full md:h-20" preserveAspectRatio="none">
              <path
                d="M0,60 C240,90 480,20 720,45 C960,70 1200,20 1440,50 L1440,90 L0,90 Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Concept / Free HP化（“白カード”ブロック） */}
        <section className="relative bg-gradient-to-b from-[#EAF7EF] via-white to-[#F6FBF8]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="mx-auto max-w-5xl rounded-[28px] bg-white shadow-sm border border-black/5 overflow-hidden">
              <div className="px-6 py-8 md:px-10 md:py-10 text-center" id="concept">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#146B3A] text-white text-[10px] font-black">
                    湘南
                  </span>
                  <span>飲食・美容・宿泊・遊び /</span>
                </div>

                <p className="mt-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-slate-600">
                  ＼ YokaUnit Store ／
                </p>
                <h2 className="mt-2 text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                  お店を<span className="text-[#146B3A]">無料</span>でHP化して、
                  <br className="hidden sm:block" />
                  もっと見つけやすく。
                </h2>
                <p className="mt-3 text-xs md:text-sm text-slate-600 leading-relaxed">
                  店舗ページ（住所・営業時間・メニュー・予約導線・口コミ）は土台となる構造だけ共通。
                  文章・写真・クーポン・診断・特集の見せ方は、<span className="font-bold">お店ごとにフルカスタム</span>で一緒に作ります。
                </p>

                {/* プレビュー枠（実画像は後で差し替え可能） */}
                <div className="mt-7 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-3 md:p-4">
                  <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="h-9 bg-[#146B3A] flex items-center justify-between px-4">
                      <p className="text-xs font-black text-white">店舗ページ（プレビュー）</p>
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-4 md:p-5 bg-gradient-to-b from-white to-slate-50">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="h-16 rounded-lg bg-slate-100 mb-3" />
                          <div className="h-2.5 rounded bg-slate-100 w-3/4 mb-2" />
                          <div className="h-2.5 rounded bg-slate-100 w-1/2" />
                        </div>
                      ))}
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <div className="h-16 rounded-lg bg-emerald-50 border border-emerald-100 mb-3 flex items-center justify-center">
                          <p className="text-[11px] font-black text-[#146B3A]">クーポン</p>
                        </div>
                        <div className="h-2.5 rounded bg-slate-100 w-2/3 mb-2" />
                        <div className="h-2.5 rounded bg-slate-100 w-1/2" />
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <div className="h-16 rounded-lg bg-emerald-50 border border-emerald-100 mb-3 flex items-center justify-center">
                          <p className="text-[11px] font-black text-[#146B3A]">診断</p>
                        </div>
                        <div className="h-2.5 rounded bg-slate-100 w-2/3 mb-2" />
                        <div className="h-2.5 rounded bg-slate-100 w-1/2" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-500">
                    ※ ここは“イメージ”です。実際の見た目は店舗情報に合わせて整えます。
                  </p>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="/contact"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-black text-slate-950 shadow-sm hover:bg-yellow-200 transition-colors"
                  >
                    店舗を無料掲載してみる
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/store#features"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-950 transition-colors"
                  >
                    機能を見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Worries */}
        <section className="relative bg-white">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">worries</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-900">お店の集客、こんなお悩みありませんか？</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#146B3A]" />
            </div>

            <div className="mx-auto mt-7 max-w-4xl rounded-3xl border-2 border-[#146B3A]/20 bg-white shadow-sm p-6 md:p-8">
              <ul className="space-y-3 text-left">
                {worries.map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#146B3A] text-white shadow-sm">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm md:text-base text-slate-900 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Worries → 解決帯（参考画像の青帯＋ノッチ） */}
        <section className="relative bg-gradient-to-b from-[#EAF7EF] via-white to-[#F6FBF8]">
          <div className="absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#EAF7EF] shadow-sm" />
          <div className="container mx-auto px-4 py-8 md:py-10">
            <p className="text-center text-slate-900 font-black text-lg md:text-xl tracking-wide">
              これらのお悩み、私たちがまとめて解決！
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="relative">
          <div className="container mx-auto px-4 py-10 md:py-14 bg-white">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Feature</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-900">できること（ツール群）</h2>
                <p className="mt-2 text-xs md:text-sm text-slate-600">
                  無料HP化、SEO/MEO自動最適化、診断・特集、クーポン施策まで。湘南の店舗とお客さんをつなげます。
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.no} className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                      <div className="absolute left-5 top-4 text-[#146B3A]/80 text-2xl font-black tracking-widest">
                        {card.no}
                      </div>
                      <div className="p-6 pt-14">
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 items-start">
                          <div className="sm:col-span-2">
                            <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-sm">
                                <Icon className="h-6 w-6" />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">{card.title}</h3>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SEO / MEO 自動最適化（参考画像風の2カラム） */}
        <section className="relative bg-slate-50">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-slate-900 font-black text-xl md:text-2xl tracking-wide">SEO / MEO は、最初から。</p>
              <p className="mt-1 text-slate-900 font-black text-base md:text-lg">“見つかる”設計を、ツールと人の両方で支えます。</p>
              <p className="mt-4 text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
                タイトルやメタ情報、地図導線、構造化データ、内部リンク。
                ひとつずつ手作業で整えなくても、入力した店舗情報から“最初の最適化”まで到達できる設計を目指します。
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "SEO", rows: seoAuto },
                { title: "MEO", rows: meoAuto },
              ].map((box) => (
                <div key={box.title} className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                  <div className="bg-[#146B3A] px-5 py-4">
                    <div className="absolute right-0 top-0 h-0 w-0 border-l-[44px] border-l-transparent border-t-[44px] border-t-white/25" />
                    <p className="text-white font-black tracking-widest">{box.title}</p>
                  </div>
                  <div className="bg-white px-5 pb-5 pt-4">
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                      <ul className="space-y-2">
                        {box.rows.map((text) => (
                          <li key={text} className="flex items-start gap-3 text-sm text-slate-800">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#146B3A]" />
                            <span className="leading-relaxed">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Difference（参考画像: 比較表） */}
        <section className="relative bg-white">
          <div className="container mx-auto px-4 pb-10 md:pb-14">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Difference</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-900">一般的なサイト運用との違い</h2>
            </div>

            <div className="mx-auto mt-8 max-w-5xl overflow-x-auto">
              <div className="min-w-[640px] rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-4 bg-slate-100 text-slate-700 text-xs md:text-sm font-black">
                  <div className="p-4 border-r border-slate-200" />
                  <div className="p-5 text-center bg-[#146B3A] text-white text-sm md:text-base relative">
                    <div className="absolute inset-x-0 bottom-0 h-3 bg-[#146B3A]" />
                    <span className="relative z-10">YokaUnit Store</span>
                  </div>
                  <div className="p-4 text-center border-l border-slate-200">自作/制作のみ</div>
                  <div className="p-4 text-center border-l border-slate-200">SNS運用のみ</div>
                </div>

                {[
                  { label: "初期費用", a: "0円（先行枠）", b: "△（作るだけ）", c: "◎（低コスト）" },
                  { label: "見つかりやすさ", a: "◎（SEO/MEO前提）", b: "△（自分次第）", c: "△（拡散頼み）" },
                  { label: "口コミ/クーポン", a: "◎（導線を標準化）", b: "△", c: "△" },
                  { label: "回遊（診断/特集）", a: "◎（内部リンク設計）", b: "△", c: "－" },
                  { label: "更新のしやすさ", a: "◎（テンプレ）", b: "△（手作業）", c: "○（投稿）" },
                  { label: "継続運用", a: "◎（検知/通知）", b: "△", c: "△" },
                  { label: "地域プラットフォーム効果", a: "◎（同ジャンル回遊）", b: "－", c: "－" },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-4 bg-white text-xs md:text-sm">
                    <div className="p-4 bg-slate-100 text-slate-700 font-black border-t border-slate-200 border-r border-slate-200">
                      {row.label}
                    </div>
                    <div className="p-4 text-center font-black text-slate-900 border-t border-slate-200 bg-[#EAF7EF]">
                      {row.a}
                    </div>
                    <div className="p-4 text-center font-semibold text-slate-700 border-t border-slate-200 border-l border-slate-200">
                      {row.b}
                    </div>
                    <div className="p-4 text-center font-semibold text-slate-700 border-t border-slate-200 border-l border-slate-200">
                      {row.c}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-5xl text-[11px] md:text-xs text-slate-500">
              ※ 無料提供は品質維持のため上限を設けます。運用状況に応じて段階的にプラン移行します。
            </p>
          </div>
        </section>

        {/* Flow */}
        <section id="flow" className="relative">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white/90 shadow-sm p-7 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">flow</p>
                  <h2 className="mt-2 text-xl md:text-2xl font-black text-gray-900">公開までの流れ</h2>
                  <p className="mt-2 text-sm text-gray-700">最短で“形”を作って、すぐにSNSやQRで誘導できます。</p>
                </div>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#146B3A] px-5 py-2.5 text-sm font-black text-white shadow-sm hover:bg-[#105A31] transition-colors"
                >
                  無料掲載を相談する
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {flow.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.title}
                      className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 flex h-10 w-8 items-center justify-center rounded-br-xl bg-slate-900 text-xs font-black text-white">
                        {idx + 1}
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 mx-auto">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-center text-sm font-black text-gray-900">{step.title}</p>
                      <p className="mt-2 text-center text-xs text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/Store/enoshima.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-slate-950/80 to-white/0" />
            <div className="absolute inset-0 bg-emerald-950/25" />
          </div>

          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[32px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="p-7 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-emerald-950 text-[10px] font-black">
                          湘南
                        </span>
                        <span>先行募集</span>
                        <span className="opacity-60">/</span>
                        <span className="font-black text-yellow-200">無料</span>
                      </div>

                      <h2 className="mt-4 text-2xl md:text-4xl font-black leading-tight text-white">
                        湘南の店舗さんへ。
                        <br />
                        <span className="text-yellow-200">無料</span>で、まずは“見つかる”ページを。
                      </h2>
                      <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
                        住所・営業時間・メニュー・予約導線・口コミの見せ方まで、テンプレで整えて公開します。
                        <br className="hidden sm:block" />
                        店舗さんの声を聞きながら、最短で改善していく前提の先行募集です。
                      </p>

                      <div className="mt-7 flex flex-col sm:flex-row gap-3">
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-7 py-3 text-sm font-black text-slate-950 shadow-sm hover:bg-yellow-200 transition-colors"
                        >
                          無料で相談する
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                        <Link
                          href="/"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                        >
                          YokaUnit 本体へ戻る
                        </Link>
                      </div>
                    </div>

                    <div className="w-full lg:max-w-md">
                      <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                            <Image src="/Store/logo_store.png" alt="YokaUnit Store ロゴ" width={34} height={34} className="object-contain" />
                          </div>
                          <div className="leading-tight">
                            <p className="text-sm font-black text-emerald-200">YokaUnit Store</p>
                            <p className="text-xs text-white/75">湘南から全国へ（テンプレで拡張）</p>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          {[
                            { title: "初期費用", value: "0円", icon: BadgeCheck },
                            { title: "対応", value: "湘南", icon: MapPin },
                            { title: "導線", value: "予約/電話", icon: PhoneCall },
                            { title: "品質", value: "放置削除", icon: ShieldCheck },
                          ].map((item) => {
                            const Icon = item.icon
                            return (
                              <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                                    <Icon className="h-4.5 w-4.5" />
                                  </div>
                                  <div className="leading-tight">
                                    <p className="text-[11px] text-white/70 font-semibold">{item.title}</p>
                                    <p className="text-sm font-black text-white">{item.value}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
                          <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">無料枠の考え方</p>
                          <p className="mt-2 text-xs text-white/80 leading-relaxed">
                            無料提供は永遠に続けません。品質維持のため、運用状況に応じて段階的にプラン移行します。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/5 px-7 py-5 md:px-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-xs text-white/75">
                      まずは「店舗名 / 業種 / エリア / 予約導線（電話 or 予約URL）」だけでもOKです。
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-yellow-300/40 bg-yellow-300/10 px-5 py-2 text-xs font-black text-yellow-100 hover:bg-yellow-300/15 transition-colors"
                    >
                      相談フォームへ進む
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <StoreSiteFooter />
    </div>
  )
}

