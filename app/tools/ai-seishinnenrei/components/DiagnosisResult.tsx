"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, TrendingUp, TrendingDown, Minus, Trophy, Lightbulb, Star } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

export function DiagnosisResult({ result, onShare }: DiagnosisResultProps) {
  const getAgeIcon = (difference: number) => {
    if (difference >= 5) return <TrendingUp className="h-8 w-8 text-blue-600" />
    if (difference <= -5) return <TrendingDown className="h-8 w-8 text-green-600" />
    return <Minus className="h-8 w-8 text-purple-600" />
  }

  const getAgeMessage = (difference: number) => {
    if (difference >= 10) return "かなり大人びています"
    if (difference >= 5) return "少し大人びています"
    if (difference <= -10) return "とても若々しいです"
    if (difference <= -5) return "若々しい心です"
    return "年相応のバランス"
  }

  const getAgeColor = (difference: number) => {
    if (difference >= 5) return "from-blue-500 to-indigo-500"
    if (difference <= -5) return "from-green-500 to-emerald-500"
    return "from-purple-500 to-pink-500"
  }

  const getAgeEmoji = (mentalAge: number) => {
    if (mentalAge >= 60) return "🧓"
    if (mentalAge >= 40) return "👨‍💼"
    if (mentalAge >= 25) return "🧑"
    if (mentalAge >= 18) return "👨‍🎓"
    if (mentalAge >= 13) return "🧒"
    return "👶"
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* メイン結果カード */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center animate-in fade-in-50 duration-1000">
        <div className="mb-6">
          <div className="text-6xl mb-4">{getAgeEmoji(result.mentalAge)}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">診断結果</h2>
          <p className="text-gray-600">あなたの精神年齢は...</p>
        </div>

        <div className="mb-8">
          <div className={`bg-gradient-to-r ${getAgeColor(result.ageDifference)} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transition-all duration-300 hover:scale-105`}>
            <span className="text-white text-3xl font-bold">{result.mentalAge}歳</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{getAgeMessage(result.ageDifference)}</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <h4 className="text-xl font-bold text-purple-800 mb-2">{result.type}</h4>
            <p className="text-purple-700 leading-relaxed">{result.description}</p>
          </div>
        </div>

        <Button
          onClick={onShare}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      {/* 詳細比較 */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 animate-in slide-in-from-left-4 duration-700 delay-300">
        <h3 className="text-2xl font-bold text-center mb-8">年齢比較</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-xl p-4 mb-3">
              <h4 className="font-bold text-lg text-gray-700 mb-2">実年齢</h4>
              <div className="text-3xl font-bold text-gray-800">{result.realAge}歳</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              {getAgeIcon(result.ageDifference)}
            </div>
            <div className="text-lg font-bold text-gray-700">
              {result.ageDifference > 0 ? `+${result.ageDifference}歳` : 
               result.ageDifference < 0 ? `${result.ageDifference}歳` : '±0歳'}
            </div>
            <div className="text-sm text-gray-600">差</div>
          </div>
          
          <div className="text-center">
            <div className={`bg-gradient-to-r ${getAgeColor(result.ageDifference)} rounded-xl p-4 mb-3 text-white`}>
              <h4 className="font-bold text-lg mb-2">精神年齢</h4>
              <div className="text-3xl font-bold">{result.mentalAge}歳</div>
            </div>
          </div>
        </div>

        {/* 特徴リスト */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <h4 className="font-bold text-lg text-gray-800 mb-4 text-center">あなたの特徴</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {result.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{characteristic}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* アドバイスカード */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl p-8 animate-in slide-in-from-right-4 duration-700 delay-500">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-orange-800 mb-2">精神年齢活用アドバイス</h3>
        </div>
        
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-orange-700 leading-relaxed text-lg">{result.advice}</p>
        </div>
      </Card>

      {/* シェア用カード風デザイン */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl p-8 text-center">
        <div className="mb-4">
          <Trophy className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">AI精神年齢診断結果</h3>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold mb-2">{result.mentalAge}歳</div>
          <div className="text-xl font-semibold mb-3">{result.type}</div>
          <div className="text-sm">
            実年齢{result.realAge}歳との差: {result.ageDifference > 0 ? `+${result.ageDifference}歳` : 
                                           result.ageDifference < 0 ? `${result.ageDifference}歳` : '±0歳'}
          </div>
        </div>
        
        <p className="text-sm opacity-90">あなたも無料で診断してみよう！</p>
        <p className="text-xs opacity-75 mt-1">yokaunit.com</p>
      </Card>

      {/* 関連コンテンツ */}
      <Card className="bg-gray-50/80 backdrop-blur-sm border-0 shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-center">🎯 精神年齢を活かそう</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">💼 仕事・学習</h4>
            <p>精神年齢に応じたアプローチで、より効果的な成果を上げることができます。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">👥 人間関係</h4>
            <p>同世代だけでなく、精神年齢に近い人たちとの交流も楽しんでみてください。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">💕 恋愛関係</h4>
            <p>精神年齢の相性も考慮することで、より良いパートナーシップを築けるでしょう。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🎪 エンターテイメント</h4>
            <p>結果をSNSでシェアして、友達や家族と精神年齢を比較してみましょう。</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
