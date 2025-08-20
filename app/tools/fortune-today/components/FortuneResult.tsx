"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Briefcase, 
  DollarSign, 
  Star, 
  Sparkles, 
  AlertTriangle, 
  MessageCircle,
  Share2,
  TrendingUp,
  Trophy
} from "lucide-react"
import type { FortuneResult, ZodiacSign } from "../lib/types"
import { getFortuneMessage } from "../lib/fortune-calculator"

interface FortuneResultProps {
  result: FortuneResult
  zodiacSign: ZodiacSign
  todayAction: string
  onShare?: () => void
  onReset?: () => void
}

// 運勢スコアの色を取得
function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 bg-green-100"
  if (score >= 60) return "text-blue-600 bg-blue-100"
  if (score >= 40) return "text-yellow-600 bg-yellow-100"
  return "text-red-600 bg-red-100"
}

// 運勢スコアのプログレスバーの色を取得
function getProgressColor(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-blue-500"
  if (score >= 40) return "bg-yellow-500"
  return "bg-red-500"
}

// 運勢アイコンを取得
function getFortuneIcon(score: number) {
  if (score >= 80) return <TrendingUp className="h-5 w-5" />
  if (score >= 60) return <Star className="h-5 w-5" />
  if (score >= 40) return <Sparkles className="h-5 w-5" />
  return <AlertTriangle className="h-5 w-5" />
}

export function FortuneResult({ 
  result, 
  zodiacSign, 
  todayAction, 
  onShare, 
  onReset 
}: FortuneResultProps) {
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })

  const fortuneScores = [
    {
      label: "総合運",
      score: result.totalFortune,
      icon: <Star className="h-5 w-5" />,
      description: getFortuneMessage(result.totalFortune)
    },
    {
      label: "恋愛運",
      score: result.loveFortune,
      icon: <Heart className="h-5 w-5" />,
      description: getFortuneMessage(result.loveFortune)
    },
    {
      label: "仕事運",
      score: result.workFortune,
      icon: <Briefcase className="h-5 w-5" />,
      description: getFortuneMessage(result.workFortune)
    },
    {
      label: "金運",
      score: result.moneyFortune,
      icon: <DollarSign className="h-5 w-5" />,
      description: getFortuneMessage(result.moneyFortune)
    }
  ]

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">今日の運勢結果</h2>
          <p className="text-purple-100 mb-1">{today}</p>
          <p className="text-purple-100">
            {zodiacSign} × {todayAction}
          </p>
        </div>
      </Card>

      {/* 総合点表示 */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 p-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-yellow-800">今日の総合点</h3>
          </div>
          <div className="text-4xl font-bold text-yellow-700 mb-1">
            {Math.round((result.totalFortune + result.loveFortune + result.workFortune + result.moneyFortune) / 4)}
          </div>
          <div className="text-sm text-yellow-600">/ 100点</div>
          <div className="mt-2 text-xs text-yellow-700">
            全項目の平均点
          </div>
        </div>
      </Card>

      {/* 運勢スコア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fortuneScores.map((fortune) => (
          <Card key={fortune.label} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${getScoreColor(fortune.score)}`}>
                  {fortune.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{fortune.label}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{fortune.score}</div>
                <div className="text-sm text-gray-500">/ 100</div>
              </div>
            </div>
            
            <div className="mb-3">
              <Progress 
                value={fortune.score} 
                className="h-3"
              />
            </div>
            
            <p className="text-sm text-gray-600">{fortune.description}</p>
          </Card>
        ))}
      </div>

      {/* ラッキー行動と注意事項 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-green-500 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-green-800">今日のラッキー行動</h3>
          </div>
          <p className="text-green-700 font-semibold">{result.luckyAction}</p>
        </Card>

        <Card className="bg-orange-50 border-orange-200 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-orange-500 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-orange-800">今日の気をつけること</h3>
          </div>
          <p className="text-orange-700 font-semibold">{result.caution}</p>
        </Card>
      </div>

      {/* アドバイス */}
      <Card className="bg-blue-50 border-blue-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-blue-500 p-2 rounded-full">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-blue-800">今日のアドバイス</h3>
        </div>
        <p className="text-blue-700 leading-relaxed">{result.advice}</p>
      </Card>

      {/* 総合的な評価 */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-full">
            <Star className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-purple-800">総合的な評価</h3>
        </div>
        <p className="text-purple-700 leading-relaxed font-medium">{result.overallAssessment}</p>
      </Card>

      {/* 感情メッセージ */}
      {result.emotionalMessage && (
        <Card className="bg-pink-50 border-pink-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-pink-500 p-2 rounded-full">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-pink-800">今日の気持ち</h3>
          </div>
          <p className="text-pink-700 leading-relaxed">{result.emotionalMessage}</p>
        </Card>
      )}

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onShare && (
          <Button
            onClick={onShare}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl"
          >
            <Share2 className="h-5 w-5 mr-2" />
            結果をシェア
          </Button>
        )}
        
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-xl"
          >
            <Star className="h-5 w-5 mr-2" />
            もう一度占う
          </Button>
        )}
      </div>

      {/* 注意書き */}
      <Card className="bg-gray-50 border-gray-200 p-4">
        <p className="text-xs text-gray-600 text-center">
          ※ この占い結果は娯楽目的です。重要な決定は自分の判断で行ってください。<br />
          ※ 同じ内容でも日によって結果が変わる仕様になっています。
        </p>
      </Card>

      {/* 他のツールへの誘導 */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          他の占いツールもお試しください
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            AIモテ度診断
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            AI精神年齢診断
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            パスワード生成ツール
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            UUID生成ツール
          </Badge>
        </div>
      </Card>
    </div>
  )
}
