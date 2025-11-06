"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Lightbulb, Star, RotateCcw } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
  onReset: () => void
}

export function DiagnosisResult({ result, onShare, onReset }: DiagnosisResultProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* メイン結果カード */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-6 sm:p-8 text-center animate-in fade-in-50 duration-1000">
        <div className="mb-6">
          <div className="text-6xl sm:text-8xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {result.kanji}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">診断結果</h2>
          <p className="text-sm sm:text-base text-gray-600">あなたの性格を表す漢字は...</p>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-800 mb-3">{result.kanji}の性格</h3>
            <p className="text-purple-700 leading-relaxed mb-4">{result.reason}</p>
            <p className="text-gray-700 leading-relaxed">{result.description}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onShare}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg min-h-[44px] touch-manipulation w-full sm:w-auto"
          >
            <Share2 className="h-5 w-5 mr-2" />
            結果をシェア
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-bold py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg min-h-[44px] touch-manipulation w-full sm:w-auto"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            もう一度診断
          </Button>
        </div>
      </Card>

      {/* 特徴リスト */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-6 sm:p-8 animate-in slide-in-from-left-4 duration-700 delay-300">
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">あなたの特徴</h3>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {result.characteristics.map((characteristic, index) => (
            <div key={index} className="flex items-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 shadow-sm">
              <Star className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
              <span className="text-base font-medium text-gray-700">{characteristic}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* アドバイスカード */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl p-6 sm:p-8 animate-in slide-in-from-right-4 duration-700 delay-500">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-orange-800 mb-2">この性格を活かすには</h3>
        </div>
        
        <div className="bg-white/70 rounded-xl p-4 sm:p-6">
          <p className="text-orange-700 leading-relaxed text-base sm:text-lg">
            「{result.kanji}」という漢字が表すように、あなたは{result.reason}。
            この個性を活かして、自分らしい人生を歩んでいきましょう。周囲の人々も、あなたの「{result.kanji}」の魅力に気づいているはずです。
          </p>
        </div>
      </Card>

      {/* シェア用カード風デザイン */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl p-6 sm:p-8 text-center">
        <div className="mb-4">
          <div className="text-5xl sm:text-7xl font-bold mb-3">{result.kanji}</div>
          <h3 className="text-lg sm:text-2xl font-bold mb-2">AIが診断！あなたの性格を漢字1文字で表すと？</h3>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 mb-6">
          <div className="text-lg font-semibold mb-3">{result.reason}</div>
          <div className="text-sm opacity-90">
            {result.description}
          </div>
        </div>
        
        <p className="text-sm opacity-90">あなたも無料で診断してみよう！</p>
        <p className="text-xs opacity-75 mt-1">yokaunit.com/tools/ai-1kanzi</p>
      </Card>

      {/* 関連コンテンツ */}
      <Card className="bg-gray-50/80 backdrop-blur-sm border-0 shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-center">🎯 漢字診断について</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">📝 診断方法</h4>
            <p>5つの選択式質問に答えるだけで、AIがあなたの性格を分析し、最も適した漢字1文字を選びます。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🤝 シェアしよう</h4>
            <p>結果をSNSでシェアして、友達や家族と漢字を比較してみましょう。同じ漢字の人もいるかもしれません！</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

