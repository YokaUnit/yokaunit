import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

// Service Role Keyを使用してRLSをバイパス
const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 Cancel subscription request received")

    // Authorization headerからトークンを取得
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No authorization header")
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")

    // トークンを使用してユーザーを取得
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    console.log("👤 Auth check:", {
      userId: user?.id,
      email: user?.email,
      error: authError?.message,
    })

    if (authError || !user) {
      console.error("❌ Auth error:", authError)
      return NextResponse.json(
        {
          error: "認証が必要です。再ログインしてください。",
          details: authError?.message || "No user found",
        },
        { status: 401 },
      )
    }

    // ユーザーのプロフィール取得
    console.log("📋 Fetching profile for user:", user.id)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_subscription_id, stripe_customer_id, subscription_status, subscription_plan, role")
      .eq("id", user.id)
      .single()

    console.log("📊 Profile data:", {
      hasProfile: !!profile,
      subscriptionId: profile?.stripe_subscription_id,
      customerId: profile?.stripe_customer_id,
      status: profile?.subscription_status,
      plan: profile?.subscription_plan,
      role: profile?.role,
      error: profileError?.message,
    })

    if (profileError || !profile) {
      console.error("❌ Profile error:", profileError)
      return NextResponse.json(
        {
          error: "プロフィールが見つかりません",
          details: profileError?.message || "No profile found",
        },
        { status: 404 },
      )
    }

    if (!profile.stripe_subscription_id) {
      console.error("❌ No subscription ID found")
      return NextResponse.json(
        {
          error: "アクティブなサブスクリプションがありません",
          debug: {
            subscriptionId: profile.stripe_subscription_id,
            customerId: profile.stripe_customer_id,
            status: profile.subscription_status,
          },
        },
        { status: 400 },
      )
    }

    console.log("💳 Cancelling Stripe subscription:", profile.stripe_subscription_id)

    // Stripeでサブスクリプションをキャンセル
    const subscription = await stripe.subscriptions.update(profile.stripe_subscription_id, {
      cancel_at_period_end: true,
    })

    console.log("✅ Stripe subscription updated:", {
      id: subscription.id,
      cancel_at_period_end: subscription.cancel_at_period_end,
      current_period_end: subscription.current_period_end,
    })

    // データベースを更新 - roleをbasicに戻す
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        role: "basic", // 👈 重要：roleをbasicに戻す
        subscription_status: "cancel_at_period_end",
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (updateError) {
      console.error("❌ Database update error:", updateError)
      return NextResponse.json(
        {
          error: "データベースの更新に失敗しました",
          details: updateError.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ Database updated successfully - role set to basic")

    const cancelDate = new Date(subscription.current_period_end * 1000)

    return NextResponse.json({
      success: true,
      message: `サブスクリプションは${cancelDate.toLocaleDateString("ja-JP")}に解約されます。プレミアム機能は期間終了まで利用可能です。`,
      cancelAt: cancelDate.toISOString(),
      subscription_status: "cancel_at_period_end",
      role: "basic",
    })
  } catch (error) {
    console.error("❌ Subscription cancellation error:", error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: "Stripe処理エラー",
          details: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "サブスクリプションのキャンセルに失敗しました",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
