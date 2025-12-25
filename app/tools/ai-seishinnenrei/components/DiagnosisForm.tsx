"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Brain, User } from "lucide-react"
import type { DiagnosisAnswers } from "../lib/types"
import type { Question } from "../lib/questions"
import { questions as defaultQuestions } from "../lib/questions"
import { AnalysisLoading } from "./AnalysisLoading"

interface DiagnosisFormProps {
  answers: DiagnosisAnswers
  currentQuestion: number
  questions?: Question[]
  onUpdateAnswer: (questionId: keyof DiagnosisAnswers, answer: string | number) => void
  onNextQuestion: () => Promise<void>
  onPreviousQuestion: () => void
  isAnalyzing: boolean
  onStartAnalysis?: () => void
}

export function DiagnosisForm({ 
  answers, 
  currentQuestion, 
  questions: propsQuestions,
  onUpdateAnswer, 
  onNextQuestion, 
  onPreviousQuestion,
  isAnalyzing,
  onStartAnalysis
}: DiagnosisFormProps) {
  // propsで渡されたquestionsを使う、なければデフォルトを使う
  const questions = propsQuestions || defaultQuestions
  const [ageInput, setAgeInput] = useState(answers.age && answers.age > 0 ? answers.age.toString() : "")
  const [isComposing, setIsComposing] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const hasAutoAdvanced = useRef(false)
  const onNextQuestionRef = useRef(onNextQuestion)

  // onNextQuestionの最新の値を保持
  useEffect(() => {
    onNextQuestionRef.current = onNextQuestion
  }, [onNextQuestion])

  // 質問が変わったらリセット
  useEffect(() => {
    hasAutoAdvanced.current = false
  }, [currentQuestion])

  // 回答が更新されたら自動で次の質問に進む
  useEffect(() => {
    const question = questions[currentQuestion]
    if (!question) return
    
    const currentAnswer = answers[question.id]
    if (!currentAnswer || hasAutoAdvanced.current || currentQuestion < 0 || currentQuestion >= questions.length) {
      return
    }
    
    hasAutoAdvanced.current = true
    
    const timer = setTimeout(async () => {
      // 最後の質問の場合は診断を実行、それ以外は次の質問へ
      if (currentQuestion === questions.length - 1) {
        // 最後の質問なので、すぐにローディング画面を表示
        setShowLoading(true)
        if (onStartAnalysis) {
          onStartAnalysis()
        }
        // 診断を実行
        try {
          await onNextQuestionRef.current()
        } catch (error) {
          console.error('診断エラー:', error)
          setShowLoading(false)
        }
      } else {
        // 次の質問へ
        await onNextQuestionRef.current()
      }
    }, 200)
    
    return () => {
      clearTimeout(timer)
    }
  }, [answers, currentQuestion, onNextQuestion, onStartAnalysis, questions.length])

  const normalizeDigits = (value: string) =>
    value
      .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
      .replace(/[^0-9]/g, "")

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const normalized = normalizeDigits(value)
    // 最大3桁まで（100歳まで）
    const limited = normalized.slice(0, 3)
    setAgeInput(limited)
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    // 変換完了後に正規化処理
    const value = e.currentTarget.value
    const normalized = normalizeDigits(value)
    const limited = normalized.slice(0, 3)
    setAgeInput(limited)
  }

  const handleCompositionUpdate = (e: React.CompositionEvent<HTMLInputElement>) => {
    // IME変換中は入力値を更新しない
    if (isComposing) {
      e.preventDefault()
    }
  }

  // 年齢入力画面
  if (currentQuestion === -1 || !answers.age || answers.age === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <User className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2">
              まずはあなたの年齢を教えてください
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              精神年齢との比較に使用します
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="text-center">
              <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                現在の年齢
              </label>
              <div className="relative max-w-xs mx-auto">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={ageInput}
                  onChange={handleAgeChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  placeholder="20"
                  min="1"
                  max="100"
                  className="text-2xl sm:text-3xl font-bold text-center py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-300 placeholder:font-normal bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-gray-500 font-bold">
                  歳
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => {
                  const age = parseInt(ageInput, 10)
                  if (age >= 1 && age <= 100) {
                    onUpdateAnswer('age', age)
                    onNextQuestion()
                  }
                }}
                disabled={!ageInput || parseInt(ageInput, 10) < 1 || parseInt(ageInput, 10) > 100}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
              >
                <span className="hidden sm:inline">診断を開始</span>
                <span className="sm:hidden">開始</span>
                <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // 質問が範囲外の場合（分析中または完了）
  if (currentQuestion >= questions.length) {
    return <AnalysisLoading />
  }

  // 年齢入力画面
  if (currentQuestion === -1 || !answers.age || answers.age === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <User className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2">
              まずはあなたの年齢を教えてください
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              精神年齢との比較に使用します
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="text-center">
              <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                現在の年齢
              </label>
              <div className="relative max-w-xs mx-auto">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={ageInput}
                  onChange={handleAgeChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  placeholder="20"
                  min="1"
                  max="100"
                  className="text-2xl sm:text-3xl font-bold text-center py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-300 placeholder:font-normal bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-gray-500 font-bold">
                  歳
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => {
                  const age = parseInt(ageInput, 10)
                  if (age >= 1 && age <= 100) {
                    onUpdateAnswer('age', age)
                    onNextQuestion()
                  }
                }}
                disabled={!ageInput || parseInt(ageInput, 10) < 1 || parseInt(ageInput, 10) > 100}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
              >
                <span className="hidden sm:inline">診断を開始</span>
                <span className="sm:hidden">開始</span>
                <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // 質問が範囲外の場合（分析中または完了）
  if (currentQuestion >= questions.length) {
    return <AnalysisLoading />
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      {/* プログレスバー */}
      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">質問 {currentQuestion + 1} / {questions.length}</span>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${question.color} h-full rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl p-4 sm:p-5 md:p-6">
        <div className="text-center mb-4 sm:mb-5">
          <div className={`bg-gradient-to-r ${question.color} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
            <span className="text-3xl sm:text-4xl">{question.icon}</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight px-2">
            {question.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 px-2">
            {question.description}
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => {
                onUpdateAnswer(question.id, option.id)
              }}
              className={`w-full p-3 sm:p-3.5 text-left rounded-lg border-2 transition-all duration-200 touch-manipulation min-h-[52px] sm:min-h-[56px] ${
                currentAnswer === option.id
                  ? `border-purple-500 bg-gradient-to-r ${question.color} bg-opacity-10 shadow-md scale-[1.01] ring-2 ring-purple-200`
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 active:bg-purple-50 active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 transition-all ${
                  currentAnswer === option.id
                    ? 'border-purple-600 bg-purple-600 scale-110'
                    : 'border-gray-300 bg-white'
                }`}>
                  {currentAnswer === option.id && (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className={`font-medium text-sm sm:text-base leading-relaxed flex-1 ${
                  currentAnswer === option.id ? 'text-purple-900 font-semibold' : 'text-gray-700'
                }`}>
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
          <Button
            onClick={onPreviousQuestion}
            variant="outline"
            disabled={currentQuestion === -1}
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 py-2.5 sm:py-2 px-4 sm:px-6 touch-manipulation min-h-[44px] sm:min-h-[40px] order-2 sm:order-1 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="sm:hidden">前へ</span>
            <span className="hidden sm:inline">{currentQuestion === 0 ? '年齢入力に戻る' : '前の質問'}</span>
          </Button>

          {!currentAnswer && (
            <div className="text-center text-xs text-gray-500 order-1 sm:order-2 py-2">
              <p>上から選択してください</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
