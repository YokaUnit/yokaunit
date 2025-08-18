"use client"

import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Users, Heart } from "lucide-react"

interface AnalysisLoadingProps {
  stage: number // 0-4の段階
}

export function AnalysisLoading({ stage }: AnalysisLoadingProps) {
  const stages = [
    { icon: Brain, text: "AIモデルを読み込んでいます...", color: "from-purple-500 to-pink-500", duration: "予想時間: 3-5秒" },
    { icon: Sparkles, text: "ポジティブ度を分析中...", color: "from-yellow-400 to-orange-500", duration: "分析中..." },
    { icon: Users, text: "社交性を評価中...", color: "from-blue-500 to-cyan-500", duration: "評価中..." },
    { icon: Heart, text: "共感力を解析中...", color: "from-green-500 to-emerald-500", duration: "解析中..." },
    { icon: Brain, text: "診断結果を生成しています...", color: "from-pink-500 to-purple-500", duration: "もうすぐ完了！" }
  ]

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
      <div className="space-y-6">
        <div className="text-4xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI分析中...</h2>
        
        <div className="space-y-4">
          {stages.map((stageInfo, index) => {
            const IconComponent = stageInfo.icon
            const isActive = index === stage
            const isCompleted = index < stage
            
            return (
              <div 
                key={index}
                className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 shadow-md' 
                    : isCompleted 
                      ? 'bg-green-50 border-2 border-green-300' 
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                      ? `bg-gradient-to-r ${stageInfo.color}` 
                      : 'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    <span className="text-white text-xl">✓</span>
                  ) : (
                    <IconComponent className={`h-6 w-6 text-white ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${
                    isCompleted 
                      ? 'text-green-700' 
                      : isActive 
                        ? 'text-purple-700' 
                        : 'text-gray-500'
                  }`}>
                    {stageInfo.text}
                  </p>
                  {isActive && (
                    <p className="text-xs text-purple-600 mt-1">
                      {stageInfo.duration}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 relative"
              style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
            >
              {/* アニメーション効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">
              {Math.round(((stage + 1) / stages.length) * 100)}% 完了
            </p>
            <p className="text-xs text-gray-500">
              ステップ {stage + 1} / {stages.length}
            </p>
          </div>
        </div>

        {/* 現在の段階に応じた詳細情報 */}
        <div className="bg-blue-50/80 rounded-xl p-4 mt-6">
          {stage === 0 && (
            <p className="text-sm text-blue-700">
              🧠 AIモデル（DistilBERT）を読み込んでいます。初回利用時は少し時間がかかります。
            </p>
          )}
          {stage === 1 && (
            <p className="text-sm text-blue-700">
              ✨ あなたの回答から前向きさと明るさを分析しています。
            </p>
          )}
          {stage === 2 && (
            <p className="text-sm text-blue-700">
              👥 コミュニケーション能力と社交性を評価しています。
            </p>
          )}
          {stage === 3 && (
            <p className="text-sm text-blue-700">
              ❤️ 相手への思いやりと共感力を解析中です。
            </p>
          )}
          {stage === 4 && (
            <p className="text-sm text-blue-700">
              🎯 あなた専用の診断結果とアドバイスを生成しています！
            </p>
          )}
        </div>

        {/* リアルタイム進行状況 */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </Card>
  )
}
