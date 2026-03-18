import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("tools")
    .select("category")
    .eq("is_active", true)
    .order("category")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const categories = Array.from(new Set((data || []).map((x: any) => x.category))).filter(Boolean)
  const res = NextResponse.json({ categories })
  res.headers.set("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400")
  return res
}

