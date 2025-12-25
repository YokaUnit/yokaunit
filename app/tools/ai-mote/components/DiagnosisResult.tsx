"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Sparkles, Users, Heart, Trophy, Star, Twitter, MessageCircle } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

export function DiagnosisResult({ result, onShare }: DiagnosisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "from-red-500 to-pink-500"
    if (score >= 70) return "from-orange-500 to-red-500"
    if (score >= 55) return "from-yellow-500 to-orange-500"
    if (score >= 40) return "from-blue-500 to-purple-500"
    return "from-gray-500 to-blue-500"
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🔥"
    if (score >= 80) return "✨"
    if (score >= 70) return "💫"
    if (score >= 60) return "⭐"
    if (score >= 50) return "🌟"
    return "💎"
  }

  const getScoreTitle = (score: number) => {
    if (score >= 90) return "超絶モテ王"
    if (score >= 80) return "モテ上級者"
    if (score >= 70) return "モテ中級者"
    if (score >= 60) return "モテ初級者"
    if (score >= 50) return "隠れモテ"
    return "ダイヤの原石"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "圧倒的な魅力の持ち主！"
    if (score >= 80) return "多くの人を惹きつける魅力！"
    if (score >= 70) return "十分な魅力を持っている！"
    if (score >= 60) return "魅力的な要素がたくさん！"
    if (score >= 50) return "隠れた魅力がいっぱい！"
    return "磨けば光る素晴らしい素質！"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
      {/* メイン結果カード */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
        {/* ヘッダー部分 */}
        <div className={`bg-gradient-to-r ${getScoreColor(result.score)} p-5 sm:p-6 text-white text-center relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-5xl sm:text-6xl mb-2 sm:mb-3">{getScoreEmoji(result.score)}</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 px-2">{getScoreTitle(result.score)}</h2>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
              <div className="text-4xl sm:text-5xl font-bold">{result.score}</div>
              <div className="text-lg sm:text-xl opacity-90">/ 100%</div>
            </div>
            <div className="text-base sm:text-lg font-medium opacity-90 px-2">
              {getScoreMessage(result.score)}
            </div>
          </div>
        </div>

        {/* コンテンツ部分 */}
        <div className="p-4 sm:p-6">
          {/* タイプ説明 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2 text-center px-2">
              {result.type}
            </h3>
            <p className="text-sm sm:text-base text-purple-700 leading-relaxed text-center px-2">
              {result.description}
            </p>
          </div>

          {/* シェアボタン */}
          <div className="text-center space-y-3">
            <Button
              onClick={onShare}
              className={`w-full bg-gradient-to-r ${getScoreColor(result.score)} hover:opacity-90 text-white font-bold py-4 md:py-5 px-8 rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation min-h-[56px]`}
            >
              <Share2 className="h-5 w-5 mr-2" />
              結果をシェア
            </Button>
            
            {/* SNSシェアボタン */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => {
                  const text = `【AIモテ度診断結果】私のモテ度は${result.score}%でした！${result.type}タイプです✨ ポジティブ度${result.positiveScore}%、社交性${result.socialScore}%、共感力${result.empathyScore}%でした。`
                  const url = encodeURIComponent(window.location.href)
                  const tweetText = encodeURIComponent(text)
                  window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`, '_blank')
                }}
                variant="outline"
                className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-xl touch-manipulation min-h-[48px]"
              >
                <Twitter className="h-4 w-4 mr-1" />
                <span className="text-xs sm:text-sm">Twitter</span>
              </Button>
              <Button
                onClick={() => {
                  const text = `【AIモテ度診断結果】私のモテ度は${result.score}%でした！${result.type}タイプです✨ ポジティブ度${result.positiveScore}%、社交性${result.socialScore}%、共感力${result.empathyScore}%でした。`
                  const url = encodeURIComponent(window.location.href)
                  window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`, '_blank')
                }}
                variant="outline"
                className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl touch-manipulation min-h-[48px]"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs sm:text-sm">LINE</span>
              </Button>
              <Button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href)
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
                }}
                variant="outline"
                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold py-3 rounded-xl touch-manipulation min-h-[48px]"
              >
                <span className="text-xs sm:text-sm font-bold">FB</span>
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              友達にも診断してもらって、結果を比較しよう！
            </p>
          </div>
        </div>
      </Card>

      {/* 詳細スコア */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* ポジティブ度 */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">ポジティブ度</h4>
                <p className="text-xs text-orange-600">前向きさと明るさ</p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-orange-600 mb-2">{result.positiveScore}%</div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${result.positiveScore}%` }}
                />
              </div>
            </div>
            
            <div className="bg-orange-100/50 rounded-lg p-3">
              <div className="text-xs text-orange-700 text-center">
                {result.positiveScore >= 80 ? "✨ 超ポジティブ！" : 
                 result.positiveScore >= 60 ? "😊 明るい性格" :
                 result.positiveScore >= 40 ? "🌟 前向き" : "💎 伸びしろあり"}
              </div>
            </div>
          </div>
        </Card>

        {/* 社交性 */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">社交性</h4>
                <p className="text-xs text-blue-600">コミュ力と親しみやすさ</p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">{result.socialScore}%</div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${result.socialScore}%` }}
                />
              </div>
            </div>
            
            <div className="bg-blue-100/50 rounded-lg p-3">
              <div className="text-xs text-blue-700 text-center">
                {result.socialScore >= 80 ? "🎉 超社交的！" : 
                 result.socialScore >= 60 ? "👥 人気者" :
                 result.socialScore >= 40 ? "🤝 親しみやすい" : "🌱 成長中"}
              </div>
            </div>
          </div>
        </Card>

        {/* 共感力 */}
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-200/30 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">共感力</h4>
                <p className="text-xs text-pink-600">思いやりと理解力</p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-pink-600 mb-2">{result.empathyScore}%</div>
              <div className="w-full bg-pink-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${result.empathyScore}%` }}
                />
              </div>
            </div>
            
            <div className="bg-pink-100/50 rounded-lg p-3">
              <div className="text-xs text-pink-700 text-center">
                {result.empathyScore >= 80 ? "💖 超共感的！" : 
                 result.empathyScore >= 60 ? "🤗 思いやり上手" :
                 result.empathyScore >= 40 ? "💕 優しい心" : "🌸 温かい人"}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* AIアドバイス */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">AIモテ度アップアドバイス</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {result.advice}
        </p>
      </Card>

    </div>
  )
}
