import type { Metadata } from "next"
import Link from "next/link"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "YokaUnit Store",
  description:
    "YokaUnit Store のページです。現在ストア系コンテンツは再編中です。",
  openGraph: {
    title: "YokaUnit Store",
    description: "YokaUnit Store のページです。現在ストア系コンテンツは再編中です。",
    url: "https://yokaunit.com/store",
    siteName: "YokaUnit Store",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://yokaunit.com/store",
  },
}

export default function StoreEntryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Store</p>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">YokaUnit Store</h1>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            ストア関連ページは現在再編中です。公開準備が整い次第、順次公開します。
          </p>

          <p className="mt-3 text-xs md:text-sm text-slate-600">
            しばらくお待ちください。
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              YokaUnit本体へ戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

