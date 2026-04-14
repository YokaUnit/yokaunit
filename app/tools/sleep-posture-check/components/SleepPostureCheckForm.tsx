"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import type { SleepPostureAnswers } from "../lib/types"
import { questions } from "../lib/questions"

interface SleepPostureCheckFormProps {
  answers: SleepPostureAnswers
  currentQuestion: number
  onUpdateAnswer: (questionId: keyof SleepPostureAnswers, answer: string) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  isAnalyzing: boolean
}

export function SleepPostureCheckForm({
  answers,
  currentQuestion,
  onUpdateAnswer,
  onNextQuestion,
  onPreviousQuestion,
  isAnalyzing,
}: SleepPostureCheckFormProps) {
  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">結果をまとめています…</h2>
            <p className="text-gray-600">あと少しでタイプが分かります</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full animate-pulse w-full" />
          </div>
        </Card>
      </div>
    )
  }

  if (currentQuestion >= questions.length) {
    return null
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  const handleSelectOption = (optionId: string) => {
    onUpdateAnswer(question.id, optionId)
    setTimeout(() => {
      void onNextQuestion()
    }, 220)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            質問 {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8">
        <div className="text-center mb-8">
          <div
            className={`bg-gradient-to-r ${question.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <span className="text-3xl">{question.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{question.title}</h2>
          <p className="text-gray-600">{question.description}</p>
        </div>

        <div className="space-y-4 mb-8">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                currentAnswer === option.id
                  ? "border-indigo-500 bg-indigo-50 shadow-md"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    currentAnswer === option.id ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                  }`}
                >
                  {currentAnswer === option.id && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
                <span
                  className={`font-medium ${
                    currentAnswer === option.id ? "text-indigo-900" : "text-gray-700"
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mb-5">選択すると自動で次の質問へ進みます。</p>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={onPreviousQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            前の質問
          </Button>

          <Button
            type="button"
            onClick={() => void onNextQuestion()}
            disabled={!currentAnswer}
            className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold px-6"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                結果を見る
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

      <div className="mt-6 flex justify-center space-x-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index < currentQuestion ? "bg-emerald-500" : index === currentQuestion ? "bg-indigo-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
