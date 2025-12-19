"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AITAPost, PostState } from "../lib/types"
import { mockPosts, fetchMorePosts } from "../lib/mockData"
import PostCard from "./PostCard"
import Header from "./Header"

// パフォーマンス最適化: 表示範囲外の要素を非表示にする
const useVisibilityOptimization = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const visiblePostsRef = useRef<Set<string>>(new Set())

  const observePost = useCallback((element: HTMLElement | null, postId: string) => {
    if (!element) return

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("data-post-id")
            if (!id) return

            if (entry.isIntersecting) {
              visiblePostsRef.current.add(id)
              entry.target.classList.remove("hidden")
            } else {
              // 完全に画面外になったら非表示（ただし直前/直後の投稿は保持）
              const rect = entry.boundingClientRect
              if (rect.bottom < -1000 || rect.top > window.innerHeight + 1000) {
                visiblePostsRef.current.delete(id)
                entry.target.classList.add("hidden")
              }
            }
          })
        },
        {
          rootMargin: "200% 0px", // 上下200%の範囲を監視
        }
      )
    }

    observerRef.current.observe(element)
  }, [])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { observePost }
}

export default function AITAClientPage() {
  const [posts, setPosts] = useState<AITAPost[]>(mockPosts)
  const [postStates, setPostStates] = useState<Record<string, PostState>>(() => {
    const initial: Record<string, PostState> = {}
    mockPosts.forEach((post) => {
      initial[post.id] = {
        hasVoted: false,
        userVote: null,
        japaneseVerdict: { out: 68, safe: 32 },
        isExpanded: false,
      }
    })
    return initial
  })
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const postRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const { observePost } = useVisibilityOptimization()

  // 投票処理
  const handleVote = useCallback((postId: string, verdict: "out" | "safe") => {
    setPostStates((prev) => {
      const current = prev[postId]
      if (current.hasVoted) return prev

      const newVerdict = verdict === "out"
        ? { out: current.japaneseVerdict.out + 1, safe: current.japaneseVerdict.safe - 1 }
        : { out: current.japaneseVerdict.out - 1, safe: current.japaneseVerdict.safe + 1 }

      return {
        ...prev,
        [postId]: {
          ...current,
          hasVoted: true,
          userVote: verdict,
          japaneseVerdict: newVerdict,
        },
      }
    })
  }, [])

  // 本文展開処理
  const handleExpand = useCallback((postId: string) => {
    setPostStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isExpanded: true,
      },
    }))
  }, [])

  // 新しい投稿を読み込む
  const loadMorePosts = useCallback(async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const newPosts = await fetchMorePosts(page + 1)
      setPosts((prev) => [...prev, ...newPosts])
      
      // 新しい投稿の状態を初期化
      const newStates: Record<string, PostState> = {}
      newPosts.forEach((post) => {
        newStates[post.id] = {
          hasVoted: false,
          userVote: null,
          japaneseVerdict: { out: 68, safe: 32 },
          isExpanded: false,
        }
      })
      setPostStates((prev) => ({ ...prev, ...newStates }))
      
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setLoading(false)
    }
  }, [page, loading])

  // Intersection Observer で無限スクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePosts()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMorePosts, loading])

  return (
    <>
      <style jsx global>{`
        .aita-container {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh; /* Dynamic Viewport Height for mobile */
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .aita-container::-webkit-scrollbar {
          display: none;
        }
        .aita-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .aita-post {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic Viewport Height for mobile */
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .aita-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -10;
        }
        .aita-background::after {
          content: "";
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .aita-content {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 42rem;
          margin: 0 auto;
          padding: 0;
          width: 100%;
        }
        /* モバイルでのアドレスバー対策 */
        @media (max-width: 639px) {
          .aita-post {
            padding-bottom: env(safe-area-inset-bottom, 2rem);
          }
        }
        .aita-post {
          position: relative;
        }
        @media (min-width: 640px) {
          .aita-content {
            padding: 0 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .aita-content {
            padding: 0 2rem;
          }
        }
        /* モバイルでのタッチ最適化 */
        @media (max-width: 639px) {
          * {
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
          }
          button, a {
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
          }
        }
        /* パフォーマンス最適化: 非表示の要素はレンダリングをスキップ */
        .aita-content.hidden {
          display: none;
        }
        /* Safe area for mobile browsers */
        @supports (padding: max(0px)) {
          .pb-safe {
            padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
          }
        }
        .aita-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: white;
          font-size: 1.25rem;
        }
        .aita-loading-spinner {
          width: 3rem;
          height: 3rem;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="aita-container" ref={containerRef}>
        {/* ヘッダー */}
        <Header />

        {/* 背景画像（固定） */}
        <div
          className="aita-background"
          style={{
            backgroundImage: "url('/AITA/AITA_back.jpg')",
          }}
        />

        {/* 各事件を縦に並べる */}
        <div className="relative z-10">
          {posts.map((post, index) => {
            const state = postStates[post.id] || {
              hasVoted: false,
              userVote: null,
              japaneseVerdict: { out: 68, safe: 32 },
              isExpanded: false,
            }

            // 最初の数件と最後の数件は常に表示
            const shouldAlwaysShow = index < 2 || index >= posts.length - 2

            return (
              <div
                key={post.id}
                data-post-id={post.id}
                ref={(el) => {
                  postRefs.current[post.id] = el
                  if (el && !shouldAlwaysShow) {
                    observePost(el, post.id)
                  }
                }}
                className={`aita-content ${shouldAlwaysShow ? "" : ""}`}
              >
                <PostCard
                  post={post}
                  state={state}
                  onVote={handleVote}
                  onExpand={handleExpand}
                />
              </div>
            )
          })}

          {/* 無限スクロール用のターゲット */}
          <div ref={observerTarget} className="h-20 flex items-center justify-center">
            {loading && (
              <div className="aita-loading">
                <div className="aita-loading-spinner" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

