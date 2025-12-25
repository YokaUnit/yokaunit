"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Brain, User } from "lucide-react"
import type { DiagnosisAnswers } from "../lib/types"
import { questions } from "../lib/questions"

interface DiagnosisFormProps {
  answers: DiagnosisAnswers
  currentQuestion: number
  onUpdateAnswer: (questionId: keyof DiagnosisAnswers, answer: string | number) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  isAnalyzing: boolean
}

export function DiagnosisForm({ 
  answers, 
  currentQuestion, 
  onUpdateAnswer, 
  onNextQuestion, 
  onPreviousQuestion,
  isAnalyzing 
}: DiagnosisFormProps) {
  const [ageInput, setAgeInput] = useState(answers.age && answers.age > 0 ? answers.age.toString() : "")

  const normalizeDigits = (value: string) =>
    value
      .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
      .replace(/[^0-9]/g, "")

  const handleAgeChange = (value: string) => {
    const normalized = normalizeDigits(value)
    setAgeInput(normalized)
  }

  // 年齢入力画面
  if (currentQuestion === -1 || !answers.age || answers.age === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 sm:p-8 p-4">
          <div className="text-center mb-8 sm:mb-8 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 sm:w-16 sm:h-16 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-4 mb-2">
              <User className="h-8 w-8 sm:h-8 sm:w-8 h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-2xl text-xl font-bold text-gray-900 mb-2 sm:mb-2 mb-1">
              まずはあなたの年齢を教えてください
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              精神年齢との比較に使用します
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <label className="block text-lg font-bold text-gray-700 mb-4 sm:mb-4 mb-2">
                現在の年齢
              </label>
              <div className="relative max-w-xs mx-auto">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={ageInput}
                  onChange={(e) => handleAgeChange(e.target.value)}
                  placeholder="20"
                  min="1"
                  max="100"
                  className="text-3xl sm:text-3xl text-2xl font-bold text-center py-4 sm:py-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-300 placeholder:font-normal bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl sm:text-xl text-lg text-gray-500 font-bold">
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
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl h-10 sm:h-10 h-9"
              >
                <span className="hidden sm:inline">診断を開始</span>
                <span className="sm:hidden">開始</span>
                <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* 年齢入力のヒント */}
        <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-md p-6 mt-6">
          <h3 className="font-bold text-blue-800 mb-3 text-center">💡 診断について</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>簡単な5つの選択式質問に答えるだけ</span>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                2
              </span>
              <span>AIがあなたの精神年齢を分析・診断</span>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                3
              </span>
              <span>実年齢との差や特徴を詳しく解説</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // 質問が範囲外の場合（分析中または完了）
  if (currentQuestion >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg p-6 text-center">
          <div className="mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-7 w-7 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              AIが診断結果をまとめています
            </h2>
            <p className="text-sm text-gray-600">
              あと数秒で結果が表示されます
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse w-full" />
          </div>
          
          <p className="text-xs text-gray-500">
            画面は自動で切り替わります
          </p>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="max-w-2xl mx-auto">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">質問 {currentQuestion + 1} / {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 sm:p-8 p-4">
        <div className="text-center mb-8 sm:mb-8 mb-4">
          <div className={`bg-gradient-to-r ${question.color} w-16 h-16 sm:w-16 sm:h-16 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-4 mb-2`}>
            <span className="text-3xl sm:text-3xl text-2xl">{question.icon}</span>
          </div>
          <h2 className="text-2xl sm:text-2xl text-xl font-bold text-gray-900 mb-2 sm:mb-2 mb-1">
            {question.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {question.description}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => onUpdateAnswer(question.id, option.id)}
              className={`w-full p-4 sm:p-5 text-left rounded-xl border-2 transition-all duration-200 touch-manipulation ${
                currentAnswer === option.id
                  ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25 active:bg-purple-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 mr-4 sm:mr-4 flex items-center justify-center flex-shrink-0 ${
                  currentAnswer === option.id
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option.id && (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className={`font-medium text-base sm:text-lg leading-relaxed ${
                  currentAnswer === option.id ? 'text-purple-800 font-semibold' : 'text-gray-700'
                }`}>
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <Button
            onClick={onPreviousQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-3 sm:py-2 px-6 touch-manipulation min-h-[48px] sm:min-h-[40px] order-2 sm:order-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2 sm:mr-2" />
            <span className="sm:hidden">前へ</span>
            <span className="hidden sm:inline">前の質問</span>
          </Button>

          <Button
            onClick={onNextQuestion}
            disabled={!currentAnswer}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-4 sm:px-6 py-3 sm:py-2 touch-manipulation min-h-[56px] sm:min-h-[44px] text-base sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 order-1 sm:order-2"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Brain className="h-4 w-4 mr-2" />
                <span>診断完了</span>
              </>
            ) : (
              <>
                <span>次の質問</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* 進行状況表示（モバイルでは非表示） */}
      <div className="mt-6 flex justify-center space-x-2 hidden sm:flex">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index < currentQuestion ? 'bg-green-500' :
              index === currentQuestion ? 'bg-purple-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
