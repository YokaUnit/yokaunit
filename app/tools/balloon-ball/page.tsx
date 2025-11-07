import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { SiteHeader } from "@/components/site-header"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"
import "./styles.css"
import ElasticBoxPhysics from "./components/elastic-box-physics"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("balloon-ball", {
    title: "バルーンバッジアニメーション｜物理エフェクト付きインタラクティブバッジ【無料・登録不要】",
    description:
      "風船のような物理エフェクトを持つインタラクティブなバッジアニメーション。ドラッグで動かせるバルーンバッジを無料で作成できます。登録不要・スマホ対応で簡単に使えます。",
    keywords: [
      "バルーンバッジ",
      "バッジアニメーション",
      "物理エフェクト",
      "インタラクティブバッジ",
      "風船アニメーション",
      "バルーンエフェクト",
      "無料バッジ作成",
      "バッジデザイン",
      "アニメーションバッジ",
      "物理シミュレーション",
      "ドラッグアンドドロップ",
      "インタラクティブデザイン",
      "バルーンデザイン",
      "無料ツール",
      "登録不要",
      "YokaUnit",
      "ヨカユニット",
      "便利ツール",
      "オンラインツール",
    ],
    openGraph: {
      title: "バルーンバッジアニメーション｜物理エフェクト付きインタラクティブバッジ【無料・登録不要】",
      description:
        "風船のような物理エフェクトを持つインタラクティブなバッジアニメーション。ドラッグで動かせるバルーンバッジを無料で作成できます。登録不要・スマホ対応で簡単に使えます。",
      url: "https://yokaunit.com/tools/balloon-ball",
      siteName: "YokaUnit",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "バルーンバッジアニメーション🎈｜物理エフェクト付きインタラクティブバッジ",
      description:
        "風船のような物理エフェクトを持つインタラクティブなバッジアニメーション✨ ドラッグで動かせるバルーンバッジを無料で作成できます🎨 登録不要・スマホ対応で簡単に使えます📱",
      creator: "@yokaunit",
      site: "@yokaunit",
    },
    alternates: {
      canonical: "https://yokaunit.com/tools/balloon-ball",
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
  })
}

export default function BalloonBallPage() {
  // バッジの設定をカスタマイズできます
  const badgeConfig = {
    // 個人情報
    firstName: "太郎",
    lastName: "山田",
    company: "YokaUnit",
    role: "ユーザー",
    badgeId: "#000001",

    // イベント情報
    eventName: "Balloon Ball",
    eventDates: "インタラクティブバッジ",
    eventTagline: "風船のように動くバッジ",

    // スタイリング
    badgeColor: "#3b82f6",
    badgeBottomColor: "#1e3a8a",

    // ソーシャル
    socialLink: "",

    // フッター
    footerText: "作成者",
    footerLink: "https://yokaunit.com",
    footerLinkText: "YokaUnit",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "バルーンバッジアニメーション",
            description:
              "風船のような物理エフェクトを持つインタラクティブなバッジアニメーション。ドラッグで動かせるバルーンバッジを無料で作成できます。",
            url: "https://yokaunit.com/tools/balloon-ball",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
            image: ["https://yokaunit.com/ogp/yokaunit-common.png"],
            publisher: { "@type": "Organization", name: "YokaUnit", url: "https://yokaunit.com" },
          }),
        }}
      />
      <ViewCounter toolSlug="balloon-ball" />
      <SiteHeader />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundAnimation />
        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "バルーンバッジアニメーション", href: "/tools/balloon-ball" },
              ]}
            />
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">バルーンバッジアニメーション</h1>
              <p className="text-gray-600">
                風船のような物理エフェクトを持つインタラクティブなバッジアニメーション。ドラッグで動かせます。
              </p>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white">
              <ElasticBoxPhysics config={badgeConfig} />
            </div>
          </div>
        </main>
        <RelatedTools currentToolSlug="balloon-ball" />

        {/* SEO記事 */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🎈 バルーンバッジアニメーション完全ガイド：物理エフェクト・インタラクティブデザインの科学
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎈</span>
                  バルーンバッジアニメーションとは
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  バルーンバッジアニメーションは、物理エンジンを使用して風船のような動きを再現するインタラクティブなバッジデザインです。
                  重力や弾性を考慮したリアルな物理シミュレーションにより、ユーザーがドラッグすると自然な動きで反応します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  このツールでは、カスタマイズ可能なバッジデザインに物理エフェクトを組み合わせることで、
                  視覚的に魅力的でインタラクティブな体験を提供します。
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  主な機能
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>物理ベースのバルーンアニメーション</li>
                  <li>カスタマイズ可能なバッジデザイン</li>
                  <li>レスポンシブデザイン（モバイル対応）</li>
                  <li>重力エフェクトと弾性シミュレーション</li>
                  <li>ドラッグアンドドロップ操作</li>
                  <li>リアルタイム物理計算</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  使い方
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>バッジをマウスでドラッグして動かすことができます</li>
                  <li>離すと物理エンジンにより自然な動きで元の位置に戻ります</li>
                  <li>モバイルデバイスではタッチ操作で同様に操作できます</li>
                  <li>バッジ内の風船は物理シミュレーションにより動き続けます</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  技術的な特徴
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  このアニメーションは、Framer Motionを使用した物理シミュレーションと、
                  React Hooksを活用した状態管理により実現されています。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  重力、弾性、摩擦などの物理法則を考慮した計算により、
                  リアルな風船の動きを再現しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
