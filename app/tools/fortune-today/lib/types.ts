export type ZodiacSign = 
  | "牡羊座" | "牡牛座" | "双子座" | "蟹座" | "獅子座" | "乙女座"
  | "天秤座" | "蠍座" | "射手座" | "山羊座" | "水瓶座" | "魚座"

export interface FortuneInput {
  zodiacSign: ZodiacSign
  todayAction: string
}

export interface FortuneResult {
  totalFortune: number
  loveFortune: number
  workFortune: number
  moneyFortune: number
  luckyAction: string
  caution: string
  advice: string
  emotionalMessage?: string
  overallAssessment: string // 総合的な評価コメント
}

export interface FortuneScoreRange {
  min: number
  max: number
  message: string
}

export interface ZodiacData {
  sign: ZodiacSign
  element: "火" | "土" | "風" | "水"
  quality: "活動" | "不動" | "柔軟"
  rulingPlanet: string
  characteristics: string[]
}

export type FortuneStep = "intro" | "input" | "result"
