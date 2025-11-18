import { getToolBySlug } from "@/lib/actions/tools"

// 相対パスを完全なURLに変換する関数
function getAbsoluteImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return "https://yokaunit.com/ogp/yokaunit-common.png"
  }
  
  // 既に完全なURLの場合はそのまま返す
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }
  
  // 相対パスの場合は完全なURLに変換
  const baseUrl = "https://yokaunit.com"
  return imageUrl.startsWith("/") 
    ? `${baseUrl}${imageUrl}` 
    : `${baseUrl}/${imageUrl}`
}

/**
 * ツールの構造化データ用の画像URLを取得
 * データベースのimage_urlを使用し、なければデフォルト画像を返す
 */
export async function getToolImageUrl(slug: string): Promise<string> {
  try {
    const tool = await getToolBySlug(slug)
    return getAbsoluteImageUrl(tool?.image_url || "/ogp/yokaunit-common.png")
  } catch (_err) {
    // エラーの場合はデフォルト画像を返す
    return "https://yokaunit.com/ogp/yokaunit-common.png"
  }
}

