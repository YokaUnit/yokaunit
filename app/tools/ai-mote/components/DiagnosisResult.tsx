"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Sparkles, Users, Heart, Trophy, Star } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

export function DiagnosisResult({ result, onShare }: DiagnosisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-red-500 to-pink-500"
    if (score >= 60) return "from-orange-500 to-red-500"
    if (score >= 40) return "from-yellow-500 to-orange-500"
    return "from-blue-500 to-purple-500"
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🔥"
    if (score >= 80) return "✨"
    if (score >= 70) return "💫"
    if (score >= 60) return "⭐"
    if (score >= 50) return "🌟"
    return "💎"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "超絶モテモテ！"
    if (score >= 80) return "かなりモテる！"
    if (score >= 70) return "モテ度高め！"
    if (score >= 60) return "モテ要素あり！"
    if (score >= 50) return "隠れモテ！"
    return "ダイヤの原石！"
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* メイン結果カード */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center animate-in fade-in-50 duration-1000">
        <div className="mb-6">
          <div className="text-6xl mb-4">{getScoreEmoji(result.score)}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">診断結果</h2>
          <p className="text-gray-600">あなたのAIモテ度は...</p>
        </div>

        <div className="mb-8">
          <div className={`bg-gradient-to-r ${getScoreColor(result.score)} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transition-all duration-300 hover:scale-105`}>
            <span className="text-white text-4xl font-bold">{result.score}%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{getScoreMessage(result.score)}</h3>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6">
            <h4 className="text-xl font-bold text-purple-800 mb-2">{result.type}</h4>
            <p className="text-purple-700 leading-relaxed">{result.description}</p>
          </div>
        </div>

        <Button
          onClick={onShare}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      {/* 詳細スコア */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 animate-in slide-in-from-left-4 duration-700 delay-300">
        <h3 className="text-2xl font-bold text-center mb-8">詳細スコア</h3>
        
        <div className="space-y-6">
          {/* ポジティブ度 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">ポジティブ度</h4>
                  <p className="text-sm text-gray-600">前向きさと明るい表現力</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-orange-600">{result.positiveScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${result.positiveScore}%` }}
              />
            </div>
          </div>

          {/* 社交性 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">社交性</h4>
                  <p className="text-sm text-gray-600">コミュニケーション能力</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{result.socialScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${result.socialScore}%` }}
              />
            </div>
          </div>

          {/* 共感力 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">共感力</h4>
                  <p className="text-sm text-gray-600">相手への思いやりと理解力</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{result.empathyScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${result.empathyScore}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* アドバイスカード */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-xl p-8 animate-in slide-in-from-right-4 duration-700 delay-500">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-800 mb-2">モテ度アップのアドバイス</h3>
        </div>
        
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-purple-700 leading-relaxed text-lg">{result.advice}</p>
        </div>
      </Card>

      {/* シェア用カード風デザイン */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-xl p-8 text-center">
        <div className="mb-4">
          <Star className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">AIモテ度診断結果</h3>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold mb-2">{result.score}%</div>
          <div className="text-xl font-semibold mb-3">{result.type}</div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-bold">ポジティブ度</div>
              <div>{result.positiveScore}%</div>
            </div>
            <div>
              <div className="font-bold">社交性</div>
              <div>{result.socialScore}%</div>
            </div>
            <div>
              <div className="font-bold">共感力</div>
              <div>{result.empathyScore}%</div>
            </div>
          </div>
        </div>
        
        <p className="text-sm opacity-90">あなたも無料で診断してみよう！</p>
        <p className="text-xs opacity-75 mt-1">yokaunit.com</p>
      </Card>

      {/* 関連コンテンツ */}
      <Card className="bg-gray-50/80 backdrop-blur-sm border-0 shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-center">🎯 診断結果を活かそう</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">💬 コミュニケーションのコツ</h4>
            <p>相手の話をよく聞き、共感を示すことで好印象を与えられます。自然な笑顔と相づちを心がけましょう。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">✨ 魅力アップの方法</h4>
            <p>自分らしさを大切にしつつ、相手への思いやりを忘れずに。ポジティブな言葉遣いを意識してみてください。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🌟 恋愛での活かし方</h4>
            <p>診断結果を参考に、自分の強みを活かしたアプローチを心がけてみてください。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🎪 友達と楽しもう</h4>
            <p>結果をシェアして友達と比較したり、一緒に診断を楽しんでみてください。</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
