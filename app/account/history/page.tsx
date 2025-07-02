"use client"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Heart, Crown, Clock, Calendar, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion } from "framer-motion"

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { isLoggedIn, user, profile, isPremium } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn || !user) {
        router.push("/login")
        return
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [isLoggedIn, user, router])

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BackgroundAnimation />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg"
          >
            <Clock className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">読み込み中...</p>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BackgroundAnimation />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
          >
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">この機能を利用するにはログインが必要です。</p>
            <Button onClick={() => router.push("/login")} className="bg-blue-600 hover:bg-blue-700">
              ログイン
            </Button>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <BackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1 relative">
        <div className="container mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "マイページ", href: "/account" },
                { label: "利用履歴", href: "/account/history" },
              ]}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto mt-6"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* サイドバー */}
              <motion.div variants={itemVariants} className="w-full lg:w-80">
                <motion.div className="mb-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
                        >
                          <User className="h-12 w-12 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl text-center">{profile?.username || "ユーザー"}</CardTitle>
                        <p className="text-sm text-gray-500 text-center">{profile?.email}</p>
                        {isPremium && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 flex items-center gap-1 px-3 py-1">
                              <Crown className="h-3 w-3" />
                              <span>プレミアム会員</span>
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  {[
                    { href: "/account", icon: User, label: "アカウント情報", active: false },
                    { href: "/account/favorites", icon: Heart, label: "お気に入り", active: false },
                    { href: "/account/history", icon: Clock, label: "利用履歴", active: true },
                    { href: "/account/settings", icon: Settings, label: "設定", active: false },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Button
                        variant={item.active ? "default" : "outline"}
                        className={`w-full justify-start h-12 transition-all duration-300 ${
                          item.active
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                            : "bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200 hover:border-blue-300"
                        }`}
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* メインコンテンツ */}
              <motion.div variants={itemVariants} className="flex-1">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Clock className="h-6 w-6 text-blue-600" />
                      利用履歴
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6"
                      >
                        <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">利用履歴機能は準備中です</h3>
                        <p className="text-gray-500 mb-6">
                          ツールの利用履歴やアクセス統計などの機能を開発中です。
                          <br />
                          近日中にリリース予定ですので、しばらくお待ちください。
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-medium text-gray-700">利用日時</h4>
                            <p className="text-sm text-gray-500">ツール使用履歴</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4">
                            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-medium text-gray-700">使用統計</h4>
                            <p className="text-sm text-gray-500">利用回数・時間</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-4">
                            <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-medium text-gray-700">お気に入り</h4>
                            <p className="text-sm text-gray-500">保存したツール</p>
                          </div>
                        </div>

                        <Button variant="outline" className="bg-white/60 backdrop-blur-sm hover:bg-white/80" asChild>
                          <Link href="/tools">ツール一覧を見る</Link>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
