"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const beautyNavigationItems = [
  { href: "/beauty", title: "トップ" },
  { href: "/beauty/diagnosis/skin-type", title: "肌質診断" },
  { href: "/beauty/diagnosis", title: "診断一覧（準備中）" },
  { href: "/beauty/articles", title: "美容記事（準備中）" },
]

export function BeautySiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/beauty" className="flex items-center gap-2">
              <Image src="/logo_heart.png" alt="YokaUnit Beauty" width={32} height={32} className="rounded-full" />
              <div className="flex flex-col leading-tight">
                <span className="text-[18px] font-bold text-gray-900">YokaUnit Beauty</span>
                <span className="text-[11px] text-gray-500">美容診断 × 美容ツール</span>
              </div>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-4">
            {beautyNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === item.href ? "text-rose-600" : "text-gray-700 hover:text-rose-600",
                )}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 右側：メインサイトへのリンク */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
              asChild
            >
              <Link href="/">YokaUnit 本体へ</Link>
            </Button>

            {/* モバイルメニューボタン */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              <nav className="flex flex-col space-y-2">
                {beautyNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-800 hover:text-rose-600 transition-colors py-1.5 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
                    asChild
                  >
                    <Link href="/">YokaUnit 本体へ</Link>
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

