"use client"

import React, { useState } from "react"
import { Brain, Sparkles, TrendingUp, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DiagnosisForm } from "./components/DiagnosisForm"
import { DiagnosisResult as DiagnosisResultComponent } from "./components/DiagnosisResult"
import { useAiSeishinnenreiDiagnosis } from "./hooks/useAiSeishinnenreiDiagnosis"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"

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

        <div className="relative z-10 container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "AI精神年齢診断", href: "/tools/ai-seishinnenrei" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-4 md:mt-6">
          {/* ヘッダー */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 md:p-4 rounded-3xl shadow-xl">
                <Brain className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">AI精神年齢診断（無料）</h1>
            <h2 className="text-base md:text-xl text-gray-600 mb-3 md:mb-4">AIがあなたの心理年齢・メンタル年齢を数値化</h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4">
              簡単な5つの選択式質問に答えるだけで、AIがあなたの精神年齢を分析し、実年齢との差を詳しく解説します
            </p>
          </div>

          {step === "intro" && (
            <>
              {/* 診断説明カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">AI精神年齢診断のやり方</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-white text-lg md:text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">年齢入力</h3>
                    <p className="text-xs md:text-sm text-gray-600">まずはあなたの実年齢を入力してください</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-white text-lg md:text-2xl font-bold">2</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">5つの質問</h3>
                    <p className="text-xs md:text-sm text-gray-600">選択式の質問に答えるだけ（約2分）</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Brain className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 text-sm md:text-base">AI分析</h3>
                    <p className="text-xs md:text-sm text-gray-600">精神年齢と実年齢の差を詳しく分析</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startDiagnosis}
                    className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg touch-manipulation"
                  >
                    <Brain className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    診断を始める
                  </Button>
                </div>
              </Card>

              {/* 関連ツール（カテゴリ: 診断） */}
              <div className="mb-6 md:mb-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-seishinnenrei" limit={8} />
              </div>


              {/* 精神年齢とは */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">精神年齢とは？</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-purple-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      心理的成熟度
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">考え方や価値観、行動パターンから測定される心の年齢です</p>
                    
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-blue-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      実年齢との比較
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">実年齢より高ければ大人びており、低ければ若々しい心の持ち主です</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                      <div className="bg-green-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      診断できること
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 md:p-4 rounded-lg">
                      <div className="text-xs md:text-sm text-green-700 space-y-1">
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
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-seishinnenrei" limit={8} />
              </div>

            </>
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

              {/* 診断結果後も関連ツール（診断）を表示 */}
              <div className="mt-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="ai-seishinnenrei" limit={8} />
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
      </div>

      {/* SEO記事セクション */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🧠 精神年齢・心理年齢完全ガイド：AI診断の科学と心理学</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span>
                精神年齢とは？心理学とAI技術の融合
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                精神年齢（Mental Age）は、実年齢とは異なる心理的な成熟度を表す概念です。
                心理学では「心理年齢」「メンタル年齢」とも呼ばれ、個人の思考パターン、
                感情の成熟度、価値観、行動特性などを総合的に評価した指標です。
                近年のAI技術の発達により、従来の心理テストを超えた高度な分析が可能になりました。
              </p>
              <p className="text-gray-700 leading-relaxed">
                精神年齢は実年齢と必ずしも一致しません。20代でも精神年齢が40代の人もいれば、
                50代でも精神年齢が20代の人もいます。この違いは、人生経験、教育環境、
                性格特性、ストレス要因など様々な要因によって形成されます。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  精神年齢診断の科学的根拠
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-2">認知心理学理論</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ピアジェの発達段階理論、エリクソンの心理社会的発達理論に基づく
                      認知発達の評価。思考パターンと問題解決能力を分析。
                    </p>
                    <div className="text-xs text-gray-500">
                      感覚運動期 → 前操作期 → 具体的操作期 → 形式的操作期
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-2">感情知能理論</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ダニエル・ゴールマンのEQ理論に基づく感情の成熟度評価。
                      自己認識、感情制御、共感能力を総合的に分析。
                    </p>
                    <div className="text-xs text-gray-500">
                      自己認識 → 自己制御 → 動機づけ → 共感 → 社会的スキル
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-gray-900 mb-2">AI機械学習</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      自然言語処理、感情分析、パターン認識技術を活用。
                      大規模データセットから学習したモデルによる高精度分析。
                    </p>
                    <div className="text-xs text-gray-500">
                      深層学習 → 感情分析 → パターン認識 → 予測モデル
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  精神年齢の特徴と行動パターン
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-gray-900 mb-2">若い精神年齢の特徴</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 好奇心旺盛で新しいことに挑戦</li>
                      <li>• 柔軟な思考と創造性</li>
                      <li>• 楽観的で前向きな姿勢</li>
                      <li>• 社交的でコミュニケーション能力が高い</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-2">成熟した精神年齢の特徴</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 冷静で客観的な判断力</li>
                      <li>• 責任感と計画性</li>
                      <li>• 感情のコントロール能力</li>
                      <li>• 深い洞察力と経験に基づく知恵</li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-semibold text-gray-900 mb-2">バランスの取れた精神年齢</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 状況に応じた適応力</li>
                      <li>• 創造性と論理性の両立</li>
                      <li>• 感情と理性のバランス</li>
                      <li>• 個人と社会の調和</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧩</span>
                精神年齢に影響する要因と環境
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">内的要因</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>性格特性</strong>: ビッグファイブ（開放性、誠実性、外向性、協調性、神経症傾向）</li>
                    <li>• <strong>遺伝的素因</strong>: 生まれ持った気質と認知能力</li>
                    <li>• <strong>学習スタイル</strong>: 視覚型、聴覚型、体感型の違い</li>
                    <li>• <strong>動機づけ</strong>: 内発的動機と外発的動機のバランス</li>
                    <li>• <strong>ストレス耐性</strong>: 困難な状況への適応能力</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">外的要因</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>教育環境</strong>: 学校教育、家庭教育、社会教育の影響</li>
                    <li>• <strong>社会経験</strong>: 職業経験、人間関係、文化的背景</li>
                    <li>• <strong>ライフイベント</strong>: 結婚、出産、転職、引っ越しなどの変化</li>
                    <li>• <strong>メディア環境</strong>: テレビ、インターネット、SNSの影響</li>
                    <li>• <strong>経済状況</strong>: 収入、生活水準、経済的安定性</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                AI精神年齢診断の技術と精度
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">自然言語処理</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    BERT / GPT-3<br/>
                    感情分析<br/>
                    意図理解
                  </div>
                  <p className="text-sm text-gray-600">
                    回答テキストから感情、意図、価値観を抽出。
                    文脈を理解した高度な分析を実現。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">機械学習モデル</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    深層学習<br/>
                    パターン認識<br/>
                    予測分析
                  </div>
                  <p className="text-sm text-gray-600">
                    大規模データセットから学習したモデル。
                    個人の回答パターンを高精度で分析。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">心理学的指標</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    認知発達段階<br/>
                    感情成熟度<br/>
                    社会的スキル
                  </div>
                  <p className="text-sm text-gray-600">
                    心理学理論に基づく評価指標。
                    科学的根拠のある診断結果を提供。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                精神年齢診断の限界と注意点
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">診断の限界</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1 text-red-600">診断の限界</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 一時的な心理状態の影響</li>
                        <li>• 文化的背景の違い</li>
                        <li>• 質問の解釈の個人差</li>
                        <li>• 診断時の環境要因</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1 text-green-600">正しい活用方法</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 自己理解の参考として活用</li>
                        <li>• 定期的な再診断で変化を追跡</li>
                        <li>• 複数の診断結果を総合的に判断</li>
                        <li>• 専門家の意見も参考にする</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">診断結果の解釈</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>相対的指標</strong>: 絶対的な値ではなく、相対的な比較として理解</li>
                    <li>• <strong>変化の可能性</strong>: 精神年齢は経験や学習によって変化する</li>
                    <li>• <strong>個別性の尊重</strong>: 個人の価値観や目標を尊重した解釈</li>
                    <li>• <strong>成長の機会</strong>: 診断結果を自己成長のきっかけとして活用</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                精神年齢の向上と自己成長
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">成長のための実践方法</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">認知能力の向上</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 読書と学習の習慣化</li>
                        <li>• 新しいスキルの習得</li>
                        <li>• 問題解決能力の訓練</li>
                        <li>• 批判的思考力の開発</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">感情知能の向上</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• マインドフルネス瞑想</li>
                        <li>• 感情の認識と表現</li>
                        <li>• 共感能力の育成</li>
                        <li>• ストレス管理技術</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">YokaUnit AI精神年齢診断の特徴</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>AI感情分析</strong>: 自然言語処理による高度な感情分析</li>
                    <li>• <strong>個別化された診断</strong>: 個人の回答パターンに基づく精密分析</li>
                    <li>• <strong>実年齢との比較</strong>: 実年齢との差を詳細に解説</li>
                    <li>• <strong>成長アドバイス</strong>: 診断結果に基づく具体的な改善提案</li>
                    <li>• <strong>プライバシー保護</strong>: ブラウザ内完結でデータ漏洩リスクなし</li>
                    <li>• <strong>無料診断</strong>: 登録不要でいつでも利用可能</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                精神年齢と社会・文化の関係
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">文化的背景の影響</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">東洋的価値観</h5>
                      <p className="text-xs text-gray-600">
                        集団調和、謙虚さ、長期的視点、
                        世代間の尊重、伝統的価値観の重視
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">西洋的価値観</h5>
                      <p className="text-xs text-gray-600">
                        個人主義、自己表現、短期的成果、
                        平等主義、革新的思考の重視
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">現代社会の影響</h5>
                      <p className="text-xs text-gray-600">
                        SNS、グローバル化、情報化社会、
                        多様性の受容、変化への適応
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">世代間の違い</h5>
                      <p className="text-xs text-gray-600">
                        デジタルネイティブ、価値観の多様化、
                        ライフスタイルの変化、働き方の変化
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">社会適応と精神年齢</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>職場での適応</strong>: コミュニケーション能力、リーダーシップ、協調性</li>
                    <li>• <strong>人間関係の構築</strong>: 共感能力、信頼関係、社会的スキル</li>
                    <li>• <strong>人生の選択</strong>: 結婚、出産、転職、引退などの重要な決断</li>
                    <li>• <strong>ストレス対処</strong>: 困難な状況への適応、レジリエンス</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                YokaUnitのAI精神年齢診断は、最新の心理学理論とAI技術を融合させた
                高精度な診断ツールです。この記事が、精神年齢の理解と自己成長に役立てば幸いです。
              </p>
              <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                <span>#精神年齢診断</span>
                <span>#心理年齢</span>
                <span>#AI診断</span>
                <span>#心理テスト</span>
                <span>#自己理解</span>
                <span>#心理学</span>
                <span>#YokaUnit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
	  
	      {/* ページ最下部に最新のツール */}
	      <div className="max-w-4xl mx-auto mt-12 px-4">
	        <RelatedTools currentToolSlug="ai-seishinnenrei" />
	      </div>

	      <SiteFooter />
    </>
  )
}
