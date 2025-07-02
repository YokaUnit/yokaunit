"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Settings } from "lucide-react"

interface AdvancedOptionsProps {
  roundUp: number
  onRoundUpChange: (value: number) => void
}

export function AdvancedOptions({ roundUp, onRoundUpChange }: AdvancedOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const roundUpOptions = [
    { value: 1, label: "1円単位" },
    { value: 10, label: "10円単位" },
    { value: 100, label: "100円単位" },
    { value: 1000, label: "1000円単位" },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 justify-between hover:bg-gray-50 rounded-none"
      >
        <div className="flex items-center">
          <Settings className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium text-gray-700">詳細設定</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </Button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">端数処理</label>
            <div className="grid grid-cols-2 gap-2">
              {roundUpOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={roundUp === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRoundUpChange(option.value)}
                  className={`rounded-xl ${
                    roundUp === option.value
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
            <p className="font-medium mb-1">💡 ヒント</p>
            <ul className="space-y-1">
              <li>• 負担比率で幹事の負担を調整できます</li>
              <li>• PayPayボタンでアプリが開きます</li>
              <li>• 結果URLで計算内容を共有できます</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  )
}
