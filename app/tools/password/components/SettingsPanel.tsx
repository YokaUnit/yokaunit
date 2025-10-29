import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings, Zap } from "lucide-react"
import { PasswordSettings, PRESETS } from '../types'

interface SettingsPanelProps {
  settings: PasswordSettings
  setSettings: (settings: PasswordSettings) => void
  onGenerate: () => void
  isGenerating: boolean
}

export function SettingsPanel({ settings, setSettings, onGenerate, isGenerating }: SettingsPanelProps) {
  const applyPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey as keyof typeof PRESETS]
    if (preset) {
      setSettings({
        ...settings,
        ...preset,
        preset: presetKey
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* プリセット選択 */}
      <div>
        <label className="text-sm font-medium mb-3 block">プリセット選択</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <Button
              key={key}
              variant={settings.preset === key ? "default" : "outline"}
              size="sm"
              onClick={() => applyPreset(key)}
              className={`text-xs ${settings.preset === key ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium text-sm sm:text-base mb-3 block">
              長さ: {settings.length}文字
            </label>
            <Slider
              value={[settings.length]}
              min={4}
              max={64}
              step={1}
              onValueChange={(value) => setSettings({ ...settings, length: value[0] })}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>4</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          <div>
            <label className="font-medium text-sm sm:text-base mb-3 block">含める文字</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="uppercase"
                  checked={settings.includeUppercase}
                  onCheckedChange={(checked) => setSettings({ ...settings, includeUppercase: checked as boolean })}
                />
                <label htmlFor="uppercase" className="text-sm">
                  大文字 (A-Z)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="lowercase"
                  checked={settings.includeLowercase}
                  onCheckedChange={(checked) => setSettings({ ...settings, includeLowercase: checked as boolean })}
                />
                <label htmlFor="lowercase" className="text-sm">
                  小文字 (a-z)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="numbers"
                  checked={settings.includeNumbers}
                  onCheckedChange={(checked) => setSettings({ ...settings, includeNumbers: checked as boolean })}
                />
                <label htmlFor="numbers" className="text-sm">
                  数字 (0-9)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="symbols"
                  checked={settings.includeSymbols}
                  onCheckedChange={(checked) => setSettings({ ...settings, includeSymbols: checked as boolean })}
                />
                <label htmlFor="symbols" className="text-sm">
                  記号 (!@#$%^&*)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-medium text-sm sm:text-base mb-3 block">オプション</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="exclude-similar"
                  checked={settings.excludeSimilar}
                  onCheckedChange={(checked) => setSettings({ ...settings, excludeSimilar: checked as boolean })}
                />
                <label htmlFor="exclude-similar" className="text-sm">
                  似た文字を除外 (0, O, 1, l, I)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="exclude-ambiguous"
                  checked={settings.excludeAmbiguous}
                  onCheckedChange={(checked) => setSettings({ ...settings, excludeAmbiguous: checked as boolean })}
                />
                <label htmlFor="exclude-ambiguous" className="text-sm">
                  曖昧な文字を除外
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
                  パスワード生成の詳細設定を行えます
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">カスタム文字セット</label>
                  <Input
                    value={settings.customCharset}
                    onChange={(e) => setSettings({ ...settings, customCharset: e.target.value })}
                    placeholder="例: abcdefghijklmnopqrstuvwxyz"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    カスタム文字セットを指定すると、他の設定は無視されます
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-base font-semibold"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            <Zap className="h-5 w-5 mr-2" />
            {isGenerating ? "生成中..." : "パスワードを生成"}
          </Button>
        </div>
      </div>
    </div>
  )
}
