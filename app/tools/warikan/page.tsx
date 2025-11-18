import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
import WarikanClient from "./WarikanClient"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("warikan", {
  title: "割り勘計算機｜人数・金額・端数処理を自動計算・無料オンライン計算機 - YokaUnit",
  description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算！スマホ・PC対応で外出先でも便利。端数処理（切り上げ・切り捨て・四捨五入）・個別金額設定・履歴保存機能付き。飲み会・旅行・イベントの会計に最適。",
  keywords: [
    "割り勘計算機",
    "割り勘",
    "会計",
    "計算機",
    "端数処理",
    "切り上げ",
    "切り捨て",
    "四捨五入",
    "飲み会",
    "旅行",
    "イベント",
    "会計",
    "無料",
    "オンライン",
    "スマホ",
    "PC",
    "履歴保存",
    "個別金額",
    "人数計算",
    "金額計算",
    "自動計算",
    "便利ツール",
    "YokaUnit",
    "ヨカユニット"
  ],
  openGraph: {
    title: "割り勘計算機｜人数・金額・端数処理を自動計算・無料オンライン計算機",
    description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算！スマホ・PC対応で外出先でも便利。端数処理（切り上げ・切り捨て・四捨五入）・個別金額設定・履歴保存機能付き。飲み会・旅行・イベントの会計に最適。",
    url: "https://yokaunit.com/tools/warikan",
    siteName: "YokaUnit",
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "割り勘計算機💰｜人数・金額・端数処理を自動計算",
    description: "【完全無料】割り勘計算機で人数・金額・端数処理を自動計算✨ スマホ・PC対応で外出先でも便利📱 端数処理・個別金額設定・履歴保存機能付き📊",
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/tools/warikan"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
  })
}

export default async function WarikanPage() {
  const imageUrl = await getToolImageUrl("warikan")
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "割り勘計算機",
            description: "人数・金額・端数処理を自動計算！端数処理（切り上げ・切り捨て・四捨五入）・個別金額設定・履歴保存機能付き。",
            url: "https://yokaunit.com/tools/warikan",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            browserRequirements: "HTML5, JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: [imageUrl],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug="warikan" />
      <SiteHeader />
      <div className="min-h-screen relative">
        <BackgroundAnimation />
        <div className="relative z-10 container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ツール一覧", href: "/tools" },
              { label: "割り勘計算ツール", href: "/tools/warikan" },
            ]}
          />
          <WarikanClient />
        </div>
      </div>
      <CategoryTools category="計算" title="関連ツール（計算）" currentToolSlug="warikan" limit={8} />
      <RelatedTools currentToolSlug="warikan" />

      {/* SEO記事セクション */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💰 割り勘計算完全ガイド：会計のプロが教える効率的な支払い方法</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                割り勘の基本と現代社会での重要性
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                割り勘（割り前勘定）は、複数人で費用を等分に分ける会計方法です。
                現代社会では、飲み会、旅行、イベント、共同購入など様々な場面で
                割り勘が使われています。適切な割り勘計算は、人間関係を円滑にし、
                トラブルを防ぐ重要なスキルです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                特に日本では「おごり文化」から「割り勘文化」への変化が進んでおり、
                若い世代を中心に、公平で透明性の高い会計方法として
                割り勘が広く受け入れられています。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧮</span>
                  端数処理の種類と使い分け
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-2">切り上げ（Ceiling）</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      端数を常に上に丸める方法。支払い側に有利で、
                      集金側は確実に全額回収できる。
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                      例: 1,234円 ÷ 3人 = 411.33...円 → 412円
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-gray-900 mb-2">切り捨て（Floor）</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      端数を常に下に丸める方法。支払い側に有利で、
                      集金側は若干の不足が生じる可能性がある。
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                      例: 1,234円 ÷ 3人 = 411.33...円 → 411円
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-gray-900 mb-2">四捨五入（Round）</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      数学的に最も一般的な丸め方法。
                      公平性が高く、計算も簡単。
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded">
                      例: 1,234円 ÷ 3人 = 411.33...円 → 411円
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  場面別割り勘のベストプラクティス
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-gray-900 mb-2">飲み会・食事会</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 事前に予算を共有</li>
                      <li>• 個別注文の場合は個別計算</li>
                      <li>• 幹事の負担を考慮した調整</li>
                      <li>• クレジットカード決済の活用</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-2">旅行・宿泊</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 宿泊費、交通費、食費を分離</li>
                      <li>• 個室・相部屋の差額調整</li>
                      <li>• 現地での追加費用の管理</li>
                      <li>• 事前の予算配分の明確化</li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-semibold text-gray-900 mb-2">イベント・パーティー</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 会場費、装飾費、食材費の分類</li>
                      <li>• 参加人数の変動への対応</li>
                      <li>• キャンセル時の返金ルール</li>
                      <li>• 余剰金の処理方法</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                デジタル時代の割り勘管理術
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">アプリ・ツールの活用</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>決済アプリ</strong>: PayPay、LINE Pay、d払いでの即座決済</li>
                    <li>• <strong>会計アプリ</strong>: Splitwise、Settle Upでの詳細管理</li>
                    <li>• <strong>オンライン計算機</strong>: YokaUnit割り勘計算機での正確計算</li>
                    <li>• <strong>スプレッドシート</strong>: Google Sheets、Excelでの記録管理</li>
                    <li>• <strong>QRコード決済</strong>: 店舗での簡単な個別決済</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">トラブル回避のポイント</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>事前合意</strong>: 計算方法と端数処理の事前確認</li>
                    <li>• <strong>透明性</strong>: 計算過程の可視化と共有</li>
                    <li>• <strong>記録保存</strong>: レシートと計算結果の保存</li>
                    <li>• <strong>柔軟性</strong>: 状況に応じた調整の余地</li>
                    <li>• <strong>コミュニケーション</strong>: 不明点の早期解決</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                割り勘計算の数学的基礎とアルゴリズム
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">基本計算式</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    一人当たり = 総額 ÷ 人数<br/>
                    端数 = 総額 - (一人当たり × 人数)<br/>
                    調整額 = 端数 ÷ 人数
                  </div>
                  <p className="text-sm text-gray-600">
                    基本的な割り勘計算の数式。
                    端数の発生とその処理方法。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">個別金額対応</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    個別合計 = Σ(個人の支払額)<br/>
                    差額 = 総額 - 個別合計<br/>
                    調整 = 差額 ÷ 人数
                  </div>
                  <p className="text-sm text-gray-600">
                    個別に異なる金額を支払った場合の
                    調整計算アルゴリズム。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">端数配分最適化</h4>
                  <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                    最小二乗法<br/>
                    公平性指標<br/>
                    効率性評価
                  </div>
                  <p className="text-sm text-gray-600">
                    最も公平で効率的な端数配分を
                    求める最適化アルゴリズム。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                割り勘でよくあるトラブルと解決策
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">トラブルパターン</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1 text-red-600">よくあるトラブル</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 計算ミスによる金額の不一致</li>
                        <li>• 端数処理方法の事前合意不足</li>
                        <li>• 個別支払いの記録漏れ</li>
                        <li>• キャンセル時の返金処理</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1 text-green-600">効果的な解決策</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 計算機ツールの活用</li>
                        <li>• 事前ルールの明確化</li>
                        <li>• レシートと記録の保存</li>
                        <li>• 柔軟な調整システム</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">予防策とベストプラクティス</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>事前準備</strong>: 計算方法とルールの事前共有</li>
                    <li>• <strong>記録管理</strong>: レシートと計算結果のデジタル保存</li>
                    <li>• <strong>透明性</strong>: 計算過程の可視化と共有</li>
                    <li>• <strong>柔軟性</strong>: 状況変化への対応力</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                ビジネスシーンでの割り勘活用
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">企業・組織での活用</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">会議・研修</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 会議室利用料の分担</li>
                        <li>• 研修費用の配分</li>
                        <li>• 出張費の精算</li>
                        <li>• 懇親会費の管理</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">プロジェクト</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 共同開発費の分担</li>
                        <li>• マーケティング費用の配分</li>
                        <li>• イベント運営費の管理</li>
                        <li>• リソース共有コスト</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">YokaUnit割り勘計算機の特徴</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>高精度計算</strong>: 複雑な端数処理も正確に計算</li>
                    <li>• <strong>個別金額対応</strong>: 異なる支払い金額の調整機能</li>
                    <li>• <strong>履歴保存</strong>: 過去の計算結果を保存・参照可能</li>
                    <li>• <strong>エクスポート機能</strong>: CSV形式でのデータ出力</li>
                    <li>• <strong>モバイル対応</strong>: スマホ・タブレットで外出先でも利用</li>
                    <li>• <strong>プライバシー保護</strong>: ブラウザ内完結でデータ漏洩なし</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                国際的な割り勘文化と比較
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">各国の割り勘文化</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">日本</h5>
                      <p className="text-xs text-gray-600">
                        細かい計算を重視、公平性を最優先、
                        レシートの保存、デジタル決済の普及
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">アメリカ</h5>
                      <p className="text-xs text-gray-600">
                        チップ文化、個別計算、クレジットカード決済、
                        アプリの活用、簡潔な計算
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">ヨーロッパ</h5>
                      <p className="text-xs text-gray-600">
                        現金文化、シンプルな計算、サービス料込み、
                        文化的配慮、伝統的な方法
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <h5 className="font-semibold text-sm mb-1">アジア</h5>
                      <p className="text-xs text-gray-600">
                        年長者への配慮、面子文化、集団調和、
                        デジタル決済の普及、効率重視
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">グローバル化への対応</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>多通貨対応</strong>: 為替レートを考慮した計算</li>
                    <li>• <strong>文化的配慮</strong>: 各国の習慣に応じた調整</li>
                    <li>• <strong>言語対応</strong>: 多言語での計算結果表示</li>
                    <li>• <strong>決済方法</strong>: 国際的な決済手段への対応</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                YokaUnitの割り勘計算機は、正確で使いやすい会計管理を提供します。
                この記事が、効率的な割り勘管理の参考になれば幸いです。
              </p>
              <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                <span>#割り勘計算</span>
                <span>#会計管理</span>
                <span>#端数処理</span>
                <span>#計算機</span>
                <span>#会計ツール</span>
                <span>#便利ツール</span>
                <span>#YokaUnit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <SiteFooter />
    </>
  )
}