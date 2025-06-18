import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getPriceIds } from "@/lib/stripe-config"
import { createServerSupabaseClient } from "@/lib/supabase"

// Stripeクライアントの初期化
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
  }

  return new Stripe(secretKey, {
    apiVersion: "2025-05-28.basil", // 修正: 最新のAPIバージョンを使用
  })
}

export async function POST(request: NextRequest) {
  try {
    // 環境変数のチェック
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json({ error: "Missing NEXT_PUBLIC_APP_URL environment variable" }, { status: 500 })
    }

    const stripe = getStripe()
    const supabase = createServerSupabaseClient()
    const priceIds = getPriceIds()

    // リクエストボディの解析
    const { planName, billingCycle, userId } = await request.json()

    if (!planName || !billingCycle || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // プランとサイクルに基づいてPrice IDを取得
    const planKey = planName.toLowerCase()
    const priceId = priceIds[planKey]?.[billingCycle]

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan or billing cycle" }, { status: 400 })
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
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
