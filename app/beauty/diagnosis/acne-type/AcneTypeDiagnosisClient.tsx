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
import { CircleAlert, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

type AnswerOption = { id: string; label: string }
type Question = { id: string; text: string; options: AnswerOption[] }

type AcneType = "sebum" | "clogging" | "dry_irritation" | "lifestyle"

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "できやすい場所はどこ？",
    options: [
      { id: "a", label: "おでこ・鼻（Tゾーン）が多い" },
      { id: "b", label: "あご・フェイスラインが多い" },
      { id: "c", label: "頬・口周りが乾燥して荒れやすい" },
      { id: "d", label: "場所はバラバラ。調子の波が大きい" },
    ],
  },
  {
    id: "q2",
    text: "ニキビの見た目に近いのは？",
    options: [
      { id: "a", label: "赤く炎症して痛いことがある" },
      { id: "b", label: "白いプツプツや角栓っぽいものが多い" },
      { id: "c", label: "かゆみ・ヒリつき・赤みが出やすい" },
      { id: "d", label: "同じところに繰り返す/悪化と改善を繰り返す" },
    ],
  },
  {
    id: "q3",
    text: "皮脂・テカリは気になりますか？",
    options: [
      { id: "a", label: "かなり気になる（昼にはテカる）" },
      { id: "b", label: "部分的に気になる（Tゾーンだけ等）" },
      { id: "c", label: "テカリより乾燥が気になる" },
      { id: "d", label: "日によって差が大きい" },
    ],
  },
  {
    id: "q4",
    text: "スキンケアの感触は？",
    options: [
      { id: "a", label: "さっぱり系が好き。保湿は軽めが多い" },
      { id: "b", label: "毛穴・角質ケアをよく使う（酵素/AHA等）" },
      { id: "c", label: "敏感で合わないことが多い" },
      { id: "d", label: "忙しくてケアが安定しない" },
    ],
  },
  {
    id: "q5",
    text: "生活リズムで当てはまるのは？",
    options: [
      { id: "a", label: "睡眠が不規則/ストレスが強い" },
      { id: "b", label: "甘いもの・脂っこいものが多い" },
      { id: "c", label: "冷えやすい/体調で肌が左右される" },
      { id: "d", label: "わりと規則的" },
    ],
  },
  {
    id: "q6",
    text: "メイクやマスクとの関係は？",
    options: [
      { id: "a", label: "マスク/摩擦で悪化しやすい" },
      { id: "b", label: "毛穴落ち/詰まりっぽさが気になる" },
      { id: "c", label: "乾燥して粉っぽくなることがある" },
      { id: "d", label: "あまり影響は感じない" },
    ],
  },
]

const SCORING: Record<string, Record<string, Partial<Record<AcneType, number>>>> = {
  q1: {
    a: { sebum: 2, clogging: 1 },
    b: { lifestyle: 2 },
    c: { dry_irritation: 2 },
    d: { lifestyle: 1, sebum: 1 },
  },
  q2: {
    a: { sebum: 2 },
    b: { clogging: 2 },
    c: { dry_irritation: 2 },
    d: { lifestyle: 2 },
  },
  q3: {
    a: { sebum: 2 },
    b: { sebum: 1, clogging: 1 },
    c: { dry_irritation: 2 },
    d: { lifestyle: 1 },
  },
  q4: {
    a: { sebum: 1 },
    b: { clogging: 2 },
    c: { dry_irritation: 2 },
    d: { lifestyle: 2 },
  },
  q5: {
    a: { lifestyle: 2 },
    b: { sebum: 1, clogging: 1 },
    c: { lifestyle: 1, dry_irritation: 1 },
    d: { clogging: 1 },
  },
  q6: {
    a: { dry_irritation: 1, lifestyle: 1 },
    b: { clogging: 2 },
    c: { dry_irritation: 2 },
    d: { sebum: 1 },
  },
}

function calc(answers: Record<string, string | undefined>): AcneType | null {
  if (Object.values(answers).filter(Boolean).length !== QUESTIONS.length) return null
  const scores: Record<AcneType, number> = { sebum: 0, clogging: 0, dry_irritation: 0, lifestyle: 0 }
  for (const q of QUESTIONS) {
    const a = answers[q.id]
    if (!a) continue
    const row = SCORING[q.id]?.[a]
    if (!row) continue
    for (const k of Object.keys(row) as AcneType[]) scores[k] += row[k] ?? 0
  }
  return (Object.keys(scores) as AcneType[]).reduce((best, cur) => (scores[cur] > scores[best] ? cur : best))
}

function label(type: AcneType) {
  switch (type) {
    case "sebum":
      return "皮脂・炎症ニキビタイプ"
    case "clogging":
      return "角栓・詰まりニキビタイプ"
    case "dry_irritation":
      return "乾燥・刺激ニキビタイプ"
    case "lifestyle":
      return "生活リズムゆらぎタイプ"
  }
}

function oneLiner(type: AcneType) {
  switch (type) {
    case "sebum":
      return "まずは“落としすぎない洗顔”と皮脂バランスの安定から。"
    case "clogging":
      return "詰まりは“ため込まない仕組み”が鍵。マイルド角質ケアを週1〜2回。"
    case "dry_irritation":
      return "刺激を減らして“守りの保湿”。まずはバリアを立て直すのが近道です。"
    case "lifestyle":
      return "同じケアでも効き方が変わるタイプ。睡眠・ストレスの波を小さくするのが最優先。"
  }
}

function plans(type: AcneType) {
  const common = {
    threeDay: ["クレンジング/洗顔は“こすらない”を徹底", "保湿を毎日同じ手順で安定させる", "日中はUVケアを必ず実施"],
    oneWeek: ["刺激の強い角質ケアは頻度を下げる", "ベースメイクはノンコメド/低刺激寄りに", "食事・睡眠の記録をつけて波を可視化"],
  }
  switch (type) {
    case "sebum":
      return {
        threeDay: ["洗顔は朝晩2回まで、泡で30秒", "さっぱり系でも乳液/クリームは少量で締める", "Tゾーンは皮脂コントロール美容液をポイント使い"],
        oneWeek: ["ビタミンC/ナイアシンアミドを一点投入", "甘いもの・揚げ物の頻度を1段下げる", "枕カバー・スマホ画面を清潔に"],
      }
    case "clogging":
      return {
        threeDay: ["メイク残りが出ないクレンジングへ", "保湿で角質をやわらげる（化粧水は重ねづけ）", "触らない/潰さないを徹底"],
        oneWeek: ["週1〜2回の酵素洗顔 or マイルドピーリング", "クレイ/吸着はやりすぎない（週1まで）", "毛穴詰まりしにくい下地へ切り替え"],
      }
    case "dry_irritation":
      return {
        threeDay: ["角質ケア・スクラブ・拭き取りは停止", "保湿はセラミド系を優先", "赤みが出るアイテムは一旦お休み"],
        oneWeek: ["低刺激な日焼け止めに変更", "摩擦が出るタオル/コットンを見直す", "“守りの保湿”を継続して肌の反応を安定させる"],
      }
    case "lifestyle":
    default:
      return common
  }
}

const CATEGORY_BY_TYPE: Record<AcneType, string[]> = {
  sebum: ["洗顔料（アミノ酸系）", "皮脂バランス美容液", "ニキビ跡ケア（ビタミンC）"],
  clogging: ["クレンジング", "マイルド角質ケア", "ノンコメドベースメイク"],
  dry_irritation: ["敏感肌向け保湿", "低刺激UV", "鎮静ケア（CICA等）"],
  lifestyle: ["睡眠サポート習慣", "ストレスケア習慣", "食生活サポート"],
}

export function AcneTypeDiagnosisClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers])
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100)
  const result = useMemo(() => calc(answers), [answers])

  const select = (qid: string, oid: string) => setAnswers((p) => ({ ...p, [qid]: oid }))

  const next = () => {
    if (!answers[currentQuestion.id]) return
    if (currentIndex < QUESTIONS.length - 1) setCurrentIndex((p) => p + 1)
    else if (result) setShowResult(true)
  }
  const prev = () => currentIndex > 0 && setCurrentIndex((p) => p - 1)
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
              <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-white border border-rose-100 aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <CircleAlert className="h-5 w-5 text-rose-500" />
                    <p className="text-sm font-semibold text-gray-900">ニキビタイプ診断</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <CircleAlert className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Acne Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  ニキビタイプ診断（無料）で、原因傾向をチェック
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  皮脂・詰まり・乾燥刺激・生活リズムなど、原因の“傾向”を簡易診断します。所要時間は約1〜2分です。
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
                    <p className="mt-2 text-[11px] text-gray-500">
                      Webで完結・登録不要。気軽にチェックできます。
                    </p>
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
                        まえの質問へ
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
                          {currentIndex === QUESTIONS.length - 1 ? "診断結果を見る" : "つぎへ"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : result ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                          <CircleAlert className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg text-gray-900">ニキビタイプ診断の結果</CardTitle>
                      </div>
                      <Badge className="bg-rose-500 text-white text-xs">無料診断</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">
                      回答内容にもとづく簡易診断です。医療的な診断・治療の代替ではありません。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-4 md:px-5 md:py-5">
                      <p className="text-xs font-semibold text-rose-500 mb-1">あなたのニキビタイプ</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">{label(result)}</p>
                      <p className="text-xs md:text-sm text-gray-800 bg-white/70 rounded-xl px-3 py-2 inline-block">
                        <span className="font-semibold">今日からできる一言：</span> {oneLiner(result)}
                      </p>
                    </div>

                    {(() => {
                      const p = plans(result)
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                          <div className="rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3">
                            <p className="text-xs font-semibold text-rose-600 mb-2">最初の3日間でやること</p>
                            <ul className="space-y-1.5">
                              {p.threeDay.map((x) => (
                                <li key={x} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                            <p className="text-xs font-semibold text-gray-900 mb-2">1週間じっくり整えるプラン</p>
                            <ul className="space-y-1.5">
                              {p.oneWeek.map((x) => (
                                <li key={x} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })()}

                    <div className="space-y-3">
                      <p className="text-xs md:text-sm font-semibold text-gray-900">
                        おすすめカテゴリ（準備中）
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {CATEGORY_BY_TYPE[result].map((c) => (
                          <div key={c} className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-3">
                            <span className="font-semibold text-gray-900 text-sm">{c}</span>
                            <p className="text-[11px] text-gray-600 mt-1">選び方とおすすめをタイプ別に整備中です。</p>
                            <span className="inline-flex items-center text-[11px] text-gray-400 mt-2">準備中</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-gray-100">
                      <div className="text-[11px] md:text-xs text-gray-500">
                        次は「原因」を理解して、迷わないケアに。
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto"
                        >
                          <Link href="/beauty/articles/acne-type">解説記事を読む</Link>
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={reset}
                          className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto"
                        >
                          もう一度診断する
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto"
                        >
                          <Link href="/beauty">YokaUnit Beauty トップへ</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="py-8 text-center text-sm text-gray-700">
                  集計中にエラーが発生しました。お手数ですが、最初からやり直してください。
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
                  ニキビタイプ診断の見方と、原因別の整え方
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  ニキビは「とにかく乾かす」「とにかく攻める」では安定しません。まずは原因の傾向（皮脂・詰まり・乾燥刺激・生活リズム）を見極め、
                  やることを絞るのが最短です。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">タイプ別：最初にやること</h3>
                    <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                      <li>
                        <span className="font-semibold">皮脂・炎症</span>：洗いすぎを避けて皮脂バランスを安定。ビタミンC/ナイアシンアミドを一点投入。
                      </li>
                      <li>
                        <span className="font-semibold">角栓・詰まり</span>：クレンジングの精度＋週1〜2回のマイルド角質ケアで“ため込まない”。
                      </li>
                      <li>
                        <span className="font-semibold">乾燥・刺激</span>：攻めのケアを止めて“守りの保湿”。摩擦・拭き取りを減らす。
                      </li>
                      <li>
                        <span className="font-semibold">生活リズム</span>：ケアを固定化し、睡眠・ストレスの波を小さくする。
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">最優先NG（悪化しやすい）</h3>
                    <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                      <li>つぶす/触る（炎症と跡の原因）</li>
                      <li>角質ケアのやりすぎ（刺激ニキビに寄る）</li>
                      <li>さっぱり一辺倒で保湿を抜く（バリア低下）</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-2">
                  <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">
                    <Link href="/beauty/articles/acne-type">ニキビタイプ解説記事を読む</Link>
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

