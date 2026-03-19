"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BeautyBackgroundAnimation } from "@/app/beauty/_components/beauty-background-animation"
import { BeautySiteHeader } from "@/app/beauty/_components/beauty-site-header"
import { BeautySiteFooter } from "@/app/beauty/_components/beauty-site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react"

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
    text: "洗顔後、何もつけていない状態の素肌はどう感じますか？",
    options: [
      { id: "a", label: "すぐにつっぱり感やカサつきを強く感じる" },
      { id: "b", label: "少しつっぱるが、しばらくすると落ち着く" },
      { id: "c", label: "特につっぱりもベタつきも感じない" },
      { id: "d", label: "あまりつっぱらず、少しベタつくことが多い" },
    ],
  },
  {
    id: "q2",
    text: "日中（昼〜夕方）のTゾーン（おでこ・鼻）の様子は？",
    options: [
      { id: "a", label: "ほとんどテカらず、むしろ乾燥しやすい" },
      { id: "b", label: "少しテカるが、そこまで気にならない" },
      { id: "c", label: "テカりやすく、ティッシュやあぶらとり紙をよく使う" },
      { id: "d", label: "かなりテカり、メイク崩れも目立つ" },
    ],
  },
  {
    id: "q3",
    text: "頬や口周りなど、顔の側面〜下半分の状態は？",
    options: [
      { id: "a", label: "カサつき・粉吹きが気になりやすい" },
      { id: "b", label: "ときどき乾燥を感じる" },
      { id: "c", label: "特に乾燥もテカリも気にならない" },
      { id: "d", label: "テカりやベタつきを感じることが多い" },
    ],
  },
  {
    id: "q4",
    text: "メイクをする場合、どんな崩れ方をしやすいですか？",
    options: [
      { id: "a", label: "時間が経つと乾燥で粉っぽく崩れやすい" },
      { id: "b", label: "そこまで気になる崩れ方はしない" },
      { id: "c", label: "Tゾーンだけテカってヨレやすい" },
      { id: "d", label: "顔全体がテカってヨレやすい" },
    ],
  },
  {
    id: "q5",
    text: "季節による肌状態の変化で、一番近いものは？",
    options: [
      { id: "a", label: "一年を通して乾燥しやすい" },
      { id: "b", label: "冬は乾燥しやすく、夏は少しテカる" },
      { id: "c", label: "季節であまり変わらない" },
      { id: "d", label: "一年を通してテカりやすい" },
    ],
  },
  {
    id: "q6",
    text: "毛穴の気になり方について、一番近いものは？",
    options: [
      { id: "a", label: "あまり毛穴は目立たない" },
      { id: "b", label: "頬の毛穴が少し気になる" },
      { id: "c", label: "鼻・Tゾーンの毛穴や黒ずみが気になる" },
      { id: "d", label: "顔全体の毛穴が目立ちやすい" },
    ],
  },
  {
    id: "q7",
    text: "ニキビや吹き出物について、一番近い状態は？",
    options: [
      { id: "a", label: "ほとんどできない" },
      { id: "b", label: "乾燥するときに赤みやポツポツが出やすい" },
      { id: "c", label: "Tゾーンにできやすい" },
      { id: "d", label: "顔全体にできやすい" },
    ],
  },
  {
    id: "q8",
    text: "コスメや外的刺激に対する肌の反応は？",
    options: [
      { id: "a", label: "ほとんどヒリつき・かゆみを感じない" },
      { id: "b", label: "たまに敏感になる程度" },
      { id: "c", label: "新しいコスメでヒリつくことが多い" },
      { id: "d", label: "低刺激と書かれたものでもしみることがある" },
    ],
  },
  {
    id: "q9",
    text: "スキンケア後すぐの肌感として近いものは？",
    options: [
      { id: "a", label: "すぐに物足りなくなり、もっと保湿したくなる" },
      { id: "b", label: "ちょうどよいしっとり感が続きやすい" },
      { id: "c", label: "少しベタつきが気になる" },
      { id: "d", label: "かなりベタつき、テカりやすい" },
    ],
  },
  {
    id: "q10",
    text: "ご自身の肌をざっくり分類すると、どれが一番近いと感じますか？",
    options: [
      { id: "a", label: "乾燥肌だと思う" },
      { id: "b", label: "混合肌だと思う" },
      { id: "c", label: "普通肌だと思う" },
      { id: "d", label: "脂性肌（オイリー肌）だと思う" },
    ],
  },
]

type SkinType = "dry" | "oily" | "combination" | "normal"

type DiagnosisResult = {
  type: SkinType
  isSensitive: boolean
}

const SCORING_TABLE: Record<
  string,
  Partial<Record<string, { dry?: number; oily?: number; sensitive?: number }>>
> = {
  q1: {
    a: { dry: 2 },
    b: { dry: 1 },
    c: {},
    d: { oily: 1 },
  },
  q2: {
    a: { dry: 1 },
    b: {},
    c: { oily: 1 },
    d: { oily: 2 },
  },
  q3: {
    a: { dry: 2 },
    b: { dry: 1 },
    c: {},
    d: { oily: 1 },
  },
  q4: {
    a: { dry: 2 },
    b: {},
    c: { oily: 1 },
    d: { oily: 2 },
  },
  q5: {
    a: { dry: 2 },
    b: { dry: 1, oily: 1 },
    c: {},
    d: { oily: 2 },
  },
  q6: {
    a: {},
    b: { dry: 1 },
    c: { oily: 1 },
    d: { oily: 2 },
  },
  q7: {
    a: {},
    b: { dry: 1, sensitive: 1 },
    c: { oily: 1 },
    d: { oily: 2, sensitive: 1 },
  },
  q8: {
    a: {},
    b: { sensitive: 1 },
    c: { sensitive: 2 },
    d: { sensitive: 3 },
  },
  q9: {
    a: { dry: 2 },
    b: {},
    c: { oily: 1 },
    d: { oily: 2 },
  },
  q10: {
    a: { dry: 1 },
    b: { dry: 1, oily: 1 },
    c: {},
    d: { oily: 1 },
  },
}

function calculateDiagnosis(answers: Record<string, string | undefined>): DiagnosisResult | null {
  const answeredCount = Object.values(answers).filter(Boolean).length
  if (answeredCount !== QUESTIONS.length) return null

  let dry = 0
  let oily = 0
  let sensitive = 0

  for (const q of QUESTIONS) {
    const selected = answers[q.id]
    if (!selected) continue

    const scoreDef = SCORING_TABLE[q.id]?.[selected]
    if (!scoreDef) continue

    dry += scoreDef.dry ?? 0
    oily += scoreDef.oily ?? 0
    sensitive += scoreDef.sensitive ?? 0
  }

  let type: SkinType

  if (dry >= oily + 2) {
    type = "dry"
  } else if (oily >= dry + 2) {
    type = "oily"
  } else {
    const tZoneOily =
      answers.q2 === "c" ||
      answers.q2 === "d" ||
      answers.q4 === "c" ||
      answers.q4 === "d" ||
      answers.q6 === "c"
    const uZoneDry = answers.q3 === "a" || answers.q3 === "b"

    if (tZoneOily && uZoneDry) {
      type = "combination"
    } else if (dry <= 3 && oily <= 3) {
      type = "normal"
    } else {
      type = dry > oily ? "dry" : oily > dry ? "oily" : "combination"
    }
  }

  const isSensitive = sensitive >= 4

  return { type, isSensitive }
}

function getTypeLabel(type: SkinType, isSensitive: boolean): string {
  const base =
    type === "dry"
      ? "乾燥肌タイプ"
      : type === "oily"
        ? "脂性肌タイプ"
        : type === "combination"
          ? "混合肌タイプ"
          : "普通肌タイプ"

  if (isSensitive) {
    return `${base}（敏感肌傾向あり）`
  }

  return base
}

function getTypeDescription(type: SkinType, isSensitive: boolean): string {
  if (type === "dry") {
    if (isSensitive) {
      return "水分も油分も不足しやすく、外的刺激にも反応しやすい「乾燥×敏感肌タイプ」です。うるおいを与えつつ、刺激をできるだけ避けるケアが大切です。"
    }
    return "肌の水分・油分が不足しやすい「乾燥肌タイプ」です。洗顔やクレンジングでうるおいを奪いすぎず、保湿を中心にじっくりケアしていくのがポイントです。"
  }

  if (type === "oily") {
    if (isSensitive) {
      return "皮脂が出やすい一方で、刺激にも反応しやすい「オイリー×敏感肌タイプ」です。べたつきを抑えつつ、摩擦や成分刺激を抑えたやさしいケアが向いています。"
    }
    return "皮脂が出やすくテカりやすい「脂性肌タイプ」です。必要以上に洗いすぎず、油分バランスを整えながら毛穴ケアと保湿を両立させることが大切です。"
  }

  if (type === "combination") {
    if (isSensitive) {
      return "Tゾーンはテカりやすく、頬や口周りは乾燥しやすい「混合肌タイプ」で、さらに敏感さもある傾向です。パーツごとにケアを変えつつ、負担をかけない使い方を意識しましょう。"
    }
    return "Tゾーンはテカりやすく、頬や口周りは乾燥しがちな「混合肌タイプ」です。顔全体を同じケアにするのではなく、部分ごとにアイテムや量を調整するのがぴったりです。"
  }

  if (isSensitive) {
    return "水分・油分のバランスは比較的とれていますが、外的刺激に反応しやすい「普通肌（敏感傾向）」タイプです。肌状態に合わせて、無理をしない範囲でアイテムを選ぶのがおすすめです。"
  }

  return "水分と油分のバランスが比較的とれた「普通肌タイプ」です。今の良い状態をキープできるように、基本のケアを大切にしながら、季節やライフスタイルに合わせて微調整していきましょう。"
}

function getCareTips(type: SkinType, isSensitive: boolean): { title: string; items: string[] }[] {
  if (type === "dry") {
    return [
      {
        title: "スキンケアのポイント",
        items: [
          "クレンジングはオイルよりも「ミルク・クリーム・バーム」などうるおいを守れるタイプを選ぶ",
          "洗顔は朝はぬるま湯のみ、もしくは低刺激の洗顔料をよく泡立ててやさしく",
          "化粧水は「高保湿」「ヒト型セラミド」「アミノ酸」など保湿成分が豊富なものをたっぷり",
          "乳液・クリームでふたをして、水分を逃さないようにする",
        ],
      },
      {
        title: "避けたいNGケア",
        items: [
          "アルコール強めの拭き取り化粧水で何度もふき取る",
          "熱いお湯での洗顔や、ゴシゴシこするクレンジング",
          "さっぱり系アイテムだけで済ませてしまう「保湿不足」",
        ],
      },
    ]
  }

  if (type === "oily") {
    return [
      {
        title: "スキンケアのポイント",
        items: [
          "クレンジング・洗顔は「皮脂吸着成分」入りのものを選びつつ、ゴシゴシこすらない",
          "化粧水でしっかり水分を入れ、べたつかないジェル・乳液で軽めにフタをする",
          "Tゾーンには皮脂コントロール美容液をポイント使いするのもおすすめ",
          "日中はあぶらとり紙＋ティッシュオフでやさしく皮脂を抑える",
        ],
      },
      {
        title: "避けたいNGケア",
        items: [
          "テカりが気になって1日に何度も洗顔・スクラブをする",
          "「オイル＝悪」と決めつけて、保湿をほとんどしない",
          "カバー力の高いファンデを厚塗りして、そのまま長時間過ごす",
        ],
      },
    ]
  }

  if (type === "combination") {
    return [
      {
        title: "スキンケアのポイント",
        items: [
          "クレンジング・洗顔は基本的に「やさしめ」を選び、量や回数で調整する",
          "頬・口周りなど乾燥しやすい部分には、化粧水やクリームを少し多めに",
          "Tゾーンには、皮脂コントロール系の下地や美容液でテカりをケア",
          "「顔全体を同じように塗らない」ことを意識して、パーツごとに使い分ける",
        ],
      },
      {
        title: "避けたいNGケア",
        items: [
          "Tゾーンのテカりが気になって、顔全体をさっぱり系でまとめてしまう",
          "一度にたくさんの新しいアイテムを取り入れて、肌が混乱してしまう",
        ],
      },
    ]
  }

  return [
    {
      title: "スキンケアのポイント",
      items: [
        "今のケアで大きなトラブルがなければ、急にアイテムを変えすぎない",
        "季節や体調によって「少し乾燥する」「少しテカる」ときは、アイテム量を微調整する",
        "日焼け止めは毎日こまめに塗り直し、将来のゆらぎを防ぐ",
      ],
    },
    {
      title: "避けたいNGケア",
      items: [
        "肌トラブルが出ているのに、トレンドだからと次々に新作を試す",
        "「普通肌だから何をしても大丈夫」と、クレンジングや紫外線対策を油断する",
      ],
    },
  ]
}

export function SkinTypeDiagnosisClient() {
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
                  src="/beauty/diagnosis/skin-type.png.png"
                  alt="肌質診断をイメージしたビジュアル"
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <Droplets className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Skin Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  肌質診断（無料）で、素肌タイプをチェック
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  乾燥肌・脂性肌・混合肌・普通肌の中から、あなたの素肌タイプと敏感肌傾向をチェックします。
                  所要時間は約1〜2分。すべて匿名・登録不要です。
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
                          {currentIndex === QUESTIONS.length - 1 ? (
                            <>
                              診断結果を見る
                              <Sparkles className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              つぎの質問へ
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </>
                          )}
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
                          <Droplets className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg text-gray-900">
                          肌質診断の結果
                        </CardTitle>
                      </div>
                      <Badge className="bg-rose-500 text-white text-xs">無料診断</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-rose-700">
                      回答内容にもとづき、現在の素肌タイプを簡易的に判定しています。
                      医学的な診断ではない点をご理解ください。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">あなたの肌質タイプ</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {getTypeLabel(diagnosis.type, diagnosis.isSensitive)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-700">
                        {getTypeDescription(diagnosis.type, diagnosis.isSensitive)}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {getCareTips(diagnosis.type, diagnosis.isSensitive).map((section) => (
                        <div
                          key={section.title}
                          className="rounded-xl border border-gray-200 bg-white px-4 py-3"
                        >
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

                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3">
                      <p className="text-xs md:text-sm text-gray-700">
                        このあと、
                        <span className="font-semibold">
                          肌質タイプに合ったスキンケアルーティンやおすすめアイテム
                        </span>
                        を紹介する記事・ツールも順次公開予定です。ブックマークしておくと、アップデートを見逃しにくくなります。
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={reset}
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        もう一度診断する
                      </Button>
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

            {/* 診断ページ内の解説（SEO本文） */}
            <section className="mt-10 md:mt-12">
              <div className="rounded-3xl border border-gray-100 bg-white/85 backdrop-blur-[2px] p-5 md:p-7 shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-rose-500 mb-2">GUIDE</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  肌質診断の見方と、肌質別スキンケアの組み立て
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  肌質（乾燥・脂性・混合・普通）は、スキンケアの「量」と「優先順位」を決めるための土台です。
                  まずは毎日ブレない基本（洗顔→保湿→UV）を揃えるだけで、肌は安定しやすくなります。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">結論：まず揃える3ステップ</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-800 space-y-2 leading-relaxed">
                      <li>洗顔（落としすぎない）</li>
                      <li>保湿（化粧水→乳液/クリーム）</li>
                      <li>UV（毎日）</li>
                    </ol>
                  </div>
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">肌質別：やりがちNG</h3>
                    <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                      <li><span className="font-semibold">乾燥肌</span>：さっぱり系だけで保湿不足</li>
                      <li><span className="font-semibold">脂性肌</span>：テカりが怖くて保湿を抜く（逆に皮脂が増える）</li>
                      <li><span className="font-semibold">混合肌</span>：全顔を同じケアで統一（部分最適が必要）</li>
                      <li><span className="font-semibold">普通肌</span>：攻めの成分を増やしすぎて刺激に寄る</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-2">
                  <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">
                    <Link href="/beauty/articles/skin-type">肌質別の解説記事を読む</Link>
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

