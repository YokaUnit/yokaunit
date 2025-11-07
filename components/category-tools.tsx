"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Crown, Lock, Heart, ArrowRight, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getTools, type Tool } from "@/lib/actions/tools"
import { toggleFavorite, getUserFavorites } from "@/lib/actions/favorites"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

interface CategoryToolsProps {
  category: string
  currentToolSlug?: string
  title?: string
  limit?: number
}

export function CategoryTools({
  category,
  currentToolSlug,
  title = "関連ツール",
  limit = 8,
}: CategoryToolsProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn) {
        try {
          const userFavorites = await getUserFavorites()
          if (Array.isArray(userFavorites)) {
            setFavorites(userFavorites)
          } else {
            setFavorites([])
          }
        } catch (error) {
          console.error("お気に入り取得エラー:", error)
          setFavorites([])
        }
      } else {
        setFavorites([])
      }
    }

    fetchFavorites()
  }, [isLoggedIn])

  // 指定カテゴリのツールを最新更新順で取得
  useEffect(() => {
    const fetchCategoryTools = async () => {
      setLoading(true)
      setError(null)
      try {
        const { tools: toolsData } = await getTools({
          category,
          limit: limit + 5, // 現在のツールを除外するため多めに取得
          userRole: "basic", // プレミアム・非公開を除外
        })

        // RelatedTools/UpdatedToolsShowcase と同じく created_at 降順で確定させる
        const sortedTools = toolsData.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        const filteredTools = currentToolSlug
          ? sortedTools.filter((tool) => tool.slug !== currentToolSlug)
          : sortedTools

        setTools(filteredTools.slice(0, limit))
      } catch (error) {
        console.error("Error fetching category tools:", error)
        setError(error instanceof Error ? error.message : "ツールの取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchCategoryTools()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [category, limit, currentToolSlug])

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
      transition: { staggerChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  if (loading) {
    return (
      <section className="mt-12 pt-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              {title}
            </h2>
            <Link href="/tools" className="text-sm text-blue-600 hover:underline flex items-center">
              もっと見る <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-video"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || tools.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            {title}
          </h2>
          <Link href="/tools" className="text-sm text-blue-600 hover:underline flex items-center">
            もっと見る <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {tools.map((tool) => (
            <motion.div key={tool.slug} variants={item}>
              <Link href={tool.href} onClick={() => window.scrollTo(0, 0)}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-green-200 bg-white hover:translate-y-[-2px]">
                  <div className="relative">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      {tool.image_url ? (
                        <Image
                          src={tool.image_url}
                          alt={tool.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
                          <div className="text-4xl">{tool.icon}</div>
                        </div>
                      )}

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

                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
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
            </motion.div>) )}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50"
            onClick={() => {
              router.push("/tools")
              window.scrollTo(0, 0)
            }}
          >
            すべてのツールを見る
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}


