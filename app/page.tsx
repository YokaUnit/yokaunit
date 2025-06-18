import { ToolsShowcase } from "@/components/tools-showcase"
import { HeroSection } from "@/components/hero-section"
import { BackgroundAnimation } from "@/components/background-animation"
import { CurrentlyBuilding } from "@/components/currently-building"
import { SocialRequestBanner } from "@/components/social-request-banner"
import { AdminMessage } from "@/components/admin-message"
import { CorporateSection } from "@/components/corporate-section"
import { MembershipSection } from "@/components/membership-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SEOHead } from "@/components/seo-head"
import { generateSEOData } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YokaUnit - 便利なWebツール集｜パスワード生成・診断ツール・ゲーム無料",
  description:
    "パスワード生成、相性診断、ゲームなど便利なWebツールを無料で提供。SEO対策済みで使いやすい。あなたの「あったらいいな」を実現するツール集。",
  keywords: ["Webツール", "無料ツール", "パスワード生成", "相性診断", "オンラインゲーム", "便利ツール", "YokaUnit"],
  openGraph: {
    title: "YokaUnit - 便利なWebツール集｜パスワード生成・診断ツール・ゲーム無料",
    description: "パスワード生成、相性診断、ゲームなど便利なWebツールを無料で提供。SEO対策済みで使いやすい。",
    url: "https://yokaunit.com",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/logofull.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit - 便利なWebツール集",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit - 便利なWebツール集｜パスワード生成・診断ツール・ゲーム無料",
    description: "パスワード生成、相性診断、ゲームなど便利なWebツールを無料で提供。",
    images: ["/ogp/logofull.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
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
}

export default function Home() {
  const seoData = generateSEOData({
    title: "YokaUnit - 便利なWebツール集｜パスワード生成・診断ツール・ゲーム無料",
    description:
      "パスワード生成、相性診断、ゲームなど便利なWebツールを無料で提供。SEO対策済みで使いやすい。あなたの「あったらいいな」を実現するツール集。",
    keywords: ["Webツール", "無料ツール", "パスワード生成", "相性診断", "オンラインゲーム", "便利ツール", "YokaUnit"],
    ogUrl: "https://yokaunit.com",
  })

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 relative overflow-hidden">
          <BackgroundAnimation />
          <HeroSection />
          <div className="container mx-auto px-4 py-6">
            <SocialRequestBanner />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <CurrentlyBuilding />
                <ToolsShowcase />
              </div>
              <div className="space-y-4">
                <AdminMessage />
                <CorporateSection />
                <MembershipSection />
              </div>
            </div>
          </div>
        </main>
        <ScrollToTop />
        <SiteFooter />
      </div>
    </>
  )
}
