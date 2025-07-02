import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Shield,
  Smartphone,
  Zap,
  Lock,
  Dice6,
  Users,
  HelpCircle,
  Mail,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Crown,
} from "lucide-react"

export const metadata: Metadata = {
  title: "ヘルプ・使い方 | YokaUnit（ヨカユニット）",
  description: "YokaUnitの基本的な使い方やよくある質問をご紹介。各ツールの詳細な使い方ガイドへのリンクもこちらから。",
  keywords: "ヘルプ,使い方,FAQ,よくある質問,サポート,YokaUnit,ヨカユニット",
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">ヘルプ・使い方</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            YokaUnitの基本的な使い方から詳細な機能まで、わかりやすくご説明します
          </p>
          <Badge variant="secondary" className="mt-4">
            <Star className="w-4 h-4 mr-1" />
            初心者の方もお気軽にご利用ください
          </Badge>
        </div>

        {/* YokaUnitの基本 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-6 h-6 text-blue-600" />
              YokaUnitの基本
            </CardTitle>
            <CardDescription className="text-lg">YokaUnitは誰でも簡単に使える無料ツール集です</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">簡単・高速</h3>
                </div>
                <p className="text-gray-600">面倒な登録は不要。ブラウザを開いて数秒で作業完了。</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">安全・安心</h3>
                </div>
                <p className="text-gray-600">あなたのデータは外部に送信されません。すべてブラウザ内で処理。</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">どこでも利用</h3>
                </div>
                <p className="text-gray-600">スマホ、タブレット、PCどの端末でも快適に利用可能。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 人気ツールの使い方 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="w-6 h-6 text-green-600" />
              人気ツールの使い方
            </CardTitle>
            <CardDescription className="text-lg">よく使われているツールの基本的な使い方をご紹介</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">秒割り（割り勘計算）</h3>
                    <p className="text-sm text-gray-600">3秒で割り勘完了</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  金額と人数を入力するだけで、瞬時に一人当たりの金額を計算。精算機能も付いています。
                </p>
                <Link href="/tools/warikan/how-to-use">
                  <Button variant="outline" size="sm" className="w-full group bg-transparent">
                    詳しい使い方を見る
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-lg">パスワード生成</h3>
                    <p className="text-sm text-gray-600">安全なパスワードを自動生成</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">長さや文字種を指定して、セキュアなパスワードを瞬時に生成できます。</p>
                <Link href="/tools/password">
                  <Button variant="outline" size="sm" className="w-full group bg-transparent">
                    ツールを使ってみる
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <Dice6 className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-lg">チンチロリン</h3>
                    <p className="text-sm text-gray-600">本格的なサイコロゲーム</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  3つのサイコロを使った伝統的なゲーム。リアルな物理演算で楽しめます。
                </p>
                <Link href="/tools/chinchiro">
                  <Button variant="outline" size="sm" className="w-full group bg-transparent">
                    ゲームで遊ぶ
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">すべてのツール</h3>
                    <p className="text-sm text-gray-600">他にも便利なツールが満載</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  計算ツール、ゲーム、ユーティリティなど、様々なカテゴリのツールをご用意。
                </p>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="w-full group bg-transparent">
                    ツール一覧を見る
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アカウント・プレミアム */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Crown className="w-6 h-6 text-purple-600" />
              アカウント・プレミアム
            </CardTitle>
            <CardDescription className="text-lg">より便利に使うためのアカウント機能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-lg text-green-800">無料アカウント</h3>
                </div>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    お気に入りツールの保存
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    利用履歴の確認
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    基本的なツール利用
                  </li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    無料登録する
                  </Button>
                </Link>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-lg text-purple-800">プレミアムプラン</h3>
                </div>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    広告なしで快適利用
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    高度な機能の利用
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    優先サポート
                  </li>
                </ul>
                <Link href="/premium">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    プレミアムを見る
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* よくある質問 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <HelpCircle className="w-6 h-6 text-orange-600" />
              よくある質問
            </CardTitle>
            <CardDescription className="text-lg">ユーザーの皆様からよく寄せられる質問</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">利用料金はかかりますか？</h3>
                    <p className="text-gray-600">
                      基本的なツールはすべて無料でご利用いただけます。プレミアム機能のみ有料です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">データは安全ですか？</h3>
                    <p className="text-gray-600">
                      はい。入力されたデータは外部に送信されず、すべてお使いの端末内で処理されます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-800 mb-2">スマホでも使えますか？</h3>
                    <p className="text-gray-600">
                      もちろんです。スマホ、タブレット、PCすべての端末で快適にご利用いただけます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/90 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">アカウント登録は必要ですか？</h3>
                    <p className="text-gray-600">
                      基本機能は登録不要です。お気に入り保存などの便利機能をお使いの場合のみ登録をお願いします。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/faq">
                <Button variant="outline" className="group bg-transparent">
                  もっと詳しいFAQを見る
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* サポート・お問い合わせ */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Mail className="w-6 h-6" />
              サポート・お問い合わせ
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              ご不明な点がございましたら、お気軽にお問い合わせください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    お問い合わせフォーム
                  </h3>
                  <p className="text-gray-300 mb-4">
                    技術的な問題、機能のご要望、その他ご質問がございましたら、お問い合わせフォームからご連絡ください。
                  </p>
                  <Link href="/contact">
                    <Button variant="secondary" className="w-full bg-white text-gray-900 hover:bg-gray-100">
                      お問い合わせする
                    </Button>
                  </Link>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    FAQ・よくある質問
                  </h3>
                  <p className="text-gray-300 mb-4">
                    多くの質問にはFAQページで回答しています。まずはこちらをご確認ください。
                  </p>
                  <Link href="/faq">
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                    >
                      FAQを見る
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>お問い合わせへの返信は通常2営業日以内に行っております</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
