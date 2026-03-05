"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export function AuthCallbackClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const next = searchParams.get("next") ?? "/"

      if (!code) {
        router.replace("/login?error=no_code")
        return
      }

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error || !data.session) {
          console.error("❌ Error exchanging code for session (client):", error)
          router.replace("/login?error=oauth_failed")
          return
        }

        toast({
          title: "ログインしました",
          description: `${data.session.user.email ?? "ユーザー"}としてログインしました。`,
        })

        router.replace(next)
      } catch (err) {
        console.error("❌ Unexpected error in auth callback (client):", err)
        router.replace("/login?error=oauth_error")
      }
    }

    handleCallback()
  }, [router, searchParams, toast])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">ログイン処理中です...</p>
    </div>
  )
}

