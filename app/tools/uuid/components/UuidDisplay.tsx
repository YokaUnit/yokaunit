import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, RefreshCw, Hash, Clock } from "lucide-react"

interface UuidDisplayProps {
  uuid: string
  copied: boolean
  isGenerating: boolean
  generationTime: number
  onCopy: () => void
  onGenerate: () => void
}

export function UuidDisplay({
  uuid,
  copied,
  isGenerating,
  generationTime,
  onCopy,
  onGenerate
}: UuidDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              value={uuid}
              onChange={() => {}} // readOnly
              className="font-mono text-base sm:text-lg h-14 sm:h-12 border-2 focus:border-indigo-500 text-center sm:text-left pr-12"
              readOnly
              placeholder="UUIDを生成してください..."
            />
          </div>
          <div className="flex gap-3 justify-center sm:justify-start">
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 sm:h-12 sm:w-12 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700 touch-manipulation"
              onClick={onCopy}
              title="クリップボードにコピー"
            >
              {copied ? <Check className="h-6 w-6 text-green-500" /> : <Copy className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 sm:h-12 sm:w-12 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700 touch-manipulation"
              onClick={onGenerate}
              disabled={isGenerating}
              title="新しいUUIDを生成"
            >
              <RefreshCw className={`h-6 w-6 ${isGenerating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* 生成時間とUUID情報 */}
        {uuid && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{uuid.length}</div>
              <div className="text-xs text-gray-500">文字数</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{uuid.split('-').length - 1}</div>
              <div className="text-xs text-gray-500">ハイフン数</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-bold text-blue-600">
                {uuid.match(/[A-Z]/g)?.length || 0}
              </div>
              <div className="text-xs text-gray-500">大文字</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-bold text-purple-600">
                {generationTime.toFixed(2)}ms
              </div>
              <div className="text-xs text-gray-500">生成時間</div>
            </div>
          </div>
        )}

        {/* UUID詳細情報 */}
        {uuid && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="h-4 w-4 text-indigo-600" />
              <span className="font-medium text-sm">UUID詳細情報</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">形式:</span>
                <Badge variant="outline" className="text-xs">
                  {uuid.includes('-') ? 'ハイフン付き' : 'ハイフンなし'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">大文字:</span>
                <Badge variant="outline" className="text-xs">
                  {uuid === uuid.toUpperCase() ? 'あり' : 'なし'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ブラケット:</span>
                <Badge variant="outline" className="text-xs">
                  {uuid.startsWith('{') && uuid.endsWith('}') ? 'あり' : 'なし'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">バージョン:</span>
                <Badge variant="outline" className="text-xs">
                  {uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}/i)?.[1] || '不明'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
