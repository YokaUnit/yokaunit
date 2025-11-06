export interface RouletteItem {
  id: string
  name: string
  weight: number // 重み（確率）
  color: string // 表示色
  emoji?: string // 絵文字（オプション）
}

export interface RouletteResult {
  item: RouletteItem
  timestamp: Date
  spinDuration: number // 回転時間（ms）
}

export interface RouletteHistory {
  results: RouletteResult[]
  totalSpins: number
}

export type RouletteMode = "normal" | "weighted" | "multiple" | "elimination"

export interface RouletteConfig {
  mode: RouletteMode
  items: RouletteItem[]
  multipleCount?: number // 複数当選モードでの当選数
  allowDuplicates?: boolean // 重複当選を許可するか
}

export type RouletteStep = "setup" | "spinning" | "result" | "history"

