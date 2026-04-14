"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { SleepPostureAnswers, SleepPostureResult, SleepPostureStep } from "../lib/types"
import { questions } from "../lib/questions"
import { computeSleepPostureResult } from "../lib/scoring"

const emptyAnswers = (): SleepPostureAnswers => ({
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
})

const DRAFT_KEY = "sleep-posture-check:draft:v1"

export function useSleepPostureCheck() {
  const [step, setStep] = useState<SleepPostureStep>("intro")
  const [answers, setAnswers] = useState<SleepPostureAnswers>(emptyAnswers)
  const [result, setResult] = useState<SleepPostureResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (!raw) {
        setIsHydrated(true)
        return
      }
      const parsed = JSON.parse(raw) as { answers?: SleepPostureAnswers; currentQuestion?: number; step?: SleepPostureStep }
      if (parsed.answers) setAnswers({ ...emptyAnswers(), ...parsed.answers })
      if (typeof parsed.currentQuestion === "number") {
        setCurrentQuestion(Math.min(Math.max(parsed.currentQuestion, 0), questions.length - 1))
      }
      if (parsed.step === "questions") setStep("questions")
    } catch (_e) {
      // ignore corrupted draft
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return
    if (step === "intro") return
    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        answers,
        currentQuestion,
        step: step === "result" ? "questions" : step,
      }),
    )
  }, [answers, currentQuestion, step, isHydrated])

  const updateAnswer = useCallback((questionId: keyof SleepPostureAnswers, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }, [])

  const startCheck = useCallback(() => {
    setStep("questions")
    setCurrentQuestion(0)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 100)
  }, [])

  const startFresh = useCallback(() => {
    setAnswers(emptyAnswers())
    setResult(null)
    setStep("questions")
    setCurrentQuestion(0)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DRAFT_KEY)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  const resetCheck = useCallback(() => {
    setStep("intro")
    setAnswers(emptyAnswers())
    setResult(null)
    setIsAnalyzing(false)
    setCurrentQuestion(0)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DRAFT_KEY)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  const previousQuestion = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1))
  }, [])

  const runComplete = useCallback(async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    const computed = computeSleepPostureResult(answers)
    setResult(computed)
    setStep("result")
    setIsAnalyzing(false)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 100)
  }, [answers])

  const nextQuestion = useCallback(async () => {
    const q = questions[currentQuestion]
    const currentAnswer = answers[q.id]
    if (!currentAnswer) return

    if (currentQuestion >= questions.length - 1) {
      await runComplete()
      return
    }
    setCurrentQuestion((prev) => prev + 1)
  }, [currentQuestion, answers, runComplete])

  const answeredCount = useMemo(
    () => questions.filter((q) => Boolean(answers[q.id])).length,
    [answers],
  )

  const hasDraft = answeredCount > 0

  const resumeCheck = useCallback(() => {
    setStep("questions")
  }, [])

  return {
    step,
    answers,
    result,
    isAnalyzing,
    currentQuestion,
    updateAnswer,
    startCheck,
    startFresh,
    resetCheck,
    nextQuestion,
    previousQuestion,
    answeredCount,
    hasDraft,
    resumeCheck,
  }
}
