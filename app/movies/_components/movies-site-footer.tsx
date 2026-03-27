"use client"

import Link from "next/link"
import Image from "next/image"
import { Film, Home, Mail, FileText } from "lucide-react"

export function MoviesSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070d]">
      <div className="mx-auto max-w-[1700px] px-3 py-8 sm:px-4 sm:py-10 md:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/movies" className="flex items-center gap-2.5">
              <Image
                src="/movies/logo_movies.png"
                alt="YokaUnit Movies"
                width={30}
                height={30}
                className="h-8 w-8 rounded-lg border border-white/10 object-cover"
              />
              <div className="leading-tight">
                <p className="text-base font-bold text-white">YokaUnit Movies</p>
                <p className="text-xs text-slate-400">配信と評価をひと画面に</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              どのサービスで観れるか、Filmarks と映画.com の平均を併記した一覧です。
              <br />
              実データではなくデモ用の数値が入っています。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Movies</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Film className="h-4 w-4 text-amber-300/90" />
                  トップ
                </Link>
              </li>
              <li>
                <Link
                  href="/movies#catalog"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Film className="h-4 w-4 text-amber-300/90" />
                  作品一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/movies#services"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Film className="h-4 w-4 text-amber-300/90" />
                  配信サービス
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">YokaUnit</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Home className="h-4 w-4 text-slate-300/90" />
                  YokaUnit 本体
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <Mail className="h-4 w-4 text-slate-300/90" />
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-200"
                >
                  <FileText className="h-4 w-4 text-slate-300/90" />
                  特定商取引法表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} YokaUnit（ヨカユニット）. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
