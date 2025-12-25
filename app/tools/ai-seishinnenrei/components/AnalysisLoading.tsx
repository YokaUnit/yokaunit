"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Zap, BarChart3, CheckCircle2 } from "lucide-react"

interface AnalysisLoadingProps {
  onProgress?: (step: string, progress: number) => void
}

export function AnalysisLoading({ onProgress }: AnalysisLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { icon: "🔍", text: "回答を分析中...", color: "from-blue-500 to-cyan-500" },
    { icon: "🧠", text: "AIが感情を分析中...", color: "from-purple-500 to-pink-500" },
    { icon: "📊", text: "回答パターンを分析中...", color: "from-green-500 to-emerald-500" },
    { icon: "⚡", text: "精神年齢を計算中...", color: "from-orange-500 to-red-500" },
    { icon: "✨", text: "結果をまとめ中...", color: "from-pink-500 to-rose-500" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1
        if (next >= steps.length) {
          return prev
        }
        return next
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        const increment = Math.random() * 3 + 1
        return Math.min(100, prev + increment)
      })
    }, 150)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (onProgress && currentStep < steps.length) {
      const stepProgress = ((currentStep + 1) / steps.length) * 100
      onProgress(steps[currentStep].text, Math.min(100, stepProgress))
    }
  }, [currentStep, onProgress])

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl p-6 md:p-8 text-center">
        <div className="mb-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Brain className="h-10 w-10 text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AIが診断中...
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            あなたの回答をAIが詳しく分析しています
          </p>
        </div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{Math.round(progress)}%</p>
        </div>

        {/* ステップ表示 */}
        <div className="space-y-3 mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-50 border-2 border-green-200'
                  : index === currentStep
                  ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105`
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="text-2xl flex-shrink-0">
                {index < currentStep ? '✅' : index === currentStep ? step.icon : '⏳'}
              </div>
              <div className="flex-1 text-left">
                <p className={`text-sm font-semibold ${
                  index === currentStep ? 'text-white' : 'text-gray-700'
                }`}>
                  {step.text}
                </p>
              </div>
              {index === currentStep && (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 楽しいメッセージ */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <p className="text-sm text-gray-700">
            {currentStep === 0 && "あなたの回答を読み込んでいます..."}
            {currentStep === 1 && "AIがあなたの感情を分析しています..."}
            {currentStep === 2 && "回答パターンから性格を読み解いています..."}
            {currentStep === 3 && "精神年齢を精密に計算しています..."}
            {currentStep === 4 && "もうすぐ結果が出ます！"}
            {currentStep >= steps.length && "分析完了！結果を表示しています..."}
          </p>
        </div>
      </Card>
    </div>
  )
}

