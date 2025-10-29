import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, RefreshCw, Hash } from "lucide-react"

interface MultipleUuidDisplayProps {
  uuids: string[]
  uuidCount: number
  setUuidCount: (count: number) => void
  copiedIndexes: number[]
  isGenerating: boolean
  generationTime: number
  onCopyAll: () => void
  onCopySingle: (index: number) => void
  onRegenerate: () => void
}

export function MultipleUuidDisplay({
  uuids,
  uuidCount,
  setUuidCount,
  copiedIndexes,
  isGenerating,
  generationTime,
  onCopyAll,
  onCopySingle,
  onRegenerate
}: MultipleUuidDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm sm:text-base">生成数:</span>
          <Badge variant="outline" className="text-sm px-3 py-1 bg-white dark:bg-gray-700">
            {uuidCount}
          </Badge>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCopyAll} className="h-12 px-4 text-sm touch-manipulation">
            <Copy className="h-4 w-4 mr-2" />
            すべてコピー
          </Button>
          <Button variant="outline" onClick={onRegenerate} disabled={isGenerating} className="h-12 px-4 text-sm touch-manipulation">
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            再生成
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">1</span>
          <input
            type="range"
            min="1"
            max="100"
            value={uuidCount}
            onChange={(e) => setUuidCount(parseInt(e.target.value))}
            className="flex-1 mx-4"
          />
          <span className="text-sm">100</span>
        </div>
        <div className="text-center text-xs text-gray-500">
          生成時間: {generationTime.toFixed(2)}ms ({uuidCount}個)
        </div>
      </div>

      <div className="border rounded-lg divide-y max-h-80 overflow-y-auto bg-white dark:bg-gray-700">
        {uuids.map((uuidItem, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="flex-1 min-w-0">
              <code className="font-mono text-sm truncate block mr-2">{uuidItem}</code>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {uuidItem.length}文字
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v{uuidItem.match(/^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}/i)?.[1] || '?'}
                </Badge>
                {uuidItem === uuidItem.toUpperCase() && (
                  <Badge variant="outline" className="text-xs">
                    大文字
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 touch-manipulation"
                onClick={() => onCopySingle(index)}
                title="クリップボードにコピー"
              >
                {copiedIndexes.includes(index) ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 統計情報 */}
      {uuids.length > 0 && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-4 w-4 text-indigo-600" />
            <span className="font-medium text-sm">生成統計</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <div className="font-bold text-indigo-600">{uuids.length}</div>
              <div className="text-xs text-gray-500">総数</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">
                {new Set(uuids).size}
              </div>
              <div className="text-xs text-gray-500">ユニーク</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">
                {generationTime.toFixed(2)}ms
              </div>
              <div className="text-xs text-gray-500">総時間</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">
                {(generationTime / uuids.length).toFixed(2)}ms
              </div>
              <div className="text-xs text-gray-500">平均</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
