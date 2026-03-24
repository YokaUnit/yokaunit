import Image from "next/image"
import Link from "next/link"

export function NoteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/note" className="flex items-center gap-2">
          <Image src="/note/logo_yokaunit+note.png" alt="YokaUnit Note" width={164} height={44} className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-2">
          <a
            href="https://note.com/web_hisashi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            note本体
          </a>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            YokaUnitへ戻る
          </Link>
        </nav>
      </div>
    </header>
  )
}
