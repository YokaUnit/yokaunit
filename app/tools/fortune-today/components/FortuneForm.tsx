"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Star } from "lucide-react"
import type { ZodiacSign, FortuneInput } from "../lib/types"

const ZODIAC_SIGNS: { sign: ZodiacSign; emoji: string; period: string }[] = [
  { sign: "牡羊座", emoji: "♈", period: "3/21-4/19" },
  { sign: "牡牛座", emoji: "♉", period: "4/20-5/20" },
  { sign: "双子座", emoji: "♊", period: "5/21-6/21" },
  { sign: "蟹座", emoji: "♋", period: "6/22-7/22" },
  { sign: "獅子座", emoji: "♌", period: "7/23-8/22" },
  { sign: "乙女座", emoji: "♍", period: "8/23-9/22" },
  { sign: "天秤座", emoji: "♎", period: "9/23-10/23" },
  { sign: "蠍座", emoji: "♏", period: "10/24-11/22" },
  { sign: "射手座", emoji: "♐", period: "11/23-12/21" },
  { sign: "山羊座", emoji: "♑", period: "12/22-1/19" },
  { sign: "水瓶座", emoji: "♒", period: "1/20-2/18" },
  { sign: "魚座", emoji: "♓", period: "2/19-3/20" },
]

interface FortuneFormProps {
  onSubmit: (input: FortuneInput) => void
  isLoading?: boolean
}

export function FortuneForm({ onSubmit, isLoading = false }: FortuneFormProps) {
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | "">("")
  const [todayAction, setTodayAction] = useState("")
  const [errors, setErrors] = useState<{ zodiac?: string; action?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // バリデーション
    const newErrors: { zodiac?: string; action?: string } = {}
    
    if (!zodiacSign) {
      newErrors.zodiac = "星座を選択してください"
    }
    
    if (!todayAction.trim()) {
      newErrors.action = "今日の行動を入力してください"
    } else if (todayAction.trim().length < 2) {
      newErrors.action = "2文字以上で入力してください"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    onSubmit({
      zodiacSign: zodiacSign as ZodiacSign,
      todayAction: todayAction.trim()
    })
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Star className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">今日の運勢を占います</h2>
          <p className="text-gray-600">あなたの星座と今日の行動を教えてください</p>
        </div>

        {/* 星座選択 */}
        <div className="space-y-2">
          <Label htmlFor="zodiac-select" className="text-lg font-semibold text-gray-700">
            あなたの星座
          </Label>
          <Select 
            value={zodiacSign} 
            onValueChange={(value) => {
              setZodiacSign(value as ZodiacSign)
              if (errors.zodiac) setErrors(prev => ({ ...prev, zodiac: undefined }))
            }}
          >
            <SelectTrigger className={`h-14 text-lg ${errors.zodiac ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="星座を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {ZODIAC_SIGNS.map((zodiac) => (
                <SelectItem key={zodiac.sign} value={zodiac.sign} className="h-14">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{zodiac.emoji}</span>
                    <div>
                      <div className="font-semibold">{zodiac.sign}</div>
                      <div className="text-sm text-gray-500">{zodiac.period}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.zodiac && (
            <p className="text-red-500 text-sm mt-1">{errors.zodiac}</p>
          )}
        </div>

        {/* 今日の行動入力 */}
        <div className="space-y-2">
          <Label htmlFor="today-action" className="text-lg font-semibold text-gray-700">
            今日の行動
          </Label>
          <p className="text-sm text-gray-500 mb-2">
            例：プレゼン、デート、勉強、買い物、友達と会う など
          </p>
          <Textarea
            id="today-action"
            value={todayAction}
            onChange={(e) => {
              setTodayAction(e.target.value)
              if (errors.action) setErrors(prev => ({ ...prev, action: undefined }))
            }}
            placeholder="今日予定している行動を自由に入力してください..."
            className={`min-h-[100px] text-lg resize-none ${errors.action ? 'border-red-500' : ''}`}
            maxLength={200}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            <div>
              {errors.action && (
                <p className="text-red-500 text-sm">{errors.action}</p>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {todayAction.length}/200文字
            </p>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg min-w-[200px] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span>AI占い中...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>運勢を占う</span>
              </div>
            )}
          </Button>
        </div>

        {/* 注意事項 */}
        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p>※ 運勢は参考程度にお楽しみください</p>
          <p>※ 同じ内容でも日によって結果が変わります</p>
        </div>
      </form>
    </Card>
  )
}
