import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Users, ArrowLeft, Smartphone, Shield, Zap, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "秒割りの使い方｜3秒で完了する割り勘計算ツールの完全ガイド",
  description:
    "秒割りの詳しい使い方を画像付きで解説。基本的な割り勘計算から精算機能まで、すべての機能を分かりやすく説明します。飲み会・ランチ・旅行での活用方法も紹介。",
  keywords: "秒割り,使い方,割り勘,計算,ガイド,説明,飲み会,ランチ,旅行,精算,無料,登録不要",
  openGraph: {
    title: "秒割りの使い方｜3秒で完了する割り勘計算ツールの完全ガイド",
    description:
      "秒割りの詳しい使い方を画像付きで解説。基本的な割り勘計算から精算機能まで、すべての機能を分かりやすく説明します。",
    url: "https://yokaunit.com/tools/warikan/how-to-use",
    type: "article",
  },
}

export default function HowToUsePage() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <Link href="/tools/warikan">
              <Button variant="ghost" size="sm" className="mb-4 text-gray-600 hover:text-gray-800">
                <ArrowLeft className="h-4 w-4 mr-1" />
                秒割りに戻る
              </Button>
            </Link>

            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-3xl shadow-xl">
                <Calculator className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">秒割りの使い方</h1>
            <p className="text-gray-600 text-lg">3秒で完了する割り勘計算ツールの完全ガイド</p>
          </div>

          {/* 特徴 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
              <Zap className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">3秒で計算</h3>
              <p className="text-sm text-gray-600">金額と人数を入力するだけで瞬時に計算完了</p>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
              <Calculator className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">精算機能</h3>
              <p className="text-sm text-gray-600">誰が誰にいくら払うかも自動で計算</p>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
              <Shield className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">登録不要</h3>
              <p className="text-sm text-gray-600">面倒な会員登録は一切不要で即利用可能</p>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
              <Smartphone className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">スマホ対応</h3>
              <p className="text-sm text-gray-600">スマートフォンでの操作に最適化</p>
            </Card>
          </div>

          {/* 基本的な使い方 */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🚀 基本的な使い方</h2>

            <div className="space-y-8">
              {/* ステップ1 */}
              <div className="flex items-start space-x-6">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">💰 総額を入力</h3>
                  <p className="text-gray-600 mb-4">
                    飲み会やランチの総額を入力します。例：12,000円の飲み会の場合は「12000」と入力。
                  </p>
                  <Card className="bg-green-50 border-green-200 p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-800 mb-2">¥12,000</div>
                      <p className="text-sm text-green-600">例：飲み会の総額</p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* ステップ2 */}
              <div className="flex items-start space-x-6">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">👥 人数を選択</h3>
                  <p className="text-gray-600 mb-4">
                    参加人数を2人から20人まで選択できます。プルダウンメニューから選ぶだけ。
                  </p>
                  <Card className="bg-blue-50 border-blue-200 p-4">
                    <div className="flex items-center justify-center space-x-4">
                      <Users className="h-6 w-6 text-blue-600" />
                      <span className="text-xl font-bold text-blue-800">4人</span>
                    </div>
                  </Card>
                </div>
              </div>

              {/* ステップ3 */}
              <div className="flex items-start space-x-6">
                <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🔢 端数処理を選択</h3>
                  <p className="text-gray-600 mb-4">
                    1円、10円、100円、1000円単位での端数処理を選択。100円単位が一般的です。
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <Card className="bg-purple-50 border-purple-200 p-3 text-center">
                      <div className="font-bold text-purple-800">1円</div>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200 p-3 text-center">
                      <div className="font-bold text-purple-800">10円</div>
                    </Card>
                    <Card className="bg-purple-100 border-purple-300 p-3 text-center">
                      <div className="font-bold text-purple-800">100円 ✓</div>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200 p-3 text-center">
                      <div className="font-bold text-purple-800">1000円</div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* 結果表示 */}
              <div className="flex items-start space-x-6">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🎉 結果が瞬時に表示</h3>
                  <p className="text-gray-600 mb-4">一人当たりの金額が大きく表示され、詳細情報も確認できます。</p>
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-md p-6">
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-lg text-green-700 mb-2">一人当たり</p>
                        <p className="text-5xl font-bold text-green-800">¥3,000</p>
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>総額</span>
                          <span className="font-semibold">¥12,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>人数</span>
                          <span className="font-semibold">4人</span>
                        </div>
                        <div className="flex justify-between">
                          <span>合計回収額</span>
                          <span className="font-semibold">¥12,000</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>

          {/* 精算機能の使い方 */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💸 精算機能の使い方</h2>

            <div className="space-y-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-lg">
                  実際に誰がいくら払ったかを入力すると、誰が誰にいくら払えばいいかを自動計算します。
                </p>
              </div>

              {/* 精算ボタン */}
              <div className="text-center">
                <Card className="bg-blue-50 border-blue-200 p-6 inline-block">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    精算する
                  </Button>
                  <p className="text-sm text-blue-600 mt-2">基本計算後にこのボタンをクリック</p>
                </Card>
              </div>

              {/* 実際の支払い入力 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">📝 実際の支払い額を入力</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white border-gray-200 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">田中さん</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-sm text-gray-600">負担額</div>
                          <div className="text-lg font-bold text-green-600">¥3,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">実際の支払い</div>
                          <div className="text-lg font-bold text-blue-600">¥12,000</div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-green-600 font-medium">+¥9,000 多く支払い</div>
                    </div>
                  </Card>

                  <Card className="bg-white border-gray-200 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">佐藤さん</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-sm text-gray-600">負担額</div>
                          <div className="text-lg font-bold text-green-600">¥3,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">実際の支払い</div>
                          <div className="text-lg font-bold text-blue-600">¥0</div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-red-600 font-medium">-¥3,000 不足</div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* 精算結果 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 精算結果</h3>
                <Card className="bg-white border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <span className="text-blue-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800">佐藤さん</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-800">田中さん</span>
                        </div>
                        <p className="text-sm text-gray-600">送金</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">¥3,000</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* 活用シーン */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎯 活用シーン</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">🍻 飲み会・歓送迎会</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 大人数の飲み会で幹事の負担を軽減</li>
                  <li>• 複雑な計算も瞬時に完了</li>
                  <li>• 精算方法も自動で提案</li>
                  <li>• 結果をLINEやメールで共有可能</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">🍽️ ランチ・ディナー</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 友達とのお食事で活躍</li>
                  <li>• サクッと計算してスマートに精算</li>
                  <li>• 端数処理で小銭の煩わしさを解消</li>
                  <li>• 少人数でも使いやすい</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">🏖️ 旅行・イベント</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 旅行先での食事代計算</li>
                  <li>• イベントの参加費精算</li>
                  <li>• 宿泊費の分割計算</li>
                  <li>• 交通費の精算にも対応</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">☕ カフェ・居酒屋</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• カフェでの勉強会後の精算</li>
                  <li>• 居酒屋での同僚との飲み会</li>
                  <li>• ファミレスでの家族の食事</li>
                  <li>• どんなシーンでも対応</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* よくある質問 */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ よくある質問</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. 登録は必要ですか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-green-200">
                  A. 登録は一切不要です。ブラウザからアクセスするだけですぐに使えます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. 料金はかかりますか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-blue-200">
                  A. 完全無料です。すべての機能を無料でご利用いただけます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. データは保存されますか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-purple-200">
                  A. 入力したデータは外部に送信されません。ブラウザ内でのみ処理されます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. スマートフォンでも使えますか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-orange-200">
                  A. はい。スマートフォンでの操作に最適化されており、快適にご利用いただけます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. 何人まで対応していますか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-red-200">
                  A. 2人から20人まで対応しています。大人数の飲み会でもご利用いただけます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q. 計算結果を共有できますか？</h3>
                <p className="text-gray-600 pl-4 border-l-4 border-teal-200">
                  A. はい。計算結果のURLを生成して、LINEやメールで簡単に共有できます。
                </p>
              </div>
            </div>
          </Card>

          {/* コツとヒント */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 使い方のコツ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-orange-800 mb-4">🎯 効率的な使い方</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• 端数処理は100円単位がおすすめ</li>
                  <li>• 精算機能で実際の支払い状況を管理</li>
                  <li>• 結果をスクリーンショットで保存</li>
                  <li>• URLを共有して参加者全員で確認</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-orange-800 mb-4">⚡ 時短テクニック</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• 事前に総額を概算しておく</li>
                  <li>• 人数は参加確定者のみでカウント</li>
                  <li>• PayPayやLINE Payで精算を効率化</li>
                  <li>• 幹事は精算結果を事前に計算</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 今すぐ秒割りを使ってみよう！</h2>
              <p className="text-gray-600 mb-6">3秒で割り勘計算が完了。登録不要・完全無料で今すぐ使えます。</p>
              <Link href="/tools/warikan">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg">
                  <Calculator className="h-5 w-5 mr-2" />
                  秒割りを使う
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <SiteFooter />
    </>
  )
}
