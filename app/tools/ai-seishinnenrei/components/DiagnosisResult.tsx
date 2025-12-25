"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, TrendingUp, TrendingDown, Minus, Trophy, Lightbulb, Star, Twitter, MessageCircle } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

export function DiagnosisResult({ result, onShare }: DiagnosisResultProps) {
  const getAgeIcon = (difference: number) => {
    if (difference >= 5) return <TrendingUp className="h-5 w-5 text-blue-600" />
    if (difference <= -5) return <TrendingDown className="h-5 w-5 text-green-600" />
    return <Minus className="h-5 w-5 text-purple-600" />
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
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6 animate-in slide-in-from-bottom-4 duration-700">
      <Card className="bg-white/95 backdrop-blur-sm border border-purple-100 shadow-md rounded-2xl p-5 sm:p-6 md:p-8 text-center">
        <div className="mb-6">
          <div className="text-5xl md:text-6xl mb-4">{getAgeEmoji(result.mentalAge)}</div>
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">診断結果</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{getAgeMessage(result.ageDifference)}</h2>
          <p className="text-sm text-gray-600 mt-1">実年齢{result.realAge}歳との比較から判定しました。</p>
        </div>

        <div className="mb-6 md:mb-7">
          <div className="space-y-2 sm:space-y-3">
            <div className={`bg-gradient-to-r ${getAgeColor(result.ageDifference)} w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform duration-300 hover:scale-105`}>
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">{result.mentalAge}歳</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-purple-700 px-2">{result.type}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5">
            <div className="rounded-lg border border-gray-200 bg-white p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] text-gray-500 mb-1">実年齢</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{result.realAge}歳</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-2.5 sm:p-3">
              <div className="flex items-center justify-center mb-1">{getAgeIcon(result.ageDifference)}</div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {result.ageDifference > 0 ? `+${result.ageDifference}歳` : result.ageDifference < 0 ? `${result.ageDifference}歳` : "±0歳"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] text-gray-500 mb-1">ポイント</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">{getAgeMessage(result.ageDifference)}</p>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 mt-4">
            <p className="text-xs sm:text-sm text-purple-700 leading-relaxed">{result.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onShare}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 md:py-5 rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation min-h-[56px]"
          >
            <Share2 className="h-5 w-5 mr-2" />
            結果をシェア
          </Button>
          
          {/* SNSシェアボタン */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => {
                const text = `【AI精神年齢診断結果】私の精神年齢は${result.mentalAge}歳でした！実年齢${result.realAge}歳との差は${result.ageDifference > 0 ? '+' : ''}${result.ageDifference}歳です。${result.type}タイプでした✨`
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
                const text = `【AI精神年齢診断結果】私の精神年齢は${result.mentalAge}歳でした！実年齢${result.realAge}歳との差は${result.ageDifference > 0 ? '+' : ''}${result.ageDifference}歳です。${result.type}タイプでした✨`
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
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/95 border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">年齢比較と特徴</h3>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-[11px] text-gray-500">実年齢</p>
              <p className="text-lg font-bold text-gray-900">{result.realAge}歳</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-[11px] text-gray-500">差</p>
              <p className="text-sm font-semibold text-gray-900">
                {result.ageDifference > 0 ? `+${result.ageDifference}歳` : result.ageDifference < 0 ? `${result.ageDifference}歳` : "±0歳"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-[11px] text-gray-500">ポイント</p>
              <p className="text-sm font-semibold text-gray-900">{getAgeMessage(result.ageDifference)}</p>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-800 text-center">あなたの特徴</p>
            <div className="space-y-2">
              {result.characteristics.map((characteristic, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700 leading-snug">{characteristic}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-100 shadow-sm rounded-2xl p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-orange-800">精神年齢活用アドバイス</h3>
                <p className="text-sm text-orange-700 leading-relaxed">{result.advice}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-md rounded-2xl p-5 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <div className="bg-white/20 rounded-xl p-4 mb-3">
              <p className="text-2xl font-bold mb-1">{result.mentalAge}歳</p>
              <p className="text-base font-semibold mb-1">{result.type}</p>
              <p className="text-xs">
                実年齢{result.realAge}歳との差: {result.ageDifference > 0 ? `+${result.ageDifference}歳` : result.ageDifference < 0 ? `${result.ageDifference}歳` : "±0歳"}
              </p>
            </div>
            <p className="text-xs opacity-90">結果をシェアして友達と比較しよう！</p>
            <p className="text-[11px] opacity-75 mt-1">yokaunit.com</p>
          </Card>

          <Card className="bg-gray-50/90 border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3 text-center">精神年齢の活かし方ヒント</h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>・仕事／学習で強みを活かし、柔軟に他者と協働しましょう。</li>
              <li>・人間関係では精神年齢が近い人との対話が安心感につながります。</li>
              <li>・恋愛では互いの成熟度を意識し、歩幅を合わせると長続きします。</li>
              <li>・SNSで結果をシェアして、周りの人と違いを楽しみましょう。</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
