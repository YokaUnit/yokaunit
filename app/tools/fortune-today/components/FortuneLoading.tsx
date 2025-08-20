"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Sparkles, Heart, Gem } from "lucide-react"

interface FortuneLoadingProps {
  zodiacSign: string
  todayAction: string
}

export function FortuneLoading({ zodiacSign, todayAction }: FortuneLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)

  const stages = [
    { 
      icon: <Gem className="h-6 w-6" />, 
      text: "星座の運気を読み取っています...", 
      subtext: `${zodiacSign}の特性を分析中`,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Sparkles className="h-6 w-6" />, 
      text: "今日の行動を運勢に反映しています...", 
      subtext: `「${todayAction}」の影響を計算中`,
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Heart className="h-6 w-6" />, 
      text: "AIが個別のアドバイスを生成中...", 
      subtext: "あなた専用のメッセージを作成中",
      color: "from-pink-500 to-red-500"
    },
    { 
      icon: <Star className="h-6 w-6" />, 
      text: "運勢の最終調整をしています...", 
      subtext: "もう少しでお見せできます",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        
        // ステージの切り替え
        const newStage = Math.floor(newProgress / 25)
        if (newStage !== currentStage && newStage < stages.length) {
          setCurrentStage(newStage)
        }
        
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 40) // 40ms間隔で2%ずつ増加 = 約2秒で完了

    return () => clearInterval(timer)
  }, [currentStage, stages.length])

  const currentStageData = stages[currentStage] || stages[stages.length - 1]

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {/* アニメーションアイコン */}
        <div className="relative">
          <div className={`bg-gradient-to-r ${currentStageData.color} p-6 rounded-full mx-auto w-20 h-20 flex items-center justify-center animate-pulse`}>
            <div className="text-white animate-spin">
              {currentStageData.icon}
            </div>
          </div>
          
          {/* 周囲のキラキラエフェクト */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-ping absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"></div>
            <div className="animate-ping absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-10" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* メインテキスト */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-800 animate-pulse">
            {currentStageData.text}
          </h3>
          <p className="text-sm text-gray-600">
            {currentStageData.subtext}
          </p>
        </div>

        {/* プログレスバー */}
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-3 bg-gray-200"
          />
          <p className="text-xs text-gray-500">
            {progress}% 完了
          </p>
        </div>

        {/* 占い師からのメッセージ */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-purple-700 font-medium">占い師より</p>
          </div>
          <p className="text-sm text-purple-600 leading-relaxed">
            {progress < 25 && "星々の声に耳を傾けています..."}
            {progress >= 25 && progress < 50 && "あなたの運命の糸を紡いでいます..."}
            {progress >= 50 && progress < 75 && "未来への扉が開かれようとしています..."}
            {progress >= 75 && "素晴らしい運勢が見えてきました..."}
          </p>
        </div>

        {/* 装飾的な要素 */}
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
                          className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
