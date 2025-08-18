export interface DiagnosisAnswers {
  idealDate: string
  loveValues: string
  selfPR: string
}

export interface DiagnosisResult {
  score: number
  type: string
  description: string
  advice: string
  positiveScore: number
  socialScore: number
  empathyScore: number
}

export interface SentimentAnalysisResult {
  label: string
  score: number
}

export type DiagnosisStep = "intro" | "questions" | "result"
