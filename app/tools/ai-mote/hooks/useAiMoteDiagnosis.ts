"use client"

import { useState, useCallback } from 'react'
import type { DiagnosisAnswers, DiagnosisResult, DiagnosisStep } from '../lib/types'
import { analyzeMoteDegree } from '../lib/ai-analysis'

export function useAiMoteDiagnosis() {
  const [step, setStep] = useState<DiagnosisStep>('intro')
  const [answers, setAnswers] = useState<DiagnosisAnswers>({
    idealDate: '',
    loveValues: '',
    selfPR: ''
  })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState(0)

  const updateAnswer = useCallback((questionId: keyof DiagnosisAnswers, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const startDiagnosis = useCallback(() => {
    setStep('questions')
    
    // 質問開始時にページトップにスムーズスクロール
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
  }, [])

  const resetDiagnosis = useCallback(() => {
    setStep('intro')
    setAnswers({
      idealDate: '',
      loveValues: '',
      selfPR: ''
    })
    setResult(null)
    setIsAnalyzing(false)
    setAnalysisStage(0)
    
    // リセット時にページトップにスムーズスクロール
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const analyzeMoteLevel = useCallback(async () => {
    // 全ての回答が入力されているかチェック
    const allAnswersComplete = Object.values(answers).every(
      answer => answer && answer.trim().length >= 10
    )

    if (!allAnswersComplete) {
      throw new Error('すべての質問にお答えください（各質問10文字以上）')
    }

    setIsAnalyzing(true)
    setAnalysisStage(0)

    try {
      // 段階1: AIモデル読み込み
      setAnalysisStage(0)
      await new Promise(resolve => setTimeout(resolve, 500))

      // 段階2: ポジティブ度分析
      setAnalysisStage(1)
      await new Promise(resolve => setTimeout(resolve, 800))

      // 段階3: 社交性評価
      setAnalysisStage(2)
      await new Promise(resolve => setTimeout(resolve, 800))

      // 段階4: 共感力解析 + AI分析実行
      setAnalysisStage(3)
      
      // 実際のAI分析を実行（非同期で進行状況も更新）
      const analysisResult = await analyzeMoteDegree(answers)
      
      // 最終段階: 結果生成
      setAnalysisStage(4)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setResult(analysisResult)
      setStep('result')
      
      // 結果表示時にページトップにスクロール
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } catch (error) {
      console.error('Analysis error:', error)
      setIsAnalyzing(false)
      setAnalysisStage(0)
      
      // ユーザーフレンドリーなエラーメッセージ
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'AI分析中にエラーが発生しました。ネットワーク接続を確認して、もう一度お試しください。'
      
      throw new Error(errorMessage)
    } finally {
      setIsAnalyzing(false)
      setAnalysisStage(0)
    }
  }, [answers])

  return {
    step,
    answers,
    result,
    isAnalyzing,
    analysisStage,
    updateAnswer,
    startDiagnosis,
    resetDiagnosis,
    analyzeMoteLevel
  }
}
