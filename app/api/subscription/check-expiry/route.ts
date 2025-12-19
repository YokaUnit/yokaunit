import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Service Role Keyを使用してRLSをバイパス
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null

export async function POST() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    console.log("🔍 Checking subscription expiry...")

    // 期限切れのサブスクリプションを検索
    const { data: expiredSubscriptions, error: selectError } = await supabase
      .from("profiles")
      .select("id, email, subscription_plan, subscription_end_date")
      .lt("subscription_end_date", new Date().toISOString())
      .eq("subscription_status", "active")
      .neq("role", "basic")

    if (selectError) {
      console.error("❌ Error selecting expired subscriptions:", selectError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    if (!expiredSubscriptions || expiredSubscriptions.length === 0) {
      console.log("✅ No expired subscriptions found")
      return NextResponse.json({ message: "No expired subscriptions", count: 0 })
    }

    console.log(`📋 Found ${expiredSubscriptions.length} expired subscriptions:`, expiredSubscriptions)

    // 期限切れのサブスクリプションを基本プランに戻す
    const { data: updatedProfiles, error: updateError } = await supabase
      .from("profiles")
      .update({
        role: "basic",
        subscription_status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .lt("subscription_end_date", new Date().toISOString())
      .eq("subscription_status", "active")
      .neq("role", "basic")
      .select("id, email, subscription_plan")

    if (updateError) {
      console.error("❌ Error updating expired subscriptions:", updateError)
      return NextResponse.json({ error: "Update error" }, { status: 500 })
    }

    console.log(`✅ Updated ${updatedProfiles?.length || 0} expired subscriptions`)

    return NextResponse.json({
      message: "Subscription expiry check completed",
      expired: expiredSubscriptions.length,
      updated: updatedProfiles?.length || 0,
      details: updatedProfiles,
    })
  } catch (error) {
    console.error("💥 Subscription expiry check error:", error)
    return NextResponse.json(
      {
        error: "Subscription expiry check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
