"use client"

import { pipeline } from '@xenova/transformers'
import type { FortuneInput, FortuneResult, ZodiacSign, ZodiacData, FortuneScoreRange } from './types'

// AI文章生成用のパイプライン（lazy loading）
let textGenerationPipeline: any = null

async function getTextGenerationPipeline() {
  if (!textGenerationPipeline) {
    try {
      // より軽量で高速なモデルを使用
      textGenerationPipeline = await pipeline(
        'text-generation',
        'Xenova/distilgpt2' // GPT2より軽量で高速
      )
    } catch (error) {
      console.error('Failed to load text generation pipeline:', error)
      // フォールバックとして何もしない（常にフォールバック関数を使用）
      textGenerationPipeline = null
      throw error
    }
  }
  return textGenerationPipeline
}

// 12星座の基本データ
const ZODIAC_DATA: Record<ZodiacSign, ZodiacData> = {
  "牡羊座": { sign: "牡羊座", element: "火", quality: "活動", rulingPlanet: "火星", characteristics: ["積極的", "リーダーシップ", "情熱的", "勇敢"] },
  "牡牛座": { sign: "牡牛座", element: "土", quality: "不動", rulingPlanet: "金星", characteristics: ["安定", "忍耐力", "美的感覚", "実用的"] },
  "双子座": { sign: "双子座", element: "風", quality: "柔軟", rulingPlanet: "水星", characteristics: ["コミュニケーション", "好奇心", "多才", "適応力"] },
  "蟹座": { sign: "蟹座", element: "水", quality: "活動", rulingPlanet: "月", characteristics: ["感情豊か", "家族愛", "直感力", "保護本能"] },
  "獅子座": { sign: "獅子座", element: "火", quality: "不動", rulingPlanet: "太陽", characteristics: ["自信", "創造性", "華やか", "寛大"] },
  "乙女座": { sign: "乙女座", element: "土", quality: "柔軟", rulingPlanet: "水星", characteristics: ["完璧主義", "分析力", "実務的", "奉仕精神"] },
  "天秤座": { sign: "天秤座", element: "風", quality: "活動", rulingPlanet: "金星", characteristics: ["バランス", "美意識", "協調性", "公平性"] },
  "蠍座": { sign: "蠍座", element: "水", quality: "不動", rulingPlanet: "冥王星", characteristics: ["深い洞察", "集中力", "変革力", "神秘性"] },
  "射手座": { sign: "射手座", element: "火", quality: "柔軟", rulingPlanet: "木星", characteristics: ["自由", "冒険心", "楽観性", "哲学的"] },
  "山羊座": { sign: "山羊座", element: "土", quality: "活動", rulingPlanet: "土星", characteristics: ["責任感", "野心", "堅実", "伝統重視"] },
  "水瓶座": { sign: "水瓶座", element: "風", quality: "不動", rulingPlanet: "天王星", characteristics: ["独創性", "人道主義", "未来志向", "友情"] },
  "魚座": { sign: "魚座", element: "水", quality: "柔軟", rulingPlanet: "海王星", characteristics: ["想像力", "共感性", "直感", "芸術性"] },
}

// 運勢スコアの範囲とメッセージ
const FORTUNE_RANGES: FortuneScoreRange[] = [
  { min: 0, max: 9, message: "今日は慎重に行動。無理せず休むのが吉。" },
  { min: 10, max: 19, message: "小さなトラブルに注意。大きな決断は控えて。" },
  { min: 20, max: 29, message: "控えめに動くと良い日。慌てず冷静に。" },
  { min: 30, max: 39, message: "少し注意が必要。周囲の意見を聞くと吉。" },
  { min: 40, max: 49, message: "まずまずの日。無理せず淡々と過ごそう。" },
  { min: 50, max: 59, message: "普通の日。普段通りの行動でOK。" },
  { min: 60, max: 69, message: "少し運気アップ。チャンスを見逃さず行動。" },
  { min: 70, max: 79, message: "好調な日。積極的にチャレンジしよう。" },
  { min: 80, max: 89, message: "絶好調！大胆に行動すると吉。" },
  { min: 90, max: 100, message: "最高運！願いが叶いやすい日。自信を持って挑戦。" },
]

// 今日の日付をシードとして使用する乱数生成器
function createSeededRandom(seed: number): () => number {
  let x = Math.sin(seed) * 10000
  return function() {
    x = Math.sin(x) * 10000
    return x - Math.floor(x)
  }
}

// 日付と星座から基本シードを生成
function generateBaseSeed(zodiacSign: ZodiacSign, date: Date): number {
  const zodiacIndex = Object.keys(ZODIAC_DATA).indexOf(zodiacSign)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  return zodiacIndex * 1000 + dayOfYear + date.getFullYear()
}

// 文字列から数値ハッシュを生成
function stringToHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 32bit整数に変換
  }
  return Math.abs(hash)
}

// 行動テキストを分析してボーナス/ペナルティを計算
function analyzeActionText(action: string): {
  positiveBonus: number
  activeBonus: number
  workBonus: number
  loveBonus: number
  moneyBonus: number
} {
  const positiveWords = ["楽しい", "嬉しい", "頑張る", "挑戦", "成功", "達成", "努力", "前向き", "積極的", "幸せ"]
  const activeWords = ["運動", "スポーツ", "旅行", "外出", "活動", "アクティブ", "動く", "行動", "実行"]
  const workWords = ["仕事", "会議", "プレゼン", "商談", "打ち合わせ", "企画", "プロジェクト", "業務", "作業", "勉強", "学習"]
  const loveWords = ["デート", "恋人", "好きな人", "告白", "プロポーズ", "結婚", "愛", "恋愛", "出会い", "合コン"]
  const moneyWords = ["買い物", "投資", "貯金", "節約", "お金", "ショッピング", "購入", "支払い", "収入", "給料"]

  let positiveBonus = 0
  let activeBonus = 0
  let workBonus = 0
  let loveBonus = 0
  let moneyBonus = 0

  positiveWords.forEach(word => {
    if (action.includes(word)) positiveBonus += 5
  })

  activeWords.forEach(word => {
    if (action.includes(word)) activeBonus += 8
  })

  workWords.forEach(word => {
    if (action.includes(word)) workBonus += 10
  })

  loveWords.forEach(word => {
    if (action.includes(word)) loveBonus += 10
  })

  moneyWords.forEach(word => {
    if (action.includes(word)) moneyBonus += 8
  })

  return { positiveBonus, activeBonus, workBonus, loveBonus, moneyBonus }
}

// 星座の特性に基づいて運勢を調整
function applyZodiacModifiers(baseScore: number, zodiacSign: ZodiacSign, fortuneType: string): number {
  const zodiacData = ZODIAC_DATA[zodiacSign]
  let modifier = 0

  // エレメントによる調整
  switch (zodiacData.element) {
    case "火": // 牡羊座、獅子座、射手座
      if (fortuneType === "work") modifier += 5
      if (fortuneType === "total") modifier += 3
      break
    case "土": // 牡牛座、乙女座、山羊座
      if (fortuneType === "money") modifier += 5
      if (fortuneType === "work") modifier += 3
      break
    case "風": // 双子座、天秤座、水瓶座
      if (fortuneType === "love") modifier += 5
      if (fortuneType === "total") modifier += 2
      break
    case "水": // 蟹座、蠍座、魚座
      if (fortuneType === "love") modifier += 8
      if (fortuneType === "total") modifier += 2
      break
  }

  // クオリティによる調整
  switch (zodiacData.quality) {
    case "活動": // 牡羊座、蟹座、天秤座、山羊座
      if (fortuneType === "work") modifier += 3
      break
    case "不動": // 牡牛座、獅子座、蠍座、水瓶座
      if (fortuneType === "money") modifier += 3
      break
    case "柔軟": // 双子座、乙女座、射手座、魚座
      if (fortuneType === "love") modifier += 3
      break
  }

  return Math.max(0, Math.min(100, baseScore + modifier))
}

// ラッキー行動を生成
function generateLuckyAction(zodiacSign: ZodiacSign, todayAction: string, random: () => number): string {
  const zodiacData = ZODIAC_DATA[zodiacSign]
  
  const generalActions = [
    "朝の散歩をする", "好きな音楽を聴く", "笑顔を心がける", "感謝の気持ちを表現する",
    "新しいことに挑戦する", "友人と連絡を取る", "美味しいものを食べる", "深呼吸をする"
  ]

  const elementActions = {
    "火": ["エネルギッシュな活動をする", "リーダーシップを発揮する", "新しい挑戦をする", "情熱的に行動する"],
    "土": ["計画を立てる", "実用的なものを整理する", "自然に触れる", "着実に進める"],
    "風": ["人とのコミュニケーションを大切にする", "情報収集をする", "軽やかに行動する", "新しいアイデアを考える"],
    "水": ["直感を大切にする", "感情に素直になる", "芸術に触れる", "リラックスする時間を作る"]
  }

  // 今日の行動に関連するラッキー行動を生成
  let luckyAction = ""
  if (todayAction.includes("プレゼン") || todayAction.includes("発表")) {
    luckyAction = "発表前に深呼吸"
  } else if (todayAction.includes("デート") || todayAction.includes("恋人")) {
    luckyAction = "相手の話をよく聞く"
  } else if (todayAction.includes("勉強") || todayAction.includes("学習")) {
    luckyAction = "集中できる環境を整える"
  } else if (todayAction.includes("仕事") || todayAction.includes("会議")) {
    luckyAction = "同僚との協力を心がける"
  } else {
    // ランダムに選択
    const actions = [...generalActions, ...elementActions[zodiacData.element]]
    luckyAction = actions[Math.floor(random() * actions.length)]
  }

  return luckyAction
}

// 注意事項を生成
function generateCaution(zodiacSign: ZodiacSign, random: () => number): string {
  const generalCautions = [
    "メールの送り先に注意", "交通安全を心がけて", "体調管理を忘れずに", "時間に余裕を持って",
    "言葉遣いに気をつけて", "忘れ物がないかチェック", "感情的にならないよう注意", "無理は禁物"
  ]

  const zodiacCautions = {
    "牡羊座": ["急ぎすぎに注意", "衝動的な判断を避けて"],
    "牡牛座": ["頑固になりすぎないよう注意", "変化を恐れないで"],
    "双子座": ["集中力を保って", "一度に多くのことをしすぎないよう注意"],
    "蟹座": ["感情に流されすぎないよう注意", "他人の意見も聞いて"],
    "獅子座": ["プライドを捨てることも大切", "他人への配慮を忘れずに"],
    "乙女座": ["完璧を求めすぎないよう注意", "細かいことにとらわれすぎないで"],
    "天秤座": ["優柔不断にならないよう注意", "自分の意見もしっかりと"],
    "蠍座": ["疑い深くなりすぎないよう注意", "感情をコントロールして"],
    "射手座": ["計画性を持って行動", "約束を忘れないよう注意"],
    "山羊座": ["柔軟性も大切に", "休息を取ることも忘れずに"],
    "水瓶座": ["現実的な判断も必要", "周囲との協調も心がけて"],
    "魚座": ["現実逃避しないよう注意", "決断力を持って"]
  }

  const cautions = [...generalCautions, ...zodiacCautions[zodiacSign]]
  return cautions[Math.floor(random() * cautions.length)]
}

// 高度な文章バリエーション生成システム
function generateUniqueTextVariation(baseElements: string[], random: () => number, additionalSeed: number): string {
  // 複数のランダムシードを組み合わせて完全にユニークな文章を生成
  const variation1 = Math.floor(random() * 1000)
  const variation2 = Math.floor((random() + additionalSeed * 0.001) * 1000) % 1000
  const variation3 = (additionalSeed + variation1 + variation2) % 1000
  
  const selectedElements = baseElements.map((element, index) => {
    const variantIndex = (variation1 + variation2 + variation3 + index) % baseElements.length
    return baseElements[variantIndex]
  })
  
  return selectedElements.join('')
}

// AIを使って動的にアドバイス文を生成（高速化 + タイムアウト）
async function generateAdvice(
  zodiacSign: ZodiacSign, 
  todayAction: string, 
  totalFortune: number,
  loveFortune: number,
  workFortune: number,
  moneyFortune: number,
  random: () => number
): Promise<string> {
  // 即座にフォールバックを返すオプション（高速化）
  const useQuickFallback = Math.random() < 0.7 // 70%の確率でフォールバック使用
  
  if (useQuickFallback) {
    return generateFallbackAdvice(zodiacSign, todayAction, totalFortune, loveFortune, workFortune, moneyFortune, random)
  }

  const zodiacData = ZODIAC_DATA[zodiacSign]
  
  // 運勢レベルを判定
  const fortuneLevel = totalFortune >= 80 ? "excellent" : 
                      totalFortune >= 60 ? "good" : 
                      totalFortune >= 40 ? "normal" : "careful"
  
  // 短いプロンプトで高速化
  const prompt = `占い師として${zodiacSign}の今日のアドバイス（${todayAction}、総合運${totalFortune}点）を100文字で：`

  try {
    // タイムアウト付きでAI実行
    const aiPromise = getTextGenerationPipeline().then(pipeline => 
      pipeline(prompt, {
        max_length: 200, // 短縮
        temperature: 0.6, // 低下で高速化
        do_sample: true,
        num_return_sequences: 1
      })
    )
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('AI timeout')), 3000) // 3秒タイムアウト
    )
    
    const result = await Promise.race([aiPromise, timeoutPromise])
    
    // AI生成結果から適切な部分を抽出
    let generatedText = result[0].generated_text.replace(prompt, '').trim()
    
    // 文字化けや異常な文字を除去
    generatedText = generatedText.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303Fa-zA-Z0-9\s。、！？（）「」\-]/g, '')
    
    if (generatedText.length > 200) {
      generatedText = generatedText.substring(0, 200)
    }
    
    if (generatedText.length < 30 || generatedText.includes('！！！')) {
      return generateFallbackAdvice(zodiacSign, todayAction, totalFortune, loveFortune, workFortune, moneyFortune, random)
    }
    
    return generatedText
  } catch (error) {
    console.error('AI text generation failed, using fallback:', error)
    return generateFallbackAdvice(zodiacSign, todayAction, totalFortune, loveFortune, workFortune, moneyFortune, random)
  }
}

// フォールバック用のアドバイス生成（バリエーション豊富）
function generateFallbackAdvice(
  zodiacSign: ZodiacSign,
  todayAction: string,
  totalFortune: number,
  loveFortune: number,
  workFortune: number,
  moneyFortune: number,
  random: () => number
): string {
  const zodiacData = ZODIAC_DATA[zodiacSign]
  const today = new Date()
  const seed = today.getTime() + stringToHash(zodiacSign + todayAction)
  
  const fortuneLevel = totalFortune >= 80 ? "絶好調" : 
                      totalFortune >= 60 ? "好調" : 
                      totalFortune >= 40 ? "普通" : "慎重"
  
  const highest = Math.max(loveFortune, workFortune, moneyFortune)
  const highestType = highest === loveFortune ? "恋愛運" : 
                     highest === workFortune ? "仕事運" : "金運"
  
  // 複数のテンプレートからランダム選択
  const templates = [
    `今日は${fortuneLevel}な一日になりそうです！${zodiacData.element}の元素を持つ${zodiacSign}のあなたは、${todayAction}において${zodiacData.characteristics[seed % zodiacData.characteristics.length]}な特性を活かせるでしょう。特に${highestType}が${highest}点と好調なので、この分野を中心に積極的に行動してみてください。`,
    
    `${zodiacSign}のあなたにとって今日は${fortuneLevel}な運気の日です。${todayAction}では、${zodiacData.rulingPlanet}の加護を受けて${zodiacData.characteristics[(seed + 1) % zodiacData.characteristics.length]}さが光るでしょう。${highestType}が${highest}点と特に良好なので、チャンスを逃さないよう心がけてください。`,
    
    `${zodiacData.quality}宮の特徴を持つ${zodiacSign}のあなたは、今日${fortuneLevel}な運勢に恵まれています。${todayAction}において、${zodiacData.element}の元素らしい${zodiacData.characteristics[(seed + 2) % zodiacData.characteristics.length]}なアプローチが成功の鍵となりそう。${highestType}${highest}点の好調さを活かして、素敵な一日をお過ごしください。`,
    
    `今日の${zodiacSign}は${fortuneLevel}な星回りです。${todayAction}では、あなたの${zodiacData.characteristics[(seed + 3) % zodiacData.characteristics.length]}な面が周りから評価されるでしょう。${highestType}が${highest}点と輝いているので、自信を持って行動してみてくださいね。`
  ]
  
  return templates[seed % templates.length]
}

// 行動特化型の詳細コメント生成
function generateActionSpecificComment(
  todayAction: string, 
  zodiacData: ZodiacData, 
  loveFortune: number, 
  workFortune: number, 
  moneyFortune: number, 
  random: () => number,
  uniqueSeed: number
): string {
  const actionLower = todayAction.toLowerCase()
  
  if (actionLower.includes("プレゼン") || actionLower.includes("発表") || actionLower.includes("presentation")) {
    const presentationAdvice = [
      `${todayAction}では、あなたの${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}な特性が聴衆の心を掴むでしょう。`,
      `今日の${todayAction}は、${zodiacData.element}の元素を持つあなたならではの情熱が伝わる絶好の機会です。`,
      `${todayAction}において、${zodiacData.quality}宮の特徴を活かした独自のアプローチが成功の鍵となりそうです。`,
      `${todayAction}では、${zodiacData.rulingPlanet}の加護を受けたあなたの表現力が最大限に発揮されるでしょう。`
    ]
    return presentationAdvice[(uniqueSeed + workFortune) % presentationAdvice.length]
  }
  
  if (actionLower.includes("デート") || actionLower.includes("date") || actionLower.includes("恋人")) {
    const dateAdvice = [
      `${todayAction}では、あなたの${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}な魅力が相手の心に深く響くでしょう。`,
      `今日の${todayAction}は、${loveFortune >= 70 ? "愛の星が微笑む特別な時間" : "自然体でいることで新しい発見がある"}貴重な機会です。`,
      `${zodiacData.element}の元素を持つあなたらしい温かさが、今日の${todayAction}を素晴らしいものにするでしょう。`,
      `${todayAction}において、相手との心の距離がぐっと縮まる瞬間が訪れる予感がします。`
    ]
    return dateAdvice[(uniqueSeed + loveFortune) % dateAdvice.length]
  }
  
  if (actionLower.includes("勉強") || actionLower.includes("学習") || actionLower.includes("study")) {
    const studyAdvice = [
      `${todayAction}では、${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}な集中力が知識の吸収を助けるでしょう。`,
      `今日の${todayAction}は、${zodiacData.element === "土" ? "着実に積み重ねていく" : zodiacData.element === "風" ? "新しいアイデアを取り入れる" : zodiacData.element === "火" ? "情熱的に取り組む" : "直感を大切にした"}アプローチが効果的です。`,
      `${todayAction}において、あなたの持つ${zodiacData.quality}宮の特性が学習効率を高める鍵となりそうです。`,
      `今日の${todayAction}では、理解が深まる瞬間が何度も訪れることでしょう。`
    ]
    return studyAdvice[(uniqueSeed + workFortune) % studyAdvice.length]
  }
  
  if (actionLower.includes("仕事") || actionLower.includes("work") || actionLower.includes("業務")) {
    const workAdvice = [
      `${todayAction}では、あなたの${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}な能力が同僚から高く評価されるでしょう。`,
      `今日の${todayAction}は、${workFortune >= 70 ? "期待以上の成果を上げる絶好のチャンス" : "基本に忠実に取り組むことで道が開ける"}大切な一日です。`,
      `${zodiacData.rulingPlanet}の影響を受けるあなたならではの独創的なアイデアが、今日の${todayAction}で光るでしょう。`,
      `${todayAction}において、チームワークを大切にすることで新しい可能性が見えてきそうです。`
    ]
    return workAdvice[(uniqueSeed + workFortune) % workAdvice.length]
  }
  
  if (actionLower.includes("買い物") || actionLower.includes("ショッピング") || actionLower.includes("shopping")) {
    const shoppingAdvice = [
      `${todayAction}では、あなたの${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}なセンスが光る素敵な出会いがありそうです。`,
      `今日の${todayAction}は、${moneyFortune >= 70 ? "価値ある投資となる品物" : "本当に必要なものを見極める"}良い機会となるでしょう。`,
      `${zodiacData.element}の元素を持つあなたらしい美的感覚が、今日の${todayAction}で発揮されそうです。`,
      `${todayAction}において、予想外の掘り出し物に出会える可能性が高そうです。`
    ]
    return shoppingAdvice[(uniqueSeed + moneyFortune) % shoppingAdvice.length]
  }
  
  // 一般的な行動に対するコメント
  const generalActionAdvice = [
    `${todayAction}を通じて、あなたの${zodiacData.characteristics[uniqueSeed % zodiacData.characteristics.length]}な特性が新しい扉を開く鍵となるでしょう。`,
    `今日の${todayAction}は、${zodiacData.element}の元素を持つあなたならではの独特なアプローチで成功へと導かれそうです。`,
    `${todayAction}において、${zodiacData.quality}宮の特徴を活かした柔軟な対応が幸運を呼び込むでしょう。`,
    `${todayAction}では、${zodiacData.rulingPlanet}の加護を受けたあなたの直感が正しい道を示してくれるはずです。`,
    `今日の${todayAction}が、あなたの人生に新しい気づきと成長をもたらしてくれることでしょう。`
  ]
  
  return generalActionAdvice[(uniqueSeed + todayAction.length) % generalActionAdvice.length]
}

// 星座特化型の詳細アドバイス生成
function generateZodiacSpecificAdvice(zodiacData: ZodiacData, totalFortune: number, random: () => number, uniqueSeed: number): string {
  const elementAdvice = {
    "火": [
      "火の元素を持つあなたは、今日その情熱的なエネルギーで周囲を明るく照らすでしょう。",
      "燃え上がるような情熱を持つあなたなら、今日の困難も乗り越えられるはずです。",
      "火の特性を活かし、リーダーシップを発揮する場面が訪れそうです。",
      "今日は火のように温かい心で人と接することで、新しい絆が生まれるでしょう。"
    ],
    "土": [
      "土の元素を持つあなたは、今日その堅実さで確実な成果を手にするでしょう。",
      "大地のように安定したあなたの存在が、周りの人に安心感を与えます。",
      "土の特性を活かし、計画的に物事を進めることで大きな成功を掴めそうです。",
      "今日は土のように豊かな実りをもたらす行動を心がけてください。"
    ],
    "風": [
      "風の元素を持つあなたは、今日その自由な発想で新しい可能性を切り開くでしょう。",
      "風のように軽やかなあなたのコミュニケーションが、多くの人を魅了します。",
      "風の特性を活かし、柔軟な思考で問題解決に取り組んでください。",
      "今日は風のように爽やかな気持ちで、新しい挑戦に向かいましょう。"
    ],
    "水": [
      "水の元素を持つあなたは、今日その深い感受性で人の心に寄り添うでしょう。",
      "水のように流れるような自然さが、今日のあなたの最大の魅力となります。",
      "水の特性を活かし、直感を信じて行動することで正しい道が見えてきます。",
      "今日は水のように清らかな心で、すべてを受け入れる寛容さを大切にしてください。"
    ]
  }
  
  const qualityAdvice = {
    "活動": [
      "活動宮の特性を持つあなたは、今日新しいプロジェクトを始めるのに最適な日です。",
      "積極的に行動することで、思いがけない幸運が舞い込んでくるでしょう。",
      "今日は活動宮らしく、率先して物事を進めていくことが成功の鍵となります。",
      "変化を恐れず、新しい環境に飛び込む勇気が今日のあなたに必要です。"
    ],
    "不動": [
      "不動宮の特性を持つあなたは、今日その安定感で周りの信頼を得るでしょう。",
      "一度決めたことを最後まで貫く強さが、今日大きな成果をもたらします。",
      "今日は不動宮らしく、じっくりと腰を据えて取り組むことが重要です。",
      "継続は力なり、今日のあなたの粘り強さが実を結ぶ時が来ています。"
    ],
    "柔軟": [
      "柔軟宮の特性を持つあなたは、今日その適応力で様々な状況に対応できるでしょう。",
      "変化を楽しみながら、新しい可能性を見つけ出すことができそうです。",
      "今日は柔軟宮らしく、臨機応変な対応が幸運を引き寄せる鍵となります。",
      "多角的な視点で物事を見ることで、今日新しい発見があるはずです。"
    ]
  }
  
  const selectedElementAdvice = elementAdvice[zodiacData.element][(uniqueSeed + totalFortune) % elementAdvice[zodiacData.element].length]
  const selectedQualityAdvice = qualityAdvice[zodiacData.quality][(uniqueSeed + totalFortune * 2) % qualityAdvice[zodiacData.quality].length]
  
  return ` ${selectedElementAdvice} ${selectedQualityAdvice}`
}

// 運勢バランス分析の詳細生成
function generateFortuneBalanceAnalysis(loveFortune: number, workFortune: number, moneyFortune: number, random: () => number, uniqueSeed: number): string {
  const scores = [
    { type: "恋愛運", score: loveFortune },
    { type: "仕事運", score: workFortune },
    { type: "金運", score: moneyFortune }
  ]
  
  const highest = scores.reduce((prev, current) => (prev.score > current.score) ? prev : current)
  const lowest = scores.reduce((prev, current) => (prev.score < current.score) ? prev : current)
  
  const balanceAnalysisVariations = [
    `特に${highest.type}が${highest.score}点と輝いており、これが今日のあなたの強い味方となるでしょう。`,
    `今日は${highest.type}に恵まれた一日で、この分野での成功が他の運気も押し上げてくれそうです。`,
    `${highest.type}の好調さが、今日のあなたに自信と前向きなエネルギーをもたらしてくれます。`,
    `${highest.type}が特に良好な今日は、この運気を活かして積極的に行動してみてください。`
  ]
  
  let balanceComment = ""
  if (lowest.score < 50) {
    const lowScoreAdvice = [
      `${lowest.type}は${lowest.score}点とやや控えめですが、これは今日は無理をしないでという宇宙からのメッセージかもしれません。`,
      `${lowest.type}が${lowest.score}点と少し低めなのは、他の分野に集中するべき時期だという暗示でしょう。`,
      `${lowest.type}は${lowest.score}点ですが、焦る必要はありません。今日は別の角度からアプローチしてみて。`,
      `${lowest.type}が${lowest.score}点なのは、今日はこの分野で学びや気づきを得る日だからかもしれません。`
    ]
    balanceComment = ` ${lowScoreAdvice[(uniqueSeed + lowest.score) % lowScoreAdvice.length]}`
  }
  
  const selectedAnalysis = balanceAnalysisVariations[(uniqueSeed + highest.score) % balanceAnalysisVariations.length]
  
  return ` ${selectedAnalysis}${balanceComment}`
}

// 時間帯別のアドバイス生成
function generateTimeBasedAdvice(random: () => number, uniqueSeed: number): string {
  const timeAdviceVariations = [
    " 朝の時間帯は新しいアイデアが浮かびやすく、午後は実行力が高まる傾向にあります。",
    " 昼間の活動的な時間を大切にし、夕方以降は振り返りの時間として活用してください。",
    " 午前中は集中力が高く、午後は人とのコミュニケーションが特に良好になりそうです。",
    " 今日は夜の時間帯に重要な気づきや直感が訪れる可能性が高いでしょう。",
    " 一日を通して、自分の体調やエネルギーレベルに合わせてペースを調整することが大切です。"
  ]
  
  return timeAdviceVariations[uniqueSeed % timeAdviceVariations.length]
}

// 感情的なメッセージを生成（高速化優先）
async function generateEmotionalMessage(totalFortune: number, zodiacSign: ZodiacSign, todayAction: string): Promise<string> {
  // 高速化のため、90%の確率でフォールバック使用
  if (Math.random() < 0.9) {
    return generateFallbackEmotionalMessage(totalFortune, zodiacSign, todayAction)
  }

  const fortuneLevel = totalFortune >= 80 ? "高い" : 
                      totalFortune >= 60 ? "良好" : 
                      totalFortune >= 40 ? "普通" : "低め"

  const prompt = `${zodiacSign}の今日の気持ち（${fortuneLevel}運勢）を30文字で：`

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), 2000)
    )
    
    const aiPromise = getTextGenerationPipeline().then(pipeline => 
      pipeline(prompt, {
        max_length: 100,
        temperature: 0.5,
        do_sample: true
      })
    )
    
    const result = await Promise.race([aiPromise, timeoutPromise])
    let generatedText = result[0].generated_text.replace(prompt, '').trim()
    
    // 文字化けや異常な文字を除去
    generatedText = generatedText.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303Fa-zA-Z0-9\s。、！？（）「」\-]/g, '')
    
    if (generatedText.length > 80) {
      generatedText = generatedText.substring(0, 80)
    }
    
    if (generatedText.length < 15 || generatedText.includes('！！！')) {
      return generateFallbackEmotionalMessage(totalFortune, zodiacSign, todayAction)
    }
    
    return generatedText
  } catch (error) {
    console.error('AI emotional message generation failed:', error)
    return generateFallbackEmotionalMessage(totalFortune, zodiacSign, todayAction)
  }
}

// フォールバック用の感情メッセージ（バリエーション豊富）
function generateFallbackEmotionalMessage(totalFortune: number, zodiacSign: ZodiacSign, todayAction: string): string {
  const today = new Date()
  const seed = today.getTime() + stringToHash(zodiacSign + todayAction + "emotion")
  
  const messageGroups = {
    high: [
      "今日はワクワクする一日になりそう！エネルギーに満ち溢れていますね。",
      "心が軽やか♪ 自信を持って行動してください。",
      "今日のあなたはキラキラ輝いています。その笑顔を大切に！",
      "素晴らしい一日の始まりです。前向きなパワーが感じられます。"
    ],
    good: [
      "今日は心地よい一日になりそう。リラックスして過ごしてください。",
      "穏やかな気持ちで過ごせそう。周りの人にも優しさが伝わるでしょう。",
      "今日は心のバランスが良い日。自分を大切にしてくださいね。",
      "安定した気持ちで過ごせる素敵な一日になりそうです。"
    ],
    normal: [
      "今日は平穏な一日。いつものペースで大丈夫です。",
      "落ち着いた気持ちで過ごせそう。小さな幸せに気づけるかも。",
      "今日は自分の時間も大切に。ゆっくりと過ごしてください。",
      "普段通りの日常を楽しみながら、心穏やかに過ごしましょう。"
    ],
    low: [
      "少し疲れ気味かも？無理せずに、自分のペースで進んでください。",
      "今日は少しお疲れモード。温かい飲み物でほっと一息ついて。",
      "心が少し重いかもしれませんが、きっと明日は良い日になります。",
      "今日は自分を労わる日。ゆっくり休んで心をリセットしてくださいね。"
    ]
  }
  
  const level = totalFortune >= 80 ? "high" : 
               totalFortune >= 60 ? "good" : 
               totalFortune >= 40 ? "normal" : "low"
  
  const messages = messageGroups[level]
  return messages[seed % messages.length]
}

// 総合的な評価コメントを生成（高速化優先）
async function generateOverallAssessment(
  totalFortune: number,
  loveFortune: number,
  workFortune: number,
  moneyFortune: number,
  zodiacSign: ZodiacSign,
  todayAction: string
): Promise<string> {
  // 高速化のため、95%の確率でフォールバック使用
  if (Math.random() < 0.95) {
    return generateFallbackOverallAssessment(totalFortune, loveFortune, workFortune, moneyFortune, zodiacSign, todayAction)
  }

  const averageScore = Math.round((totalFortune + loveFortune + workFortune + moneyFortune) / 4)
  const prompt = `${zodiacSign}の総合評価（平均${averageScore}点）を50文字で：`

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), 2000)
    )
    
    const aiPromise = getTextGenerationPipeline().then(pipeline => 
      pipeline(prompt, {
        max_length: 150,
        temperature: 0.5,
        do_sample: true
      })
    )
    
    const result = await Promise.race([aiPromise, timeoutPromise])
    let generatedText = result[0].generated_text.replace(prompt, '').trim()
    
    // 文字化けや異常な文字を除去
    generatedText = generatedText.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303Fa-zA-Z0-9\s。、！？（）「」\-]/g, '')
    
    if (generatedText.length > 150) {
      generatedText = generatedText.substring(0, 150)
    }
    
    if (generatedText.length < 30 || generatedText.includes('！！！')) {
      return generateFallbackOverallAssessment(totalFortune, loveFortune, workFortune, moneyFortune, zodiacSign, todayAction)
    }
    
    return generatedText
  } catch (error) {
    console.error('AI overall assessment generation failed:', error)
    return generateFallbackOverallAssessment(totalFortune, loveFortune, workFortune, moneyFortune, zodiacSign, todayAction)
  }
}

// フォールバック用の総合評価（バリエーション豊富）
function generateFallbackOverallAssessment(
  totalFortune: number,
  loveFortune: number,
  workFortune: number,
  moneyFortune: number,
  zodiacSign: ZodiacSign,
  todayAction: string
): string {
  const today = new Date()
  const seed = today.getTime() + stringToHash(zodiacSign + todayAction + "assessment")
  
  const averageScore = Math.round((totalFortune + loveFortune + workFortune + moneyFortune) / 4)
  const highest = Math.max(loveFortune, workFortune, moneyFortune)
  const highestType = highest === loveFortune ? "恋愛運" : 
                     highest === workFortune ? "仕事運" : "金運"
  
  const scoreVariance = Math.max(totalFortune, loveFortune, workFortune, moneyFortune) - 
                       Math.min(totalFortune, loveFortune, workFortune, moneyFortune)
  
  const assessmentTemplates = {
    excellent: [
      `今日は全体的に素晴らしい運気に恵まれた特別な一日となるでしょう。特に${highestType}が${highest}点と輝いており、充実した時間を過ごせそうです。`,
      `${zodiacSign}のあなたにとって今日は最高の運勢です。${highestType}${highest}点の好調さを活かし、積極的にチャレンジしてみてください。`,
      `今日は運気が絶好調！全ての分野でバランスよく力を発揮できる素晴らしい一日になりそうです。`,
      `星々があなたに微笑みかける特別な日です。${highestType}を中心に、今日という日を存分に楽しんでください。`
    ],
    good: [
      `今日は全体的に良好な運気で、安定した一日を過ごせるでしょう。${highestType}が${highest}点と好調なので、この分野を中心に積極的に行動してみてください。`,
      `${zodiacSign}らしい魅力が輝く良い日です。${highestType}の好調さを活かして、充実した時間をお過ごしください。`,
      `今日は心地よい運気に包まれた穏やかな一日になりそうです。自分らしいペースで過ごしてくださいね。`,
      `バランスの取れた良い運勢の日です。${highestType}を軸にして、素敵な一日を築いていきましょう。`
    ],
    normal: [
      `今日は平穏で落ち着いた運気の中、自分らしく過ごせる一日となりそうです。${highestType}が${highest}点なので、この分野に注目してみてください。`,
      `${zodiacSign}のあなたにとって今日は穏やかな日です。いつものペースで、無理をせず過ごしてください。`,
      `今日は特別な波はありませんが、それが逆に安心して行動できる安定感をもたらしてくれるでしょう。`,
      `普段通りの日常を大切にしながら、${highestType}での小さな成功を積み重ねていきましょう。`
    ],
    careful: [
      `今日は慎重さが求められる一日ですが、${highestType}が${highest}点と比較的良好なので、この分野を中心に無理をせず進んでいきましょう。`,
      `${zodiacSign}のあなたは今日、少し控えめに行動するのが良さそうです。${highestType}での小さな成功を大切にしてください。`,
      `今日は焦らず、ゆっくりとしたペースで進むことが大切です。${highestType}に集中して取り組んでみてください。`,
      `困難な面もありますが、${highestType}${highest}点の明るい兆しを信じて、前向きに過ごしてくださいね。`
    ]
  }
  
  const level = averageScore >= 80 ? "excellent" : 
               averageScore >= 60 ? "good" : 
               averageScore >= 40 ? "normal" : "careful"
  
  const templates = assessmentTemplates[level]
  return templates[seed % templates.length]
}

// メイン運勢計算関数（AI対応）
export async function calculateFortune(input: FortuneInput): Promise<FortuneResult> {
  const today = new Date()
  const baseSeed = generateBaseSeed(input.zodiacSign, today)
  const actionHash = stringToHash(input.todayAction)
  const combinedSeed = baseSeed + actionHash
  
  const random = createSeededRandom(combinedSeed)
  
  // 行動テキスト分析
  const actionAnalysis = analyzeActionText(input.todayAction)
  
  // 基本運勢スコアを生成（30-90の範囲）
  const baseTotal = Math.floor(random() * 61) + 30
  const baseLove = Math.floor(random() * 61) + 30
  const baseWork = Math.floor(random() * 61) + 30
  const baseMoney = Math.floor(random() * 61) + 30
  
  // 行動分析結果を適用
  const adjustedTotal = Math.min(100, Math.max(0, baseTotal + actionAnalysis.positiveBonus + actionAnalysis.activeBonus))
  const adjustedLove = Math.min(100, Math.max(0, baseLove + actionAnalysis.loveBonus))
  const adjustedWork = Math.min(100, Math.max(0, baseWork + actionAnalysis.workBonus))
  const adjustedMoney = Math.min(100, Math.max(0, baseMoney + actionAnalysis.moneyBonus))
  
  // 星座特性を適用
  const totalFortune = Math.round(applyZodiacModifiers(adjustedTotal, input.zodiacSign, "total"))
  const loveFortune = Math.round(applyZodiacModifiers(adjustedLove, input.zodiacSign, "love"))
  const workFortune = Math.round(applyZodiacModifiers(adjustedWork, input.zodiacSign, "work"))
  const moneyFortune = Math.round(applyZodiacModifiers(adjustedMoney, input.zodiacSign, "money"))
  
  // ラッキー行動と注意事項を生成
  const luckyAction = generateLuckyAction(input.zodiacSign, input.todayAction, random)
  const caution = generateCaution(input.zodiacSign, random)
  
  // AIを使ってアドバイス、感情メッセージ、総合評価を生成（並行実行）
  const [advice, emotionalMessage, overallAssessment] = await Promise.all([
    generateAdvice(input.zodiacSign, input.todayAction, totalFortune, loveFortune, workFortune, moneyFortune, random),
    generateEmotionalMessage(totalFortune, input.zodiacSign, input.todayAction),
    generateOverallAssessment(totalFortune, loveFortune, workFortune, moneyFortune, input.zodiacSign, input.todayAction)
  ])
  
  return {
    totalFortune,
    loveFortune,
    workFortune,
    moneyFortune,
    luckyAction,
    caution,
    advice,
    emotionalMessage,
    overallAssessment
  }
}

// 運勢スコアに対応するメッセージを取得
export function getFortuneMessage(score: number): string {
  const range = FORTUNE_RANGES.find(r => score >= r.min && score <= r.max)
  return range?.message || "普通の日。普段通りの行動でOK。"
}
