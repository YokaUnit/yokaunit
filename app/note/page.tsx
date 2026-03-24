import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { NoteHero } from "./_components/note-hero"
import { NoteBackgroundAnimation } from "./_components/note-background-animation"
import { NoteHeader } from "./_components/note-header"
import { NoteFooter } from "./_components/note-footer"
import { featuredNotes, noteCategories, notePillars } from "./_data/note-content"

export const metadata: Metadata = {
  title: "YokaUnit Note | 一人開発の実践メディア",
  description:
    "面倒を減らし、少ない時間で成果を出すための実測データと失敗ログを発信する YokaUnit Note。",
  alternates: { canonical: "https://yokaunit.com/note" },
  openGraph: {
    title: "YokaUnit Note | 一人開発の実践メディア",
    description: "実測データと失敗ログを交えた、一人開発の実践メディア。",
    url: "https://yokaunit.com/note",
    siteName: "YokaUnit",
    images: [{ url: "/note/logo_yokaunit+note.png", width: 1200, height: 630, alt: "YokaUnit Note" }],
    locale: "ja_JP",
    type: "website",
  },
}

export default function NotePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <NoteHeader />
      <main className="relative flex-1 overflow-hidden">
        <NoteBackgroundAnimation />
        <section className="relative z-10 border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 via-slate-50 to-slate-50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <NoteHero />
          </div>
        </section>

        <section className="relative z-10 container mx-auto px-4 py-8 md:py-10">
          <div className="mb-4 md:mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">For You</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">こんな人におすすめ</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {notePillars.map((item) => {
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h2 className="mb-2 text-base font-bold text-slate-900">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="relative z-10 container mx-auto px-4 pb-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-5 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Featured</p>
                <h2 className="text-xl font-bold text-slate-900">まず読んでほしい3本</h2>
              </div>
              <a
                href="https://note.com/web_hisashi"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                最新記事をnoteで見る
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <a
                href={featuredNotes[0]?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group lg:col-span-2 rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-all"
              >
                <div className="h-44 md:h-52 bg-gradient-to-r from-emerald-100 via-emerald-50 to-white border-b border-slate-200 flex items-center justify-center">
                  <Image
                    src="/note/logo_note.png"
                    alt="note ロゴ"
                    width={200}
                    height={60}
                    className="h-12 md:h-16 w-auto opacity-90"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {featuredNotes[0]?.tag}
                  </span>
                  <h3 className="mt-2 text-lg md:text-xl font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
                    {featuredNotes[0]?.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{featuredNotes[0]?.summary}</p>
                </div>
              </a>

              <div className="space-y-3">
                {featuredNotes.slice(1).map((post) => (
                  <a
                    key={post.title}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                  >
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      {post.tag}
                    </span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700">{post.summary}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm font-semibold text-emerald-900">
                  記事はすべてnote本体で読めます。更新もnote側が最速です。
                </p>
                <a
                  href="https://note.com/web_hisashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  noteで最新記事を開く
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 container mx-auto px-4 pb-12 md:pb-14">
          <div className="grid gap-4 md:grid-cols-3">
            {noteCategories.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">YokaUnit Link</p>
              <h2 className="text-lg font-bold text-slate-900">YokaUnitの関連コンテンツ</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Link
                href="/tools"
                className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white px-4 py-3 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Image src="/logo.png" alt="YokaUnit ロゴ" width={18} height={18} className="rounded-full" />
                  YokaUnitツール一覧
                </div>
                <p className="mt-1 text-xs text-slate-600">すぐ使える便利ツールをまとめてチェック。</p>
              </Link>
              <Link
                href="/beauty"
                className="rounded-2xl border border-rose-100 bg-gradient-to-b from-rose-50 to-white px-4 py-3 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Image src="/logo_heart.png" alt="YokaUnit Beauty ロゴ" width={18} height={18} className="rounded-full" />
                  YokaUnit Beauty
                </div>
                <p className="mt-1 text-xs text-slate-600">無料診断で自分に合う美容を見つける。</p>
              </Link>
              <Link
                href="/store"
                className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white px-4 py-3 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Image src="/Store/logo_store.png" alt="YokaUnit Store ロゴ" width={18} height={18} className="rounded-full" />
                  YokaUnit Store
                </div>
                <p className="mt-1 text-xs text-slate-600">湘南のお店情報をわかりやすく探せる。</p>
              </Link>
            </div>
          </div>

        </section>
      </main>
      <ScrollToTop />
      <NoteFooter />
    </div>
  )
}
