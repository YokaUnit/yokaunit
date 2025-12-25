import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTools } from "@/lib/actions/tools"
import type { Tool } from "@/lib/actions/tools"

interface RelatedToolsProps {
  currentToolSlug: string
  category?: string
  limit?: number
  title?: string
}

/**
 * 関連ツールを表示するコンポーネント（SEO内部リンク強化用）
 */
export async function RelatedTools({
  currentToolSlug,
  category,
  limit = 6,
  title = "関連ツール",
}: RelatedToolsProps) {
  try {
    const { tools } = await getTools({
      category: category,
      limit: limit + 1, // 現在のツールを除外するため+1
    })

    // 現在のツールを除外
    const relatedTools = tools
      .filter((tool) => tool.slug !== currentToolSlug)
      .slice(0, limit)

    if (relatedTools.length === 0) {
      return null
    }

    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Error fetching related tools:", error)
    return null
  }
}

interface CategoryToolsListProps {
  category: string
  currentToolSlug?: string
  limit?: number
}

/**
 * カテゴリー内のツール一覧を表示（カテゴリーページ用）
 */
export async function CategoryToolsList({
  category,
  currentToolSlug,
  limit = 12,
}: CategoryToolsListProps) {
  try {
    const { tools } = await getTools({
      category,
      limit: currentToolSlug ? limit + 1 : limit,
    })

    const displayTools = currentToolSlug
      ? tools.filter((tool) => tool.slug !== currentToolSlug).slice(0, limit)
      : tools.slice(0, limit)

    if (displayTools.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          このカテゴリーにはまだツールがありません
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {displayTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">{tool.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                {tool.is_new && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    NEW
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching category tools:", error)
    return (
      <div className="text-center py-12 text-gray-500">
        ツールの取得に失敗しました
      </div>
    )
  }
}
