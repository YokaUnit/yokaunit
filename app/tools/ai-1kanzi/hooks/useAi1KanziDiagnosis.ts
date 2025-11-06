"use client"

import { useState, useCallback } from 'react'
import type { DiagnosisAnswers, DiagnosisResult, DiagnosisStep } from '../lib/types'
import { analyzeKanji } from '../lib/ai-analysis'

export function useAi1KanziDiagnosis() {
  const [step, setStep] = useState<DiagnosisStep>('intro')
  const [answers, setAnswers] = useState<DiagnosisAnswers>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const updateAnswer = useCallback((questionId: keyof DiagnosisAnswers, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const startDiagnosis = useCallback(() => {
    setStep('questions')
    setCurrentQuestion(0)
    
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
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: ''
    })
    setResult(null)
    setIsAnalyzing(false)
    setCurrentQuestion(0)
    
    // リセット時にページトップにスムーズスクロール
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(0, prev - 1))
  }, [])

  const analyzeKanjiResult = useCallback(async () => {
    // 全ての質問に回答されているかチェック
    const requiredQuestions = ['q1', 'q2', 'q3', 'q4', 'q5'] as const
    const unansweredQuestions = requiredQuestions.filter(q => {
      const answer = answers[q]
      return !answer || answer === ''
    })
    
    if (unansweredQuestions.length > 0) {
      throw new Error(`すべての質問にお答えください`)
    }

    setIsAnalyzing(true)

    try {
      // 最小限の演出時間（500ms）を確保しつつ、AI分析を並列で開始
      const [analysisResult] = await Promise.all([
        analyzeKanji(answers),
        new Promise(resolve => setTimeout(resolve, 500)) // 最小限の演出時間
      ])
      
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
      
      // ユーザーフレンドリーなエラーメッセージ
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'AI分析中にエラーが発生しました。もう一度お試しください。'
      
      throw new Error(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }, [answers])

  const nextQuestion = useCallback(async () => {
    const newQuestionIndex = currentQuestion + 1
    setCurrentQuestion(newQuestionIndex)
    
    // 最後の質問（index 4）に答えた後、自動的に診断を実行
    if (newQuestionIndex >= 5) {
      try {
        await analyzeKanjiResult()
      } catch (error) {
        console.error('Auto analysis failed:', error)
        // エラーが発生した場合は完了画面を表示
        setCurrentQuestion(5)
      }
    }
  }, [currentQuestion, analyzeKanjiResult])

  return {
    step,
    answers,
    result,
    isAnalyzing,
    currentQuestion,
    updateAnswer,
    startDiagnosis,
    resetDiagnosis,
    nextQuestion,
    previousQuestion,
    analyzeKanjiResult
  }
}

