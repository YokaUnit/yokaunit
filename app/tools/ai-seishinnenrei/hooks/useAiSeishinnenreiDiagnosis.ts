"use client"

import { useState, useCallback, useMemo } from 'react'
import type { DiagnosisAnswers, DiagnosisResult, DiagnosisStep } from '../lib/types'
import { analyzeMentalAgeEnhanced } from '../lib/ai-analysis-enhanced'
import { questions as originalQuestions, type Question } from '../lib/questions'

// 質問をランダムに並び替える関数
function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function useAiSeishinnenreiDiagnosis() {
  // 診断開始時に質問をランダムに並び替える
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  
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
  const [analysisProgress, setAnalysisProgress] = useState({ step: '', progress: 0 })
  
  // 現在使用中の質問リスト（ランダム化済み）
  const questions = shuffledQuestions.length > 0 ? shuffledQuestions : originalQuestions

  const updateAnswer = useCallback((questionId: keyof DiagnosisAnswers, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const startDiagnosis = useCallback(() => {
    // 質問をランダムに並び替える
    setShuffledQuestions(shuffleQuestions(originalQuestions))
    setStep('questions')
    setCurrentQuestion(-1) // 年齢入力から開始
  }, [])

  const resetDiagnosis = useCallback(() => {
    setStep('intro')
    setShuffledQuestions([]) // 質問の順番をリセット
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
  }, [])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(-1, prev - 1))
  }, [])

  const startAnalysis = useCallback(() => {
    // 分析開始の準備（ローディング画面を表示するため）
    setIsAnalyzing(true)
    setCurrentQuestion(questions.length) // ローディング画面を表示
    setAnalysisProgress({ step: '分析を開始しています...', progress: 0 })
  }, [questions.length])

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

    // 既にローディングが開始されている場合は、進捗のみ更新
    if (!isAnalyzing) {
      setIsAnalyzing(true)
      setAnalysisProgress({ step: '分析を開始しています...', progress: 0 })
    }

    try {
      const analysisResult = await analyzeMentalAgeEnhanced(answers, (step, progress) => {
        setAnalysisProgress({ step, progress })
      })
      setResult(analysisResult)
      setStep('result')
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
      setAnalysisProgress({ step: '', progress: 0 })
    }
  }, [answers])

  const nextQuestion = useCallback(async () => {
    // 回答が保存されるのを待つ（短縮）
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const newQuestionIndex = currentQuestion + 1
    
    // 最後の質問（index 4 = questions.length - 1）に答えた後、自動的に診断を実行
    if (newQuestionIndex >= questions.length) {
      // すべての回答が保存されていることを確認するため、少し待つ
      await new Promise(resolve => setTimeout(resolve, 100))
      
      try {
        await analyzeMentalAgeLevel()
      } catch (error) {
        console.error('Auto analysis failed:', error)
        // エラーが発生した場合は完了画面を表示
        setCurrentQuestion(questions.length)
      }
    } else {
      // 次の質問に進む（即座に）
      setCurrentQuestion(newQuestionIndex)
    }
  }, [currentQuestion, analyzeMentalAgeLevel, questions.length])

  return {
    step,
    answers,
    result,
    isAnalyzing,
    currentQuestion,
    analysisProgress,
    questions, // ランダム化された質問リスト
    updateAnswer,
    startDiagnosis,
    resetDiagnosis,
    nextQuestion,
    previousQuestion,
    analyzeMentalAgeLevel,
    startAnalysis
  }
}
