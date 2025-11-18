// SEO用の構造化データとメタデータ

export const SEO_METADATA = {
  title: '消費税計算機｜税込・税抜・税額を瞬時に計算｜無料オンライン計算機 - YokaUnit',
  description: '消費税10%・8%の計算が瞬時にできる無料オンライン計算機。税込価格から税抜価格、税抜価格から税込価格、税額のみの計算に対応。軽減税率8%にも対応し、スマホ・PCで使いやすく、履歴保存・CSV出力機能付き。経理・会計・日常の買い物・確定申告に便利。',
  keywords: [
    '消費税計算機',
    '消費税計算',
    '税込み計算',
    '税抜き計算',
    '消費税10%計算',
    '消費税8%計算',
    '軽減税率計算',
    '税額計算',
    '無料計算機',
    'オンライン計算機',
    'スマホで消費税計算',
    '経理ツール',
    '会計ツール',
    '税率計算機',
    '消費税シミュレーター',
    '価格計算ツール',
    '税込み価格計算',
    '税抜き価格計算',
    '日本消費税',
    'ビジネス計算',
    '外税計算',
    '内税計算',
    '売上税計算',
    '仕入税額控除',
    '確定申告',
    'インボイス制度',
    '消費税 計算',
    '税込 計算',
    '税抜 計算',
    '消費税 10%',
    '消費税 8%',
    '軽減税率',
    '税率 計算',
    '計算機 無料',
    'オンライン 計算',
    '税金 計算',
    '価格 計算',
    '経理 計算',
    '会計 計算',
    'ビジネス 税金',
    '売上 税',
    '仕入 税',
    '税務 計算',
    '消費税 ツール',
    '税込価格',
    '税抜価格',
    '税額',
    '消費税率'
  ],
  canonical: 'https://yokaunit.com/tools/consumption-tax',
  ogImage: 'https://yokaunit.com/ogp/yokaunit-common.png',
} as const;

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '消費税計算機',
  description: '消費税の計算が簡単にできる無料オンラインツールです。税込価格から税抜価格、税抜価格から税込価格、税額のみの計算が可能。',
  url: 'https://yokaunit.com/tools/consumption-tax',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  creator: {
    '@type': 'Organization',
    name: 'YokaUnit',
    url: 'https://yokaunit.com',
  },
  featureList: [
    '税込価格から税抜価格を計算',
    '税抜価格から税込価格を計算',
    '税額のみを計算',
    '複数の税率に対応（10%, 8%, 5%, 3%など）',
    '外貨換算機能',
    '計算履歴の保存',
    'CSVエクスポート機能',
    'モバイル対応',
    'レスポンシブデザイン'
  ],
  audience: {
    '@type': 'Audience',
    audienceType: [
      'Business',
      'Accountant',
      'Entrepreneur',
      'Student',
      'Consumer'
    ]
  },
  inLanguage: 'ja-JP',
  isAccessibleForFree: true,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  image: [] as string[], // 動的に設定される
} as const;

export const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '消費税10%の計算方法は？税込1100円の税抜価格は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '税込価格から税抜価格を計算する場合：税抜価格 = 税込価格 ÷ 1.10です。例：1100円÷1.10=1000円（税抜）。税抜価格から税込価格を計算する場合：税込価格 = 税抜価格 × 1.10です。例：1000円×1.10=1100円（税込）。'
      }
    },
    {
      '@type': 'Question',
      name: '軽減税率8%の計算方法は？食品の消費税計算は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '軽減税率8%の場合、税込価格から税抜価格：税抜価格 = 税込価格 ÷ 1.08。例：1080円÷1.08=1000円（税抜）。税抜価格から税込価格：税込価格 = 税抜価格 × 1.08。例：1000円×1.08=1080円（税込）。食品・飲料・新聞などが軽減税率8%の対象です。'
      }
    },
    {
      '@type': 'Question',
      name: 'このツールは無料で使えますか？会員登録は必要？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、完全無料でご利用いただけます。会員登録も不要で、広告もありません。スマホ・PCどちらからでもすぐに使えます。'
      }
    },
    {
      '@type': 'Question',
      name: '計算履歴は保存されますか？CSV出力はできる？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、計算履歴はブラウザのローカルストレージに自動保存され、最大100件まで保存できます。Excel対応のCSVファイルとしてダウンロードも可能で、文字化けすることなくExcelで開いて管理できます。'
      }
    },
    {
      '@type': 'Question',
      name: 'スマホでも使いやすいですか？iPhone・Androidで動作する？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、iPhone・Android・タブレット・PCすべてに対応したレスポンシブデザインです。タッチ操作にも最適化されており、外出先でも快適に使えます。'
      }
    },
    {
      '@type': 'Question',
      name: '経理・会計業務で使えますか？インボイス制度対応？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、経理・会計業務に最適です。請求書作成、仕入税額控除の計算、確定申告の準備などにご活用いただけます。インボイス制度にも対応した正確な計算が可能です。'
      }
    }
  ]
} as const;

export const BREADCRUMB_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://yokaunit.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'ツール',
      item: 'https://yokaunit.com/tools'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '消費税計算機',
      item: 'https://yokaunit.com/tools/consumption-tax'
    }
  ]
} as const;

// ページ別のSEOメタデータ
export const PAGE_METADATA = {
  main: {
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    keywords: SEO_METADATA.keywords.join(', '),
  },
  howToUse: {
    title: '消費税計算機の使い方 - 詳しい操作方法と計算例',
    description: '消費税計算機の詳しい使い方を解説。税込・税抜・税額計算の方法、外貨換算機能、履歴機能の使い方を具体例とともに説明します。',
    keywords: '消費税計算機, 使い方, 操作方法, 計算例, チュートリアル',
  },
  about: {
    title: '消費税計算機について - 機能と特徴',
    description: '消費税計算機の機能と特徴について詳しく説明。対応税率、外貨換算、履歴機能、CSVエクスポートなどの便利な機能をご紹介します。',
    keywords: '消費税計算機, 機能, 特徴, 税率, 外貨換算, 履歴',
  }
} as const;
