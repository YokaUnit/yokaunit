"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Lock, Crown, Filter, Heart, X, Gamepad2, Loader2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { getTools, getCategories, type Tool } from "@/lib/actions/tools"
import { getUserFavorites, toggleFavorite } from "@/lib/actions/favorites"
import { useAuth } from "@/hooks/use-auth"
import { normalizeSearchQuery } from "@/lib/search-utils"

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"popular" | "new" | "name">("popular")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [allTools, setAllTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { isLoggedIn } = useAuth()

  // ログイン状態とお気に入りの確認
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn) {
        try {
          const userFavorites = await getUserFavorites()
          setFavorites(userFavorites)
        } catch (error) {
          console.error("Error fetching favorites:", error)
        }
      }
    }

    fetchFavorites()
  }, [isLoggedIn])

  // カテゴリーを取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // 全ツールデータを一度だけ取得
  useEffect(() => {
    const fetchAllTools = async () => {
      setLoading(true)
      setError(null)
      try {
        // 全てのツールを一度に取得
        const { tools: fetchedTools } = await getTools({})
        setAllTools(fetchedTools)
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

    fetchAllTools()
  }, [toast])

  // フィルタリングされたツールをメモ化
  const filteredTools = useMemo(() => {
    let filtered = [...allTools]

    // 検索クエリでフィルタ（ひらがな・カタカナ対応）
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeSearchQuery(searchQuery.toLowerCase().trim())
      filtered = filtered.filter((tool) => {
        const normalizedTitle = normalizeSearchQuery(tool.title.toLowerCase())
        const normalizedDescription = normalizeSearchQuery(tool.description.toLowerCase())
        const normalizedCategory = normalizeSearchQuery(tool.category.toLowerCase())

        return (
          normalizedTitle.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery) ||
          normalizedCategory.includes(normalizedQuery)
        )
      })
    }

    // カテゴリーでフィルタ
    if (selectedCategory) {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    // タブでフィルタ
    if (activeTab === "popular") {
      filtered = filtered.filter((tool) => tool.is_popular)
    } else if (activeTab === "new") {
      filtered = filtered.filter((tool) => tool.is_new)
    } else if (activeTab === "premium") {
      filtered = filtered.filter((tool) => tool.is_premium)
    } else if (activeTab === "private") {
      filtered = filtered.filter((tool) => tool.is_private)
    } else if (activeTab !== "all") {
      // カテゴリータブの場合
      filtered = filtered.filter((tool) => tool.category === activeTab)
    }

    // ソート
    if (sortOrder === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === "new") {
      filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    }
    // popularはデフォルトの順序を維持

    return filtered
  }, [allTools, searchQuery, selectedCategory, activeTab, sortOrder])

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
          toast({
            title: "お気に入りに追加しました",
            description: "マイページのお気に入りリストから確認できます",
          })
        } else {
          setFavorites(favorites.filter((slug) => slug !== toolSlug))
          toast({
            title: "お気に入りから削除しました",
            description: "マイページのお気に入りリストから削除されました",
          })
        }
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "お気に入りの更新に失敗しました",
        variant: "destructive",
      })
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSortOrder("popular")
  }

  // アニメーション設定
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

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BackgroundAnimation />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">ツールを読み込み中...</p>
          </div>
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

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ツール一覧</h1>
            <p className="text-gray-600 text-sm">
              様々なカテゴリーの便利なツールを探索しましょう。お気に入りのツールを見つけて、作業を効率化しましょう。
            </p>
          </motion.div>

          {/* 検索バーとフィルターボタン */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex gap-2">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-hover:text-blue-500" />
                <Input
                  type="text"
                  placeholder="ツールを検索... (ひらがな・カタカナ対応)"
                  className="pl-10 transition-all duration-300 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">フィルター</span>
              </Button>
            </div>
          </motion.div>

          {/* フィルターとソート（折りたたみ可能） */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative"
              >
                <button
                  onClick={() => setShowFilters(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-1 min-w-[150px]">
                    <Select
                      value={selectedCategory || ""}
                      onValueChange={(value) => {
                        setSelectedCategory(value === "all_categories" ? null : value)
                      }}
                    >
                      <SelectTrigger className="h-9 text-xs border-gray-200 hover:border-blue-300 transition-all duration-300">
                        <SelectValue placeholder="カテゴリー" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_categories">すべて</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-1 min-w-[120px]">
                    <Select
                      value={sortOrder}
                      onValueChange={(value: "popular" | "new" | "name") => setSortOrder(value)}
                    >
                      <SelectTrigger className="h-9 text-xs border-gray-200 hover:border-blue-300 transition-all duration-300">
                        <SelectValue placeholder="並び替え" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">人気順</SelectItem>
                        <SelectItem value="new">新着順</SelectItem>
                        <SelectItem value="name">名前順</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs h-9 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                  >
                    クリア
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Tabs
              defaultValue="all"
              className="w-full mb-6"
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
              }}
            >
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex min-w-max bg-gray-100">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    すべて
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    人気
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    新着
                  </TabsTrigger>
                  <TabsTrigger
                    value="premium"
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    <Crown className="h-3 w-3 text-yellow-500" />
                    プレミアム
                  </TabsTrigger>
                  <TabsTrigger
                    value="private"
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    <Lock className="h-3 w-3 text-blue-500" />
                    限定公開
                  </TabsTrigger>
                  <TabsTrigger
                    value="ゲーム"
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                  >
                    <Gamepad2 className="h-3 w-3" />
                    ゲーム
                  </TabsTrigger>
                  {categories
                    .filter((category) => category !== "ゲーム")
                    .slice(0, 4)
                    .map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-4">
                {error ? (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <p className="text-gray-500 mb-4">データの読み込みに失敗しました</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      再読み込み
                    </Button>
                  </motion.div>
                ) : filteredTools.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                  >
                    {filteredTools.map((tool) => (
                      <motion.div key={tool.slug} variants={item}>
                        <Link href={tool.href} className="block">
                          <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-blue-200 relative bg-white hover:translate-y-[-2px]">
                            {tool.is_premium && (
                              <div className="absolute top-0 right-0">
                                <Badge
                                  className="rounded-bl-lg rounded-tr-lg bg-yellow-100 text-yellow-800 flex items-center gap-1 px-2 py-0.5"
                                  title="プレミアム会員限定ツール"
                                >
                                  <Crown className="h-3 w-3" />
                                </Badge>
                              </div>
                            )}
                            {tool.is_private && (
                              <div className="absolute top-0 right-0">
                                <Badge
                                  className="rounded-bl-lg rounded-tr-lg bg-blue-100 text-blue-800 flex items-center gap-1 px-2 py-0.5"
                                  title="限定公開ツール"
                                >
                                  <Lock className="h-3 w-3" />
                                </Badge>
                              </div>
                            )}

                            <button
                              className="absolute top-1 left-1 text-gray-400 hover:text-red-500 transition-colors z-10"
                              onClick={(e) => toggleFavoriteHandler(e, tool.slug)}
                              title={favorites.includes(tool.slug) ? "お気に入りから削除" : "お気に入りに追加"}
                            >
                              <Heart
                                className={`h-4 w-4 ${favorites.includes(tool.slug) ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </button>

                            <CardContent className="p-2 pt-6">
                              <div className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-medium text-sm text-gray-900 line-clamp-1">{tool.title}</h3>
                                  {tool.is_new && !tool.is_premium && !tool.is_private && (
                                    <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-full">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2 mb-1">{tool.description}</p>
                                <div className="mt-auto flex justify-between items-center">
                                  <Badge variant="outline" className="text-xs px-1 py-0 border-gray-200">
                                    {tool.category}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <p className="text-gray-500 mb-4">ツールが見つかりませんでした</p>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
