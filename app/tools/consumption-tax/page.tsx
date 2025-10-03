import type { Metadata } from 'next';
import { TaxCalculator } from './components/TaxCalculator';
import { CalculationHistory } from './components/CalculationHistory';
import { ConsumptionTaxProvider } from './context/ConsumptionTaxContext';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BackgroundAnimation } from '@/components/background-animation';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { 
  SEO_METADATA, 
  STRUCTURED_DATA, 
  FAQ_STRUCTURED_DATA, 
  BREADCRUMB_STRUCTURED_DATA 
} from './lib/seo-data';

export const metadata: Metadata = {
  title: SEO_METADATA.title,
  description: SEO_METADATA.description,
  keywords: SEO_METADATA.keywords.join(', '),
  openGraph: {
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    type: 'website',
    url: SEO_METADATA.canonical,
    images: [
      {
        url: SEO_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: '消費税計算機｜税込・税抜・税額を瞬時に計算 - YokaUnit',
      },
    ],
    siteName: 'YokaUnit',
  },
  twitter: {
    card: 'summary_large_image',
    title: '消費税計算機💰税込・税抜・税額を瞬時に計算｜無料オンライン計算機',
    description: '消費税10%・8%の計算が瞬時にできる無料オンライン計算機✨ 軽減税率対応・履歴保存・CSV出力機能付き📊 経理・会計・確定申告に便利🆓',
    images: [SEO_METADATA.ogImage],
    creator: '@yokaunit',
  },
  alternates: {
    canonical: SEO_METADATA.canonical,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConsumptionTaxPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_STRUCTURED_DATA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BREADCRUMB_STRUCTURED_DATA),
        }}
      />

      <SiteHeader />
      <BackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "ツール一覧", href: "/tools" },
              { label: "消費税計算機", href: "/tools/consumption-tax" },
            ]}
          />
          
          <ConsumptionTaxProvider>
            {/* メインタイトル */}
            <div className="text-center mb-12 mt-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                消費税計算機｜税込・税抜・税額を瞬時に計算
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                <strong>消費税10%・8%の計算が瞬時にできる無料オンライン計算機。</strong>税込価格から税抜価格、税抜価格から税込価格、税額のみの計算に対応。
                <strong>軽減税率8%にも対応し、スマホ・PCで使いやすく、履歴保存・CSV出力機能付き。</strong>経理・会計・日常の買い物・確定申告に便利。
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: '🆓 完全無料', color: 'bg-green-100 text-green-800' },
                  { label: '📱 スマホ対応', color: 'bg-blue-100 text-blue-800' },
                  { label: '⚡ 瞬時計算', color: 'bg-yellow-100 text-yellow-800' },
                  { label: '📊 履歴保存', color: 'bg-purple-100 text-purple-800' },
                  { label: '📁 CSV出力', color: 'bg-indigo-100 text-indigo-800' },
                  { label: '🏪 軽減税率対応', color: 'bg-pink-100 text-pink-800' },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 計算機セクション */}
            <section id="calculator" className="mb-16">
              <TaxCalculator />
            </section>

            {/* 履歴セクション */}
            <section id="history" className="mb-16">
                          <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                計算履歴
              </h2>
              <p className="text-gray-600">
                過去の計算結果を確認したり、<strong>Excel対応のCSVファイル</strong>としてエクスポートできます。
                <br className="hidden sm:block" />
                <span className="text-sm text-gray-500">※文字化け対策済み・BOM付きUTF-8形式</span>
              </p>
            </div>
              <CalculationHistory />
            </section>
          </ConsumptionTaxProvider>

          {/* 機能紹介セクション */}
          <section id="features" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                主な機能
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ビジネスや日常生活で役立つ様々な消費税計算機能を提供しています。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🧮',
                  title: '3種類の計算方式',
                  description: '税込→税抜、税抜→税込、税額のみ計算の3つの方式に対応',
                },
                {
                  icon: '💰',
                  title: '複数税率対応',
                  description: '10%（標準）、8%（軽減）、5%、3%など過去の税率にも対応',
                },
                {
                  icon: '🌍',
                  title: '外貨換算機能',
                  description: 'USD、EUR、GBP、CNY、KRWなど主要通貨での計算が可能',
                },
                {
                  icon: '📊',
                  title: '計算履歴保存',
                  description: '最大100件の計算履歴を保存し、いつでも確認可能',
                },
                {
                  icon: '📁',
                  title: 'Excel対応CSV出力',
                  description: '計算履歴をExcel対応のCSVファイルでダウンロード（文字化け対策済み）',
                },
                {
                  icon: '📱',
                  title: 'モバイル対応',
                  description: 'スマートフォンやタブレットでも快適に利用可能',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ セクション */}
          <section id="faq" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                よくある質問
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                消費税計算機の使い方や機能について、よく寄せられる質問にお答えします。
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: '消費税10%の計算方法は？税込1100円の税抜価格は？',
                  answer: '税込価格から税抜価格を計算する場合：税抜価格 = 税込価格 ÷ 1.10です。例：1100円÷1.10=1000円（税抜）。税抜価格から税込価格を計算する場合：税込価格 = 税抜価格 × 1.10です。例：1000円×1.10=1100円（税込）。',
                },
                {
                  question: '軽減税率8%の計算方法は？食品の消費税計算は？',
                  answer: '軽減税率8%の場合、税込価格から税抜価格：税抜価格 = 税込価格 ÷ 1.08。例：1080円÷1.08=1000円（税抜）。税抜価格から税込価格：税込価格 = 税抜価格 × 1.08。例：1000円×1.08=1080円（税込）。食品・飲料・新聞などが軽減税率8%の対象です。',
                },
                {
                  question: 'このツールは無料で使えますか？会員登録は必要？',
                  answer: 'はい、完全無料でご利用いただけます。会員登録も不要で、広告もありません。スマホ・PCどちらからでもすぐに使えます。',
                },
                {
                  question: '計算履歴は保存されますか？CSV出力はできる？',
                  answer: 'はい、計算履歴はブラウザのローカルストレージに自動保存され、最大100件まで保存できます。Excel対応のCSVファイルとしてダウンロードも可能で、文字化けすることなくExcelで開いて管理できます。',
                },
                {
                  question: 'スマホでも使いやすいですか？iPhone・Androidで動作する？',
                  answer: 'はい、iPhone・Android・タブレット・PCすべてに対応したレスポンシブデザインです。タッチ操作にも最適化されており、外出先でも快適に使えます。',
                },
                {
                  question: '外貨での計算は可能ですか？米ドル・ユーロに対応？',
                  answer: 'はい、日本円・米ドル・ユーロ・英ポンド・中国元・韓国ウォンなど主要通貨に対応しています。海外取引や輸入商品の価格計算にも便利です。',
                },
                {
                  question: '経理・会計業務で使えますか？インボイス制度対応？',
                  answer: 'はい、経理・会計業務に最適です。請求書作成、仕入税額控除の計算、確定申告の準備などにご活用いただけます。インボイス制度にも対応した正確な計算が可能です。',
                },
                {
                  question: '過去の税率（5%・3%）でも計算できますか？',
                  answer: 'はい、過去の消費税率にも対応しています。3%（1989年〜）、5%（1997年〜）、8%（2014年〜）、10%（2019年〜）すべての税率で計算可能です。',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-900">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* 使い方ガイド */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                使い方ガイド
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">計算種別を選択</h3>
                  <p className="text-green-700 text-sm">
                    税込→税抜、税抜→税込、税額計算から選択
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">金額と税率を入力</h3>
                  <p className="text-green-700 text-sm">
                    計算したい金額と適用する税率を入力
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">結果を確認</h3>
                  <p className="text-green-700 text-sm">
                    計算結果と計算式を確認し、必要に応じて履歴を保存
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
