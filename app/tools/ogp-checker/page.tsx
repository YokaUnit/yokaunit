import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"
import { OGPCheckerClient } from "./OGPCheckerClient"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("ogp-checker", {
    title: "OGPチェッカー｜無料メタデータ・SNS最適化ツール - ブロガー・SEO必携",
    description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック！SEOスコア分析・改善提案・バッチチェック対応。ブロガー・マーケター・SEO担当者必携の最強ツール。",
    keywords: [
      "OGPチェッカー",
      "OGPチェッカー 無料",
      "OGPチェッカー オンライン",
      "メタデータチェッカー",
      "メタデータチェッカー 無料",
      "OGP画像確認",
      "OGP画像 サイズ",
      "OGP画像 最適化",
      "Twitter Card確認",
      "Twitter Card チェッカー",
      "Facebook Card確認",
      "Facebook Card チェッカー",
      "メタタグ確認",
      "メタタグチェッカー",
      "SEOチェッカー",
      "SEOチェッカー 無料",
      "OGP検証",
      "OGP検証ツール",
      "メタデータ検証",
      "メタデータ検証ツール",
      "Open Graph確認",
      "Open Graph チェッカー",
      "SNS最適化",
      "SNS最適化ツール",
      "ソーシャルメディア最適化",
      "ソーシャルメディア ツール",
      "OGP画像生成",
      "OGP画像生成ツール",
      "メタデータ生成",
      "メタデータ生成ツール",
      "SEO分析",
      "SEO分析ツール",
      "ウェブサイト分析",
      "ウェブサイト分析ツール",
      "ブロガーツール",
      "ブロガー 便利ツール",
      "マーケティングツール",
      "マーケティング 便利ツール",
      "SEOツール",
      "SEOツール 無料",
      "無料OGPチェッカー",
      "無料メタデータチェッカー",
      "オンラインOGPチェッカー",
      "オンラインメタデータチェッカー",
      "OGP画像最適化",
      "メタデータ最適化",
      "SNS投稿最適化",
      "SNS投稿 ツール",
      "OGP画像生成",
      "メタデータ生成",
      "SEOスコア",
      "SEOスコア 分析",
      "バッチチェック",
      "バッチチェック ツール",
      "YokaUnit",
      "ヨカユニット",
      "便利ツール",
      "無料ツール",
      "オンラインツール"
    ],
    openGraph: {
      title: "OGPチェッカー｜無料メタデータ・SNS最適化ツール - ブロガー・SEO必携",
      description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック！SEOスコア分析・改善提案・バッチチェック対応。ブロガー・マーケター・SEO担当者必携の最強ツール。",
      url: "https://yokaunit.com/tools/ogp-checker",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "OGPチェッカー🔍｜無料メタデータ・SNS最適化ツール",
      description: "【完全無料・登録不要】OGPチェッカーでメタデータ・OGP画像・Twitter Card・Facebook Cardを瞬時にチェック✨ SEOスコア分析・改善提案・バッチチェック対応📊 ブロガー・マーケター・SEO担当者必携の最強ツール🛠️",
      creator: "@yokaunit",
      site: "@yokaunit"
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/ogp-checker"
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

export default function OGPCheckerPage() {
  return (
    <>
      <ViewCounter toolSlug="ogp-checker" />
      <SiteHeader />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "OGPチェッカー", href: "/tools/ogp-checker" },
              ]}
            />
            <OGPCheckerClient />
          </div>
        </main>
        <RelatedTools currentToolSlug="ogp-checker" />
        
        {/* SEO記事 */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔍 OGPチェッカー完全ガイド：メタデータ最適化・SNSマーケティング・SEO技術の科学</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  OGPの歴史と技術的背景
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Open Graph Protocol（OGP）は、2010年にFacebookが開発した
                  メタデータ標準です。SNSでのリンク共有時に、より魅力的で
                  情報豊富なプレビューを表示することを目的として設計されました。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  現在では、Twitter、LinkedIn、WhatsApp、Slackなど
                  多くのプラットフォームで採用され、デジタルマーケティングと
                  SEO戦略において不可欠な技術となっています。
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    OGPメタデータの基本構造
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-900 mb-2">必須メタデータ</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>og:title</strong>: ページのタイトル</li>
                        <li>• <strong>og:type</strong>: コンテンツの種類</li>
                        <li>• <strong>og:image</strong>: 表示画像のURL</li>
                        <li>• <strong>og:url</strong>: ページの正規URL</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-gray-900 mb-2">推奨メタデータ</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>og:description</strong>: ページの説明</li>
                        <li>• <strong>og:site_name</strong>: サイト名</li>
                        <li>• <strong>og:locale</strong>: 言語・地域設定</li>
                        <li>• <strong>og:image:width/height</strong>: 画像サイズ</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    SEOスコアの計算方法
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-gray-900 mb-2">基本スコア（60点）</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• タイトル存在: 15点</li>
                        <li>• 説明文存在: 15点</li>
                        <li>• 画像存在: 15点</li>
                        <li>• URL存在: 15点</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-gray-900 mb-2">品質ボーナス（40点）</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• タイトル長さ: 10点</li>
                        <li>• 説明文長さ: 10点</li>
                        <li>• 画像サイズ: 10点</li>
                        <li>• Twitter Card: 10点</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  OGP最適化のベストプラクティス
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">画像最適化</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>推奨サイズ</strong>: 1200×630px（1.91:1比率）</li>
                      <li>• <strong>ファイル形式</strong>: JPG、PNG、WebP</li>
                      <li>• <strong>ファイルサイズ</strong>: 8MB以下</li>
                      <li>• <strong>アスペクト比</strong>: 1.91:1（Facebook推奨）</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">テキスト最適化</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>タイトル</strong>: 60文字以内</li>
                      <li>• <strong>説明文</strong>: 160文字以内</li>
                      <li>• <strong>キーワード</strong>: 自然な配置</li>
                      <li>• <strong>感情表現</strong>: エンゲージメント向上</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    SNSプラットフォーム別対応
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Facebook</h4>
                      <p className="text-xs text-gray-600">1.91:1比率、1200×630px推奨</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Twitter</h4>
                      <p className="text-xs text-gray-600">1.91:1比率、1200×630px推奨</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">LinkedIn</h4>
                      <p className="text-xs text-gray-600">1.91:1比率、1200×630px推奨</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🔧</span>
                    技術的実装
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">HTML実装</h4>
                      <p className="text-xs text-gray-600">metaタグの適切な配置</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">動的生成</h4>
                      <p className="text-xs text-gray-600">CMS・フレームワーク対応</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">検証ツール</h4>
                      <p className="text-xs text-gray-600">Facebook Debugger、Twitter Card Validator</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    マーケティング効果
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">CTR向上</h4>
                      <p className="text-xs text-gray-600">視覚的魅力によるクリック率向上</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">ブランド認知</h4>
                      <p className="text-xs text-gray-600">一貫したブランドイメージ</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">SEO効果</h4>
                      <p className="text-xs text-gray-600">ソーシャルシグナルの向上</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  よくある問題と解決策
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">技術的問題</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>画像が表示されない</strong>: URLの確認、HTTPS対応</li>
                      <li>• <strong>キャッシュ問題</strong>: Facebook Debuggerでキャッシュクリア</li>
                      <li>• <strong>文字化け</strong>: UTF-8エンコーディング確認</li>
                      <li>• <strong>サイズ問題</strong>: 画像サイズの最適化</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">コンテンツ問題</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>タイトルが長すぎる</strong>: 60文字以内に調整</li>
                      <li>• <strong>説明文が短い</strong>: 100文字以上を推奨</li>
                      <li>• <strong>画像が不適切</strong>: ブランドに合った画像選択</li>
                      <li>• <strong>更新されない</strong>: キャッシュクリアと再検証</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔮</span>
                  将来のトレンドと展望
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">技術的進化</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>AI生成メタデータ</strong>: 自動最適化</li>
                      <li>• <strong>動的OGP</strong>: リアルタイム更新</li>
                      <li>• <strong>AR/VR対応</strong>: 次世代体験</li>
                      <li>• <strong>音声対応</strong>: 音声検索最適化</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">マーケティング進化</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>パーソナライゼーション</strong>: 個別最適化</li>
                      <li>• <strong>モバイルファースト</strong>: モバイル体験の優先</li>
                      <li>• <strong>アクセシビリティ</strong>: インクルーシブデザインの推進</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  OGPチェッカーは、効果的なメタデータ戦略の構築に不可欠なツールです。
                  適切な設定により、SNSでのエンゲージメント向上とSEO効果の改善が期待できます。
                  継続的な最適化と改善により、デジタルマーケティングの成功を実現しましょう。
                </p>
                <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                  <span>#OGPチェッカー</span>
                  <span>#メタデータ</span>
                  <span>#SNSマーケティング</span>
                  <span>#SEO</span>
                  <span>#最適化</span>
                  <span>#YokaUnit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
