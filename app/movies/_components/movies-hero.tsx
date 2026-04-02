"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Laptop, ListChecks, Armchair } from "lucide-react"
import { cn } from "@/lib/utils"
import { moviesHeroFeatureCard } from "../_lib/movies-theme"

type MoviesHeroProps = {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  onTagPopular: () => void
  onTagNetflix: () => void
  onTagAction: () => void
  onTagRomance: () => void
  onTagArticles: () => void
}

export function MoviesHero({
  query,
  onQueryChange,
  onSearch,
  onTagPopular,
  onTagNetflix,
  onTagAction,
  onTagRomance,
  onTagArticles,
}: MoviesHeroProps) {
  const pill =
    "rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-sm transition hover:border-amber-300/35 hover:bg-amber-400/10 sm:text-sm"

  return (
    <div className="relative w-full">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="relative min-h-[min(78vh,620px)] md:min-h-[520px]">
          <Image
            src="/movies/hero_movies.png"
            alt="映画・ドラマのシネマティックなイメージ"
            fill
            priority
            className="object-cover object-[center_20%] brightness-[1.06] saturate-[1.05]"
            sizes="100vw"
          />
          {/* 写真を多く見せるため薄め。下は #06080f へ自然に接続 */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,8,15,0.38)_0%,rgba(6,8,15,0.22)_35%,rgba(6,8,15,0.45)_65%,rgba(6,8,15,0.88)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_15%,rgba(251,191,36,0.05),transparent_60%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-10 text-center md:pb-24 md:pt-14">
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75),0_4px_32px_rgba(0,0,0,0.35)] sm:text-3xl md:text-4xl">
              あなたにピッタリの映画、すぐ見つかる。
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:text-base">
              迷ったらここで検索！映画選びの最適化プラットフォーム。
            </p>

            <form
              className="mt-8 w-full max-w-2xl"
              onSubmit={(e) => {
                e.preventDefault()
                onSearch()
              }}
            >
              <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
                <label htmlFor="movies-hero-search" className="sr-only">
                  映画・ドラマを検索
                </label>
                <input
                  id="movies-hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="映画・ドラマを検索…"
                  className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-4 text-base text-slate-900 placeholder:text-slate-400 outline-none sm:min-h-14 sm:px-5"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-amber-300 px-6 text-sm font-semibold text-black transition hover:bg-amber-200 sm:px-8 sm:text-base"
                >
                  検索
                </button>
              </div>
            </form>

            <div className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              <button type="button" onClick={onTagPopular} className={pill}>
                人気作
              </button>
              <button
                type="button"
                onClick={onTagNetflix}
                className={cn(pill, "text-[#E50914] hover:border-red-500/40 hover:bg-red-500/10")}
              >
                Netflix
              </button>
              <button type="button" onClick={onTagAction} className={pill}>
                アクション
              </button>
              <button type="button" onClick={onTagRomance} className={pill}>
                恋愛
              </button>
              <button type="button" onClick={onTagArticles} className={pill}>
                最新記事
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-12 max-w-6xl px-3 sm:-mt-16 sm:px-4 md:-mt-24 md:px-6">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
          <Link
            href="/movies#services"
            className={cn(
              moviesHeroFeatureCard,
              "group flex flex-col p-4 text-left hover:border-sky-400/40 hover:shadow-[0_12px_40px_rgba(14,165,233,0.12)] md:p-5"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white md:text-base">
                  どこで観れる？
                </p>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                  配信サービスを一覧表示！
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 ring-1 ring-sky-400/40">
                <Laptop className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-300">
              配信検索
              <ChevronRight className="ml-0.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/movies#spotlight"
            className={cn(
              moviesHeroFeatureCard,
              "group flex flex-col p-4 text-left hover:border-amber-400/45 hover:shadow-[0_12px_40px_rgba(251,191,36,0.12)] md:p-5"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white md:text-base">
                  観るべき？診断
                </p>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                  作品選びの決め手！
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-400 ring-1 ring-amber-400/40">
                <ListChecks className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-amber-300">
              診断スタート
              <ChevronRight className="ml-0.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/movies#catalog"
            className={cn(
              moviesHeroFeatureCard,
              "group flex flex-col p-4 text-left hover:border-violet-400/40 hover:shadow-[0_12px_40px_rgba(167,139,250,0.1)] md:p-5"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white md:text-base">
                  気分で探す映画
                </p>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                  今の気分にぴったりの作品！
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 ring-1 ring-violet-400/35">
                <Armchair className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-violet-300">
              映画を探す
              <ChevronRight className="ml-0.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>

      <div className="h-6 sm:h-8 md:h-10" aria-hidden />
    </div>
  )
}
