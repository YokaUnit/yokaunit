"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ListOrdered, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react"

type AnswerOption = { id: string; label: string }
type Question = { id: string; text: string; options: AnswerOption[] }

type RoutineFocus = "simple" | "acne" | "pore" | "dry" | "antiaging"

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "今いちばん優先したい悩みは？",
    options: [
      { id: "a", label: "時間がないので、最短で整えたい" },
      { id: "b", label: "ニキビ・肌荒れを落ち着かせたい" },
      { id: "c", label: "毛穴（黒ずみ/開き）を目立ちにくくしたい" },
      { id: "d", label: "乾燥・つっぱりを改善したい" },
    ],
  },
  {
    id: "q2",
    text: "肌の状態に近いのは？",
    options: [
      { id: "a", label: "テカりやすい/皮脂が多い" },
      { id: "b", label: "乾燥しやすい/粉っぽい" },
      { id: "c", label: "敏感でヒリつきやすい" },
      { id: "d", label: "普通〜混合で、日によって変わる" },
    ],
  },
  {
    id: "q3",
    text: "メイクはしますか？",
    options: [
      { id: "a", label: "ほぼ毎日する" },
      { id: "b", label: "週に数回" },
      { id: "c", label: "ほとんどしない" },
      { id: "d", label: "日焼け止めだけが多い" },
    ],
  },
  {
    id: "q4",
    text: "朝のスキンケアにかけられる時間は？",
    options: [
      { id: "a", label: "1〜2分" },
      { id: "b", label: "3〜5分" },
      { id: "c", label: "5〜8分" },
      { id: "d", label: "その日による" },
    ],
  },
  {
    id: "q5",
    text: "夜のスキンケアはどれが理想？",
    options: [
      { id: "a", label: "シンプルに整える" },
      { id: "b", label: "週1〜2回はスペシャルケアを入れたい" },
      { id: "c", label: "攻めのケア（レチノール等）も試したい" },
      { id: "d", label: "肌が揺らぐので刺激は避けたい" },
    ],
  },
]

function decideFocus(answers: Record<string, string | undefined>): RoutineFocus | null {
  if (Object.values(answers).filter(Boolean).length !== QUESTIONS.length) return null
  const first = answers.q1
  if (first === "a") return "simple"
  if (first === "b") return "acne"
  if (first === "c") return "pore"
  if (first === "d") return "dry"
  return "simple"
}

function focusLabel(f: RoutineFocus) {
  switch (f) {
    case "simple":
      return "時短・ミニマルルーティン"
    case "acne":
      return "ニキビケア重視ルーティン"
    case "pore":
      return "毛穴ケア重視ルーティン"
    case "dry":
      return "保湿・バリア強化ルーティン"
    case "antiaging":
      return "ハリ・エイジングケアルーティン"
  }
}

function routine(f: RoutineFocus, makeupOften: boolean) {
  const morningBase = [
    { title: "洗顔", note: "皮脂が多い日は洗顔料、乾燥日はぬるま湯中心でもOK" },
    { title: "化粧水", note: "1〜2回重ねて“吸いつく”感覚まで" },
    { title: "保湿（乳液/クリーム）", note: "ベタつく日は薄く、乾燥日はしっかり" },
    { title: "日焼け止め", note: "毎日。頬・鼻・フェイスラインまで" },
  ]
  const nightBase = [
    { title: "クレンジング", note: makeupOften ? "メイクをする日は必須。こすらず30〜40秒" : "日焼け止めだけの日も軽めでOK" },
    { title: "洗顔", note: "泡で30秒。つっぱる場合は洗いすぎ注意" },
    { title: "化粧水", note: "摩擦なく手で押し込む" },
    { title: "保湿（クリーム）", note: "乾燥しやすい部分は重ね塗り" },
  ]

  const boosters =
    f === "acne"
      ? [{ title: "ニキビケア美容液", note: "ビタミンC/ナイアシンアミドなどを一点投入（刺激が出たら中止）" }]
      : f === "pore"
        ? [{ title: "毛穴美容液", note: "ビタミンCや皮脂バランス系をTゾーン中心に" }]
        : f === "dry"
          ? [{ title: "バリア保湿", note: "セラミド/パンテノールなど“守り”を優先" }]
          : []

  const weekly =
    f === "simple"
      ? []
      : [{ title: "週1〜2回のスペシャル", note: "酵素洗顔/マイルドピーリング/集中保湿のいずれかを“やりすぎない”範囲で" }]

  return {
    morning: [...morningBase],
    night: [...nightBase, ...boosters],
    weekly,
  }
}

export function SkincareRoutineDiagnosisClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers])
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100)
  const focus = useMemo(() => decideFocus(answers), [answers])

  const select = (qid: string, oid: string) => setAnswers((p) => ({ ...p, [qid]: oid }))
  const next = () => {
    if (!answers[currentQuestion.id]) return
    if (currentIndex < QUESTIONS.length - 1) setCurrentIndex((p) => p + 1)
    else if (focus) setShowResult(true)
  }
  const prev = () => currentIndex > 0 && setCurrentIndex((p) => p - 1)
  const reset = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShowResult(false)
  }

  const makeupOften = answers.q3 === "a" || answers.q3 === "b"
  const resultRoutine = focus ? routine(focus, makeupOften) : null

  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 space-y-3">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-white border border-rose-100 aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <ListOrdered className="h-5 w-5 text-rose-500" />
                    <p className="text-sm font-semibold text-gray-900">スキンケアルーティン診断</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <ListOrdered className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Routine Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  スキンケアルーティン診断（無料）で、朝/夜の順番を整える
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  肌状態・悩み・時間に合わせて、必要なステップと優先順位を提案します。所要時間は約1〜2分です。
                </p>
              </div>
            </div>

            <Card className="bg-white border-gray-100 shadow-md">
              {!showResult ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <CardTitle className="text-sm md:text-base text-gray-900">
                        Q{currentIndex + 1} / {QUESTIONS.length}
                      </CardTitle>
                      <span className="text-[11px] text-gray-500">
                        回答済み {answeredCount} / {QUESTIONS.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-100" />
                    <p className="mt-2 text-[11px] text-gray-500">Webで完結・登録不要。気軽にチェックできます。</p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <p className="text-sm md:text-base font-semibold text-gray-900 mb-4 text-center">
                        {currentQuestion.text}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {currentQuestion.options.map((o) => {
                          const selected = answers[currentQuestion.id] === o.id
                          return (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => select(currentQuestion.id, o.id)}
                              className={`w-full text-left rounded-xl border px-3 py-3 text-sm md:text-[15px] transition-all duration-200 ${
                                selected
                                  ? "border-rose-400 bg-rose-50 text-gray-900 shadow-sm ring-1 ring-rose-100"
                                  : "border-gray-200 bg-white hover:bg-rose-50/40 text-gray-800"
                              }`}
                              aria-pressed={selected}
                            >
                              {o.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full md:w-auto"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        まえへ
                      </Button>

                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={reset}
                          className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          最初から
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={next}
                          disabled={!answers[currentQuestion.id]}
                          className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto"
                        >
                          {currentIndex === QUESTIONS.length - 1 ? "結果を見る" : "つぎへ"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : focus && resultRoutine ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                          <ListOrdered className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg text-gray-900">ルーティン診断の結果</CardTitle>
                      </div>
                      <Badge className="bg-rose-500 text-white text-xs">無料診断</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">
                      回答内容にもとづく提案です。肌状態が不安定なときは無理せず低刺激から始めてください。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-4 md:px-5 md:py-5">
                      <p className="text-xs font-semibold text-rose-500 mb-1">あなたにおすすめの方向性</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">{focusLabel(focus)}</p>
                      <p className="text-xs md:text-sm text-gray-700">
                        「やることを増やす」より、順番と優先順位を揃えると肌は安定しやすいです。
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                        <p className="text-xs font-semibold text-gray-900 mb-2">朝ルーティン</p>
                        <ul className="space-y-2">
                          {resultRoutine.morning.map((s) => (
                            <li key={s.title} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-rose-500" />
                              <div>
                                <p className="font-semibold text-gray-900">{s.title}</p>
                                <p className="text-[11px] text-gray-600 leading-relaxed">{s.note}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                        <p className="text-xs font-semibold text-gray-900 mb-2">夜ルーティン</p>
                        <ul className="space-y-2">
                          {resultRoutine.night.map((s) => (
                            <li key={s.title} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-rose-500" />
                              <div>
                                <p className="font-semibold text-gray-900">{s.title}</p>
                                <p className="text-[11px] text-gray-600 leading-relaxed">{s.note}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {resultRoutine.weekly.length > 0 && (
                      <div className="rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3">
                        <p className="text-xs font-semibold text-rose-600 mb-2">週1〜2回（やりすぎ注意）</p>
                        <ul className="space-y-2">
                          {resultRoutine.weekly.map((s) => (
                            <li key={s.title} className="text-xs md:text-sm text-gray-800 leading-relaxed">
                              <span className="font-semibold text-gray-900">{s.title}：</span> {s.note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-gray-100">
                      <div className="text-[11px] md:text-xs text-gray-500">
                        次は「続く形」に整えて、迷わないルーティンへ。
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto"
                        >
                          <Link href="/beauty/articles/skincare-routine">解説記事を読む</Link>
                        </Button>
                        <Button type="button" size="sm" onClick={reset} className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">
                          もう一度診断する
                        </Button>
                        <Button asChild variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto">
                          <Link href="/beauty">YokaUnit Beauty トップへ</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="py-8 text-center text-sm text-gray-700">
                  集計中にエラーが発生しました。最初からやり直してください。
                  <div className="mt-4">
                    <Button type="button" variant="outline" size="sm" onClick={reset} className="text-gray-700 border-gray-200 hover:bg-gray-50">
                      最初からやり直す
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* 診断ページ内の解説（SEO本文） */}
            <section className="mt-10 md:mt-12">
              <div className="rounded-3xl border border-gray-100 bg-white/85 backdrop-blur-[2px] p-5 md:p-7 shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-rose-500 mb-2">GUIDE</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  スキンケアルーティン診断の見方と、最短で整える手順
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  ルーティンは「足し算」より「順番」と「優先順位」。まずは“毎日続く形”に整えるのが、肌を安定させる最短ルートです。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">毎日：外さない4つ</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-800 space-y-2 leading-relaxed">
                      <li>夜のクレンジング（必要な日だけでOK）</li>
                      <li>洗顔（泡で短時間、落としすぎない）</li>
                      <li>保湿（化粧水→乳液/クリーム）</li>
                      <li>UV（毎日）</li>
                    </ol>
                  </div>
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">週1〜2回：入れるなら</h3>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      酵素洗顔/マイルドピーリング/集中保湿のどれか1つ。やりすぎると逆効果になりやすいので、頻度は控えめが正解です。
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-2">
                  <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">
                    <Link href="/beauty/articles/skincare-routine">ルーティン解説記事を読む</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full md:w-auto border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Link href="/beauty/articles">解説記事一覧へ</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

