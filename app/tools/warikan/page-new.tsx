"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Users, Share2, RotateCcw, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react'
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SettlementInput } from "./components/SettlementInput"
import { SettlementResult } from "./components/SettlementResult"
import { useSimpleWarikan } from "./hooks/useSimpleWarikan"
import { toast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function WariKanPage() {
  const {
    totalAmount,
    peopleCount,
    roundUp,
    result,
    step,
    members,
    settlementResult,
    setTotalAmount,
    setPeopleCount,
    setRoundUp,
    shareUrl,
    reset,
    goToSettlement,
    backToCalculate,
    updateMemberPaid,
    updateMemberName,
    calculateFinalSettlement,
  } = useSimpleWarikan()

  const [copied, setCopied] = useState(false)

  // SEO設定を強化
  useEffect(() => {
    document.title = "秒割り｜3秒で完了する最速割り勘計算ツール【登録不要・無料】"
    
    // メタディスクリプション
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "金額と人数を入力するだけで3秒で割り勘完了！精算機能付きで誰が誰にいくら払うかも自動計算。登録不要・完全無料。飲み会・ランチ・旅行の精算に最適。スマホ対応。"
      )
    }

    // キーワード
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "割り勘,計算,アプリ,無料,登録不要,精算,飲み会,ランチ,旅行,スマホ,ツール,秒割り,割り勘計算機,支払い,送金,PayPay,LINE Pay"
      )
    }

    // OGPタグ
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute("content", "秒割り｜3秒で完了する最速割り勘計算ツール")
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "金額と人数を入力するだけで3秒で割り勘完了！精算機能付きで誰が誰にいくら払うかも自動計算。登録不要・完全無料。"
      )
    }

    // 構造化データ
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "秒割り",
      "description": "3秒で完了する最速割り勘計算ツール",
      "url": window.location.href,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5, JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY"
      },
      "featureList": [
        "3秒で割り勘計算",
        "精算機能付き",
        "登録不要",
        "完全無料",
        "スマホ対応",
        "2-20人対応",
        "端数処理",
        "結果共有"
      ],
      "screenshot": "https://yokaunit.com/ogp/warikan-screenshot.png",
      "softwareVersion": "1.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YokaUnit",
        "url": "https://yokaunit.com"
      }
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleShare = async () => {
    const url = shareUrl()
    try {
      if (navigator.share) {
        await navigator.share({
          title: "秒割り - 割り勘計算結果",
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "URLをコピーしました",
          description: "計算結果を共有できます",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  const peopleOptions = Array.from({ length: 19 }, (_, i) => i + 2) // 2-20人

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
              { label: "割り勘計算ツール", href: "/tools/warikan" },
            ]}
          />

          <div className="max-w-md mx-auto mt-6">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-3xl shadow-xl">
                <Calculator className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">秒割り</h1>
            <p className="text-gray-600 text-base md:text-lg">{step === "calculate" ? "3秒で割り勘完了" : "精算方法を計算"}</p>
            
            {/* 使い方リンク */}
            <div className="mt-4">
              <Link href="/tools/warikan/how-to-use">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  使い方を見る
                </Button>
              </Link>
            </div>
          </div>

          {step === "calculate" ? (
            <>
              {/* メイン入力カード */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-8">
                <div className="space-y-8">
                  {/* 総額入力 */}
                  <div>
                    <label className="block text-xl font-bold text-gray-800 mb-4 text-center">💰 総額</label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={totalAmount || ""}
                        onChange={(e) => setTotalAmount(Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="text-4xl font-bold text-center py-6 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 bg-white"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-500 font-bold">
                        円
                      </span>
                    </div>
                  </div>

                  {/* 人数と端数処理 */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3 text-center">
                        <Users className="h-5 w-5 inline mr-2" />
                        人数
                      </label>
                      <Select
                        value={peopleCount.toString()}
                        onValueChange={(value) => setPeopleCount(Number.parseInt(value))}
                      >
                        <SelectTrigger className="text-xl font-bold py-4 rounded-xl border-2 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {peopleOptions.map((count) => (
                            <SelectItem key={count} value={count.toString()} className="text-lg">
                              {count}人
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3 text-center">端数処理</label>
                      <Select value={roundUp.toString()} onValueChange={(value) => setRoundUp(Number.parseInt(value))}>
                        <SelectTrigger className="text-xl font-bold py-4 rounded-xl border-2 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1" className="text-lg">
                            1円
                          </SelectItem>
                          <SelectItem value="10" className="text-lg">
                            10円
                          </SelectItem>
                          <SelectItem value="100" className="text-lg">
                            100円
                          </SelectItem>
                          <SelectItem value="1000" className="text-lg">
                            1000円
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 結果表示 */}
              {result && result.totalAmount > 0 && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-xl p-8 mb-8">
                  <div className="text-center space-y-6">
                    <div>
                      <p className="text-lg text-green-700 mb-2">一人当たり</p>
                      <p className="text-6xl font-bold text-green-800 mb-4">¥{result.perPersonAmount.toLocaleString()}</p>
                    </div>

                    {/* 詳細情報 */}
                    <div className="bg-white/70 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">総額</span>
                        <span className="font-semibold">¥{result.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">人数</span>
                        <span className="font-semibold">{result.peopleCount}人</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">合計回収額</span>
                        <span className="font-semibold">¥{result.roundedTotal.toLocaleString()}</span>
                      </div>
                      {result.remainder > 0 && (
                        <div className="flex justify-between text-sm border-t pt-2">
                          <span className="text-orange-600">お釣り</span>
                          <span className="font-semibold text-orange-600">¥{result.remainder.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* アクションボタン */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={goToSettlement}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-lg"
                      >
                        <ArrowRight className="h-5 w-5 mr-2" />
                        精算する
                      </Button>

                      <Button
                        onClick={handleShare}
                        variant="outline"
                        className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold py-4 rounded-xl text-lg bg-transparent"
                      >
                        <Share2 className="h-5 w-5 mr-2" />
                        結果を共有
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* リセットボタン */}
              {(totalAmount > 0 || peopleCount !== 4) && (
                <div className="text-center mb-8">
                  <Button onClick={reset} variant="ghost" className="text-gray-500 hover:text-gray-700">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    リセット
                  </Button>
                </div>
              )}

              {/* 使い方 */}
              <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-md p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-3 text-center">🚀 使い方</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                      1
                    </span>
                    <span>総額を入力</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                      2
                    </span>
                    <span>人数を選択</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                      3
                    </span>
                    <span>精算ボタンで詳細計算 or 結果を共有</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Link href="/tools/warikan/how-to-use">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      詳しい使い方を見る →
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* 特徴 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm font-semibold text-gray-700">3秒で計算</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">💸</div>
                  <p className="text-sm font-semibold text-gray-700">精算機能</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-sm font-semibold text-gray-700">登録不要</p>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4 text-center">
                  <div className="text-2xl mb-2">💯</div>
                  <p className="text-sm font-semibold text-gray-700">完全無料</p>
                </Card>
              </div>

              {/* SEO用コンテンツ */}
              <Card className="bg-gray-50/80 backdrop-blur-sm border-0 shadow-md p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-3">🎯 こんな場面で活躍</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">🍻 飲み会・歓送迎会</h4>
                    <p>大人数の飲み会で幹事の負担を軽減。複雑な計算も瞬時に完了。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🍽️ ランチ・ディナー</h4>
                    <p>友達とのお食事で。サクッと計算してスマートに精算。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🏖️ 旅行・イベント</h4>
                    <p>旅行先での食事代やイベントの参加費計算に最適。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">☕ カフェ・居酒屋</h4>
                    <p>少人数でも大人数でも、どんなシーンでも使える。</p>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* 精算ページ */}
              <div className="flex items-center justify-between mb-6">
                <Button onClick={backToCalculate} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  戻る
                </Button>
                <Button onClick={reset} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  最初から
                </Button>
              </div>

              {/* 基本情報表示 */}
              {result && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-md p-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-green-700 mb-1">基本の割り勘</p>
                    <p className="text-2xl font-bold text-green-800">
                      ¥{result.perPersonAmount.toLocaleString()} × {result.peopleCount}人
                    </p>
                    <p className="text-xs text-green-600 mt-1">総額: ¥{result.totalAmount.toLocaleString()}</p>
                  </div>
                </Card>
              )}

              {/* 精算入力 */}
              <SettlementInput
                members={members}
                onUpdateMemberPaid={updateMemberPaid}
                onUpdateMemberName={updateMemberName}
                onCalculate={calculateFinalSettlement}
              />

              {/* 精算結果 */}
              {settlementResult && (
                <div className="mt-8">
                  <SettlementResult result={settlementResult} onShare={handleShare} />
                </div>
              )}
            </>
          )}

          {/* SEO用のテキスト */}
          <div className="mt-8 text-xs text-gray-500 space-y-2">
            <p>
              <strong>秒割り</strong>は、金額と人数を入力するだけで3秒で割り勘計算が完了する無料ツールです。
              登録不要でブラウザからすぐに使え、精算機能付きで実際の支払い状況も管理できます。
            </p>
            <p>
              飲み会、ランチ、旅行、イベントなど、あらゆるシーンで活用できる実用的な割り勘アプリ。
              スマホ対応で、2人から20人まで対応。端数処理や結果共有機能も搭載。
            </p>
            <p>
              <strong>キーワード:</strong> 割り勘 計算 アプリ 無料 登録不要 精算 飲み会 ランチ 旅行 スマホ ツール 秒割り 割り勘計算機 支払い 送金
            </p>
          </div>
        </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
