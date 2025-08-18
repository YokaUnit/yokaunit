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
    id: "lifestyle",
    title: "普段の生活スタイルは？",
    description: "あなたの日常的な過ごし方を教えてください",
    icon: "🏠",
    color: "from-blue-500 to-cyan-500",
    options: [
      { id: "early", text: "早寝早起き、規則正しい生活", score: 25 },
      { id: "normal", text: "だいたい決まった時間に寝起き", score: 20 },
      { id: "flexible", text: "その日の気分で生活リズムが変わる", score: 15 },
      { id: "night", text: "夜型で朝は苦手", score: 10 },
      { id: "irregular", text: "不規則で生活リズムがバラバラ", score: 5 }
    ]
  },
  {
    id: "hobby",
    title: "休日の過ごし方は？",
    description: "自由な時間にどんなことをしますか？",
    icon: "🎯",
    color: "from-green-500 to-emerald-500",
    options: [
      { id: "outdoor", text: "アウトドアやスポーツを楽しむ", score: 15 },
      { id: "creative", text: "読書や芸術鑑賞、創作活動", score: 25 },
      { id: "social", text: "友人と会ったり、パーティーに参加", score: 18 },
      { id: "digital", text: "ゲームやSNS、動画視聴", score: 8 },
      { id: "relax", text: "家でゆっくり休息する", score: 22 }
    ]
  },
  {
    id: "communication",
    title: "人とのコミュニケーションは？",
    description: "他人との関わり方について",
    icon: "💬",
    color: "from-purple-500 to-pink-500",
    options: [
      { id: "leader", text: "積極的にリーダーシップを取る", score: 12 },
      { id: "active", text: "自分から話しかけることが多い", score: 16 },
      { id: "balanced", text: "相手に合わせてコミュニケーション", score: 23 },
      { id: "listener", text: "聞き役に回ることが多い", score: 26 },
      { id: "minimal", text: "必要最小限の会話で済ませる", score: 19 }
    ]
  },
  {
    id: "stress",
    title: "ストレスを感じた時は？",
    description: "困難な状況での対処法",
    icon: "😌",
    color: "from-orange-500 to-red-500",
    options: [
      { id: "action", text: "すぐに行動して解決しようとする", score: 14 },
      { id: "think", text: "じっくり考えて対策を練る", score: 24 },
      { id: "talk", text: "誰かに相談して意見を聞く", score: 20 },
      { id: "escape", text: "一旦距離を置いて気分転換", score: 18 },
      { id: "endure", text: "我慢して時間が解決するのを待つ", score: 22 }
    ]
  },
  {
    id: "future",
    title: "将来に対する考え方は？",
    description: "未来への向き合い方について",
    icon: "🌟",
    color: "from-indigo-500 to-purple-500",
    options: [
      { id: "plan", text: "しっかりと計画を立てて準備する", score: 26 },
      { id: "goal", text: "目標はあるが柔軟に対応", score: 21 },
      { id: "flow", text: "流れに身を任せて自然体", score: 19 },
      { id: "worry", text: "不安もあるが期待もしている", score: 17 },
      { id: "present", text: "今を大切にして未来はあまり考えない", score: 13 }
    ]
  }
]
