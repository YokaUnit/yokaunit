"use client"

import { useEffect, useRef } from "react"
import { incrementViewCount } from "@/lib/actions/tools"

interface ViewCounterProps {
  toolSlug: string
}

export function ViewCounter({ toolSlug }: ViewCounterProps) {
  const hasCountedRef = useRef(false)

  useEffect(() => {
    if (hasCountedRef.current) return
    hasCountedRef.current = true
    incrementViewCount(toolSlug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // このコンポーネントは表示要素を持たない
  return null
}
