"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORE_BRAND_COLOR = "#1F8A2B"

const navigationItems = [
  { href: "/store", title: "トップ" },
  { href: "/store#concept", title: "コンセプト" },
  { href: "/store#features", title: "機能" },
  { href: "/store#contact", title: "無料掲載" },
]

export function StoreSiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const activeHref = useMemo(() => {
    if (!pathname) return "/store"
    return pathname.startsWith("/store") ? "/store" : pathname
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/store" className="flex items-center gap-2">
            <Image src="/Store/logo_store.png" alt="YokaUnit Store" width={32} height={32} priority />
            <div className="flex flex-col leading-tight">
              <span className="text-[18px] font-black tracking-wide" style={{ color: STORE_BRAND_COLOR }}>
                YokaUnit Store
              </span>
              <span className="text-[11px] text-slate-500">湘南のお店が見つかる</span>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors relative group",
                  activeHref === item.href ? "text-slate-900" : "text-slate-700 hover:text-slate-900",
                )}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900/80 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 右側：無料掲載 */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:inline-flex rounded-full bg-yellow-300 text-slate-950 hover:bg-yellow-200 font-black"
              asChild
            >
              <Link href="/store#contact">無料掲載</Link>
            </Button>

            {/* モバイルメニューボタン */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-800 hover:text-slate-950 transition-colors py-1.5 text-sm font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-200">
                  <Button className="w-full rounded-full bg-yellow-300 text-slate-950 hover:bg-yellow-200 font-black" asChild>
                    <Link href="/store#contact" onClick={() => setIsMenuOpen(false)}>
                      無料掲載
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

