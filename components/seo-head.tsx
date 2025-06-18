import Head from "next/head"
import type { SEOData } from "@/lib/seo"

interface SEOHeadProps {
  seoData: SEOData
}

export function SEOHead({ seoData }: SEOHeadProps) {
  return (
    <Head>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords.join(", ")} />}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:url" content={seoData.ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="YokaUnit" />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.twitterTitle} />
      <meta name="twitter:description" content={seoData.twitterDescription} />
      <meta name="twitter:image" content={seoData.twitterImage} />
      <meta name="twitter:site" content="@yokaunit" />
      <meta name="twitter:creator" content="@yokaunit" />

      {/* Additional SEO tags */}
      <meta name="author" content="YokaUnit Team" />
      <meta name="generator" content="Next.js" />
      <meta name="theme-color" content="#3B82F6" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}
