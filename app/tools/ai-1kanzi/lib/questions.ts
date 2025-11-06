import type { QuestionOption } from './types'

export interface Question {
  id: keyof import('./types').DiagnosisAnswers
  title: string
  description: string
  options: QuestionOption[]
  icon: string
  color: string
}

export const questions: Question[] = [
  {
    id: "q1",
    title: "朝起きて最初にすることは？",
    description: "あなたの日常的な朝の過ごし方を教えてください",
    icon: "🌅",
    color: "from-orange-500 to-red-500",
    options: [
      { id: "a", text: "ストレッチや軽い運動", score: 9 },
      { id: "b", text: "二度寝する", score: 2 },
      { id: "c", text: "コーヒーやお茶を飲む", score: 7 },
      { id: "d", text: "布団の中でずっとゴロゴロ", score: 1 },
      { id: "e", text: "スマホを確認する", score: 4 }
    ]
  },
  {
    id: "q2",
    title: "友達に相談されることが多い内容は？",
    description: "周囲からどのような相談をされることが多いですか？",
    icon: "💬",
    color: "from-blue-500 to-cyan-500",
    options: [
      { id: "a", text: "趣味・遊び", score: 5 },
      { id: "b", text: "仕事・勉強", score: 9 },
      { id: "c", text: "相談されることはほとんどない", score: 2 },
      { id: "d", text: "恋愛・人間関係", score: 7 },
      { id: "e", text: "愚痴や不満", score: 3 }
    ]
  },
  {
    id: "q3",
    title: "好きな色は？",
    description: "あなたの好みの色を選んでください",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    options: [
      { id: "a", text: "ピンク・パステル系", score: 5 },
      { id: "b", text: "赤・オレンジ", score: 8 },
      { id: "c", text: "暗い色・黒系", score: 3 },
      { id: "d", text: "黒・白・グレー", score: 6 },
      { id: "e", text: "青・緑", score: 7 }
    ]
  },
  {
    id: "q4",
    title: "最近ハマっていることは？",
    description: "最近の趣味や興味のあることを教えてください",
    icon: "🎯",
    color: "from-green-500 to-emerald-500",
    options: [
      { id: "a", text: "創作やDIY", score: 9 },
      { id: "b", text: "特に何もしていない", score: 1 },
      { id: "c", text: "読書や映画", score: 8 },
      { id: "d", text: "ゲームやSNS", score: 4 },
      { id: "e", text: "スポーツや運動", score: 9 }
    ]
  },
  {
    id: "q5",
    title: "自分の性格を一言で表すなら？",
    description: "あなた自身を最もよく表す言葉を選んでください",
    icon: "🌟",
    color: "from-indigo-500 to-purple-500",
    options: [
      { id: "a", text: "優しい", score: 7 },
      { id: "b", text: "ネガティブ", score: 1 },
      { id: "c", text: "積極的", score: 9 },
      { id: "d", text: "面倒くさがり", score: 2 },
      { id: "e", text: "冷静", score: 8 },
      { id: "f", text: "好奇心旺盛", score: 6 }
    ]
  }
]

