"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function AuthHandler() {
  const router = useRouter()

  useEffect(() => {
    // URLハッシュからの認証処理
    const handleAuthCallback = async () => {
      if (typeof window === "undefined") return

      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")

      if (accessToken && refreshToken) {
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error("Error setting session:", error)
          } else {
            // 認証成功後、ハッシュをクリアしてリダイレクト
            window.history.replaceState(null, "", window.location.pathname)
            router.push("/")
          }
        } catch (error) {
          console.error("Error handling auth callback:", error)
        }
      }
    }

    handleAuthCallback()
  }, [router])

  return null
}
