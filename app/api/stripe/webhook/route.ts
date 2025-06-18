import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

// Stripeクライアントの初期化
function getStripeInstance() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  return new Stripe(secretKey, {
    apiVersion: "2024-12-18.acacia",
  })
}

// Supabaseクライアントの初期化
function getSupabaseInstance() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error("Supabase configuration is missing")
  }

  return createClient(url, serviceKey)
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeInstance()
    const supabase = getSupabaseInstance()

    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const planName = session.metadata?.planName
        const billingCycle = session.metadata?.billingCycle

        if (userId && planName && billingCycle) {
          // Update user's subscription status
          const { error } = await supabase
            .from("profiles")
            .update({
              role: planName.toLowerCase() as "pro" | "premium" | "enterprise",
              subscription_status: "active",
              subscription_plan: planName.toLowerCase(),
              subscription_period: billingCycle,
              stripe_subscription_id: session.subscription as string,
              subscription_start_date: new Date().toISOString(),
            })
            .eq("id", userId)

          if (error) {
            console.error("Failed to update user subscription:", error)
          }
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (profile) {
          const status = subscription.status === "active" ? "active" : "inactive"

          await supabase
            .from("profiles")
            .update({
              subscription_status: status,
            })
            .eq("id", profile.id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (profile) {
          // Reset user to free tier
          await supabase
            .from("profiles")
            .update({
              role: "user",
              subscription_status: "inactive",
              subscription_plan: null,
              subscription_period: null,
              stripe_subscription_id: null,
            })
            .eq("id", profile.id)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
