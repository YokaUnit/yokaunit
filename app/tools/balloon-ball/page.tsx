import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import { getToolImageUrl } from "@/lib/tool-structured-data"
import { getToolBySlug } from "@/lib/actions/tools"
import { ToolHeroImage } from "@/components/tool-hero-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedTools } from "@/components/related-tools"
import { ViewCounter } from "@/components/view-counter"
import { ScrollToTop } from "@/components/scroll-to-top"
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

export default async function BalloonBallPage() {
  const imageUrl = await getToolImageUrl("balloon-ball")
  let tool = null
  let toolImageUrl = null
  try {
    tool = await getToolBySlug("balloon-ball")
    toolImageUrl = tool?.image_url || null
  } catch (error) {
    // ツールがデータベースに存在しない場合はnullを使用
    console.warn("Tool not found in database, using default values:", error)
  }
  
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
            image: [imageUrl],
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
            
            <div className="max-w-4xl mx-auto mt-4 md:mt-6">
            {/* ツール画像 */}
            {toolImageUrl && (
              <div className="mb-6">
                <ToolHeroImage imageUrl={toolImageUrl} title={tool?.title || "バルーンバッジアニメーション"} />
              </div>
            )}
            
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
          </div>
        </main>
        <RelatedTools currentToolSlug="balloon-ball" />
        <ScrollToTop />
        <SiteFooter />
      </div>
    </>
  )
}
