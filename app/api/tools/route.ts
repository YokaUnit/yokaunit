import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { toProxiedSupabasePublicImageUrl } from "@/lib/image-proxy"

type Sort = "popular" | "new" | "name" | "views"

function parseIntParam(v: string | null, def: number) {
  const n = v ? Number.parseInt(v, 10) : NaN
  return Number.isFinite(n) ? n : def
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const limit = Math.min(Math.max(parseIntParam(searchParams.get("limit"), 20), 1), 100)
  const offset = Math.max(parseIntParam(searchParams.get("offset"), 0), 0)

  const category = searchParams.get("category")
  const tab = searchParams.get("tab") // all | popular | new | premium | private
  const search = searchParams.get("search")?.trim() || ""
  const sort = (searchParams.get("sort") as Sort | null) || "popular"

  // anon でも読める前提（RLSで制御されているならここに集約するのが安全）
  const supabase = await createServerSupabaseClient()

  // 必要最小フィールドのみ
  let query = supabase
    .from("tools")
    .select(
      "id,slug,title,description,category,subcategory,tags,icon,href,image_url,is_premium,is_private,is_new,is_popular,is_active,likes_count,view_count,created_at,updated_at",
      { count: "exact" }
    )
    .eq("is_active", true)

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  if (tab === "popular") query = query.eq("is_popular", true)
  if (tab === "premium") query = query.eq("is_premium", true)
  if (tab === "private") query = query.eq("is_private", true)
  // new は created_at で並べ替えるだけにしておく（is_new運用に依存しない）

  if (search) {
    const term = `%${search}%`
    query = query.or(`title.ilike.${term},description.ilike.${term}`)
  }

  // sort
  if (sort === "name") {
    query = query.order("title", { ascending: true })
  } else if (sort === "views") {
    query = query.order("view_count", { ascending: false }).order("created_at", { ascending: false })
  } else if (sort === "new" || tab === "new") {
    query = query.order("created_at", { ascending: false })
  } else {
    query = query.order("likes_count", { ascending: false }).order("created_at", { ascending: false })
  }

  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const tools = (data || []).map((t: any) => ({
    ...t,
    image_url: toProxiedSupabasePublicImageUrl(t.image_url),
  }))

  const res = NextResponse.json({
    tools,
    total: count || 0,
    limit,
    offset,
  })

  // CDNキャッシュ（検索・カテゴリ・ページングでURLが変わるので安全）
  res.headers.set("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400")
  return res
}

