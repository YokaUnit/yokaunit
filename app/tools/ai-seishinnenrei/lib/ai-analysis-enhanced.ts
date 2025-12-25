"use client"

import type { DiagnosisAnswers } from './types'
import { questions } from './questions'
import { analyzeMentalAge } from './ai-analysis'

// 日本語キーワードベースの感情分析（より正確）
function analyzeJapaneseSentiment(text: string): { label: string; score: number; details: string[] } {
  const positiveKeywords = [
    '楽しむ', '好き', '積極的', '前向き', '明るい', '活発', 'エネルギッシュ', 
    'ワクワク', 'チャレンジ', '新しい', 'フレッシュ', '若々しい', '元気',
    '楽しい', '嬉しい', '希望', '期待', '夢', '目標', '挑戦', '冒険'
  ]
  
  const negativeKeywords = [
    '慎重', 'じっくり', '考える', '計画', '準備', '冷静', '落ち着き',
    '安定', '我慢', '待つ', '距離', '静か', '穏やか', '成熟', '大人',
    '責任', '信頼', '経験', '知恵', '深い', '思慮深い'
  ]
  
  const neutralKeywords = [
    'バランス', '適応', '柔軟', '自然', '普通', '標準', '平均', '普通'
  ]
  
  let positiveCount = 0
  let negativeCount = 0
  let neutralCount = 0
  const foundKeywords: string[] = []
  
  positiveKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      positiveCount++
      foundKeywords.push(keyword)
    }
  })
  
  negativeKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      negativeCount++
      foundKeywords.push(keyword)
    }
  })
  
  neutralKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      neutralCount++
      foundKeywords.push(keyword)
    }
  })
  
  const total = positiveCount + negativeCount + neutralCount
  if (total === 0) {
    return { label: 'NEUTRAL', score: 0.5, details: [] }
  }
  
  const positiveRatio = positiveCount / total
  const negativeRatio = negativeCount / total
  
  if (positiveRatio > negativeRatio && positiveRatio > 0.4) {
    return { 
      label: 'POSITIVE', 
      score: Math.min(0.95, 0.5 + positiveRatio * 0.45),
      details: foundKeywords.filter(k => positiveKeywords.includes(k))
    }
  } else if (negativeRatio > positiveRatio && negativeRatio > 0.4) {
    return { 
      label: 'NEGATIVE', 
      score: Math.min(0.95, 0.5 + negativeRatio * 0.45),
      details: foundKeywords.filter(k => negativeKeywords.includes(k))
    }
  } else {
    return { 
      label: 'NEUTRAL', 
      score: 0.5,
      details: foundKeywords.filter(k => neutralKeywords.includes(k))
    }
  }
}

// 回答パターンの深い分析
function analyzeAnswerPatterns(answers: DiagnosisAnswers): {
  patternType: string
  consistency: number
  maturityTrend: 'increasing' | 'decreasing' | 'stable' | 'mixed'
  personalityTraits: string[]
  patternDescription: string
} {
  const scores: number[] = []
  const questionIds: string[] = []
  
  questions.forEach(question => {
    const answer = answers[question.id]
    if (answer && question.id !== 'age') {
      const option = question.options.find(opt => opt.id === answer)
      if (option) {
        scores.push(option.score)
        questionIds.push(question.id)
      }
    }
  })
  
  if (scores.length === 0) {
    return {
      patternType: 'unknown',
      consistency: 0,
      maturityTrend: 'stable',
      personalityTraits: [],
      patternDescription: '分析データが不足しています'
    }
  }
  
  // 一貫性の計算
  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length
  const standardDeviation = Math.sqrt(variance)
  const consistency = Math.max(0, Math.min(100, 100 - (standardDeviation * 10)))
  
  // 成熟度のトレンド分析
  let maturityTrend: 'increasing' | 'decreasing' | 'stable' | 'mixed' = 'stable'
  if (scores.length >= 3) {
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2))
    const secondHalf = scores.slice(Math.floor(scores.length / 2))
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
    
    if (secondAvg > firstAvg + 2) {
      maturityTrend = 'increasing'
    } else if (secondAvg < firstAvg - 2) {
      maturityTrend = 'decreasing'
    } else if (Math.abs(secondAvg - firstAvg) < 1) {
      maturityTrend = 'stable'
    } else {
      maturityTrend = 'mixed'
    }
  }
  
  // パターンタイプの判定
  const highMaturityCount = scores.filter(s => s >= 22).length
  const lowMaturityCount = scores.filter(s => s <= 12).length
  const balancedCount = scores.filter(s => s >= 16 && s <= 20).length
  
  let patternType = 'balanced'
  if (highMaturityCount >= 3) {
    patternType = 'high_maturity'
  } else if (lowMaturityCount >= 3) {
    patternType = 'low_maturity'
  } else if (balancedCount >= 3) {
    patternType = 'balanced'
  } else if (scores.some(s => s >= 22) && scores.some(s => s <= 12)) {
    patternType = 'mixed'
  }
  
  // 性格特性の抽出
  const personalityTraits: string[] = []
  if (highMaturityCount >= 2) {
    personalityTraits.push('責任感が強い', '計画性がある', '冷静な判断力')
  }
  if (lowMaturityCount >= 2) {
    personalityTraits.push('好奇心旺盛', '柔軟性がある', '前向き')
  }
  if (consistency > 70) {
    personalityTraits.push('一貫性がある', '安定している')
  } else if (consistency < 40) {
    personalityTraits.push('多様性がある', '柔軟性がある')
  }
  if (maturityTrend === 'increasing') {
    personalityTraits.push('成長志向', '向上心がある')
  }
  
  // パターン説明の生成
  let patternDescription = ''
  if (patternType === 'high_maturity') {
    patternDescription = 'あなたの回答パターンから、高い成熟度と責任感が特徴的です。計画性があり、冷静な判断力を持っています。'
  } else if (patternType === 'low_maturity') {
    patternDescription = 'あなたの回答パターンから、若々しい感性と好奇心が特徴的です。柔軟性があり、新しいことにチャレンジする意欲があります。'
  } else if (patternType === 'balanced') {
    patternDescription = 'あなたの回答パターンから、バランスの取れた性格が特徴的です。安定感と柔軟性を兼ね備えています。'
  } else {
    patternDescription = 'あなたの回答パターンから、多様な側面を持つ性格が特徴的です。状況に応じて柔軟に対応できる能力があります。'
  }
  
  return {
    patternType,
    consistency,
    maturityTrend,
    personalityTraits: personalityTraits.slice(0, 5),
    patternDescription
  }
}

// 強化されたAI分析
export async function analyzeMentalAgeEnhanced(
  answers: DiagnosisAnswers,
  onProgress?: (step: string, progress: number) => void
): Promise<import('./types').DiagnosisResult> {
  
  // ステップ1: 回答テキストの構築
  onProgress?.('回答を分析中...', 10)
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const responseTexts: string[] = []
  questions.forEach(question => {
    const answer = answers[question.id]
    if (answer && question.id !== 'age') {
      const option = question.options.find(opt => opt.id === answer)
      if (option) {
        responseTexts.push(option.text)
      }
    }
  })
  
  const combinedText = responseTexts.join(' ')
  
  // ステップ2: 日本語感情分析
  onProgress?.('AIが感情を分析中...', 30)
  await new Promise(resolve => setTimeout(resolve, 400))
  const sentimentAnalysis = analyzeJapaneseSentiment(combinedText)
  
  // ステップ3: 回答パターン分析
  onProgress?.('回答パターンを分析中...', 50)
  await new Promise(resolve => setTimeout(resolve, 400))
  const patternAnalysis = analyzeAnswerPatterns(answers)
  
  // ステップ4: 基本分析の実行
  onProgress?.('精神年齢を計算中...', 80)
  const baseResult = await analyzeMentalAge(answers)
  
  // ステップ5: 結果の統合
  onProgress?.('結果をまとめ中...', 100)
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return {
    ...baseResult,
    aiAnalysis: {
      sentimentScore: sentimentAnalysis.score,
      patternAnalysis: patternAnalysis.patternDescription,
      personalityTraits: patternAnalysis.personalityTraits,
      confidence: Math.round((patternAnalysis.consistency + sentimentAnalysis.score * 100) / 2)
    }
  }
}

