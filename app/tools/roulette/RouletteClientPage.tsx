"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RouletteWheel } from "./components/RouletteWheel"
import { RouletteForm } from "./components/RouletteForm"
import { RouletteResult, RouletteHistory } from "./components/RouletteResult"
import { useRoulette } from "./hooks/useRoulette"
import { toast } from "@/hooks/use-toast"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { Sparkles, RotateCcw, History } from "lucide-react"

export default function RouletteClientPage() {
  const {
    step,
    items,
    mode,
    result,
    history,
    isSpinning,
    pendingTargetIndex,
    multipleCount,
    allowDuplicates,
    setStep,
    setMode,
    setMultipleCount,
    setAllowDuplicates,
    addItem,
    removeItem,
    updateItem,
    spinRoulette,
    reset,
    resetAll,
  } = useRoulette()

  const [showHistory, setShowHistory] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const text = result
      ? `ルーレット結果: ${result.item.name}${result.item.emoji ? " " + result.item.emoji : ""}`
      : "ルーレットツールで抽選しました！"

    try {
      if (navigator.share) {
        await navigator.share({
          title: "ルーレット結果",
          text: text,
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`)
        toast({
          title: "結果をコピーしました",
          description: "SNSでシェアして友達と比べてみよう！",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  const handleSpin = () => {
    if (items.length === 0) {
      toast({
        title: "項目がありません",
        description: "まずルーレット項目を追加してください",
        variant: "destructive",
      })
      return
    }
    spinRoulette()
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
              { label: "ルーレット", href: "/tools/roulette" },
            ]}
          />

          <div className="max-w-6xl mx-auto mt-4 md:mt-6">
            {/* ヘッダー */}
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 md:p-4 rounded-3xl shadow-xl">
                  <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                🎰 ルーレットメーカー｜最強の抽選アプリ
              </h1>
              <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 px-4">
                <strong>カスタマイズ可能なルーレットメーカー。</strong>重み付け、複数当選、除外モードなど
                <strong>豊富な機能</strong>で、<strong>美しいアニメーション</strong>と<strong>直感的なUI</strong>を提供。
                <strong>完全無料・登録不要</strong>で今すぐ使える！
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
                {[
                  { label: "🆓 完全無料", color: "bg-green-100 text-green-800" },
                  { label: "🎨 カスタマイズ可能", color: "bg-purple-100 text-purple-800" },
                  { label: "⚖️ 重み付け対応", color: "bg-blue-100 text-blue-800" },
                  { label: "🎯 複数当選", color: "bg-pink-100 text-pink-800" },
                  { label: "🎬 アニメーション", color: "bg-yellow-100 text-yellow-800" },
                  { label: "📊 履歴表示", color: "bg-indigo-100 text-indigo-800" },
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

            {/* メインコンテンツ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左側: ルーレット */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl">
                  <RouletteWheel
                    items={items}
                    isSpinning={isSpinning}
                    result={result?.item || null}
                    targetIndex={pendingTargetIndex ?? undefined}
                  />

                  {/* 抽選ボタン */}
                  {step === "setup" && items.length > 0 && (
                    <div className="text-center mt-6">
                      <Button
                        onClick={handleSpin}
                        disabled={items.length === 0 || isSpinning}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 px-12 text-xl rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                      >
                        <Sparkles className="h-6 w-6 mr-2" />
                        ルーレットを回す！
                      </Button>
                    </div>
                  )}

                  {/* 結果表示 */}
                  {step === "result" && result && (
                    <div className="mt-6">
                      <RouletteResult
                        result={result}
                        onReset={reset}
                        onShare={handleShare}
                      />
                    </div>
                  )}
                </Card>
              </div>

              {/* 右側: フォームと履歴 */}
              <div className="space-y-6">
                {/* 設定フォーム */}
                {step === "setup" && (
                  <RouletteForm
                    items={items}
                    mode={mode}
                    multipleCount={multipleCount}
                    allowDuplicates={allowDuplicates}
                    onAddItem={addItem}
                    onRemoveItem={removeItem}
                    onUpdateItem={updateItem}
                    onModeChange={setMode}
                    onMultipleCountChange={setMultipleCount}
                    onAllowDuplicatesChange={setAllowDuplicates}
                  />
                )}

                {/* 履歴 */}
                {history.length > 0 && (
                  <div>
                    <Button
                      onClick={() => setShowHistory(!showHistory)}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white mb-4"
                    >
                      <History className="h-4 w-4 mr-2" />
                      抽選履歴 ({history.length}件)
                    </Button>
                    {showHistory && <RouletteHistory history={history} />}
                  </div>
                )}

                {/* リセットボタン */}
                {items.length > 0 && (
                  <Button
                    onClick={resetAll}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    variant="destructive"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    全てリセット
                  </Button>
                )}
              </div>
            </div>

            {/* 使い方ガイド */}
            {step === "setup" && (
              <Card className="mt-8 p-6 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">使い方ガイド</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold mb-2">項目を追加</h3>
                    <p className="text-sm text-gray-600">
                      ルーレット項目の名前を入力して追加。絵文字や重み付けも設定可能
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">モードを選択</h3>
                    <p className="text-sm text-gray-600">
                      通常、重み付け、複数当選、除外モードから選択
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎰</span>
                    </div>
                    <h3 className="font-bold mb-2">ルーレットを回す</h3>
                    <p className="text-sm text-gray-600">
                      「ルーレットを回す！」ボタンをクリックして抽選開始
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* 機能説明 */}
            {step === "setup" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/90 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">🎯 抽選モード</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>通常モード:</strong> すべての項目が均等な確率で当選
                    </li>
                    <li>
                      <strong>重み付けモード:</strong> 各項目に重みを設定して確率を調整
                    </li>
                    <li>
                      <strong>複数当選モード:</strong> 一度に複数の項目を当選させることが可能
                    </li>
                    <li>
                      <strong>除外モード:</strong> ランダムに1つ除外してから抽選
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-white/90 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">✨ 主な機能</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• カスタマイズ可能な項目設定</li>
                    <li>• 美しい3Dアニメーション</li>
                    <li>• 抽選履歴の保存（最大50件）</li>
                    <li>• 結果のシェア機能</li>
                    <li>• レスポンシブデザイン</li>
                    <li>• 完全無料・登録不要</li>
                  </ul>
                </Card>
              </div>
            )}

            {/* 関連ツール（記事の上） */}
            {step === "setup" && (
              <div className="mt-8 mb-6">
                <CategoryTools
                  category="ゲーム"
                  title="関連ツール（ゲーム）"
                  currentToolSlug="roulette"
                  limit={8}
                />
              </div>
            )}

            {/* SEO記事セクション */}
            {step === "setup" && (
              <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎰 ルーレットメーカー完全ガイド：確率論・抽選システム・カスタマイズ技術</h2>
                  
                  <div className="prose max-w-none text-gray-700 space-y-6">
                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        ルーレットの歴史と文化的背景
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        ルーレットは、18世紀のフランスで発明されたとされる
                        カジノゲームの代表的な存在です。その名前はフランス語で
                        「小さな車輪」を意味し、回転する車輪とボールを使った
                        運試しのゲームとして世界中で親しまれています。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        現代では、カジノだけでなく、イベントや抽選会、
                        意思決定ツールとしても広く活用されています。
                        デジタル技術の発展により、オンラインルーレットや
                        カスタマイズ可能なルーレットメーカーが登場し、
                        より多様な用途で利用されるようになりました。
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">🎲</span>
                          ルーレットの基本ルールと種類
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-semibold text-gray-900 mb-2">基本ルール</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• 回転するルーレットにボールを投げる</li>
                              <li>• ボールが止まった位置で結果を決定</li>
                              <li>• 予測した項目が当選すると勝利</li>
                              <li>• 確率に基づいて公平に抽選</li>
                            </ul>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-semibold text-gray-900 mb-2">ルーレットの種類</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>通常ルーレット</strong>: 均等な確率で抽選</li>
                              <li>• <strong>重み付けルーレット</strong>: 確率を調整可能</li>
                              <li>• <strong>複数当選ルーレット</strong>: 複数の項目を同時に抽選</li>
                              <li>• <strong>除外ルーレット</strong>: 特定の項目を除外して抽選</li>
                            </ul>
                          </div>
                          
                          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 className="font-semibold text-gray-900 mb-2">活用シーン</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• イベントの抽選会</li>
                              <li>• 意思決定の補助ツール</li>
                              <li>• ゲームやエンターテイメント</li>
                              <li>• 教育や学習の教材</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">🔬</span>
                          確率論と数学的分析
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                            <h4 className="font-semibold text-gray-900 mb-2">確率計算</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• 各項目の当選確率</li>
                              <li>• 重み付けによる確率調整</li>
                              <li>• 複数当選の組み合わせ確率</li>
                              <li>• 期待値の計算</li>
                            </ul>
                          </div>
                          
                          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                            <h4 className="font-semibold text-gray-900 mb-2">統計的分析</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• 過去の抽選結果の分析</li>
                              <li>• 確率分布の検証</li>
                              <li>• ランダム性の検定</li>
                              <li>• バイアスの検出</li>
                            </ul>
                          </div>
                          
                          <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                            <h4 className="font-semibold text-gray-900 mb-2">重み付けシステム</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• 重みの設定方法</li>
                              <li>• 確率への影響</li>
                              <li>• 公平性の確保</li>
                              <li>• 実用的な活用例</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">💻</span>
                        デジタルルーレットの技術
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">アニメーション技術</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• <strong>3Dレンダリング</strong>: リアルな視覚表現</li>
                            <li>• <strong>物理演算</strong>: 自然な回転と減速</li>
                            <li>• <strong>イージング関数</strong>: スムーズな動き</li>
                            <li>• <strong>パーティクル効果</strong>: 視覚的な演出</li>
                            <li>• <strong>レスポンシブデザイン</strong>: 多デバイス対応</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">アルゴリズム</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• <strong>ランダム数生成</strong>: 真の乱数生成</li>
                            <li>• <strong>重み付き選択</strong>: 確率調整アルゴリズム</li>
                            <li>• <strong>履歴管理</strong>: 結果の保存と分析</li>
                            <li>• <strong>状態管理</strong>: リアルタイム更新</li>
                            <li>• <strong>パフォーマンス最適化</strong>: 高速処理</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎨</span>
                        ルーレットメーカーの活用方法
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">イベント・抽選会</h4>
                          <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                            プレゼント抽選<br/>
                            当選者選定<br/>
                            順番決定<br/>
                            チーム分け
                          </div>
                          <p className="text-sm text-gray-600">
                            公平で透明性の高い
                            抽選システム。
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">意思決定支援</h4>
                          <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                            選択肢の評価<br/>
                            リスク分散<br/>
                            ランダム選択<br/>
                            意思決定補助
                          </div>
                          <p className="text-sm text-gray-600">
                            複数の選択肢から
                            公平に選ぶ。
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">教育・学習</h4>
                          <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                            確率の理解<br/>
                            統計の学習<br/>
                            数学的思考<br/>
                            実験と検証
                          </div>
                          <p className="text-sm text-gray-600">
                            遊びながら学べる
                            数学的要素。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚖️</span>
                        公平性と透明性の確保
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">公平な抽選の重要性</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1 text-red-600">避けるべき行為</h5>
                              <ul className="text-xs text-gray-600 space-y-1">
                                <li>• 意図的な確率操作</li>
                                <li>• 結果の改ざん</li>
                                <li>• 不透明な抽選方法</li>
                                <li>• バイアスの導入</li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1 text-green-600">推奨される方法</h5>
                              <ul className="text-xs text-gray-600 space-y-1">
                                <li>• 真の乱数生成</li>
                                <li>• 結果の公開</li>
                                <li>• 履歴の保存</li>
                                <li>• 透明性の確保</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">YokaUnitルーレットメーカーの特徴</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>公平な抽選</strong>: 真の乱数による公平な結果</li>
                            <li>• <strong>透明性</strong>: 抽選履歴の保存と公開</li>
                            <li>• <strong>カスタマイズ性</strong>: 用途に応じた設定</li>
                            <li>• <strong>使いやすさ</strong>: 直感的なUI設計</li>
                            <li>• <strong>無料利用</strong>: 誰でもアクセス可能</li>
                            <li>• <strong>プライバシー保護</strong>: データの外部送信なし</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🌐</span>
                        デジタル時代のルーレット
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">オンライン化のメリット</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1">技術的メリット</h5>
                              <ul className="text-xs text-gray-600 space-y-1">
                                <li>• 正確な確率計算</li>
                                <li>• リアルタイム結果</li>
                                <li>• 履歴の自動保存</li>
                                <li>• マルチプラットフォーム対応</li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1">社会的メリット</h5>
                              <ul className="text-xs text-gray-600 space-y-1">
                                <li>• 遠隔地での利用</li>
                                <li>• アクセシビリティ向上</li>
                                <li>• コスト削減</li>
                                <li>• 環境への配慮</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">YokaUnitルーレットメーカーの機能</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>カスタマイズ可能</strong>: 項目名、色、絵文字の設定</li>
                            <li>• <strong>重み付け機能</strong>: 確率の細かい調整</li>
                            <li>• <strong>複数当選モード</strong>: 一度に複数の項目を抽選</li>
                            <li>• <strong>除外モード</strong>: 特定の項目を除外して抽選</li>
                            <li>• <strong>美しいアニメーション</strong>: 3D回転とパーティクル効果</li>
                            <li>• <strong>履歴機能</strong>: 過去50件の結果を保存</li>
                            <li>• <strong>シェア機能</strong>: 結果を簡単に共有</li>
                            <li>• <strong>完全無料</strong>: 登録不要で即座に利用可能</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        ルーレットの確率と統計
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">確率の基礎</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1">通常モード</h5>
                              <p className="text-xs text-gray-600">
                                すべての項目が均等な確率で当選。
                                項目数がn個の場合、各項目の当選確率は1/n。
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded">
                              <h5 className="font-semibold text-sm mb-1">重み付けモード</h5>
                              <p className="text-xs text-gray-600">
                                各項目に重みを設定して確率を調整。
                                重みの合計に対する各項目の比率が当選確率。
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">統計的分析の活用</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>期待値計算</strong>: 各結果の価値と確率から期待値を算出</li>
                            <li>• <strong>分散分析</strong>: 結果のばらつきを分析</li>
                            <li>• <strong>相関分析</strong>: 重みと当選率の関係を検証</li>
                            <li>• <strong>仮説検定</strong>: ランダム性の検証</li>
                            <li>• <strong>モンテカルロ法</strong>: シミュレーションによる分析</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        YokaUnitのルーレットメーカーは、確率論と最新技術を組み合わせた
                        革新的な抽選ツールです。この記事が、ルーレットの魅力と
                        活用方法の理解に役立てば幸いです。
                      </p>
                      <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                        <span>#ルーレット</span>
                        <span>#ルーレットメーカー</span>
                        <span>#抽選ツール</span>
                        <span>#確率論</span>
                        <span>#ランダム選択</span>
                        <span>#カスタマイズ</span>
                        <span>#YokaUnit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 最新のツール（記事の下） */}
            {step === "setup" && (
              <div className="mb-6 mt-8">
                <RelatedTools currentToolSlug="roulette" />
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}

