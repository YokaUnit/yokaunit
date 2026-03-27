"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const moviesNavigationItems = [
  { href: "/movies", title: "トップ" },
  { href: "/movies#catalog", title: "作品一覧" },
  { href: "/movies#services", title: "配信サービス" },
]

export function MoviesSiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070a12]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1700px] px-4 md:px-6 xl:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/movies" className="flex min-w-0 max-w-[calc(100%-3rem)] items-center gap-2 sm:gap-2.5">
            <Image
              src="/movies/logo_movies.png"
              alt="YokaUnit Movies"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg border border-white/10 object-cover"
            />
            <div className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[15px] font-bold text-white sm:text-[16px]">
                YokaUnit Movies
              </span>
              <span className="hidden text-[11px] text-slate-400 sm:block">
                配信と評価をひと画面に
              </span>
            </div>
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            {moviesNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-amber-300"
                    : "text-slate-200 hover:text-amber-200",
                )}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber-300 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-white/15 bg-white/[0.03] text-xs text-slate-200 hover:bg-white/10 md:inline-flex"
              asChild
            >
              <Link href="/">YokaUnit 本体へ</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-200 hover:bg-white/10 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#070a12]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-[1700px] space-y-3 px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {moviesNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1.5 text-sm text-slate-100 transition-colors hover:text-amber-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/15 bg-white/[0.03] text-xs text-slate-200 hover:bg-white/10"
                  asChild
                >
                  <Link href="/">YokaUnit 本体へ</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
