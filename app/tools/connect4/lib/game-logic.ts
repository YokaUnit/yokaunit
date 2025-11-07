export type Player = "red" | "yellow" | null
export type Board = Player[][]

const ROWS = 6
const COLS = 7

export function createEmptyBoard(): Board {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null))
}

export function checkWinner(board: Board, row: number, col: number, player: Player): boolean {
  if (!player) return false

  // 横方向
  let count = 1
  // 左
  for (let c = col - 1; c >= 0 && board[row][c] === player; c--) {
    count++
  }
  // 右
  for (let c = col + 1; c < COLS && board[row][c] === player; c++) {
    count++
  }
  if (count >= 4) return true

  // 縦方向
  count = 1
  // 上
  for (let r = row - 1; r >= 0 && board[r][col] === player; r--) {
    count++
  }
  // 下
  for (let r = row + 1; r < ROWS && board[r][col] === player; r++) {
    count++
  }
  if (count >= 4) return true

  // 斜め（左上から右下）
  count = 1
  // 左上
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0 && board[r][c] === player; r--, c--) {
    count++
  }
  // 右下
  for (let r = row + 1, c = col + 1; r < ROWS && c < COLS && board[r][c] === player; r++, c++) {
    count++
  }
  if (count >= 4) return true

  // 斜め（右上から左下）
  count = 1
  // 右上
  for (let r = row - 1, c = col + 1; r >= 0 && c < COLS && board[r][c] === player; r--, c++) {
    count++
  }
  // 左下
  for (let r = row + 1, c = col - 1; r < ROWS && c >= 0 && board[r][c] === player; r++, c--) {
    count++
  }
  if (count >= 4) return true

  return false
}

export function isColumnFull(board: Board, col: number): boolean {
  return board[0][col] !== null
}

export function getNextEmptyRow(board: Board, col: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row
    }
  }
  return -1
}

export function isBoardFull(board: Board): boolean {
  for (let col = 0; col < COLS; col++) {
    if (!isColumnFull(board, col)) {
      return false
    }
  }
  return true
}

