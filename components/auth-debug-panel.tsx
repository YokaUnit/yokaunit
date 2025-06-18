"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { getUserFavorites, toggleFavorite } from "@/lib/actions/favorites"

export function AuthDebugPanel() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, session, isLoggedIn, profile } = useAuth()

  const runDebug = async () => {
    setIsLoading(true)
    try {
      // クライアントサイドの認証状態
      const clientSession = await supabase.auth.getSession()
      const clientUser = await supabase.auth.getUser()

      // サーバーアクションのテスト
      const favorites = await getUserFavorites()

      // Cookie情報
      const cookies = document.cookie
        .split(";")
        .filter((cookie) => cookie.includes("supabase") || cookie.includes("auth"))

      setDebugInfo({
        clientSide: {
          useAuthHook: {
            isLoggedIn,
            hasUser: !!user,
            hasSession: !!session,
            userId: user?.id,
            email: user?.email,
            username: profile?.username,
          },
          supabaseClient: {
            hasSession: !!clientSession.data.session,
            hasUser: !!clientUser.data.user,
            userId: clientUser.data.user?.id,
            email: clientUser.data.user?.email,
            sessionError: clientSession.error?.message,
            userError: clientUser.error?.message,
          },
          cookies: {
            count: cookies.length,
            authCookies: cookies.map((c) => c.split("=")[0].trim()),
          },
        },
        serverSide: {
          favoritesCount: favorites.length,
          favorites: favorites.slice(0, 3), // 最初の3つだけ表示
        },
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setDebugInfo({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testToggleFavorite = async () => {
    if (!isLoggedIn) {
      alert("ログインが必要です")
      return
    }

    try {
      setIsLoading(true)
      const result = await toggleFavorite("password") // テスト用のツールslug
      alert(`テスト結果: ${result.message}`)
    } catch (error) {
      alert(`エラー: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsVisible(true)} className="fixed bottom-4 right-4 z-50">
        🔍 Auth Debug
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          認証デバッグ情報
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            ✕
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2">
          <Button onClick={runDebug} size="sm" disabled={isLoading}>
            {isLoading ? "実行中..." : "デバッグ実行"}
          </Button>
          <Button onClick={testToggleFavorite} size="sm" variant="outline" disabled={isLoading}>
            いいねテスト
          </Button>
        </div>

        {debugInfo && (
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-64">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
