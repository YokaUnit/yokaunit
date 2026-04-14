import { getToolBySlug } from "@/lib/actions/tools"
import { absoluteToolImageUrlForMetadata } from "@/lib/image-proxy"

/**
 * ツールの構造化データ用の画像URLを取得
 * データベースのimage_urlを使用し、なければデフォルト画像を返す
 */
export async function getToolImageUrl(slug: string): Promise<string> {
  try {
    const tool = await getToolBySlug(slug)
    return absoluteToolImageUrlForMetadata(tool?.image_url || "/ogp/yokaunit-common.png")
  } catch (_err) {
    return "https://yokaunit.com/ogp/yokaunit-common.png"
  }
}
