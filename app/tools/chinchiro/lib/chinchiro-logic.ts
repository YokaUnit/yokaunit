// チンチロゲームのロジック

export interface GameResult {
  message: string
  win: boolean
  class: string
}

export interface HistoryItem {
  id: number
  values: number[]
  outOfBowl: boolean[]
  result: string
}

// 結果の判定
export function determineResult(values: number[], outOfBowl: boolean[]): GameResult {
  // サイコロが器から出ていないか確認
  if (outOfBowl.some((out) => out)) {
    return { message: "しょんべん！（サイコロが器から出ました）", win: false, class: "text-gray-500" }
  }

  // ソートして判定しやすくする
  const sorted = [...values].sort()

  // ピンゾロ (1, 1, 1)
  if (sorted[0] === 1 && sorted[1] === 1 && sorted[2] === 1) {
    return { message: "ピンゾロ！", win: true, class: "text-red-500 font-bold" }
  }

  // ゾロ目 (同じ数字が3つ)
  if (sorted[0] === sorted[1] && sorted[1] === sorted[2]) {
    return { message: `${sorted[0]}のゾロ目！`, win: true, class: "text-blue-500 font-bold" }
  }

  // シゴロ (4, 5, 6)
  if (sorted[0] === 4 && sorted[1] === 5 && sorted[2] === 6) {
    return { message: "シゴロ！", win: true, class: "text-green-500 font-bold" }
  }

  // 通常の目 (同じ数字が2つ)
  if (sorted[0] === sorted[1] || sorted[1] === sorted[2]) {
    let value
    if (sorted[0] === sorted[1]) {
      value = sorted[2]
    } else {
      value = sorted[0]
    }
    return { message: `${value}の目`, win: true, class: "text-yellow-500" }
  }

  // ヒフミ (1, 2, 3)
  if (sorted[0] === 1 && sorted[1] === 2 && sorted[2] === 3) {
    return { message: "ヒフミ...", win: false, class: "text-gray-500" }
  }

  // ブタ (出目がバラバラで、ヒフミでもシゴロでもない)
  return { message: "ブタ...", win: false, class: "text-gray-500" }
}

// ランダムな力とトルクを生成
export function getRandomImpulse(): [number, number, number] {
  return [
    Math.random() * 2 - 1, // X方向の力をランダム
    Math.random() * 3 + 4, // Y方向の力を適度に
    Math.random() * 2 - 1, // Z方向の力をランダム
  ]
}

export function getRandomTorque(): [number, number, number] {
  return [
    (Math.random() - 0.5) * 1.5, // X: 回転をランダムに
    (Math.random() - 0.5) * 1.5, // Y: 回転をランダムに
    (Math.random() - 0.5) * 1.5, // Z: 回転をランダムに
  ]
}

// サイコロの上面を判定する関数
export function determineTopFace(rotation: any): number {
  if (!rotation) return 1

  const q = rotation

  // 四元数→ 回転行列
  const rotMatrix = [
    [1 - 2 * (q.y * q.y + q.z * q.z), 2 * (q.x * q.y - q.z * q.w), 2 * (q.x * q.z + q.y * q.w)],
    [2 * (q.x * q.y + q.z * q.w), 1 - 2 * (q.x * q.x + q.z * q.z), 2 * (q.y * q.z - q.x * q.w)],
    [2 * (q.x * q.z - q.y * q.w), 2 * (q.y * q.z + q.x * q.w), 1 - 2 * (q.x * q.x + q.y * q.y)],
  ]

  // 各面の法線ベクトル（初期状態での方向）
  const normals = [
    { face: 4, normal: [0, 1, 0] }, // 上面
    { face: 2, normal: [1, 0, 0] }, // 右面
    { face: 1, normal: [0, 0, 1] }, // 前面
    { face: 6, normal: [0, 0, -1] }, // 後面
    { face: 5, normal: [-1, 0, 0] }, // 左面
    { face: 3, normal: [0, -1, 0] }, // 下面
  ]

  let maxDot = Number.NEGATIVE_INFINITY
  let resultFace = 1

  normals.forEach(({ face, normal }) => {
    // normal ベクトルに回転行列を掛ける（回転させる）
    const rotated = {
      x: rotMatrix[0][0] * normal[0] + rotMatrix[0][1] * normal[1] + rotMatrix[0][2] * normal[2],
      y: rotMatrix[1][0] * normal[0] + rotMatrix[1][1] * normal[1] + rotMatrix[1][2] * normal[2],
      z: rotMatrix[2][0] * normal[0] + rotMatrix[2][1] * normal[1] + rotMatrix[2][2] * normal[2],
    }

    //上方向(Y軸正方向)との内積を見る
    const dot = rotated.y

    if (dot > maxDot) {
      maxDot = dot
      resultFace = face
    }
  })

  return resultFace
}

// サイコロが器の外に出たかチェック
export function isOutOfBowl(position: any): boolean {
  if (!position) return false

  // 器の範囲を定義（中心が(0, -0.5, 0)で、サイズが(8, 1, 8)の箱）
  const bowlMinX = -3.5
  const bowlMaxX = 3.5
  const bowlMinZ = -3.5
  const bowlMaxZ = 3.5
  const bowlMinY = -1.0 // 器の底面より少し下

  return (
    position.x < bowlMinX ||
    position.x > bowlMaxX ||
    position.z < bowlMinZ ||
    position.z > bowlMaxZ ||
    position.y < bowlMinY
  )
}
