import { Tile, GRID_SIZE, CELL_SIZE, CELL_GAP } from './types'

export function addNewTile(board: Tile[]) {
  const emptyTiles = []
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!board.some((tile) => tile.row === row && tile.col === col)) {
        emptyTiles.push({ row, col })
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    board.push({
      value: Math.random() < 0.9 ? 2 : 4,
      id: `${row}-${col}-${Date.now()}`,
      row,
      col,
      isNew: true,
    })
  }
}

export function move(board: Tile[], direction: "up" | "down" | "left" | "right", score: number) {
  let newBoard = board.map((tile) => ({ ...tile, justMerged: false, isNew: false }))
  let changed = false
  let newScore = score

  const sortedTiles = [...newBoard].sort((a, b) => {
    if (direction === "up" || direction === "down") {
      return direction === "up" ? a.row - b.row : b.row - a.row
    } else {
      return direction === "left" ? a.col - b.col : b.col - a.col
    }
  })

  for (const tile of sortedTiles) {
    const { row, col } = tile
    let newRow = row
    let newCol = col

    while (true) {
      newRow += direction === "up" ? -1 : direction === "down" ? 1 : 0
      newCol += direction === "left" ? -1 : direction === "right" ? 1 : 0

      if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
        newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0
        newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0
        break
      }

      const targetTile = newBoard.find((t) => t.row === newRow && t.col === newCol)
      if (targetTile) {
        if (targetTile.value === tile.value && !targetTile.justMerged) {
          newBoard = newBoard.filter((t) => t !== targetTile && t !== tile)
          newBoard.push({
            value: tile.value * 2,
            id: tile.id,
            row: newRow,
            col: newCol,
            justMerged: true,
            isNew: false,
          })
          newScore += tile.value * 2
          changed = true
        } else {
          newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0
          newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0
        }
        break
      }
    }

    if (newRow !== row || newCol !== col) {
      changed = true
      tile.row = newRow
      tile.col = newCol
    }
  }

  if (changed) {
    addNewTile(newBoard)
  }

  return { board: newBoard, score: newScore, changed }
}

export function isGameOverState(board: Tile[]) {
  if (board.length < GRID_SIZE * GRID_SIZE) return false

  for (const tile of board) {
    const { row, col, value } = tile
    if (
      (row > 0 && board.some((t) => t.row === row - 1 && t.col === col && t.value === value)) ||
      (row < GRID_SIZE - 1 && board.some((t) => t.row === row + 1 && t.col === col && t.value === value)) ||
      (col > 0 && board.some((t) => t.row === row && t.col === col - 1 && t.value === value)) ||
      (col < GRID_SIZE - 1 && board.some((t) => t.row === row && t.col === col + 1 && t.value === value))
    ) {
      return false
    }
  }
  return true
}

export function cellColor(value: number) {
  switch (value) {
    case 2:
      return "bg-[#eee4da] text-[#776e65]"
    case 4:
      return "bg-[#ede0c8] text-[#776e65]"
    case 8:
      return "bg-[#f2b179] text-white"
    case 16:
      return "bg-[#f59563] text-white"
    case 32:
      return "bg-[#f67c5f] text-white"
    case 64:
      return "bg-[#f65e3b] text-white"
    case 128:
      return "bg-[#edcf72] text-white"
    case 256:
      return "bg-[#edcc61] text-white"
    case 512:
      return "bg-[#edc850] text-white"
    case 1024:
      return "bg-[#edc53f] text-white"
    case 2048:
      return "bg-[#edc22e] text-white"
    default:
      return "bg-[#cdc1b4]"
  }
}

export function generateColumns() {
  const columns = []
  for (let i = 0; i < 21; i++) {
    if (i < 26) {
      columns.push(String.fromCharCode(65 + i))
    } else {
      columns.push("A" + String.fromCharCode(65 + (i - 26)))
    }
  }
  return columns
}
