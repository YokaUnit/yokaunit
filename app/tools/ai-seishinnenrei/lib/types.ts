export interface DiagnosisAnswers {
  age: number
  lifestyle: string
  hobby: string
  communication: string
  stress: string
  future: string
}

export interface DiagnosisResult {
  mentalAge: number
  realAge: number
  ageDifference: number
  type: string
  description: string
  advice: string
  characteristics: string[]
}

export type DiagnosisStep = "intro" | "questions" | "result"

export interface QuestionOption {
  id: string
  text: string
  score: number
}
