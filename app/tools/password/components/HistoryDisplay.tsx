import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { History, Star, Copy, Trash2, Download, Clock } from "lucide-react"
import { PasswordHistory } from '../types'
import { useToast } from "@/hooks/use-toast"

interface HistoryDisplayProps {
  filteredHistory: PasswordHistory[]
  historyFilter: "all" | "favorites"
  setHistoryFilter: (filter: "all" | "favorites") => void
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onRemoveFromHistory: (id: string) => void
  onClearHistory: () => void
  onExportPasswords: (format: 'csv' | 'txt') => void
}

export function HistoryDisplay({
  filteredHistory,
  historyFilter,
  setHistoryFilter,
  favorites,
  onToggleFavorite,
  onRemoveFromHistory,
  onClearHistory,
  onExportPasswords
}: HistoryDisplayProps) {
  const { toast } = useToast()

  const copyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: "コピーしました",
        description: "パスワードがクリップボードにコピーされました",
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
          <h3 className="text-lg font-semibold">パスワード履歴</h3>
          <Badge variant="outline" className="text-xs">
            {filteredHistory.length}件
          </Badge>
        </div>
        <div className="flex gap-2">
          <Select value={historyFilter} onValueChange={(value: "all" | "favorites") => setHistoryFilter(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="favorites">お気に入り</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                エクスポート
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>エクスポート形式を選択</DialogTitle>
                <DialogDescription>
                  パスワード履歴をファイルにエクスポートします
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Button onClick={() => onExportPasswords('csv')} className="flex-1">
                  CSV形式
                </Button>
                <Button onClick={() => onExportPasswords('txt')} className="flex-1">
                  TXT形式
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" onClick={onClearHistory}>
            <Trash2 className="h-4 w-4 mr-1" />
            クリア
          </Button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>パスワード履歴がありません</p>
          <p className="text-sm">パスワードを生成すると履歴に保存されます</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {item.password}
                    </code>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.strength <= 2 ? 'text-red-600 border-red-300' :
                        item.strength <= 4 ? 'text-yellow-600 border-yellow-300' :
                        item.strength <= 6 ? 'text-blue-600 border-blue-300' :
                        'text-green-600 border-green-300'
                      }`}
                    >
                      {item.strength}/8
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.timestamp.toLocaleString()}
                    </span>
                    <span>長さ: {item.settings.length}</span>
                    <span>
                      {item.settings.includeUppercase ? 'A' : ''}
                      {item.settings.includeLowercase ? 'a' : ''}
                      {item.settings.includeNumbers ? '1' : ''}
                      {item.settings.includeSymbols ? '!' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(item.id)}
                    className={`h-8 w-8 p-0 ${
                      favorites.has(item.id) ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyPassword(item.password)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromHistory(item.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
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
