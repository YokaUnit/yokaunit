import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function NoteHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-slate-100/70 blur-3xl" />

      <div className="relative px-6 py-8 md:px-10 md:py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">YokaUnit Note</p>
        <div className="mt-4 flex justify-center">
          <Image
            src="/note/logo_yokaunit+note.png"
            alt="YokaUnit Note ロゴ"
            width={460}
            height={126}
            className="h-auto w-[260px] sm:w-[320px] md:w-[460px]"
            priority
          />
        </div>
        <h1 className="mt-5 text-xl md:text-3xl font-bold leading-tight text-slate-900">
          面倒を減らして、少ない時間で成果を出す。
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-slate-700">
          一人開発の実測データと失敗ログを公開する、実践メディアです。
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            実測データ
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            失敗ログ
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            再現しやすい手順
          </span>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <a
            href="https://note.com/web_hisashi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            note本体を見る
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            YokaUnitトップへ戻る
          </Link>
        </div>
      </div>
    </section>
  )
}
