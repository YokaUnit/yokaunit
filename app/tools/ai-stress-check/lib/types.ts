export interface AIStressCheckAnswers {
  workload: string      // 仕事量・負荷
  pressure: string      // プレッシャー対応
  change: string        // 変化への適応
  relationship: string  // 人間関係
  recovery: string      // 回復力
  lifestyle: string     // 生活習慣
}

export interface AIStressCheckResult {
  stressLevel: number           // ストレス耐性レベル (1-100)
  stressType: string           // ストレス耐性タイプ
  stressDescription: string    // タイプ説明
  characteristics: string[]    // 特徴
  strengths: string[]         // 強み
  improvements: string[]      // 改善点
  advice: string             // AI生成アドバイス
  riskLevel: 'low' | 'medium' | 'high'  // リスクレベル
  detailedAnalysis: string   // AI詳細分析
}

export type AIStressCheckStep = 'intro' | 'questions' | 'result'
