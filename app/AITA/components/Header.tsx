"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const isListPage = pathname?.includes("/list")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 safe-area-top">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-1 sm:gap-4">
          {/* ロゴ（モバイルで小さく） */}
          <Link 
            href="/" 
            className="flex items-center gap-1 sm:gap-2 active:opacity-90 transition-opacity touch-manipulation min-h-[36px] sm:min-h-[44px] items-center justify-center flex-shrink-0 rounded-lg px-1.5 sm:px-3 py-1 sm:py-2 hover:bg-gray-50 transition-all relative bg-white"
            style={{
              boxShadow: `
                0 0 0 1px rgba(255, 255, 255, 0.3),
                0 0 12px rgba(255, 255, 255, 0.15),
                0 0 24px rgba(255, 255, 255, 0.08),
                0 0 40px rgba(255, 255, 255, 0.03)
              `,
            }}
            aria-label="YokaUnitホームへ戻る"
            title="YokaUnitホームへ戻る"
          >
            <Image
              src="/logo.png"
              alt="YokaUnit"
              width={32}
              height={32}
              className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10"
              priority
            />
            <span className="text-[10px] sm:text-sm md:text-base font-bold text-gray-900 whitespace-nowrap relative z-10">
              YokaUnitへ
            </span>
          </Link>
          
          {/* タイトル（デスクトップ） */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center flex-1 hidden sm:flex items-center justify-center gap-2">
            <Image
              src="/yokaunit_fire.png"
              alt="炎"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              priority
            />
            世界炎上裁判所
          </h1>
          
          {/* タイトル（モバイル） */}
          <h1 className="text-sm sm:text-base font-bold text-white text-center flex-1 sm:hidden flex items-center justify-center gap-1.5 whitespace-nowrap">
            <Image
              src="/yokaunit_fire.png"
              alt="炎"
              width={20}
              height={20}
              className="w-5 h-5"
              priority
            />
            世界炎上裁判所
          </h1>
          
          {/* タブナビゲーション（モバイルで小さく） */}
          <nav className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0" aria-label="ページ切り替え">
            <Link
              href="/AITA"
              className={`px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm md:text-base font-medium transition-all touch-manipulation min-h-[32px] sm:min-h-[40px] flex items-center justify-center whitespace-nowrap ${
                !isListPage
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              <span>おすすめ</span>
            </Link>
            <Link
              href="/AITA/list"
              className={`px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm md:text-base font-medium transition-all touch-manipulation min-h-[32px] sm:min-h-[40px] flex items-center justify-center whitespace-nowrap ${
                isListPage
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              <span>まとめ</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

