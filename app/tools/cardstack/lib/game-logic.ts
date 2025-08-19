import { PlayingCard, CardSuit, CardValue, CardColor, GameResult, GameStats, HighLowPrediction, SuitPrediction, GameType } from "./types"

// 54枚のトランプデッキを作成（ジョーカー2枚含む）
export function createDeck(): PlayingCard[] {
  const suits: Array<{ symbol: CardSuit; color: CardColor }> = [
    { symbol: "♠", color: "black" },
    { symbol: "♥", color: "red" },
    { symbol: "♦", color: "red" },
    { symbol: "♣", color: "black" },
  ]
  
  const values: Array<{ symbol: CardValue; numeric: number }> = [
    { symbol: "A", numeric: 1 },
    { symbol: "2", numeric: 2 },
    { symbol: "3", numeric: 3 },
    { symbol: "4", numeric: 4 },
    { symbol: "5", numeric: 5 },
    { symbol: "6", numeric: 6 },
    { symbol: "7", numeric: 7 },
    { symbol: "8", numeric: 8 },
    { symbol: "9", numeric: 9 },
    { symbol: "10", numeric: 10 },
    { symbol: "J", numeric: 11 },
    { symbol: "Q", numeric: 12 },
    { symbol: "K", numeric: 13 },
  ]

  const deck: PlayingCard[] = []
  let id = 1

  // 通常の52枚のカードを作成
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        id: id++,
        suit: suit.symbol,
        value: value.symbol,
        color: suit.color,
        isJoker: false,
        numericValue: value.numeric,
      })
    })
  })

  // ジョーカーを2枚追加
  deck.push({
    id: id++,
    suit: "🃏",
    value: "JOKER",
    color: "joker",
    isJoker: true,
    numericValue: 0,
  })
  
  deck.push({
    id: id++,
    suit: "🃏",
    value: "JOKER",
    color: "joker",
    isJoker: true,
    numericValue: 0,
  })

  return shuffleDeck(deck)
}

// デッキをシャッフル
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ハイ&ローゲームの結果判定
export function checkHighLowPrediction(
  prediction: HighLowPrediction,
  previousCard: PlayingCard,
  drawnCard: PlayingCard
): boolean {
  // ジョーカーが関わる場合の特別ルール
  if (drawnCard.isJoker) {
    // ジョーカーは常に予想外れとする（ジョーカーロシアンルーレット要素）
    return false
  }
  
  if (previousCard.isJoker) {
    // 前のカードがジョーカーの場合、次のカードは必ず当たりとする
    return true
  }

  const prevValue = previousCard.numericValue
  const drawnValue = drawnCard.numericValue

  if (prediction === "high") {
    return drawnValue > prevValue
  } else {
    return drawnValue < prevValue
  }
}

// マーク予想ゲームの結果判定
export function checkSuitPrediction(
  prediction: SuitPrediction,
  drawnCard: PlayingCard
): boolean {
  // ジョーカーの場合は予想外れ
  if (drawnCard.isJoker) {
    return false
  }
  
  return drawnCard.suit === prediction
}

// ゲーム統計を計算
export function calculateStats(gameHistory: GameResult[], cardsRemaining: number): GameStats {
  const totalGames = gameHistory.length
  const correctPredictions = gameHistory.filter(result => result.isCorrect === true).length
  
  const highLowGames = gameHistory.filter(result => result.gameType === "high-low")
  const highLowCorrect = highLowGames.filter(result => result.isCorrect === true).length
  
  const suitGames = gameHistory.filter(result => result.gameType === "suit-prediction")
  const suitCorrect = suitGames.filter(result => result.isCorrect === true).length
  
  const jokersDrawn = gameHistory.filter(result => result.drawnCard.isJoker).length

  return {
    totalGames,
    correctPredictions,
    highLowStats: {
      total: highLowGames.length,
      correct: highLowCorrect,
      accuracy: highLowGames.length > 0 ? (highLowCorrect / highLowGames.length) * 100 : 0,
    },
    suitPredictionStats: {
      total: suitGames.length,
      correct: suitCorrect,
      accuracy: suitGames.length > 0 ? (suitCorrect / suitGames.length) * 100 : 0,
    },
    jokersDrawn,
    cardsRemaining,
  }
}

// カードを山札から引く
export function drawCard(deck: PlayingCard[]): { drawnCard: PlayingCard; remainingDeck: PlayingCard[] } | null {
  if (deck.length === 0) {
    return null
  }
  
  const drawnCard = deck[0]
  const remainingDeck = deck.slice(1)
  
  return { drawnCard, remainingDeck }
}

// ゲーム結果を作成
export function createGameResult(
  gameType: GameType,
  drawnCard: PlayingCard,
  previousCard?: PlayingCard,
  prediction?: HighLowPrediction | SuitPrediction
): GameResult {
  let isCorrect: boolean | undefined

  if (gameType === "high-low" && prediction && previousCard) {
    isCorrect = checkHighLowPrediction(prediction as HighLowPrediction, previousCard, drawnCard)
  } else if (gameType === "suit-prediction" && prediction) {
    isCorrect = checkSuitPrediction(prediction as SuitPrediction, drawnCard)
  } else if (gameType === "joker-roulette") {
    // ジョーカーロシアンルーレットの場合、ジョーカーを引いたら負け
    isCorrect = !drawnCard.isJoker
  }

  return {
    id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    gameType,
    prediction,
    drawnCard,
    previousCard,
    isCorrect,
    timestamp: new Date(),
  }
}

// カードの表示名を取得
export function getCardDisplayName(card: PlayingCard): string {
  if (card.isJoker) {
    return "ジョーカー"
  }
  
  const suitNames: Record<CardSuit, string> = {
    "♠": "スペード",
    "♥": "ハート",
    "♦": "ダイヤ",
    "♣": "クラブ",
    "🃏": "ジョーカー",
  }
  
  const valueNames: Record<CardValue, string> = {
    "A": "エース",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "J": "ジャック",
    "Q": "クイーン",
    "K": "キング",
    "JOKER": "ジョーカー",
  }
  
  return `${suitNames[card.suit]}の${valueNames[card.value]}`
}

// カードの短縮表示名を取得
export function getCardShortName(card: PlayingCard): string {
  if (card.isJoker) {
    return "🃏"
  }
  
  return `${card.suit}${card.value}`
}
