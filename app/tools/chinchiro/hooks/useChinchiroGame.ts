"use client"

import { useState, useCallback } from "react"
import { determineResult, type HistoryItem } from "../lib/chinchiro-logic"

export function useChinchiroGame() {
  const [rolling, setRolling] = useState(false)
  const [diceValues, setDiceValues] = useState([1, 1, 1])
  const [diceOutOfBowl, setDiceOutOfBowl] = useState([false, false, false])
  const [result, setResult] = useState("")
  const [resultClass, setResultClass] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [allDiceStopped, setAllDiceStopped] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [rollTrigger, setRollTrigger] = useState(0)
  const [continueMode, setContinueMode] = useState(false)

  const rollDice = useCallback(() => {
    setRolling(true)
    setResult("")
    setResultClass("")
    setAllDiceStopped(false)
    setDiceOutOfBowl([false, false, false])
    setRollTrigger((prev) => prev + 1)

    const newValues = [0, 0, 0]
    setDiceValues(newValues)

    // 最大10秒後に強制的に結果を表示
    setTimeout(() => {
      if (rolling && !allDiceStopped) {
        const randomValues = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ]
        setDiceValues(randomValues)
        handleAllDiceStopped(randomValues, [false, false, false])
      }
    }, 10000)
  }, [rolling, allDiceStopped])

  const resetDice = useCallback(() => {
    setRolling(false)
    setAllDiceStopped(false)
    setResetTrigger((prev) => prev + 1)
  }, [])

  const handleDiceRest = useCallback((index: number, value: number, outOfBowl: boolean) => {
    setDiceValues((prev) => {
      const newValues = [...prev]
      newValues[index] = value
      return newValues
    })

    setDiceOutOfBowl((prev) => {
      const newOutOfBowl = [...prev]
      newOutOfBowl[index] = outOfBowl
      return newOutOfBowl
    })

    setDiceValues((prevValues) => {
      setDiceOutOfBowl((prevOutOfBowl) => {
        const allStopped = prevValues.every((v) => v !== 0)

        if (allStopped) {
          handleAllDiceStopped(prevValues, prevOutOfBowl)
        }

        return prevOutOfBowl
      })

      return prevValues
    })
  }, [])

  const handleAllDiceStopped = useCallback(
    (values: number[], outOfBowl: boolean[]) => {
      if (allDiceStopped) return

      setAllDiceStopped(true)

      const gameResult = determineResult(values, outOfBowl)
      setResult(gameResult.message)
      setResultClass(gameResult.class)

      const historyItem: HistoryItem = {
        id: Date.now(),
        values: [...values],
        outOfBowl: [...outOfBowl],
        result: gameResult.message,
      }
      setHistory((prev) => [historyItem, ...prev].slice(0, 10))

      setTimeout(() => {
        setRolling(false)
      }, 500)
    },
    [allDiceStopped],
  )

  const shareGame = useCallback(() => {
    try {
      if (navigator.share) {
        navigator
          .share({
            title: "3Dチンチロサイコロゲーム - YokaUnit",
            text: "物理エンジンでリアルに転がる3Dチンチロサイコロゲームをチェックしてみてください！",
            url: window.location.href,
          })
          .catch((error) => {
            console.error("シェアに失敗しました:", error)
            fallbackShare()
          })
      } else {
        fallbackShare()
      }
    } catch (error) {
      console.error("シェア機能でエラーが発生しました:", error)
      fallbackShare()
    }
  }, [])

  const fallbackShare = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        // Success feedback could be added here
      })
      .catch((err) => {
        console.error("クリップボードへのコピーに失敗しました:", err)
      })
  }, [])

  return {
    // State
    rolling,
    diceValues,
    diceOutOfBowl,
    result,
    resultClass,
    history,
    soundEnabled,
    allDiceStopped,
    resetTrigger,
    rollTrigger,
    continueMode,

    // Actions
    rollDice,
    resetDice,
    handleDiceRest,
    shareGame,
    setSoundEnabled,
    setContinueMode,
  }
}
