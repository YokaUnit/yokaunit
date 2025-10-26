import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ContactClient } from "./ContactClient"

export const metadata: Metadata = {
  title: "お問い合わせ｜YokaUnit - ツール開発のご要望・不具合報告・機能改善提案",
  description: "YokaUnitへのお問い合わせはこちらから。ツール開発のご要望・不具合報告・機能改善提案・企業向けサービス・広告掲載のご相談など、お気軽にご連絡ください。通常2営業日以内に返信いたします。",
  keywords: [
    "お問い合わせ",
    "YokaUnit",
    "ツール開発",
    "ご要望",
    "不具合報告",
    "機能改善",
    "企業向けサービス",
    "広告掲載",
    "業務提携",
    "メディア取材",
    "API連携",
    "セキュリティ",
    "サポート",
    "カスタマーサービス",
    "技術サポート",
    "お客様サポート",
    "問い合わせフォーム",
    "連絡先",
    "コンタクト",
    "サポートセンター"
  ],
  openGraph: {
    title: "お問い合わせ｜YokaUnit - ツール開発のご要望・不具合報告・機能改善提案",
    description: "YokaUnitへのお問い合わせはこちらから。ツール開発のご要望・不具合報告・機能改善提案・企業向けサービス・広告掲載のご相談など、お気軽にご連絡ください。通常2営業日以内に返信いたします。",
    url: "https://yokaunit.com/contact",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/contact-support.png",
        width: 1200,
        height: 630,
        alt: "お問い合わせ - YokaUnit サポート・お客様サービス"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ📞｜YokaUnit - ツール開発のご要望・不具合報告",
    description: "YokaUnitへのお問い合わせはこちらから✨ ツール開発のご要望・不具合報告・機能改善提案・企業向けサービス・広告掲載のご相談など📧 通常2営業日以内に返信📩",
    images: ["/ogp/contact-support.png"],
    creator: "@yokaunit",
    site: "@yokaunit"
  },
  alternates: {
    canonical: "https://yokaunit.com/contact"
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
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "お問い合わせ", href: "/contact" },
            ]}
          />
          <ContactClient />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}