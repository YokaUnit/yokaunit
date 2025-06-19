import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/"
  const origin = requestUrl.origin

  console.log("🔄 Auth callback triggered", { hasCode: !!code, next })

  if (!code) {
    console.error("❌ No authorization code provided")
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zphkclbhhouulgfsfawi.supabase.co"
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwaGtjbGJoaG91dWxnZnNmYXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTg5NTAsImV4cCI6MjA2MjY5NDk1MH0.uHVMG9BAg0thmzFqlliTUbI7vJwbPzE_uZGy9q-Lcyw"

    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })

    // コードをセッションに交換
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("❌ Error exchanging code for session:", error)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    if (!data.session || !data.user) {
      console.error("❌ No session or user returned")
      return NextResponse.redirect(`${origin}/login?error=no_session`)
    }

    console.log("✅ Authentication successful for:", data.user.email)

    // プロフィールの確認・作成
    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (profileError && profileError.code === "PGRST116") {
      console.log("📝 Creating new profile for user:", data.user.email)

      // プロフィールが存在しない場合は作成
      const { error: insertError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        username:
          data.user.user_metadata?.name ||
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "ユーザー",
        full_name: data.user.user_metadata?.name || data.user.user_metadata?.full_name || null,
        avatar_url: data.user.user_metadata?.avatar_url || null,
        role: "basic",
        is_active: true,
      })

      if (insertError) {
        console.error("❌ Error creating profile:", insertError)
      } else {
        console.log("✅ Profile created successfully")
      }
    } else if (!profileError) {
      console.log("✅ Profile already exists for:", existingProfile?.username)
    }

    // セッション情報をクッキーに設定してリダイレクト
    const response = NextResponse.redirect(`${origin}${next}`)

    // セッション情報をクッキーに保存（Supabaseが自動で行うが、明示的に設定）
    response.cookies.set("sb-auth-token", JSON.stringify(data.session), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1週間
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return response
  } catch (error) {
    console.error("❌ Unexpected error in auth callback:", error)
    return NextResponse.redirect(`${origin}/login?error=server_error`)
  }
}
