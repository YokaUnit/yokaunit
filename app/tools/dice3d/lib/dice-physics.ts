import { Vector3 } from "three"

// サイコロの物理設定
export interface DicePhysicsSettings {
  impulseStrength: number  // 投げる力の強さ
  torqueStrength: number   // 回転の強さ
  restitution: number      // 反発係数
  friction: number         // 摩擦係数
  mass: number            // 質量
}

// デフォルトの物理設定（チンチロ3D準拠）
export const DEFAULT_PHYSICS: DicePhysicsSettings = {
  impulseStrength: 3,      // 適度な投げる力
  torqueStrength: 1.5,     // 適度な回転力
  restitution: 0.1,        // 低い反発（チンチロ3D同様）
  friction: 0.8,           // 高い摩擦で安定
  mass: 10,                // チンチロ3D同様の重さ
}

// ランダムな力を生成（チンチロ3D準拠）
export function getRandomImpulse(strength: number = 3): [number, number, number] {
  return [
    (Math.random() - 0.5) * strength, // X方向
    Math.random() * strength + 2,     // Y方向（上向き）
    (Math.random() - 0.5) * strength, // Z方向
  ]
}

// ランダムな回転力を生成（チンチロ3D準拠）
export function getRandomTorque(strength: number = 1.5): [number, number, number] {
  return [
    (Math.random() - 0.5) * strength,
    (Math.random() - 0.5) * strength,
    (Math.random() - 0.5) * strength,
  ]
}

// サイコロの上面を判定（チンチロ3D準拠）
export function determineTopFace(rotation: any): number {
  if (!rotation) return 1

  const q = rotation

  // 四元数→回転行列
  const rotMatrix = [
    [1 - 2 * (q.y * q.y + q.z * q.z), 2 * (q.x * q.y - q.z * q.w), 2 * (q.x * q.z + q.y * q.w)],
    [2 * (q.x * q.y + q.z * q.w), 1 - 2 * (q.x * q.x + q.z * q.z), 2 * (q.y * q.z - q.x * q.w)],
    [2 * (q.x * q.z - q.y * q.w), 2 * (q.y * q.z + q.x * q.w), 1 - 2 * (q.x * q.x + q.y * q.y)],
  ]

  // 各面の法線ベクトル（チンチロ3D準拠）
  const normals = [
    { face: 4, normal: [0, 1, 0] },   // 上面
    { face: 2, normal: [1, 0, 0] },   // 右面
    { face: 1, normal: [0, 0, 1] },   // 前面
    { face: 6, normal: [0, 0, -1] },  // 後面
    { face: 5, normal: [-1, 0, 0] },  // 左面
    { face: 3, normal: [0, -1, 0] },  // 下面
  ]

  let maxDot = Number.NEGATIVE_INFINITY
  let resultFace = 1

  normals.forEach(({ face, normal }) => {
    // normal ベクトルに回転行列を掛ける
    const rotated = {
      x: rotMatrix[0][0] * normal[0] + rotMatrix[0][1] * normal[1] + rotMatrix[0][2] * normal[2],
      y: rotMatrix[1][0] * normal[0] + rotMatrix[1][1] * normal[1] + rotMatrix[1][2] * normal[2],
      z: rotMatrix[2][0] * normal[0] + rotMatrix[2][1] * normal[1] + rotMatrix[2][2] * normal[2],
    }

    // 上方向(Y軸正方向)との内積
    const dot = rotated.y

    if (dot > maxDot) {
      maxDot = dot
      resultFace = face
    }
  })

  return resultFace
}

// サイコロが静止しているかチェック（チンチロ3D準拠）
export function isDiceAtRest(linearVel: any, angularVel: any): boolean {
  return (
    Math.abs(linearVel.x) < 0.01 &&
    Math.abs(linearVel.y) < 0.01 &&
    Math.abs(linearVel.z) < 0.01 &&
    Math.abs(angularVel.x) < 0.01 &&
    Math.abs(angularVel.y) < 0.01 &&
    Math.abs(angularVel.z) < 0.01
  )
}

// サイコロの初期位置を生成（チンチロ3D準拠：地面に配置）
export function getRandomSpawnPosition(index: number, totalDice: number): [number, number, number] {
  const gridSize = Math.ceil(Math.sqrt(totalDice))
  const row = Math.floor(index / gridSize)
  const col = index % gridSize
  
  // グリッド配置に少しランダム性を加える（地面に配置）
  const x = (col - (gridSize - 1) / 2) * 1.5 + (Math.random() - 0.5) * 0.5
  const z = (row - (gridSize - 1) / 2) * 1.5 + (Math.random() - 0.5) * 0.5
  const y = 0.5 // 地面の少し上に配置
  
  return [x, y, z]
}

// サイコロの色を生成
export function getDiceColor(index: number): string {
  const colors = [
    "#ffffff", // 白
    "#f8f9fa", // 薄いグレー
    "#e9ecef", // グレー
    "#dee2e6", // 濃いグレー
    "#ced4da", // より濃いグレー
  ]
  return colors[index % colors.length]
}

// 範囲外判定
export function isOutOfBounds(position: any): boolean {
  if (!position) return false
  
  return (
    Math.abs(position.x) > 15 ||
    Math.abs(position.z) > 15 ||
    position.y < -5
  )
}