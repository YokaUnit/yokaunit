import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { mockPosts } from "../../lib/mockData"
import AITACasePage from "./AITACasePage"

interface PageProps {
  params: Promise<{ caseNumber: string }>
}

export async function generateStaticParams() {
  // 静的生成用のパラメータを生成
  return mockPosts.map((post) => ({
    caseNumber: post.caseNumber.toString(),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { caseNumber } = await params
  const post = mockPosts.find((p) => p.caseNumber.toString() === caseNumber)

  if (!post) {
    return {
      title: "事件が見つかりません | 世界炎上裁判所",
    }
  }

  const url = `https://yokaunit.com/AITA/case/${caseNumber}`
  const description = `${post.title}\n\n${post.body.substring(0, 100)}...\n\n投票して結果を確認しよう！`

  return {
    title: `第${post.caseNumber}号事件 - ${post.title} | 世界炎上裁判所`,
    description: description,
    keywords: [
      "世界炎上裁判所",
      "AITA",
      "これって私が悪い",
      "Am I the Asshole",
      "倫理判断",
      "価値観",
      "日本人",
      `第${post.caseNumber}号事件`,
    ],
    authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
    creator: "YokaUnit",
    publisher: "YokaUnit",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url: url,
      siteName: "YokaUnit",
      title: `第${post.caseNumber}号事件 - ${post.title}`,
      description: description,
    },
    twitter: {
      card: "summary_large_image",
      title: `第${post.caseNumber}号事件 - ${post.title}`,
      description: description,
    },
  }
}

export default async function AITACasePageRoute({ params }: PageProps) {
  const { caseNumber } = await params
  const post = mockPosts.find((p) => p.caseNumber.toString() === caseNumber)

  if (!post) {
    notFound()
  }

  return <AITACasePage post={post} />
}

