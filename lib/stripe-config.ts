// プラン名の型定義
export type PlanKey = "pro" | "premium" | "enterprise"
export type BillingCycle = "monthly" | "quarterly" | "yearly"

// Price IDの構造型定義
export type PriceIds = {
  [K in PlanKey]: {
    [C in BillingCycle]: string
  }
}

// Stripe設定とPrice ID管理
export const STRIPE_CONFIG = {
  development: {
    priceIds: {
      pro: {
        monthly: "price_1RbM0VG0ZQZ9NwTgFqFsvdLn",
        quarterly: "price_1RbM1NG0ZQZ9NwTgRmes43n5",
        yearly: "price_1RbM1jG0ZQZ9NwTgBem1yafa",
      },
      premium: {
        monthly: "price_1RbM2VG0ZQZ9NwTgpesMdLT0",
        quarterly: "price_1RbM3CG0ZQZ9NwTgwyv1pyCl",
        yearly: "price_1RbM3iG0ZQZ9NwTgnLZLGop2",
      },
      enterprise: {
        monthly: "price_1RbM4tG0ZQZ9NwTgko0Nu8iV",
        quarterly: "price_1RbM6DG0ZQZ9NwTgeFVCZm5P",
        yearly: "price_1RbM6lG0ZQZ9NwTgcgKgzwrf",
      },
    } as PriceIds,
  },
  production: {
    priceIds: {
      pro: {
        monthly: "price_1RbLTkG0ZQZ9NwTgRYvv4bet",
        quarterly: "price_1RbLWXG0ZQZ9NwTgP9gxjMKb",
        yearly: "price_1RbLX2G0ZQZ9NwTgN8P5ZM5V",
      },
      premium: {
        monthly: "price_1RbLZzG0ZQZ9NwTgzYU5Fzbx",
        quarterly: "price_1RbLcyG0ZQZ9NwTgzTv54GBf",
        yearly: "price_1RbLdMG0ZQZ9NwTgxtWzTRsK",
      },
      enterprise: {
        monthly: "price_1RbLepG0ZQZ9NwTgMDb0JjU5",
        quarterly: "price_1RbLhGG0ZQZ9NwTgZpw4Cok3",
        yearly: "price_1RbLhgG0ZQZ9NwTgM5tItRkf",
      },
    } as PriceIds,
  },
}

// 現在の環境に応じたPrice IDを取得
export function getPriceIds(): PriceIds {
  const env = process.env.NODE_ENV === "production" ? "production" : "development"
  return STRIPE_CONFIG[env].priceIds
}

// 型安全なPrice ID取得関数
export function getPriceId(planKey: PlanKey, billingCycle: BillingCycle): string {
  const priceIds = getPriceIds()
  return priceIds[planKey][billingCycle]
}

// プランキーの検証関数
export function isValidPlanKey(key: string): key is PlanKey {
  return ["pro", "premium", "enterprise"].includes(key)
}

// 課金サイクルの検証関数
export function isValidBillingCycle(cycle: string): cycle is BillingCycle {
  return ["monthly", "quarterly", "yearly"].includes(cycle)
}

// 現在の環境に応じた公開可能キーを取得（環境変数から）
export function getPublishableKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
}

// 現在の環境に応じた秘密キーを取得（環境変数から、サーバーサイドのみ）
export function getSecretKey() {
  return process.env.STRIPE_SECRET_KEY
}
