import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PasswordGenerator } from "@/components/tools/password-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "パスワード生成ツール｜強力で安全なパスワードを無料作成・セキュリティ対策",
  description:
    "YokaUnitの無料パスワード生成ツールで、ハッキング対策に最適な強力パスワードを瞬時に作成！文字数・記号・数字をカスタマイズ可能。ブラウザ内で完結するためプライバシー完全保護。セキュリティ専門家推奨の安全なパスワード作成方法も解説。",
  keywords: [
    "パスワード生成",
    "強力パスワード",
    "安全パスワード",
    "セキュリティ対策",
    "ハッキング対策",
    "無料パスワードジェネレーター",
    "ランダムパスワード",
    "パスワード作成",
    "暗号化",
    "個人情報保護",
    "サイバーセキュリティ",
    "アカウント保護",
    "不正アクセス防止",
    "パスワード管理",
    "モバイル対応",
    "レスポンシブ",
    "ブラウザツール",
    "オンラインツール",
    "無料ツール",
    "YokaUnit",
    "ヨカユニット",
    "パスワードジェネレーター",
    "セキュア",
    "プライバシー保護",
    "一括生成",
    "複数パスワード",
    "文字数カスタマイズ",
    "記号含む",
    "数字含む",
    "大文字小文字",
    "似た文字除外",
    "パスワード強度",
    "強度チェック",
  ],
  openGraph: {
    title: "パスワード生成ツール｜強力で安全なパスワードを無料作成・セキュリティ対策 - YokaUnit",
    description:
      "ハッキング対策に最適な強力パスワードを瞬時に作成！文字数・記号・数字をカスタマイズ可能。ブラウザ内で完結するためプライバシー完全保護。セキュリティ専門家推奨の安全なパスワード作成ツール。モバイル完全対応で外出先でも安心。",
    url: "https://yokaunit.com/tools/password",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnitパスワード生成ツール - 強力で安全なパスワードを無料作成",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "パスワード生成ツール🔐 強力で安全なパスワードを無料作成",
    description:
      "ハッキング対策に最適な強力パスワードを瞬時に作成✨ 文字数・記号・数字をカスタマイズ可能🛡️ プライバシー完全保護で安心！モバイル完全対応📱",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/password",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
}

export default function PasswordGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "パスワード生成ツール", href: "/tools/password" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">🔐 パスワード生成ツール</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                安全で強力なパスワードを簡単に生成。ハッキング対策に最適な高セキュリティパスワードを瞬時に作成できます。
              </p>
            </div>

            <PasswordGenerator />

            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🛡️ 安全なパスワードの重要性</h2>
              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      強力なパスワードの特徴
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <div>
                          <strong>十分な長さ</strong>: 最低でも12文字以上が推奨されています。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <div>
                          <strong>複雑性</strong>:
                          大文字、小文字、数字、特殊記号を組み合わせることで、パスワードの強度が向上します。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <div>
                          <strong>予測不可能性</strong>: 誕生日や名前など、個人情報に基づくパスワードは避けましょう。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <div>
                          <strong>一意性</strong>: 異なるサービスごとに異なるパスワードを使用することが重要です。
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🔒</span>
                      パスワード管理のベストプラクティス
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">💡</span>
                        <div>
                          <strong>パスワードマネージャーの使用</strong>:
                          1つのマスターパスワードだけを覚えておけば、他のすべてのパスワードを安全に保存できます。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">💡</span>
                        <div>
                          <strong>二要素認証の有効化</strong>:
                          可能な限り、二要素認証を有効にして、パスワードだけでなく、別の認証方法も必要とするようにしましょう。
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">💡</span>
                        <div>
                          <strong>定期的なパスワード変更</strong>:
                          重要なアカウントのパスワードは定期的に変更することをお勧めします。
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    このツールの使い方
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        パスワードの長さを選択します（12文字以上を推奨）
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        含める文字の種類を選択します
                      </li>
                    </ol>
                    <ol className="space-y-2 text-sm" start={3}>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        「パスワードを生成」ボタンをクリック
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        生成されたパスワードをコピーして使用
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                      <p className="font-semibold text-green-800 mb-2">プライバシー完全保護</p>
                      <p className="text-green-700 text-sm">
                        このツールで生成されたパスワードはお使いのブラウザ内で作成され、サーバーには送信されません。完全にプライバシーが保護された状態でご利用いただけます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <RelatedTools currentToolSlug="password" />
      
      <SiteFooter />
    </div>
  )
}
