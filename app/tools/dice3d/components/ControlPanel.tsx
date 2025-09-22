"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Dice1, 
  Plus, 
  Minus, 
  RotateCcw, 
  Play, 
  Trash2,
  Settings,
  BarChart3,
} from "lucide-react"
import type { DicePhysicsSettings } from "../lib/dice-physics"

interface ControlPanelProps {
  diceCount: number
  isRolling: boolean
  physics: DicePhysicsSettings
  results: Array<{ id: number; value: number; color: string }>
  statistics: {
    total: number
    average: number
    count: number
    distribution: Record<number, number>
  } | null
  onAddDice: (count: number) => void
  onRemoveDice: () => void
  onClearAll: () => void
  onRollAll: () => void
  onResetAll: () => void
  onUpdatePhysics: (physics: Partial<DicePhysicsSettings>) => void
}

export function ControlPanel({
  diceCount,
  isRolling,
  physics,
  results,
  statistics,
  onAddDice,
  onRemoveDice,
  onClearAll,
  onRollAll,
  onResetAll,
  onUpdatePhysics,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      {/* サイコロ管理 */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Dice1 className="h-5 w-5 text-blue-600" />
            サイコロ管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">現在のサイコロ数:</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-bold">
              {diceCount}個
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">サイコロを追加</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddDice(1)}
                className="text-xs hover:bg-blue-50 hover:border-blue-300"
              >
                <Plus className="h-3 w-3 mr-1" />
                +1
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddDice(5)}
                className="text-xs hover:bg-blue-50 hover:border-blue-300"
              >
                <Plus className="h-3 w-3 mr-1" />
                +5
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddDice(10)}
                className="text-xs hover:bg-blue-50 hover:border-blue-300"
              >
                <Plus className="h-3 w-3 mr-1" />
                +10
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">サイコロを削除</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRemoveDice}
                disabled={diceCount === 0}
                className="flex-1 text-xs hover:bg-orange-50 hover:border-orange-300"
              >
                <Minus className="h-3 w-3 mr-1" />
                1個削除
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onClearAll}
                disabled={diceCount === 0}
                className="flex-1 text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                全削除
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 操作ボタン */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Play className="h-5 w-5 text-green-600" />
            操作
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onRollAll}
            disabled={isRolling || diceCount === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
          >
            {isRolling ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                振っています...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                すべて振る
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onResetAll}
            disabled={diceCount === 0}
            className="w-full hover:bg-gray-50 border-gray-300"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            リセット
          </Button>
        </CardContent>
      </Card>

      {/* 物理設定 */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Settings className="h-5 w-5 text-purple-600" />
            物理設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">投げる力</Label>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {physics.impulseStrength}
              </Badge>
            </div>
            <Slider
              value={[physics.impulseStrength]}
              onValueChange={([value]) => onUpdatePhysics({ impulseStrength: value })}
              min={1}
              max={15}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">回転の強さ</Label>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {physics.torqueStrength}
              </Badge>
            </div>
            <Slider
              value={[physics.torqueStrength]}
              onValueChange={([value]) => onUpdatePhysics({ torqueStrength: value })}
              min={1}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">質量</Label>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {physics.mass}
              </Badge>
            </div>
            <Slider
              value={[physics.mass]}
              onValueChange={([value]) => onUpdatePhysics({ mass: value })}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">反発係数</Label>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {physics.restitution.toFixed(2)}
              </Badge>
            </div>
            <Slider
              value={[physics.restitution]}
              onValueChange={([value]) => onUpdatePhysics({ restitution: value })}
              min={0.1}
              max={0.8}
              step={0.05}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">摩擦係数</Label>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {physics.friction.toFixed(2)}
              </Badge>
            </div>
            <Slider
              value={[physics.friction]}
              onValueChange={([value]) => onUpdatePhysics({ friction: value })}
              min={0.3}
              max={1.0}
              step={0.05}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* 合計表示 */}
      {statistics && statistics.total > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              合計
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{statistics.total}</div>
              <div className="text-sm text-gray-600 mt-1">{statistics.count}個のサイコロ</div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
