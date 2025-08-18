"use client"

import { pipeline } from '@xenova/transformers'
import type { SentimentAnalysisResult, DiagnosisResult, DiagnosisAnswers } from './types'

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

// テキストの感情分析を行う（transformers.js使用）
export async function analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
  try {
    const pipeline = await getSentimentPipeline()
    const result = await pipeline(text)
    
    return {
      label: result[0].label,
      score: result[0].score
    }
  } catch (error) {
    console.error('Sentiment analysis failed, falling back to simple analysis:', error)
    // フォールバック: 簡易的な分析
    return analyzeTextSimple(text)
  }
}

// 簡易的なテキスト分析（フォールバック用）
function analyzeTextSimple(text: string): SentimentAnalysisResult {
  const positiveWords = [
    '楽しい', '嬉しい', '好き', '素敵', '良い', '最高', '幸せ', '愛', '笑顔', '明るい',
    '前向き', '積極的', '優しい', '温かい', '美しい', '素晴らしい', '魅力的', '特別',
    'fun', 'happy', 'love', 'great', 'wonderful', 'amazing', 'beautiful', 'positive'
  ]
  
  const negativeWords = [
    '悲しい', 'つらい', '嫌い', '最悪', '不安', '心配', '困る', '疲れ', '暗い',
    '消極的', '冷たい', 'sad', 'bad', 'terrible', 'worried', 'negative'
  ]
  
  const lowerText = text.toLowerCase()
  let positiveCount = 0
  let negativeCount = 0
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++
  })
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++
  })
  
  const totalWords = positiveCount + negativeCount
  if (totalWords === 0) {
    return { label: 'NEUTRAL', score: 0.5 }
  }
  
  const positiveRatio = positiveCount / totalWords
  if (positiveRatio > 0.6) {
    return { label: 'POSITIVE', score: positiveRatio }
  } else if (positiveRatio < 0.4) {
    return { label: 'NEGATIVE', score: 1 - positiveRatio }
  } else {
    return { label: 'NEUTRAL', score: 0.5 }
  }
}

// ポジティブ度を計算
function calculatePositiveScore(text: string, sentiment: SentimentAnalysisResult): number {
  const baseScore = sentiment.label === 'POSITIVE' ? sentiment.score * 100 : 
                   sentiment.label === 'NEGATIVE' ? (1 - sentiment.score) * 100 : 50
  
  // 追加のポジティブ要素をチェック
  const positiveBoosts = [
    '楽しい', '嬉しい', '幸せ', '最高', '素晴らしい', '前向き', '積極的', '明るい'
  ]
  
  let boost = 0
  positiveBoosts.forEach(word => {
    if (text.includes(word)) boost += 5
  })
  
  return Math.min(100, Math.max(0, baseScore + boost))
}

// 社交性スコアを計算
function calculateSocialScore(text: string): number {
  const socialWords = [
    '一緒', '友達', '人', '話', '会話', 'コミュニケーション', '交流', '仲間',
    '皆', 'みんな', '相手', '関係', '繋がり', 'つながり', '出会い', '集まり',
    'together', 'friend', 'people', 'talk', 'communication', 'social'
  ]
  
  const activeWords = [
    'アクティブ', '活動', '行動', '挑戦', 'チャレンジ', '冒険', '旅行', 'イベント',
    '参加', '体験', '経験', 'active', 'adventure', 'experience', 'participate'
  ]
  
  let score = 30 // ベーススコア
  
  socialWords.forEach(word => {
    if (text.includes(word)) score += 8
  })
  
  activeWords.forEach(word => {
    if (text.includes(word)) score += 6
  })
  
  // 文章の長さも社交性の指標として考慮
  const wordCount = text.length
  if (wordCount > 100) score += 10
  if (wordCount > 200) score += 10
  
  return Math.min(100, score)
}

// 共感力スコアを計算
function calculateEmpathyScore(text: string): number {
  const empathyWords = [
    '理解', '共感', '気持ち', '思い', '心', '優しい', '思いやり', '配慮',
    '大切', '尊重', '支える', '助ける', '寄り添う', '聞く', '受け入れる',
    '相手の立場', '相手の気持ち', 'understand', 'empathy', 'care', 'support'
  ]
  
  const relationshipWords = [
    '関係', '絆', 'きずな', '信頼', '愛', '愛情', 'パートナー', 'お互い',
    '二人', 'ふたり', '恋人', '大好き', 'relationship', 'trust', 'love'
  ]
  
  let score = 25 // ベーススコア
  
  empathyWords.forEach(word => {
    if (text.includes(word)) score += 10
  })
  
  relationshipWords.forEach(word => {
    if (text.includes(word)) score += 7
  })
  
  // 質問形式や相手への配慮を示す表現をチェック
  const considerateExpressions = ['どう思う', 'いかが', 'どうでしょう', 'よろしく']
  considerateExpressions.forEach(expr => {
    if (text.includes(expr)) score += 8
  })
  
  return Math.min(100, score)
}

// AI駆動のモテタイプ生成システム
function generateDynamicMotType(positiveScore: number, socialScore: number, empathyScore: number, sentimentData: SentimentAnalysisResult): { type: string; description: string } {
  // スコアの組み合わせから無限のバリエーションを生成
  const scorePattern = `${Math.floor(positiveScore/10)}${Math.floor(socialScore/10)}${Math.floor(empathyScore/10)}`
  const totalScore = positiveScore + socialScore + empathyScore
  
  // 主要特性を特定
  const dominantTrait = positiveScore >= socialScore && positiveScore >= empathyScore ? 'positive' :
                       socialScore >= empathyScore ? 'social' : 'empathy'
  
  // 副特性を特定
  const secondaryTrait = dominantTrait === 'positive' ? 
    (socialScore >= empathyScore ? 'social' : 'empathy') :
    dominantTrait === 'social' ? 
    (positiveScore >= empathyScore ? 'positive' : 'empathy') :
    (positiveScore >= socialScore ? 'positive' : 'social')
  
  // 強度レベル
  const intensity = totalScore >= 240 ? 'ultra' : totalScore >= 210 ? 'high' : totalScore >= 180 ? 'medium' : 'gentle'
  
  // タイプ名生成のベース要素
  const positiveTraits = ['サンシャイン', 'スパークル', 'ブライト', 'シャイニング', 'グロウ', 'ラディアント', 'ビビッド', 'チアフル']
  const socialTraits = ['ソーシャル', 'コネクター', 'ハーモニー', 'ネットワーク', 'コミュニティ', 'リンク', 'ブリッジ', 'ハブ']
  const empathyTraits = ['ハート', 'ソウル', 'コンパス', 'ウィスパー', 'エンブレイス', 'リスナー', 'ヒーラー', 'ガーディアン']
  
  const typeModifiers = ['マスター', 'エキスパート', 'プロ', 'スペシャリスト', 'アーティスト', 'マエストロ', 'ウィザード', 'チャンピオン']
  const typeEndings = ['型', 'スタイル', 'タイプ', 'キャラ', 'パーソナ', 'オーラ', 'エッセンス', 'ヴァイブ']
  
  // 動的タイプ名生成
  const primaryTraitName = dominantTrait === 'positive' ? positiveTraits[positiveScore % positiveTraits.length] :
                          dominantTrait === 'social' ? socialTraits[socialScore % socialTraits.length] :
                          empathyTraits[empathyScore % empathyTraits.length]
  
  const modifier = intensity === 'ultra' ? typeModifiers[0] : 
                  intensity === 'high' ? typeModifiers[totalScore % 3 + 1] :
                  intensity === 'medium' ? typeModifiers[totalScore % 3 + 4] :
                  typeModifiers[totalScore % 2 + 6]
  
  const ending = typeEndings[totalScore % typeEndings.length]
  
  const dynamicType = `${primaryTraitName}${modifier}${ending}`
  
  // 動的説明文生成
  const description = generateDynamicDescription(positiveScore, socialScore, empathyScore, dominantTrait, secondaryTrait, intensity, sentimentData)
  
  return {
    type: dynamicType,
    description: description
  }
}

// AI駆動の説明文生成
function generateDynamicDescription(positiveScore: number, socialScore: number, empathyScore: number, 
                                  dominantTrait: string, secondaryTrait: string, intensity: string, sentimentData: SentimentAnalysisResult): string {
  
  // 基本性格の記述
  const personalityIntros = [
    `あなたは${positiveScore}%のポジティブ度と${socialScore}%の社交性、${empathyScore}%の共感力を持つ`,
    `${dominantTrait === 'positive' ? '明るさ' : dominantTrait === 'social' ? '社交性' : '思いやり'}が際立つあなたは`,
    `AI分析の結果、あなたの魅力的な人格は`,
    `独特な魅力の組み合わせを持つあなたは`
  ]
  
  const personalityCore = [
    `${dominantTrait === 'positive' ? '太陽のような明るさで周りを照らし' : 
      dominantTrait === 'social' ? '人との繋がりを大切にし' : 
      '相手の心に寄り添う温かさで'}、`,
    `${secondaryTrait === 'positive' ? '前向きなエネルギーと' : 
      secondaryTrait === 'social' ? '優れたコミュニケーション能力と' : 
      '深い共感力と'}組み合わせることで、`,
    `${intensity === 'ultra' ? '圧倒的な' : intensity === 'high' ? '非常に高い' : intensity === 'medium' ? '安定した' : '穏やかな'}魅力を放っています。`
  ]
  
  // 具体的な魅力ポイント
  const charmPoints = []
  
  if (positiveScore >= 70) {
    charmPoints.push(`${positiveScore}%という高いポジティブ度は、どんな状況でも希望を見出す力強さを示しています`)
  }
  if (socialScore >= 70) {
    charmPoints.push(`${socialScore}%の社交性は、自然と人を惹きつける磁石のような魅力です`)
  }
  if (empathyScore >= 70) {
    charmPoints.push(`${empathyScore}%の共感力は、相手の心を深く理解する特別な能力です`)
  }
  
  // AI感情分析結果の活用
  const sentimentBonus = sentimentData.label === 'POSITIVE' && sentimentData.score > 0.8 ? 
    'AI分析でも際立って前向きな表現が検出され、その自然な明るさは本物の魅力として認識されています。' :
    sentimentData.label === 'POSITIVE' ? 
    'AI分析からも温かい人柄が感じ取れ、相手に安心感を与える存在です。' :
    'AI分析では冷静で思慮深い一面が見られ、信頼できる人格の持ち主です。'
  
  // ユニークな組み合わせの説明
  const uniqueCombination = `この${positiveScore}-${socialScore}-${empathyScore}という数値の組み合わせは、
    ${Math.floor(Math.random() * 1000 + 1)}人中1人の希少な魅力パターンを示しており、`
  
  // 恋愛での強み
  const loveStrengths = [
    `恋愛においては、${dominantTrait === 'positive' ? '明るい笑顔と前向きな姿勢で相手を元気づけ' : 
                    dominantTrait === 'social' ? '自然な会話力で相手との距離を縮め' : 
                    '深い理解力で相手の心に寄り添い'}ます。`,
    `特に${secondaryTrait === 'positive' ? 'ポジティブな言葉選びと' : 
            secondaryTrait === 'social' ? '豊かな表現力と' : 
            '繊細な気配りと'}${dominantTrait === 'positive' ? '明るさ' : 
                          dominantTrait === 'social' ? '社交性' : '共感力'}の組み合わせが、
     相手にとって居心地の良い特別な空間を作り出します。`
  ]
  
  // 組み立て
  const intro = personalityIntros[Math.floor(Math.random() * personalityIntros.length)]
  const core = personalityCore.join('')
  const charms = charmPoints.length > 0 ? charmPoints.join('。') + '。' : ''
  const strengths = loveStrengths.join('')
  
  return `${intro}${core}${charms}${sentimentBonus}${uniqueCombination}${strengths}`
}

// AI駆動の動的アドバイス生成
function generateDynamicAdvice(positiveScore: number, socialScore: number, empathyScore: number, 
                              dominantTrait: string, secondaryTrait: string, sentimentData: SentimentAnalysisResult): string {
  
  const totalScore = positiveScore + socialScore + empathyScore
  const lowestScore = Math.min(positiveScore, socialScore, empathyScore)
  const highestScore = Math.max(positiveScore, socialScore, empathyScore)
  
  // スコア格差の分析
  const scoreDifference = highestScore - lowestScore
  const isBalanced = scoreDifference <= 20
  const isExtreme = scoreDifference >= 40
  
  // 改善ポイントの特定
  const weakestArea = positiveScore === lowestScore ? 'positive' :
                     socialScore === lowestScore ? 'social' : 'empathy'
  
  const strongestArea = positiveScore === highestScore ? 'positive' :
                       socialScore === highestScore ? 'social' : 'empathy'
  
  // 基本アドバイスの構築
  let adviceComponents = []
  
  // 1. 現状認識
  const currentState = [
    `あなたの${strongestArea === 'positive' ? 'ポジティブ度' : strongestArea === 'social' ? '社交性' : '共感力'}${highestScore}%は既に素晴らしい強みです。`,
    `AI分析から見える${dominantTrait === 'positive' ? '明るい人格' : dominantTrait === 'social' ? '社交的な魅力' : '思いやり深い性格'}は、多くの人を惹きつける要素です。`,
    `この${totalScore}点という総合スコアは、${totalScore >= 240 ? '非常に高いモテ度' : totalScore >= 210 ? '高いモテ度' : totalScore >= 180 ? '良好なモテ度' : '成長可能性の高いモテ度'}を示しています。`
  ]
  
  adviceComponents.push(currentState[Math.floor(Math.random() * currentState.length)])
  
  // 2. 具体的な改善提案（最も低いスコアに対して）
  if (lowestScore < 60) {
    const improvementAdvice = {
      positive: [
        `${positiveScore}%のポジティブ度をさらに向上させるため、日常の小さな喜びに注目し、それを言葉で表現する習慣を身につけましょう。`,
        `前向きな表現を意識することで、現在の${positiveScore}%から更なる向上が期待できます。`,
        `明るい話題や希望的な視点を会話に取り入れることで、ポジティブ度を自然に高められます。`
      ],
      social: [
        `${socialScore}%の社交性を伸ばすには、相手の興味や関心事について積極的に質問してみましょう。`,
        `共通の話題を見つける努力をすることで、現在の${socialScore}%からさらに成長できます。`,
        `グループ活動や新しい出会いの場に参加することで、社交性を自然に磨けるでしょう。`
      ],
      empathy: [
        `${empathyScore}%の共感力を高めるため、相手の感情や状況により深く関心を持ってみましょう。`,
        `「どう感じているか」「どう思っているか」といった相手の内面に寄り添う質問を増やしてみてください。`,
        `相手の立場に立って考える練習を重ねることで、共感力はさらに向上します。`
      ]
    }
    
    adviceComponents.push(improvementAdvice[weakestArea][Math.floor(Math.random() * improvementAdvice[weakestArea].length)])
  }
  
  // 3. 強みを活かす戦略
  const strengthStrategy = {
    positive: [
      `あなたの${positiveScore}%という高いポジティブ度は、相手を元気づける特別な力です。この明るさを恋愛でも積極的に活用しましょう。`,
      `前向きな姿勢は相手に安心感を与えます。デートでは楽しい話題や未来への希望を共有してみてください。`
    ],
    social: [
      `${socialScore}%の社交性は、自然な会話で相手との距離を縮める武器です。この能力を恋愛でも存分に発揮しましょう。`,
      `コミュニケーション能力の高さを活かし、相手が話しやすい雰囲気作りを心がけてください。`
    ],
    empathy: [
      `${empathyScore}%の共感力は、相手の心に深く響く特別な魅力です。この思いやりを大切にしてください。`,
      `相手の気持ちを理解する能力は、深い信頼関係を築く基盤となります。`
    ]
  }
  
  if (highestScore >= 70) {
    adviceComponents.push(strengthStrategy[strongestArea][Math.floor(Math.random() * strengthStrategy[strongestArea].length)])
  }
  
  // 4. AI分析結果に基づく特別なアドバイス
  const aiBasedAdvice = sentimentData.label === 'POSITIVE' && sentimentData.score > 0.8 ? 
    'AI分析で検出された強いポジティブ感情は、あなたの自然な魅力の証拠です。この本物の明るさを大切に育ててください。' :
    sentimentData.label === 'POSITIVE' ? 
    'AI分析からも温かい人柄が感じられます。この自然な優しさが、きっと特別な人との出会いを引き寄せるでしょう。' :
    'AI分析では落ち着いた魅力が検出されています。この安定感は、長期的な関係において非常に価値のある特質です。'
  
  adviceComponents.push(aiBasedAdvice)
  
  // 5. バランス調整のアドバイス
  if (isExtreme) {
    adviceComponents.push(`現在、特定の分野に特化した魅力パターンを持っています。${weakestArea === 'positive' ? 'ポジティブ度' : weakestArea === 'social' ? '社交性' : '共感力'}も少し意識することで、より魅力的なバランスを実現できるでしょう。`)
  } else if (isBalanced) {
    adviceComponents.push('バランスの取れた魅力を持つあなたは、どのような相手とも調和しやすい理想的なタイプです。この安定感を自信に変えて、積極的にアプローチしてみてください。')
  }
  
  // 6. 個別化された実践アドバイス
  const intensity = totalScore >= 240 ? 'ultra' : totalScore >= 210 ? 'high' : totalScore >= 180 ? 'medium' : 'gentle'
  
  const practicalAdvice = [
    `今度のデートでは、あなたの${strongestArea === 'positive' ? '明るさ' : strongestArea === 'social' ? '会話力' : '思いやり'}を活かした${generateDateIdea(strongestArea)}を提案してみてください。`,
    `相手との会話では、${secondaryTrait === 'positive' ? '前向きな話題と' : secondaryTrait === 'social' ? '共通の興味と' : '相手の気持ちと'}${dominantTrait === 'positive' ? '明るい笑顔' : dominantTrait === 'social' ? '自然な質問' : '温かい共感'}を組み合わせると効果的です。`,
    `あなたの魅力パターンでは、${intensity === 'ultra' ? '積極的なアプローチ' : intensity === 'high' ? '自然なアプローチ' : intensity === 'medium' ? '自然なアプローチ' : '穏やかなアプローチ'}が最も成功しやすいでしょう。`
  ]
  
  adviceComponents.push(practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)])
  
  return adviceComponents.join(' ')
}

// デートアイデア生成ヘルパー
function generateDateIdea(strongestArea: string): string {
  const dateIdeas: { [key: string]: string[] } = {
    positive: ['アウトドア活動', 'フェスティバル参加', '新しい体験', '冒険的なプラン'],
    social: ['グループ活動', 'イベント参加', 'コミュニティ活動', '人が集まる場所での活動'],
    empathy: ['静かなカフェでの対話', '美術館や博物館巡り', '自然の中での散歩', 'プライベートな空間での時間']
  }
  
  const ideas = dateIdeas[strongestArea] || dateIdeas.empathy
  return ideas[Math.floor(Math.random() * ideas.length)]
}

// メイン分析関数
export async function analyzeMoteDegree(answers: DiagnosisAnswers): Promise<DiagnosisResult> {
  try {
    // 全ての回答を結合
    const combinedText = `${answers.idealDate} ${answers.loveValues} ${answers.selfPR}`
    
    // 感情分析を実行（非同期）
    const sentimentPromise = analyzeSentiment(combinedText)
    
    // 他のスコア計算を並行実行
    const socialScore = Math.round(calculateSocialScore(combinedText))
    const empathyScore = Math.round(calculateEmpathyScore(combinedText))
    
    // 感情分析の結果を待機
    const sentiment = await sentimentPromise
    const positiveScore = Math.round(calculatePositiveScore(combinedText, sentiment))
    
    // 短い待機時間でリアルなAI処理感を演出
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 総合スコアを計算（重み付き平均）
    const totalScore = Math.round(
      (positiveScore * 0.3 + socialScore * 0.35 + empathyScore * 0.35)
    )
    
    // 主要特性と副特性を特定
    const dominantTrait = positiveScore >= socialScore && positiveScore >= empathyScore ? 'positive' :
                         socialScore >= empathyScore ? 'social' : 'empathy'
    
    const secondaryTrait = dominantTrait === 'positive' ? 
      (socialScore >= empathyScore ? 'social' : 'empathy') :
      dominantTrait === 'social' ? 
      (positiveScore >= empathyScore ? 'positive' : 'empathy') :
      (positiveScore >= socialScore ? 'positive' : 'social')
    
    // AI駆動でタイプと説明を動的生成
    const { type, description } = generateDynamicMotType(positiveScore, socialScore, empathyScore, sentiment)
    
    // AI駆動でアドバイスを動的生成
    const advice = generateDynamicAdvice(positiveScore, socialScore, empathyScore, dominantTrait, secondaryTrait, sentiment)
    
    return {
      score: totalScore,
      type,
      description,
      advice,
      positiveScore,
      socialScore,
      empathyScore
    }
  } catch (error) {
    console.error('Analysis failed:', error)
    throw new Error('AI分析に失敗しました。もう一度お試しください。')
  }
}
