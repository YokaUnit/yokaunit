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

  const makeMove = useCallback((col: number) => {
    setGameState((prevState) => {
      if (prevState.status !== "playing") return prevState
      if (isColumnFull(prevState.board, col)) return prevState

      const newBoard = prevState.board.map((row) => [...row])
      const row = getNextEmptyRow(newBoard, col)

      if (row === -1) return prevState

      newBoard[row][col] = prevState.currentPlayer

      const winner = checkWinner(newBoard, row, col, prevState.currentPlayer)
      const boardFull = isBoardFull(newBoard)

      let newStatus: GameStatus = "playing"
      if (winner) {
        newStatus = prevState.currentPlayer === "red" ? "red-wins" : "yellow-wins"
      } else if (boardFull) {
        newStatus = "draw"
      }

      return {
        board: newBoard,
        currentPlayer: newStatus === "playing" ? (prevState.currentPlayer === "red" ? "yellow" : "red") : prevState.currentPlayer,
        status: newStatus,
        lastMove: { row, col },
      }
    })
  }, [])

  return {
    gameState,
    makeMove,
    resetGame,
  }
}

