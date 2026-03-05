import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// 利用料で停止した場合や意図的に無効にする場合: NEXT_PUBLIC_SUPABASE_ENABLED=false を設定
const supabaseEnabled =
  process.env.NEXT_PUBLIC_SUPABASE_ENABLED !== "false" &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl = supabaseEnabled
  ? process.env.NEXT_PUBLIC_SUPABASE_URL!
  : "https://disabled.supabase.co"
const supabaseAnonKey = supabaseEnabled
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.disabled"

console.log("🔧 Supabase Config:", {
  enabled: supabaseEnabled,
  url: supabaseEnabled ? supabaseUrl : "(disabled)",
  hasAnonKey: !!supabaseAnonKey,
})

export const isSupabaseEnabled = (): boolean => supabaseEnabled

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
