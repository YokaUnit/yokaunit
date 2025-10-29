import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { History, Star, Copy, Trash2, Download, Clock, Hash, BarChart3 } from "lucide-react"
import { UuidHistory } from '../types'
import { useToast } from "@/hooks/use-toast"

interface HistoryDisplayProps {
  filteredHistory: UuidHistory[]
  historyFilter: "all" | "favorites"
  setHistoryFilter: (filter: "all" | "favorites") => void
  favorites: Set<string>
  stats: any
  onToggleFavorite: (id: string) => void
  onRemoveFromHistory: (id: string) => void
  onClearHistory: () => void
  onExportUuids: (format: 'csv' | 'txt') => void
}

export function HistoryDisplay({
  filteredHistory,
  historyFilter,
  setHistoryFilter,
  favorites,
  stats,
  onToggleFavorite,
  onRemoveFromHistory,
  onClearHistory,
  onExportUuids
}: HistoryDisplayProps) {
  const { toast } = useToast()

  const copyUuid = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid)
      toast({
        title: "コピーしました",
        description: "UUIDがクリップボードにコピーされました",
      })
    } catch (error) {
      toast({
        title: "コピーに失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">UUID履歴</h3>
          <Badge variant="outline" className="text-xs">
            {filteredHistory.length}件
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={historyFilter} onValueChange={(value: "all" | "favorites") => setHistoryFilter(value)}>
            <SelectTrigger className="w-32 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="favorites">お気に入り</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 px-3 touch-manipulation">
                <Download className="h-4 w-4 mr-1" />
                エクスポート
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>エクスポート形式を選択</DialogTitle>
                <DialogDescription>
                  UUID履歴をファイルにエクスポートします
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Button onClick={() => onExportUuids('csv')} className="flex-1 h-12 touch-manipulation">
                  CSV形式
                </Button>
                <Button onClick={() => onExportUuids('txt')} className="flex-1 h-12 touch-manipulation">
                  TXT形式
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" onClick={onClearHistory} className="h-10 px-3 touch-manipulation">
            <Trash2 className="h-4 w-4 mr-1" />
            クリア
          </Button>
        </div>
      </div>

      {/* 統計情報 */}
      {stats.totalGenerated > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <h4 className="font-medium">生成統計</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.totalGenerated}</div>
              <div className="text-xs text-gray-500">総生成数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.versionCounts.v4}</div>
              <div className="text-xs text-gray-500">v4 (ランダム)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.versionCounts.v1}</div>
              <div className="text-xs text-gray-500">v1 (タイムスタンプ)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{stats.versionCounts.v5}</div>
              <div className="text-xs text-gray-500">v5 (名前空間)</div>
            </div>
          </div>
        </Card>
      )}

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>UUID履歴がありません</p>
          <p className="text-sm">UUIDを生成すると履歴に保存されます</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {item.uuid}
                    </code>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.isValid ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
                      }`}
                    >
                      {item.isValid ? '有効' : '無効'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      v{item.settings.version}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.timestamp.toLocaleString()}
                    </span>
                    <span>
                      {item.settings.format.uppercase ? '大文字' : '小文字'}
                    </span>
                    <span>
                      {item.settings.format.includeHyphens ? 'ハイフン付き' : 'ハイフンなし'}
                    </span>
                    {item.settings.format.brackets && (
                      <span>ブラケット付き</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(item.id)}
                    className={`h-10 w-10 p-0 touch-manipulation ${
                      favorites.has(item.id) ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <Star className={`h-5 w-5 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyUuid(item.uuid)}
                    className="h-10 w-10 p-0 touch-manipulation"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromHistory(item.id)}
                    className="h-10 w-10 p-0 text-red-500 hover:text-red-700 touch-manipulation"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
