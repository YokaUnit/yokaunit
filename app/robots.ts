import type { MetadataRoute } from "next"

// Next.js App Router: robots.txt を生成する
// app/strategy は「社内メモ」扱いなので検索エンジンから除外します。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // 内部メモ（GitHub公開しない想定）
        disallow: ["/strategy", "/AITA", "/aita"],
      },
    ],
    sitemap: "https://yokaunit.com/sitemap.xml",
  }
}

