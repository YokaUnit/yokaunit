export type SleepPostureStep = "intro" | "questions" | "result"

export type SleepQuestionId =
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8"
  | "q9"
  | "q10"

export type SleepPostureAnswers = Record<SleepQuestionId, string>

export type SleepPostureBand = "a" | "b" | "c" | "d"

export interface SleepPostureResult {
  band: SleepPostureBand
  /** 負担スコア（高いほど生活習慣・睡眠環境の見直し余地が大きい傾向） */
  score: number
  maxScore: number
  typeName: string
  summary: string
  tips: string[]
  disclaimer: string
}
