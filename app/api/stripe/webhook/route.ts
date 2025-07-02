import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Service Role Keyを使用してRLSをバイパス
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// プラン名からロールを決定する関数
function getPlanRole(planName: string): "basic" | "premium" | "admin" {
  switch (planName) {
    case "プロ":
      return "premium"
    case "プレミアム":
      return "premium"
    case "エンタープライズ":
      return "premium"
    default:
      return "basic"
  }
}

// Stripe価格IDからプラン名を決定する関数
function getPlanNameFromPriceId(priceId: string): string {
  // 実際のStripe価格IDに基づいて設定
  const priceIdToPlan: Record<string, string> = {
    // 実際の価格IDに置き換えてください
    price_pro_monthly: "プロ",
    price_premium_monthly: "プレミアム",
    price_enterprise_monthly: "エンタープライズ",
    price_pro_yearly: "プロ",
    price_premium_yearly: "プレミアム",
    price_enterprise_yearly: "エンタープライズ",
  }

  return priceIdToPlan[priceId] || "プロ" // デフォルトはプロ
}

export async function POST(request: NextRequest) {
  console.log("🎣 Webhook received")

  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      console.log("✅ Webhook signature verified:", event.type)
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed": {
        console.log("🎉 Processing checkout.session.completed")

        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const planName = session.metadata?.planName

        console.log("📋 Session data:", {
          userId,
          planName,
          customerId: session.customer,
          subscriptionId: session.subscription,
        })

        if (!userId || !planName) {
          console.error("❌ Missing metadata in checkout session")
          break
        }

        // プランに基づいてロールを決定
        const role = getPlanRole(planName)

        // サブスクリプション情報を取得
        let subscriptionData = null
        if (session.subscription) {
          try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
            subscriptionData = {
              start_date: new Date(subscription.current_period_start * 1000).toISOString(),
              end_date: new Date(subscription.current_period_end * 1000).toISOString(),
              status: subscription.status,
            }
            console.log("📅 Subscription data:", subscriptionData)
          } catch (error) {
            console.error("❌ Error retrieving subscription:", error)
          }
        }

        // プロフィールを更新 - roleとプランの両方を更新
        const updateData = {
          role, // 👈 重要：roleを更新
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_plan: planName, // 👈 重要：プラン名を更新
          subscription_status: subscriptionData?.status || "active",
          subscription_start_date: subscriptionData?.start_date || new Date().toISOString(),
          subscription_end_date: subscriptionData?.end_date || null,
          updated_at: new Date().toISOString(),
        }

        console.log("🔄 Updating profile with:", updateData)

        const { data, error } = await supabase.from("profiles").update(updateData).eq("id", userId).select()

        if (error) {
          console.error("❌ Error updating user profile:", error)
        } else {
          console.log("✅ Profile updated successfully:", data)
        }
        break
      }

      case "customer.subscription.updated": {
        console.log("🔄 Processing customer.subscription.updated")

        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // サブスクリプションアイテムから価格IDを取得
        const priceId = subscription.items.data[0]?.price.id
        const planName = priceId ? getPlanNameFromPriceId(priceId) : "プロ"
        const role = getPlanRole(planName)

        console.log("📋 Subscription updated:", {
          customerId,
          subscriptionId: subscription.id,
          status: subscription.status,
          priceId,
          planName,
          role,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        })

        // カスタマーIDでプロフィールを検索して更新 - roleとプランの両方を更新
        const { error } = await supabase
          .from("profiles")
          .update({
            role, // 👈 重要：roleを更新
            subscription_plan: planName, // 👈 重要：プラン名を更新
            subscription_status: subscription.status,
            subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId)

        if (error) {
          console.error("❌ Error updating subscription:", error)
        } else {
          console.log("✅ Subscription updated successfully - role and plan updated")
        }
        break
      }

      case "customer.subscription.deleted": {
        console.log("🔄 Processing customer.subscription.deleted")

        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        console.log("📋 Subscription cancelled:", {
          customerId,
          subscriptionId: subscription.id,
        })

        // サブスクリプションをキャンセル状態に更新 - roleをbasicに戻す
        const { error } = await supabase
          .from("profiles")
          .update({
            role: "basic", // 👈 重要：roleをbasicに戻す
            subscription_plan: null, // 👈 重要：プランをクリア
            subscription_status: "canceled",
            subscription_end_date: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId)

        if (error) {
          console.error("❌ Error cancelling subscription:", error)
        } else {
          console.log("✅ Subscription cancelled successfully - role set to basic")
        }
        break
      }

      case "invoice.payment_failed": {
        console.log("⚠️ Processing invoice.payment_failed")

        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // 支払い失敗時の処理 - roleはそのまま維持（猶予期間）
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId)

        if (error) {
          console.error("❌ Error updating payment failed status:", error)
        } else {
          console.log("✅ Payment failed status updated")
        }
        break
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("💥 Webhook error:", error)
    return NextResponse.json(
      {
        error: "Webhook handler failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
