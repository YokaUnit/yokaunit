import { ToolsShowcase } from "@/components/tools-showcase"
import { HeroSection } from "@/components/hero-section"
import { BackgroundAnimation } from "@/components/background-animation"
import { CurrentlyBuilding } from "@/components/currently-building"
import { SocialRequestBanner } from "@/components/social-request-banner"
import { AdminMessage } from "@/components/admin-message"
import { CorporateSection } from "@/components/corporate-section"
import { MembershipSection } from "@/components/membership-section"
import { ViewedTools } from "@/components/viewed-tools"
import { PopularTools } from "@/components/popular-tools"
import { UpdatedToolsShowcase } from "@/components/updated-tools-showcase"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YokaUnit - 登録不要・今すぐ使える無料の便利ツール集",
  description:
    "YokaUnitは、日常や仕事に役立つ便利なツールを無料で提供するWebサービスです。高品質・高機能なツールを、すべてブラウザで即利用可能。面倒な登録なしで、あなたの「ちょっと助かる」をすぐに実現します。",
  keywords: [
    "無料ツール",
    "Webツール",
    "オンラインツール",
    "便利ツール",
    "パスワード生成",
    "チンチロゲーム",
    "SEO対策",
    "ブラウザツール",
    "登録不要",
    "YokaUnit",
    "ヨカユニット",
    "無料アプリ",
    "オンラインゲーム",
    "セキュリティツール",
    "暗号化ツール",
    "文字数カウント",
    "QRコード生成",
  ],
  openGraph: {
    title: "YokaUnit - 無料で使える便利なWebツール集｜登録不要ですぐ使える",
    description:
      "パスワード生成、チンチロゲーム、SEO対策ツールなど、完全無料で使える便利なWebツールが満載！ブラウザですぐ使える、登録不要の高品質ツールをお試しください。あなたの作業効率を劇的にアップさせます。",
    url: "https://yokaunit.com",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit - 無料で使える便利なWebツール集",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit - 無料で使える便利なWebツール集🛠️",
    description:
      "パスワード生成、チンチロゲーム、登録不要・無料ですぐ使える便利ツールが満載✨",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com",
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 relative overflow-hidden">
        <BackgroundAnimation />
        <HeroSection />
        <div className="container mx-auto px-4 py-6 space-y-8">
          <SocialRequestBanner />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <CurrentlyBuilding />
              <ToolsShowcase />
              <UpdatedToolsShowcase />
            </div>
            <div className="space-y-4">
              <AdminMessage />
              <CorporateSection />
              <MembershipSection />
              <ViewedTools />
              <PopularTools />
            </div>
          </div>

          {/* YokaUnit Beauty セクション */}
          <section className="mt-4 rounded-3xl border border-rose-100 bg-white/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-32 md:h-full md:col-span-1 bg-gradient-to-br from-rose-50 via-white to-rose-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-white/80 shadow-sm border border-rose-100">
                    <Image
                      src="/logo_heart.png"
                      alt="YokaUnit Beauty ロゴ"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm md:text-base font-semibold text-rose-600 tracking-wide">
                      YokaUnit Beauty
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-rose-100/60 blur-2xl" />
              </div>
              <div className="md:col-span-2 px-5 py-6 md:px-8 md:py-7 flex flex-col justify-center gap-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-500 uppercase">
                  Beauty Diagnosis
                </p>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  診断から、あなた専用の美容が見つかる。
                </h2>
                <p className="text-xs md:text-sm text-gray-700">
                  「YokaUnit Beauty」は、肌質・毛穴・パーソナルカラーなどの診断から、自分に本当に合う美容を見つけられる診断ファーストな美容サイトです。
                  すべて無料・登録不要で使えます。
                </p>
                <div className="pt-1">
                  <a
                    href="/beauty"
                    className="inline-flex items-center rounded-full bg-rose-500 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition-colors"
                  >
                    YokaUnit Beauty を見る
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* YokaUnit Movies セクション */}
          <section className="mt-4 rounded-3xl border border-zinc-200 bg-white/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-32 md:h-full md:col-span-1 bg-gradient-to-br from-zinc-100 via-white to-zinc-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-white/85 shadow-sm border border-zinc-200">
                    <Image
                      src="/movies/logo_movies.png"
                      alt="YokaUnit Movies ロゴ"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm md:text-base font-semibold text-zinc-800 tracking-wide">
                      YokaUnit Movies
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-zinc-300/50 blur-2xl" />
              </div>
              <div className="md:col-span-2 px-5 py-6 md:px-8 md:py-7 flex flex-col justify-center gap-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  映画・ドラマ
                </p>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  配信と評価を、一覧でざっと見る。
                </h2>
                <p className="text-xs md:text-sm text-gray-700">
                  Netflix や Prime など、観たい作品がどのサービスにあるかを並べて確認できます。
                  Filmarks と映画.com の平均も併記（※デモ用の数値）。
                </p>
                <div className="pt-1">
                  <a
                    href="/movies"
                    className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors"
                  >
                    YokaUnit Movies を見る
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* YokaUnit Store セクション */}
          <section className="mt-4 rounded-3xl border border-emerald-100 bg-white/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-32 md:h-full md:col-span-1 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-white/80 shadow-sm border border-emerald-100">
                    <Image
                      src="/Store/logo_store.png"
                      alt="YokaUnit Store ロゴ"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm md:text-base font-semibold text-emerald-800 tracking-wide">
                      YokaUnit Store
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-200/50 blur-2xl" />
              </div>
              <div className="md:col-span-2 px-5 py-6 md:px-8 md:py-7 flex flex-col justify-center gap-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                  Store
                </p>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  湘南のお店が見つかる、地域特化のストア。
                </h2>
                <p className="text-xs md:text-sm text-gray-700">
                  「YokaUnit Store」は、湘南エリアの飲食・美容・宿泊・遊びなどのお店を、
                  無料HPやクーポン・診断・特集を通じて“見つけやすく”する地域特化型プラットフォームです。
                </p>
                <div className="pt-1">
                  <a
                    href="/store"
                    className="inline-flex items-center rounded-full bg-emerald-800 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-emerald-900 transition-colors"
                  >
                    YokaUnit Store を見る
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* YokaUnit Note セクション */}
          <section className="mt-4 rounded-3xl border border-emerald-100 bg-white/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-32 md:h-full md:col-span-1 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center px-4 py-3 rounded-full bg-white/80 shadow-sm border border-emerald-100">
                    <Image
                      src="/note/logo_yokaunit+note.png"
                      alt="YokaUnit Note ロゴ"
                      width={132}
                      height={36}
                      className="h-9 w-auto"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl" />
              </div>
              <div className="md:col-span-2 px-5 py-6 md:px-8 md:py-7 flex flex-col justify-center gap-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase">
                  Note
                </p>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  面倒を減らし、少ない時間で成果を出すための実践メディア。
                </h2>
                <p className="text-xs md:text-sm text-gray-700">
                  「YokaUnit Note」は、一人開発者の日常と仕事で生まれる課題に向き合い、
                  実測データと失敗ログを交えた知見を届ける実用メディアです。
                </p>
                <div className="pt-1">
                  <a
                    href="/note"
                    className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    YokaUnit Note を見る
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ScrollToTop />
      <SiteFooter />
    </div>
  )
}
