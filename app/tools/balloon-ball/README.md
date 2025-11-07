# Balloon Ball アニメーション

風船のような物理エフェクトを持つインタラクティブなバッジアニメーションコンポーネントです。

## 特徴

- 物理ベースのバルーンアニメーション
- カスタマイズ可能なバッジデザイン
- レスポンシブデザイン（モバイル対応）
- 重力エフェクト

## 使い方

このフォルダをコピーして、任意のNext.jsプロジェクトで使用できます。

### 必要な依存関係

- React 18以上
- Next.js 13以上（App Router）
- Tailwind CSS

### インストール

1. `app/tools/balloon-ball` フォルダ全体をコピー
2. プロジェクトに配置
3. `/tools/balloon-ball` にアクセス

### カスタマイズ

`page.tsx` の `badgeConfig` オブジェクトを編集してバッジの内容をカスタマイズできます：

\`\`\`tsx
const badgeConfig = {
  firstName: "太郎",
  lastName: "山田",
  company: "12b",
  role: "参加者",
  badgeId: "#000023",
  eventName: "twelve-balloons",
  eventDates: "コレクティブ",
  eventTagline: "アイデアを飛ばそう",
  badgeColor: "#e6c88a",
  badgeBottomColor: "#1a1a2e",
  socialLink: "",
  footerText: "作成者",
  footerLink: "https://twelve-balloons.com",
  footerLinkText: "twelve-balloons",
}
\`\`\`

## ファイル構成

\`\`\`
app/tools/balloon-ball/
├── page.tsx              # メインページ
├── styles.css            # バルーン専用スタイル
├── README.md            # このファイル
├── components/          # コンポーネント
│   ├── elastic-box-physics.tsx
│   ├── badge.tsx
│   ├── content.tsx
│   ├── footer.tsx
│   └── glass-ball.tsx
├── hooks/               # カスタムフック
│   ├── use-mobile-detector.ts
│   ├── use-init-elastic-box-positions.ts
│   └── use-gravity-effect.ts
└── types/               # 型定義
    └── badge-config.ts
\`\`\`

## ライセンス

MITライセンス
