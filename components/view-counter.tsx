"use client"

import { useEffect } from "react"
import { incrementViewCount } from "@/lib/actions/tools"

interface ViewCounterProps {
  toolSlug: string
}

// ブラウザタブ（ページライフサイクル）内での二重カウント防止用フラグ
declare global {
  interface Window {
    __yokaViewCounter?: Record<string, boolean>
  }
}

export function ViewCounter({ toolSlug }: ViewCounterProps) {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.__yokaViewCounter) window.__yokaViewCounter = {}
    if (window.__yokaViewCounter[toolSlug]) return

    window.__yokaViewCounter[toolSlug] = true
    incrementViewCount(toolSlug)
  }, [toolSlug])

  return null
}
