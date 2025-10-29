"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Zap, 
  Clock, 
  Filter, 
  SortAsc, 
  SortDesc,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Save,
  Trash2,
  Info
} from "lucide-react"

interface OGPCheckerSettings {
  autoSave: boolean
  showAdvanced: boolean
  defaultBatchSize: number
  cacheResults: boolean
  autoRefresh: boolean
  darkMode: boolean
  showImages: boolean
  sortBy: 'score' | 'date' | 'url' | 'title'
  sortOrder: 'asc' | 'desc'
  filterMinScore: number
  filterMaxScore: number
  showErrors: boolean
  showWarnings: boolean
  exportFormat: 'csv' | 'json' | 'xlsx'
  theme: 'blue' | 'purple' | 'green' | 'red'
}

interface SettingsPanelProps {
  settings: OGPCheckerSettings
  onSettingsChange: (settings: OGPCheckerSettings) => void
  onResetSettings: () => void
  onExportSettings: () => void
  onImportSettings: (settings: OGPCheckerSettings) => void
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  onResetSettings,
  onExportSettings,
  onImportSettings
}: SettingsPanelProps) {
  const updateSetting = <K extends keyof OGPCheckerSettings>(
    key: K,
    value: OGPCheckerSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          設定パネル
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 基本設定 */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            基本設定
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span className="text-sm">自動保存</span>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">高度な表示</span>
              </div>
              <Switch
                checked={settings.showAdvanced}
                onCheckedChange={(checked) => updateSetting('showAdvanced', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">自動更新</span>
              </div>
              <Switch
                checked={settings.autoRefresh}
                onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">画像表示</span>
              </div>
              <Switch
                checked={settings.showImages}
                onCheckedChange={(checked) => updateSetting('showImages', checked)}
              />
            </div>
          </div>
        </div>

        {/* バッチ設定 */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            バッチ設定
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                デフォルトバッチサイズ: {settings.defaultBatchSize}件
              </label>
              <Slider
                value={[settings.defaultBatchSize]}
                onValueChange={([value]) => updateSetting('defaultBatchSize', value)}
                max={50}
                min={5}
                step={5}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">結果キャッシュ</span>
              </div>
              <Switch
                checked={settings.cacheResults}
                onCheckedChange={(checked) => updateSetting('cacheResults', checked)}
              />
            </div>
          </div>
        </div>

        {/* ソート・フィルター設定 */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <SortAsc className="h-4 w-4" />
            ソート・フィルター
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">ソート基準</label>
              <Select
                value={settings.sortBy}
                onValueChange={(value: 'score' | 'date' | 'url' | 'title') => 
                  updateSetting('sortBy', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">SEOスコア</SelectItem>
                  <SelectItem value="date">日時</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="title">タイトル</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">ソート順序</label>
              <Select
                value={settings.sortOrder}
                onValueChange={(value: 'asc' | 'desc') => 
                  updateSetting('sortOrder', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">昇順</SelectItem>
                  <SelectItem value="desc">降順</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                スコアフィルター: {settings.filterMinScore} - {settings.filterMaxScore}
              </label>
              <Slider
                value={[settings.filterMinScore, settings.filterMaxScore]}
                onValueChange={([min, max]) => {
                  updateSetting('filterMinScore', min)
                  updateSetting('filterMaxScore', max)
                }}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 表示設定 */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            表示設定
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">エラー表示</span>
              </div>
              <Switch
                checked={settings.showErrors}
                onCheckedChange={(checked) => updateSetting('showErrors', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                <span className="text-sm">警告表示</span>
              </div>
              <Switch
                checked={settings.showWarnings}
                onCheckedChange={(checked) => updateSetting('showWarnings', checked)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">テーマ</label>
              <Select
                value={settings.theme}
                onValueChange={(value: 'blue' | 'purple' | 'green' | 'red') => 
                  updateSetting('theme', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">ブルー</SelectItem>
                  <SelectItem value="purple">パープル</SelectItem>
                  <SelectItem value="green">グリーン</SelectItem>
                  <SelectItem value="red">レッド</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* エクスポート設定 */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Download className="h-4 w-4" />
            エクスポート設定
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">デフォルト形式</label>
              <Select
                value={settings.exportFormat}
                onValueChange={(value: 'csv' | 'json' | 'xlsx') => 
                  updateSetting('exportFormat', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button onClick={onExportSettings} size="sm" variant="outline">
            <Download className="h-3 w-3 mr-1" />
            設定エクスポート
          </Button>
          <Button onClick={onResetSettings} size="sm" variant="outline">
            <RefreshCw className="h-3 w-3 mr-1" />
            リセット
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
