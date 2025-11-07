"use client"

import { useState, useCallback } from "react"
import { createEmptyBoard, checkWinner, isColumnFull, getNextEmptyRow, isBoardFull, type Player, type Board } from "../lib/game-logic"

export type GameStatus = "playing" | "red-wins" | "yellow-wins" | "draw"

interface GameState {
  board: Board
  currentPlayer: Player
  status: GameStatus
  lastMove: { row: number; col: number } | null
}

export function useConnect4Game() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: "red",
    status: "playing",
    lastMove: null,
  })

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: "red",
      status: "playing",
      lastMove: null,
    })
  }, [])

  const makeMove = useCallback(
    (col: number) => {
      if (gameState.status !== "playing") return false
      if (isColumnFull(gameState.board, col)) return false

      const newBoard = gameState.board.map((row) => [...row])
      const row = getNextEmptyRow(newBoard, col)

      if (row === -1) return false

      newBoard[row][col] = gameState.currentPlayer

      const winner = checkWinner(newBoard, row, col, gameState.currentPlayer)
      const boardFull = isBoardFull(newBoard)

      let newStatus: GameStatus = "playing"
      if (winner) {
        newStatus = gameState.currentPlayer === "red" ? "red-wins" : "yellow-wins"
      } else if (boardFull) {
        newStatus = "draw"
      }

      setGameState({
        board: newBoard,
        currentPlayer: newStatus === "playing" ? (gameState.currentPlayer === "red" ? "yellow" : "red") : gameState.currentPlayer,
        status: newStatus,
        lastMove: { row, col },
      })

      return true
    },
    [gameState]
  )

  return {
    gameState,
    makeMove,
    resetGame,
  }
}

