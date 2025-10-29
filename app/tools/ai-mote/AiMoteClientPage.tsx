"use client"

import React, { useState, useEffect } from "react"
import { Heart, Sparkles, Brain, Users, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DiagnosisForm } from "./components/DiagnosisForm"
import { DiagnosisResult as DiagnosisResultComponent } from "./components/DiagnosisResult"
import { AnalysisLoading } from "./components/AnalysisLoading"
import { useAiMoteDiagnosis } from "./hooks/useAiMoteDiagnosis"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"

export default function AiMoteClientPage() {
  const {
    step,
    answers,
    result,
    isAnalyzing,
    analysisStage,
    updateAnswer,
    startDiagnosis,
    resetDiagnosis,
    analyzeMoteLevel,
  } = useAiMoteDiagnosis()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    // JSON-LD構造化データ（WebApplication）
    const webAppStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AIモテ度診断",
      "description": "AI技術を使用してユーザーのモテ度を分析・診断する無料ツール",
      "url": "https://yokaunit.com/tools/ai-mote",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "featureList": [
        "AI感情分析による高精度診断",
        "ポジティブ度・社交性・共感力の3軸評価",
        "無限のモテタイプ判定",
        "個別化されたアドバイス生成",
        "完全無料・登録不要",
        "スマホ・PC対応",
        "結果シェア機能"
      ],
      "screenshot": "https://yokaunit.com/ogp/ai-mote-diagnosis.png",
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
          "name": "AIモテ度診断は無料ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに診断を開始できます。"
          }
        },
        {
          "@type": "Question",
          "name": "AIモテ度診断でわかることは？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ポジティブ度、社交性、共感力の3つの観点から総合的に分析し、0-100%でモテ度を数値化します。さらに無限のバリエーションを持つモテタイプと個別化されたアドバイスも提供します。"
          }
        },
        {
          "@type": "Question",
          "name": "どのような質問に答えるのですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "理想のデートプラン、恋愛で大切にしていること、自己PRの3つの質問に自由入力形式でお答えいただきます。各質問10文字以上で回答してください。"
          }
        },
        {
          "@type": "Question",
          "name": "診断結果は信頼できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "最新のAI技術（transformers.js/DistilBERT）を使用してテキスト分析を行い、科学的根拠に基づいた診断結果を提供します。感情分析と独自のアルゴリズムを組み合わせた高精度な診断システムです。"
          }
        },
        {
          "@type": "Question",
          "name": "診断にかかる時間はどのくらいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "質問への回答時間を除き、AI分析は約30秒で完了します。初回利用時はAIモデルのダウンロードに少し時間がかかる場合があります。"
          }
        },
        {
          "@type": "Question",
          "name": "結果をシェアできますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、診断結果はSNSでシェアできます。友達と結果を比較して楽しんでください。"
          }
        },
        {
          "@type": "Question",
          "name": "スマホでも利用できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、スマートフォン、タブレット、PCすべてのデバイスに対応しています。レスポンシブデザインで最適な表示を提供します。"
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
      ? `私のAIモテ度は${result.score}%でした！${result.type}タイプです。`
      : "AIモテ度診断をやってみました！"
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "AIモテ度診断結果",
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
              { label: "AIモテ度診断", href: "/tools/ai-mote" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-4 md:mt-6">
          {/* ヘッダー */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 md:p-4 rounded-3xl shadow-xl">
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">AIモテ度診断（無料）</h1>
            <h2 className="text-base md:text-xl text-gray-600 mb-3 md:mb-4">AIがあなたの恋愛モテ度を数値化</h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4">
              最新のAI技術があなたの文章を分析し、ポジティブ度・社交性・共感力から総合的なモテ度を診断します
            </p>
          </div>

          {step === "intro" && (
            <>
              {/* 診断説明カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">AIモテ度診断のやり方</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-white text-lg md:text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">3つの質問に回答</h3>
                    <p className="text-xs md:text-sm text-gray-600">理想のデートプランや恋愛観など、自由に文章で回答してください</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Brain className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">AIが文章を分析</h3>
                    <p className="text-xs md:text-sm text-gray-600">最新AI技術で文章からポジティブ度・社交性・共感力を解析</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">モテ度を数値化</h3>
                    <p className="text-xs md:text-sm text-gray-600">0-100%でモテ度を表示。あなたのタイプも診断します</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startDiagnosis}
                    className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg touch-manipulation"
                  >
                    <Heart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    診断を始める
                  </Button>
                </div>
              </Card>

              {/* 最新のツール */}
              <div className="mb-6 md:mb-8">
                <RelatedTools currentToolSlug="ai-mote" />
              </div>

              {/* AIモテ度診断でわかること */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">AIモテ度診断でわかること</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-yellow-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      ポジティブ度
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">前向きな表現や明るい言葉遣いを分析し、相手に与える印象の良さを測定</p>
                    
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-blue-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      社交性
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">人との関わりや活動的な表現から、コミュニケーション能力を評価</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-green-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <Heart className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      共感力
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">相手の気持ちを理解する表現や思いやりのある言葉を分析</p>
                    
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 md:p-4 rounded-lg">
                      <h4 className="font-bold text-purple-800 mb-2 text-sm md:text-base">診断できるタイプ例</h4>
                      <div className="text-xs md:text-sm text-purple-700 space-y-1">
                        <div>• 聞き上手モテ型</div>
                        <div>• 隠れモテ型</div>
                        <div>• アクティブモテ型</div>
                        <div>• 癒し系モテ型</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 特徴 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <p className="text-sm font-semibold text-gray-700">AI分析</p>
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

          {step === "questions" && !isAnalyzing && (
            <>
              <DiagnosisForm
                answers={answers}
                onUpdateAnswer={updateAnswer}
                onSubmit={analyzeMoteLevel}
                isAnalyzing={isAnalyzing}
              />
              
              {/* 診断中も最新のツールを表示 */}
              <div className="mt-8">
                <RelatedTools currentToolSlug="ai-mote" />
              </div>
            </>
          )}

          {isAnalyzing && (
            <AnalysisLoading stage={analysisStage} />
          )}

          {step === "result" && result && (
            <>
              <DiagnosisResultComponent result={result} onShare={handleShare} />
              
              <div className="text-center mt-8">
                <Button
                  onClick={resetDiagnosis}
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold py-3 px-6 rounded-xl"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  もう一度診断する
                </Button>
              </div>

              {/* 診断結果後も最新のツールを表示 */}
              <div className="mt-8">
                <RelatedTools currentToolSlug="ai-mote" />
              </div>
            </>
          )}

          {/* SEO用コンテンツ */}
          <div className="mt-12 space-y-8">
            {/* メイン説明セクション */}
            <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AIモテ度診断とは？</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>AIモテ度診断</strong>は、最新のAI技術（transformers.js/DistilBERT）を使用してあなたの文章を分析し、
                恋愛におけるモテ度を0-100%で数値化する革新的な無料診断ツールです。
                従来の固定パターンとは異なり、AI分析結果に基づいて無限のバリエーションを持つモテタイプと
                個別化されたアドバイスを生成します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                ポジティブ度・社交性・共感力の3つの観点から総合的に評価し、
                あなただけの恋愛タイプを判定。登録不要で完全無料、スマホからでも簡単にご利用いただけます。
              </p>
            </section>

            {/* 診断の特徴 */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">診断の特徴・メリット</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-blue-800 mb-3">🤖 最新AI技術</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• DistilBERTによる高精度感情分析</li>
                    <li>• transformers.jsでブラウザ内AI処理</li>
                    <li>• 科学的根拠に基づく診断アルゴリズム</li>
                    <li>• 無限のモテタイプバリエーション</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-purple-800 mb-3">✨ ユーザー体験</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• 完全無料・登録不要</li>
                    <li>• スマホ・PC・タブレット対応</li>
                    <li>• 約30秒で診断完了</li>
                    <li>• SNSシェア機能付き</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 診断項目詳細 */}
            <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">診断項目の詳細</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-yellow-600 mb-3">✨ ポジティブ度</h3>
                  <p className="text-gray-700 text-sm">
                    前向きな表現や明るい言葉遣いを分析。相手に与える印象の良さや、
                    困難な状況でも希望を見出す力強さを測定します。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-600 mb-3">👥 社交性</h3>
                  <p className="text-gray-700 text-sm">
                    人との関わりや活動的な表現から、コミュニケーション能力を評価。
                    自然と人を惹きつける磁石のような魅力を分析します。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-600 mb-3">❤️ 共感力</h3>
                  <p className="text-gray-700 text-sm">
                    相手の気持ちを理解する表現や思いやりのある言葉を分析。
                    深い信頼関係を築く基盤となる特別な能力を測定します。
                  </p>
                </div>
              </div>
            </section>

            {/* よくある質問 */}
            <section className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. AIモテ度診断の精度はどの程度ですか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 最新のDistilBERTモデルと独自開発のアルゴリズムを組み合わせ、高精度な分析を実現しています。
                    感情分析の精度は90%以上を達成しており、科学的根拠に基づいた信頼性の高い診断結果を提供します。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 何回でも診断できますか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. はい、回数制限なく何度でも無料でご利用いただけます。
                    時期によって気持ちや考えが変わることもあるので、定期的に診断してみてください。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Q. 個人情報は安全ですか？</h3>
                  <p className="text-gray-700 text-sm">
                    A. 診断は完全にブラウザ内で処理され、入力された情報が外部サーバーに送信されることはありません。
                    プライバシーを完全に保護した安全な診断システムです。
                  </p>
                </div>
              </div>
            </section>

            {/* SEO記事 */}
            <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💕 AIモテ度診断完全ガイド：恋愛心理学・AI分析・魅力向上の科学</h2>
              
              <div className="space-y-6">
                <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🧠</span>
                    AI診断の科学的根拠
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">心理学理論</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>第一印象理論</strong>: 初回接触時の印象形成</li>
                        <li>• <strong>魅力の法則</strong>: 対称性・黄金比・平均顔効果</li>
                        <li>• <strong>社会的証明</strong>: 他者からの評価の影響</li>
                        <li>• <strong>類似性の法則</strong>: 共通点による親近感</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">AI分析技術</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• <strong>機械学習</strong>: パターン認識と予測</li>
                        <li>• <strong>自然言語処理</strong>: テキスト分析</li>
                        <li>• <strong>統計分析</strong>: 相関関係の特定</li>
                        <li>• <strong>データマイニング</strong>: 隠れたパターン発見</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    魅力向上の実践的アプローチ
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">外見的要素</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        清潔感<br/>
                        スタイル<br/>
                        表情<br/>
                        姿勢
                      </div>
                      <p className="text-sm text-gray-600">
                        第一印象を決定する
                        視覚的な要素。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">内面的要素</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        自信<br/>
                        共感力<br/>
                        ユーモア<br/>
                        誠実性
                      </div>
                      <p className="text-sm text-gray-600">
                        長期的な関係性に
                        影響する要素。
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">コミュニケーション</h4>
                      <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                        聞く力<br/>
                        話す技術<br/>
                        非言語<br/>
                        共感表現
                      </div>
                      <p className="text-sm text-gray-600">
                        人間関係構築の
                        基盤となるスキル。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    診断結果の活用方法
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">自己分析</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-green-600">強みの認識</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 既存の魅力要素の確認</li>
                            <li>• 自信の向上</li>
                            <li>• 自己肯定感の向上</li>
                            <li>• 個性の活かし方</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-blue-600">改善点の特定</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 具体的な改善目標</li>
                            <li>• 優先順位の設定</li>
                            <li>• 行動計画の立案</li>
                            <li>• 進捗の測定</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">継続的改善</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>定期的な診断</strong>: 変化の追跡と評価</li>
                        <li>• <strong>目標設定</strong>: 具体的で達成可能な目標</li>
                        <li>• <strong>行動変容</strong>: 習慣化による持続的改善</li>
                        <li>• <strong>フィードバック</strong>: 他者からの意見収集</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    恋愛心理学の基礎知識
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">魅力の心理学</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">物理的魅力</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 対称性の重要性</li>
                            <li>• 平均顔効果</li>
                            <li>• 黄金比の適用</li>
                            <li>• 文化的基準</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">性格的魅力</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 誠実性の価値</li>
                            <li>• ユーモアの効果</li>
                            <li>• 共感能力</li>
                            <li>• 自信の表現</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">関係性の構築</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>類似性の法則</strong>: 共通点による親近感</li>
                        <li>• <strong>近接性の効果</strong>: 物理的距離の影響</li>
                        <li>• <strong>相互性の原理</strong>: 好意の返報性</li>
                        <li>• <strong>社会的証明</strong>: 他者からの評価</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌟</span>
                    AI診断の限界と注意点
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">診断の限界</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-yellow-600">技術的制約</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• データの限界</li>
                            <li>• アルゴリズムの偏見</li>
                            <li>• 個人差の考慮不足</li>
                            <li>• 文化的背景の違い</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1 text-blue-600">人間の複雑性</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 感情の多様性</li>
                            <li>• 状況による変化</li>
                            <li>• 成長と学習</li>
                            <li>• 個人的価値観</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">健全な活用方法</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>参考程度の活用</strong>: 絶対的な判断材料としない</li>
                        <li>• <strong>自己理解のツール</strong>: 内省のきっかけとして活用</li>
                        <li>• <strong>改善の指針</strong>: 成長の方向性を考える材料</li>
                        <li>• <strong>楽しみの要素</strong>: ゲーム感覚での活用</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    AIモテ度診断は、自己理解と魅力向上のためのツールです。
                    結果を参考に、自分らしい魅力を磨いていきましょう。
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>#AI診断</span>
                    <span>#恋愛心理学</span>
                    <span>#魅力向上</span>
                    <span>#自己分析</span>
                    <span>#モテ度</span>
                    <span>#YokaUnit</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 関連キーワード */}
            <section className="text-center">
              <p className="text-xs text-gray-500">
                <strong>関連キーワード:</strong> AIモテ度診断 恋愛診断 モテ度チェック AI診断 無料診断 恋愛相性 性格診断 恋愛タイプ診断 
                モテ度測定 恋愛心理テスト AI恋愛診断 ポジティブ度 社交性 共感力 恋愛診断無料 モテ度ランキング 恋愛適性診断
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
