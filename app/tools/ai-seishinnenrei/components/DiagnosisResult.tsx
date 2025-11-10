"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, TrendingUp, TrendingDown, Minus, Trophy, Lightbulb, Star, ArrowRight } from "lucide-react"
import type { DiagnosisResult as DiagnosisResultType } from "../lib/types"

interface DiagnosisResultProps {
  result: DiagnosisResultType
  onShare: () => void
}

type RecommendationCategory = "mature" | "balanced" | "youthful"

interface ToolRecommendation {
  id: string
  title: string
  description: string
  href: string
  badge: string
  categories: RecommendationCategory[]
}

const RECOMMENDATION_CATALOG: ToolRecommendation[] = [
  {
    id: "ai-stress-check",
    title: "AIストレス診断",
    description: "AIがあなたのストレス耐性と回復力を分析し、具体的なケア方法を提案します。",
    href: "/tools/ai-stress-check",
    badge: "メンタルケア",
    categories: ["mature", "balanced"],
  },
  {
    id: "stress-check",
    title: "ストレスチェック（10問）",
    description: "厚労省推奨の設問をベースに、今の疲れ具合とリスクをサクッと確認できます。",
    href: "/tools/stress-check",
    badge: "セルフチェック",
    categories: ["mature"],
  },
  {
    id: "ai-1kanzi",
    title: "AIが選ぶ性格を表す漢字1文字",
    description: "５つの質問から、あなたの性格をズバリ漢字1文字で表現。自己理解が深まります。",
    href: "/tools/ai-1kanzi",
    badge: "自己洞察",
    categories: ["youthful", "balanced"],
  },
  {
    id: "ai-mote",
    title: "AIモテ診断",
    description: "あなたの魅力度やコミュ力をAIが分析。恋愛や人間関係のヒントが見つかります。",
    href: "/tools/ai-mote",
    badge: "魅力度診断",
    categories: ["youthful", "balanced"],
  },
  {
    id: "fortune-today",
    title: "AI今日の運勢診断",
    description: "その日の運勢と開運アクションをAIが生成。気分転換やルーティン作りに最適です。",
    href: "/tools/fortune-today",
    badge: "デイリー運勢",
    categories: ["balanced", "youthful"],
  },
]

const getRecommendationCategory = (difference: number): RecommendationCategory => {
  if (difference >= 5) return "mature"
  if (difference <= -5) return "youthful"
  return "balanced"
}

const getRecommendationMessage = (category: RecommendationCategory) => {
  switch (category) {
    case "mature":
      return "落ち着いた視点と経験値を活かせるセルフケア系の診断をピックアップしました。"
    case "youthful":
      return "柔軟で軽やかな感性に合わせて、楽しみながら自己理解が深まる診断をご紹介します。"
    default:
      return "バランスの取れたあなたに、日常をアップデートできる人気診断をセレクトしました。"
  }
}

const getRecommendations = (category: RecommendationCategory): ToolRecommendation[] => {
  const priorityOrder: RecommendationCategory[] =
    category === "mature"
      ? ["mature", "balanced", "youthful"]
      : category === "youthful"
        ? ["youthful", "balanced", "mature"]
        : ["balanced", "mature", "youthful"]

  const selected: ToolRecommendation[] = []

  for (const priority of priorityOrder) {
    RECOMMENDATION_CATALOG.forEach((item) => {
      if (selected.length >= 3) return
      if (item.categories.includes(priority) && !selected.some((s) => s.id === item.id)) {
        selected.push(item)
      }
    })
    if (selected.length >= 3) break
  }

  return selected
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

  const recommendationCategory = getRecommendationCategory(result.ageDifference)
  const recommendations = getRecommendations(recommendationCategory)

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-4 sm:px-6 animate-in slide-in-from-bottom-4 duration-700">
      <Card className="bg-white/95 backdrop-blur-sm border border-purple-100 shadow-md rounded-2xl p-6 md:p-8 text-center">
        <div className="mb-6">
          <div className="text-5xl md:text-6xl mb-4">{getAgeEmoji(result.mentalAge)}</div>
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">診断結果</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{getAgeMessage(result.ageDifference)}</h2>
          <p className="text-sm text-gray-600 mt-1">実年齢{result.realAge}歳との比較から判定しました。</p>
        </div>

        <div className="mb-6 md:mb-7">
          <div className="space-y-2">
            <div className={`bg-gradient-to-r ${getAgeColor(result.ageDifference)} w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform duration-300 hover:scale-105`}>
              <span className="text-white text-3xl md:text-4xl font-bold">{result.mentalAge}歳</span>
            </div>
            <p className="text-sm font-semibold text-purple-700">{result.type}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-[11px] text-gray-500">実年齢</p>
              <p className="text-lg font-bold text-gray-900">{result.realAge}歳</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-center justify-center mb-1">{getAgeIcon(result.ageDifference)}</div>
              <p className="text-sm font-semibold text-gray-900">
                {result.ageDifference > 0 ? `+${result.ageDifference}歳` : result.ageDifference < 0 ? `${result.ageDifference}歳` : "±0歳"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-[11px] text-gray-500">ポイント</p>
              <p className="text-sm font-semibold text-gray-900">{getAgeMessage(result.ageDifference)}</p>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 mt-4">
            <p className="text-sm text-purple-700 leading-relaxed">{result.description}</p>
          </div>
        </div>

        <Button
          onClick={onShare}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 md:py-4 rounded-xl text-base md:text-lg"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 via-white to-blue-50 border border-purple-100 shadow-sm rounded-2xl p-5 md:p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">今のあなたにおすすめの診断ツール</h3>
          <p className="text-sm text-gray-600 mt-1">{getRecommendationMessage(recommendationCategory)}</p>
        </div>
        <div className="grid gap-3 md:gap-4 md:grid-cols-3">
          {recommendations.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <div className="h-full rounded-xl border border-purple-100 bg-white/85 p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="border-purple-200 text-xs font-semibold text-purple-700">
                    {item.badge}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-purple-300 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <h4 className="mb-1.5 text-sm font-bold text-gray-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </Link>
          ))}
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
