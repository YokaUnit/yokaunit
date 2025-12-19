"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AITAPost, PostState } from "../../lib/types"
import VoteButtons from "../../components/VoteButtons"
import VerdictDisplay from "../../components/VerdictDisplay"
import OverseasReactions from "../../components/OverseasReactions"
import Header from "../../components/Header"
import ShareButton from "../../components/ShareButton"

interface AITACasePageProps {
  post: AITAPost
}

export default function AITACasePage({ post }: AITACasePageProps) {
  const router = useRouter()
  const [state, setState] = useState<PostState>({
    hasVoted: false,
    userVote: null,
    japaneseVerdict: { out: 68, safe: 32 },
    isExpanded: false,
  })

  // ローカルストレージから状態を復元
  useEffect(() => {
    const savedState = localStorage.getItem(`aita-post-${post.id}`)
    if (savedState) {
      try {
        setState(JSON.parse(savedState))
      } catch (e) {
        console.error("Failed to restore state:", e)
      }
    }
  }, [post.id])

  // 状態を保存
  const saveState = (newState: PostState) => {
    setState(newState)
    localStorage.setItem(`aita-post-${post.id}`, JSON.stringify(newState))
  }

  const handleVote = (verdict: "out" | "safe") => {
    if (state.hasVoted) return

    const newVerdict = verdict === "out"
      ? { out: state.japaneseVerdict.out + 1, safe: state.japaneseVerdict.safe - 1 }
      : { out: state.japaneseVerdict.out - 1, safe: state.japaneseVerdict.safe + 1 }

    saveState({
      ...state,
      hasVoted: true,
      userVote: verdict,
      japaneseVerdict: newVerdict,
    })
  }

  const handleExpand = () => {
    saveState({
      ...state,
      isExpanded: true,
    })
  }

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

      {/* コンテンツ */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-20 sm:py-28 md:py-32 pb-24 sm:pb-28 md:pb-32 max-w-2xl mx-auto">
        {/* タイトル */}
        <div className="mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-8 md:mt-12">
          <div className="flex items-start justify-center gap-2 sm:gap-3 px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight mb-3 sm:mb-4 flex-1">
              {post.title}
            </h1>
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
                onClick={handleExpand}
                className="mt-3 sm:mt-4 bg-gray-800/80 active:bg-gray-700/80 text-white px-5 py-2.5 sm:py-3 rounded-full text-sm transition-colors w-full touch-manipulation min-h-[44px]"
              >
                続きを読む &gt;
              </button>
            )}
          </div>
        </div>

        {/* 海外の反応 */}
        {!state.hasVoted && <OverseasReactions reactions={post.overseasReactions} />}

        {/* 投票ボタン */}
        {!state.hasVoted && (
          <VoteButtons onVote={handleVote} />
        )}

        {/* 投票後表示 */}
        {state.hasVoted && <VerdictDisplay post={post} state={state} />}

        {/* 一覧に戻るボタン */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/AITA")}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm sm:text-base transition-colors touch-manipulation min-h-[44px]"
          >
            他の事件を見る
          </button>
        </div>
      </div>
    </div>
  )
}

