import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "map_shonan（準備中） | YokaUnit Store",
  description: "map_shonan は現在準備中です。公開までしばらくお待ちください。",
  robots: {
    index: false,
    follow: false,
  },
}

export default function MapShonanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase mb-2">
            YokaUnit Store
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            map_shonan は現在準備中です
          </h1>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
            このページは再編中です。公開までしばらくお待ちください。
          </p>
          <Link
            href="/store"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            Storeトップへ戻る
          </Link>
        </div>
      </main>
    </div>
  )
}
