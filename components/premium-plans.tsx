"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { getPriceIds } from "@/lib/stripe-config"

export function PremiumPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isLoading, setIsLoading] = useState(false)
  const { user, isLoggedIn } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // 現在の環境に応じたPrice IDを取得
  const priceIds = getPriceIds()

  const handleSubscribe = async (planName: string, priceId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "ログインが必要です",
        description: "サブスクリプションを開始するにはログインしてください。",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // Stripe Checkout Sessionを作成
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
          billingCycle,
          userId: user?.id,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Stripeのチェックアウトページにリダイレクト
      window.location.href = url
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "エラー",
        description: "決済処理でエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // プラン情報
  const plans = [
    {
      name: "プロ",
      key: "pro",
      description: "個人利用に最適",
      monthlyPrice: "¥250",
      quarterlyPrice: "¥675",
      yearlyPrice: "¥2,400",
      features: ["広告表示を大幅軽減", "メールサポート"],
      popular: false,
      color: "blue-100",
    },
    {
      name: "プレミアム",
      key: "premium",
      description: "ビジネス利用に最適",
      monthlyPrice: "¥500",
      quarterlyPrice: "¥1,350",
      yearlyPrice: "¥4,800",
      features: [
        "プロプランのすべての機能",
        "プレミアムツールのアクセス権",
        "ツール要望の優先開発対応",
        "優先サポート",
      ],
      popular: true,
      color: "blue-200",
    },
    {
      name: "エンタープライズ",
      key: "enterprise",
      description: "大規模組織向け",
      monthlyPrice: "¥2,800",
      quarterlyPrice: "¥7,560",
      yearlyPrice: "¥26,880",
      features: [
        "プレミアムプランのすべての機能",
        "YokaUnitサイト内外での大規模専用ツール開発権利",
        "複数ユーザーアカウント管理",
        "専任担当者による個別対応",
      ],
      popular: false,
      color: "blue-100",
    },
  ]

  // 選択された課金サイクルに基づいて価格を取得
  const getPrice = (plan) => {
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
  const getPriceId = (plan) => {
    const planPrices = priceIds[plan.key]
    switch (billingCycle) {
      case "monthly":
        return planPrices.monthly
      case "quarterly":
        return planPrices.quarterly
      case "yearly":
        return planPrices.yearly
      default:
        return planPrices.monthly
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
    <div className="space-y-6">
      <div className="flex justify-center">
        <Tabs defaultValue="monthly" className="w-full max-w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")} className="px-2 py-1 text-xs">
              月払い
            </TabsTrigger>
            <TabsTrigger
              value="quarterly"
              onClick={() => setBillingCycle("quarterly")}
              className="px-2 py-1 text-xs relative"
            >
              3ヶ月
              <span className="absolute -top-2 -right-2 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">
                10%OFF
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              onClick={() => setBillingCycle("yearly")}
              className="px-2 py-1 text-xs relative"
            >
              年払い
              <span className="absolute -top-2 -right-2 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">
                20%OFF
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 環境表示（開発時のみ） */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-center">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            開発環境（テスト決済）
          </span>
        </div>
      )}

      {/* モバイル表示 */}
      <div className="md:hidden space-y-4">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`${plan.popular ? "bg-gradient-to-b from-blue-50 to-white relative border-blue-300" : "border-gray-200"}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-bl-lg rounded-tr-lg">
                人気
              </div>
            )}
            <div className="p-4">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{plan.description}</p>
                <div className="mb-3">
                  <div className="font-bold text-2xl text-blue-600">{getPrice(plan)}</div>
                  <div className="text-sm text-gray-500">/{getPeriod()}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                onClick={() => handleSubscribe(plan.name, getPriceId(plan))}
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "登録する"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* デスクトップ表示 */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`${plan.popular ? "bg-gradient-to-b from-blue-50 to-white relative border-blue-300 scale-105" : "border-gray-200"} flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm px-3 py-1 rounded-bl-lg rounded-tr-lg">
                人気
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">{getPrice(plan)}</span>
                <span className="text-gray-500 ml-1">/{getPeriod()}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                onClick={() => handleSubscribe(plan.name, getPriceId(plan))}
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "登録する"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 広告に関する説明 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">広告表示について</h3>
        <p className="text-sm text-gray-600">
          有料プランでは一般的な広告表示を大幅に軽減いたします。ただし、企業様との提携によるPR情報や、
          ユーザー様にとって有益なサービス紹介は、適切な形で表示される場合があります。
        </p>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>すべてのプランは、いつでもキャンセル可能です。</p>
        <p className="mt-1">
          ご不明な点は
          <a href="/contact" className="text-blue-600 hover:underline">
            お問い合わせ
          </a>
          ください。
        </p>
      </div>
    </div>
  )
}
