"use client"

import Link from "next/link"
import { AITAPost } from "../../lib/types"

interface ArticleCardProps {
  post: AITAPost
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const previewText = post.body.length > 150 ? post.body.substring(0, 150) + "..." : post.body

  return (
    <Link
      href={`/AITA/case/${post.caseNumber}`}
      className="block bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 hover:bg-black/50 transition-all border border-white/10 hover:border-white/20"
    >
      {/* ヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs sm:text-sm text-gray-400">第{post.caseNumber}号事件</span>
        <span className="text-gray-600">•</span>
        <span className="text-xs sm:text-sm text-gray-400">
          {post.redditVerdict.out}% アウト / {post.redditVerdict.safe}% セーフ
        </span>
      </div>

      {/* タイトル */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 leading-tight hover:text-blue-300 transition-colors">
        {post.title}
      </h2>

      {/* プレビューテキスト */}
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 line-clamp-3">
        {previewText}
      </p>

      {/* フッター */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {post.comments.length}件のコメント
          </span>
        </div>
        <span className="text-blue-400 hover:text-blue-300">投票する →</span>
      </div>
    </Link>
  )
}

