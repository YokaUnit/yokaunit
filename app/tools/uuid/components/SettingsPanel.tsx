import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Settings, Hash, Info } from "lucide-react"
import { UuidSettings, UUID_PRESETS, UUID_VERSION_INFO } from '../types'

interface SettingsPanelProps {
  settings: UuidSettings
  setSettings: (settings: UuidSettings) => void
  onGenerate: () => void
  isGenerating: boolean
}

export function SettingsPanel({ settings, setSettings, onGenerate, isGenerating }: SettingsPanelProps) {
  const applyPreset = (presetKey: string) => {
    const preset = UUID_PRESETS[presetKey as keyof typeof UUID_PRESETS]
    if (preset) {
      setSettings(preset.settings)
    }
  }

  return (
    <div className="space-y-6">
      {/* プリセット選択 */}
      <div>
        <label className="text-sm font-medium mb-3 block">プリセット選択</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(UUID_PRESETS).map(([key, preset]) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(key)}
              className="text-xs h-16 sm:h-12 flex flex-col items-center justify-center p-2 touch-manipulation"
            >
              <span className="font-medium text-sm">{preset.name}</span>
              <span className="text-xs text-gray-500 leading-tight">{preset.description}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium text-sm sm:text-base mb-3 block">UUIDバージョン</label>
            <Select value={settings.version} onValueChange={(value) => setSettings({ ...settings, version: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v4">v4 (ランダム) - 推奨</SelectItem>
                <SelectItem value="v1">v1 (タイムスタンプ)</SelectItem>
                <SelectItem value="v5">v5 (名前空間)</SelectItem>
                <SelectItem value="nil">Nil UUID (すべて0)</SelectItem>
              </SelectContent>
            </Select>
            
            {/* バージョン情報 */}
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{UUID_VERSION_INFO[settings.version].name}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{UUID_VERSION_INFO[settings.version].description}</p>
              <div className="text-xs space-y-1">
                <div><span className="font-medium">用途:</span> {UUID_VERSION_INFO[settings.version].useCase}</div>
                <div><span className="font-medium">セキュリティ:</span> {UUID_VERSION_INFO[settings.version].security}</div>
              </div>
            </div>
          </div>

          {/* v5用の名前空間設定 */}
          {settings.version === "v5" && (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">名前空間UUID</label>
                <Input
                  value={settings.namespace || ''}
                  onChange={(e) => setSettings({ ...settings, namespace: e.target.value })}
                  placeholder="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  標準の名前空間UUIDまたはカスタムUUID
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">名前</label>
                <Input
                  value={settings.name || ''}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  placeholder="example"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  名前空間内で一意の名前
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-medium text-sm sm:text-base mb-3 block">フォーマット設定</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="uppercase"
                  checked={settings.format.uppercase}
                  onCheckedChange={(checked) => setSettings({ 
                    ...settings, 
                    format: { ...settings.format, uppercase: checked as boolean } 
                  })}
                />
                <label htmlFor="uppercase" className="text-sm">
                  大文字で出力
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="hyphens"
                  checked={settings.format.includeHyphens}
                  onCheckedChange={(checked) => setSettings({ 
                    ...settings, 
                    format: { ...settings.format, includeHyphens: checked as boolean } 
                  })}
                />
                <label htmlFor="hyphens" className="text-sm">
                  ハイフン付き (PostgreSQL標準)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="brackets"
                  checked={settings.format.brackets}
                  onCheckedChange={(checked) => setSettings({ 
                    ...settings, 
                    format: { ...settings.format, brackets: checked as boolean } 
                  })}
                />
                <label htmlFor="brackets" className="text-sm">
                  ブラケット付き {`{uuid}`}
                </label>
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                高度な設定
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>高度な設定</DialogTitle>
                <DialogDescription>
                  UUID生成の詳細設定を行えます
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">カスタム名前空間</label>
                  <Input
                    value={settings.namespace || ''}
                    onChange={(e) => setSettings({ ...settings, namespace: e.target.value })}
                    placeholder="カスタム名前空間UUID"
                    className="mt-1 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    v5生成時に使用する名前空間UUID
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">カスタム名前</label>
                  <Input
                    value={settings.name || ''}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    placeholder="カスタム名前"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    v5生成時に使用する名前
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="lg"
            className="w-full h-14 sm:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-base font-semibold touch-manipulation"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? "生成中..." : "UUIDを生成"}
          </Button>
        </div>
      </div>
    </div>
  )
}
