import type { SleepQuestionId } from "./types"

export interface SleepQuestionOption {
  id: string
  text: string
  /** 負担・ズレの度合い（高いほど見直し余地が大きい想定） */
  points: number
}

export interface SleepQuestion {
  id: SleepQuestionId
  title: string
  description: string
  icon: string
  color: string
  options: SleepQuestionOption[]
}

export const questions: SleepQuestion[] = [
  {
    id: "q1",
    title: "いつもの寝姿勢は？",
    description: "一番長い時間いる姿勢を選んでください",
    icon: "🛏️",
    color: "from-indigo-500 to-violet-500",
    options: [
      { id: "q1a", text: "仰向け中心", points: 0 },
      { id: "q1b", text: "横向き中心", points: 1 },
      { id: "q1c", text: "うつ伏せ中心", points: 2 },
      { id: "q1d", text: "寝返りが多く一定しない", points: 2 },
    ],
  },
  {
    id: "q2",
    title: "枕の高さの感覚は？",
    description: "今の枕について近いものを選んでください",
    icon: "📏",
    color: "from-sky-500 to-indigo-500",
    options: [
      { id: "q2a", text: "ちょうど良いと感じる", points: 0 },
      { id: "q2b", text: "少し低い／高い気がする", points: 1 },
      { id: "q2c", text: "明らかに合っていない", points: 2 },
      { id: "q2d", text: "よく分からない／試したことが少ない", points: 1 },
    ],
  },
  {
    id: "q3",
    title: "朝起きたときの首まわりは？",
    description: "直近の傾向で近いものを",
    icon: "🌅",
    color: "from-amber-500 to-orange-500",
    options: [
      { id: "q3a", text: "特に気にならない", points: 0 },
      { id: "q3b", text: "ときどき重だるい", points: 1 },
      { id: "q3c", text: "週に数回つらい", points: 2 },
      { id: "q3d", text: "ほぼ毎日気になる", points: 3 },
    ],
  },
  {
    id: "q4",
    title: "寝る直前のスマホ・PCは？",
    description: "首を前に出す時間が長いほど負担が増えやすい傾向です",
    icon: "📱",
    color: "from-slate-500 to-zinc-600",
    options: [
      { id: "q4a", text: "ほぼ見ない／短時間", points: 0 },
      { id: "q4b", text: "15分未満くらい", points: 1 },
      { id: "q4c", text: "30分以上になることが多い", points: 2 },
      { id: "q4d", text: "寝落ちするまで見ていることが多い", points: 3 },
    ],
  },
  {
    id: "q5",
    title: "日中のデスク・運転は？",
    description: "首・肩まわりに負荷がかかりやすい時間の目安です",
    icon: "🚗",
    color: "from-emerald-500 to-teal-600",
    options: [
      { id: "q5a", text: "どちらも短め／こまめに動く", points: 0 },
      { id: "q5b", text: "片方が1〜2時間未満", points: 1 },
      { id: "q5c", text: "合わせて半日近い日がある", points: 2 },
      { id: "q5d", text: "長時間が続きがち", points: 3 },
    ],
  },
  {
    id: "q6",
    title: "いびき・呼吸が気になることは？",
    description: "睡眠中の姿勢や気道の傾向のヒントになります",
    icon: "💤",
    color: "from-violet-500 to-purple-600",
    options: [
      { id: "q6a", text: "特にない", points: 0 },
      { id: "q6b", text: "たまに家族に言われる", points: 1 },
      { id: "q6c", text: "自分でも気になることがある", points: 2 },
      { id: "q6d", text: "いびき・息苦しさが強い", points: 3 },
    ],
  },
  {
    id: "q7",
    title: "マットレス・布団の状態は？",
    description: "寝姿勢の土台が変わると首への入り方も変わります",
    icon: "🧺",
    color: "from-rose-500 to-pink-600",
    options: [
      { id: "q7a", text: "比較的新しく状態も良い", points: 0 },
      { id: "q7b", text: "そこそこ経っているが許容範囲", points: 1 },
      { id: "q7c", text: "へたり・凹凸が気になる", points: 2 },
      { id: "q7d", text: "かなり古い／すぐ替えたい", points: 3 },
    ],
  },
  {
    id: "q8",
    title: "出張・旅行で枕が変わるとどうなる？",
    description: "環境変化への敏感さの目安です",
    icon: "✈️",
    color: "from-cyan-500 to-blue-600",
    options: [
      { id: "q8a", text: "あまり変わらない", points: 0 },
      { id: "q8b", text: "少し眠りが浅い程度", points: 1 },
      { id: "q8c", text: "首肩の違和感が出やすい", points: 2 },
      { id: "q8d", text: "体調差がはっきり出る", points: 3 },
    ],
  },
  {
    id: "q9",
    title: "ストレッチや首のケアは？",
    description: "首まわりのリカバリー習慣の目安です",
    icon: "🧘",
    color: "from-fuchsia-500 to-indigo-600",
    options: [
      { id: "q9a", text: "週に数回以上している", points: 0 },
      { id: "q9b", text: "たまにする", points: 1 },
      { id: "q9c", text: "ほぼしない", points: 2 },
      { id: "q9d", text: "時間がなくて後回しになりがち", points: 3 },
    ],
  },
  {
    id: "q10",
    title: "睡眠の「質」への投資意識は？",
    description: "寝具や環境を整える優先度の目安です",
    icon: "✨",
    color: "from-yellow-500 to-amber-600",
    options: [
      { id: "q10a", text: "睡眠は優先して投資している", points: 0 },
      { id: "q10b", text: "気にはなるが最小限", points: 1 },
      { id: "q10c", text: "まだ後回しになりがち", points: 2 },
      { id: "q10d", text: "特に考えたことがない", points: 3 },
    ],
  },
]
