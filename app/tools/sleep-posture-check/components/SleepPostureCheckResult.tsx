"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Moon, Lightbulb, AlertCircle } from "lucide-react"
import type { SleepPostureResult } from "../lib/types"
import { AffiliateMakuraSection } from "./AffiliateMakuraSection"

interface SleepPostureCheckResultProps {
  result: SleepPostureResult
  onShare: () => void
}

function weekPlanByBand(band: SleepPostureResult["band"]): string[] {
  switch (band) {
    case "a":
      return [
        "Day1: 枕の高さ感をメモ（仰向け・横向き）",
        "Day2: 就寝前スマホを20分短縮",
        "Day3: 朝の首まわりの感覚を記録",
        "Day4: 首肩ストレッチを3分",
        "Day5: 寝室の温度・湿度を調整",
        "Day6: マットレスのへたりを点検",
        "Day7: 1週間の変化を振り返る",
      ]
    case "b":
      return [
        "Day1: 起床時の違和感を10段階で記録",
        "Day2: 就寝前30分は下向き姿勢を減らす",
        "Day3: 横向き時の首のすきまを確認",
        "Day4: 首肩ストレッチ5分",
        "Day5: デスク・運転の休憩タイミングを固定",
        "Day6: 枕の高さ違和感があるか再チェック",
        "Day7: 続けやすい習慣を2つ残す",
      ]
    case "c":
      return [
        "Day1: 睡眠時間と起床時の感覚を記録",
        "Day2: 枕・マットレスの組み合わせを見直す",
        "Day3: 就寝前スマホを半分に",
        "Day4: 首のケア5分＋軽い肩回し",
        "Day5: うつ伏せ時間を減らす工夫",
        "Day6: 旅行・出張時の代替枕を検討",
        "Day7: 合わない要因を1つ特定して対策",
      ]
    case "d":
      return [
        "Day1: 朝のつらさを記録して現状把握",
        "Day2: 下向き姿勢の時間を意識して削減",
        "Day3: 枕の高さと沈み込みを確認",
        "Day4: 寝室環境（温度・光・音）を調整",
        "Day5: 首肩ケアを5分だけ実施",
        "Day6: 強い症状が続くかセルフチェック",
        "Day7: 必要なら専門家相談も検討",
      ]
    default:
      return []
  }
}

function bandGradient(band: SleepPostureResult["band"]) {
  switch (band) {
    case "a":
      return "from-emerald-500 to-teal-600"
    case "b":
      return "from-sky-500 to-indigo-600"
    case "c":
      return "from-amber-500 to-orange-600"
    case "d":
      return "from-rose-500 to-fuchsia-700"
    default:
      return "from-slate-500 to-zinc-700"
  }
}

export function SleepPostureCheckResult({ result, onShare }: SleepPostureCheckResultProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
        <div className="mb-6">
          <div
            className={`bg-gradient-to-r ${bandGradient(result.band)} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <Moon className="h-10 w-10 text-white" />
          </div>
          <p className="text-sm font-semibold text-indigo-700 mb-1">あなたのタイプ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{result.typeName}</h2>
          <p className="text-sm text-gray-500">
            チェックポイント合計：{result.score} / {result.maxScore}（生活習慣・睡眠環境の見直し余地の目安）
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 mb-6 text-left">
          <p className="text-indigo-950 leading-relaxed">{result.summary}</p>
        </div>

        <Button
          type="button"
          onClick={onShare}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-3 px-8 rounded-xl"
        >
          <Share2 className="h-5 w-5 mr-2" />
          結果をシェア
        </Button>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-violet-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">次の一歩（参考）</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          {result.tips.map((tip, index) => (
            <li key={index} className="flex items-start text-left">
              <span className="text-indigo-600 font-bold mr-2">{index + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <AffiliateMakuraSection band={result.band} />

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">7日間ミニ改善プラン</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {weekPlanByBand(result.band).map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </Card>

      <Card className="bg-amber-50/90 border border-amber-200/80 p-4 flex gap-3 text-left">
        <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-950 leading-relaxed">{result.disclaimer}</p>
      </Card>
    </div>
  )
}
