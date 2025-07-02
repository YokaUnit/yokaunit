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
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YokaUnit - 無料で使える便利なWebツール集｜パスワード生成・チンチロゲーム・SEO対策ツール",
  description:
    "YokaUnitは完全無料で使える便利なWebツール集です。パスワード生成、チンチロゲーム、SEO対策ツールなど、あなたの「あったらいいな」を実現する高品質ツールを多数提供。ブラウザですぐ使える、登録不要の便利ツールをお試しください。",
  keywords: [
    "無料ツール",
    "Webツール",
    "オンラインツール",
    "便利ツール",
    "パスワード生成",
    "チンチロゲーム",
    "SEO対策",
    "ブラウザツール",
    "登録不要",
    "YokaUnit",
    "ヨカユニッ��",
    "無料アプリ",
    "オンラインゲーム",
    "セキュリティツール",
    "暗号化ツール",
    "文字数カウント",
    "QRコード生成",
  ],
  openGraph: {
    title: "YokaUnit - 無料で使える便利なWebツール集｜登録不要ですぐ使える",
    description:
      "パスワード生成、チンチロゲーム、SEO対策ツールなど、完全無料で使える便利なWebツールが満載！ブラウザですぐ使える、登録不要の高品質ツールをお試しください。あなたの作業効率を劇的にアップさせます。",
    url: "https://yokaunit.com",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit - 無料で使える便利なWebツール集",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit - 無料で使える便利なWebツール集🛠️",
    description:
      "パスワード生成、チンチロゲーム、SEO対策ツールなど完全無料！登録不要ですぐ使える便利ツールが満載✨ あなたの作業効率を劇的アップ🚀",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com",
  },
}

export default function Home() {
  return (
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
  )
}
