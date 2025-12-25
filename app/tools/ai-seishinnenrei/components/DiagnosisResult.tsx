"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, TrendingUp, TrendingDown, Minus, Twitter, MessageCircle, Facebook, Copy, Edit2, Check, X, Sparkles, BarChart3, Heart, Zap, Target, Lightbulb } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

export function DiagnosisResult({ result, onShare }: DiagnosisResultProps) {
  const [isEditingShareText, setIsEditingShareText] = useState(false)
  const [shareText, setShareText] = useState("")
  const [copied, setCopied] = useState(false)

  const getAgeIcon = (difference: number) => {
    if (difference >= 5) return <TrendingUp className="h-4 w-4 text-blue-600" />
    if (difference <= -5) return <TrendingDown className="h-4 w-4 text-green-600" />
    return <Minus className="h-4 w-4 text-purple-600" />
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
    if (mentalAge <= 3) return "👶"
    if (mentalAge <= 7) return "🧒"
    if (mentalAge <= 12) return "👦"
    if (mentalAge <= 15) return "🧑"
    if (mentalAge <= 18) return "👨‍🎓"
    if (mentalAge <= 22) return "👨‍💼"
    if (mentalAge <= 30) return "🧑‍💼"
    if (mentalAge <= 40) return "👨"
    if (mentalAge <= 50) return "👨‍🦱"
    if (mentalAge <= 65) return "👨‍🦳"
    if (mentalAge <= 80) return "🧓"
    return "👴"
  }

  const getAgeCategory = (mentalAge: number) => {
    if (mentalAge <= 3) return "赤ちゃん"
    if (mentalAge <= 7) return "幼児"
    if (mentalAge <= 12) return "小学生"
    if (mentalAge <= 15) return "中学生"
    if (mentalAge <= 18) return "高校生"
    if (mentalAge <= 22) return "大学生"
    if (mentalAge <= 30) return "若手社会人"
    if (mentalAge <= 40) return "社会人"
    if (mentalAge <= 50) return "中年"
    if (mentalAge <= 65) return "シニア"
    if (mentalAge <= 80) return "高齢者"
    return "おじいちゃん・おばあちゃん"
  }

  const getPercentage = (mentalAge: number, realAge: number) => {
    if (realAge === 0) return 100
    return Math.round((mentalAge / realAge) * 100)
  }

  const getDetailedInsights = () => {
    const insights = []
    
    // 年齢差による詳細分析
    if (result.ageDifference >= 15) {
      insights.push({
        icon: "🎯",
        title: "超成熟タイプ",
        text: `実年齢より${Math.abs(result.ageDifference)}歳も高いあなたは、同世代の${Math.round((result.mentalAge / result.realAge) * 100)}%の成熟度を持っています。人生経験が豊富で、周囲から頼られる存在です。`
      })
    } else if (result.ageDifference >= 10) {
      insights.push({
        icon: "💼",
        title: "リーダーシップ",
        text: `実年齢より${Math.abs(result.ageDifference)}歳高いあなたは、判断力と責任感が強く、チームを引っ張る力があります。`
      })
    } else if (result.ageDifference <= -15) {
      insights.push({
        icon: "🌟",
        title: "永遠の若さ",
        text: `実年齢より${Math.abs(result.ageDifference)}歳も若いあなたは、好奇心旺盛で新しいことにチャレンジする意欲が高いです。`
      })
    } else if (result.ageDifference <= -10) {
      insights.push({
        icon: "✨",
        title: "フレッシュマインド",
        text: `実年齢より${Math.abs(result.ageDifference)}歳若いあなたは、柔軟な発想と創造力が魅力です。`
      })
    } else {
      insights.push({
        icon: "⚖️",
        title: "バランス型",
        text: `実年齢と精神年齢のバランスが取れているあなたは、安定感がありながらも柔軟性を持っています。`
      })
    }

    // 精神年齢による詳細分析
    if (result.mentalAge <= 12) {
      insights.push({
        icon: "🎈",
        title: "純粋な心",
        text: "何も考えずに今を楽しむ、そんな素直な心があなたの魅力です。周囲を明るくする力があります。"
      })
    } else if (result.mentalAge <= 18) {
      insights.push({
        icon: "🚀",
        title: "成長期",
        text: "まだまだ成長途中で、いろんなことに興味津々！新しい発見を楽しみながら、自分らしさを見つけていきましょう。"
      })
    } else if (result.mentalAge <= 30) {
      insights.push({
        icon: "💪",
        title: "チャレンジ精神",
        text: "何でもチャレンジしてみたい、そんな前向きな心があなたの強みです。失敗を恐れず、どんどん挑戦してください。"
      })
    } else if (result.mentalAge <= 50) {
      insights.push({
        icon: "🎓",
        title: "経験豊富",
        text: "豊富な経験と知識で、周囲の人たちをサポートできる存在です。あなたの知恵を活かしてください。"
      })
    } else {
      insights.push({
        icon: "🏆",
        title: "人生の達人",
        text: "長年の経験から得た深い知恵で、周囲の人たちを導く存在です。あなたのアドバイスは多くの人を助けます。"
      })
    }

    return insights
  }

  const getDefaultShareText = () => {
    const diff = Math.abs(result.ageDifference)
    let message = ""
    
    if (result.ageDifference >= 10) {
      message = `実年齢${result.realAge}歳なのに精神年齢${result.mentalAge}歳！${diff}歳も大人びてるって言われた😅`
    } else if (result.ageDifference >= 5) {
      message = `精神年齢診断したら${result.mentalAge}歳だった！実年齢より${diff}歳高いってことは、結構大人びてるってことかな？`
    } else if (result.ageDifference <= -10) {
      message = `精神年齢${result.mentalAge}歳だった！実年齢${result.realAge}歳より${diff}歳も若いって、めっちゃ若々しいってこと？笑`
    } else if (result.ageDifference <= -5) {
      message = `精神年齢${result.mentalAge}歳！実年齢より${diff}歳若いって、まだまだ若いってことだよね😊`
    } else {
      message = `精神年齢${result.mentalAge}歳だった！実年齢${result.realAge}歳とほぼ同じで、バランス取れてる感じ`
    }
    
    return `${message}\n\n${result.type}タイプで、${result.characteristics.slice(0, 2).join('と')}が特徴らしい。\n\nみんなも診断してみて！\n${window.location.href}\n\n#AI精神年齢診断 #精神年齢診断 #心理年齢 #yokaunit`
  }

  const handleShareClick = () => {
    if (!isEditingShareText) {
      setShareText(getDefaultShareText())
      setIsEditingShareText(true)
    }
  }

  const handleCopyText = () => {
    const textToCopy = shareText || getDefaultShareText()
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    const text = shareText || getDefaultShareText()
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI精神年齢診断結果",
          text: text,
          url: url,
        })
      } catch (error) {
        // ユーザーがキャンセルした場合などはエラーを無視
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error)
        }
      }
    } else {
      // フォールバック: クリップボードにコピー
      handleCopyText()
    }
  }

  const handleTwitterShare = () => {
    const text = shareText || getDefaultShareText()
    const tweetText = encodeURIComponent(text)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
  }

  const handleLineShare = () => {
    const text = shareText || getDefaultShareText()
    const url = encodeURIComponent(window.location.href)
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const percentage = getPercentage(result.mentalAge, result.realAge)
  const ageCategory = getAgeCategory(result.mentalAge)
  const insights = getDetailedInsights()

  return (
    <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 px-3 sm:px-4 py-3 sm:py-4">
      {/* メイン結果カード */}
      <Card className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 text-center">
        <div className="mb-4 sm:mb-5">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">✨ 診断結果 ✨</p>
          <div className="text-5xl sm:text-6xl mb-2 sm:mb-3">{getAgeEmoji(result.mentalAge)}</div>
          <div className={`bg-gradient-to-r ${getAgeColor(result.ageDifference)} w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto shadow-xl mb-2 sm:mb-3 transform transition-transform hover:scale-110`}>
            <span className="text-white text-3xl sm:text-4xl font-bold">{result.mentalAge}歳</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">{getAgeMessage(result.ageDifference)}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">{result.type}</p>
          <div className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            {ageCategory}レベル
          </div>
        </div>

        {/* 年齢比較 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 transform transition-transform hover:scale-105">
            <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">実年齢</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{result.realAge}歳</p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-0.5 sm:mb-1">{getAgeIcon(result.ageDifference)}</div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900">
              {result.ageDifference > 0 ? `+${result.ageDifference}歳` : result.ageDifference < 0 ? `${result.ageDifference}歳` : "±0歳"}
            </p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 transform transition-transform hover:scale-105">
            <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">精神年齢</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{result.mentalAge}歳</p>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="rounded-lg bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-4 mb-4 sm:mb-5 border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
            <p className="text-xs font-semibold text-purple-700">詳細分析</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
            <div className="bg-white rounded-lg p-2">
              <p className="text-gray-500 mb-0.5 sm:mb-1 text-xs">実年齢比</p>
              <p className="text-base sm:text-lg font-bold text-purple-600">{percentage}%</p>
            </div>
            <div className="bg-white rounded-lg p-2">
              <p className="text-gray-500 mb-0.5 sm:mb-1 text-xs">年齢カテゴリ</p>
              <p className="text-xs sm:text-sm font-bold text-purple-600">{ageCategory}</p>
            </div>
          </div>
        </div>

        {/* AI分析の詳細 */}
        {result.aiAnalysis && (
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 mb-4 sm:mb-5 border border-blue-100">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
              <p className="text-xs font-semibold text-blue-700">AI分析結果</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-white rounded-lg p-2">
                <p className="text-gray-500 mb-0.5 sm:mb-1 text-xs">分析信頼度</p>
                <p className="text-base sm:text-lg font-bold text-blue-600">{result.aiAnalysis.confidence}%</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-gray-500 mb-0.5 sm:mb-1 text-xs">感情スコア</p>
                <p className="text-xs sm:text-sm font-bold text-blue-600">
                  {Math.round(result.aiAnalysis.sentimentScore * 100)}%
                  {result.aiAnalysis.sentimentScore > 0.6 ? ' (ポジティブ)' : result.aiAnalysis.sentimentScore < 0.4 ? ' (ネガティブ)' : ' (ニュートラル)'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3">
                <p className="text-gray-500 mb-1 text-xs">パターン分析</p>
                <p className="text-xs text-gray-700 leading-relaxed">{result.aiAnalysis.patternAnalysis}</p>
              </div>
              {result.aiAnalysis.personalityTraits.length > 0 && (
                <div className="bg-white rounded-lg p-2">
                  <p className="text-gray-500 mb-1 text-xs">AIが検出した性格特性</p>
                  <div className="flex flex-wrap gap-1">
                    {result.aiAnalysis.personalityTraits.map((trait, index) => (
                      <span key={index} className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 詳細インサイト */}
        <div className="space-y-3 mb-5">
          {insights.map((insight, index) => (
            <div key={index} className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{insight.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{insight.title}</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{insight.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 説明 */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 mb-5 border border-blue-100">
          <div className="flex items-start gap-2">
            <Heart className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed text-left">{result.description}</p>
          </div>
        </div>

        {/* 特徴 */}
        {result.characteristics.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-yellow-500" />
              <p className="text-sm font-semibold text-gray-800">あなたの特徴</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.characteristics.map((characteristic, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium shadow-sm transform transition-transform hover:scale-105">
                  ✨ {characteristic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* シェア機能 */}
        <div className="space-y-3">
          {!isEditingShareText ? (
            <Button
              onClick={handleShareClick}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg text-base shadow-md hover:shadow-lg transition-all"
            >
              <Share2 className="h-4 w-4 mr-2" />
              結果をシェア
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <Edit2 className="h-3 w-3" />
                    シェアテキストを編集
                  </label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setIsEditingShareText(false)
                        setShareText("")
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <X className="h-3 w-3 text-gray-500" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  className="w-full h-24 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder={getDefaultShareText()}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{shareText.length}文字</span>
                  <button
                    onClick={handleCopyText}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">コピーしました</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>コピー</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={handleTwitterShare}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-xs shadow-sm hover:shadow transition-all"
            >
              <Twitter className="h-3 w-3 mr-1" />
              Twitter
            </Button>
            <Button
              onClick={handleLineShare}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg text-xs shadow-sm hover:shadow transition-all"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              LINE
            </Button>
            <Button
              onClick={handleFacebookShare}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs shadow-sm hover:shadow transition-all"
            >
              <Facebook className="h-3 w-3 mr-1" />
              Facebook
            </Button>
          </div>

          {/* デバイスの共有機能 */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-2 rounded-lg text-sm shadow-sm hover:shadow transition-all"
            >
              <Share2 className="h-4 w-4 mr-2" />
              デバイスで共有
            </Button>
          )}
        </div>
      </Card>

      {/* アドバイスカード */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-100 shadow-sm rounded-xl p-5 animate-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-orange-800 mb-2">💡 精神年齢活用アドバイス</h3>
            <p className="text-sm text-orange-700 leading-relaxed">{result.advice}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

