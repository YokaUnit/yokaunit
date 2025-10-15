import type { StressCheckAnswers, StressCheckResult } from './types'
import { questions } from './questions'

// ストレス耐性分析のメイン関数
export async function analyzeStressResistance(answers: StressCheckAnswers): Promise<StressCheckResult> {
  // 各回答のスコアを計算
  const scores = Object.entries(answers).map(([questionId, answerId]) => {
    const question = questions.find(q => q.id === questionId)
    const option = question?.options.find(opt => opt.id === answerId)
    return option?.score || 0
  })

  // 総合スコア計算（1-100スケール）
  const totalScore = scores.reduce((sum, score) => sum + score, 0)
  const maxScore = questions.length * 5
  const stressLevel = Math.round((totalScore / maxScore) * 100)

  // カテゴリ別スコア分析
  const categoryScores = {
    workload: getScoreForAnswer(answers.workload),
    pressure: getScoreForAnswer(answers.pressure),
    change: getScoreForAnswer(answers.change),
    relationship: getScoreForAnswer(answers.relationship),
    recovery: getScoreForAnswer(answers.recovery),
    lifestyle: getScoreForAnswer(answers.lifestyle)
  }

  // ストレス耐性タイプの判定
  const stressType = determineStressType(stressLevel, categoryScores)
  
  // リスクレベルの判定
  const riskLevel = determineRiskLevel(stressLevel)

  // 特徴と強み、改善点の生成
  const characteristics = generateCharacteristics(stressLevel, categoryScores)
  const strengths = generateStrengths(categoryScores)
  const improvements = generateImprovements(categoryScores)
  
  // 個別アドバイスの生成
  const advice = generateAdvice(stressLevel, categoryScores, riskLevel)

  return {
    stressLevel,
    stressType: stressType.type,
    stressDescription: stressType.description,
    characteristics,
    strengths,
    improvements,
    advice,
    riskLevel
  }
}

// 回答からスコアを取得
function getScoreForAnswer(answerId: string): number {
  for (const question of questions) {
    const option = question.options.find(opt => opt.id === answerId)
    if (option) return option.score
  }
  return 0
}

// ストレス耐性タイプの判定
function determineStressType(stressLevel: number, categoryScores: Record<string, number>): { type: string; description: string } {
  if (stressLevel >= 85) {
    return {
      type: "ストレス・マスター",
      description: "非常に高いストレス耐性を持ち、困難な状況でも冷静に対処できる強靭なメンタルの持ち主です。"
    }
  } else if (stressLevel >= 70) {
    return {
      type: "レジリエント・タイプ",
      description: "高いストレス耐性と回復力を持ち、多くの困難を乗り越えることができる安定したタイプです。"
    }
  } else if (stressLevel >= 55) {
    return {
      type: "バランス・タイプ",
      description: "適度なストレス耐性を持ち、日常的なストレスには対応できるバランスの取れたタイプです。"
    }
  } else if (stressLevel >= 40) {
    return {
      type: "センシティブ・タイプ",
      description: "ストレスに敏感で、環境や状況の変化に影響を受けやすい繊細なタイプです。"
    }
  } else {
    return {
      type: "ケア・ニーズ・タイプ",
      description: "ストレスの影響を受けやすく、適切なサポートとケアが必要なタイプです。"
    }
  }
}

// リスクレベルの判定
function determineRiskLevel(stressLevel: number): 'low' | 'medium' | 'high' {
  if (stressLevel >= 60) return 'low'
  if (stressLevel >= 40) return 'medium'
  return 'high'
}

// 特徴の生成
function generateCharacteristics(stressLevel: number, categoryScores: Record<string, number>): string[] {
  const characteristics: string[] = []

  // 全体的な特徴
  if (stressLevel >= 70) {
    characteristics.push("困難な状況でも冷静さを保てる")
    characteristics.push("プレッシャーを力に変えることができる")
  } else if (stressLevel >= 50) {
    characteristics.push("適度なストレス管理ができている")
    characteristics.push("バランスの取れた対処法を持っている")
  } else {
    characteristics.push("ストレスの影響を受けやすい")
    characteristics.push("環境の変化に敏感に反応する")
  }

  // カテゴリ別特徴
  if (categoryScores.pressure >= 4) {
    characteristics.push("プレッシャーのある場面で力を発揮する")
  }
  if (categoryScores.recovery >= 4) {
    characteristics.push("疲労やストレスからの回復が早い")
  }
  if (categoryScores.change >= 4) {
    characteristics.push("変化を前向きに捉えることができる")
  }

  return characteristics
}

// 強みの生成
function generateStrengths(categoryScores: Record<string, number>): string[] {
  const strengths: string[] = []

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 4) {
      switch (category) {
        case 'workload':
          strengths.push("高い業務処理能力")
          break
        case 'pressure':
          strengths.push("プレッシャー耐性")
          break
        case 'change':
          strengths.push("変化適応力")
          break
        case 'relationship':
          strengths.push("人間関係スキル")
          break
        case 'recovery':
          strengths.push("高い回復力")
          break
        case 'lifestyle':
          strengths.push("健康的な生活習慣")
          break
      }
    }
  })

  if (strengths.length === 0) {
    strengths.push("自分の特性を理解している")
    strengths.push("改善への意識がある")
  }

  return strengths
}

// 改善点の生成
function generateImprovements(categoryScores: Record<string, number>): string[] {
  const improvements: string[] = []

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score <= 2) {
      switch (category) {
        case 'workload':
          improvements.push("時間管理とタスク整理のスキル向上")
          break
        case 'pressure':
          improvements.push("プレッシャー対処法の習得")
          break
        case 'change':
          improvements.push("変化への柔軟性を育てる")
          break
        case 'relationship':
          improvements.push("コミュニケーションスキルの向上")
          break
        case 'recovery':
          improvements.push("効果的な休息方法の確立")
          break
        case 'lifestyle':
          improvements.push("規則正しい生活習慣の構築")
          break
      }
    }
  })

  if (improvements.length === 0) {
    improvements.push("現在の良い状態を維持する")
    improvements.push("さらなるストレス管理スキルの向上")
  }

  return improvements
}

// アドバイスの生成
function generateAdvice(stressLevel: number, categoryScores: Record<string, number>, riskLevel: 'low' | 'medium' | 'high'): string {
  if (riskLevel === 'high') {
    return `あなたのストレス耐性は現在低い状態にあります。まずは十分な休息を取り、信頼できる人に相談することをお勧めします。必要に応じて専門家のサポートを受けることも大切です。小さな変化から始めて、徐々にストレス管理スキルを身につけていきましょう。`
  } else if (riskLevel === 'medium') {
    return `適度なストレス耐性を持っていますが、さらに向上の余地があります。規則正しい生活習慣を心がけ、リラクゼーション技法や運動を取り入れることで、より高いストレス耐性を身につけることができるでしょう。`
  } else {
    return `優れたストレス耐性を持っています。現在の良い状態を維持しながら、周囲の人のサポートにも回ることができるでしょう。継続的な自己管理と、新しいチャレンジへの挑戦を通じて、さらなる成長を目指してください。`
  }
}
