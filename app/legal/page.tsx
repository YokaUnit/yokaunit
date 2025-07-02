import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { Shield, FileText, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | YokaUnit",
  description: "YokaUnitの特定商取引法に基づく表記です。有料サービスに関する法定情報を記載しています。",
  robots: {
    index: true,
    follow: true,
  },
}

export default function LegalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 relative overflow-hidden">
        <BackgroundAnimation />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="animate-fade-in">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "特定商取引法に基づく表記", href: "/legal" },
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            {/* ヘッダー */}
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-gray-100 px-6 py-3 rounded-full text-sm font-medium text-blue-700 mb-6 shadow-lg">
                <Shield className="h-4 w-4" />
                法定情報
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                特定商取引法に基づく表記
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                YokaUnitが提供する有料サービスに関する法定情報です。
                <br />
                ご購入前に必ずご確認ください。
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-10 space-y-8 animate-fade-in-up">
              {/* 販売事業者 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  販売事業者名
                </h2>
                <p className="text-gray-700 text-lg">YokaUnit（ヨカユニット）</p>
              </div>

              {/* 運営責任者 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">運営責任者</h2>
                <p className="text-gray-700 text-lg">Tom Koa</p>
              </div>

              {/* 所在地 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">所在地</h2>
                <p className="text-gray-700 text-lg">
                  神奈川県茅ケ崎市
                  <br />
                  <span className="text-sm text-gray-500">※詳細な住所はご請求時に提示いたします。</span>
                </p>
              </div>

              {/* お問い合わせ */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">お問い合わせ</h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <a
                      href="/contact"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
                    >
                      お問い合わせフォーム
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <a
                      href="/corporate"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
                    >
                      企業・法人の方はこちら
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">※お電話でのお問い合わせは承っておりません。</p>
                </div>
              </div>

              {/* 販売価格 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">販売価格</h2>

                {/* プロプラン */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">プロプラン</h3>
                  <ul className="text-gray-700 space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      月額：500円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      3ヶ月：1,350円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      年額：5,000円（消費税込）
                    </li>
                  </ul>
                </div>

                {/* プレミアムプラン */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">プレミアムプラン</h3>
                  <ul className="text-gray-700 space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      月額：1,000円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      3ヶ月：2,700円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      年額：10,000円（消費税込）
                    </li>
                  </ul>
                </div>

                {/* エンタープライズプラン */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">エンタープライズプラン</h3>
                  <ul className="text-gray-700 space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      月額：2,000円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      3ヶ月：5,400円（消費税込）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      年額：20,000円（消費税込）
                    </li>
                  </ul>
                </div>

                {/* 企業向けサービス */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">企業向けカスタムサービス</h3>
                  <p className="text-gray-700 ml-4">個別見積もり（消費税込）</p>
                </div>
              </div>

              {/* 商品代金以外の必要料金 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">商品代金以外の必要料金</h2>
                <p className="text-gray-700 leading-relaxed">
                  インターネット接続料金・通信料金等はお客様のご負担となります。
                  <br />
                  銀行振込の場合、振込手数料はお客様のご負担となります。
                </p>
              </div>

              {/* お支払い方法 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">お支払い方法</h2>
                <p className="text-gray-700 leading-relaxed">
                  クレジットカード（Stripe決済システム）
                  <br />
                  銀行振込（企業向けサービスのみ）
                </p>
              </div>

              {/* お支払い時期 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">お支払い時期</h2>
                <p className="text-gray-700 leading-relaxed">
                  各プラン申込時に課金されます。以降、契約更新日に自動課金されます。
                  <br />
                  企業向けカスタムサービスは契約時または納品時となります。
                </p>
              </div>

              {/* 商品の引き渡し時期 */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">商品の引き渡し時期</h2>
                <p className="text-gray-700 leading-relaxed">
                  決済完了後、すぐにご利用いただけます。
                  <br />
                  企業向けカスタムサービスは契約書に定める期日となります。
                </p>
              </div>

              {/* 返品・キャンセル */}
              <div className="border-b border-gray-200 pb-6 hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">返品・キャンセル</h2>
                <p className="text-gray-700 leading-relaxed">
                  サービスの性質上、購入後のキャンセル・返金は原則受け付けておりません。
                  <br />
                  プランの解約は次回更新日前までにお願いいたします。
                  <br />
                  企業向けカスタムサービスについては契約書に定める条件に従います。
                </p>
              </div>

              {/* 特別条件 */}
              <div className="hover:bg-gray-50/50 transition-colors duration-200 rounded-lg p-4 -m-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">特別条件</h2>
                <p className="text-gray-700 leading-relaxed">
                  無料期間中に解約された場合、料金は発生しません。
                  <br />
                  解約はアカウント設定ページまたはお問い合わせフォームから行えます。
                  <br />
                  解約に関する手数料は発生しません。
                </p>
              </div>
            </div>

            {/* 更新日 */}
            <div className="mt-8 text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">最終更新日</span>
              </div>
              <p className="text-sm text-gray-500">2025年6月25日</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
