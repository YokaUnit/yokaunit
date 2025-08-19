// カードのスーツ（マーク）
export type CardSuit = "♠" | "♥" | "♦" | "♣" | "🃏"

// カードの値
export type CardValue = 
  | "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" 
  | "J" | "Q" | "K" | "JOKER"

// カードの色
export type CardColor = "red" | "black" | "joker"

// 単一のトランプカード
export interface PlayingCard {
  id: number
  suit: CardSuit
  value: CardValue
  color: CardColor
  isJoker: boolean
  numericValue: number // ゲーム用の数値（A=1, J=11, Q=12, K=13, JOKER=0）
}

// ゲームの種類
export type GameType = "high-low" | "suit-prediction" | "joker-roulette" | "free-draw"

// ハイ&ローゲームの予想
export type HighLowPrediction = "high" | "low"

// マーク予想ゲームの予想
export type SuitPrediction = "♠" | "♥" | "♦" | "♣"

// ゲームの結果
export interface GameResult {
  id: string
  gameType: GameType
  prediction?: HighLowPrediction | SuitPrediction
  drawnCard: PlayingCard
  previousCard?: PlayingCard
  isCorrect?: boolean
  timestamp: Date
}

// ゲームの統計
export interface GameStats {
  totalGames: number
  correctPredictions: number
  highLowStats: {
    total: number
    correct: number
    accuracy: number
  }
  suitPredictionStats: {
    total: number
    correct: number
    accuracy: number
  }
  jokersDrawn: number
  cardsRemaining: number
}

// ゲームの状態
export interface GameState {
  deck: PlayingCard[]
  drawnCards: PlayingCard[]
  currentCard?: PlayingCard
  gameHistory: GameResult[]
  stats: GameStats
  isGameActive: boolean
}
