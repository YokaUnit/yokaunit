import { createServerSupabaseClient } from "@/lib/supabase"

export interface Tool {
  id: string
  slug: string
  title: string
  description: string
  category: string
  subcategory: string | null
  tags: string[]
  icon: string
  href: string
  is_premium: boolean
  is_private: boolean
  is_new: boolean
  is_popular: boolean
  is_active: boolean
  likes_count: number
  created_at: string
  updated_at: string
}

// カタカナ・ひらがな変換関数
function convertKanaHira(str: string): string[] {
  const variations = [str]

  // ひらがな → カタカナ
  const hiraganaToKatakana = str.replace(/[\u3041-\u3096]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 0x60)
  })
  if (hiraganaToKatakana !== str) {
    variations.push(hiraganaToKatakana)
  }

  // カタカナ → ひらがな
  const katakanaToHiragana = str.replace(/[\u30a1-\u30f6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60)
  })
  if (katakanaToHiragana !== str) {
    variations.push(katakanaToHiragana)
  }

  return [...new Set(variations)]
}

export async function getTools(options?: {
  category?: string
  isPopular?: boolean
  isNew?: boolean
  isPremium?: boolean
  isPrivate?: boolean
  search?: string
  limit?: number
  offset?: number
}): Promise<{ tools: Tool[]; total: number }> {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("tools").select("*", { count: "exact" }).eq("is_active", true)

  // フィルタリング
  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category)
  }

  if (options?.isPopular !== undefined) {
    query = query.eq("is_popular", options.isPopular)
  }

  if (options?.isNew !== undefined) {
    query = query.eq("is_new", options.isNew)
  }

  if (options?.isPremium !== undefined) {
    query = query.eq("is_premium", options.isPremium)
  }

  if (options?.isPrivate !== undefined) {
    query = query.eq("is_private", options.isPrivate)
  }

  // 検索（カタカナ・ひらがな対応）
  if (options?.search && options.search.trim()) {
    const searchVariations = convertKanaHira(options.search.trim())
    const searchConditions = searchVariations
      .map((variation) => {
        const searchTerm = `%${variation}%`
        return `title.ilike.${searchTerm},description.ilike.${searchTerm}`
      })
      .join(",")

    query = query.or(searchConditions)
  }

  // ソート（人気順がデフォルト）
  query = query.order("likes_count", { ascending: false })
  query = query.order("created_at", { ascending: false })

  // ページネーション
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Error fetching tools: ${error.message}`)
  }

  return {
    tools: data || [],
    total: count || 0,
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("tools").select("*").eq("slug", slug).eq("is_active", true).single()

  if (error) {
    throw new Error(`Error fetching tool: ${error.message}`)
  }

  return data
}

export async function getCategories(): Promise<string[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("tools").select("category").eq("is_active", true).order("category")

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`)
  }

  const categories = Array.from(new Set(data?.map((item) => item.category) || []))
  return categories
}
