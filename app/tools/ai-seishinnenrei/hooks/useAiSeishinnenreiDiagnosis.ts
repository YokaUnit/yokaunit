"use client"

import { useState, useCallback } from 'react'
import type { DiagnosisAnswers, DiagnosisResult, DiagnosisStep } from '../lib/types'
import { analyzeMentalAge } from '../lib/ai-analysis'

export function useAiSeishinnenreiDiagnosis() {
  const [step, setStep] = useState<DiagnosisStep>('intro')
  const [answers, setAnswers] = useState<DiagnosisAnswers>({
    age: 0,
    lifestyle: '',
    hobby: '',
    communication: '',
    stress: '',
    future: ''
  })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(-1)

  const updateAnswer = useCallback((questionId: keyof DiagnosisAnswers, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const startDiagnosis = useCallback(() => {
    setStep('questions')
    setCurrentQuestion(-1) // 年齢入力から開始
    
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
      age: 0,
      lifestyle: '',
      hobby: '',
      communication: '',
      stress: '',
      future: ''
    })
    setResult(null)
    setIsAnalyzing(false)
    setCurrentQuestion(-1)
    
    // リセット時にページトップにスムーズスクロール
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(0, prev - 1))
  }, [])

  const analyzeMentalAgeLevel = useCallback(async () => {
    // 年齢が入力されているかチェック
    if (!answers.age || answers.age < 1 || answers.age > 100) {
      throw new Error('年齢を正しく入力してください（1-100歳）')
    }

    // 全ての質問に回答されているかチェック
    const requiredQuestions = ['lifestyle', 'hobby', 'communication', 'stress', 'future']
    const unansweredQuestions = requiredQuestions.filter(q => {
      const answer = answers[q as keyof DiagnosisAnswers]
      return !answer || answer === ''
    })
    
    // デバッグ用（本番では削除）
    // console.log('Answers check:', answers)
    // console.log('Unanswered questions:', unansweredQuestions)
    
    if (unansweredQuestions.length > 0) {
      throw new Error(`次の質問にお答えください: ${unansweredQuestions.join(', ')}`)
    }

    setIsAnalyzing(true)

    try {
      const analysisPromise = analyzeMentalAge(answers)
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 600))
      await Promise.all([analysisPromise, delayPromise])
      const analysisResult = await analysisPromise
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
        await analyzeMentalAgeLevel()
      } catch (error) {
        console.error('Auto analysis failed:', error)
        // エラーが発生した場合は完了画面を表示
        setCurrentQuestion(5)
      }
    }
  }, [currentQuestion, analyzeMentalAgeLevel])

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
    analyzeMentalAgeLevel
  }
}
