"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Crown, Settings, LayoutDashboard, Heart, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const { isLoggedIn, profile, isPremium, isAdmin, isDeveloper, signOut } = useAuth()
  const username = profile?.username || "ユーザー"

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
    setIsUserDropdownOpen(false)
  }

  const handleUserDropdownItemClick = (path: string) => {
    router.push(path)
    setIsUserDropdownOpen(false)
  }

  // ログイン前のナビゲーション項目
  const publicNavigationItems = [
    { href: "/tools", title: "ツール一覧" },
    { href: "/premium", title: "有料会員" },
    { href: "/corporate", title: "企業の方へ" },
    { href: "/contact", title: "お問い合わせ" },
  ]

  // ログイン後のナビゲーション項目（プレミアムツールを削除）
  const privateNavigationItems = [
    { href: "/tools", title: "ツール一覧" },
    { href: "/premium", title: "有料会員" },
    { href: "/corporate", title: "企業の方へ" },
    { href: "/contact", title: "お問い合わせ" },
  ]

  const navigationItems = isLoggedIn ? privateNavigationItems : publicNavigationItems

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="YokaUnit" width={32} height={32} className="rounded-full" />
              <span className={`text-xl font-bold ${isDeveloper ? "text-amber-600" : "text-blue-600"}`}>YokaUnit</span>
              {isDeveloper && (
                <Badge className="ml-2 bg-amber-200 text-amber-800 hover:bg-amber-300">開発者モード</Badge>
              )}
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 relative group",
                  pathname === item.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600",
                )}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              /* ユーザードロップダウンメニュー */
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                    isDeveloper ? "text-amber-700 hover:bg-amber-100" : "hover:bg-gray-100",
                    isUserDropdownOpen && "bg-gray-100",
                  )}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline-block max-w-[100px] truncate">
                    {isDeveloper ? "開発者" : username}
                  </span>
                  <ChevronDown
                    className={cn("h-3 w-3 transition-transform duration-200", isUserDropdownOpen && "rotate-180")}
                  />
                </Button>

                {/* ドロップダウンメニュー */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <>
                      {/* オーバーレイ */}
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />

                      {/* ドロップダウンコンテンツ */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                      >
                        {/* ユーザー情報 */}
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {isDeveloper ? "開発者アカウント" : username}
                          </p>
                          <p className="text-xs text-gray-500">{profile?.email}</p>
                        </div>

                        {/* メニュー項目 */}
                        <div className="py-1">
                          <button
                            onClick={() => handleUserDropdownItemClick("/account")}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <User className="h-4 w-4 mr-2" />
                            マイページ
                          </button>

                          <button
                            onClick={() => handleUserDropdownItemClick("/account/favorites")}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            お気に入り
                          </button>

                          <button
                            onClick={() => handleUserDropdownItemClick("/account/settings")}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            設定
                          </button>

                          {(isAdmin || isDeveloper) && (
                            <>
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                onClick={() => handleUserDropdownItemClick("/admin/dashboard")}
                                className="flex items-center w-full px-3 py-2 text-sm hover:bg-amber-50 transition-colors"
                              >
                                <LayoutDashboard className="h-4 w-4 mr-2 text-amber-600" />
                                <span className="text-amber-700">管理ダッシュボード</span>
                              </button>
                              <button
                                onClick={() => handleUserDropdownItemClick("/admin/tools")}
                                className="flex items-center w-full px-3 py-2 text-sm hover:bg-amber-50 transition-colors"
                              >
                                <Settings className="h-4 w-4 mr-2 text-amber-600" />
                                <span className="text-amber-700">ツール管理</span>
                              </button>
                            </>
                          )}

                          <div className="border-t border-gray-100 my-1" />

                          {!isPremium && (
                            <button
                              onClick={() => handleUserDropdownItemClick("/premium")}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                            >
                              <Crown className="h-4 w-4 mr-2 text-gray-400" />
                              有料会員になる
                            </button>
                          )}

                          <div className="border-t border-gray-100 my-1" />

                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-red-50 transition-colors text-red-600"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            ログアウト
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => router.push("/signup")}>
                  新規登録
                </Button>
                <Button size="sm" className="hidden md:flex" onClick={() => router.push("/login")}>
                  ログイン
                </Button>
              </div>
            )}

            {/* モバイルメニューボタン */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className={`md:hidden border-t ${
              isDeveloper ? "border-amber-200 bg-amber-50/80" : "border-gray-200 bg-white/80"
            } backdrop-blur-md`}
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors py-1.5 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <></>
                ) : (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        router.push("/signup")
                        setIsMenuOpen(false)
                      }}
                    >
                      新規登録
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        router.push("/login")
                        setIsMenuOpen(false)
                      }}
                    >
                      ログイン
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
