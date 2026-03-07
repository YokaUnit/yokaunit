import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"
import { AuthHandler } from "@/components/auth/auth-handler"
import { SupabaseDisabledBanner } from "@/components/supabase-disabled-banner"
import Script from "next/script"
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from "@/lib/seo/structured-data"
import { StructuredDataScriptServer } from "@/components/seo/structured-data-script" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "YokaUnit - 毎日の作業がラクになる無料便利ツール集",
    template: "%s | YokaUnit",
  },
  description:
      "「こんなの欲しかった！」をカタチに。YokaUnitは、日常や仕事の中でふと欲しくなる便利ツールを集めた無料Webサービスです。ブラウザですぐに使えて、登録不要。あなたの作業やアイデアをもっとスムーズに、もっと快適に。",
  keywords: [
    "無料ツール",
    "便利ツール",
    "作業効率化",
    "時短ツール",
    "オンラインツール",
    "ブラウザツール",
    "登録不要",
    "簡単操作",
    "YokaUnit",
    "ヨカユニット",
    "無料アプリ",
    "作業支援",
    "効率アップ",
    "便利サイト",
    "ワンクリック",
    "即座に使える",
    "手軽",
    "シンプル",
    "使いやすい",
    "高機能",
    "安全",
    "信頼性",
  ],
  authors: [{ name: "YokaUnit開発チーム", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yokaunit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YokaUnit - 毎日の作業がラクになる無料便利ツール集",
    description:
      "「こんなの欲しかった！」をカタチに。YokaUnitは、日常や仕事の中でふと欲しくなる便利ツールを集めた無料Webサービスです。ブラウザですぐに使えて、登録不要。あなたの作業やアイデアをもっとスムーズに、もっと快適に。",
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
    title: "YokaUnit - 毎日の作業がラクになる無料便利ツール集🛠️",
    description:
      "「こんなの欲しかった！」をカタチに。YokaUnitは、日常や仕事の中でふと欲しくなる便利ツールを集めた無料Webサービスです。ブラウザですぐに使えて、登録不要。あなたの作業やアイデアをもっとスムーズに、もっと快適に。",
    images: ["/ogp/yokaunit-common.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  generator: "Next.js",
  applicationName: "YokaUnit",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Web Tools",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YokaUnit" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Google AdSense 所有権確認用メタタグ */}
        <meta name="google-adsense-account" content="ca-pub-1199182020994691" />
        {/* 構造化データ: Organization */}
        <StructuredDataScriptServer 
          data={generateOrganizationStructuredData()} 
          id="organization-structured-data" 
        />
        {/* 構造化データ: WebSite */}
        <StructuredDataScriptServer 
          data={generateWebSiteStructuredData()} 
          id="website-structured-data" 
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics  */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0XFNHDJQS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0XFNHDJQS');
          `}
        </Script>
        
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SupabaseDisabledBanner />
            <AuthHandler />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
