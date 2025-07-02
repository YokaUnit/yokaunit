import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Crown, CreditCard } from "lucide-react"
import type { Metadata } from "next"
import { BackgroundAnimation } from "@/components/background-animation"

export const metadata: Metadata = {
  title: "よくある質問（FAQ） | YokaUnit",
  description:
    "YokaUnitに関するよくある質問と回答をまとめました。使い方、プレミアムプラン、お支払いなどについてご確認いただけます。",
  openGraph: {
    title: "よくある質問（FAQ） | YokaUnit",
    description:
      "YokaUnitに関するよくある質問と回答をまとめました。使い方、プレミアムプラン、お支払いなどについてご確認いただけます。",
    url: "https://yokaunit.com/faq",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit よくある質問",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "よくある質問", href: "/faq" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">よくある質問</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                YokaUnitに関するよくある質問をまとめました。
                <br />
                お探しの情報が見つからない場合は、お気軽にお問い合わせください。
              </p>
            </div>

            <div className="grid gap-6">
              {/* 基本的な使い方 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    基本的な使い方
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>YokaUnitとは何ですか？</AccordionTrigger>
                      <AccordionContent>
                        YokaUnitは、毎日の面倒な作業を一瞬で解決する無料の便利ツール集です。パスワード生成、画像リサイズ、テキスト変換など、様々なツールを無料でご利用いただけます。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>アカウント登録は必要ですか？</AccordionTrigger>
                      <AccordionContent>
                        多くのツールはアカウント登録なしでご利用いただけます。ただし、お気に入り機能や履歴保存、プレミアム機能をご利用の場合は、無料のアカウント登録が必要です。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>スマートフォンでも使えますか？</AccordionTrigger>
                      <AccordionContent>
                        はい、すべてのツールはスマートフォン・タブレットに対応しています。ブラウザがあればどのデバイスからでもご利用いただけます。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>データの安全性は大丈夫ですか？</AccordionTrigger>
                      <AccordionContent>
                        お客様のプライバシーと安全性を最優先に考えています。処理されたデータは保存されず、すべてブラウザ内で完結するよう設計されています。詳しくはプライバシーポリシーをご確認ください。
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* プレミアムプランについて */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    プレミアムプランについて
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="premium-1">
                      <AccordionTrigger>プレミアムプランの特典は何ですか？</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>広告の大幅削減（快適な作業環境）</li>
                          <li>プレミアム限定ツールの利用</li>
                          <li>優先サポート対応</li>
                          <li>ツール要望の優先開発</li>
                          <li>高度な機能・設定オプション</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium-2">
                      <AccordionTrigger>料金プランを教えてください</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            <strong>月額プラン：</strong>500円（税込）
                          </p>
                          <p>
                            <strong>3ヶ月プラン：</strong>1,350円（税込）月額450円相当
                          </p>
                          <p>
                            <strong>年額プラン：</strong>5,000円（税込）月額417円相当
                          </p>
                          <p className="text-sm text-gray-600">長期プランほどお得になります。いつでも解約可能です。</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium-3">
                      <AccordionTrigger>無料期間はありますか？</AccordionTrigger>
                      <AccordionContent>
                        はい、初回登録時に無料お試し期間をご用意しています。期間中に解約された場合、料金は一切発生しません。安心してお試しください。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium-4">
                      <AccordionTrigger>解約方法を教えてください</AccordionTrigger>
                      <AccordionContent>
                        アカウント設定ページから簡単に解約できます。解約手数料は一切かかりません。解約後は次回更新日以降、プレミアム機能がご利用いただけなくなります。
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* お支払い・技術的な質問 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    お支払い・技術的な質問
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="payment-1">
                      <AccordionTrigger>どのような支払い方法がありますか？</AccordionTrigger>
                      <AccordionContent>
                        クレジットカード決済（Stripe）に対応しています。Visa、Mastercard、American
                        Express、JCBがご利用いただけます。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="payment-2">
                      <AccordionTrigger>領収書は発行できますか？</AccordionTrigger>
                      <AccordionContent>
                        はい、アカウント設定ページから領収書をダウンロードできます。企業でのご利用の場合は、請求書払いにも対応していますので、企業向けページからお問い合わせください。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tech-1">
                      <AccordionTrigger>推奨ブラウザを教えてください</AccordionTrigger>
                      <AccordionContent>
                        Chrome、Firefox、Safari、Edgeの最新版を推奨しています。Internet Explorerはサポート対象外です。
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tech-2">
                      <AccordionTrigger>ツールが正常に動作しない場合は？</AccordionTrigger>
                      <AccordionContent>
                        まずはブラウザの再読み込みをお試しください。それでも解決しない場合は、お問い合わせフォームから詳細をお知らせください。迅速に対応いたします。
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* お問い合わせ案内 */}
            <Card className="mt-8 bg-blue-50/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">お探しの情報が見つかりませんでしたか？</h3>
                <p className="text-blue-800 mb-4">お気軽にお問い合わせください。できる限り迅速にお答えいたします。</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  お問い合わせフォーム
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
