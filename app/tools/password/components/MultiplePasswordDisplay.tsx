import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, RefreshCw } from "lucide-react"

interface MultiplePasswordDisplayProps {
  passwords: string[]
  passwordCount: number
  setPasswordCount: (count: number) => void
  copiedIndexes: number[]
  isGenerating: boolean
  onCopyAll: () => void
  onCopySingle: (index: number) => void
  onRegenerate: () => void
}

export function MultiplePasswordDisplay({
  passwords,
  passwordCount,
  setPasswordCount,
  copiedIndexes,
  isGenerating,
  onCopyAll,
  onCopySingle,
  onRegenerate
}: MultiplePasswordDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm sm:text-base">生成数:</span>
          <Badge variant="outline" className="text-sm px-3 py-1 bg-white dark:bg-gray-700">
            {passwordCount}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCopyAll} className="h-10 text-sm">
            <Copy className="h-4 w-4 mr-2" />
            すべてコピー
          </Button>
          <Button variant="outline" onClick={onRegenerate} disabled={isGenerating} className="h-10 text-sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            再生成
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <Slider
          value={[passwordCount]}
          min={1}
          max={50}
          step={1}
          onValueChange={(value) => setPasswordCount(value[0])}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      <div className="border rounded-lg divide-y max-h-80 overflow-y-auto bg-white dark:bg-gray-700">
        {passwords.map((pwd, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <code className="font-mono flex-1 truncate text-sm mr-2">{pwd}</code>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onCopySingle(index)}
                title="クリップボードにコピー"
              >
                {copiedIndexes.includes(index) ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
