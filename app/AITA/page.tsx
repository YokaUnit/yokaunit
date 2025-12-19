import type { Metadata } from "next"
import AITAClientPage from "./components/AITAClientPage"

export const metadata: Metadata = {
  title: "世界炎上裁判所｜Reddit AITA（これって私が悪い？）を日本人の価値観で判定！アウト/セーフ投票",
  description:
    "Redditの人気掲示板「AITA（Am I The Asshole?／これって私が悪い？）」投稿を、日本人の価値観で「アウト／セーフ」に判定！TikTokのような縦型スクロールで、恋愛・家族・友人関係などの海外トラブルを次々と楽しめる参加型コンテンツ。自分の判断と日本人の判定、海外の判定割合を比べて、価値観の違いを発見しよう！",
  keywords: [
    "世界炎上裁判所",
    "AITA",
    "これって私が悪い",
    "Am I the Asshole",
    "Reddit AITA",
    "倫理判断",
    "価値観",
    "日本人",
    "海外",
    "アウト",
    "セーフ",
    "投票",
    "参加型コンテンツ",
    "恋愛トラブル",
    "家族トラブル",
    "友人関係",
    "判定",
    "価値観の違い",
    "縦型スクロール",
    "TikTok風",
  ],
  authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
  creator: "YokaUnit",
  publisher: "YokaUnit",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yokaunit.com/AITA",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yokaunit.com/AITA",
    siteName: "YokaUnit",
    title: "世界炎上裁判所｜Reddit AITA（これって私が悪い？）を日本人の価値観で判定！",
    description: "Redditの人気掲示板「AITA（これって私が悪い？）」投稿を、日本人の価値観で「アウト／セーフ」に判定！TikTokのような縦型スクロールで、恋愛・家族・友人関係などの海外トラブルを次々と楽しめる参加型コンテンツ。",
  },
}

export default function AITAPage() {
  // 無限スクロール版へのリダイレクト（将来的には削除可能）
  return <AITAClientPage />
}

