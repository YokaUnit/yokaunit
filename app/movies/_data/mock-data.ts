/**
 * 評価指標は日本向けUIに合わせたモックです。
 * - Filmarks: 国内で広く使われる映画レビュー（平均は5.0満点）
 * - 映画.com: ユーザーレビュー平均（5.0満点）
 * 実データ連携時は各サービスの公式スキーマに合わせてください。
 */
export type Service = {
  id: string
  name: string
  /** public 配下のパス（例: /movies/vod/netflix.webp）。未設定はアイコンなし */
  iconSrc?: string
  color: string
  accent: string
  selectedByDefault?: boolean
}

export type ContentItem = {
  id: string
  title: string
  kind: "movie" | "tv"
  year: number
  /** Filmarks 風・平均評価（5.0満点・モック） */
  filmarksAvg: number
  /** 映画.com 風・ユーザーレビュー平均（5.0満点・モック） */
  eigaComAvg: number
  serviceIds: string[]
  vibe: string
  summary: string
}

export const services: Service[] = [
  {
    id: "netflix",
    name: "Netflix",
    iconSrc: "/movies/vod/netflix.webp",
    color: "bg-red-600/70",
    accent: "text-red-200",
    selectedByDefault: true,
  },
  {
    id: "u-next",
    name: "U-NEXT",
    iconSrc: "/movies/vod/unext.webp",
    color: "bg-cyan-600/70",
    accent: "text-cyan-200",
    selectedByDefault: true,
  },
  {
    id: "hulu",
    name: "Hulu",
    iconSrc: "/movies/vod/hulu.webp",
    color: "bg-emerald-600/70",
    accent: "text-emerald-200",
  },
  {
    id: "prime",
    name: "Prime Video",
    iconSrc: "/movies/vod/amazonprimevideo.webp",
    color: "bg-sky-600/70",
    accent: "text-sky-200",
    selectedByDefault: true,
  },
  {
    id: "disney",
    name: "Disney+",
    iconSrc: "/movies/vod/disneyplus.webp",
    color: "bg-indigo-600/70",
    accent: "text-indigo-200",
  },
]

export const contentItems: ContentItem[] = [
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    kind: "movie",
    year: 2017,
    filmarksAvg: 4.2,
    eigaComAvg: 4.0,
    serviceIds: ["netflix", "prime", "u-next"],
    vibe: "from-orange-600 via-amber-500 to-cyan-500",
    summary:
      "前作から30年後の続編。画面と音の作りが強いSF。",
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    kind: "movie",
    year: 2008,
    filmarksAvg: 4.5,
    eigaComAvg: 4.3,
    serviceIds: ["netflix", "u-next"],
    vibe: "from-slate-700 via-slate-500 to-amber-500",
    summary: "バットマン実写のクライムもの。悪役の存在感が大きい。",
  },
  {
    id: "arrival",
    title: "Arrival",
    kind: "movie",
    year: 2016,
    filmarksAvg: 4.0,
    eigaComAvg: 4.1,
    serviceIds: ["prime", "u-next"],
    vibe: "from-zinc-700 via-zinc-500 to-violet-500",
    summary: "静かな演出で引き込む知的SF。余韻を重視する人におすすめ。",
  },
  {
    id: "shogun",
    title: "Shogun",
    kind: "tv",
    year: 2024,
    filmarksAvg: 4.6,
    eigaComAvg: 4.5,
    serviceIds: ["disney"],
    vibe: "from-red-700 via-orange-600 to-yellow-500",
    summary: "戦国期を描く海外ドラマ。映像が重め。",
  },
  {
    id: "the-bear",
    title: "The Bear",
    kind: "tv",
    year: 2022,
    filmarksAvg: 4.4,
    eigaComAvg: 4.2,
    serviceIds: ["disney"],
    vibe: "from-emerald-700 via-lime-500 to-yellow-400",
    summary: "テンポの良い会話劇。短時間で濃密なエピソードを楽しめる。",
  },
  {
    id: "one-piece-live-action",
    title: "One Piece",
    kind: "tv",
    year: 2023,
    filmarksAvg: 4.2,
    eigaComAvg: 3.9,
    serviceIds: ["netflix"],
    vibe: "from-sky-700 via-blue-500 to-cyan-300",
    summary: "原作の実写版。冒険モノとしてまっすぐ作っている。",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    kind: "movie",
    year: 2023,
    filmarksAvg: 4.3,
    eigaComAvg: 4.4,
    serviceIds: ["u-next", "prime"],
    vibe: "from-orange-700 via-red-600 to-zinc-700",
    summary: "緻密な脚本と演技で見応え十分。じっくり観たい夜向け。",
  },
]

export const spotlightPicks = [
  {
    id: "sp-1",
    contentId: "shogun",
    title: "Shogun",
    blurb: "海外ドラマで話題になった一作。",
  },
  {
    id: "sp-2",
    contentId: "oppenheimer",
    title: "Oppenheimer",
    blurb: "アカデミー賞で名前が出た作品。",
  },
  {
    id: "sp-3",
    contentId: "the-bear",
    title: "The Bear",
    blurb: "短い尺で会話が詰まっている。",
  },
] as const
