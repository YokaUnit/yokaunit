"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Crown, Building2, ExternalLink } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

export function PremiumPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubscribe = async (priceId: string, planName: string) => {
    console.log("🛒 Starting subscription process:", { priceId, planName })

    if (!isLoggedIn) {
      console.log("❌ User not logged in")
      toast({
        title: "ログインが必要です",
        description: "プランを購入するにはログインしてください。",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // Supabaseクライアントを作成してアクセストークンを取得
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.access_token) {
        console.error("❌ Failed to get session:", sessionError)
        throw new Error("認証セッションの取得に失敗しました")
      }

      console.log("🎫 Access token obtained:", session.access_token.substring(0, 20) + "...")

      console.log("📡 Sending request to create checkout session...")

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      })

      console.log("📨 Response status:", response.status)

      const responseData = await response.json()
      console.log("📋 Response data:", responseData)

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! status: ${response.status}`)
      }

      const { url, error } = responseData

      if (error) {
        throw new Error(error)
      }

      if (url) {
        console.log("🔗 Redirecting to Stripe checkout:", url)
        window.location.href = url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("💥 Subscription error:", error)
      toast({
        title: "エラー",
        description:
          error instanceof Error ? error.message : "決済処理でエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // プラン情報を定義
  const plans = [
    {
      name: "プロ",
      description: "個人利用に最適",
      icon: Sparkles,
      monthlyPrice: "¥250",
      quarterlyPrice: "¥675",
      yearlyPrice: "¥2,400",
      priceIds: {
        monthly: "price_1RbM0VG0ZQZ9NwTgFqFsvdLn",
        quarterly: "price_1RbM1NG0ZQZ9NwTgRmes43n5",
        yearly: "price_1RbM1jG0ZQZ9NwTgBem1yafa",
      },
      features: ["広告の非表示", "メールサポート"],
      popular: false,
      color: "blue",
    },
    {
      name: "プレミアム",
      description: "本格利用に最適",
      icon: Crown,
      monthlyPrice: "¥500",
      quarterlyPrice: "¥1,350",
      yearlyPrice: "¥4,800",
      priceIds: {
        monthly: "price_1RbM2VG0ZQZ9NwTgpesMdLT0",
        quarterly: "price_1RbM3CG0ZQZ9NwTgwyv1pyCl",
        yearly: "price_1RbM3iG0ZQZ9NwTgnLZLGop2",
      },
      features: ["プロプランの全機能", "プレミアムツールへのアクセス", "要望の優先制作"],
      popular: true,
      color: "purple",
    },
    {
      name: "エンタープライズ",
      description: "大規模組織向け",
      icon: Building2,
      monthlyPrice: "¥2,800",
      quarterlyPrice: "¥7,560",
      yearlyPrice: "¥26,880",
      priceIds: {
        monthly: "price_1RbM4tG0ZQZ9NwTgko0Nu8iV",
        quarterly: "price_1RbM6DG0ZQZ9NwTgeFVCZm5P",
        yearly: "price_1RbM6lG0ZQZ9NwTgcgKgzwrf",
      },
      features: ["プレミアムプランの全機能", "大組織向け開発", "YokaUnit内外のツール/UI制作", "専任サポート担当者"],
      popular: false,
      color: "emerald",
    },
  ]

  // 選択された課金サイクルに基づいて価格を取得
  const getPrice = (plan: any) => {
    switch (billingCycle) {
      case "monthly":
        return plan.monthlyPrice
      case "quarterly":
        return plan.quarterlyPrice
      case "yearly":
        return plan.yearlyPrice
      default:
        return plan.monthlyPrice
    }
  }

  // 選択された課金サイクルに基づいてPrice IDを取得
  const getPriceId = (plan: any) => {
    switch (billingCycle) {
      case "monthly":
        return plan.priceIds.monthly
      case "quarterly":
        return plan.priceIds.quarterly
      case "yearly":
        return plan.priceIds.yearly
      default:
        return plan.priceIds.monthly
    }
  }

  // 選択された課金サイクルに基づいて期間を取得
  const getPeriod = () => {
    switch (billingCycle) {
      case "monthly":
        return "月"
      case "quarterly":
        return "3ヶ月"
      case "yearly":
        return "年"
      default:
        return "月"
    }
  }

  return (
    <div className="space-y-8">
      {/* 課金サイクル選択 */}
      <div className="flex justify-center">
        <Tabs defaultValue="monthly" className="w-full max-w-[400px]">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger
              value="monthly"
              onClick={() => setBillingCycle("monthly")}
              className="px-3 py-2 text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              月払い
            </TabsTrigger>
            <TabsTrigger
              value="quarterly"
              onClick={() => setBillingCycle("quarterly")}
              className="px-3 py-2 text-sm relative data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              3ヶ月払い
              <span className="absolute -top-2 -right-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">
                10%OFF
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              onClick={() => setBillingCycle("yearly")}
              className="px-3 py-2 text-sm relative data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              年払い
              <span className="absolute -top-2 -right-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">
                20%OFF
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* モバイル表示 */}
      <div className="md:hidden space-y-4">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon
          return (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-200 shadow-lg"
                  : "bg-white border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                  人気
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-${plan.color}-100`}>
                    <IconComponent className={`h-5 w-5 text-${plan.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">{getPrice(plan)}</span>
                  <span className="text-sm text-gray-500">/{getPeriod()}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
                  }`}
                  onClick={() => handleSubscribe(getPriceId(plan), plan.name)}
                  disabled={isLoading}
                >
                  {isLoading ? "処理中..." : "プランを選択"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* デスクトップ表示 */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-8">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon
          return (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-200 shadow-lg scale-105"
                  : "bg-white border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-2 rounded-bl-lg rounded-tr-lg font-medium">
                  人気プラン
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto p-3 rounded-xl bg-${plan.color}-100 w-fit mb-4`}>
                  <IconComponent className={`h-8 w-8 text-${plan.color}-600`} />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{getPrice(plan)}</span>
                  <span className="text-gray-500 ml-1">/{getPeriod()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
                  }`}
                  onClick={() => handleSubscribe(getPriceId(plan), plan.name)}
                  disabled={isLoading}
                >
                  {isLoading ? "処理中..." : "プランを選択"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* エンタープライズ向け追加情報 */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 text-center">
        <Building2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">エンタープライズプランをご検討の方へ</h3>
        <p className="text-sm text-gray-600 mb-4">
          大規模組織向けの開発やカスタムツール制作について、詳しくご相談いただけます。
        </p>
        <Link href="/contact">
          <Button variant="outline" className="inline-flex items-center gap-2">
            ご要望・相談はこちら
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 注意事項 */}
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>すべてのプランは、いつでもキャンセル可能です。</p>
        <p>
          ご不明な点は
          <Link href="/contact" className="text-blue-600 hover:underline mx-1">
            お問い合わせ
          </Link>
          ください。
        </p>
      </div>
    </div>
  )
}
