import { NextRequest, NextResponse } from "next/server"

const ALLOWED_BUCKETS = new Set(["toolsimage"])

function getSupabasePublicObjectUrl(bucket: string, objectPath: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set")
  const safeBase = base.replace(/\/+$/, "")
  const safePath = objectPath.replace(/^\/+/, "")
  return `${safeBase}/storage/v1/object/public/${bucket}/${safePath}`
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bucket = searchParams.get("bucket") || ""
  const objectPath = searchParams.get("path") || ""

  if (!ALLOWED_BUCKETS.has(bucket)) {
    return NextResponse.json({ error: "bucket not allowed" }, { status: 400 })
  }
  if (!objectPath || objectPath.includes("..")) {
    return NextResponse.json({ error: "invalid path" }, { status: 400 })
  }

  const url = getSupabasePublicObjectUrl(bucket, objectPath)

  // Supabase を直接叩くのはサーバー側だけに閉じ、CDNキャッシュを効かせる。
  const upstream = await fetch(url, {
    // 画像のオリジン取得自体はキャッシュさせない（ここでのfetchキャッシュよりCDNを優先）
    cache: "no-store",
    headers: {
      // クローラ/ブラウザのUA差異で挙動が変わらないよう固定
      "User-Agent":
        "Mozilla/5.0 (compatible; YokaUnitImageProxy/1.0; +https://yokaunit.com)",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  })

  if (!upstream.ok) {
    return NextResponse.json(
      { error: `upstream error: ${upstream.status}` },
      { status: upstream.status }
    )
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream"
  const buf = await upstream.arrayBuffer()

  const res = new NextResponse(buf, {
    headers: {
      "Content-Type": contentType,
      // ブラウザもCDNもキャッシュさせ、同一画像の再取得を減らす。
      // ファイル名固定で上書きアップロードする運用の場合でも、1日程度なら実害が少なく効果が大きい。
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
      // 画像としてのスニッフィング抑止
      "X-Content-Type-Options": "nosniff",
      Vary: "Accept",
    },
  })

  return res
}

