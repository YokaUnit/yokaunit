"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

type AnswerOption = {
  id: string
  label: string
}

type Question = {
  id: string
  text: string
  options: AnswerOption[]
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "一番気になる毛穴の悩みに近いものは？",
    options: [
      { id: "a", label: "鼻の黒いポツポツが目立つ" },
      { id: "b", label: "頬や小鼻の毛穴がぽっかり開いて見える" },
      { id: "c", label: "ほほの毛穴がタテに伸びて、たるんで見える" },
      { id: "d", label: "白い角栓やザラつきが気になる" },
    ],
  },
  {
    id: "q2",
    text: "顔を横から見たとき、毛穴はどう見えますか？",
    options: [
      { id: "a", label: "黒い点々が多い" },
      { id: "b", label: "丸い穴がポツポツと目立つ" },
      { id: "c", label: "下方向にしずんだような、しずく型に見える" },
      { id: "d", label: "白っぽいポツポツやザラザラが多い" },
    ],
  },
  {
    id: "q3",
    text: "メイクをしたときの毛穴の目立ち方は？",
    options: [
      { id: "a", label: "黒い点々が透けて見える" },
      { id: "b", label: "ファンデが毛穴に入って「点々」になる" },
      { id: "c", label: "ほおの毛穴にそってファンデがヨレる" },
      { id: "d", label: "時間が経つとザラつきが浮いてくる" },
    ],
  },
  {
    id: "q4",
    text: "指でそっと触れたときの感触は？",
    options: [
      { id: "a", label: "ざらざら・ぶつぶつしている" },
      { id: "b", label: "つるっとしているが、穴の周りが少し硬い" },
      { id: "c", label: "やわらかく、全体的にハリが足りない感じ" },
      { id: "d", label: "小さなつぶつぶがまとまっている" },
    ],
  },
  {
    id: "q5",
    text: "Tゾーン（おでこ・鼻）の皮脂状態は？",
    options: [
      { id: "a", label: "テカりやすく、あぶらとり紙をよく使う" },
      { id: "b", label: "日によってテカるときとそうでないときがある" },
      { id: "c", label: "それほどテカりは気にならない" },
      { id: "d", label: "テカるというより、ゴワつきが気になる" },
    ],
  },
  {
    id: "q6",
    text: "最近の肌状態として近いものは？",
    options: [
      { id: "a", label: "洗顔直後はマシだが、すぐに黒ずみが気になる" },
      { id: "b", label: "毛穴が前より大きくなってきた気がする" },
      { id: "c", label: "ほおのたるみや輪郭のゆるみも気になる" },
      { id: "d", label: "ゴワつき・乾燥と毛穴の両方が気になる" },
    ],
  },
  {
    id: "q7",
    text: "スキンケア・クレンジングの傾向は？",
    options: [
      { id: "a", label: "オイルクレンジングや毛穴パックをよく使う" },
      { id: "b", label: "さっぱり系の洗顔・収れん化粧水が好き" },
      { id: "c", label: "保湿やエイジングケア重視で選んでいる" },
      { id: "d", label: "あまりこだわりはなく、なんとなくで選んでいる" },
    ],
  },
]

type PoreType = "blackhead" | "open" | "sagging" | "clogged"

type DiagnosisResult = {
  type: PoreType
}

const SCORING_TABLE: Record<string, Partial<Record<string, Partial<Record<PoreType, number>>>>> = {
  q1: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q2: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q3: {
    a: { blackhead: 2 },
    b: { open: 2 },
    c: { sagging: 2 },
    d: { clogged: 2 },
  },
  q4: {
    a: { blackhead: 1, clogged: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 2 },
  },
  q5: {
    a: { blackhead: 1, open: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 1 },
  },
  q6: {
    a: { blackhead: 1 },
    b: { open: 1 },
    c: { sagging: 2 },
    d: { clogged: 1 },
  },
  q7: {
    a: { blackhead: 1 },
    b: { open: 1 },
    c: { sagging: 1 },
    d: { clogged: 1 },
  },
}

function calculateDiagnosis(answers: Record<string, string | undefined>): DiagnosisResult | null {
  const answeredCount = Object.values(answers).filter(Boolean).length
  if (answeredCount !== QUESTIONS.length) return null

  const scores: Record<PoreType, number> = {
    blackhead: 0,
    open: 0,
    sagging: 0,
    clogged: 0,
  }

  for (const q of QUESTIONS) {
    const selected = answers[q.id]
    if (!selected) continue
    const row = SCORING_TABLE[q.id]?.[selected]
    if (!row) continue

    for (const key of Object.keys(row) as PoreType[]) {
      scores[key] += row[key] ?? 0
    }
  }

  const type = (Object.keys(scores) as PoreType[]).reduce((best, current) =>
    scores[current] > scores[best] ? current : best,
  )

  return { type }
}

function getTypeLabel(type: PoreType): string {
  switch (type) {
    case "blackhead":
      return "黒ずみ毛穴タイプ"
    case "open":
      return "開き毛穴タイプ"
    case "sagging":
      return "たるみ毛穴タイプ"
    case "clogged":
      return "詰まり毛穴タイプ"
  }
}

function getTypeDescription(type: PoreType): string {
  switch (type) {
    case "blackhead":
      return "皮脂と古い角質が混ざって酸化し、黒いポツポツとして目立ちやすいタイプです。洗いすぎや強い毛穴パックで悪化しやすい傾向があります。"
    case "open":
      return "皮脂分泌や乾燥、摩擦などが原因で毛穴がまるく開きっぱなしになっているタイプです。インナードライや生活習慣の影響も受けやすい毛穴です。"
    case "sagging":
      return "加齢や乾燥、紫外線などにより、肌のハリが低下して毛穴が下向きのしずく型に見えるタイプです。ほおのたるみや輪郭のゆるみとセットで気になりやすい毛穴です。"
    case "clogged":
      return "ターンオーバーの乱れや乾燥によって角質が厚くなり、白い角栓やザラつきとして目立つタイプです。ゴシゴシ洗いでさらにゴワつきやすい傾向があります。"
  }
}

function getCareTips(type: PoreType): { title: string; items: string[] }[] {
  if (type === "blackhead") {
    return [
      {
        title: "黒ずみ毛穴タイプのケアポイント",
        items: [
          "クレンジングは「毛穴・皮脂ケア」表記のミルク〜バームタイプを選び、やさしく時間をかけてなじませる",
          "ゴシゴシ洗顔や1日に何度も洗うことは避け、泡で包むように洗う",
          "ビタミンC誘導体やナイアシンアミド配合の化粧水・美容液を取り入れ、皮脂と角質を整える",
          "週1〜2回のマイルドな角質ケア（酵素洗顔やAHA入り洗顔料など）でため込みにくい状態にする",
        ],
      },
      {
        title: "NGケア・やりがちな落とし穴",
        items: [
          "毛穴パックやピンセットなどで無理に角栓を抜き続ける",
          "強いスクラブを頻繁に使う",
          "オイル＝悪と決めつけて、必要以上にさっぱり系ばかりを使う",
        ],
      },
    ]
  }

  if (type === "open") {
    return [
      {
        title: "開き毛穴タイプのケアポイント",
        items: [
          "洗顔後すぐに保湿をして、肌の水分バランスを整える",
          "アルコール強めの収れん化粧水だけに頼らず、セラミドなどの保湿成分も重視する",
          "皮脂コントロール系の下地・美容液をTゾーン中心にポイント使いする",
          "睡眠・食事・ストレスなど、生活リズムも整えて皮脂バランスを安定させる",
        ],
      },
      {
        title: "NGケア・やりがちな落とし穴",
        items: [
          "テカりが気になって、さっぱり系だけで保湿をほとんどしない",
          "強い洗顔や拭き取りで必要なうるおいまで取り去ってしまう",
        ],
      },
    ]
  }

  if (type === "sagging") {
    return [
      {
        title: "たるみ毛穴タイプのケアポイント",
        items: [
          "保湿とハリ感ケア（レチノール・ペプチド・ビタミンCなど）を組み合わせて使う",
          "摩擦を避けるため、クレンジングやスキンケアは「下から上へ・こすらない」塗り方を意識する",
          "日中の紫外線対策を一年中行い、光老化によるたるみを防ぐ",
          "表情筋や姿勢のクセなど、生活習慣にも目を向ける",
        ],
      },
      {
        title: "NGケア・やりがちな落とし穴",
        items: [
          "強いマッサージや引き上げケアを長時間行い、逆に摩擦ダメージを与える",
          "保湿よりも即効性のある“毛穴隠し下地”だけに頼ってしまう",
        ],
      },
    ]
  }

  return [
    {
      title: "詰まり毛穴タイプのケアポイント",
      items: [
        "摩擦の少ないクレンジングと十分な保湿で、肌のごわつきをやわらげる",
        "週1〜2回を目安に、酵素洗顔やマイルドピーリングを取り入れる",
        "オイルフリー・ノンコメドジェニック表記のベースメイクやスキンケアを選ぶ",
        "乾燥を感じる部分には、クリームやバームで部分的に保護する",
      ],
    },
    {
      title: "NGケア・やりがちな落とし穴",
      items: [
        "角栓を指で押し出したり、爪でつまんでしまう",
        "「皮脂＝悪」と考えて、さっぱり系ばかりで保湿をサボる",
      ],
    },
  ]
}

export function PoreTypeDiagnosisClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers],
  )
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100)

  const diagnosis = useMemo(() => calculateDiagnosis(answers), [answers])

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const goNext = () => {
    if (!answers[currentQuestion.id]) return
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (diagnosis) {
      setShowResult(true)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const reset = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShowResult(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BeautySiteHeader />
      <BeautyBackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 space-y-3">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3]">
                <Image
                  src="/beauty/diagnosis/pore-type.png"
                  alt="毛穴ケアをイメージしたビジュアル"
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <Sparkles className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Pore Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  毛穴タイプ診断（無料）で、毛穴悩みの原因をチェック
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  黒ずみ・開き・たるみ・詰まり…。あなたの毛穴悩みがどのタイプかをチェックし、
                  タイプ別のケアの方向性をお伝えします。所要時間は約1〜2分です。
                </p>
              </div>
            </div>

            <Card className="bg-white border-gray-100 shadow-md">
              {!showResult ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <CardTitle className="text-sm md:text-base text-gray-900">
                        質問 {currentIndex + 1} / {QUESTIONS.length}
                      </CardTitle>
                      <span className="text-[11px] text-gray-500">
                        回答済み {answeredCount} / {QUESTIONS.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-100" />
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <p className="text-sm md:text-base font-semibold text-gray-900 mb-3">
                        {currentQuestion.text}
                      </p>
                      <div className="space-y-2">
                        {currentQuestion.options.map((option) => {
                          const selected = answers[currentQuestion.id] === option.id
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleSelect(currentQuestion.id, option.id)}
                              className={`w-full text-left rounded-xl border px-3 py-2.5 text-sm md:text-[15px] transition-all duration-200 ${
                                selected
                                  ? "border-rose-500 bg-rose-50 text-gray-900 shadow-sm"
                                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800"
                              }`}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={goPrev}
                        disabled={currentIndex === 0}
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        まえの質問へ
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={reset}
                          className="text-gray-700 border-gray-200 hover:bg-gray-50"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          最初からやり直す
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={goNext}
                          disabled={!answers[currentQuestion.id]}
                          className="bg-rose-500 hover:bg-rose-600 text-white"
                        >
                          {currentIndex === QUESTIONS.length - 1 ? "診断結果を見る" : "つぎの質問へ"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : diagnosis ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                          <Sparkles className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg text-gray-900">
                          毛穴タイプ診断の結果
                        </CardTitle>
                      </div>
                      <Badge className="bg-rose-500 text-white text-xs">無料診断</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">
                      回答内容にもとづき、現在の毛穴悩みの傾向を簡易的に診断しています。
                      医学的な診断ではない点をご理解ください。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">あなたの毛穴タイプ</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {getTypeLabel(diagnosis.type)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-700">{getTypeDescription(diagnosis.type)}</p>
                    </div>

                    <div className="space-y-4">
                      {getCareTips(diagnosis.type).map((section) => (
                        <div key={section.title} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                          <p className="text-sm font-semibold text-gray-900 mb-2">{section.title}</p>
                          <ul className="space-y-1.5">
                            {section.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="py-8 text-center text-sm text-gray-700">
                  回答内容の集計中にエラーが発生しました。お手数ですが、最初からやり直してください。
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={reset}
                      className="text-gray-700 border-gray-200 hover:bg-gray-50"
                    >
                      最初からやり直す
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </section>
      </main>

      <BeautySiteFooter />
    </div>
  )
}

