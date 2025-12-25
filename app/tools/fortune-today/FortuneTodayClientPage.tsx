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
import { CategoryTools } from "@/components/category-tools"
import { ToolHeroImage } from "@/components/tool-hero-image"

interface FortuneTodayClientPageProps {
  toolImageUrl?: string | null
  toolTitle?: string
}

export default function FortuneTodayClientPage({ toolImageUrl = null, toolTitle = "今日の運勢" }: FortuneTodayClientPageProps) {
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

          <div className="max-w-4xl mx-auto mt-4 md:mt-6">
            {/* ツール画像 */}
            {toolImageUrl && (
              <ToolHeroImage imageUrl={toolImageUrl} title={toolTitle} />
            )}
            
            {/* ヘッダー */}
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 md:p-4 rounded-3xl shadow-xl">
                  <Star className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                🔮 今日の運勢｜無料占い・星座占い
              </h1>
              <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 px-4">
                <strong>今日の運勢を無料で占える星座占いツール。</strong>12星座別に<strong>総合運・恋愛運・仕事運・金運</strong>を診断し、
                ラッキー行動とアドバイスを提供。<strong>毎日更新される運勢で今日一日を素敵に過ごそう。</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
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
                    className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {step === "intro" && (
              <>
                {/* 占い説明カード */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">今日の運勢占いのやり方</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <span className="text-white text-lg md:text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-bold mb-2 text-sm md:text-base">星座を選択</h3>
                      <p className="text-xs md:text-sm text-gray-600">12星座からあなたの星座を選んでください</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2 text-sm md:text-base">今日の行動を入力</h3>
                      <p className="text-xs md:text-sm text-gray-600">プレゼン、デート、勉強など今日の予定を入力</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-pink-500 to-red-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <Star className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2 text-sm md:text-base">運勢を確認</h3>
                      <p className="text-xs md:text-sm text-gray-600">4つの運勢とアドバイスを確認</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={startFortune}
                      className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg touch-manipulation"
                    >
                      <Star className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      占いを始める
                    </Button>
                  </div>
                </Card>

              {/* 関連ツール（カテゴリ: 診断） */}
              <div className="mb-6 md:mb-8">
                <CategoryTools category="診断" title="関連ツール（診断）" currentToolSlug="fortune-today" limit={8} />
              </div>

              {/* 最新のツール（このページでは上部に移動）*/}
              <div className="mb-6 md:mb-8">
                <RelatedTools currentToolSlug="fortune-today" />
              </div>

              {/* 占いでわかること */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">今日の運勢AIでわかること</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                        <div className="bg-yellow-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                          <Star className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        総合運
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4">今日一日の全体的な運気を0-100で数値化</p>
                      
                      <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                        <div className="bg-red-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                          <Heart className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        恋愛運
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">恋愛関係や人間関係での運気を診断</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                        <div className="bg-blue-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                          <Star className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        仕事運
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4">仕事や学業での成功度を予測</p>
                      
                      <h3 className="font-bold text-base md:text-lg mb-3 flex items-center">
                        <div className="bg-green-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs">¥</span>
                        </div>
                        金運
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">お金に関する運気と注意点</p>
                    </div>
                  </div>
                </Card>

                {/* 特徴 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-3 md:p-4 text-center">
                    <div className="text-xl md:text-2xl mb-2">🔮</div>
                    <p className="text-xs md:text-sm font-semibold text-gray-700">12星座対応</p>
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

              {/* SEO記事 */}
              <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔮 今日の運勢占い完全ガイド：星座学・運勢分析・AI占いの科学</h2>
                
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🌟</span>
                      星座学の歴史と文化的背景
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">古代の起源</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>バビロニア文明</strong>: 星座学の起源</li>
                          <li>• <strong>ギリシャ・ローマ</strong>: 体系化の時代</li>
                          <li>• <strong>12星座</strong>: 太陽の軌道に基づく分類</li>
                          <li>• <strong>4元素</strong>: 火・土・風・水の分類</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">現代への発展</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>西洋占星術</strong>: 現代の基礎</li>
                          <li>• <strong>3性質</strong>: 活動宮・固定宮・柔軟宮</li>
                          <li>• <strong>個性分析</strong>: 性格特性の分類</li>
                          <li>• <strong>運勢予測</strong>: 未来への洞察</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🔬</span>
                      運勢分析の科学的アプローチ
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">確率論と統計学</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          過去データ分析<br/>
                          成功確率算出<br/>
                          リスク要因特定<br/>
                          客観的評価
                        </div>
                        <p className="text-sm text-gray-600">
                          データに基づく
                          科学的な運勢分析。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">心理学と行動科学</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          性格特性分析<br/>
                          認知バイアス<br/>
                          行動パターン<br/>
                          自己実現予言
                        </div>
                        <p className="text-sm text-gray-600">
                          心理学的知見を
                          活用した分析。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      AI技術を活用した現代の占い
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">機械学習によるパターン認識</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-green-600">データ分析</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 大量データの処理</li>
                              <li>• 複雑なパターン認識</li>
                              <li>• 予測精度の向上</li>
                              <li>• 個別化された分析</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-blue-600">学習アルゴリズム</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 成功事例の学習</li>
                              <li>• 失敗事例の分析</li>
                              <li>• 最適化されたアドバイス</li>
                              <li>• 継続的な改善</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">自然言語処理による感情分析</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>テキスト分析</strong>: ユーザー入力の感情解析</li>
                          <li>• <strong>意図理解</strong>: 行動や目標の分析</li>
                          <li>• <strong>心理状態</strong>: 感情状態の把握</li>
                          <li>• <strong>パーソナライズ</strong>: 個別化されたアドバイス</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">♈</span>
                      12星座の特性と運勢の関係
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">火の星座</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          牡羊座 ♈<br/>
                          獅子座 ♌<br/>
                          射手座 ♐
                        </div>
                        <p className="text-sm text-gray-600">
                          情熱的で積極的な
                          リーダーシップ型。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">土の星座</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          牡牛座 ♉<br/>
                          乙女座 ♍<br/>
                          山羊座 ♑
                        </div>
                        <p className="text-sm text-gray-600">
                          実用的で安定した
                          着実な努力型。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">風の星座</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          双子座 ♊<br/>
                          天秤座 ♎<br/>
                          水瓶座 ♒
                        </div>
                        <p className="text-sm text-gray-600">
                          知的で社交的な
                          コミュニケーション型。
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">水の星座</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">蟹座 ♋</h5>
                          <p className="text-xs text-gray-600">感情的で保護的な</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">蠍座 ♏</h5>
                          <p className="text-xs text-gray-600">神秘的で深い洞察力</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">魚座 ♓</h5>
                          <p className="text-xs text-gray-600">直感的で創造的</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      運勢占いの活用方法
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">日常的な活用</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">自己理解</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 性格特性の把握</li>
                              <li>• 強みと弱みの認識</li>
                              <li>• 行動パターンの理解</li>
                              <li>• 価値観の明確化</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">意思決定支援</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 選択肢の評価</li>
                              <li>• リスクの分析</li>
                              <li>• タイミングの判断</li>
                              <li>• 行動指針の設定</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">長期的な活用</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>目標設定</strong>: 星座特性を活かした目標設定</li>
                          <li>• <strong>人間関係</strong>: 相性の理解と改善</li>
                          <li>• <strong>キャリア</strong>: 適性に基づく職業選択</li>
                          <li>• <strong>ライフスタイル</strong>: 個性に合った生活設計</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      今日の運勢占いは、自己理解と意思決定のためのツールです。
                      結果を参考に、より良い一日を過ごしましょう。
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                      <span>#運勢占い</span>
                      <span>#星座学</span>
                      <span>#AI占い</span>
                      <span>#12星座</span>
                      <span>#運勢分析</span>
                      <span>#YokaUnit</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      {/* 下部の最新ツールは上部へ移動済みのため削除 */}
      
      <SiteFooter />
    </>
  )
}
