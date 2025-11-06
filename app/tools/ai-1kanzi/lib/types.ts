export interface DiagnosisAnswers {
  q1: string  // 朝起きて最初にすることは？
  q2: string  // 友達に相談されることが多い内容は？
  q3: string  // 好きな色は？
  q4: string  // 最近ハマっていることは？
  q5: string  // 自分の性格を一言で表すなら？
}

export interface DiagnosisResult {
  kanji: string  // 漢字1文字
  reason: string  // 簡単な理由
  description: string  // 詳細な説明
  characteristics: string[]  // 特徴リスト
}

export type DiagnosisStep = "intro" | "questions" | "result"

export interface QuestionOption {
  id: string
  text: string
  score: number
}

