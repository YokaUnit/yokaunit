"use client"

import { useRouter } from "next/navigation"
import { AITAPost, PostState } from "../lib/types"
import VoteButtons from "./VoteButtons"
import VerdictDisplay from "./VerdictDisplay"
import OverseasReactions from "./OverseasReactions"
import ShareButton from "./ShareButton"

interface PostCardProps {
  post: AITAPost
  state: PostState
  onVote: (postId: string, verdict: "out" | "safe") => void
  onExpand: (postId: string) => void
}

export default function PostCard({ post, state, onVote, onExpand }: PostCardProps) {
  const router = useRouter()

  const handleTitleClick = () => {
    router.push(`/AITA/case/${post.caseNumber}`)
  }

  return (
    <div className="aita-post relative">
      {/* 上部境界線 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />
      
      {/* 上部フェード（スクロール境界） */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none z-10" />
      
      {/* 下部フェード（スクロール境界） */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none z-10" />
      
      {/* コンテンツ */}
      <div className="relative z-0 pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-24 md:pb-8 px-4 sm:px-6">
        {/* タイトル */}
        <div className="mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-8 md:mt-12">
          <div className="flex items-start justify-center gap-2 sm:gap-3 px-2">
            <h2
              onClick={handleTitleClick}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight mb-3 sm:mb-4 flex-1 cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
            >
              {post.title}
            </h2>
            <div className="pt-1 sm:pt-2">
              <ShareButton
                postId={post.id}
                caseNumber={post.caseNumber}
                title={post.title}
                body={state.isExpanded ? post.bodyFull : post.body}
              />
            </div>
          </div>
        </div>

        {/* 本文 */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6">
            <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {state.isExpanded ? post.bodyFull : post.body}
            </p>
            {!state.isExpanded && (
              <button
                onClick={() => onExpand(post.id)}
                className="mt-3 sm:mt-4 bg-gray-800/80 active:bg-gray-700/80 text-white px-5 py-2.5 sm:py-3 rounded-full text-sm transition-colors w-full touch-manipulation min-h-[44px]"
              >
                続きを読む &gt;
              </button>
            )}
          </div>
        </div>

      {/* 海外の反応（常に表示） */}
      <OverseasReactions reactions={post.overseasReactions} />

      {/* 投票ボタン（投票前のみ） */}
      {!state.hasVoted && (
        <VoteButtons onVote={(verdict) => onVote(post.id, verdict)} />
      )}

      {/* 投票後表示 */}
      {state.hasVoted && <VerdictDisplay post={post} state={state} />}
      </div>
    </div>
  )
}

