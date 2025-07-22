"use client"

import { useBombCardGame } from "./hooks/useBombCardGame"
import { GameSetup } from "./components/GameSetup"
import { GameBoard } from "./components/GameBoard"

export function BombCardGameClient() {
  const {
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
  } = useBombCardGame()

  if (gameState.gamePhase === "setup") {
    return (
      <GameSetup
        cardCount={cardCount}
        setCardCount={setCardCount}
        minCards={MIN_CARDS}
        maxCards={MAX_CARDS}
        onStartGame={startGame}
      />
    )
  }

  return (
    <GameBoard
      gameState={gameState}
      cardCount={cardCount}
      setCardCount={setCardCount}
      maxCards={MAX_CARDS}
      minCards={MIN_CARDS}
      onSelectCard={selectCard}
      onResetGame={resetGame}
      onPlayAgain={playAgain}
      onResetCardCount={resetCardCount}
    />
  )
}
