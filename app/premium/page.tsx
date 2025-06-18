import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PremiumPlans } from "@/components/premium-plans"
import { Check } from "lucide-react"

export default function PremiumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">有料会員プラン</h1>
            <p className="text-gray-600 text-center mb-6">あなたのニーズに合わせた最適なプランをお選びください</p>

            <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-3">YokaUnitで実現できること</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">プレミアムツール</h3>
                    <p className="text-sm text-gray-600">ビジネスや個人利用に特化した有料限定ツール</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">快適な利用環境</h3>
                    <p className="text-sm text-gray-600">広告を大幅軽減した集中できる環境</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">優先サポート</h3>
                    <p className="text-sm text-gray-600">質問や要望に迅速かつ丁寧に対応</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">カスタム開発</h3>
                    <p className="text-sm text-gray-600">あなた専用のツール開発も可能</p>
                  </div>
                </div>
              </div>
            </div>

            <PremiumPlans />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
