import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PremiumPlans } from "@/components/premium-plans"
import { BackgroundAnimation } from "@/components/background-animation"
import { Check, Sparkles, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プレミアムプラン - 広告なしで快適に使える",
  description:
    "月額500円で広告なし・全機能使い放題！作業に集中できる快適な環境で、あなたの効率を最大化。いつでも解約可能で安心してお試しいただけます。",
  keywords: [
    "プレミアムプラン",
    "有料プラン",
    "広告なし",
    "高機能ツール",
    "月額500円",
    "サブスクリプション",
    "プレミアム会員",
    "優先サポート",
    "限定ツール",
    "作業効率化",
    "YokaUnit有料版",
  ],
  openGraph: {
    title: "YokaUnitプレミアム - 広告なし・高機能ツール使い放題｜月額500円〜",
    description:
      "広告なしの快適環境と高機能ツールで作業効率を最大化！プレミアム限定ツール、優先サポート、要望の優先開発など特典満載。月額500円から始められるお得なプランです。",
    url: "https://yokaunit.com/premium",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnitプレミアムプラン - 広告なし・高機能ツール使い放題",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnitプレミアム🌟 広告なし・高機能ツール使い放題",
    description:
      "月額500円で広告なしの快適環境✨ プレミアム限定ツール・優先サポート・要望の優先開発など特典満載🚀 作業効率を最大化しませんか？",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/premium",
  },
}

export default function PremiumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 relative overflow-hidden">
        <BackgroundAnimation />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* ヘッダーセクション */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full text-sm font-medium text-blue-700 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Sparkles className="h-4 w-4 animate-pulse" />
                プレミアムプラン
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                より高度なツールと
                <br className="md:hidden" />
                快適な環境を
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
                プレミアムツールへのアクセスと広告の大幅削減で、作業効率を最大化
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                あなたのサポートでYokaUnitを一緒に成長させませんか？
              </p>

              {/* 開発者からのメッセージ */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                  <span className="font-semibold text-gray-900 text-lg">開発者からのメッセージ</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  いつもYokaUnitをご利用いただき、ありがとうございます。
                  <br />
                  プレミアムプランでは、より高度なツールと快適な環境をご提供します。
                  <br />
                  あなたの作業効率向上と、サービスの継続的な改善の両方を実現できれば嬉しいです。
                </p>
              </div>
            </div>

            {/* 特典セクション */}
            <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">プレミアム会員の特典</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-200">
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">広告大幅削減</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      ほとんどの広告が非表示に（PR・提携情報は邪魔にならない場所に配置）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-200">
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">プレミアムツール</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">有料会員限定の高度なツール</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-200">
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">優先サポート</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">質問や要望に優先的に対応</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-yellow-200">
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">要望の優先開発</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">あなたのツール要望を優先的に開発</p>
                  </div>
                </div>
              </div>
            </div>

            {/* プラン選択 */}
            <div className="animate-fade-in-up">
              <PremiumPlans />
            </div>

            {/* 法定情報への案内 */}
            <div className="mt-8 p-4 bg-white/80 border border-gray-200 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <p className="text-sm text-gray-700 text-center">
                ご購入前に
                <a
                  href="/legal"
                  className="text-blue-600 hover:text-blue-800 hover:underline mx-1 font-medium transition-colors duration-200"
                >
                  特定商取引法に基づく表記
                </a>
                をご確認ください。
              </p>
            </div>

            {/* 最後のメッセージ */}
            <div className="text-center mt-10 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
              <Heart className="h-10 w-10 text-red-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">あなたの応援が新しいツールを生み出します</h3>
              <p className="text-gray-600 leading-relaxed">
                プレミアムプランで快適にツールを使いながら、
                <br />
                同時に新機能の開発や改善を支援していただけます。一緒にYokaUnitを育てていきましょう！
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
