import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, AlertTriangle, CreditCard, Megaphone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約 | YokaUnit - サービス利用条件",
  description:
    "YokaUnitの利用規約について詳しくご説明します。サービス利用条件、禁止事項、広告表示、知的財産権、免責事項などユーザーフレンドリーな内容でお伝えします。",
  keywords: [
    "利用規約",
    "サービス利用条件",
    "禁止事項",
    "広告表示",
    "知的財産権",
    "免責事項",
    "YokaUnit",
    "ユーザー規約",
    "サービス規約",
  ],
  openGraph: {
    title: "利用規約 | YokaUnit",
    description: "YokaUnitのサービス利用条件と利用規約について",
    url: "https://yokaunit.com/terms",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit 利用規約",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "利用規約 | YokaUnit",
    description: "YokaUnitのサービス利用条件について",
    images: ["/ogp/yokaunit-common.png"],
  },
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "利用規約", href: "/terms" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-indigo-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-indigo-700 mb-4">
                <FileText className="h-4 w-4" />
                サービス規約
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">利用規約</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                YokaUnitを安心してご利用いただくための
                <br />
                サービス利用条件について分かりやすくご説明します。
              </p>
            </div>

            <div className="grid gap-6">
              {/* はじめに */}
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    はじめに
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">
                    この利用規約（以下、「本規約」）は、YokaUnit（以下、「当サイト」）が提供するウェブサイト、サービス、ツール（以下、総称して「本サービス」）の利用条件を定めるものです。本サービスをご利用いただく際には、本規約に同意したものとみなされます。
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-indigo-800">
                      💡 <strong>ユーザーフレンドリーな運営を心がけています</strong>
                      <br />
                      当サイトは、ユーザーの皆様に安心してご利用いただけるよう、透明性と公平性を重視した運営を行っています。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* サービス内容・利用登録 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    1. サービス内容・利用登録
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">🛠️ サービス内容</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 便利ツールの無料提供</li>
                        <li>• プレミアム機能の有料提供</li>
                        <li>• ユーザーサポート</li>
                        <li>• 継続的なサービス改善</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">📝 利用登録</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 多くの機能は登録不要</li>
                        <li>• 一部機能で無料登録が必要</li>
                        <li>• 正確な情報での登録をお願いします</li>
                        <li>• 13歳以上の方がご利用可能</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 登録をお断りする場合</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• 登録情報に虚偽や不正確な内容が含まれる場合</li>
                      <li>• 過去に本規約違反で利用停止された場合</li>
                      <li>• 13歳未満の方</li>
                      <li>• その他、当サイトが不適切と判断した場合</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 禁止事項 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    2. 禁止事項
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚫 以下の行為を禁止します</h4>
                    <p className="text-sm text-red-700">
                      皆様に安心してご利用いただくため、以下の行為はお控えください。
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">⚖️ 法的・倫理的な問題</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 法令または公序良俗に違反する行為</li>
                        <li>• 犯罪行為に関連する行為</li>
                        <li>• 他者の権利を侵害する行為</li>
                        <li>• 差別的・攻撃的な内容の投稿</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">💻 技術的な妨害</h4>
                      <ul className="text-sm space-y-1">
                        <li>• サーバーやネットワークの機能を破壊・妨害する行為</li>
                        <li>• サービス運営を妨害する行為</li>
                        <li>• 過度なアクセスやデータ取得</li>
                        <li>• セキュリティを回避する行為</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">👥 他ユーザーへの迷惑</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 他のユーザーに迷惑をかける行為</li>
                        <li>• 他のユーザーのアカウントを不正使用</li>
                        <li>• スパム行為や迷惑メール送信</li>
                        <li>• なりすまし行為</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">📄 知的財産権の侵害</h4>
                      <ul className="text-sm space-y-1">
                        <li>• コンテンツの無断複製・改変・配布</li>
                        <li>• 商用利用での無断使用</li>
                        <li>• 逆アセンブル・リバースエンジニアリング</li>
                        <li>• 商標・著作権の侵害</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 広告表示について */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-orange-600" />
                    3. 広告表示について
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                    <h4 className="font-semibold text-orange-800 mb-2">📢 広告表示に関する方針</h4>
                    <p className="text-sm text-orange-700">
                      当サイトでは、サービス運営のため広告を表示しています。ユーザー体験を損なわないよう配慮しています。
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">🎯 広告の種類</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Google AdSenseによる自動広告</li>
                        <li>• コンテンツに関連した広告</li>
                        <li>• ユーザーの興味に基づく広告</li>
                        <li>• 当サイトが承認した広告のみ表示</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">✅ 広告に関するお約束</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 不適切な広告は表示しません</li>
                        <li>• ユーザー体験を最優先に考慮</li>
                        <li>• プレミアムプランで広告を大幅削減</li>
                        <li>• 広告ブロッカーの使用も理解しています</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">⚠️ 広告に関する注意事項</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 広告内容について当サイトは責任を負いません</li>
                      <li>• 広告をクリックする際は自己責任でお願いします</li>
                      <li>• 不適切な広告を発見した場合はご報告ください</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* サービス提供・変更 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    4. サービス提供・変更
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-4">🔄 サービスの変更・改善</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-800 mb-2">✨ 継続的改善</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 新機能の追加</li>
                          <li>• 既存機能の改善</li>
                          <li>• UI/UXの向上</li>
                          <li>• セキュリティ強化</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-800 mb-2">⏸️ サービス中断</h5>
                        <ul className="text-sm space-y-1">
                          <li>• システムメンテナンス</li>
                          <li>• 緊急時の対応</li>
                          <li>• 不可抗力による停止</li>
                          <li>• 事前通知を心がけます</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2">📢 変更の通知</h4>
                    <p className="text-sm text-blue-700">
                      重要な変更については、サイト上での通知やメールでお知らせします。軽微な改善については、随時実施させていただきます。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 料金・支払い */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    5. 料金・支払い
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="grid gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">💰 料金体系</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 基本機能は完全無料</li>
                        <li>• プレミアム機能は有料（月額500円〜）</li>
                        <li>• 明確で分かりやすい料金設定</li>
                        <li>• 隠れた費用は一切ありません</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">💳 支払い方法</h4>
                      <ul className="text-sm space-y-1">
                        <li>• クレジットカード決済（Stripe）</li>
                        <li>• 安全で確実な決済システム</li>
                        <li>• 自動更新（いつでも解約可能）</li>
                        <li>• 領収書の発行対応</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🔄 返金・解約について</h4>
                    <p className="text-sm text-yellow-700">
                      プレミアムプランはいつでも解約可能です。解約手数料はかかりません。返金については、個別にご相談ください。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 知的財産権・免責事項 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    6. 知的財産権・免責事項
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="grid gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-900 mb-2">📄 知的財産権</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 当サイトのコンテンツの著作権は当サイトに帰属</li>
                        <li>• ユーザーが作成したコンテンツの権利はユーザーに帰属</li>
                        <li>• 個人利用の範囲での使用は許可</li>
                        <li>• 商用利用は事前にご相談ください</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">⚠️ 免責事項</h4>
                      <ul className="text-sm space-y-1">
                        <li>• サービス内容の正確性・完全性は保証しません</li>
                        <li>• 利用による損害について責任を負いません</li>
                        <li>• ユーザー間のトラブルには関与しません</li>
                        <li>• 第三者サービスの問題には責任を負いません</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🤝 当サイトの姿勢</h4>
                    <p className="text-sm text-blue-700">
                      免責事項はありますが、ユーザーの皆様に満足していただけるよう、誠実なサービス提供を心がけています。問題が発生した場合は、可能な限りサポートいたします。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 規約変更・準拠法 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    7. 規約変更・準拠法
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-gray-700">
                  <div className="grid gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">📝 規約の変更</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 必要に応じて本規約を変更することがあります</li>
                        <li>• 重要な変更は事前にお知らせします</li>
                        <li>• 変更後の継続利用で同意したものとみなします</li>
                        <li>• 変更履歴も公開します</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">⚖️ 準拠法・管轄</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 本規約は日本法に準拠します</li>
                        <li>• 紛争が生じた場合は東京地方裁判所を管轄とします</li>
                        <li>• まずは話し合いでの解決を目指します</li>
                        <li>• 誠実な対応を心がけます</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最終更新日 */}
            <div className="text-center mt-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">最終更新日：2025年9月10日</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
