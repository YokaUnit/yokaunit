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
    
    // 回答の一貫性を分析（スコアの分散を計算）
    const scores: number[] = []
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer && question.id !== 'age') {
        const option = question.options.find(opt => opt.id === answer)
        if (option) {
          scores.push(option.score)
        }
      }
    })
    
    // スコアの分散を計算（一貫性の指標）
    const variance = scores.length > 1 
      ? scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length
      : 0
    const standardDeviation = Math.sqrt(variance)
    
    // 回答パターン分析
    const highMaturityAnswers = scores.filter(s => s >= 22).length
    const lowMaturityAnswers = scores.filter(s => s <= 12).length
    const balancedAnswers = scores.filter(s => s >= 16 && s <= 20).length
    
    // AI分析結果を組み込んだ精神年齢計算（幅広い範囲に対応）
    const realAge = answers.age || 25
    
    // スコアを年齢に変換（5-26点を0-100歳にマッピング）
    // より極端な結果も出るように、非線形マッピングを使用
    let baseAge: number
    if (averageScore <= 8) {
      // 非常に若々しい（0-5歳：赤ちゃん〜幼児）
      baseAge = averageScore * 0.6
    } else if (averageScore <= 12) {
      // 若々しい（6-15歳：小学生〜中学生）
      baseAge = 5 + (averageScore - 8) * 2.5
    } else if (averageScore <= 16) {
      // バランス（16-25歳：高校生〜大学生）
      baseAge = 15 + (averageScore - 12) * 2.5
    } else if (averageScore <= 20) {
      // 成熟（26-40歳：社会人）
      baseAge = 25 + (averageScore - 16) * 3.75
    } else if (averageScore <= 24) {
      // 非常に成熟（41-65歳：中年）
      baseAge = 40 + (averageScore - 20) * 6.25
    } else {
      // 超成熟（66-100歳以上：高齢者〜おじいちゃん）
      baseAge = 65 + (averageScore - 24) * 17.5
    }
    
    // AI感情分析結果による調整（より大きく）
    if (sentimentAnalysis.label === 'POSITIVE') {
      const positiveAdjustment = sentimentAnalysis.score > 0.8 ? -8 : sentimentAnalysis.score > 0.6 ? -5 : -3
      baseAge += positiveAdjustment
    } else if (sentimentAnalysis.label === 'NEGATIVE') {
      const negativeAdjustment = sentimentAnalysis.score > 0.8 ? 8 : sentimentAnalysis.score > 0.6 ? 5 : 3
      baseAge += negativeAdjustment
    }
    
    // 回答パターンによる調整（より大きく）
    if (standardDeviation < 2) {
      // 一貫性が非常に高い場合、平均スコアを重視
      baseAge = baseAge * 0.6 + (averageScore * 4) * 0.4
    } else if (standardDeviation < 4) {
      baseAge = baseAge * 0.8 + (averageScore * 4) * 0.2
    }
    
    // 成熟度の偏りによる調整（より大きく）
    if (highMaturityAnswers >= 4) {
      baseAge += 8 // 成熟した回答が非常に多い
    } else if (highMaturityAnswers >= 3) {
      baseAge += 5
    } else if (lowMaturityAnswers >= 4) {
      baseAge -= 8 // 若々しい回答が非常に多い
    } else if (lowMaturityAnswers >= 3) {
      baseAge -= 5
    }
    
    // バランスの取れた回答による調整（実年齢に近づけるが、制限は緩く）
    if (balancedAnswers >= 3) {
      baseAge = baseAge * 0.85 + realAge * 0.15
    }
    
    // 実年齢との関係性を考慮した最終調整（制限を緩く）
    const ageRatio = baseAge / (realAge || 25)
    if (ageRatio > 2.0) {
      // 実年齢の2倍以上の場合、少し調整
      baseAge = baseAge * 0.9
    } else if (ageRatio < 0.3) {
      // 実年齢の30%以下の場合、少し調整
      baseAge = baseAge * 1.1
    }
    
    // 0-100歳以上の範囲に制限（上限は緩く）
    const mentalAge = Math.round(Math.max(0, Math.min(105, baseAge)))
    
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

// 精神年齢タイプの動的生成（幅広い年齢層に対応）
function generateMentalAgeType(mentalAge: number, realAge: number, ageDifference: number, averageScore: number): { type: string; description: string; characteristics: string[] } {
  
  // 精神年齢による分類（より細かく）
  let ageCategory: string
  let typeName: string
  let description: string
  let characteristics: string[]

  if (mentalAge <= 3) {
    // 0-3歳：赤ちゃん
    ageCategory = 'baby'
    typeName = ['赤ちゃん', 'ベビー', '新生児', '乳児'][mentalAge % 4] + 'タイプ'
    description = `実年齢${realAge}歳なのに精神年齢${mentalAge}歳！あなたの心はまるで赤ちゃんのように純粋で無邪気です。何も考えずに今を楽しむ、そんな素直な心の持ち主です。`
    characteristics = ['純粋無垢', '無邪気', '好奇心旺盛']
  } else if (mentalAge <= 7) {
    // 4-7歳：幼児
    ageCategory = 'toddler'
    typeName = ['幼児', 'キッズ', '子ども', 'チャイルド'][Math.floor(mentalAge) % 4] + 'タイプ'
    description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若い心を持っています。遊ぶことが大好きで、毎日が新しい発見の連続！そんなワクワクする心の持ち主です。`
    characteristics = ['遊び好き', '天真爛漫', '明るい']
  } else if (mentalAge <= 12) {
    // 8-12歳：小学生
    ageCategory = 'elementary'
    typeName = ['小学生', 'スクール', 'ジュニア', 'キッズ'][Math.floor(mentalAge / 2) % 4] + 'タイプ'
    description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。友達と遊ぶのが大好きで、新しいことを学ぶのが楽しい！そんな好奇心旺盛な心の持ち主です。`
    characteristics = ['好奇心旺盛', 'フレッシュ', 'エネルギッシュ']
  } else if (mentalAge <= 15) {
    // 13-15歳：中学生
    ageCategory = 'junior_high'
    typeName = ['中学生', 'ティーン', 'ヤング', 'ジュニア'][Math.floor(mentalAge / 2) % 4] + 'タイプ'
    description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若い心です。まだまだ成長途中で、いろんなことに興味津々！そんな若々しい心の持ち主です。`
    characteristics = ['若々しい', '成長中', 'フレッシュ']
  } else if (mentalAge <= 18) {
    // 16-18歳：高校生
    ageCategory = 'high_school'
    typeName = ['高校生', 'ティーンエイジャー', 'ヤング', 'フレッシュ'][Math.floor(mentalAge / 2) % 4] + 'タイプ'
    description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。青春真っ只中で、何でもチャレンジしてみたい！そんな前向きな心の持ち主です。`
    characteristics = ['前向き', 'チャレンジ精神', '若々しい']
  } else if (mentalAge <= 22) {
    // 19-22歳：大学生
    ageCategory = 'college'
    typeName = ['大学生', 'ヤングアダルト', 'フレッシュ', 'ニュー'][Math.floor(mentalAge / 2) % 4] + 'タイプ'
    description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若い心です。新しいことに挑戦するのが大好きで、未来への希望に満ちています！そんなエネルギッシュな心の持ち主です。`
    characteristics = ['エネルギッシュ', 'チャレンジ精神', '希望に満ちている']
  } else if (mentalAge <= 30) {
    // 23-30歳：若手社会人
    ageCategory = 'young_adult'
    const names = ['若手', 'ヤング', 'フレッシュ', 'ニュー']
    typeName = names[Math.floor(mentalAge / 2) % 4] + ['アダルト', 'プロ', 'ソサエティ', 'ワーカー'][Math.floor(mentalAge / 3) % 4] + 'タイプ'
    if (ageDifference >= 5) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も成熟した心です。同世代より大人びた考え方で、周囲から頼られる存在です。`
      characteristics = ['成熟', '責任感', '信頼性']
    } else if (ageDifference <= -5) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことにチャレンジする意欲に満ちています！`
      characteristics = ['若々しい', 'チャレンジ精神', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。年相応の自然な魅力を持っています。`
      characteristics = ['バランス', '適応力', '柔軟性']
    }
  } else if (mentalAge <= 40) {
    // 31-40歳：社会人
    ageCategory = 'adult'
    const names = ['アダルト', 'マチュア', 'ステディ', 'ソリッド']
    typeName = names[Math.floor(mentalAge / 3) % 4] + ['タイプ', 'スタイル', 'マインド', 'パーソナ'][Math.floor(mentalAge / 4) % 4]
    if (ageDifference >= 10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も大人びた心です。深い洞察力と豊富な経験で、周囲から信頼される存在です。`
      characteristics = ['深い洞察力', '経験豊富', '信頼性']
    } else if (ageDifference <= -10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、エネルギッシュな心の持ち主です！`
      characteristics = ['若々しい', 'エネルギッシュ', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。安定感と柔軟性を兼ね備えています。`
      characteristics = ['安定感', '柔軟性', 'バランス']
    }
  } else if (mentalAge <= 50) {
    // 41-50歳：中年
    ageCategory = 'middle_age'
    const names = ['ミドル', 'マチュア', 'エキスパート', 'ベテラン']
    typeName = names[Math.floor(mentalAge / 3) % 4] + ['タイプ', 'スタイル', 'マインド', 'パーソナ'][Math.floor(mentalAge / 4) % 4]
    if (ageDifference >= 10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も成熟した心です。豊富な人生経験と深い知恵で、周囲の良き相談相手です。`
      characteristics = ['豊富な経験', '深い知恵', '包容力']
    } else if (ageDifference <= -10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`
      characteristics = ['若々しい', 'チャレンジ精神', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。安定感と経験を兼ね備えています。`
      characteristics = ['安定感', '経験', 'バランス']
    }
  } else if (mentalAge <= 65) {
    // 51-65歳：シニア
    ageCategory = 'senior'
    const names = ['シニア', 'ベテラン', 'マスター', 'エキスパート']
    typeName = names[Math.floor(mentalAge / 4) % 4] + ['タイプ', 'スタイル', 'マインド', 'パーソナ'][Math.floor(mentalAge / 5) % 4]
    if (ageDifference >= 10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も成熟した心です。人生の達人として、深い洞察力と豊富な経験で周囲を導く存在です。`
      characteristics = ['人生の達人', '深い洞察力', '豊富な経験']
    } else if (ageDifference <= -10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`
      characteristics = ['若々しい', 'チャレンジ精神', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。経験と若々しさを兼ね備えています。`
      characteristics = ['経験豊富', 'バランス', '安定感']
    }
  } else if (mentalAge <= 80) {
    // 66-80歳：高齢者
    ageCategory = 'elderly'
    const names = ['エルダー', 'ベテラン', 'マスター', 'ウィズダム']
    typeName = names[Math.floor(mentalAge / 5) % 4] + ['タイプ', 'スタイル', 'マインド', 'パーソナ'][Math.floor(mentalAge / 6) % 4]
    if (ageDifference >= 10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も成熟した心です。人生の大先輩として、深い知恵と豊富な経験で周囲に尊敬される存在です。`
      characteristics = ['人生の大先輩', '深い知恵', '豊富な経験']
    } else if (ageDifference <= -10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`
      characteristics = ['若々しい', 'チャレンジ精神', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。経験と若々しさを兼ね備えています。`
      characteristics = ['経験豊富', 'バランス', '安定感']
    }
  } else {
    // 81-100歳以上：おじいちゃん・おばあちゃん
    ageCategory = 'grandparent'
    const names = ['おじいちゃん', 'おばあちゃん', 'グランドマスター', 'レジェンド']
    typeName = names[Math.floor(mentalAge / 6) % 4] + ['タイプ', 'スタイル', 'マインド', 'パーソナ'][Math.floor(mentalAge / 7) % 4]
    if (ageDifference >= 10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も成熟した心です。人生のレジェンドとして、深い知恵と豊富な経験で周囲に尊敬される存在です。`
      characteristics = ['人生のレジェンド', '深い知恵', '豊富な経験']
    } else if (ageDifference <= -10) {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢${realAge}歳より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`
      characteristics = ['若々しい', 'チャレンジ精神', 'フレッシュ']
    } else {
      description = `精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。経験と若々しさを兼ね備えています。`
      characteristics = ['経験豊富', 'バランス', '安定感']
    }
  }

  return { type: typeName, description, characteristics }
}

// AI駆動のアドバイス生成（年齢層に応じた面白いアドバイス）
function generateAdvice(mentalAge: number, realAge: number, ageDifference: number, averageScore: number, sentimentAnalysis: any): string {
  const adviceComponents = []

  // 精神年齢に応じたアドバイス
  if (mentalAge <= 3) {
    adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、まるで赤ちゃんのように純粋で無邪気！何も考えずに今を楽しむ、そんな素直な心を大切にしてください。`)
    adviceComponents.push(`この若々しい心は、周囲の人を明るくする大きな魅力です。素直さと好奇心を忘れずに、毎日を楽しんでください。`)
  } else if (mentalAge <= 7) {
    adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、遊ぶことが大好きな心の持ち主！新しい発見を楽しみながら、毎日をワクワク過ごしてください。`)
    adviceComponents.push(`この天真爛漫な心は、周囲の人を笑顔にする力があります。好奇心を大切に、いろんなことにチャレンジしてみてください。`)
  } else if (mentalAge <= 12) {
    adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、友達と遊ぶのが大好きな心の持ち主！新しいことを学ぶのが楽しくて仕方ない、そんな好奇心旺盛な心を大切にしてください。`)
    adviceComponents.push(`このフレッシュな心は、周囲の人にエネルギーを与えます。いろんなことに興味を持って、たくさんの経験を積んでください。`)
  } else if (mentalAge <= 18) {
    adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、青春真っ只中の心の持ち主！何でもチャレンジしてみたい、そんな前向きな心を大切にしてください。`)
    adviceComponents.push(`この若々しいエネルギーは、周囲の人を元気にする力があります。失敗を恐れず、どんどん新しいことに挑戦してください。`)
  } else if (mentalAge <= 30) {
    if (ageDifference >= 10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も成熟した心です。この大人びた考え方を活かして、周囲の人たちの良き相談相手になってください。`)
    } else if (ageDifference <= -10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も若々しい心です。このフレッシュな感性を活かして、新しいことにどんどん挑戦してください。`)
    } else {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。この自然体の魅力を大切に、さらなる成長を楽しんでください。`)
    }
    adviceComponents.push(`この精神年齢を活かして、${mentalAge < realAge ? '新しい趣味や学習' : '人生経験の共有や指導'}に取り組んでみてください。`)
  } else if (mentalAge <= 50) {
    if (ageDifference >= 10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も成熟した心です。豊富な人生経験と深い知恵で、周囲の人たちを導く存在になってください。`)
    } else if (ageDifference <= -10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`)
    } else {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。安定感と経験を兼ね備えた、魅力的な人格です。`)
    }
    adviceComponents.push(`この精神年齢を活かして、${mentalAge < realAge ? '新しい趣味や学習に挑戦' : '人生経験を若い世代に伝える'}ことをおすすめします。`)
  } else if (mentalAge <= 80) {
    if (ageDifference >= 10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も成熟した心です。人生の達人として、深い洞察力と豊富な経験で周囲に尊敬される存在です。`)
    } else if (ageDifference <= -10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`)
    } else {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。経験と若々しさを兼ね備えた、魅力的な人格です。`)
    }
    adviceComponents.push(`この精神年齢を活かして、${mentalAge < realAge ? '新しい趣味や学習に挑戦' : '人生の知恵を若い世代に伝える'}ことをおすすめします。`)
  } else {
    if (ageDifference >= 10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も成熟した心です。人生のレジェンドとして、深い知恵と豊富な経験で周囲に尊敬される存在です。`)
    } else if (ageDifference <= -10) {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢より${Math.abs(ageDifference)}歳も若々しい心です。まだまだ若々しく、新しいことに挑戦する意欲に満ちています！`)
    } else {
      adviceComponents.push(`精神年齢${mentalAge}歳のあなたは、実年齢とバランスの取れた心です。経験と若々しさを兼ね備えた、魅力的な人格です。`)
    }
    adviceComponents.push(`この精神年齢を活かして、${mentalAge < realAge ? '新しい趣味や学習に挑戦' : '人生の知恵を若い世代に伝える'}ことをおすすめします。`)
  }

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
