"use client"

import { useState, useCallback } from "react"

export interface Player {
  name: string
  remainingCards: number
  isEliminated: boolean
  previousCards?: number
}

export interface GameState {
  gamePhase: "setup" | "playing" | "finished"
  players: Player[]
  currentPlayerIndex: number
  bombIndex: number
  selectedCardIndex: number | null
  winner: string | null
  isCardFlipped: boolean
  isBombCard: boolean
  showCardReduction: boolean
}

export function useBombCardGame() {
  const MIN_CARDS = 2
  const MAX_CARDS = 12

  const [cardCount, setCardCount] = useState(8)
  const [gameState, setGameState] = useState<GameState>({
    gamePhase: "setup",
    players: [],
    currentPlayerIndex: 0,
    bombIndex: -1,
    selectedCardIndex: null,
    winner: null,
    isCardFlipped: false,
    isBombCard: false,
    showCardReduction: false,
  })

  const generateBombIndex = useCallback((cardCount: number) => {
    return Math.floor(Math.random() * cardCount)
  }, [])

  const startGame = useCallback(
    (playerNames: string[]) => {
      if (playerNames.length < 2 || cardCount < MIN_CARDS || cardCount > MAX_CARDS) return

      const players: Player[] = playerNames.map((name) => ({
        name: name.trim(),
        remainingCards: cardCount,
        isEliminated: false,
      }))

      setGameState({
        gamePhase: "playing",
        players,
        currentPlayerIndex: 0,
        bombIndex: generateBombIndex(cardCount),
        selectedCardIndex: null,
        winner: null,
        isCardFlipped: false,
        isBombCard: false,
        showCardReduction: false,
      })
    },
    [cardCount, generateBombIndex, MIN_CARDS, MAX_CARDS],
  )

  const selectCard = useCallback(
    (cardIndex: number) => {
      // ゲーム中でない、または既にカードが選択されている場合は何もしない
      if (gameState.gamePhase !== "playing" || gameState.selectedCardIndex !== null) {
        return
      }

      const isBomb = cardIndex === gameState.bombIndex

      // 1. カードを選択してフリップ開始
      setGameState((prev) => ({
        ...prev,
        selectedCardIndex: cardIndex,
        isCardFlipped: true,
        isBombCard: isBomb,
      }))

      // 2. 2秒後に結果処理
      setTimeout(() => {
        setGameState((prev) => {
          const newPlayers = [...prev.players]
          const currentPlayer = newPlayers[prev.currentPlayerIndex]

          if (isBomb) {
            // 爆弾カードの場合
            currentPlayer.previousCards = currentPlayer.remainingCards
            currentPlayer.remainingCards = Math.max(0, currentPlayer.remainingCards - 1)

            if (currentPlayer.remainingCards === 0) {
              currentPlayer.isEliminated = true
            }

            // カード減少アニメーションを表示
            return {
              ...prev,
              players: newPlayers,
              showCardReduction: true,
            }
          } else {
            // セーフカードの場合は直接次のターンへ
            return processNextTurn(prev, newPlayers)
          }
        })

        // 3. 爆弾カードの場合、さらに2秒後に次のターンへ
        if (isBomb) {
          setTimeout(() => {
            setGameState((prev) => processNextTurn(prev, prev.players))
          }, 2000)
        }
      }, 2000)
    },
    [gameState.gamePhase, gameState.selectedCardIndex, gameState.bombIndex, generateBombIndex],
  )

  const processNextTurn = useCallback(
    (prevState: GameState, players: Player[]) => {
      // 生き残りプレイヤーをチェック
      const activePlayers = players.filter((p) => !p.isEliminated)

      // 1人以下になったらゲーム終了状態にする（自動リセットしない）
      if (activePlayers.length <= 1) {
        return {
          ...prevState,
          gamePhase: "finished" as const,
          players,
          winner: activePlayers[0]?.name || null,
          selectedCardIndex: null,
          isCardFlipped: false,
          showCardReduction: false,
        }
      }

      // 次のプレイヤーを決定
      let nextPlayerIndex = (prevState.currentPlayerIndex + 1) % players.length
      while (players[nextPlayerIndex].isEliminated) {
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length
      }

      const nextPlayer = players[nextPlayerIndex]
      const newBombIndex = generateBombIndex(nextPlayer.remainingCards)

      return {
        ...prevState,
        gamePhase: "playing" as const,
        players,
        currentPlayerIndex: nextPlayerIndex,
        bombIndex: newBombIndex,
        selectedCardIndex: null,
        isCardFlipped: false,
        isBombCard: false,
        showCardReduction: false,
      }
    },
    [generateBombIndex],
  )

  const resetGame = useCallback(() => {
    setGameState({
      gamePhase: "setup",
      players: [],
      currentPlayerIndex: 0,
      bombIndex: -1,
      selectedCardIndex: null,
      winner: null,
      isCardFlipped: false,
      isBombCard: false,
      showCardReduction: false,
    })
  }, [])

  const playAgain = useCallback(() => {
    const resetPlayers = gameState.players.map((player) => ({
      ...player,
      remainingCards: cardCount,
      isEliminated: false,
      previousCards: undefined,
    }))

    setGameState({
      gamePhase: "playing",
      players: resetPlayers,
      currentPlayerIndex: 0,
      bombIndex: generateBombIndex(cardCount),
      selectedCardIndex: null,
      winner: null,
      isCardFlipped: false,
      isBombCard: false,
      showCardReduction: false,
    })
  }, [gameState.players, cardCount, generateBombIndex])

  const resetCardCount = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) => ({
        ...player,
        remainingCards: cardCount,
        isEliminated: false,
        previousCards: undefined,
      })),
      currentPlayerIndex: 0,
      bombIndex: generateBombIndex(cardCount),
      selectedCardIndex: null,
      winner: null,
      gamePhase: "playing",
      isCardFlipped: false,
      isBombCard: false,
      showCardReduction: false,
    }))
  }, [cardCount, generateBombIndex])

  return {
    gameState,
    cardCount,
    setCardCount,
    MIN_CARDS,
    MAX_CARDS,
    startGame,
    selectCard,
    resetGame,
    playAgain,
    resetCardCount,
  }
}
