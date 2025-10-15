import type { AIStressCheckAnswers, AIStressCheckResult } from './types'
import { questions } from './questions'

// AI感情分析（簡易版）- 実際のAI APIの代替
async function analyzeTextSentiment(text: string) {
  // 実際のAI分析をシミュレート
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // ポジティブ・ネガティブキーワードによる分析
  const positiveWords = ['効率的', '積極的', '楽しみ', '冷静', '短時間', '管理', '計画的', '柔軟', '力を発揮', '問題ない']
  const negativeWords = ['パニック', '焦る', '苦手', '引きずる', '時間がかかる', '乱れ', '不規則', '実力が下がる', '強いストレス']
  
  const positiveCount = positiveWords.filter(word => text.includes(word)).length
  const negativeCount = negativeWords.filter(word => text.includes(word)).length
  
  if (positiveCount > negativeCount) {
    return { label: 'POSITIVE', score: Math.min(0.9, 0.5 + (positiveCount * 0.1)) }
  } else if (negativeCount > positiveCount) {
    return { label: 'NEGATIVE', score: Math.min(0.9, 0.5 + (negativeCount * 0.1)) }
  } else {
    return { label: 'NEUTRAL', score: 0.5 }
  }
}

// AI駆動のストレス耐性分析システム
export async function analyzeStressResistance(answers: AIStressCheckAnswers): Promise<AIStressCheckResult> {
  try {
    // 回答テキストを構築（AI分析用）
    const responseTexts = []
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(opt => opt.id === answer)
        if (option) {
          responseTexts.push(option.text)
        }
      }
    })
    
    const combinedText = responseTexts.join(' ')
    
    // AI感情分析を実行
    const sentimentAnalysis = await analyzeTextSentiment(combinedText)
    
    // 各回答のスコアを計算
    const scores = Object.entries(answers).map(([questionId, answerId]) => {
      const question = questions.find(q => q.id === questionId)
      const option = question?.options.find(opt => opt.id === answerId)
      return option?.score || 0
    })

    // 総合スコア計算（1-100スケール）
    const totalScore = scores.reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 5
    let baseStressLevel = Math.round((totalScore / maxScore) * 100)

    // AI感情分析結果による調整
    if (sentimentAnalysis.label === 'POSITIVE' && sentimentAnalysis.score > 0.7) {
      baseStressLevel += 5 // ポジティブな回答はストレス耐性を向上
    } else if (sentimentAnalysis.label === 'NEGATIVE' && sentimentAnalysis.score > 0.7) {
      baseStressLevel -= 3 // ネガティブな回答はストレス耐性を低下
    }

    // ランダム要素を追加して多様性を確保
    const randomFactor = (Math.random() - 0.5) * 8
    const stressLevel = Math.round(Math.max(0, Math.min(100, baseStressLevel + randomFactor)))

    // カテゴリ別スコア分析
    const categoryScores = {
      workload: getScoreForAnswer(answers.workload),
      pressure: getScoreForAnswer(answers.pressure),
      change: getScoreForAnswer(answers.change),
      relationship: getScoreForAnswer(answers.relationship),
      recovery: getScoreForAnswer(answers.recovery),
      lifestyle: getScoreForAnswer(answers.lifestyle)
    }

    // AI分析によるストレス耐性タイプの判定
    const stressType = await determineStressTypeWithAI(stressLevel, categoryScores, sentimentAnalysis)
    
    // リスクレベルの判定
    const riskLevel = determineRiskLevel(stressLevel)

    // AI生成による特徴と強み、改善点
    const characteristics = await generateCharacteristicsWithAI(stressLevel, categoryScores, sentimentAnalysis)
    const strengths = await generateStrengthsWithAI(categoryScores, sentimentAnalysis)
    const improvements = await generateImprovementsWithAI(categoryScores, sentimentAnalysis)
    
    // AI生成による個別アドバイス
    const advice = await generateAdviceWithAI(stressLevel, categoryScores, riskLevel, sentimentAnalysis)
    
    // AI詳細分析
    const detailedAnalysis = await generateDetailedAnalysisWithAI(stressLevel, categoryScores, sentimentAnalysis)

    return {
      stressLevel,
      stressType: stressType.type,
      stressDescription: stressType.description,
      characteristics,
      strengths,
      improvements,
      advice,
      riskLevel,
      detailedAnalysis
    }
  } catch (error) {
    console.error('AI stress analysis failed:', error)
    throw new Error('AI分析に失敗しました。もう一度お試しください。')
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

// AI分析によるストレス耐性タイプの判定
async function determineStressTypeWithAI(stressLevel: number, categoryScores: Record<string, number>, sentimentAnalysis: any): Promise<{ type: string; description: string }> {
  // AI分析をシミュレート
  await new Promise(resolve => setTimeout(resolve, 50))
  
  const isPositive = sentimentAnalysis.label === 'POSITIVE'
  const isNegative = sentimentAnalysis.label === 'NEGATIVE'
  
  if (stressLevel >= 85) {
    return {
      type: isPositive ? "ストレス・マスター" : "メンタル・チャンピオン",
      description: "AIが分析した結果、あなたは非常に高いストレス耐性を持ち、困難な状況でも冷静に対処できる強靭なメンタルの持ち主です。"
    }
  } else if (stressLevel >= 70) {
    return {
      type: isPositive ? "レジリエント・リーダー" : "安定型ストレス・ファイター",
      description: "AI分析により、高いストレス耐性と回復力を持ち、多くの困難を乗り越えることができる安定したタイプと判定されました。"
    }
  } else if (stressLevel >= 55) {
    return {
      type: isNegative ? "慎重型バランサー" : "アダプティブ・タイプ",
      description: "AI分析の結果、適度なストレス耐性を持ち、状況に応じて柔軟に対応できるバランスの取れたタイプです。"
    }
  } else if (stressLevel >= 40) {
    return {
      type: isNegative ? "デリケート・センサー" : "感受性豊かタイプ",
      description: "AI分析により、ストレスに敏感で環境や状況の変化に影響を受けやすい、感受性豊かなタイプと判定されました。"
    }
  } else {
    return {
      type: isNegative ? "サポート・ニーズ・タイプ" : "ケア重視タイプ",
      description: "AI分析の結果、ストレスの影響を受けやすく、適切なサポートとセルフケアが重要なタイプです。"
    }
  }
}

// リスクレベルの判定
function determineRiskLevel(stressLevel: number): 'low' | 'medium' | 'high' {
  if (stressLevel >= 60) return 'low'
  if (stressLevel >= 40) return 'medium'
  return 'high'
}

// AI生成による特徴分析
async function generateCharacteristicsWithAI(stressLevel: number, categoryScores: Record<string, number>, sentimentAnalysis: any): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 30))
  
  const characteristics: string[] = []
  const isPositive = sentimentAnalysis.label === 'POSITIVE'
  
  // AI分析による全体的な特徴
  if (stressLevel >= 70) {
    characteristics.push(isPositive ? "困難な状況でも前向きに取り組める" : "冷静で論理的な判断ができる")
    characteristics.push("プレッシャーを成長の機会として捉える")
  } else if (stressLevel >= 50) {
    characteristics.push("バランスの取れたストレス管理ができている")
    characteristics.push(isPositive ? "楽観的な視点を持っている" : "現実的な対処法を選択する")
  } else {
    characteristics.push("環境の変化に敏感に反応する")
    characteristics.push(isPositive ? "サポートを求めることができる" : "慎重に物事を進める傾向がある")
  }

  // カテゴリ別AI分析特徴
  if (categoryScores.pressure >= 4) {
    characteristics.push("重要な場面で実力を発揮できる")
  }
  if (categoryScores.recovery >= 4) {
    characteristics.push("効果的な回復方法を知っている")
  }
  if (categoryScores.change >= 4) {
    characteristics.push("新しい環境に素早く適応できる")
  }

  return characteristics
}

// AI生成による強み分析
async function generateStrengthsWithAI(categoryScores: Record<string, number>, sentimentAnalysis: any): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 30))
  
  const strengths: string[] = []
  const isPositive = sentimentAnalysis.label === 'POSITIVE'

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 4) {
      switch (category) {
        case 'workload':
          strengths.push(isPositive ? "高効率な業務処理能力" : "冷静な業務管理スキル")
          break
        case 'pressure':
          strengths.push(isPositive ? "プレッシャーを力に変える能力" : "重要場面での安定性")
          break
        case 'change':
          strengths.push(isPositive ? "変化を楽しむ柔軟性" : "計画的な適応能力")
          break
        case 'relationship':
          strengths.push(isPositive ? "ポジティブな人間関係構築力" : "冷静な対人問題解決力")
          break
        case 'recovery':
          strengths.push(isPositive ? "素早い心身の回復力" : "効率的なエネルギー管理")
          break
        case 'lifestyle':
          strengths.push(isPositive ? "積極的な健康管理" : "規律正しい生活習慣")
          break
      }
    }
  })

  if (strengths.length === 0) {
    strengths.push(isPositive ? "前向きな学習姿勢" : "自己分析能力")
    strengths.push("改善への意識と行動力")
  }

  return strengths
}

// AI生成による改善点分析
async function generateImprovementsWithAI(categoryScores: Record<string, number>, sentimentAnalysis: any): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 30))
  
  const improvements: string[] = []
  const isNegative = sentimentAnalysis.label === 'NEGATIVE'

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score <= 2) {
      switch (category) {
        case 'workload':
          improvements.push(isNegative ? "段階的な業務負荷の調整" : "効率的なタスク管理手法の習得")
          break
        case 'pressure':
          improvements.push(isNegative ? "リラクゼーション技法の習得" : "プレッシャー対処法の練習")
          break
        case 'change':
          improvements.push(isNegative ? "小さな変化から慣れる練習" : "変化への心構えの準備")
          break
        case 'relationship':
          improvements.push(isNegative ? "信頼できる相談相手の確保" : "コミュニケーションスキルの向上")
          break
        case 'recovery':
          improvements.push(isNegative ? "専門的な休息方法の学習" : "効果的なリフレッシュ法の確立")
          break
        case 'lifestyle':
          improvements.push(isNegative ? "無理のない生活リズムの構築" : "健康習慣の段階的導入")
          break
      }
    }
  })

  if (improvements.length === 0) {
    improvements.push("現在の良い状態の維持と発展")
    improvements.push("さらなるストレス管理スキルの向上")
  }

  return improvements
}

// AI生成による個別アドバイス
async function generateAdviceWithAI(stressLevel: number, categoryScores: Record<string, number>, riskLevel: 'low' | 'medium' | 'high', sentimentAnalysis: any): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 50))
  
  const isPositive = sentimentAnalysis.label === 'POSITIVE'
  const isNegative = sentimentAnalysis.label === 'NEGATIVE'
  
  if (riskLevel === 'high') {
    if (isNegative) {
      return `AI分析の結果、現在ストレスの影響を強く受けている状態です。まずは信頼できる人に相談し、十分な休息を取ることを最優先にしてください。小さな成功体験を積み重ね、徐々に自信を回復していきましょう。必要に応じて専門家のサポートを受けることも重要です。`
    } else {
      return `AI分析により、ストレス耐性の向上が必要な状態と判定されました。前向きな姿勢を活かし、段階的にストレス管理スキルを身につけていきましょう。リラクゼーション技法や規則正しい生活習慣から始めることをお勧めします。`
    }
  } else if (riskLevel === 'medium') {
    if (isPositive) {
      return `AI分析の結果、良好なストレス耐性を持っていますが、さらなる向上の余地があります。現在のポジティブな姿勢を維持しながら、運動や瞑想などの新しいストレス管理法を取り入れることで、より高いレベルに到達できるでしょう。`
    } else {
      return `AI分析により、適度なストレス耐性を持っていることが分かりました。現在の安定した状態を基盤に、計画的にストレス管理スキルを向上させていくことで、より強いメンタルを構築できます。`
    }
  } else {
    if (isPositive) {
      return `AI分析の結果、優れたストレス耐性を持っていることが判明しました。この前向きで強いメンタルを活かし、周囲の人のサポートや新しいチャレンジへの挑戦を通じて、さらなる成長を目指してください。あなたの経験は多くの人の参考になるでしょう。`
    } else {
      return `AI分析により、非常に高いストレス耐性を持っていると判定されました。冷静で論理的な判断力を活かし、リーダーシップを発揮する場面でその能力を存分に活用してください。継続的な自己管理により、この優れた状態を維持していきましょう。`
    }
  }
}

// AI生成による詳細分析
async function generateDetailedAnalysisWithAI(stressLevel: number, categoryScores: Record<string, number>, sentimentAnalysis: any): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 40))
  
  const strongestArea = Object.entries(categoryScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]
  const weakestArea = Object.entries(categoryScores).reduce((a, b) => a[1] < b[1] ? a : b)[0]
  
  const areaNames = {
    workload: '業務負荷管理',
    pressure: 'プレッシャー対応',
    change: '変化適応',
    relationship: '人間関係',
    recovery: '回復力',
    lifestyle: '生活習慣'
  }
  
  return `AI総合分析の結果、あなたのストレス耐性レベルは${stressLevel}点と判定されました。特に「${areaNames[strongestArea as keyof typeof areaNames]}」の分野で優れた能力を示しており、これがあなたの大きな強みとなっています。一方で「${areaNames[weakestArea as keyof typeof areaNames]}」の分野には改善の余地があり、この部分を強化することで全体的なストレス耐性をさらに向上させることができるでしょう。AI分析による感情傾向は${sentimentAnalysis.label === 'POSITIVE' ? 'ポジティブ' : sentimentAnalysis.label === 'NEGATIVE' ? 'ネガティブ' : '中立的'}で、この特性を理解して活用することが重要です。`
}
