"use client"

import React, { useState, useEffect } from "react"
import { Shield, Sparkles, TrendingUp, RotateCcw, Share2, Brain, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StressCheckForm } from "./components/StressCheckForm"
import { StressCheckResult as StressCheckResultComponent } from "./components/StressCheckResult"
import { useStressCheck } from "./hooks/useStressCheck"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"
import { ToolHeroImage } from "@/components/tool-hero-image"

interface StressCheckClientPageProps {
  toolImageUrl?: string | null
  toolTitle?: string
}

export default function StressCheckClientPage({ toolImageUrl = null, toolTitle = "ストレス耐性診断" }: StressCheckClientPageProps) {
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
    analyzeStressLevel,
  } = useStressCheck()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    // JSON-LD構造化データ（WebApplication）
    const webAppStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ストレス耐性診断",
      "description": "AI技術を使用してユーザーのストレス耐性・メンタルの強さを分析・診断する無料ツール",
      "url": "https://yokaunit.com/tools/stress-check",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "featureList": [
        "6つの専門的質問による診断",
        "AI分析によるストレス耐性測定",
        "個別化されたアドバイス",
        "リスクレベル判定",
        "完全無料・登録不要",
        "スマホ・PC対応",
        "結果シェア機能"
      ],
      "screenshot": "https://yokaunit.com/ogp/stress-check-diagnosis.png",
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
          "name": "ストレス耐性診断は無料ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
          }
        },
        {
          "@type": "Question",
          "name": "ストレス耐性診断の精度はどの程度ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "心理学的理論とAI分析を組み合わせた独自のアルゴリズムにより、高精度なストレス耐性診断を提供しています。"
          }
        },
        {
          "@type": "Question",
          "name": "どのような質問に答えるのですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "仕事量・プレッシャー・変化への適応・人間関係・回復力・生活習慣の6つの分野について選択式質問に答えます。約3分で完了します。"
          }
        },
        {
          "@type": "Question",
          "name": "診断結果はどのように活用できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "自分のストレス耐性を客観的に把握し、メンタルヘルス管理や職場環境の改善、ストレス対処法の習得に活用できます。"
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
      ? `私のストレス耐性レベルは${result.stressLevel}点でした！タイプは「${result.stressType}」です。`
      : "ストレス耐性診断をやってみました！"
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ストレス耐性診断結果",
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
              { label: "ストレス耐性診断", href: "/tools/stress-check" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ツール画像 */}
            {toolImageUrl && (
              <ToolHeroImage imageUrl={toolImageUrl} title={toolTitle} />
            )}
          
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-3xl shadow-xl">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">ストレス耐性診断（無料）</h1>
            <h2 className="text-lg md:text-xl text-gray-600 mb-4">AIがあなたの心の強さ・メンタル耐性を数値化</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              6つの専門的な質問に答えるだけで、AIがあなたのストレス耐性を分析し、個別のアドバイスを提供します
            </p>
          </div>

          {step === "intro" && (
            <>
              {/* 診断説明カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">ストレス耐性診断のやり方</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2">6つの質問</h3>
                    <p className="text-sm text-gray-600">仕事・人間関係・回復力など6分野の質問</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">2</span>
                    </div>
                    <h3 className="font-bold mb-2">AI分析</h3>
                    <p className="text-sm text-gray-600">選択式回答をAIが総合分析（約3分）</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">結果表示</h3>
                    <p className="text-sm text-gray-600">ストレス耐性レベルと個別アドバイス</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startDiagnosis}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-lg"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    診断を始める
                  </Button>
                </div>
              </Card>

              {/* 最新のツール */}
              <div className="mb-8">
                <RelatedTools currentToolSlug="stress-check" />
              </div>

              {/* ストレス耐性とは */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">ストレス耐性とは？</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      心の強さ・回復力
                    </h3>
                    <p className="text-gray-600 mb-4">ストレスや困難な状況に対処し、回復する能力です</p>
                    
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      メンタルヘルス指標
                    </h3>
                    <p className="text-gray-600">仕事や人間関係でのパフォーマンスに直結する重要な指標です</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      診断できること
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-purple-700 space-y-1">
                        <div>• あなたのストレス耐性レベル</div>
                        <div>• プレッシャー対応能力</div>
                        <div>• 変化への適応力</div>
                        <div>• 回復力・レジリエンス</div>
                        <div>• 個別改善アドバイス</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 特徴 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm font-semibold text-gray-700">3分で完了</p>
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
            <>
              <StressCheckForm
                answers={answers}
                currentQuestion={currentQuestion}
                onUpdateAnswer={updateAnswer}
                onNextQuestion={nextQuestion}
                onPreviousQuestion={previousQuestion}
                isAnalyzing={isAnalyzing}
              />
              
              {/* 診断中も最新のツールを表示 */}
              <div className="mt-8">
                <RelatedTools currentToolSlug="stress-check" />
              </div>
            </>
          )}

          {step === "result" && result && (
            <>
              <StressCheckResultComponent result={result} onShare={handleShare} />
              
              <div className="text-center mt-8">
                <Button
                  onClick={resetDiagnosis}
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  もう一度診断する
                </Button>
              </div>

              {/* 診断結果後も最新のツールを表示 */}
              <div className="mt-8">
                <RelatedTools currentToolSlug="stress-check" />
              </div>
            </>
          )}

          {/* SEO用コンテンツ */}
          <div className="mt-12 space-y-8">
            {/* メイン説明セクション */}
            <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ストレス耐性診断とは？</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>ストレス耐性診断</strong>は、心理学的アプローチとAI技術を組み合わせてあなたのストレス耐性・メンタルの強さを分析する無料診断ツールです。
                6つの専門的な質問に答えるだけで、仕事や人間関係でのストレス対処能力を詳しく解説します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                プレッシャー耐性、変化への適応力、回復力などを総合的に判定し、
                あなたのメンタルヘルス状態を数値化。登録不要で完全無料、スマホからでも簡単にご利用いただけます。
              </p>
            </section>

            {/* 診断の特徴 */}
            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">診断の特徴・メリット</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-blue-800 mb-3">🧠 高精度AI分析</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• 心理学的理論に基づく分析</li>
                    <li>• AI技術による高精度診断</li>
                    <li>• 6分野の総合的評価</li>
                    <li>• 個別化されたタイプ判定</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cyan-800 mb-3">⚡ 簡単・高速</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• わずか6つの選択式質問</li>
                    <li>• 約3分で診断完了</li>
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
                  <h3 className="font-bold text-gray-800 mb-2">Q. ストレス耐性が低いと診断された場合はどうすればいいですか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. まずは十分な休息を取り、規則正しい生活習慣を心がけることが大切です。
                    運動やリラクゼーション技法を取り入れ、必要に応じて専門家に相談することをお勧めします。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. ストレス耐性は向上させることができますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. はい、適切なトレーニングと生活習慣の改善により、ストレス耐性は向上させることができます。
                    マインドフルネス、運動、十分な睡眠などが効果的です。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 診断結果はどのように活用できますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 自分のストレス耐性を客観的に把握し、メンタルヘルス管理や職場環境の改善、
                    ストレス対処法の習得に活用できます。キャリア選択の参考にもなります。
                  </p>
                </div>
              </div>
            </section>

            {/* 関連キーワード */}
            <section className="text-center">
              <p className="text-xs text-gray-500">
                <strong>関連キーワード:</strong> ストレス耐性診断 ストレス診断 メンタル診断 ストレス耐性 ストレスチェック 心理診断 
                メンタルヘルス ストレス管理 プレッシャー耐性 回復力診断 レジリエンス 無料診断 AI診断 心の強さ ストレス対処法
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
