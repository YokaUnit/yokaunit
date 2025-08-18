"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowRight, Heart, Users, MessageCircle } from "lucide-react"
import type { DiagnosisAnswers } from "../lib/types"

interface DiagnosisFormProps {
  answers: DiagnosisAnswers
  onUpdateAnswer: (questionId: keyof DiagnosisAnswers, answer: string) => void
  onSubmit: () => void
  isAnalyzing: boolean
}

const questions = [
  {
    id: "idealDate" as keyof DiagnosisAnswers,
    title: "理想のデートプランを教えてください",
    placeholder: "例：美術館でゆっくり作品を見た後、おしゃれなカフェで相手の話をじっくり聞きながらお茶を楽しみたいです。相手の好みも聞いて、次回は相手が行きたい場所に一緒に行きたいと思います。",
    icon: Heart,
    color: "from-pink-500 to-red-500"
  },
  {
    id: "loveValues" as keyof DiagnosisAnswers,
    title: "恋愛で大切にしていることは何ですか？",
    placeholder: "例：お互いを尊重し合い、相手の気持ちを理解しようと努力することが一番大切だと思います。困った時は支え合い、嬉しい時は一緒に喜び合える関係を築きたいです。",
    icon: Users,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "selfPR" as keyof DiagnosisAnswers,
    title: "あなたの魅力を自由にアピールしてください",
    placeholder: "例：人の話を聞くのが得意で、友達からはよく相談を受けます。相手の立場に立って考えることを心がけており、どんな時でも前向きに物事を捉えるよう努力しています。",
    icon: MessageCircle,
    color: "from-blue-500 to-purple-500"
  }
]

export function DiagnosisForm({ answers, onUpdateAnswer, onSubmit, isAnalyzing }: DiagnosisFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const canProceed = () => {
    const currentAnswer = answers[questions[currentQuestion].id]
    return currentAnswer && currentAnswer.trim().length >= 10
  }

  const allAnswersComplete = () => {
    return questions.every(q => answers[q.id] && answers[q.id].trim().length >= 10)
  }

  const currentQ = questions[currentQuestion]
  const IconComponent = currentQ.icon

  return (
    <div className="max-w-3xl mx-auto">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">質問 {currentQuestion + 1} / {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`bg-gradient-to-r ${currentQ.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQ.title}
          </h2>
          <p className="text-gray-600">
            あなたの気持ちを自由に表現してください（10文字以上）
          </p>
        </div>

        <div className="space-y-6">
          <Textarea
            value={answers[currentQ.id] || ""}
            onChange={(e) => onUpdateAnswer(currentQ.id, e.target.value)}
            placeholder={currentQ.placeholder}
            className="min-h-[120px] text-lg leading-relaxed border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
            maxLength={500}
          />
          
          <div className="text-right text-sm text-gray-500">
            {answers[currentQ.id]?.length || 0} / 500文字
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              前の質問
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6"
              >
                次の質問
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onSubmit}
                disabled={!allAnswersComplete() || isAnalyzing}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8"
              >
{isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    AI分析中...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    AI診断開始
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* 回答状況 */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {questions.map((q, index) => {
          const isCompleted = answers[q.id] && answers[q.id].trim().length >= 10
          const isCurrent = index === currentQuestion
          const IconComp = q.icon
          
          return (
            <Card 
              key={q.id}
              className={`p-4 text-center transition-all duration-200 ${
                isCurrent 
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 shadow-md' 
                  : isCompleted 
                    ? 'bg-green-50 border-2 border-green-300' 
                    : 'bg-white/60 border-gray-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                isCompleted 
                  ? 'bg-green-500' 
                  : isCurrent 
                    ? `bg-gradient-to-r ${q.color}` 
                    : 'bg-gray-300'
              }`}>
                <IconComp className="h-4 w-4 text-white" />
              </div>
              <p className={`text-xs font-medium ${
                isCompleted 
                  ? 'text-green-700' 
                  : isCurrent 
                    ? 'text-pink-700' 
                    : 'text-gray-500'
              }`}>
                質問{index + 1}
                {isCompleted && <span className="block">✓ 完了</span>}
              </p>
            </Card>
          )
        })}
      </div>

      {/* ヒント */}
      <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-md p-6 mt-8">
        <h3 className="font-bold text-blue-800 mb-3 text-center">💡 診断のコツ</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
              1
            </span>
            <span>素直な気持ちで答えることで、より正確な診断結果が得られます</span>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
              2
            </span>
            <span>具体的なエピソードや感情を含めると、AIがより詳しく分析できます</span>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
              3
            </span>
            <span>文章の長さよりも、あなたらしさを表現することが重要です</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
