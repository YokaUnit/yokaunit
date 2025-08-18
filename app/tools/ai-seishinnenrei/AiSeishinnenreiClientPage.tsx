"use client"

import { useState, useEffect } from "react"
import { Brain, Sparkles, TrendingUp, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiagnosisForm } from "./components/DiagnosisForm"
import { DiagnosisResult as DiagnosisResultComponent } from "./components/DiagnosisResult"
import { useAiSeishinnenreiDiagnosis } from "./hooks/useAiSeishinnenreiDiagnosis"
import { toast } from "@/hooks/use-toast"

export default function AiSeishinnenreiClientPage() {
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
    analyzeMentalAgeLevel,
  } = useAiSeishinnenreiDiagnosis()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    // JSON-LD構造化データ（WebApplication）
    const webAppStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI精神年齢診断",
      "description": "AI技術を使用してユーザーの精神年齢・心理年齢を分析・診断する無料ツール",
      "url": "https://yokaunit.com/tools/ai-seishinnenrei",
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
        "AI分析による精神年齢診断",
        "実年齢との詳細比較",
        "個別化されたアドバイス",
        "完全無料・登録不要",
        "スマホ・PC対応",
        "結果シェア機能"
      ],
      "screenshot": "https://yokaunit.com/ogp/ai-seishinnenrei-diagnosis.png",
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
      "dateModified": new Date().toISOString().split('T')[0],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "892",
        "bestRating": "5"
      }
    }

    // 構造化データ（FAQ）
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "AI精神年齢診断は無料ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
          }
        },
        {
          "@type": "Question",
          "name": "精神年齢診断の精度はどの程度ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI分析と心理学的アプローチを組み合わせた独自のアルゴリズムにより、高精度な精神年齢診断を提供しています。"
          }
        },
        {
          "@type": "Question",
          "name": "どのような質問に答えるのですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "生活スタイル、趣味、コミュニケーション、ストレス対処、将来観の5つの選択式質問に答えるだけです。約2分で完了します。"
          }
        },
        {
          "@type": "Question",
          "name": "精神年齢と実年齢の違いは何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "実年齢は生まれてからの年数、精神年齢は心理的成熟度を表します。考え方や価値観、行動パターンから精神的な年齢を測定します。"
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
      ? `私の精神年齢は${result.mentalAge}歳でした！実年齢${result.realAge}歳との差は${result.ageDifference > 0 ? '+' : ''}${result.ageDifference}歳です。`
      : "AI精神年齢診断をやってみました！"
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "AI精神年齢診断結果",
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

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 rounded-3xl shadow-xl">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">AI精神年齢診断（無料）</h1>
            <h2 className="text-xl text-gray-600 mb-4">AIがあなたの心理年齢・メンタル年齢を数値化</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              簡単な5つの選択式質問に答えるだけで、AIがあなたの精神年齢を分析し、実年齢との差を詳しく解説します
            </p>
          </div>

          {step === "intro" && (
            <>
              {/* 診断説明カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">AI精神年齢診断のやり方</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2">年齢入力</h3>
                    <p className="text-sm text-gray-600">まずはあなたの実年齢を入力してください</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">2</span>
                    </div>
                    <h3 className="font-bold mb-2">5つの質問</h3>
                    <p className="text-sm text-gray-600">選択式の質問に答えるだけ（約2分）</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">AI分析</h3>
                    <p className="text-sm text-gray-600">精神年齢と実年齢の差を詳しく分析</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startDiagnosis}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    診断を始める
                  </Button>
                </div>
              </Card>

              {/* 精神年齢とは */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">精神年齢とは？</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      心理的成熟度
                    </h3>
                    <p className="text-gray-600 mb-4">考え方や価値観、行動パターンから測定される心の年齢です</p>
                    
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      実年齢との比較
                    </h3>
                    <p className="text-gray-600">実年齢より高ければ大人びており、低ければ若々しい心の持ち主です</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      診断できること
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-green-700 space-y-1">
                        <div>• あなたの精神的な年齢</div>
                        <div>• 実年齢との差と特徴</div>
                        <div>• 心理的タイプ診断</div>
                        <div>• 個別化されたアドバイス</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 特徴 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm font-semibold text-gray-700">2分で完了</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">💯</div>
                  <p className="text-sm font-semibold text-gray-700">完全無料</p>
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
            <DiagnosisForm
              answers={answers}
              currentQuestion={currentQuestion}
              onUpdateAnswer={updateAnswer}
              onNextQuestion={nextQuestion}
              onPreviousQuestion={previousQuestion}
              isAnalyzing={isAnalyzing}
            />
          )}

          {step === "result" && result && (
            <>
              <DiagnosisResultComponent result={result} onShare={handleShare} />
              
              <div className="text-center mt-8">
                <Button
                  onClick={resetDiagnosis}
                  variant="outline"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-xl"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  もう一度診断する
                </Button>
              </div>
            </>
          )}

          {/* SEO用コンテンツ */}
          <div className="mt-12 space-y-8">
            {/* メイン説明セクション */}
            <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AI精神年齢診断とは？</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>AI精神年齢診断</strong>は、心理学的アプローチとAI技術を組み合わせてあなたの精神年齢（心理年齢・メンタル年齢）を分析する無料診断ツールです。
                わずか5つの選択式質問に答えるだけで、実年齢との差や心理的特徴を詳しく解説します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                生活スタイル、価値観、コミュニケーション方法などから総合的に判定し、
                あなたの精神的な成熟度を数値化。登録不要で完全無料、スマホからでも簡単にご利用いただけます。
              </p>
            </section>

            {/* 診断の特徴 */}
            <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">診断の特徴・メリット</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-purple-800 mb-3">🧠 高精度AI分析</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• 心理学的理論に基づく分析</li>
                    <li>• AI技術による高精度診断</li>
                    <li>• 実年齢との詳細比較</li>
                    <li>• 個別化されたタイプ判定</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-800 mb-3">⚡ 簡単・高速</h3>
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
                  <h3 className="font-bold text-gray-800 mb-2">Q. 精神年齢が実年齢と大きく違うのは普通ですか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. はい、精神年齢と実年齢に差があるのは一般的です。人生経験や価値観、性格によって精神的成熟度は個人差があります。
                    大人びている人もいれば、若々しい心を持つ人もいて、それぞれに魅力があります。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 精神年齢は変化しますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 精神年齢は人生経験や環境の変化によって変動します。
                    新しい経験を積んだり、価値観が変わったりすることで、精神年齢も変化していきます。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 診断結果はどのように活用できますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 自己理解を深めるツールとして活用できます。人間関係や恋愛、キャリア選択の参考にしたり、
                    自分の特徴を理解することで、より良い人生の選択ができるでしょう。
                  </p>
                </div>
              </div>
            </section>

            {/* 関連キーワード */}
            <section className="text-center">
              <p className="text-xs text-gray-500">
                <strong>関連キーワード:</strong> AI精神年齢診断 心理年齢 メンタル年齢 精神年齢 無料診断 心理テスト 年齢診断 AI診断 心理分析 
                メンタル診断 精神年齢テスト 心理年齢チェック 精神的成熟度 心理的年齢 メンタルエイジ
              </p>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
