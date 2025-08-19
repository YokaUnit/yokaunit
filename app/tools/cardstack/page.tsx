import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import CardStackClientPage from "./CardStackClientPage"
import { webPageStructuredData, gameStructuredData, faqStructuredData } from "./lib/structured-data"

export const metadata: Metadata = {
  title: "トランプ山札めくるだけ｜ハイ&ロー・マーク予想・ジョーカーロシアンルーレット【2024年最新版】 | yokaunit",
  description:
    "【完全無料】54枚のトランプ（ジョーカー含む）の山札からカードをめくるだけのシンプルなツール。ハイ&ロー、マーク予想、ジョーカーロシアンルーレットなど、お好きな遊び方で楽しめます。引いたカードは履歴に表示され、リセット機能付きで何度でも楽しめます。",
  keywords: [
    "ハイ&ロー",
    "トランプ",
    "山札",
    "ジョーカーロシアンルーレット",
    "マーク予想ゲーム",
    "カードゲーム",
    "トランプゲーム",
    "54枚",
    "ジョーカー",
    "運試し",
    "カード占い",
    "予想ゲーム",
    "ハイローゲーム",
    "スーツ予想",
    "数字予想",
    "確率ゲーム",
    "カジノゲーム",
    "ギャンブルゲーム",
    "無料ゲーム",
    "ブラウザゲーム",
    "オンラインゲーム",
    "パーティーゲーム",
    "暇つぶし",
    "エンターテイメント",
    "YokaUnit",
    "ヨカユニット",
    "トランプ占い",
    "カード引き",
    "山札ゲーム",
    "ロシアンルーレット",
    "スペード",
    "ハート",
    "ダイヤ",
    "クラブ",
    "エース",
    "キング",
    "クイーン",
    "ジャック",
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
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
  alternates: {
    canonical: "https://yokaunit.com/tools/cardstack",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/tools/cardstack",
    siteName: "YokaUnit",
    title: "トランプ山札めくるだけ｜ハイ&ロー・マーク予想・ジョーカーロシアンルーレット【2024年最新版】",
    description: "【完全無料】54枚のトランプでハイ&ローゲーム、マーク予想ゲーム、ジョーカーロシアンルーレットが楽しめる！山札から1枚ずつカードを引いて運試し。",
    images: [
      {
        url: "/ogp/cardstack-game.png",
        width: 1200,
        height: 630,
        alt: "トランプ山札めくるだけ - ハイ&ロー・マーク予想・ジョーカーロシアンルーレット",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yokaunit",
    creator: "@yokaunit",
    title: "トランプ山札めくるだけ🃏｜ハイ&ロー・マーク予想ゲーム",
    description: "54枚のトランプで運試し🎲 ハイ&ローゲーム📈 マーク予想🔮 ジョーカーロシアンルーレット💥 完全無料で楽しめる！",
    images: ["/ogp/cardstack-game.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
}

const breadcrumbItems = [
  { label: "ホーム", href: "/" },
  { label: "ツール一覧", href: "/tools" },
  { label: "トランプ山札めくるだけ", href: "/tools/cardstack" },
]

export default function CardStackPage() {
  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <SiteHeader />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="text-xs sm:text-sm mb-4">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
                        <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight px-2">
                🃏 トランプ山札めくるだけ
              </h1>
              <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                54枚のトランプ（ジョーカー含む）の山札からカードをめくるだけのシンプルなツールです。
                ハイ&ロー、マーク予想、ジョーカーロシアンルーレットなど、お好きな遊び方でお楽しみください。
              </p>
            </div>
            <CardStackClientPage />
            
            {/* SEO用の追加コンテンツ */}
            <div className="mt-8 max-w-4xl mx-auto">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 ゲームモード紹介</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🃏 フリードロー</h3>
                    <p className="text-gray-600 text-sm">
                      予想なしで自由にカードを引くモード。純粋にカードを引く楽しみを味わえます。
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">📈 ハイ&ロー</h3>
                    <p className="text-gray-600 text-sm">
                      現在のカードより次のカードが高いか低いかを予想。数値の駆け引きが楽しいゲームです。
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🔮 マーク予想</h3>
                    <p className="text-gray-600 text-sm">
                      次のカードのマーク（♠♥♦♣）を予想。4分の1の確率で的中する予想ゲームです。
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">💥 ジョーカールーレット</h3>
                    <p className="text-gray-600 text-sm">
                      ジョーカーを引いたら負け！54分の2の確率でジョーカーが出るロシアンルーレット。
                    </p>
                  </div>
      </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ よくある質問</h2>
                <div className="space-y-4">
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">トランプ山札めくるだけとはどんなゲームですか？</summary>
                    <p className="mt-3 text-gray-600">
                      54枚のトランプカード（ジョーカー2枚含む）を使用したオンラインカードゲームです。ハイ&ローゲーム、マーク予想ゲーム、ジョーカーロシアンルーレットの3つのモードで楽しめます。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">引いたカードはどうなりますか？</summary>
                    <p className="mt-3 text-gray-600">
                      一度引いたカードは山札から除外され、履歴として表示されます。リセットボタンを押すまで山札は減り続けます。これにより、残りカードの確率が変化していく戦略性があります。
                    </p>
                  </details>
                  <details className="bg-white rounded-lg shadow-md p-6">
                    <summary className="font-bold cursor-pointer">無料で遊べますか？</summary>
                    <p className="mt-3 text-gray-600">
                      はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。
                    </p>
                  </details>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ 関連キーワード</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "ハイ&ロー", "トランプ", "山札", "ジョーカーロシアンルーレット", "マーク予想ゲーム",
                      "カードゲーム", "運試し", "確率ゲーム", "オンラインゲーム", "無料ゲーム",
                      "スペード", "ハート", "ダイヤ", "クラブ", "ジョーカー", "暇つぶし"
                    ].map((keyword) => (
                      <span key={keyword} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
      </div>
        </div>
              </section>
        </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}