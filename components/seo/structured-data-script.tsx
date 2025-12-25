"use client"

import { useEffect } from "react"

interface StructuredDataScriptProps {
  data: Record<string, unknown> | null
  id?: string
}

/**
 * 構造化データをJSON-LD形式でheadに追加するコンポーネント
 */
export function StructuredDataScript({ data, id = "structured-data" }: StructuredDataScriptProps) {
  useEffect(() => {
    if (!data) return

    // 既存のスクリプトを削除（重複防止）
    const existing = document.getElementById(id)
    if (existing) {
      existing.remove()
    }

    // 新しいスクリプトを追加
    const script = document.createElement("script")
    script.id = id
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(id)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data, id])

  return null
}

/**
 * Server Component用の構造化データコンポーネント
 */
export function StructuredDataScriptServer({ data, id = "structured-data" }: StructuredDataScriptProps) {
  if (!data) return null

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
