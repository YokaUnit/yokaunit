"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { mockPosts } from "../lib/mockData"
import Header from "../components/Header"
import ArticleCard from "./components/ArticleCard"
import Sidebar from "./components/Sidebar"
import Pagination from "./components/Pagination"
import AITAExplanation from "./components/AITAExplanation"

function AITAListContent() {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1", 10)
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest")

  // ページネーション設定
  const itemsPerPage = 10
  const totalPages = Math.ceil(mockPosts.length / itemsPerPage)

  // ソート処理
  const sortedPosts = useMemo(() => {
    const sorted = [...mockPosts]
    if (sortBy === "popular") {
      // 人気順（コメント数 + 投票数の合計）
      return sorted.sort(
        (a, b) =>
          b.comments.reduce((sum, c) => sum + c.likes, 0) -
          a.comments.reduce((sum, c) => sum + c.likes, 0)
      )
    }
    // 新着順（事件番号の降順）
    return sorted.sort((a, b) => b.caseNumber - a.caseNumber)
  }, [sortBy])

  // 現在のページの投稿を取得
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedPosts.slice(startIndex, endIndex)
  }, [sortedPosts, currentPage])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景画像 */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/AITA/AITA_back.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <div className="relative z-10 min-h-screen pt-24 sm:pt-28 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* タイトルとソート */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                事件一覧
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                    sortBy === "newest"
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border-white/10"
                  }`}
                >
                  新着順
                </button>
                <button
                  onClick={() => setSortBy("popular")}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                    sortBy === "popular"
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border-white/10"
                  }`}
                >
                  人気順
                </button>
              </div>
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* メインコンテンツ（記事一覧） */}
            <div className="lg:col-span-2 space-y-4">
              {currentPosts.length > 0 ? (
                <>
                  {currentPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </>
              ) : (
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-center border border-white/10">
                  <p className="text-gray-300">事件が見つかりませんでした</p>
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>

          {/* AITA説明セクション（一番下に配置） */}
          <AITAExplanation />
        </div>
      </div>
    </div>
  )
}

export default function AITAListPage() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: "url('/AITA/AITA_back.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Header />
        <div className="relative z-10 min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
          <p className="text-white">読み込み中...</p>
        </div>
      </div>
    }>
      <AITAListContent />
    </Suspense>
  )
}

