import { Vector3 } from "three"

// サイコロの物理設定
export interface DicePhysicsSettings {
  impulseStrength: number  // 投げる力の強さ
  torqueStrength: number   // 回転の強さ
  restitution: number      // 反発係数
  friction: number         // 摩擦係数
  mass: number            // 質量
}

// デフォルトの物理設定（チンチロ3D風、重いサイコロ）
export const DEFAULT_PHYSICS: DicePhysicsSettings = {
  impulseStrength: 6,      // 適度な投げる力
  torqueStrength: 8,       // 適度な回転力
  restitution: 0.1,        // 低い反発（チンチロ3D風）
  friction: 0.8,           // 高い摩擦で安定
  mass: 20,                // 重いサイコロ
}

// ランダムな力を生成
export function getRandomImpulse(strength: number): [number, number, number] {
  return [
    (Math.random() - 0.5) * strength,
    Math.random() * strength * 0.5 + strength * 0.5, // 上向きに偏らせる
    (Math.random() - 0.5) * strength,
  ]
}

// ランダムな回転力を生成
export function getRandomTorque(strength: number): [number, number, number] {
  return [
    (Math.random() - 0.5) * strength,
    (Math.random() - 0.5) * strength,
    (Math.random() - 0.5) * strength,
  ]
}

// サイコロの上面を判定
export function determineTopFace(rotation: any): number {
  // クォータニオンから回転行列を取得
  const rotationMatrix = new Vector3()
  
  // 各面の法線ベクトル（ローカル座標）
  const faces = [
    new Vector3(0, 1, 0),  // 上面 (1)
    new Vector3(0, -1, 0), // 下面 (6)
    new Vector3(1, 0, 0),  // 右面 (3)
    new Vector3(-1, 0, 0), // 左面 (4)
    new Vector3(0, 0, 1),  // 前面 (2)
    new Vector3(0, 0, -1), // 後面 (5)
  ]

  // 上向きのワールド座標ベクトル
  const up = new Vector3(0, 1, 0)
  
  let maxDot = -1
  let topFace = 1

  faces.forEach((face, index) => {
    // 面の法線をワールド座標に変換
    const worldNormal = face.clone().applyQuaternion(rotation)
    const dot = worldNormal.dot(up)
    
    if (dot > maxDot) {
      maxDot = dot
      // 面番号の対応: 0->1, 1->6, 2->3, 3->4, 4->2, 5->5
      const faceNumbers = [1, 6, 3, 4, 2, 5]
      topFace = faceNumbers[index]
    }
  })

  return topFace
}

// サイコロが静止しているかチェック
export function isDiceAtRest(linearVelocity: Vector3, angularVelocity: Vector3, threshold = 0.1): boolean {
  const linearSpeed = linearVelocity.length()
  const angularSpeed = angularVelocity.length()
  return linearSpeed < threshold && angularSpeed < threshold
}

// サイコロを中央付近に集めて配置（地面の上に）
export function getRandomSpawnPosition(index: number, totalDice: number): [number, number, number] {
  // 中央付近に集めて配置（地面の上に）
  const randomX = (Math.random() - 0.5) * 3 // -1.5 ~ 1.5の範囲
  const randomZ = (Math.random() - 0.5) * 3 // -1.5 ~ 1.5の範囲
  const height = -1 + Math.random() * 1 // -1 ~ 0の高さ（地面の上）
  
  return [randomX, height, randomZ]
}

// 統一されたサイコロ色（白で統一）
export function getDiceColor(index: number): string {
  return "#f8f9fa" // 統一された明るいグレー
}
