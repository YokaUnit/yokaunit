"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Dice1, 
  Plus, 
  Minus, 
  RotateCcw, 
  Trash2, 
  Play,
  Settings,
  BarChart3
} from "lucide-react"
import type { DicePhysicsSettings } from "../lib/dice-physics"

interface DiceResult {
  id: number
  value: number
  color: string
}

interface Statistics {
  total: number
  average: number
  count: number
  distribution: Record<number, number>
}

interface ControlPanelProps {
  diceCount: number
  isRolling: boolean
  physics: DicePhysicsSettings
  results: DiceResult[]
  statistics: Statistics | null
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Dice1 className="h-5 w-5" />
            サイコロ管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">サイコロ数: {diceCount}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddDice(1)}
              disabled={isRolling}
            >
              <Plus className="h-4 w-4 mr-1" />
              +1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddDice(5)}
              disabled={isRolling}
            >
              <Plus className="h-4 w-4 mr-1" />
              +5
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveDice}
              disabled={isRolling || diceCount === 0}
            >
              <Minus className="h-4 w-4 mr-1" />
              削除
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              disabled={isRolling || diceCount === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              全削除
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Button
              onClick={onRollAll}
              disabled={diceCount === 0}
              className="w-full"
              size="lg"
            >
              <Play className="h-4 w-4 mr-1" />
              サイコロを振る
            </Button>
            <Button
              variant="outline"
              onClick={onResetAll}
              disabled={diceCount === 0}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              リセット
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 物理設定 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            物理設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              投げる力: {physics.impulseStrength}
            </label>
            <Slider
              value={[physics.impulseStrength]}
              onValueChange={([value]) => onUpdatePhysics({ impulseStrength: value })}
              min={1}
              max={8}
              step={0.5}
              disabled={isRolling}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              回転力: {physics.torqueStrength}
            </label>
            <Slider
              value={[physics.torqueStrength]}
              onValueChange={([value]) => onUpdatePhysics({ torqueStrength: value })}
              min={0.5}
              max={5}
              step={0.1}
              disabled={isRolling}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              反発係数: {physics.restitution}
            </label>
            <Slider
              value={[physics.restitution]}
              onValueChange={([value]) => onUpdatePhysics({ restitution: value })}
              min={0}
              max={1}
              step={0.1}
              disabled={isRolling}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              摩擦係数: {physics.friction}
            </label>
            <Slider
              value={[physics.friction]}
              onValueChange={([value]) => onUpdatePhysics({ friction: value })}
              min={0}
              max={1}
              step={0.1}
              disabled={isRolling}
            />
          </div>
        </CardContent>
      </Card>

      {/* 結果表示 */}
      {results.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              結果
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {results.map((result) => (
                <Badge
                  key={result.id}
                  variant="outline"
                  className="text-lg px-3 py-1"
                  style={{ backgroundColor: result.color }}
                >
                  {result.value}
                </Badge>
              ))}
            </div>
            
            {statistics && (
              <>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>合計:</span>
                    <span className="font-medium">{statistics.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>平均:</span>
                    <span className="font-medium">{statistics.average}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>個数:</span>
                    <span className="font-medium">{statistics.count}</span>
                  </div>
                </div>
                
                <Separator />
                <div className="space-y-1">
                  <div className="text-sm font-medium">分布:</div>
                  {Object.entries(statistics.distribution).map(([face, count]) => (
                    <div key={face} className="flex justify-between text-xs">
                      <span>{face}の目:</span>
                      <span>{count}回</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}