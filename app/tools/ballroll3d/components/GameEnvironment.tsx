"use client"

import { RigidBody, CuboidCollider } from "@react-three/rapier"

interface GameEnvironmentProps {
  platformDepth: number
  platformWidth: number
  edgeZ: number
  onFall: () => void
  onRestNearEdge: () => void
}

export function GameEnvironment({ platformDepth, platformWidth, edgeZ }: GameEnvironmentProps) {
  return (
    <group>
      {/* 発射台含む平台（原点→奥+Z に伸びる） */}
      <RigidBody type="fixed" name="platform">
        {/* 見た目の板 */}
        <mesh position={[0, 0, platformDepth / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[platformWidth, platformDepth]} />
          <meshStandardMaterial color="#9CA3AF" />
        </mesh>
        {/* 衝突用の薄い直方体コライダー */}
        <CuboidCollider args={[platformWidth / 2, 0.025, platformDepth / 2]} position={[0, 0, platformDepth / 2]} />
      </RigidBody>

      {/* エッジの目安（見た目だけ） */}
      <mesh position={[0, 0.02, edgeZ]} rotation={[-Math.PI / 2, 0, 0]}> 
        <planeGeometry args={[platformWidth, 0.2]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>

      {/* 背景用の広い地面（かなり下に配置） */}
      <RigidBody type="fixed" name="background-ground">
        <mesh position={[0, -5, platformDepth / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#6B7280" />
        </mesh>
      </RigidBody>

    </group>
  )
}


