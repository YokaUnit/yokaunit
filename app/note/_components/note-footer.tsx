import Image from "next/image"
import Link from "next/link"

export function NoteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-white/95">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Image src="/note/logo_yokaunit+note.png" alt="YokaUnit Note" width={164} height={44} className="h-8 w-auto" />
            <p className="mt-2 text-sm text-slate-600">一人開発の実測データと失敗ログを届ける実践メディア</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href="https://note.com/web_hisashi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              note本体
            </a>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              YokaUnitトップ
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} YokaUnit Note</p>
      </div>
    </footer>
  )
}
