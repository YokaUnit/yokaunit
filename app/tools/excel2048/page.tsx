import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/tool-metadata"
import Excel2048ClientPage from "./Excel2048ClientPage"
import { ViewCounter } from "@/components/view-counter"

export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata("excel2048", {
    title: "Excel風2048｜エクセルそっくり見た目の2048パズルゲーム・仕事中でもバレない無料ゲーム | yokaunit",
    description:
      "【完全無料】Microsoft Excelそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。スプレッドシート風のインターフェースでこっそり2048に挑戦。登録不要・ブラウザですぐプレイ。",
    keywords: [
      "Excel風2048",
      "エクセル2048",
      "隠しゲーム",
      "仕事中ゲーム",
      "バレないゲーム",
      "2048パズル",
      "スプレッドシート風ゲーム",
      "Excel風インターフェース",
      "オフィス風ゲーム",
      "Microsoft Excel",
      "表計算ソフト風",
      "偽装ゲーム",
      "ステルスゲーム",
      "カモフラージュゲーム",
      "会社でゲーム",
      "職場ゲーム",
      "休憩時間ゲーム",
      "ブラウザゲーム",
      "無料ゲーム",
      "パズルゲーム",
      "数字パズル",
      "論理ゲーム",
      "頭脳ゲーム",
      "YokaUnit",
      "ヨカユニット",
      "ウェブゲーム",
      "HTML5ゲーム",
      "レスポンシブゲーム",
      "モバイル対応",
      "スマホゲーム",
      "タブレット対応",
      "Excel偽装",
      "スプレッドシート偽装",
      "作業風画面",
      "Excel見た目",
      "表計算風",
      "セル操作",
      "ワークシート",
      "Microsoft Office風",
      "Office365風",
      "仕事風ゲーム",
      "業務風ゲーム",
      "こっそりゲーム",
      "内緒ゲーム",
      "職場でバレないゲーム",
      "在宅勤務の息抜き",
      "マイクロブレイク",
      "短時間リフレッシュ",
      "こっそり遊べる",
    ],
    authors: [{ name: "YokaUnit", url: "https://yokaunit.com" }],
    creator: "YokaUnit",
    publisher: "YokaUnit",
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
    alternates: {
      canonical: "https://yokaunit.com/tools/excel2048",
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: "https://yokaunit.com/tools/excel2048",
      siteName: "YokaUnit",
      title: "Excel風2048｜エクセルそっくり見た目の2048パズルゲーム・仕事中でもバレない無料ゲーム",
      description: "【完全無料】Microsoft Excelそっくりな見た目の2048パズルゲーム！仕事中でも上司にバレずにゲームを楽しめる隠しゲーム。スプレッドシート風のインターフェースでこっそり2048に挑戦。",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yokaunit",
      creator: "@yokaunit",
      title: "Excel風2048📊｜エクセルそっくり見た目の2048パズルゲーム",
      description: "Microsoft Excelそっくりな見た目の2048パズルゲーム🎮 仕事中でも上司にバレずにゲームを楽しめる隠しゲーム💼 スプレッドシート風のインターフェース📋 完全無料🆓",
    },
    verification: {
      google: "your-google-verification-code",
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=no",
    },
  })
}

export default function Excel2048Page() {
  return (
    <>
      <ViewCounter toolSlug="excel2048" />
      <Excel2048ClientPage />
    </>
  )
}
