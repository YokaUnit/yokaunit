import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zphkclbhhouulgfsfawi.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwaGtjbGJoaG91dWxnZnNmYXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTg5NTAsImV4cCI6MjA2MjY5NDk1MH0.uHVMG9BAg0thmzFqlliTUbI7vJwbPzE_uZGy9q-Lcyw"

  const cookieStore = cookies()

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // Server Component内でcookieを設定できない場合があるため、エラーを無視
          console.log("Cookie setting ignored in Server Component")
        }
      },
    },
  })
}
