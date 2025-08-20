"use client"

import { useState, useEffect, useCallback } from 'react'
import { Tile, GameState, GRID_SIZE } from '../lib/types'
import { addNewTile, move, isGameOverState } from '../lib/game-logic'

export function useExcel2048Game() {
  const [gameVisible, setGameVisible] = useState(false)
  const [gamePosition, setGamePosition] = useState({ x: 300, y: 200 })
  const [gameSize, setGameSize] = useState({ width: 220, height: 280 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 2048 Game State
  const [board, setBoard] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    if (gameVisible && board.length === 0) {
      initializeGame()
    }
    const storedBestScore = localStorage.getItem("excel-2048-bestScore")
    if (storedBestScore) setBestScore(Number.parseInt(storedBestScore))
  }, [gameVisible])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("excel-2048-bestScore", score.toString())
    }
  }, [score, bestScore])

  const initializeGame = useCallback(() => {
    const newBoard: Tile[] = []
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setIsGameOver(false)
  }, [])

  const moveBoard = useCallback((direction: "up" | "down" | "left" | "right") => {
    if (isGameOver) return

    const result = move(board, direction, score)
    
    if (result.changed) {
      setBoard(result.board)
      setScore(result.score)
      if (isGameOverState(result.board)) {
        setIsGameOver(true)
      }
    } else if (isGameOverState(result.board)) {
      setIsGameOver(true)
    }
  }, [board, score, isGameOver])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!gameVisible) return

      // ESCキーで最小化/復元をトグル
      if (e.key === "Escape") {
        e.preventDefault()
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          setIsMinimized(!isMinimized)
        }
        return
      }

      // Fキーで全画面切り替え
      if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        setIsFullscreen(!isFullscreen)
        return
      }

      // 最小化中は矢印キーを無効化
      if (isMinimized) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          moveBoard("up")
          break
        case "ArrowDown":
          e.preventDefault()
          moveBoard("down")
          break
        case "ArrowLeft":
          e.preventDefault()
          moveBoard("left")
          break
        case "ArrowRight":
          e.preventDefault()
          moveBoard("right")
          break
      }
    },
    [gameVisible, isMinimized, isFullscreen, moveBoard],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const openGame = useCallback(() => {
    setGameVisible(true)
    setIsMinimized(false)
  }, [])

  const closeGame = useCallback(() => {
    setGameVisible(false)
    setBoard([])
  }, [])

  const minimizeGame = useCallback(() => {
    setIsMinimized(!isMinimized)
  }, [isMinimized])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isResizing) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - gamePosition.x,
      y: e.clientY - gamePosition.y,
    })
  }, [isResizing, gamePosition])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setGamePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    },
    [isDragging, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  // Resize handler
  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)

    const handleResizeMove = (e: MouseEvent) => {
      const newWidth = Math.max(180, e.clientX - gamePosition.x)
      const newHeight = Math.max(220, e.clientY - gamePosition.y)
      setGameSize({ width: newWidth, height: newHeight })
    }

    const handleResizeUp = () => {
      setIsResizing(false)
      window.removeEventListener("mousemove", handleResizeMove)
      window.removeEventListener("mouseup", handleResizeUp)
    }

    window.addEventListener("mousemove", handleResizeMove)
    window.addEventListener("mouseup", handleResizeUp)
  }, [gamePosition])

  return {
    // Game state
    board,
    score,
    bestScore,
    isGameOver,
    gameVisible,
    gamePosition,
    gameSize,
    isMinimized,
    isDragging,
    isResizing,
    isFullscreen,
    
    // Actions
    initializeGame,
    openGame,
    closeGame,
    minimizeGame,
    toggleFullscreen,
    handleMouseDown,
    handleResizeMouseDown,
  }
}
