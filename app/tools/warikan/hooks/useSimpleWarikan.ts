"use client"

import { useState, useCallback, useMemo } from "react"
import {
  calculateSimpleWarikan,
  calculateSettlement,
  type Member,
  type SettlementResultType,
} from "../lib/simple-calculator"

export function useSimpleWarikan() {
  const [totalAmount, setTotalAmount] = useState(0)
  const [peopleCount, setPeopleCount] = useState(4)
  const [roundUp, setRoundUp] = useState(100)
  const [step, setStep] = useState<"calculate" | "settlement">("calculate")
  const [members, setMembers] = useState<Member[]>([])
  const [settlementResult, setSettlementResult] = useState<SettlementResultType | null>(null)

  // Calculate basic result
  const result = useMemo(() => {
    return calculateSimpleWarikan(totalAmount, peopleCount, roundUp)
  }, [totalAmount, peopleCount, roundUp])

  // Initialize members when going to settlement
  const goToSettlement = useCallback(() => {
    if (!result || result.totalAmount === 0) return

    const initialMembers: Member[] = Array.from({ length: peopleCount }, (_, i) => ({
      id: `member-${i}`,
      name: `メンバー${i + 1}`,
      shouldPay: result.perPersonAmount,
      actualPaid: 0,
    }))

    setMembers(initialMembers)
    setSettlementResult(null)
    setStep("settlement")
  }, [result, peopleCount])

  const backToCalculate = useCallback(() => {
    setStep("calculate")
  }, [])

  const updateMemberPaid = useCallback((id: string, amount: number) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, actualPaid: amount } : member)))
  }, [])

  const updateMemberName = useCallback((id: string, name: string) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, name } : member)))
  }, [])

  const calculateFinalSettlement = useCallback(() => {
    const settlement = calculateSettlement(members)
    setSettlementResult(settlement)
  }, [members])

  const reset = useCallback(() => {
    setTotalAmount(0)
    setPeopleCount(4)
    setRoundUp(100)
    setStep("calculate")
    setMembers([])
    setSettlementResult(null)
  }, [])

  const shareUrl = useCallback(() => {
    const params = new URLSearchParams({
      amount: totalAmount.toString(),
      people: peopleCount.toString(),
      roundUp: roundUp.toString(),
    })
    return `${window.location.origin}/tools/warikan?${params.toString()}`
  }, [totalAmount, peopleCount, roundUp])

  return {
    totalAmount,
    peopleCount,
    roundUp,
    result,
    step,
    members,
    settlementResult,
    setTotalAmount,
    setPeopleCount,
    setRoundUp,
    shareUrl,
    reset,
    goToSettlement,
    backToCalculate,
    updateMemberPaid,
    updateMemberName,
    calculateFinalSettlement,
  }
}
