"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Brain } from "lucide-react"
import type { StressCheckAnswers } from "../lib/types"
import { questions } from "../lib/questions"

interface StressCheckFormProps {
  answers: StressCheckAnswers
  currentQuestion: number
  onUpdateAnswer: (questionId: keyof StressCheckAnswers, answer: string) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  isAnalyzing: boolean
}

export function StressCheckForm({ 
  answers, 
  currentQuestion, 
  onUpdateAnswer, 
  onNextQuestion, 
  onPreviousQuestion,
  isAnalyzing 
}: StressCheckFormProps) {

  // 質問が範囲外の場合（分析中または完了）
  if (currentQuestion >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI分析中...
            </h2>
            <p className="text-gray-600">
              あなたのストレス耐性を分析しています
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse w-full" />
          </div>
          
          <p className="text-sm text-gray-500">
            しばらくお待ちください...
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
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`bg-gradient-to-r ${question.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <span className="text-3xl">{question.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {question.title}
          </h2>
          <p className="text-gray-600">
            {question.description}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => onUpdateAnswer(question.id, option.id)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                currentAnswer === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  currentAnswer === option.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option.id && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className={`font-medium ${
                  currentAnswer === option.id ? 'text-blue-800' : 'text-gray-700'
                }`}>
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={onPreviousQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            前の質問
          </Button>

          <Button
            onClick={onNextQuestion}
            disabled={!currentAnswer}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Brain className="h-4 w-4 mr-2" />
                診断完了
              </>
            ) : (
              <>
                次の質問
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* 進行状況表示 */}
      <div className="mt-6 flex justify-center space-x-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index < currentQuestion ? 'bg-green-500' :
              index === currentQuestion ? 'bg-blue-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
