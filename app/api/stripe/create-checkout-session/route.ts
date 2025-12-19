import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })
  : null

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 Starting checkout session creation...")

    const { priceId, planName } = await request.json()
    console.log("📝 Request data:", { priceId, planName })

    if (!priceId) {
      console.error("❌ Price ID is missing")
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    // 環境変数の確認
    if (!stripe) {
      console.error("❌ STRIPE_SECRET_KEY is not set")
      return NextResponse.json({ error: "Stripe configuration error" }, { status: 500 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ Supabase configuration is not set")
      return NextResponse.json({ error: "Database configuration error" }, { status: 500 })
    }

    console.log("🔑 Stripe key exists:", process.env.STRIPE_SECRET_KEY?.substring(0, 20) + "...")

    // Authorization ヘッダーから Bearer トークンを取得
    const authHeader = request.headers.get("authorization")
    console.log("🔐 Auth header exists:", !!authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No valid authorization header")
      return NextResponse.json({ error: "Authorization header required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    console.log("🎫 Token extracted:", token.substring(0, 20) + "...")

    // Supabaseクライアントを作成（サービスロール用）
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // トークンを使ってユーザーを取得
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token)

    console.log("👤 User data:", {
      userId: user?.id,
      email: user?.email,
      error: userError?.message,
    })

    if (userError || !user) {
      console.error("❌ User authentication failed:", userError)
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // ユーザーのプロフィールを取得
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    console.log("👤 Profile data:", {
      profileId: profile?.id,
      email: profile?.email,
      error: profileError?.message,
    })

    const customerEmail = profile?.email || user.email
    console.log("📧 Customer email:", customerEmail)

    if (!customerEmail) {
      console.error("❌ No email address found")
      return NextResponse.json({ error: "User email not found" }, { status: 400 })
    }

    // Stripe Checkout セッションを作成
    console.log("🛒 Creating Stripe checkout session...")

    const sessionParams = {
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription" as const,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://v0-yokaunit-17.vercel.app"}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://v0-yokaunit-17.vercel.app"}/premium`,
      // 税金の自動計算を有効化
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        userId: user.id,
        planName: planName,
      },
    }

    console.log("🔧 Session params:", {
      customer_email: customerEmail,
      success_url: sessionParams.success_url,
      cancel_url: sessionParams.cancel_url,
      metadata: sessionParams.metadata,
    })

    const session = await stripe.checkout.sessions.create(sessionParams)

    console.log("✅ Stripe session created:", session.id)
    console.log("🔗 Checkout URL:", session.url)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("💥 Error creating checkout session:", error)

    // Stripeエラーの詳細をログ出力
    if (error instanceof Stripe.errors.StripeError) {
      console.error("🔴 Stripe Error Details:", {
        type: error.type,
        code: error.code,
        message: error.message,
        param: error.param,
      })

      return NextResponse.json(
        {
          error: `Stripe Error: ${error.message}`,
          details: error.code,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
