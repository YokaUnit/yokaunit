"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Shield, AlertTriangle, CheckCircle, Target, Lightbulb } from "lucide-react"
import type { StressCheckResult } from "../lib/types"

interface StressCheckResultProps {
  result: StressCheckResult
  onShare: () => void
}

export function StressCheckResult({ result, onShare }: StressCheckResultProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="h-5 w-5" />
      case 'medium': return <AlertTriangle className="h-5 w-5" />
      case 'high': return <AlertTriangle className="h-5 w-5" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  const getRiskText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '低リスク'
      case 'medium': return '中リスク'
      case 'high': return '高リスク'
      default: return '不明'
    }
  }

  const getStressLevelColor = (level: number) => {
    if (level >= 70) return 'from-green-500 to-emerald-600'
    if (level >= 50) return 'from-blue-500 to-cyan-600'
    if (level >= 30) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* メイン結果カード */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className={`bg-gradient-to-r ${getStressLevelColor(result.stressLevel)} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ストレス耐性レベル
          </h2>
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {result.stressLevel}
          </div>
          <p className="text-xl text-gray-600 mb-4">/ 100点</p>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${getRiskColor(result.riskLevel)} font-semibold`}>
            {getRiskIcon(result.riskLevel)}
            <span className="ml-2">{getRiskText(result.riskLevel)}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">
            {result.stressType}
          </h3>
          <p className="text-blue-700 leading-relaxed">
            {result.stressDescription}
          </p>
        </div>

        <Button
          onClick={onShare}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      {/* 詳細分析 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 特徴 */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">あなたの特徴</h3>
          </div>
          <div className="space-y-3">
            {result.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-purple-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-purple-600 text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700">{characteristic}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 強み */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">あなたの強み</h3>
          </div>
          <div className="space-y-3">
            {result.strengths.map((strength, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 改善点 */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">改善ポイント</h3>
          </div>
          <div className="space-y-3">
            {result.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-orange-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <Target className="h-3 w-3 text-orange-600" />
                </div>
                <span className="text-gray-700">{improvement}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* アドバイス */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">専門アドバイス</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {result.advice}
          </p>
        </Card>
      </div>

      {/* ストレス耐性レベル説明 */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">ストレス耐性レベル解説</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
          <div className="space-y-2">
            <div className="bg-red-500 h-3 rounded"></div>
            <div className="font-semibold">0-29</div>
            <div className="text-gray-600">要注意</div>
          </div>
          <div className="space-y-2">
            <div className="bg-orange-500 h-3 rounded"></div>
            <div className="font-semibold">30-49</div>
            <div className="text-gray-600">やや低い</div>
          </div>
          <div className="space-y-2">
            <div className="bg-yellow-500 h-3 rounded"></div>
            <div className="font-semibold">50-69</div>
            <div className="text-gray-600">普通</div>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-500 h-3 rounded"></div>
            <div className="font-semibold">70-84</div>
            <div className="text-gray-600">高い</div>
          </div>
          <div className="space-y-2">
            <div className="bg-green-500 h-3 rounded"></div>
            <div className="font-semibold">85-100</div>
            <div className="text-gray-600">非常に高い</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
