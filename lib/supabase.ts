import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Environment variables with fallbacks for Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zphkclbhhouulgfsfawi.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwaGtjbGJoaG91dWxnZnNmYXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTg5NTAsImV4cCI6MjA2MjY5NDk1MH0.uHVMG9BAg0thmzFqlliTUbI7vJwbPzE_uZGy9q-Lcyw"

console.log("🔧 Supabase Config:", {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length,
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables:", { supabaseUrl, hasAnonKey: !!supabaseAnonKey })
  throw new Error("Missing Supabase environment variables")
}

// シングルトンパターンでSupabaseクライアントを作成
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const supabase = (() => {
  if (!supabaseInstance) {
    console.log("🔄 Creating new Supabase client instance")
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true, // ブラウザストレージにセッションを保存
        autoRefreshToken: true, // トークンの自動更新
        detectSessionInUrl: false, // 自動検出を無効化（手動で処理）
        flowType: "pkce", // PKCEフローを使用
        storage: {
          getItem: (key) => {
            if (typeof window === "undefined") return null
            return window.localStorage.getItem(key)
          },
          setItem: (key, value) => {
            if (typeof window === "undefined") return
            window.localStorage.setItem(key, value)
          },
          removeItem: (key) => {
            if (typeof window === "undefined") return
            window.localStorage.removeItem(key)
          },
        },
      },
    })
  } else {
    console.log("♻️ Reusing existing Supabase client instance")
  }
  return supabaseInstance
})()

// サーバーサイド用のSupabaseクライアント
export const createServerSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}
