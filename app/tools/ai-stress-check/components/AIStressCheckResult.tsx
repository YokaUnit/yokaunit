"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Sparkles, CheckCircle, AlertTriangle, Lightbulb, Brain } from "lucide-react"
import type { AIStressCheckResult } from "../lib/types"

interface AIStressCheckResultProps {
  result: AIStressCheckResult
  onShare: () => void
}

export function AIStressCheckResult({ result, onShare }: AIStressCheckResultProps) {
  const getStressLevelColor = (level: number) => {
    if (level >= 85) return 'from-green-500 to-emerald-600'
    if (level >= 70) return 'from-blue-500 to-cyan-600'
    if (level >= 50) return 'from-yellow-500 to-orange-600'
    if (level >= 30) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-600'
  }

  const getStressLevelTitle = (level: number) => {
    if (level >= 85) return 'メンタル最強タイプ'
    if (level >= 70) return 'ストレス強者タイプ'
    if (level >= 50) return 'バランス安定タイプ'
    if (level >= 30) return '成長期待タイプ'
    return 'ケア最優先タイプ'
  }

  const getStressLevelEmoji = (level: number) => {
    if (level >= 85) return '🌟'
    if (level >= 70) return '😊'
    if (level >= 50) return '😐'
    if (level >= 30) return '⚠️'
    return '🚨'
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'リスク低'
      case 'medium': return '注意'
      case 'high': return 'ケア必要'
      default: return '不明'
    }
  }

  const primaryStrength = result.strengths[0] ?? '強みの分析結果はありません'
  const primaryImprovement = result.improvements[0] ?? '改善ポイントの分析結果はありません'

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Card className="bg-white/95 backdrop-blur-sm border border-blue-100 shadow-md rounded-2xl p-6 md:p-8 text-center">
        <div className="mb-5">
          <div className="text-5xl md:text-6xl mb-3">{getStressLevelEmoji(result.stressLevel)}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{getStressLevelTitle(result.stressLevel)}</h2>
          <p className="text-sm text-gray-600 mt-1">AIが算出したストレス耐性スコアは <strong className="text-blue-700">{result.stressLevel} / 100</strong> でした。</p>
        </div>

        <div className="space-y-3 mb-5">
          <div className={`bg-gradient-to-r ${getStressLevelColor(result.stressLevel)} w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform duration-300 hover:scale-105`}>
            <span className="text-white text-3xl md:text-4xl font-bold">{result.stressLevel}</span>
          </div>
          <p className="text-sm font-semibold text-blue-800">{result.stressType}</p>
          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full border text-xs font-semibold ${getRiskColor(result.riskLevel)}`}>
            {getRiskText(result.riskLevel)}レベル
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="text-[11px] text-gray-500 uppercase tracking-wide">主要な強み</p>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{primaryStrength}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="text-[11px] text-gray-500 uppercase tracking-wide">優先改善ポイント</p>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{primaryImprovement}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="text-[11px] text-gray-500 uppercase tracking-wide">総合コメント</p>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{getStressLevelTitle(result.stressLevel)}</p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 mt-5 text-left">
          <p className="text-sm text-blue-800 leading-relaxed">{result.stressDescription}</p>
        </div>

        <Button
          onClick={onShare}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 md:py-4 rounded-xl text-base"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      <Card className="bg-white/95 border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">AI分析サマリー</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{result.detailedAnalysis}</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-white/95 border border-gray-100 shadow-sm rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/10 text-purple-600 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">あなたの特徴</h3>
          </div>
          <div className="space-y-2">
            {result.characteristics.map((characteristic, index) => (
              <div key={index} className="rounded-lg border border-purple-100 bg-white p-3 text-sm text-gray-700 leading-relaxed">
                {characteristic}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/95 border border-gray-100 shadow-sm rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-green-500/10 text-green-600 p-2 rounded-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">あなたの強み</h3>
          </div>
          <div className="space-y-2">
            {result.strengths.map((strength, index) => (
              <div key={index} className="rounded-lg border border-green-100 bg-white p-3 text-sm text-gray-700 leading-relaxed">
                {strength}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-white/95 border border-gray-100 shadow-sm rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500/10 text-orange-600 p-2 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">改善ポイント</h3>
        </div>
        <div className="space-y-2">
          {result.improvements.map((improvement, index) => (
            <div key={index} className="rounded-lg border border-orange-100 bg-white p-3 text-sm text-gray-700 leading-relaxed">
              {improvement}
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-sm rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">AIからのアドバイス</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{result.advice}</p>
      </Card>

      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-sm rounded-2xl p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">ストレス耐性レベルの目安</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <div className="text-lg mb-1">🚨</div>
            <div className="font-bold text-red-700">ケア必要</div>
            <div className="text-red-600">0-29点</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-orange-200">
            <div className="text-lg mb-1">⚠️</div>
            <div className="font-bold text-orange-700">成長期待</div>
            <div className="text-orange-600">30-49点</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-200">
            <div className="text-lg mb-1">😐</div>
            <div className="font-bold text-yellow-700">バランス安定</div>
            <div className="text-yellow-600">50-69点</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <div className="text-lg mb-1">😊</div>
            <div className="font-bold text-blue-700">ストレス強者</div>
            <div className="text-blue-600">70-84点</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="text-lg mb-1">🌟</div>
            <div className="font-bold text-green-700">メンタル最強</div>
            <div className="text-green-600">85-100点</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
