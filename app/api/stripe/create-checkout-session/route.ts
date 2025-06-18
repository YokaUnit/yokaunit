import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getPriceId, isValidPlanKey, isValidBillingCycle, type PlanKey, type BillingCycle } from "@/lib/stripe-config"
import { createServerSupabaseClient } from "@/lib/supabase"

// Stripeクライアントの初期化（エラーハンドリング強化）
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not set in environment variables")
    console.error(
      "Available env vars:",
      Object.keys(process.env).filter((key) => key.includes("STRIPE")),
    )
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
  }

  if (!secretKey.startsWith("sk_")) {
    console.error("Invalid STRIPE_SECRET_KEY format:", secretKey.substring(0, 10) + "...")
    throw new Error("Invalid STRIPE_SECRET_KEY format")
  }

  return new Stripe(secretKey, {
    apiVersion: "2025-05-28.basil",
  })
}

export async function POST(request: NextRequest) {
  try {
    // 環境変数のチェック
    console.log("Environment check:")
    console.log("NODE_ENV:", process.env.NODE_ENV)
    console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY)
    console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json({ error: "Missing NEXT_PUBLIC_APP_URL environment variable" }, { status: 500 })
    }

    const stripe = getStripe()
    const supabase = createServerSupabaseClient()

    // リクエストボディの解析
    const { planName, billingCycle, userId } = await request.json()

    if (!planName || !billingCycle || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // 型安全な検証
    if (!isValidPlanKey(planName)) {
      return NextResponse.json({ error: "Invalid plan name" }, { status: 400 })
    }

    if (!isValidBillingCycle(billingCycle)) {
      return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 })
    }

    // Price IDを取得
    const priceId = getPriceId(planName as PlanKey, billingCycle as BillingCycle)

    if (!priceId) {
      return NextResponse.json({ error: "Price ID not found" }, { status: 400 })
    }

    // ユーザー情報の取得
    const { data: user } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Stripeカスタマーの作成または取得
    let customerId = user.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.full_name || user.username,
        metadata: {
          userId: user.id,
        },
      })

      customerId = customer.id

      // ユーザープロフィールの更新
      await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", userId)
    }

    // チェックアウトセッションの作成
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium`,
      metadata: {
        userId,
        planName,
        billingCycle,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout session error:", error)

    // より詳細なエラー情報を返す
    if (error instanceof Error) {
      if (error.message.includes("STRIPE_SECRET_KEY")) {
        return NextResponse.json(
          {
            error: "Stripe configuration error",
            details: "Please check environment variables",
          },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
