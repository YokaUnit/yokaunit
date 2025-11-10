"use client"

import { useState, useCallback } from 'react'
import type { AIStressCheckAnswers, AIStressCheckResult, AIStressCheckStep } from '../lib/types'
import { analyzeStressResistance } from '../lib/ai-analysis'

const TOTAL_QUESTIONS = 6

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

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(0, prev - 1))
  }, [])

  const analyzeStressLevel = useCallback(async () => {
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
      const analysisPromise = analyzeStressResistance(answers)
      await Promise.all([
        analysisPromise,
        new Promise((resolve) => setTimeout(resolve, 600))
      ])
      const analysisResult = await analysisPromise
      setResult(analysisResult)
      setStep('result')

      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } catch (error) {
      console.error('AI Analysis error:', error)
      setIsAnalyzing(false)

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

    if (newQuestionIndex >= TOTAL_QUESTIONS) {
      setCurrentQuestion(TOTAL_QUESTIONS)
      await analyzeStressLevel()
    } else {
      setCurrentQuestion(newQuestionIndex)
    }
  }, [currentQuestion, analyzeStressLevel])

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
