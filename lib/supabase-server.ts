import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error("Supabase env is not set (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)")
  }
  return { url, anonKey }
}

/**
 * Server側（RSC/Route Handler）で、ユーザーセッションをCookieから引き継ぐSupabaseクライアント。
 * RLSを正しく効かせるための標準パターン。
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const { url, anonKey } = getEnv()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        // next/headers の cookies() は Route Handler でのみ set が有効。
        // RSC では set できないため、失敗しても握りつぶす。
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // ignore
        }
      },
    },
  })
}

