"use client"

import React, { useState, useEffect } from "react"
import { Star, Sparkles, Heart, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FortuneForm } from "./components/FortuneForm"
import { FortuneResult } from "./components/FortuneResult"
import { FortuneLoading } from "./components/FortuneLoading"
import { useFortuneTeller } from "./hooks/useFortuneTeller"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"

export default function FortuneTodayClientPage() {
  const {
    step,
    input,
    result,
    isCalculating,
    startFortune,
    calculateFortuneResult,
    resetFortune,
  } = useFortuneTeller()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    // JSON-LD構造化データ（WebApplication）
    const webAppStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "今日の運勢占い",
      "description": "AI技術を使用して星座と今日の行動から運勢を分析・診断する無料占いツール",
      "url": "https://yokaunit.com/tools/fortune-today",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "featureList": [
        "12星座対応の運勢診断",
        "今日の行動を考慮した個別診断",
        "総合運・恋愛運・仕事運・金運の4項目評価",
        "ラッキー行動とアドバイス提供",
        "完全無料・登録不要",
        "スマホ・PC対応",
        "結果シェア機能"
      ],
      "screenshot": "https://yokaunit.com/ogp/fortune-today.png",
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
          "name": "今日の運勢占いは無料ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、完全無料でご利用いただけます。登録も不要で、すぐに占いを開始できます。"
          }
        },
        {
          "@type": "Question",
          "name": "運勢はどのように計算されますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "あなたの星座、今日の日付、予定している行動を総合的に分析し、独自のアルゴリズムで運勢を計算します。同じ内容でも日によって結果が変わる仕様になっています。"
          }
        },
        {
          "@type": "Question",
          "name": "どのような運勢がわかりますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "総合運、恋愛運、仕事運、金運の4つの運勢を0-100のスコアで表示します。さらに今日のラッキー行動、気をつけること、個別のアドバイスも提供します。"
          }
        },
        {
          "@type": "Question",
          "name": "何回でも占えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、回数制限なく何度でも無料でご利用いただけます。異なる行動を入力することで、様々なパターンの運勢を確認できます。"
          }
        },
        {
          "@type": "Question",
          "name": "占い結果は当たりますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "この占いは娯楽目的のツールです。結果は参考程度にお楽しみいただき、重要な決定は必ずご自身の判断で行ってください。"
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
    const text = result && input
      ? `私の今日の運勢は総合運${result.totalFortune}%でした！${input.zodiacSign}×${input.todayAction}の結果です。`
      : "今日の運勢占いをやってみました！"
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "今日の運勢占い結果",
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
              { label: "今日の運勢", href: "/tools/fortune-today" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-3xl shadow-xl">
                  <Star className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                🔮 今日の運勢｜無料占い・星座占い
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                <strong>今日の運勢を無料で占える星座占いツール。</strong>12星座別に<strong>総合運・恋愛運・仕事運・金運</strong>を診断し、
                ラッキー行動とアドバイスを提供。<strong>毎日更新される運勢で今日一日を素敵に過ごそう。</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { label: '🆓 完全無料', color: 'bg-green-100 text-green-800' },
                  { label: '🔮 12星座対応', color: 'bg-purple-100 text-purple-800' },
                  { label: '💕 恋愛運診断', color: 'bg-pink-100 text-pink-800' },
                  { label: '💼 仕事運診断', color: 'bg-blue-100 text-blue-800' },
                  { label: '💰 金運診断', color: 'bg-yellow-100 text-yellow-800' },
                  { label: '🍀 ラッキー行動', color: 'bg-indigo-100 text-indigo-800' },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {step === "intro" && (
              <>
                {/* 占い説明カード */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-center mb-6">今日の運勢占いのやり方</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-bold mb-2">星座を選択</h3>
                      <p className="text-sm text-gray-600">12星座からあなたの星座を選んでください</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">今日の行動を入力</h3>
                      <p className="text-sm text-gray-600">プレゼン、デート、勉強など今日の予定を入力</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">運勢を確認</h3>
                      <p className="text-sm text-gray-600">4つの運勢とアドバイスを確認</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={startFortune}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg"
                    >
                      <Star className="h-5 w-5 mr-2" />
                      占いを始める
                    </Button>
                  </div>
                </Card>

                {/* 占いでわかること */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-center mb-6">今日の運勢AIでわかること</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        総合運
                      </h3>
                      <p className="text-gray-600 mb-4">今日一日の全体的な運気を0-100で数値化</p>
                      
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        恋愛運
                      </h3>
                      <p className="text-gray-600">恋愛関係や人間関係での運気を診断</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        仕事運
                      </h3>
                      <p className="text-gray-600 mb-4">仕事や学業での成功度を予測</p>
                      
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs">¥</span>
                        </div>
                        金運
                      </h3>
                      <p className="text-gray-600">お金に関する運気と注意点</p>
                    </div>
                  </div>
                </Card>

                {/* 特徴 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                    <div className="text-2xl mb-2">🔮</div>
                    <p className="text-sm font-semibold text-gray-700">12星座対応</p>
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

                      {step === "input" && !isCalculating && (
            <FortuneForm
              onSubmit={calculateFortuneResult}
              isLoading={isCalculating}
            />
          )}

          {isCalculating && input && (
            <FortuneLoading
              zodiacSign={input.zodiacSign}
              todayAction={input.todayAction}
            />
          )}

            {step === "result" && result && input && (
              <>
                <FortuneResult
                  result={result}
                  zodiacSign={input.zodiacSign}
                  todayAction={input.todayAction}
                  onShare={handleShare}
                  onReset={resetFortune}
                />
              </>
            )}

            {/* SEO用コンテンツ */}
            <div className="mt-12 space-y-8">
              {/* メイン説明セクション */}
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">今日の運勢占いとは？</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>今日の運勢占い</strong>は、あなたの星座と今日予定している行動を組み合わせて、
                  その日の運勢を総合的に診断する無料の占いツールです。
                  従来の星座占いとは異なり、あなたの具体的な行動予定も考慮することで、
                  より個人的で実用的な運勢アドバイスを提供します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  総合運・恋愛運・仕事運・金運の4つの観点から運気を0-100で数値化し、
                  今日のラッキー行動や気をつけるべきポイントも合わせてお伝えします。
                  登録不要で完全無料、スマホからでも簡単にご利用いただけます。
                </p>
              </section>

              {/* 占いの特徴 */}
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">今日の運勢占いの特徴</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg text-purple-800 mb-3">🔮 12星座対応の本格占い</h3>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>牡羊座から魚座まで全12星座対応</strong></li>
                      <li>• 総合運・恋愛運・仕事運・金運を数値化</li>
                      <li>• 毎日更新される運勢結果</li>
                      <li>• 星座の特性を活かしたアドバイス</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-pink-800 mb-3">✨ 無料で簡単</h3>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>完全無料・登録不要</strong></li>
                      <li>• スマホ・PC・タブレット対応</li>
                      <li>• 約1分で診断完了</li>
                      <li>• ラッキー行動とアドバイス付き</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* よくある質問 */}
              <section className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Q. 占い結果の精度はどの程度ですか？</h3>
                    <p className="text-gray-700 text-sm">
                      A. この占いは娯楽目的のツールです。星座の特性と行動パターンを組み合わせた
                      独自のアルゴリズムを使用していますが、結果は参考程度にお楽しみください。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Q. 同じ内容で占っても結果が変わるのはなぜ？</h3>
                    <p className="text-gray-700 text-sm">
                      A. 日付をシードとして使用しているため、同じ星座・同じ行動でも
                      日によって異なる結果が出る仕様になっています。これにより毎日新鮮な気持ちで占いを楽しめます。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Q. どのような行動を入力すれば良いですか？</h3>
                    <p className="text-gray-700 text-sm">
                      A. プレゼン、デート、勉強、買い物、友達と会うなど、今日予定している具体的な行動を
                      自由に入力してください。行動の内容によって運勢の結果が変わります。
                    </p>
                  </div>
                </div>
              </section>

              {/* 12星座一覧 */}
              <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">対応星座一覧</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                  {[
                    { name: "牡羊座", period: "3/21-4/19", emoji: "♈" },
                    { name: "牡牛座", period: "4/20-5/20", emoji: "♉" },
                    { name: "双子座", period: "5/21-6/21", emoji: "♊" },
                    { name: "蟹座", period: "6/22-7/22", emoji: "♋" },
                    { name: "獅子座", period: "7/23-8/22", emoji: "♌" },
                    { name: "乙女座", period: "8/23-9/22", emoji: "♍" },
                    { name: "天秤座", period: "9/23-10/23", emoji: "♎" },
                    { name: "蠍座", period: "10/24-11/22", emoji: "♏" },
                    { name: "射手座", period: "11/23-12/21", emoji: "♐" },
                    { name: "山羊座", period: "12/22-1/19", emoji: "♑" },
                    { name: "水瓶座", period: "1/20-2/18", emoji: "♒" },
                    { name: "魚座", period: "2/19-3/20", emoji: "♓" },
                  ].map((zodiac) => (
                    <div key={zodiac.name} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                      <div className="text-2xl mb-1">{zodiac.emoji}</div>
                      <div className="font-bold text-sm text-gray-800">{zodiac.name}</div>
                      <div className="text-xs text-gray-600">{zodiac.period}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <RelatedTools currentToolSlug="fortune-today" />
      
      <SiteFooter />
    </>
  )
}
