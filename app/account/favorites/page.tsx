"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Heart, Clock, Loader2, Crown, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { CategoryIcon } from "@/components/category-icon"
import { toast } from "sonner"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion, AnimatePresence } from "framer-motion"

interface FavoriteTool {
  id: string
  slug: string
  title: string
  description: string
  category: string
  icon: string
  href: string
  is_premium: boolean
  is_new: boolean
}

export default function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<FavoriteTool[]>([])
  const [removingFavorite, setRemovingFavorite] = useState<string | null>(null)
  const router = useRouter()
  const { isLoggedIn, user, profile, isPremium, ensureProfileExists } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn || !user) {
        router.push("/login")
        return
      }

      // プロフィールが存在することを確認
      if (user && !profile) {
        await ensureProfileExists(user.id)
      }

      await fetchFavorites()
      setIsLoading(false)
    }

    checkAuth()
  }, [isLoggedIn, user, profile, router, ensureProfileExists])

  const fetchFavorites = async () => {
    if (!user) return

    try {
      // まずユーザーのお気に入りツールのslugを取得
      const { data: favoriteData, error: favoriteError } = await supabase
        .from("user_favorites")
        .select("tool_slug")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (favoriteError) {
        console.error("Error fetching user favorites:", favoriteError)
        return
      }

      if (!favoriteData || favoriteData.length === 0) {
        setFavorites([])
        return
      }

      // お気に入りのツールslugの配列を作成
      const toolSlugs = favoriteData.map((item) => item.tool_slug)

      // 次に、これらのslugに対応するツール情報を取得
      const { data: toolsData, error: toolsError } = await supabase.from("tools").select("*").in("slug", toolSlugs)

      if (toolsError) {
        console.error("Error fetching tools:", toolsError)
        return
      }

      // お気に入りの順序を保持するためにソート
      const sortedTools = toolSlugs
        .map((slug) => toolsData.find((tool) => tool.slug === slug))
        .filter((tool) => tool !== undefined) as FavoriteTool[]

      setFavorites(sortedTools)
    } catch (error) {
      console.error("Error fetching favorites:", error)
      toast.error("お気に入りの取得に失敗しました")
    }
  }

  const removeFavorite = async (toolSlug: string) => {
    if (!user) return

    setRemovingFavorite(toolSlug)

    try {
      const { error } = await supabase.from("user_favorites").delete().eq("user_id", user.id).eq("tool_slug", toolSlug)

      if (error) {
        console.error("Error removing favorite:", error)
        toast.error("お気に入りの削除に失敗しました")
        return
      }

      // いいね数を減らす
      const { error: decrementError } = await supabase.rpc("decrement_likes", {
        slug_to_update: toolSlug,
      })

      if (decrementError) {
        console.error("Error decrementing likes:", decrementError)
      }

      // 再取得
      await fetchFavorites()
      toast.success("お気に入りから削除しました")
    } catch (error) {
      console.error("Error removing favorite:", error)
      toast.error("お気に入りの削除に失敗しました")
    } finally {
      setRemovingFavorite(null)
    }
  }

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

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
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
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
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
                { label: "お気に入り", href: "/account/favorites" },
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
                <motion.div variants={cardHoverVariants} whileHover="hover" className="mb-6">
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
                    { href: "/account/favorites", icon: Heart, label: "お気に入り", active: true },
                    { href: "/account/history", icon: Clock, label: "利用履歴", active: false },
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
                <motion.div variants={cardHoverVariants} whileHover="hover">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Heart className="h-6 w-6 text-red-500" />
                        お気に入りツール
                        <Badge variant="outline" className="ml-2">
                          {favorites.length}件
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {favorites.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-12"
                        >
                          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">お気に入りがありません</h3>
                          <p className="text-gray-500 mb-6">気に入ったツールをお気に入りに追加しましょう</p>
                          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/tools">ツール一覧を見る</Link>
                          </Button>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          <AnimatePresence>
                            {favorites.map((tool, index) => (
                              <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.01 }}
                                className="group"
                              >
                                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-50/80 transition-all duration-300 border border-transparent hover:border-blue-200">
                                  <div className="flex items-center flex-1">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                                      <CategoryIcon category={tool.category} className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                          {tool.title}
                                        </h3>
                                        {tool.is_new && (
                                          <Badge className="bg-green-100 text-green-800 text-xs">NEW</Badge>
                                        )}
                                        {tool.is_premium && (
                                          <Badge className="bg-yellow-100 text-yellow-800 text-xs flex items-center gap-1">
                                            <Crown className="h-3 w-3" />
                                            プレミアム
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-500 line-clamp-1">{tool.description}</p>
                                      <Badge variant="outline" className="mt-1 text-xs">
                                        {tool.category}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                      asChild
                                    >
                                      <Link href={tool.href}>
                                        <ExternalLink className="h-4 w-4 mr-1" />
                                        開く
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => removeFavorite(tool.slug)}
                                      disabled={removingFavorite === tool.slug}
                                    >
                                      {removingFavorite === tool.slug ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
