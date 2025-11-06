"use client"

import React, { useState, useEffect } from "react"
import { Brain, Sparkles, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DiagnosisForm } from "./components/DiagnosisForm"
import { DiagnosisResult as DiagnosisResultComponent } from "./components/DiagnosisResult"
import { useAi1KanziDiagnosis } from "./hooks/useAi1KanziDiagnosis"
import { toast } from "@/hooks/use-toast"
import { CategoryTools } from "@/components/category-tools"

export default function Ai1KanziClientPage() {
  const {
    step,
    answers,
    result,
    isAnalyzing,
    currentQuestion,
    updateAnswer,
    startDiagnosis,
    resetDiagnosis,
    nextQuestion,
    previousQuestion,
    analyzeKanjiResult,
  } = useAi1KanziDiagnosis()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    // JSON-LD構造化データ（WebApplication）
    const webAppStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AIが診断！あなたの性格を漢字1文字で表すと？",
      "description": "AI技術を使用してユーザーの性格を漢字1文字で診断する無料ツール",
      "url": "https://yokaunit.com/tools/ai-1kanzi",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "featureList": [
        "簡単5つの選択式質問",
        "AI分析による漢字1文字診断",
        "性格の詳細な説明",
        "個別化された特徴",
        "完全無料・登録不要",
        "スマホ・PC対応",
        "結果シェア機能"
      ],
      "screenshot": "https://yokaunit.com/ogp/ai-1kanzi-diagnosis.png",
      "author": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0]
    }

    // 構造化データ（FAQ）
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "AI漢字診断は無料ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
          }
        },
        {
          "@type": "Question",
          "name": "漢字診断の精度はどの程度ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI分析と心理学的アプローチを組み合わせた独自のアルゴリズムにより、高精度な性格診断を提供しています。"
          }
        },
        {
          "@type": "Question",
          "name": "どのような質問に答えるのですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "朝の習慣、相談される内容、好きな色、最近の趣味、性格の5つの選択式質問に答えるだけです。約2分で完了します。"
          }
        },
        {
          "@type": "Question",
          "name": "診断結果は信頼できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "心理学的理論に基づいたAI分析システムを使用しており、参考値として信頼性の高い結果を提供しています。"
          }
        }
      ]
    }

    // WebApplication構造化データを挿入
    const webAppScript = document.createElement("script")
    webAppScript.type = "application/ld+json"
    webAppScript.textContent = JSON.stringify(webAppStructuredData)
    document.head.appendChild(webAppScript)

    // FAQ構造化データを挿入
    const faqScript = document.createElement("script")
    faqScript.type = "application/ld+json"
    faqScript.textContent = JSON.stringify(faqStructuredData)
    document.head.appendChild(faqScript)

    return () => {
      if (document.head.contains(webAppScript)) {
        document.head.removeChild(webAppScript)
      }
      if (document.head.contains(faqScript)) {
        document.head.removeChild(faqScript)
      }
    }
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    const text = result 
      ? `私の性格を表す漢字は「${result.kanji}」でした！${result.reason}`
      : "AIが診断！あなたの性格を漢字1文字で表すと？"
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "AI漢字診断結果",
          text: text,
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "結果をコピーしました",
          description: "SNSでシェアして友達と比べてみよう！",
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
              { label: "AI漢字診断", href: "/tools/ai-1kanzi" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-4 md:mt-6">
          {/* ヘッダー */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 md:p-4 rounded-3xl shadow-xl">
                <Brain className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">AIが診断！あなたの性格を漢字1文字で表すと？</h1>
            <h2 className="text-base md:text-xl text-gray-600 mb-3 md:mb-4">AIがあなたの性格を漢字1文字で診断</h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4 mb-3">
              簡単な5つの選択式質問に答えるだけで、AIがあなたの性格を分析し、最も適した漢字1文字を選びます
            </p>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 md:p-5 max-w-2xl mx-auto mb-4">
              <p className="text-sm md:text-base font-bold text-red-700 text-center mb-2">
                ⚠️ 要注意！「悪」「陰」「邪」「怠」「愚」などの漢字も出る可能性あり
              </p>
              <p className="text-xs md:text-sm text-red-600 text-center">
                どんな漢字が出るかは予測不能！勇・光・優などの良い漢字も、悪・陰・邪などの悪い漢字も出る面白い診断です
              </p>
            </div>
          </div>

          {step === "intro" && (
            <>
              {/* 診断説明カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">AI漢字診断のやり方</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-white text-lg md:text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">5つの質問</h3>
                    <p className="text-xs md:text-sm text-gray-600">選択式の質問に答えるだけ（約2分）</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Brain className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">AI分析</h3>
                    <p className="text-xs md:text-sm text-gray-600">性格を漢字1文字で診断</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-white text-lg md:text-2xl font-bold">3</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">結果表示</h3>
                    <p className="text-xs md:text-sm text-gray-600">漢字1文字と詳細な説明</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startDiagnosis}
                    className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg touch-manipulation"
                  >
                    <Brain className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    診断を始める
                  </Button>
                </div>
              </Card>

              {/* 関連ツール（カテゴリ: 診断） */}
              <div className="mb-6 md:mb-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-1kanzi" limit={8} />
              </div>

              {/* 特徴 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-2">⚡</div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">2分で完了</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-2">💯</div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">完全無料</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-2">🔒</div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">登録不要</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-2">📱</div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">スマホ対応</p>
                </Card>
              </div>

              {/* 悪い漢字についての説明カード */}
              <Card className="bg-gradient-to-r from-gray-50 to-red-50 border-2 border-gray-200 rounded-xl p-6 md:p-8 mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                  🤔 悪い漢字が出たらどうする？
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      <strong className="text-red-600">「悪」「陰」「邪」</strong>などの漢字が出ても、それはあなたの性格の一部を表しているだけです。
                      悪い漢字にもそれぞれ意味があり、ユーモアを交えて解説します。
                      実際に診断してみると、意外と面白い結果になるかもしれません！
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-2">✅ 良い漢字の例</h4>
                      <p className="text-sm text-gray-600">
                        勇・光・優・愛・和・静・知・理・創・進
                      </p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-2">⚠️ 悪い漢字の例</h4>
                      <p className="text-sm text-gray-600">
                        悪・陰・邪・怠・愚・暗・冷・虚・偽・惰
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm md:text-base text-gray-700 font-semibold">
                      💡 どんな漢字が出るかは、あなたの回答次第！<br />
                      面白い結果を楽しみに診断してみてください
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {step === "questions" && (
            <>
              <DiagnosisForm
                answers={answers}
                currentQuestion={currentQuestion}
                onUpdateAnswer={updateAnswer}
                onNextQuestion={nextQuestion}
                onPreviousQuestion={previousQuestion}
                isAnalyzing={isAnalyzing}
              />
              
              {/* 診断中も関連ツール（診断）を表示 */}
              <div className="mt-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-1kanzi" limit={8} />
              </div>
            </>
          )}

          {step === "result" && result && (
            <>
              <DiagnosisResultComponent result={result} onShare={handleShare} onReset={resetDiagnosis} />
              
              {/* 診断結果後も関連ツール（診断）を表示 */}
              <div className="mt-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-1kanzi" limit={8} />
              </div>
            </>
          )}

          {/* SEO用コンテンツ */}
          <div className="mt-12 space-y-8">
            {/* メイン説明セクション */}
            <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AI漢字診断とは？</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>AI漢字診断</strong>は、心理学的アプローチとAI技術を組み合わせてあなたの性格を漢字1文字で診断する無料診断ツールです。
                わずか5つの選択式質問に答えるだけで、あなたの性格を最もよく表す漢字1文字を選び、詳細な説明を提供します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                朝の習慣、相談される内容、好きな色、最近の趣味、性格の5つの質問から総合的に判定し、
                あなたの性格を漢字1文字で表現。登録不要で完全無料、スマホからでも簡単にご利用いただけます。
              </p>
            </section>

            {/* 診断の特徴 */}
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">診断の特徴・メリット</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-purple-800 mb-3">🧠 高精度AI分析</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• 心理学的理論に基づく分析</li>
                    <li>• AI技術による高精度診断</li>
                    <li>• 漢字1文字での表現</li>
                    <li>• 個別化された特徴解説</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-pink-800 mb-3">⚡ 簡単・高速</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• わずか5つの選択式質問</li>
                    <li>• 約2分で診断完了</li>
                    <li>• 完全無料・登録不要</li>
                    <li>• スマホ・PC・タブレット対応</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* よくある質問 */}
            <section className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 漢字診断は無料ですか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 診断結果は信頼できますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 心理学的理論に基づいたAI分析システムを使用しており、参考値として信頼性の高い結果を提供しています。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 診断結果はどのように活用できますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 自己理解を深めるツールとして活用できます。SNSでシェアして友達と比べてみたり、
                    自分の特徴を理解することで、より良い人生の選択ができるでしょう。
                  </p>
                </div>
              </div>
            </section>

            {/* 関連キーワード */}
            <section className="text-center">
              <p className="text-xs text-gray-500">
                <strong>関連キーワード:</strong> AI漢字診断 性格診断 漢字1文字 性格分析 AI診断 無料診断 心理テスト 
                性格テスト 漢字診断 性格を漢字で表す 性格診断ツール
              </p>
            </section>
          </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}

