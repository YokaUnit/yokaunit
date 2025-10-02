"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { DiceFace } from "./DiceFace"
import { determineTopFace, isDiceAtRest, getRandomImpulse, getRandomTorque, isOutOfBounds } from "../lib/dice-physics"
import type { DicePhysicsSettings } from "../lib/dice-physics"

interface Dice3DProps {
  index: number
  position: [number, number, number]
  rolling: boolean
  onRest: (index: number, value: number) => void
  color?: string
  resetTrigger: number
  rollTrigger: number
  physics: DicePhysicsSettings
}

export function Dice3D({
  index,
  position,
  rolling,
  onRest,
  color = "#ffffff",
  resetTrigger,
  rollTrigger,
  physics,
}: Dice3DProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [topFace, setTopFace] = useState(1)
  const [rested, setRested] = useState(false)
  const [restingFrameCount, setRestingFrameCount] = useState(0)
  const size = 0.8
  const initialPosition = position

  // リセット処理
  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] }, true)
      rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      setRested(false)
      setRestingFrameCount(0)
      setTopFace(1)
    }
  }, [resetTrigger, initialPosition])

  // ロール処理
  useEffect(() => {
    if (rollTrigger > 0 && rigidBodyRef.current && !rested) {
      // 初期位置にリセット
      rigidBodyRef.current.setTranslation({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] }, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)

      // 即座に力を適用（遅延を削除）
      setTimeout(() => {
        if (rigidBodyRef.current) {
          const impulse = getRandomImpulse(physics.impulseStrength)
          const torque = getRandomTorque(physics.torqueStrength)
          
          rigidBodyRef.current.applyImpulse({ x: impulse[0], y: impulse[1], z: impulse[2] }, true)
          rigidBodyRef.current.applyTorqueImpulse({ x: torque[0], y: torque[1], z: torque[2] }, true)
        }
      }, 50) // 遅延を100ms→50msに短縮
    }
  }, [rollTrigger, physics, initialPosition, rested])

  // フレームごとの更新処理（チンチロ3D準拠）
  useFrame(() => {
    if (rolling && !rested && rigidBodyRef.current) {
      // 範囲外チェック
      const currentPos = rigidBodyRef.current.translation()
      if (isOutOfBounds(currentPos)) {
        rigidBodyRef.current.setTranslation({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] }, true)
        rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
        rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
        return
      }

      const vel = rigidBodyRef.current.linvel()
      const angVel = rigidBodyRef.current.angvel()

      // 高速化された停止判定
      const isResting = isDiceAtRest(vel, angVel)

      if (isResting) {
        // 連続して5フレーム停止状態を確認してから判定（高速化）
        setRestingFrameCount(prev => prev + 1)
        
        if (restingFrameCount >= 5) {
          const face = determineTopFace(rigidBodyRef.current.rotation())
          setTopFace(face)
          setRested(true)
          onRest(index, face)
        }
      } else {
        // 停止していない場合はカウンターをリセット
        setRestingFrameCount(0)
      }
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="cuboid"
      restitution={physics.restitution}
      friction={physics.friction}
      mass={physics.mass}
      position={initialPosition}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />

        {/* チンチロ3D準拠の面配置 */}
        <DiceFace position={[0, 0, 0]} rotation={[0, 0, 0]} number={1} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} number={2} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} number={3} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} number={4} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} number={5} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} number={6} size={size} />
      </mesh>
    </RigidBody>
  )
}