import { WebPage, Game, Organization, WithContext } from "schema-dts"

// 構造化データ - WebPage
export const webPageStructuredData: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "トランプ山札めくるだけ｜ハイ&ロー・マーク予想・ジョーカーロシアンルーレット",
  "description": "54枚のトランプ（ジョーカー含む）でハイ&ローゲーム、マーク予想ゲーム、ジョーカーロシアンルーレットが楽しめる無料オンラインカードゲーム",
  "url": "https://yokaunit.com/tools/cardstack",
  "inLanguage": "ja-JP",
  "isPartOf": {
    "@type": "WebSite",
    "name": "YokaUnit",
    "url": "https://yokaunit.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YokaUnit",
    "url": "https://yokaunit.com"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "mainEntity": {
    "@type": "Game",
    "name": "トランプ山札めくるだけ",
    "description": "ハイ&ロー、マーク予想、ジョーカーロシアンルーレットが楽しめるトランプゲーム",
    "genre": ["カードゲーム", "ギャンブルゲーム", "予想ゲーム"],
    "numberOfPlayers": "1",
    "gameItem": [
      {
        "@type": "Thing",
        "name": "トランプカード54枚（ジョーカー含む）"
      }
    ],
    "playMode": "SinglePlayer"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://yokaunit.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ツール一覧",
        "item": "https://yokaunit.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "トランプ山札めくるだけ",
        "item": "https://yokaunit.com/tools/cardstack"
      }
    ]
  }
}

// 構造化データ - Game
export const gameStructuredData: WithContext<Game> = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "トランプ山札めくるだけ - ハイ&ロー・マーク予想・ジョーカーロシアンルーレット",
  "description": "54枚のトランプ（ジョーカー2枚含む）を使用したオンラインカードゲーム。ハイ&ローゲーム、マーク予想ゲーム、ジョーカーロシアンルーレットの3つのゲームモードを搭載。",
  "url": "https://yokaunit.com/tools/cardstack",
  "image": "https://yokaunit.com/ogp/cardstack-game.png",
  "genre": ["カードゲーム", "ギャンブルゲーム", "予想ゲーム", "運試し"],
  "numberOfPlayers": "1",
  "playMode": "SinglePlayer",
  "gamePlatform": ["Web Browser", "Mobile Web"],
  "operatingSystem": ["Any"],
  "applicationCategory": "Game",
  "isAccessibleForFree": true,
  "inLanguage": "ja-JP",
  "publisher": {
    "@type": "Organization",
    "name": "YokaUnit",
    "url": "https://yokaunit.com"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "gameItem": [
    {
      "@type": "Thing",
      "name": "スペードカード13枚",
      "description": "スペードのA, 2-10, J, Q, K"
    },
    {
      "@type": "Thing", 
      "name": "ハートカード13枚",
      "description": "ハートのA, 2-10, J, Q, K"
    },
    {
      "@type": "Thing",
      "name": "ダイヤカード13枚", 
      "description": "ダイヤのA, 2-10, J, Q, K"
    },
    {
      "@type": "Thing",
      "name": "クラブカード13枚",
      "description": "クラブのA, 2-10, J, Q, K"
    },
    {
      "@type": "Thing",
      "name": "ジョーカー2枚",
      "description": "特別なカード - 引くとゲーム結果に影響"
    }
  ],
  "gameLocation": {
    "@type": "VirtualLocation",
    "name": "オンライン",
    "url": "https://yokaunit.com/tools/cardstack"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  }
}

// 構造化データ - FAQ
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "トランプ山札めくるだけとはどんなゲームですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "54枚のトランプカード（ジョーカー2枚含む）を使用したオンラインカードゲームです。ハイ&ローゲーム、マーク予想ゲーム、ジョーカーロシアンルーレットの3つのモードで楽しめます。"
      }
    },
    {
      "@type": "Question",
      "name": "ハイ&ローゲームのルールは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "現在表示されているカードの数値と比較して、次に引くカードが高いか低いかを予想するゲームです。A=1、J=11、Q=12、K=13として計算されます。"
      }
    },
    {
      "@type": "Question",
      "name": "マーク予想ゲームとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "次に引くカードのマーク（スペード♠、ハート♥、ダイヤ♦、クラブ♣）を予想するゲームです。4分の1の確率で当たります。"
      }
    },
    {
      "@type": "Question",
      "name": "ジョーカーロシアンルーレットとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "54枚のカードの中にジョーカーが2枚入っており、ジョーカーを引いてしまうと負けになる運試しゲームです。"
      }
    },
    {
      "@type": "Question",
      "name": "引いたカードはどうなりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一度引いたカードは山札から除外され、履歴として表示されます。リセットボタンを押すまで山札は減り続けます。"
      }
    },
    {
      "@type": "Question",
      "name": "無料で遊べますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、完全無料でお楽しみいただけます。会員登録やアプリのダウンロードも不要で、ブラウザですぐに遊べます。"
      }
    }
  ]
}
