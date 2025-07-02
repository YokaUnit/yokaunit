import { SignupForm } from "@/components/auth/signup-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "新規登録 - YokaUnit｜無料アカウント作成でもっと便利に",
  description:
    "YokaUnitの無料アカウントを作成して、お気に入りツールの保存、利用履歴の管理、プレミアム機能のお試しなど、より便利にサービスをご利用いただけます。メールアドレスだけで簡単登録！",
  keywords: [
    "新規登録",
    "アカウント作成",
    "無料登録",
    "サインアップ",
    "会員登録",
    "YokaUnit",
    "便利ツール",
    "お気に入り保存",
    "利用履歴",
    "プレミアム機能",
    "メール登録",
  ],
  openGraph: {
    title: "新規登録 - YokaUnit｜無料アカウント作成でもっと便利に",
    description:
      "YokaUnitの無料アカウントを作成して、お気に入りツールの保存、利用履歴の管理など、より便利にサービスをご利用いただけます。メールアドレスだけで簡単登録！",
    url: "https://yokaunit.com/signup",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnit新規登録ページ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnit無料登録🆓 もっと便利にツールを使おう",
    description:
      "お気に入りツールの保存、利用履歴の管理、プレミアム機能のお試しなど特典満載✨ メールアドレスだけで簡単登録！",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/signup",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-8 px-4 relative z-10">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
