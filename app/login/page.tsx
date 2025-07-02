import { LoginForm } from "@/components/auth/login-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ログイン - YokaUnit｜便利ツールにアクセス",
  description:
    "YokaUnitにログインして、お気に入りツールの保存、プレミアム機能の利用、個人設定のカスタマイズなど、より便利にサービスをご利用いただけます。アカウントをお持ちでない方は新規登録も可能です。",
  keywords: [
    "ログイン",
    "サインイン",
    "アカウント",
    "会員ログイン",
    "YokaUnit",
    "便利ツール",
    "プレミアム機能",
    "お気に入り",
    "個人設定",
    "ユーザー認証",
  ],
  openGraph: {
    title: "ログイン - YokaUnit｜便利ツールにアクセス",
    description:
      "YokaUnitにログインして、お気に入りツールの保存、プレミアム機能の利用など、より便利にサービスをご利用いただけます。",
    url: "https://yokaunit.com/login",
    siteName: "YokaUnit",
    images: [
      {
        url: "/ogp/yokaunit-common.png",
        width: 1200,
        height: 630,
        alt: "YokaUnitログインページ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YokaUnitにログイン🔐 便利ツールにアクセス",
    description: "お気に入りツールの保存、プレミアム機能の利用など、より便利にサービスをご利用いただけます✨",
    images: ["/ogp/yokaunit-common.png"],
    creator: "@yokaunit",
    site: "@yokaunit",
  },
  alternates: {
    canonical: "https://yokaunit.com/login",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-8 px-4 relative z-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
