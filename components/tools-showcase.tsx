"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, Crown, Lock, Heart, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getTools, type Tool } from "@/lib/actions/tools"
import { toggleFavorite, getUserFavorites } from "@/lib/actions/favorites"
import { useAuth } from "@/hooks/use-auth"
import { AuthDebugPanel } from "@/components/auth-debug-panel"
import Image from "next/image"

export function ToolsShowcase() {
  const [activeCategory, setActiveCategory] = useState("popular")
  const [favorites, setFavorites] = useState<string[]>([])
  const [displayCount, setDisplayCount] = useState(12)
  const [popularTools, setPopularTools] = useState<Tool[]>([])
  const [newTools, setNewTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { isLoggedIn } = useAuth()

  // 画面サイズに応じて表示数を調整（SSR対応）
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      
      if (window.innerWidth >= 1280) {
        setDisplayCount(12)
      } else if (window.innerWidth >= 1024) {
        setDisplayCount(10)
      } else if (window.innerWidth >= 768) {
        setDisplayCount(8)
      } else if (window.innerWidth >= 640) {
        setDisplayCount(8)
      } else {
        setDisplayCount(8)
      }
    }

    // 初期設定（SSR対応）
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener("resize", handleResize)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  // お気に入りを取得
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn) {
        try {
          const userFavorites = await getUserFavorites()
          // 配列であることを確認
          if (Array.isArray(userFavorites)) {
            setFavorites(userFavorites)
          } else {
            setFavorites([])
          }
        } catch (error) {
          console.error("お気に入り取得エラー:", error)
          setFavorites([]) // エラー時は空配列
        }
      } else {
        setFavorites([]) // ログインしていない場合は空配列
      }
    }

    fetchFavorites()
  }, [isLoggedIn])

  // 人気ツールと新着ツールを両方取得（デバウンス付き）
  useEffect(() => {
    const fetchAllTools = async () => {
      setLoading(true)
      setError(null)
      try {
        // 並列でデータを取得してパフォーマンス向上
        const [popularResult, newResult] = await Promise.all([
          getTools({
            limit: displayCount,
            isPopular: true,
          }),
          getTools({
            limit: displayCount + 5, // 多めに取得してからソート
            userRole: "basic", // プレミアムツールと非公開ツールを除外
          })
        ])
        
        // 新着ツールは created_at で降順ソート（最新が先頭）- いいね数順は使わない
        const sortedNewTools = newResult.tools.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        
        setPopularTools(popularResult.tools)
        setNewTools(sortedNewTools.slice(0, displayCount)) // 指定された数まで制限
      } catch (error) {
        console.error("Error fetching tools:", error)
        setError(error instanceof Error ? error.message : "ツールの取得に失敗しました")
        toast({
          title: "エラー",
          description: "ツールの取得に失敗しました",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // デバウンス処理
    const timeoutId = setTimeout(() => {
      fetchAllTools()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [displayCount, toast])

  const toggleFavoriteHandler = async (e: React.MouseEvent, toolSlug: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      toast({
        title: "ログインが必要です",
        description: "お気に入り機能を使用するにはログインしてください",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await toggleFavorite(toolSlug)

      if (result.success) {
        if (result.isFavorited) {
          setFavorites([...favorites, toolSlug])
        } else {
          setFavorites(favorites.filter((slug) => slug !== toolSlug))
        }

        toast({
          title: result.message,
          description: result.isFavorited
            ? "マイページのお気に入りリストから確認できます"
            : "マイページのお気に入りリストから削除されました",
        })

        // ツールデータを再取得してlikes_countを更新（並列処理）
        const [updatedPopularResult, updatedNewResult] = await Promise.all([
          getTools({
            limit: displayCount,
            isPopular: true,
          }),
          getTools({
            limit: displayCount + 5, // 多めに取得してからソート
            userRole: "basic", // プレミアムツールと非公開ツールを除外
          })
        ])
        
        // 新着ツールは created_at で降順ソート（最新が先頭）- いいね数順は使わない
        const sortedNewTools = updatedNewResult.tools.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        
        setPopularTools(updatedPopularResult.tools)
        setNewTools(sortedNewTools.slice(0, displayCount)) // 指定された数まで制限
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "お気に入りの更新に失敗しました",
        variant: "destructive",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  // 現在のタブに応じてツールを取得
  const currentTools = activeCategory === "popular" ? popularTools : newTools

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">ツール一覧</h2>
          <Link href="/tools" className="text-sm text-blue-600 hover:underline flex items-center">
            もっと見る <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: displayCount }).map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-[3/2]"></div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">ツール一覧</h2>
          <Link href="/tools" className="text-sm text-blue-600 hover:underline flex items-center">
            もっと見る <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">データの読み込みに失敗しました</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            再読み込み
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">ツール一覧</h2>
        <Link href="/tools" className="text-sm text-blue-600 hover:underline flex items-center">
          もっと見る <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-max">
            <TabsTrigger value="popular">人気のツール</TabsTrigger>
            <TabsTrigger value="new">最新ツール</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="popular" className="mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {popularTools.map((tool) => (
              <motion.div key={tool.slug} variants={item}>
                <Link href={tool.href} onClick={() => window.scrollTo(0, 0)}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200 bg-white hover:translate-y-[-2px]">
                    <div className="relative">
                      {/* 画像表示部分 - 3:2アスペクト比 (1536×1024px) */}
                      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                        {tool.image_url ? (
                          <Image
                            src={tool.image_url}
                            alt={tool.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                            <div className="text-4xl">{tool.icon}</div>
                          </div>
                        )}
                        
                        {/* オーバーレイバッジ */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          {tool.is_premium && (
                            <Badge className="bg-yellow-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                          {tool.is_private && (
                            <Badge className="bg-blue-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                          {tool.is_new && !tool.is_premium && !tool.is_private && (
                            <Badge className="bg-green-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              NEW
                            </Badge>
                          )}
                        </div>

                        {/* お気に入りボタン */}
                        <button
                          className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-all z-10"
                          onClick={(e) => toggleFavoriteHandler(e, tool.slug)}
                          title={
                            Array.isArray(favorites) && favorites.includes(tool.slug)
                              ? "お気に入りから削除"
                              : "お気に入りに追加"
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${Array.isArray(favorites) && favorites.includes(tool.slug) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </button>
                      </div>

                      {/* コンテンツ部分 */}
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200 text-gray-600">
                              {tool.category}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <Heart className="h-3 w-3 mr-1 text-red-400" />
                              <span className="font-medium">{tool.likes_count || 0}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {newTools.map((tool) => (
              <motion.div key={tool.slug} variants={item}>
                <Link href={tool.href} onClick={() => window.scrollTo(0, 0)}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200 bg-white hover:translate-y-[-2px]">
                    <div className="relative">
                      {/* 画像表示部分 - 3:2アスペクト比 (1536×1024px) */}
                      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                        {tool.image_url ? (
                          <Image
                            src={tool.image_url}
                            alt={tool.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                            <div className="text-4xl">{tool.icon}</div>
                          </div>
                        )}
                        
                        {/* オーバーレイバッジ */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          {tool.is_premium && (
                            <Badge className="bg-yellow-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                          {tool.is_private && (
                            <Badge className="bg-blue-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                          {tool.is_new && !tool.is_premium && !tool.is_private && (
                            <Badge className="bg-green-500/90 text-white text-xs px-2 py-1 backdrop-blur-sm">
                              NEW
                            </Badge>
                          )}
                        </div>

                        {/* お気に入りボタン */}
                        <button
                          className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-all z-10"
                          onClick={(e) => toggleFavoriteHandler(e, tool.slug)}
                          title={
                            Array.isArray(favorites) && favorites.includes(tool.slug)
                              ? "お気に入りから削除"
                              : "お気に入りに追加"
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${Array.isArray(favorites) && favorites.includes(tool.slug) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </button>
                      </div>

                      {/* コンテンツ部分 */}
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200 text-gray-600">
                              {tool.category}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <Heart className="h-3 w-3 mr-1 text-red-400" />
                              <span className="font-medium">{tool.likes_count || 0}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => {
            router.push("/tools")
            window.scrollTo(0, 0)
          }}
        >
          すべてのツールを見る
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && <AuthDebugPanel />}
    </section>
  )
}
