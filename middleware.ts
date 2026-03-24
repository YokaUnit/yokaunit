import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 検索エンジンに「載せない」ため、該当パスには noindex/nofollow を明示する。
// `app/robots.ts` だけだと既存インデックス/再訪まで完全には止めきれないため、
// 念のため middleware で強制する。
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set("x-robots-tag", "noindex, nofollow")
  return res
}

export const config = {
  matcher: [
    "/strategy",
    "/strategy/:path*",
    "/AITA",
    "/AITA/:path*",
    "/aita",
    "/aita/:path*",
  ],
}

