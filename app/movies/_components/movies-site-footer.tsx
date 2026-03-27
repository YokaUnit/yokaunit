"use client"

import Link from "next/link"
import Image from "next/image"
import { Clapperboard, Home, Mail, FileText } from "lucide-react"

export function MoviesSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070d]">
      <div className="mx-auto max-w-[1700px] px-3 py-8 sm:px-4 sm:py-10 md:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="space-y-4">
            <Link
              href="/movies"
              className="group flex items-start gap-3 rounded-lg outline-none ring-offset-2 ring-offset-[#05070d] focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              <Image
                src="/movies/logo_movies.png"
                alt="YokaUnit Movies"
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <div className="min-w-0 leading-tight">
                <p className="text-base font-bold text-white group-hover:text-amber-100/95 transition-colors">
                  YokaUnit Movies
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  映画をどのVODで見れるか一発で検索
                </p>
              </div>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Netflix・Prime・U-NEXT など、契約しているサービスに合わせて候補を絞り込みます。Filmarks・映画.com
              の平均も一覧できます。掲載の評価はデモです。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              ページ内
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Clapperboard className="h-4 w-4 shrink-0 text-amber-300/90" aria-hidden />
                  トップ
                </Link>
              </li>
              <li>
                <Link
                  href="/movies#catalog"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Clapperboard className="h-4 w-4 shrink-0 text-amber-300/90" aria-hidden />
                  作品一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/movies#services"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Clapperboard className="h-4 w-4 shrink-0 text-amber-300/90" aria-hidden />
                  配信サービス
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              YokaUnit
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Home className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  トップページ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <FileText className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="text-slate-400 underline-offset-2 hover:text-slate-300 hover:underline"
            >
              YokaUnit
            </Link>
            （ヨカユニット） / YokaUnit Movies
          </p>
        </div>
      </div>
    </footer>
  )
}
