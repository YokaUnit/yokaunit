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
  const [ageInput, setAgeInput] = useState(answers.age?.toString() || "")

  // 年齢入力画面
  if (currentQuestion === -1 || !answers.age || answers.age === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              まずはあなたの年齢を教えてください
            </h2>
            <p className="text-gray-600">
              精神年齢との比較に使用します
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <label className="block text-lg font-bold text-gray-700 mb-4">
                現在の年齢
              </label>
              <div className="relative max-w-xs mx-auto">
                <Input
                  type="number"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value)}
                  placeholder="25"
                  min="1"
                  max="100"
                  className="text-3xl font-bold text-center py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 font-bold">
                  歳
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => {
                  const age = parseInt(ageInput)
                  if (age >= 1 && age <= 100) {
                    onUpdateAnswer('age', age)
                    // 年齢入力後は最初の質問（currentQuestion = 0）に進む
                    setTimeout(() => {
                      onNextQuestion()
                    }, 100)
                  }
                }}
                disabled={!ageInput || parseInt(ageInput) < 1 || parseInt(ageInput) > 100}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl"
              >
                診断を開始
                <ArrowRight className="h-4 w-4 ml-2" />
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
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI分析中...
            </h2>
            <p className="text-gray-600">
              あなたの精神年齢を計算しています
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
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
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  currentAnswer === option.id
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option.id && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className={`font-medium ${
                  currentAnswer === option.id ? 'text-purple-800' : 'text-gray-700'
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6"
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
              index === currentQuestion ? 'bg-purple-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
