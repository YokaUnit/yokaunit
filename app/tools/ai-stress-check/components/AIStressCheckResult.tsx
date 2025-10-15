"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Shield, AlertTriangle, CheckCircle, Target, Lightbulb, Brain, Sparkles } from "lucide-react"
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
    if (level >= 85) return 'メンタル最強'
    if (level >= 70) return 'ストレス強者'
    if (level >= 50) return 'バランス安定'
    if (level >= 30) return '成長必要'
    return 'ケア重要'
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
      case 'low': return '健康的'
      case 'medium': return '注意'
      case 'high': return 'ケア必要'
      default: return '不明'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* メイン結果カード */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
        {/* ヘッダー部分 */}
        <div className={`bg-gradient-to-r ${getStressLevelColor(result.stressLevel)} p-6 text-white text-center relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-3">{getStressLevelEmoji(result.stressLevel)}</div>
            <h2 className="text-3xl font-bold mb-2">{getStressLevelTitle(result.stressLevel)}タイプ</h2>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-5xl font-bold">{result.stressLevel}</div>
              <div className="text-xl opacity-90">/ 100点</div>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium`}>
              {getRiskText(result.riskLevel)}レベル
            </div>
          </div>
        </div>

        {/* コンテンツ部分 */}
        <div className="p-6">
          {/* タイプ説明 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {result.stressType}
            </h3>
            <p className="text-gray-700 leading-relaxed text-center">
              {result.stressDescription}
            </p>
          </div>

          {/* AI詳細分析（コンパクト版） */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-bold text-purple-800">AI分析レポート</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.detailedAnalysis}
            </p>
          </div>

          {/* シェアボタン */}
          <div className="text-center">
            <Button
              onClick={onShare}
              className={`bg-gradient-to-r ${getStressLevelColor(result.stressLevel)} hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl shadow-lg`}
            >
              <Share2 className="h-5 w-5 mr-2" />
              結果をシェア
            </Button>
          </div>
        </div>
      </Card>

      {/* 詳細分析セクション */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* あなたの特徴 */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">あなたの特徴</h3>
                <p className="text-xs text-purple-600">AI分析による性格特性</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {result.characteristics.map((characteristic, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-purple-100">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium text-sm leading-relaxed">{characteristic}</span>
                      {index === 0 && <div className="text-xs text-purple-600 mt-1">💡 メイン特徴</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-100/50 rounded-lg">
              <div className="text-xs text-purple-700">
                <strong>分析ポイント:</strong> あなたの行動パターンや思考傾向から導き出された特徴です
              </div>
            </div>
          </div>
        </Card>

        {/* あなたの強み */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">あなたの強み</h3>
                <p className="text-xs text-green-600">活かすべき能力・スキル</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {result.strengths.map((strength, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-100">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium text-sm leading-relaxed">{strength}</span>
                      {index === 0 && <div className="text-xs text-green-600 mt-1">⭐ 最大の強み</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-green-100/50 rounded-lg">
              <div className="text-xs text-green-700">
                <strong>活用法:</strong> これらの強みを意識的に活用することで、さらなる成長が期待できます
              </div>
            </div>
          </div>
        </Card>

        {/* 改善ポイント */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">改善ポイント</h3>
                <p className="text-xs text-orange-600">成長のための具体的な方向性</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {result.improvements.map((improvement, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-100">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                      <Target className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium text-sm leading-relaxed">{improvement}</span>
                      {index === 0 && <div className="text-xs text-orange-600 mt-1">🎯 優先改善点</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-orange-100/50 rounded-lg">
              <div className="text-xs text-orange-700">
                <strong>改善効果:</strong> 段階的に取り組むことで、ストレス耐性の大幅な向上が見込めます
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* AIアドバイス */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">AI専門アドバイス</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {result.advice}
        </p>
      </Card>

      {/* コンパクトレベル解説 */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-lg p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">レベル早見表</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <div className="text-lg mb-1">🚨</div>
            <div className="font-bold text-red-700">ケア重要</div>
            <div className="text-red-600">0-29点</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-orange-200">
            <div className="text-lg mb-1">⚠️</div>
            <div className="font-bold text-orange-700">成長必要</div>
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
