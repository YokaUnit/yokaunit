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

// 漢字マッピング（スコアと性格タイプに基づく）
const kanjiMap = {
  // 高スコア（積極的・行動的）
  active: ['勇', '動', '進', '力', '燃', '熱', '光', '輝', '躍', '飛'],
  // 中高スコア（冷静・知的）
  calm: ['静', '思', '知', '理', '智', '考', '学', '文', '深', '探'],
  // 中スコア（優しい・温かい）
  gentle: ['優', '和', '暖', '愛', '心', '情', '慈', '親', '友', '信'],
  // 中低スコア（自由・創造的）
  creative: ['創', '想', '夢', '自', '由', '個', '新', '変', '奇', '楽'],
  // 低スコア（柔軟・のんびり）
  flexible: ['柔', '緩', '安', '穏', '平', '淡', '軽', '楽', '悠', '怠'],
  // 非常に低いスコア（ネガティブ・悪い）
  negative: ['悪', '陰', '邪', '怠', '愚', '暗', '冷', '虚', '偽', '惰']
}

// 漢字の説明文
const kanjiDescriptions: Record<string, { reason: string; description: string; characteristics: string[] }> = {
  '勇': {
    reason: '積極的で行動力があり、困難にも立ち向かう強さを持っています',
    description: 'あなたは勇気と行動力に満ちた人です。困難な状況でも逃げずに立ち向かい、周囲をリードする力があります。',
    characteristics: ['行動力', 'リーダーシップ', '決断力', '勇敢さ', '挑戦精神']
  },
  '動': {
    reason: '常に動き、変化を好むエネルギッシュな性格です',
    description: 'あなたは動的で活発な人です。じっとしているのが苦手で、常に新しいことに挑戦する姿勢を持っています。',
    characteristics: ['活動的', '変化好き', 'エネルギッシュ', '積極性', '行動力']
  },
  '進': {
    reason: '前進し続ける向上心と前向きな姿勢を持っています',
    description: 'あなたは常に前進を続ける人です。現状に満足せず、より良い自分を目指して努力を続けます。',
    characteristics: ['向上心', '前向き', '成長志向', '努力家', '進歩的']
  },
  '力': {
    reason: '内なる力とパワーを持ち、困難を乗り越える強さがあります',
    description: 'あなたは内なる力を持った人です。困難な状況でも力を発揮し、周囲に影響を与える存在です。',
    characteristics: ['力強さ', 'パワー', '影響力', '強靭さ', '根性']
  },
  '燃': {
    reason: '情熱的で燃えるような熱意を持っています',
    description: 'あなたは情熱に満ちた人です。何かに取り組むときは全身全霊で打ち込み、周囲を熱くさせます。',
    characteristics: ['情熱', '熱意', '集中力', '没頭', '燃える心']
  },
  '熱': {
    reason: '熱心で真剣に物事に取り組む姿勢があります',
    description: 'あなたは熱心で真剣な人です。一度決めたことは最後までやり遂げる強い意志を持っています。',
    characteristics: ['熱心', '真剣', '集中力', '継続力', '情熱']
  },
  '光': {
    reason: '明るく希望に満ちた存在で、周囲を照らします',
    description: 'あなたは光のような存在です。周囲を明るく照らし、希望を与えることができます。',
    characteristics: ['明るさ', '希望', 'ポジティブ', '影響力', '輝き']
  },
  '輝': {
    reason: '輝きを持ち、周囲から注目される存在です',
    description: 'あなたは輝く存在です。内側から光を放ち、周囲の人々を引き寄せる魅力があります。',
    characteristics: ['輝き', '魅力', '個性', '存在感', '才能']
  },
  '躍': {
    reason: '躍動感があり、生き生きとしたエネルギーを持っています',
    description: 'あなたは躍動感のある人です。常にエネルギッシュで、周囲に活力を与えます。',
    characteristics: ['躍動感', 'エネルギー', '活発', '生命力', '動的']
  },
  '飛': {
    reason: '自由に飛び立ち、新しい世界を切り開く力があります',
    description: 'あなたは自由に飛び立つ人です。既存の枠にとらわれず、新しい可能性を探求します。',
    characteristics: ['自由', '挑戦', '冒険心', '可能性', '拡張']
  },
  '静': {
    reason: '冷静で落ち着いており、深い思慮を持っています',
    description: 'あなたは冷静で落ち着いた人です。感情に流されず、深く考えて行動することができます。',
    characteristics: ['冷静', '落ち着き', '思慮深さ', '安定', '理性']
  },
  '思': {
    reason: '深く考える力と洞察力を持っています',
    description: 'あなたは深く考える人です。物事の本質を見抜く力があり、的確な判断ができます。',
    characteristics: ['思考力', '洞察力', '分析力', '判断力', '知性']
  },
  '知': {
    reason: '知識欲が旺盛で、学ぶことを愛しています',
    description: 'あなたは知識を愛する人です。常に学び続け、新しいことを知る喜びを持っています。',
    characteristics: ['知識欲', '学習意欲', '好奇心', '探究心', '教養']
  },
  '理': {
    reason: '論理的で筋道立てて考える力があります',
    description: 'あなたは論理的な人です。感情よりも理性を優先し、筋道立てて物事を進めます。',
    characteristics: ['論理性', '合理性', '体系化', '思考力', '分析力']
  },
  '智': {
    reason: '知恵と経験に基づいた判断力を持っています',
    description: 'あなたは知恵のある人です。経験を活かし、賢い判断をすることができます。',
    characteristics: ['知恵', '経験', '判断力', '賢さ', '洞察']
  },
  '考': {
    reason: 'よく考え、慎重に行動する姿勢があります',
    description: 'あなたはよく考える人です。慎重に検討し、最適な選択をしようとします。',
    characteristics: ['慎重さ', '思考力', '検討力', '判断力', '計画性']
  },
  '学': {
    reason: '学ぶ姿勢を持ち、成長を続けています',
    description: 'あなたは学び続ける人です。常に向上心を持ち、新しい知識やスキルを身につけます。',
    characteristics: ['学習意欲', '向上心', '成長', '知識', 'スキル']
  },
  '文': {
    reason: '文化的で洗練された感性を持っています',
    description: 'あなたは文化的な人です。芸術や文学など、精神的な豊かさを大切にします。',
    characteristics: ['文化的', '洗練', '感性', '教養', '芸術性']
  },
  '深': {
    reason: '深い洞察力と理解力を持っています',
    description: 'あなたは深い人です。表面的ではなく、物事の本質を理解しようとします。',
    characteristics: ['深さ', '洞察力', '理解力', '探究心', '本質理解']
  },
  '探': {
    reason: '探求心が旺盛で、真理を追求します',
    description: 'あなたは探求する人です。未知のことに興味を持ち、真理を追求し続けます。',
    characteristics: ['探求心', '好奇心', '研究心', '探検', '発見']
  },
  '優': {
    reason: '優しさと愛情にあふれ、周囲に温かさを与えます',
    description: 'あなたは優しい人です。周囲の人々を思いやり、温かい心で接することができます。',
    characteristics: ['優しさ', '愛情', '思いやり', '温かさ', '親切']
  },
  '和': {
    reason: '調和を大切にし、周囲と協調できる性格です',
    description: 'あなたは和を大切にする人です。争いを避け、周囲と協調して物事を進めます。',
    characteristics: ['調和', '協調性', '平和', '穏やか', '協力']
  },
  '暖': {
    reason: '温かく、人を包み込むような優しさがあります',
    description: 'あなたは温かい人です。周囲の人々を包み込むような優しさと親しみやすさを持っています。',
    characteristics: ['温かさ', '親しみやすさ', '包容力', '優しさ', '愛情']
  },
  '愛': {
    reason: '愛情深く、人を愛する力があります',
    description: 'あなたは愛情深い人です。人を愛し、愛されることを大切にします。',
    characteristics: ['愛情', '情愛', '思いやり', '献身', '優しさ']
  },
  '心': {
    reason: '心豊かで、感情を大切にします',
    description: 'あなたは心豊かな人です。感情を大切にし、心の声に耳を傾けることができます。',
    characteristics: ['心豊か', '感情豊か', '感性', '共感力', '情緒']
  },
  '情': {
    reason: '情熱的で、感情を大切にします',
    description: 'あなたは情熱的な人です。感情を大切にし、情熱を持って物事に取り組みます。',
    characteristics: ['情熱', '感情', '共感', '感性', '情緒']
  },
  '慈': {
    reason: '慈しむ心を持ち、人を大切にします',
    description: 'あなたは慈しむ心を持った人です。周囲の人々を大切にし、思いやりのある行動ができます。',
    characteristics: ['慈愛', '思いやり', '優しさ', '愛情', '温かさ']
  },
  '親': {
    reason: '親しみやすく、人との距離を縮められます',
    description: 'あなたは親しみやすい人です。初対面の人とも自然に仲良くなることができます。',
    characteristics: ['親しみやすさ', '社交性', '親和力', '人懐っこさ', '明るさ']
  },
  '友': {
    reason: '友情を大切にし、人との絆を重んじます',
    description: 'あなたは友情を大切にする人です。人との絆を大切にし、長く続く関係を築くことができます。',
    characteristics: ['友情', '絆', '信頼', '協力', '思いやり']
  },
  '信': {
    reason: '信頼でき、誠実な性格です',
    description: 'あなたは信頼できる人です。誠実で約束を守り、周囲から信頼されています。',
    characteristics: ['信頼性', '誠実', '約束', '責任感', '真実']
  },
  '創': {
    reason: '創造力があり、新しいものを生み出す力があります',
    description: 'あなたは創造的な人です。新しいアイデアを生み出し、独自の世界を築くことができます。',
    characteristics: ['創造力', '独創性', '革新', '発想力', '芸術性']
  },
  '想': {
    reason: '想像力が豊かで、夢を描くことができます',
    description: 'あなたは想像力豊かな人です。夢を描き、それを実現するための力を秘めています。',
    characteristics: ['想像力', '夢', '理想', 'ビジョン', '発想']
  },
  '夢': {
    reason: '夢を持ち、理想を追い求める性格です',
    description: 'あなたは夢を追う人です。理想を掲げ、それに向かって努力を続けることができます。',
    characteristics: ['夢', '理想', '希望', '目標', 'ビジョン']
  },
  '自': {
    reason: '自分らしさを大切にし、個性を持っています',
    description: 'あなたは自分らしい人です。他人に流されず、自分の信念を貫くことができます。',
    characteristics: ['自分らしさ', '個性', '独立性', '主体性', '独自性']
  },
  '由': {
    reason: '自由を愛し、束縛を嫌います',
    description: 'あなたは自由を愛する人です。束縛を嫌い、自分のペースで生きることを大切にします。',
    characteristics: ['自由', '独立性', '自主性', '柔軟性', '開放性']
  },
  '個': {
    reason: '個性的で、独自のスタイルを持っています',
    description: 'あなたは個性的な人です。独自のスタイルを持ち、周囲とは違う魅力を発揮します。',
    characteristics: ['個性', '独自性', '独創性', '特徴', 'ユニーク']
  },
  '新': {
    reason: '新しいことを好み、革新を求めます',
    description: 'あなたは新しいことを好む人です。変化を恐れず、革新を求め続けます。',
    characteristics: ['革新', '新しさ', '変化', '挑戦', '進化']
  },
  '変': {
    reason: '変化を恐れず、柔軟に対応できます',
    description: 'あなたは変化に対応できる人です。柔軟性があり、新しい状況にも適応できます。',
    characteristics: ['柔軟性', '適応力', '変化対応', '開放性', '順応性']
  },
  '奇': {
    reason: '奇抜で、予想外の行動を取ることがあります',
    description: 'あなたは奇抜な人です。常識にとらわれず、予想外の行動で周囲を驚かせます。',
    characteristics: ['奇抜さ', '独創性', '予想外', '個性', '革新']
  },
  '楽': {
    reason: '楽観的で、楽しむことを大切にします',
    description: 'あなたは楽しい人です。楽観的で、どんな状況でも楽しむことを見つけられます。',
    characteristics: ['楽観', '楽しさ', '明るさ', 'ポジティブ', 'ユーモア']
  },
  '柔': {
    reason: '柔軟性があり、臨機応変に対応できます',
    description: 'あなたは柔軟な人です。状況に応じて臨機応変に対応し、適応力があります。',
    characteristics: ['柔軟性', '適応力', '臨機応変', '順応性', '開放性']
  },
  '緩': {
    reason: 'のんびりしていて、焦らない性格です',
    description: 'あなたはのんびりした人です。焦らず、自分のペースで物事を進めることができます。',
    characteristics: ['のんびり', '余裕', '穏やか', 'ペース', 'リラックス']
  },
  '安': {
    reason: '安心感を与え、落ち着いた雰囲気があります',
    description: 'あなたは安心感を与える人です。落ち着いた雰囲気で、周囲の人々を安心させます。',
    characteristics: ['安心感', '落ち着き', '安定', '穏やか', '信頼']
  },
  '穏': {
    reason: '穏やかで、平和を好む性格です',
    description: 'あなたは穏やかな人です。争いを避け、平和な環境を好みます。',
    characteristics: ['穏やか', '平和', '安定', '落ち着き', '調和']
  },
  '平': {
    reason: '平和的で、バランスの取れた性格です',
    description: 'あなたは平和的な人です。バランス感覚に優れ、公平な判断ができます。',
    characteristics: ['平和', 'バランス', '公平', '中立', '安定']
  },
  '淡': {
    reason: '淡々としていて、感情に流されません',
    description: 'あなたは淡々とした人です。感情に流されず、冷静に物事を見ることができます。',
    characteristics: ['冷静', '淡々', '客観性', '落ち着き', '安定']
  },
  '軽': {
    reason: '軽やかで、重苦しさを嫌います',
    description: 'あなたは軽やかな人です。重苦しい雰囲気を嫌い、明るく軽い空気を作ることができます。',
    characteristics: ['軽やか', '明るさ', '爽やか', '自由', '開放']
  },
  '悠': {
    reason: '悠々自適で、のんびりとした性格です',
    description: 'あなたは悠々自適な人です。焦らず、自分のペースで人生を楽しむことができます。',
    characteristics: ['悠々', 'のんびり', '余裕', '自由', '楽しみ']
  },
  '怠': {
    reason: 'のんびりしていて、面倒なことは後回しにしがちです',
    description: 'あなたはのんびりした性格です。急ぐことが苦手で、自分のペースを大切にします。たまには頑張ることも必要かも？',
    characteristics: ['のんびり', 'マイペース', '余裕', 'ゆったり', 'リラックス']
  },
  '悪': {
    reason: 'ちょっと悪いところもあるけど、それが個性です',
    description: 'あなたは悪い面も持つ、人間らしい人です。完璧な人なんていません。この「悪」の部分も、あなたの魅力の一つかもしれません。でも、良い方向に活かす努力も大切です。',
    characteristics: ['個性的', '人間らしさ', '複雑さ', '深み', 'リアル']
  },
  '陰': {
    reason: '内向的で、暗い面も持っていますが、それは深さの表れです',
    description: 'あなたは陰の部分を持つ人です。明るい太陽の影もあれば、深い月の光もあります。この陰の部分が、あなたの深い思考や感性を生み出しているのかもしれません。',
    characteristics: ['内向的', '深い思考', '感性', '複雑さ', '神秘性']
  },
  '邪': {
    reason: 'ちょっと邪悪な面も持っていますが、それが面白さの源です',
    description: 'あなたは邪な部分を持つ人です。悪役は物語を面白くします。この「邪」の部分が、あなたをユニークで興味深い存在にしているのです。',
    characteristics: ['個性的', 'ユニーク', '興味深さ', '複雑さ', '魅力']
  },
  '愚': {
    reason: '愚かさも時には必要なものです',
    description: 'あなたは愚かな部分を持つ人です。でも、愚かさは時に純粋さや無邪気さの表れでもあります。この「愚」の部分が、あなたを素直で純粋な人にしているのかもしれません。',
    characteristics: ['純粋', '無邪気', '素直', '純真', '天真爛漫']
  },
  '暗': {
    reason: '暗い面を持っていますが、それは深さの証です',
    description: 'あなたは暗い部分を持つ人です。暗い夜も、星が輝く美しい時間です。この「暗」の部分が、あなたの深い洞察力や感性を育んでいるのかもしれません。',
    characteristics: ['深い洞察', '感性', '複雑さ', '神秘性', '内面性']
  },
  '冷': {
    reason: '冷静で、時に冷たいように見えるかもしれません',
    description: 'あなたは冷たい部分を持つ人です。でも、冷たさは時に冷静さや客観性の表れです。この「冷」の部分が、あなたを冷静で的確な判断ができる人にしているのです。',
    characteristics: ['冷静', '客観性', '判断力', '理性', '的確さ']
  },
  '虚': {
    reason: '虚ろな部分もありますが、それは自由さの表れかもしれません',
    description: 'あなたは虚ろな部分を持つ人です。虚ろさは時に、固定観念にとらわれない自由さの表れです。この「虚」の部分が、あなたを柔軟で適応力のある人にしているのかもしれません。',
    characteristics: ['柔軟性', '適応力', '自由さ', '開放性', '流動性']
  },
  '偽': {
    reason: '偽りの部分もありますが、それは自分を守るためのものです',
    description: 'あなたは偽りの部分を持つ人です。でも、すべての人に本心を見せる必要はありません。この「偽」の部分が、あなたを社会で生き抜くための知恵になっているのかもしれません。',
    characteristics: ['社会性', '適応力', '知恵', '柔軟性', '生存力']
  },
  '惰': {
    reason: '惰性で動くことも多いですが、それは時には必要な休息です',
    description: 'あなたは惰性の部分を持つ人です。常に全力で走り続ける必要はありません。この「惰」の部分が、あなたに必要な休息を与えてくれているのかもしれません。',
    characteristics: ['リラックス', '余裕', 'マイペース', '休息', '自然体']
  }
}

// AI駆動の漢字診断システム
export async function analyzeKanji(answers: DiagnosisAnswers): Promise<DiagnosisResult> {
  try {
    // 回答テキストを構築（AI分析用）
    const responseTexts: string[] = []
    let totalScore = 0
    let questionCount = 0

    // スコア計算とテキスト構築を同時に実行
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(opt => opt.id === answer)
        if (option) {
          responseTexts.push(option.text)
          totalScore += option.score
          questionCount++
        }
      }
    })
    
    const combinedText = responseTexts.join(' ')
    
    // 平均スコアを計算（1-9の範囲）
    const averageScore = questionCount > 0 ? totalScore / questionCount : 5
    
    // AI感情分析を非同期で実行（タイムアウト付きで高速化）
    const sentimentAnalysisPromise = analyzeTextSentiment(combinedText)
    const timeoutPromise = new Promise<{ label: string; score: number }>(resolve => 
      setTimeout(() => resolve({ label: 'NEUTRAL', score: 0.5 }), 800)
    )
    
    // 800ms以内に完了しない場合はタイムアウト
    const sentimentAnalysis = await Promise.race([sentimentAnalysisPromise, timeoutPromise])
    
    // スコアに基づいて漢字カテゴリを決定
    let category: keyof typeof kanjiMap
    if (averageScore >= 8) {
      category = 'active'
    } else if (averageScore >= 7) {
      category = 'calm'
    } else if (averageScore >= 6) {
      category = 'gentle'
    } else if (averageScore >= 4) {
      category = 'creative'
    } else if (averageScore >= 2.5) {
      category = 'flexible'
    } else {
      // 非常に低いスコア（2.5未満）の場合は悪い漢字
      category = 'negative'
    }

    // AI分析結果を考慮してカテゴリを微調整
    if (sentimentAnalysis.label === 'POSITIVE' && sentimentAnalysis.score > 0.7) {
      // ポジティブな場合は、より積極的なカテゴリに
      if (category === 'calm') category = 'active'
      if (category === 'gentle') category = 'calm'
      if (category === 'negative') category = 'flexible' // 悪い漢字から救済
    } else if (sentimentAnalysis.label === 'NEGATIVE' && sentimentAnalysis.score > 0.7) {
      // ネガティブな場合は、より低いカテゴリに
      if (category === 'active') category = 'calm'
      if (category === 'creative') category = 'gentle'
      if (category === 'flexible') category = 'negative' // 悪い漢字へ
    }

    // カテゴリから漢字を選択（スコアとランダム要素を組み合わせ）
    const kanjiList = kanjiMap[category]
    const kanjiIndex = Math.floor((averageScore * 10 + Math.random() * 5) % kanjiList.length)
    const kanji = kanjiList[kanjiIndex]

    // 漢字の説明を取得
    const kanjiInfo = kanjiDescriptions[kanji] || {
      reason: 'あなたの個性を表す漢字です',
      description: 'あなたは独特な個性を持った人です。',
      characteristics: ['個性', '独自性', '特徴']
    }

    return {
      kanji,
      reason: kanjiInfo.reason,
      description: kanjiInfo.description,
      characteristics: kanjiInfo.characteristics
    }
  } catch (error) {
    console.error('Kanji analysis failed:', error)
    throw new Error('AI分析に失敗しました。もう一度お試しください。')
  }
}

