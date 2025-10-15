"use client"

import { useState, useCallback } from 'react'
import type { AIStressCheckAnswers, AIStressCheckResult, AIStressCheckStep } from '../lib/types'
import { analyzeStressResistance } from '../lib/ai-analysis'

export function useAIStressCheck() {
  const [step, setStep] = useState<AIStressCheckStep>('intro')
  const [answers, setAnswers] = useState<AIStressCheckAnswers>({
    workload: '',
    pressure: '',
    change: '',
    relationship: '',
    recovery: '',
    lifestyle: ''
  })
  const [result, setResult] = useState<AIStressCheckResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const updateAnswer = useCallback((questionId: keyof AIStressCheckAnswers, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const startDiagnosis = useCallback(() => {
    setStep('questions')
    setCurrentQuestion(0)
    
    // 診断開始時にページトップにスムーズスクロール
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
  }, [])

  const resetDiagnosis = useCallback(() => {
    setStep('intro')
    setAnswers({
      workload: '',
      pressure: '',
      change: '',
      relationship: '',
      recovery: '',
      lifestyle: ''
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

  const nextQuestion = useCallback(async () => {
    const newQuestionIndex = currentQuestion + 1
    
    // 最後の質問の場合は分析を開始
    if (newQuestionIndex >= 6) {
      await analyzeStressLevel()
    } else {
      setCurrentQuestion(newQuestionIndex)
    }
  }, [currentQuestion, answers])

  const analyzeStressLevel = useCallback(async () => {
    // 全ての質問に回答されているかチェック
    const requiredQuestions = ['workload', 'pressure', 'change', 'relationship', 'recovery', 'lifestyle']
    const unansweredQuestions = requiredQuestions.filter(q => {
      const answer = answers[q as keyof AIStressCheckAnswers]
      return !answer || answer === ''
    })
    
    if (unansweredQuestions.length > 0) {
      throw new Error(`次の質問にお答えください: ${unansweredQuestions.join(', ')}`)
    }

    setIsAnalyzing(true)

    try {
      // AI分析の演出（精神年齢診断と同様）
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // AI分析を実行
      const analysisResult = await analyzeStressResistance(answers)
      setResult(analysisResult)
      setStep('result')
      
      // 結果表示時にページトップにスクロール
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } catch (error) {
      console.error('AI Analysis error:', error)
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
    analyzeStressLevel
  }
}
