"use client"

import { Moon, RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SleepPostureCheckForm } from "./components/SleepPostureCheckForm"
import { SleepPostureCheckResult } from "./components/SleepPostureCheckResult"
import { useSleepPostureCheck } from "./hooks/useSleepPostureCheck"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"
import { ToolHeroImage } from "@/components/tool-hero-image"

const DEFAULT_TITLE = "あなたの首、もう限界かも？睡眠姿勢セルフチェック"

interface SleepPostureCheckClientPageProps {
  toolImageUrl?: string | null
  toolTitle?: string
}

export default function SleepPostureCheckClientPage({
  toolImageUrl = null,
  toolTitle = DEFAULT_TITLE,
}: SleepPostureCheckClientPageProps) {
  const {
    step,
    answers,
    result,
    isAnalyzing,
    currentQuestion,
    updateAnswer,
    startFresh,
    resetCheck,
    nextQuestion,
    previousQuestion,
    answeredCount,
    hasDraft,
    resumeCheck,
  } = useSleepPostureCheck()

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const text = result
      ? `睡眠姿勢セルフチェックの結果は「${result.typeName}」でした（${result.score}/${result.maxScore}）。`
      : "睡眠姿勢セルフチェックをやってみました。"

    try {
      if (navigator.share) {
        await navigator.share({
          title: DEFAULT_TITLE,
          text,
          url,
        })
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`)
        toast({
          title: "結果をコピーしました",
          description: "SNSやメモに貼り付けて共有できます。",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />

        <div className="relative z-10 container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "睡眠姿勢セルフチェック", href: "/tools/sleep-posture-check" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {toolImageUrl && <ToolHeroImage imageUrl={toolImageUrl} title={toolTitle} />}

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-4 rounded-3xl shadow-xl">
                  <Moon className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{DEFAULT_TITLE}</h1>
              <h2 className="text-lg md:text-xl text-gray-600 mb-4">約3分・10の質問で「首まわり×睡眠」の傾向タイプをチェック</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                医療診断ではありません。生活習慣と睡眠環境の見直しヒントとしてご利用ください。
              </p>
            </div>

            {step === "intro" && (
              <>
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-center mb-6">セルフチェックの流れ</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-bold mb-2">10の質問</h3>
                      <p className="text-sm text-gray-600">寝姿勢・枕・朝の感覚などに回答</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">2</span>
                      </div>
                      <h3 className="font-bold mb-2">傾向を集計</h3>
                      <p className="text-sm text-gray-600">回答からタイプを表示（目安）</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">次の一歩</h3>
                      <p className="text-sm text-gray-600">生活習慣のヒントをチェック</p>
                    </div>
                  </div>

                  {hasDraft && (
                    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      前回の途中データがあります（{answeredCount}/{10}回答）。続きから再開できます。
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        type="button"
                        onClick={startFresh}
                        className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 px-8 rounded-xl text-lg"
                      >
                        <Moon className="h-5 w-5 mr-2" />
                        最初から始める
                      </Button>
                      {hasDraft && (
                        <Button
                          type="button"
                          onClick={resumeCheck}
                          variant="outline"
                          className="border-2 border-amber-400 text-amber-800 hover:bg-amber-50 font-bold py-4 px-8 rounded-xl text-lg"
                        >
                          続きから再開
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>

                <div className="mb-8">
                  <RelatedTools currentToolSlug="sleep-posture-check" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                    <div className="text-2xl mb-2">⏱️</div>
                    <p className="text-sm font-semibold text-gray-700">約3分</p>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                    <div className="text-2xl mb-2">💯</div>
                    <p className="text-sm font-semibold text-gray-700">無料</p>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <p className="text-sm font-semibold text-gray-700">登録不要</p>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <p className="text-sm font-semibold text-gray-700">スマホ対応</p>
                  </Card>
                </div>
              </>
            )}

            {step === "questions" && (
              <>
                <SleepPostureCheckForm
                  answers={answers}
                  currentQuestion={currentQuestion}
                  onUpdateAnswer={updateAnswer}
                  onNextQuestion={nextQuestion}
                  onPreviousQuestion={previousQuestion}
                  isAnalyzing={isAnalyzing}
                />
                <div className="mt-8">
                  <RelatedTools currentToolSlug="sleep-posture-check" />
                </div>
              </>
            )}

            {step === "result" && result && (
              <>
                <SleepPostureCheckResult result={result} onShare={handleShare} />
                <div className="text-center mt-8">
                  <Button
                    type="button"
                    onClick={resetCheck}
                    variant="outline"
                    className="border-2 border-indigo-500 text-indigo-700 hover:bg-indigo-50 font-bold py-3 px-6 rounded-xl"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    もう一度チェックする
                  </Button>
                </div>
                <div className="mt-8">
                  <RelatedTools currentToolSlug="sleep-posture-check" />
                </div>
              </>
            )}

            <div className="mt-12 space-y-8">
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">睡眠姿勢セルフチェックとは？</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  首まわりのつらさは、枕のフィット、寝姿勢、就寝前のスマホ時間、日中の姿勢など複数の要因が絡みやすいものです。このページでは、選択式の質問に答えるだけで、
                  <strong>今の生活習慣から見た「傾向タイプ」</strong>
                  を目安として表示します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  結果はエンタメ・自己理解のための参考であり、医療行為や疾病の診断を目的としたものではありません。痛みやしびれが強い、日常生活に支障がある場合は、医療機関へ相談してください。
                </p>
              </section>

              <section className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">チェックのポイント</h2>
                <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                  <li>• 寝姿勢・枕の感覚・朝の首まわりの違和感</li>
                  <li>• 就寝前のスマホ・PC、デスク／運転など首を前に出す時間</li>
                  <li>• マットレス／布団の状態、旅行時の枕の変化への敏感さ</li>
                  <li>• 首まわりのケア習慣、睡眠への投資意識</li>
                </ul>
              </section>

              <section className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Q. 結果が気になりました。枕を変えるべきですか？</h3>
                    <p className="text-gray-700 text-sm">
                      A. 結果は目安です。朝の違和感や寝付きの悪さが続く場合は、高さ・素材・寝姿勢との組み合わせを含めて見直す価値があります。合うかは個人差が大きいため、返品・試寝の条件も含めて比較すると安心です。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Q. スマホで最後まで答えられますか？</h3>
                    <p className="text-gray-700 text-sm">A. はい、スマートフォン・PCのどちらからでも利用できます。</p>
                  </div>
                </div>
              </section>

              <section className="text-center">
                <p className="text-xs text-gray-500">
                  <strong>関連キーワード:</strong> 睡眠姿勢 セルフチェック 首 枕 寝姿勢 横向き 仰向け スマホ 首こり 睡眠の質 枕
                  選び方
                </p>
              </section>

              <section className="text-center pt-2">
                <div className="md:hidden">
                  <a href="https://px.a8.net/svt/ejp?a8mat=4B1KXN+DTQHLE+4GZK+609HT" rel="nofollow sponsored noopener noreferrer" target="_blank" className="inline-block max-w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element -- ASP配信バナー */}
                    <img
                      border={0}
                      width={320}
                      height={50}
                      alt=""
                      src="https://www25.a8.net/svt/bgt?aid=260414267836&wid=005&eno=01&mid=s00000020864001009000&mc=1"
                      className="max-w-full h-auto mx-auto"
                    />
                  </a>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    border={0}
                    width={1}
                    height={1}
                    src="https://www15.a8.net/0.gif?a8mat=4B1KXN+DTQHLE+4GZK+609HT"
                    alt=""
                    className="hidden"
                    aria-hidden
                  />
                </div>
                <div className="hidden md:block">
                  <a href="https://px.a8.net/svt/ejp?a8mat=4B1KXN+DTQHLE+4GZK+601S1" rel="nofollow sponsored noopener noreferrer" target="_blank" className="inline-block max-w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element -- ASP配信バナー */}
                    <img
                      border={0}
                      width={468}
                      height={60}
                      alt=""
                      src="https://www25.a8.net/svt/bgt?aid=260414267836&wid=005&eno=01&mid=s00000020864001008000&mc=1"
                      className="max-w-full h-auto mx-auto"
                    />
                  </a>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    border={0}
                    width={1}
                    height={1}
                    src="https://www11.a8.net/0.gif?a8mat=4B1KXN+DTQHLE+4GZK+601S1"
                    alt=""
                    className="hidden"
                    aria-hidden
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">※このリンクは広告を含みます</p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
