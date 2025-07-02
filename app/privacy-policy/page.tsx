import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Cookie, Share2, Lock, AlertCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | YokaUnit - 個人情報保護方針",
  description:
    "YokaUnitのプライバシーポリシーについて詳しくご説明します。ユーザー情報の取り扱い、Cookie使用、Google AdSense、データ保護方針について透明性を持ってお伝えします。",
  keywords: [
    "プライバシーポリシー",
    "個人情報保護",
    "Cookie",
    "Google AdSense",
    "データ保護",
    "情報セキュリティ",
    "YokaUnit",
    "利用者情報",
    "プライバシー保護",
  ],
  openGraph: {
    title: "プライバシーポリシー | YokaUnit",
    description: "YokaUnitの個人情報保護方針とプライバシーポリシーについて",
    url: "https://yokaunit.com/privacy-policy",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit プライバシーポリシー",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "プライバシーポリシー | YokaUnit",
    description: "YokaUnitの個人情報保護方針について",
    images: ["/ogp/yokaunit-common.png"],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "プライバシーポリシー", href: "/privacy-policy" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
                <Shield className="h-4 w-4" />
                プライバシー保護
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">プライバシーポリシー</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                YokaUnitは、ユーザーの皆様のプライバシーを最優先に考え、
                <br />
                透明性を持って個人情報の取り扱いについてご説明します。
              </p>
            </div>

            <div className="grid gap-6">
              {/* 基本方針 */}
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    基本方針
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">
                    YokaUnit（以下、「当サイト」）は、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーでは、当サイトがどのような情報を収集し、どのように利用・保護するかについて詳しく説明します。
                  </p>
                </CardContent>
              </Card>

              {/* 収集する情報 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-green-600" />
                    1. 収集する情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <p>当サイトでは、サービス向上のため以下の情報を収集することがあります：</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">📝 アカウント情報</h4>
                      <ul className="text-sm space-y-1">
                        <li>• ユーザー名・メールアドレス</li>
                        <li>• プロフィール情報</li>
                        <li>• 設定・環境設定</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">📊 利用情報</h4>
                      <ul className="text-sm space-y-1">
                        <li>• ツール利用履歴</li>
                        <li>• アクセス状況</li>
                        <li>• 操作ログ（匿名化）</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">💻 技術情報</h4>
                      <ul className="text-sm space-y-1">
                        <li>• IPアドレス（匿名化）</li>
                        <li>• ブラウザ・デバイス情報</li>
                        <li>• 画面解像度・OS情報</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">🍪 Cookie情報</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 設定保存用Cookie</li>
                        <li>• 分析用Cookie</li>
                        <li>• 広告配信用Cookie</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 情報の利用目的 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-purple-600" />
                    2. 情報の利用目的
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <p>収集した情報は、以下の目的でのみ利用します：</p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">🎯 サービス向上</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• ツールの提供・維持・改善</li>
                          <li>• 新機能の開発・テスト</li>
                          <li>• パフォーマンス最適化</li>
                          <li>• バグ修正・セキュリティ向上</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">👤 ユーザーサポート</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• アカウント管理・認証</li>
                          <li>• カスタマーサポート</li>
                          <li>• 利用状況の分析</li>
                          <li>• 不正利用の防止</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookie・広告について */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Cookie className="h-5 w-5 text-yellow-600" />
                    3. Cookie・広告について
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🍪 Cookieの使用について</h4>
                    <p className="text-sm text-yellow-700">
                      当サイトでは、ユーザー体験の向上やサイト利用状況の分析のためにCookieを使用しています。
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📢 Google AdSenseについて</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      当サイトでは、Google AdSenseを使用して広告を配信しています：
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Googleは、当サイトへの過去のアクセス情報に基づいて広告を配信します</li>
                      <li>• DoubleClick Cookieを使用して、関連性の高い広告を表示します</li>
                      <li>• 広告設定でパーソナライズ広告を無効にできます</li>
                      <li>
                        • 詳細は
                        <a
                          href="https://policies.google.com/privacy"
                          className="underline"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Googleプライバシーポリシー
                        </a>
                        をご確認ください
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-2">⚙️ Cookie設定</h4>
                    <p className="text-sm text-green-700">
                      ブラウザの設定でCookieを無効にすることも可能ですが、一部の機能が正常に動作しなくなる可能性があります。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 情報の共有・第三者提供 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-600" />
                    4. 情報の共有・第三者提供
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚫 基本方針</h4>
                    <p className="text-sm text-red-700">
                      当サイトは、以下の場合を除き、ユーザーの個人情報を第三者と共有することはありません。
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">✅ 共有する場合</h4>
                      <ul className="text-sm space-y-1">
                        <li>• ユーザーの明示的な同意がある場合</li>
                        <li>• 法律上の要請や規制に従う必要がある場合</li>
                        <li>• 当サイトの権利や財産を保護する必要がある場合</li>
                        <li>• サービス提供に必要なパートナー企業（最小限の情報のみ）</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* データ保護・セキュリティ */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    5. データ保護・セキュリティ
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-4">🔒 セキュリティ対策</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-800 mb-2">技術的対策</h5>
                        <ul className="text-sm space-y-1">
                          <li>• SSL/TLS暗号化通信</li>
                          <li>• データベース暗号化</li>
                          <li>• アクセス制御・認証</li>
                          <li>• 定期的なセキュリティ監査</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-800 mb-2">組織的対策</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 従業員教育・研修</li>
                          <li>• アクセス権限管理</li>
                          <li>• インシデント対応体制</li>
                          <li>• 定期的な見直し・改善</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    ※
                    インターネット上での完全なセキュリティを保証することはできませんが、業界標準以上の対策を講じています。
                  </p>
                </CardContent>
              </Card>

              {/* ユーザーの権利 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    6. ユーザーの権利
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-4">👤 あなたの権利</h4>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <Eye className="h-3 w-3 text-blue-700" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">アクセス権</h5>
                          <p className="text-sm text-blue-700">保存されている個人情報の確認・閲覧</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-blue-700" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">修正権</h5>
                          <p className="text-sm text-blue-700">不正確な情報の修正・更新</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <Lock className="h-3 w-3 text-blue-700" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">削除権</h5>
                          <p className="text-sm text-blue-700">個人情報の削除・消去</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                          <Share2 className="h-3 w-3 text-blue-700" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">同意撤回権</h5>
                          <p className="text-sm text-blue-700">個人情報処理への同意撤回</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* お問い合わせ・変更について */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-purple-600" />
                    7. お問い合わせ・変更について
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-4">📞 お問い合わせ</h4>
                    <p className="text-purple-800 mb-4">
                      本プライバシーポリシーに関するご質問やご意見、個人情報に関するお問い合わせは、以下までご連絡ください：
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <p className="font-medium">📧 メール：info@yokaunit.com</p>
                      <p className="text-sm text-gray-600 mt-2">※ お問い合わせには、営業日3日以内にご回答いたします</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">📝 ポリシーの変更</h4>
                    <p className="text-sm text-gray-700">
                      当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サイト上での通知やメールでお知らせします。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最終更新日 */}
            <div className="text-center mt-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">最終更新日：2024年1月15日</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
