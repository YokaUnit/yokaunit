"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calculator, Users, Smartphone, CheckCircle } from "lucide-react"
import { BackgroundAnimation } from "@/components/background-animation"
import Link from "next/link"

export default function WariKanAboutPage() {
  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* ヘッダー */}
        <div className="flex items-center mb-8">
          <Link href="/tools/warikan">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>

        {/* メインタイトル */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-3xl shadow-lg">
              <Calculator className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">秒割り</h1>
          <p className="text-xl text-gray-600 mb-2">現地で困った時の、最強割り勘ツール</p>
          <p className="text-gray-500">名前なし・登録不要・完全無料</p>
        </div>

        {/* 問題解決セクション */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">こんな割り勘の悩み、ありませんか？</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-600 flex items-center">💸 お金の問題</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 複雑な割り勘計算でミスが発生</li>
                <li>• 飲む人・飲まない人の区別が面倒</li>
                <li>• 立替金の回収率が低い</li>
                <li>• 「払った・払ってない」でトラブル</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-600 flex items-center">⏰ 時間の問題</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 精算作業に毎回1時間以上かかる</li>
                <li>• 未払い者への個別連絡が大変</li>
                <li>• 出欠確認と費用計算が別々で二度手間</li>
                <li>• 幹事の負担が重すぎる</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 解決策セクション */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">「秒割り」が全て解決します！</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">完璧な計算</h3>
              <p className="text-sm text-gray-600">食事代・飲み物代を分離計算。幹事割引、先輩多めなど柔軟な比率設定</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">大人数対応</h3>
              <p className="text-sm text-gray-600">2人〜50人まで対応。学年別、役職別の設定も簡単</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">PayPay連携</h3>
              <p className="text-sm text-gray-600">ワンタップでPayPay送金。支払い状況もリアルタイム管理</p>
            </div>
          </div>
        </Card>

        {/* 使用シーン */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">こんなシーンで大活躍！</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">🍻 大学サークル飲み会</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>参加者：</strong>20人（4年生2人、3年生5人、2年生8人、1年生5人）
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>設定：</strong>4年生1.5倍、3年生1.2倍、2年生1.0倍、1年生0.8倍
                </p>
                <p className="text-sm text-gray-700">
                  <strong>結果：</strong>3分で計算完了、PayPay送金で即精算
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">👔 職場歓送迎会</h3>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>参加者：</strong>15人（部長1人、課長3人、主任6人、一般5人）
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>設定：</strong>役職別負担比率、飲まない人は飲み物代なし
                </p>
                <p className="text-sm text-gray-700">
                  <strong>結果：</strong>回収率100%、トラブルゼロ
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 特徴一覧 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">主な機能</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "名前入力不要・登録不要",
              "2人〜50人まで対応",
              "飲む人・飲まない人の分離計算",
              "幹事割引・先輩多めなど柔軟な比率設定",
              "多く食べた分の追加支払い対応",
              "PayPay送金リンク自動生成",
              "支払い状況リアルタイム管理",
              "未払い者への一括リマインダー",
              "最適な精算方法を自動計算",
              "オフライン対応",
              "データ外部送信なし（プライバシー保護）",
              "完全無料",
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/tools/warikan">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg">
              <Calculator className="h-5 w-5 mr-2" />
              今すぐ使ってみる
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">登録不要・完全無料で今すぐ使えます</p>
        </div>

        {/* SEO用テキスト */}
        <div className="mt-12 text-xs text-gray-400 space-y-2">
          <p>
            割り勘計算ツール「秒割り」は、飲み会・歓送迎会・旅行などの精算を劇的に簡単にする無料アプリです。
            名前入力不要、登録不要で、スマホからすぐに使えます。
          </p>
          <p>
            大学サークル、職場、友人グループなど、あらゆるシーンで活用できる実用的な機能を搭載。
            PayPay連携、支払い状況管理、未払い者リマインダーなど、現実の割り勘で起こる問題を全て解決します。
          </p>
          <p>キーワード: 割り勘 計算 アプリ 無料 PayPay 飲み会 歓送迎会 精算 幹事 大人数 学生 社会人</p>
        </div>
      </div>
    </div>
  )
}
