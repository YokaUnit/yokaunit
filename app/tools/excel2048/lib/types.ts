export type Tile = {
  value: number
  id: string
  mergedFrom?: Tile[]
  justMerged?: boolean
  isNew?: boolean
  row: number
  col: number
}

export type GamePosition = {
  x: number
  y: number
}

export type GameSize = {
  width: number
  height: number
}

export type GameState = {
  board: Tile[]
  score: number
  bestScore: number
  isGameOver: boolean
  gameVisible: boolean
  gamePosition: GamePosition
  gameSize: GameSize
  isMinimized: boolean
  isDragging: boolean
  isResizing: boolean
  dragOffset: GamePosition
}

export const GRID_SIZE = 4
export const CELL_SIZE = 2.5
export const CELL_GAP = 0.2
