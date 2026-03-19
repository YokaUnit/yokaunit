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
import { Minus, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

type AnswerOption = { id: string; label: string }
type Question = { id: string; text: string; options: AnswerOption[] }

type HairType = "oily_scalp" | "dry_frizzy" | "damage" | "fine_flat"

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "夕方の頭皮の状態は？",
    options: [
      { id: "a", label: "ベタつき・においが気になる" },
      { id: "b", label: "乾燥してかゆい/つっぱる" },
      { id: "c", label: "特に気にならない" },
      { id: "d", label: "日によって差が大きい" },
    ],
  },
  {
    id: "q2",
    text: "髪のまとまりは？",
    options: [
      { id: "a", label: "広がりやすく、うねりやすい" },
      { id: "b", label: "パサつき・切れ毛が気になる" },
      { id: "c", label: "ぺたんこになりやすい" },
      { id: "d", label: "比較的まとまる" },
    ],
  },
  {
    id: "q3",
    text: "ダメージの要因は？",
    options: [
      { id: "a", label: "カラー/ブリーチ/縮毛矯正をしている" },
      { id: "b", label: "アイロンやコテをよく使う" },
      { id: "c", label: "特にしていない" },
      { id: "d", label: "ドライヤーを早く切り上げがち" },
    ],
  },
  {
    id: "q4",
    text: "髪の太さ・量の印象は？",
    options: [
      { id: "a", label: "細めでボリュームが出にくい" },
      { id: "b", label: "普通〜太め" },
      { id: "c", label: "量が多い" },
      { id: "d", label: "分からない" },
    ],
  },
  {
    id: "q5",
    text: "シャンプー後の状態は？",
    options: [
      { id: "a", label: "すぐベタつくのでさっぱり系が好き" },
      { id: "b", label: "きしむ/乾燥するのでしっとり系が好き" },
      { id: "c", label: "どちらでもOK" },
      { id: "d", label: "何を使ってもあまり変わらない" },
    ],
  },
  {
    id: "q6",
    text: "悩みに一番近いのは？",
    options: [
      { id: "a", label: "頭皮の皮脂・ベタつき" },
      { id: "b", label: "広がり・うねり" },
      { id: "c", label: "ダメージ・パサつき" },
      { id: "d", label: "ボリュームが出ない" },
    ],
  },
]

const SCORING: Record<string, Record<string, Partial<Record<HairType, number>>>> = {
  q1: { a: { oily_scalp: 2 }, b: { dry_frizzy: 1, damage: 1 }, c: { fine_flat: 1 }, d: { fine_flat: 1 } },
  q2: { a: { dry_frizzy: 2 }, b: { damage: 2 }, c: { fine_flat: 2 }, d: { oily_scalp: 1 } },
  q3: { a: { damage: 2 }, b: { damage: 1, dry_frizzy: 1 }, c: { oily_scalp: 1 }, d: { dry_frizzy: 1 } },
  q4: { a: { fine_flat: 2 }, b: { oily_scalp: 1 }, c: { dry_frizzy: 1 }, d: { fine_flat: 1 } },
  q5: { a: { oily_scalp: 2 }, b: { dry_frizzy: 1, damage: 1 }, c: { fine_flat: 1 }, d: { damage: 1 } },
  q6: { a: { oily_scalp: 2 }, b: { dry_frizzy: 2 }, c: { damage: 2 }, d: { fine_flat: 2 } },
}

function calc(answers: Record<string, string | undefined>): HairType | null {
  if (Object.values(answers).filter(Boolean).length !== QUESTIONS.length) return null
  const scores: Record<HairType, number> = { oily_scalp: 0, dry_frizzy: 0, damage: 0, fine_flat: 0 }
  for (const q of QUESTIONS) {
    const a = answers[q.id]
    if (!a) continue
    const row = SCORING[q.id]?.[a]
    if (!row) continue
    for (const k of Object.keys(row) as HairType[]) scores[k] += row[k] ?? 0
  }
  return (Object.keys(scores) as HairType[]).reduce((best, cur) => (scores[cur] > scores[best] ? cur : best))
}

function label(type: HairType) {
  switch (type) {
    case "oily_scalp":
      return "頭皮ベタつきタイプ"
    case "dry_frizzy":
      return "乾燥・広がりタイプ"
    case "damage":
      return "ダメージ集中タイプ"
    case "fine_flat":
      return "細毛・ぺたんこタイプ"
  }
}

function oneLiner(type: HairType) {
  switch (type) {
    case "oily_scalp":
      return "洗いすぎをやめて、頭皮の皮脂バランスを安定させるのが近道。"
    case "dry_frizzy":
      return "広がりは“水分不足＋摩擦”が原因になりやすい。保湿と熱ダメージ対策を。"
    case "damage":
      return "まずは補修と熱保護。アイロン前のケアで髪の手触りが変わります。"
    case "fine_flat":
      return "根元の立ち上げと、重すぎない保湿で“ふんわり”を作るのがコツ。"
  }
}

function plans(type: HairType) {
  switch (type) {
    case "oily_scalp":
      return {
        threeDay: ["シャンプーは頭皮だけを指の腹で洗う", "すすぎ時間を+30秒増やす", "トリートメントは毛先中心に"],
        oneWeek: ["週1回だけ頭皮クレンジングを追加", "朝のドライヤーで根元を起こす習慣", "枕カバーを清潔に"],
      }
    case "dry_frizzy":
      return {
        threeDay: ["洗髪後すぐにアウトバスで保湿", "タオルは押さえるように水分オフ", "ドライヤーは上から下へ風を当てる"],
        oneWeek: ["週1〜2回の集中トリートメント", "アイロン温度を見直す（低温へ）", "湿気対策のスタイリング剤を一点投入"],
      }
    case "damage":
      return {
        threeDay: ["アイロン前に必ず熱保護を入れる", "毛先のアウトバスを毎日継続", "濡れ髪のまま放置しない"],
        oneWeek: ["補修系トリートメントを週2回", "カラー/縮毛の頻度を一段落とす", "切れ毛が多い日は“結ばない”選択"],
      }
    case "fine_flat":
    default:
      return {
        threeDay: ["根元を起こす乾かし方に変更", "重いオイルは毛先だけに限定", "頭皮は清潔に、毛先は軽く保湿"],
        oneWeek: ["週1〜2回のボリュームケア", "ブラッシングで根元の方向づけ", "スタイリング前に軽いミストを使う"],
      }
  }
}

const CATEGORY_BY_TYPE: Record<HairType, string[]> = {
  oily_scalp: ["頭皮ケアシャンプー", "頭皮ローション", "軽めのトリートメント"],
  dry_frizzy: ["保湿系シャンプー", "集中トリートメント", "湿気対策スタイリング"],
  damage: ["補修トリートメント", "熱保護アウトバス", "カラーケア"],
  fine_flat: ["ボリューム系シャンプー", "軽いアウトバス", "根元キープアイテム"],
}

export function HairTypeDiagnosisClient() {
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
                    <Minus className="h-5 w-5 text-rose-500" />
                    <p className="text-sm font-semibold text-gray-900">髪質診断</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-200 mb-2">
                  <Minus className="h-4 w-4 text-rose-500" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-600 uppercase">
                    Hair Diagnosis
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  髪質診断（無料）で、ヘアケアの方向性をチェック
                </h1>
                <p className="text-sm md:text-base text-gray-700">
                  頭皮の状態・広がり・ダメージ傾向などから、髪質タイプの“傾向”を簡易診断します。所要時間は約1〜2分です。
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
              ) : result ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                          <Minus className="h-5 w-5 text-rose-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg text-gray-900">髪質診断の結果</CardTitle>
                      </div>
                      <Badge className="bg-rose-500 text-white text-xs">無料診断</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">
                      回答内容にもとづく簡易診断です。医療的な診断・治療の代替ではありません。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-4 md:px-5 md:py-5">
                      <p className="text-xs font-semibold text-rose-500 mb-1">あなたの髪質タイプ</p>
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
                      <p className="text-xs md:text-sm font-semibold text-gray-900">おすすめカテゴリ（準備中）</p>
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
                      <div className="text-[11px] md:text-xs text-gray-500">次は「選び方」を理解して、迷わないヘアケアへ。</div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-gray-700 border-gray-200 hover:bg-gray-50 w-full md:w-auto"
                        >
                          <Link href="/beauty/articles/hair-type">解説記事を読む</Link>
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
                  髪質診断の見方と、タイプ別ヘアケアの選び方
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  ヘアケアは「良いものを足す」より、「自分のタイプに合う最小構成」にする方が結果が出やすいです。
                  まずは頭皮・広がり・ダメージ・細毛のどれが強いかを見極めます。
                </p>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">タイプ別：まず揃えるもの</h3>
                  <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                    <li><span className="font-semibold">頭皮ベタつき</span>：頭皮の洗い方＋すすぎの質。毛先は軽めに保湿。</li>
                    <li><span className="font-semibold">乾燥・広がり</span>：アウトバス保湿＋摩擦/熱ダメージ対策。</li>
                    <li><span className="font-semibold">ダメージ</span>：補修＋熱保護。濡れ髪放置をやめる。</li>
                    <li><span className="font-semibold">細毛・ぺたんこ</span>：根元の乾かし方＋重すぎない保湿。</li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-2">
                  <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">
                    <Link href="/beauty/articles/hair-type">髪質別の解説記事を読む</Link>
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

