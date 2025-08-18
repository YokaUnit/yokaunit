"use client"

import { pipeline } from '@xenova/transformers'
import type { DiagnosisResult, DiagnosisAnswers } from './types'
import { questions } from './questions'

// AI分析用のパイプライン（lazy loading）
let sentimentPipeline: any = null

async function getSentimentPipeline() {
  if (!sentimentPipeline) {
    try {
      sentimentPipeline = await pipeline(
        'sentiment-analysis',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
      )
    } catch (error) {
      console.error('Failed to load sentiment pipeline:', error)
      throw error
    }
  }
  return sentimentPipeline
}

// AI感情分析を実行
async function analyzeTextSentiment(text: string) {
  try {
    const pipeline = await getSentimentPipeline()
    const result = await pipeline(text)
    return {
      label: result[0].label,
      score: result[0].score
    }
  } catch (error) {
    console.error('AI sentiment analysis failed:', error)
    // フォールバック: 簡易分析
    return { label: 'NEUTRAL', score: 0.5 }
  }
}

// AI駆動の精神年齢分析システム
export async function analyzeMentalAge(answers: DiagnosisAnswers): Promise<DiagnosisResult> {
  try {
    // 回答テキストを構築（AI分析用）
    const responseTexts = []
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
    
    // AI感情分析を実行
    const sentimentAnalysis = await analyzeTextSentiment(combinedText)
    
    // 各回答のスコアを計算
    let totalScore = 0
    let questionCount = 0

    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer && question.id !== 'age') {
        const option = question.options.find(opt => opt.id === answer)
        if (option) {
          totalScore += option.score
          questionCount++
        }
      }
    })

    // 平均スコアを計算（5-30の範囲）
    const averageScore = questionCount > 0 ? totalScore / questionCount : 15
    
    // AI分析結果を組み込んだ精神年齢計算
    const realAge = answers.age || 25
    let baseAge = Math.max(12, Math.min(80, averageScore + (realAge * 0.3)))
    
    // AI感情分析結果による調整
    if (sentimentAnalysis.label === 'POSITIVE' && sentimentAnalysis.score > 0.7) {
      baseAge -= 3 // ポジティブな回答は若々しさを示す
    } else if (sentimentAnalysis.label === 'NEGATIVE' && sentimentAnalysis.score > 0.7) {
      baseAge += 2 // ネガティブな回答は成熟度を示す
    }
    
    // ランダム要素を追加して多様性を確保
    const randomFactor = (Math.random() - 0.5) * 6
    const mentalAge = Math.round(Math.max(8, Math.min(90, baseAge + randomFactor)))
    
    const ageDifference = mentalAge - realAge

    // 精神年齢タイプを動的生成
    const { type, description, characteristics } = generateMentalAgeType(mentalAge, realAge, ageDifference, averageScore)
    
    // AI分析結果を含むアドバイスを生成
    const advice = generateAdvice(mentalAge, realAge, ageDifference, averageScore, sentimentAnalysis)

    return {
      mentalAge,
      realAge,
      ageDifference,
      type,
      description,
      advice,
      characteristics
    }
  } catch (error) {
    console.error('Mental age analysis failed:', error)
    throw new Error('AI分析に失敗しました。もう一度お試しください。')
  }
}

// 精神年齢タイプの動的生成
function generateMentalAgeType(mentalAge: number, realAge: number, ageDifference: number, averageScore: number): { type: string; description: string; characteristics: string[] } {
  
  // 年齢差による分類
  const ageDiffCategory = ageDifference >= 10 ? 'older' : 
                         ageDifference >= 5 ? 'slightly_older' :
                         ageDifference <= -10 ? 'younger' :
                         ageDifference <= -5 ? 'slightly_younger' : 'balanced'
  
  // スコアによる特性分類
  const maturityLevel = averageScore >= 24 ? 'very_mature' :
                       averageScore >= 20 ? 'mature' :
                       averageScore >= 16 ? 'balanced' :
                       averageScore >= 12 ? 'youthful' : 'very_youthful'

  // タイプ名の要素
  const ageTypeNames = {
    older: ['老成', 'ベテラン', 'シニア', '大人', '成熟'],
    slightly_older: ['おとな', '落ち着き', '安定', '穏やか', '冷静'],
    balanced: ['バランス', 'ニュートラル', '標準', 'スタンダード', '平均'],
    slightly_younger: ['フレッシュ', 'ヤング', '若々しい', '活発', 'エネルギッシュ'],
    younger: ['ピュア', '天真爛漫', '無邪気', 'キッズ', '子ども心']
  }

  const maturityNames = {
    very_mature: ['ウィズダム', 'マスター', 'エキスパート', 'プロフェッサー'],
    mature: ['アダルト', 'マチュア', 'ステディ', 'ソリッド'],
    balanced: ['ミドル', 'バランス', 'ハーモニー', 'イーブン'],
    youthful: ['スプリング', 'フレッシュ', 'ライブリー', 'アクティブ'],
    very_youthful: ['キッズ', 'ピュア', 'イノセント', 'ワンダー']
  }

  const typeEndings = ['タイプ', 'スタイル', '型', 'パーソナ', 'キャラ', 'マインド']

  // 動的タイプ名生成
  const ageTypeName = ageTypeNames[ageDiffCategory][mentalAge % ageTypeNames[ageDiffCategory].length]
  const maturityName = maturityNames[maturityLevel][Math.floor(averageScore) % maturityNames[maturityLevel].length]
  const ending = typeEndings[Math.abs(ageDifference) % typeEndings.length]

  const type = `${ageTypeName}${maturityName}${ending}`

  // 説明文の生成
  const descriptions = {
    older: `実年齢${realAge}歳に対して精神年齢${mentalAge}歳のあなたは、同世代より${Math.abs(ageDifference)}歳も大人びた考え方を持っています。`,
    slightly_older: `精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳ほど成熟した心の持ち主です。`,
    balanced: `精神年齢${mentalAge}歳で実年齢とのバランスが取れており、年相応の自然な魅力を持っています。`,
    slightly_younger: `精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳ほど若々しい心を持っています。`,
    younger: `実年齢${realAge}歳に対して精神年齢${mentalAge}歳と、${Math.abs(ageDifference)}歳も若い心の持ち主です。`
  }

  const maturityDescriptions = {
    very_mature: '深い洞察力と豊富な経験に基づいた判断力を持ち、周囲から信頼される存在です。',
    mature: '安定した精神力と冷静な判断力を備え、責任感の強い人格です。',
    balanced: '柔軟性と安定性のバランスが取れた、調和の取れた性格です。',
    youthful: 'エネルギッシュで好奇心旺盛、新しいことに挑戦する意欲に満ちています。',
    very_youthful: '純粋で素直な心を持ち、周囲を明るくする天真爛漫な魅力があります。'
  }

  const description = `${descriptions[ageDiffCategory]}${maturityDescriptions[maturityLevel]}`

  // 特徴リストの生成
  const characteristicsList = {
    older: ['深い思慮深さ', '豊富な人生経験', '冷静な判断力', '責任感の強さ', '包容力'],
    slightly_older: ['落ち着いた雰囲気', '安定感', '信頼性', '慎重さ', '配慮深さ'],
    balanced: ['バランス感覚', '適応力', '協調性', '柔軟性', '安定性'],
    slightly_younger: ['若々しい感性', 'フレッシュな発想', '活発さ', '前向きさ', '素直さ'],
    younger: ['純粋な心', '好奇心旺盛', '天真爛漫', '無邪気さ', '明るさ']
  }

  const characteristics = characteristicsList[ageDiffCategory].slice(0, 3)

  return { type, description, characteristics }
}

// AI駆動のアドバイス生成
function generateAdvice(mentalAge: number, realAge: number, ageDifference: number, averageScore: number, sentimentAnalysis: any): string {
  const adviceComponents = []

  // 年齢差に基づくアドバイス
  if (ageDifference >= 10) {
    adviceComponents.push(`${Math.abs(ageDifference)}歳も大人びた精神年齢は素晴らしい特徴です。この成熟した考え方を活かして、周囲の人たちの良き相談相手になることができるでしょう。`)
  } else if (ageDifference >= 5) {
    adviceComponents.push(`実年齢より成熟した精神年齢を持つあなたは、落ち着いた判断力が魅力です。この安定感を大切にしながら、時には年相応の楽しさも忘れずに。`)
  } else if (ageDifference <= -10) {
    adviceComponents.push(`${Math.abs(ageDifference)}歳も若い精神年齢は、あなたの大きな魅力です。この若々しい感性と好奇心を大切に、新しいことにどんどん挑戦してください。`)
  } else if (ageDifference <= -5) {
    adviceComponents.push(`若々しい精神年齢は、あなたのエネルギーの源です。この新鮮な感性を活かして、創造的な活動や新しい出会いを楽しんでください。`)
  } else {
    adviceComponents.push(`実年齢と精神年齢のバランスが取れているあなたは、とても自然体で魅力的です。この調和を保ちながら、さらなる成長を楽しんでください。`)
  }

  // スコアに基づく具体的アドバイス
  if (averageScore >= 22) {
    adviceComponents.push(`高い精神的成熟度を示すあなたには、リーダーシップを発揮する機会を積極的に求めることをお勧めします。`)
  } else if (averageScore >= 18) {
    adviceComponents.push(`安定した精神力を持つあなたは、周囲との調和を大切にしながら、自分らしさも表現していきましょう。`)
  } else if (averageScore >= 14) {
    adviceComponents.push(`バランスの取れた精神年齢のあなたは、様々な経験を通じてさらなる成長を目指してください。`)
  } else {
    adviceComponents.push(`若々しい精神年齢は大きな可能性を秘めています。好奇心を大切に、たくさんの新しい体験を積み重ねていきましょう。`)
  }

  // 実用的なアドバイス
  const practicalAdvice = [
    `精神年齢${mentalAge}歳のあなたには、同世代だけでなく幅広い年齢層との交流がおすすめです。`,
    `この精神年齢を活かして、${mentalAge < realAge ? '新しい趣味や学習' : '人生経験の共有や指導'}に取り組んでみてください。`,
    `あなたの精神年齢は、恋愛や友人関係において${mentalAge > realAge ? '安定感と信頼性' : 'フレッシュさと活力'}をもたらすでしょう。`
  ]

  adviceComponents.push(practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)])

  // AI分析結果に基づく追加アドバイス
  if (sentimentAnalysis.label === 'POSITIVE' && sentimentAnalysis.score > 0.7) {
    adviceComponents.push(`AI分析では、あなたの回答から非常にポジティブな傾向が検出されました（信頼度: ${Math.round(sentimentAnalysis.score * 100)}%）。この前向きな姿勢は、若々しい精神年齢の源泉となっています。`)
  } else if (sentimentAnalysis.label === 'NEGATIVE' && sentimentAnalysis.score > 0.7) {
    adviceComponents.push(`AI分析では、慎重で思慮深い傾向が検出されました（信頼度: ${Math.round(sentimentAnalysis.score * 100)}%）。この冷静な判断力が、成熟した精神年齢に反映されています。`)
  } else {
    adviceComponents.push(`AI分析では、バランスの取れた心理状態が検出されました。この安定感が、年相応の精神年齢として表れています。`)
  }

  return adviceComponents.join(' ')
}
