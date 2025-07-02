"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ChevronUp, ChevronDown } from "lucide-react"

interface PeopleCountPickerProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export function PeopleCountPicker({ value, onChange, max = 50 }: PeopleCountPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const numbers = Array.from({ length: max - 1 }, (_, i) => i + 2) // 2人から50人まで

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.touches[0].clientY
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 20) {
      if (diff > 0 && value < max) {
        // 上スワイプ：人数増加
        onChange(Math.min(value + 1, max))
      } else if (diff < 0 && value > 2) {
        // 下スワイプ：人数減少
        onChange(Math.max(value - 1, 2))
      }
      setTouchStart(null)
    }
  }

  const handleTouchEnd = () => {
    setTouchStart(null)
  }

  if (!isOpen) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users className="h-4 w-4 inline mr-1" />
          人数
        </label>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full justify-between rounded-xl border-gray-200 py-3"
        >
          <span className="text-lg font-semibold">{value}人</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Users className="h-4 w-4 inline mr-1" />
        人数
      </label>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-4">
        <div className="text-center space-y-4">
          {/* 増加ボタン */}
          <Button
            onClick={() => onChange(Math.min(value + 1, max))}
            variant="ghost"
            size="sm"
            disabled={value >= max}
            className="w-full"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>

          {/* 現在の値 */}
          <div
            className="py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
            <div className="text-sm text-gray-600">人</div>
            <div className="text-xs text-gray-500 mt-2">上下にスワイプで調整</div>
          </div>

          {/* 減少ボタン */}
          <Button
            onClick={() => onChange(Math.max(value - 1, 2))}
            variant="ghost"
            size="sm"
            disabled={value <= 2}
            className="w-full"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>

          {/* クイック選択 */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100">
            {[5, 10, 20, 30].map((num) => (
              <Button
                key={num}
                onClick={() => onChange(num)}
                variant={value === num ? "default" : "outline"}
                size="sm"
                className="text-xs"
              >
                {num}人
              </Button>
            ))}
          </div>

          {/* 完了ボタン */}
          <Button onClick={() => setIsOpen(false)} className="w-full mt-4 rounded-xl">
            決定
          </Button>
        </div>
      </Card>
    </div>
  )
}
