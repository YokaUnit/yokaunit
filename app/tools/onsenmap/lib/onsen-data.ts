import { createServerSupabaseClient } from "@/lib/supabase"

export interface OnsenData {
  id: number
  slug: string
  name: string
  description: string
  region: string
  address: string
  latitude: number
  longitude: number
  image_url: string | null
  photo_gallery: string[] | null
  rating: number
  reviews_count: number
  ranking: number
  equipment: string[] | null
  admission_fee_adult: number | null
  admission_fee_child: number | null
  opening_hours: string | null
  holiday: string | null
  parking_spaces: number | null
  phone: string | null
  nearest_station: string | null
  website_url: string | null
  affiliate_link: string | null
  history_description: string | null
  spring_quality_description: string | null
  access_description: string | null
  recommendation_description: string | null
  created_at: string
  updated_at: string
}

export interface AccommodationData {
  id: number
  name: string
  type: string
  description: string
  address: string
  latitude: number
  longitude: number
  image_url: string | null
  rating: number
  reviews_count: number
  price_range: {
    min: number
    max: number
  }
  check_in: string
  check_out: string
  onsen_bath: boolean
  wifi: boolean
  parking: boolean
  jalan_link: string | null
  rakuten_link: string | null
  official_website: string | null
  distance_to_onsen: number | null
  related_onsen_id: number | null
  created_at: string
  updated_at: string
}

// データベースから温泉データを取得
export async function getOnsenData(): Promise<OnsenData[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("onsens").select("*").order("ranking", { ascending: true })

  if (error) {
    console.error("Error fetching onsen data:", error)
    return []
  }

  return data || []
}

// 個別温泉データ取得
export async function getOnsenBySlug(slug: string): Promise<OnsenData | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("onsens").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching onsen by slug:", error)
    return null
  }

  return data
}

// 地域別温泉データ取得
export async function getOnsenByRegion(region: string): Promise<OnsenData[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("onsens")
    .select("*")
    .eq("region", region)
    .order("ranking", { ascending: true })

  if (error) {
    console.error("Error fetching onsen by region:", error)
    return []
  }

  return data || []
}

// ランキング順でソート済みデータ取得
export async function getOnsenDataSorted(): Promise<OnsenData[]> {
  return getOnsenData()
}

// 宿泊施設データを取得
export async function getAccommodationData(): Promise<AccommodationData[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("accommodations").select("*").order("rating", { ascending: false })

  if (error) {
    console.error("Error fetching accommodation data:", error)
    return []
  }

  // price_range オブジェクトに変換
  return (data || []).map((item) => ({
    ...item,
    price_range: {
      min: item.price_min,
      max: item.price_max,
    },
  }))
}

// 宿泊施設タイプのラベル取得
export function getAccommodationTypeLabel(type: string): string {
  const typeLabels: { [key: string]: string } = {
    hotel: "ホテル",
    ryokan: "旅館",
    guesthouse: "ゲストハウス",
    pension: "ペンション",
    minshuku: "民宿",
  }

  return typeLabels[type] || type
}
