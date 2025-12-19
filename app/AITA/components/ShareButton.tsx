"use client"

import { useState } from "react"

interface ShareButtonProps {
  postId: string
  caseNumber: number
  title: string
  body: string
}

export default function ShareButton({ postId, caseNumber, title, body }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    // windowが存在するかチェック
    if (typeof window === "undefined") return

    const url = `${window.location.origin}/AITA/case/${caseNumber}`
    const shareText = `${title}\n\n${body.substring(0, 100)}...\n\n投票して結果を確認しよう！`
    const fullText = `${shareText}\n${url}`

    const shareData = {
      title: `第${caseNumber}号事件 - 世界炎上裁判所`,
      text: shareText,
      url: url,
    }

    try {
      // Web Share APIが利用可能かチェック（HTTPS必須）
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        typeof navigator.canShare === "function" &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData)
        return
      }
    } catch (error: unknown) {
      // ユーザーがキャンセルした場合は何もしない
      if (error instanceof Error && error.name === "AbortError") {
        return
      }
      // その他のエラーはフォールバックに進む
      console.log("Share API failed, trying fallback:", error)
    }

    // フォールバック: クリップボードにコピー
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(fullText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      }
    } catch (clipboardError) {
      console.log("Clipboard API failed, trying legacy method:", clipboardError)
    }

    // レガシー方法: テキストエリアを使用
    try {
      const textArea = document.createElement("textarea")
      textArea.value = fullText
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // 最後の手段: アラートで表示
        alert(`共有URL:\n${url}\n\nテキストをコピーして共有してください。`)
      }
    } catch (legacyError) {
      console.error("All share methods failed:", legacyError)
      // 最後の手段: アラートで表示
      alert(`共有URL:\n${url}\n\nテキストをコピーして共有してください。`)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-2.5 transition-all active:scale-95 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
      aria-label="共有"
      title="共有"
    >
      {copied ? (
        <span className="text-base sm:text-lg">✓</span>
      ) : (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      )}
    </button>
  )
}

