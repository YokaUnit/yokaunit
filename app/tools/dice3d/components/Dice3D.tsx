"use client"

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { Vector3, Quaternion } from "three"
import { determineTopFace, isDiceAtRest, getRandomImpulse, getRandomTorque } from "../lib/dice-physics"
import type { DicePhysicsSettings } from "../lib/dice-physics"
import { DiceFace } from "./DiceFace"

interface Dice3DProps {
  id: number
  position: [number, number, number]
  color?: string
  physics: DicePhysicsSettings
  onRest?: (id: number, value: number) => void
  onRoll?: (id: number) => void
}

export interface Dice3DRef {
  roll: () => void
  reset: () => void
  getCurrentValue: () => number
  isRolling: () => boolean
}

export const Dice3D = forwardRef<Dice3DRef, Dice3DProps>(({
  id,
  position,
  color = "#ffffff",
  physics,
  onRest,
  onRoll,
}, ref) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [currentValue, setCurrentValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [restingFrames, setRestingFrames] = useState(0)
  const size = 0.8
  const initialPosition = useRef<[number, number, number]>([position[0], position[1], position[2]])

  useImperativeHandle(ref, () => ({
    roll: () => {
      if (!rigidBodyRef.current) return
      
      setIsRolling(true)
      setRestingFrames(0)
      onRoll?.(id)

      // ランダムな力と回転を適用
      const impulse = getRandomImpulse(physics.impulseStrength)
      const torque = getRandomTorque(physics.torqueStrength)
      
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.applyImpulse({ x: impulse[0], y: impulse[1], z: impulse[2] }, true)
      rigidBodyRef.current.applyTorqueImpulse({ x: torque[0], y: torque[1], z: torque[2] }, true)
    },
    
    reset: () => {
      if (!rigidBodyRef.current) return
      
      rigidBodyRef.current.setTranslation(
        { x: initialPosition.current[0], y: initialPosition.current[1], z: initialPosition.current[2] },
        true
      )
      rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      setIsRolling(false)
      setRestingFrames(0)
      setCurrentValue(1)
    },
    
    getCurrentValue: () => currentValue,
    isRolling: () => isRolling,
  }))

  // フレームごとの更新処理
  useFrame(() => {
    if (!rigidBodyRef.current) return

    // サイコロが重なりすぎている場合の分離処理
    const currentPos = rigidBodyRef.current.translation()
    if (currentPos.y < -0.5) {
      // 地面より下に落ちた場合は上に戻す
      rigidBodyRef.current.setTranslation({ 
        x: currentPos.x, 
        y: 2, 
        z: currentPos.z 
      }, true)
    }

    if (!isRolling) return

    const linearVel = rigidBodyRef.current.linvel()
    const angularVel = rigidBodyRef.current.angvel()
    
    const linearVelocity = new Vector3(linearVel.x, linearVel.y, linearVel.z)
    const angularVelocity = new Vector3(angularVel.x, angularVel.y, angularVel.z)

    if (isDiceAtRest(linearVelocity, angularVelocity)) {
      setRestingFrames(prev => prev + 1)
      
       // 早い判定で結果を確定
       if (restingFrames >= 10) {
        const rotation = rigidBodyRef.current.rotation()
        const quaternion = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w)
        const value = determineTopFace(quaternion)
        
        setCurrentValue(value)
        setIsRolling(false)
        setRestingFrames(0)
        onRest?.(id, value)
      }
    } else {
      setRestingFrames(0)
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="cuboid"
      restitution={physics.restitution}
      friction={physics.friction}
      mass={physics.mass}
      position={position}
      canSleep={false}
      ccd={true}
      type="dynamic"
      density={2.5} // 高密度で重いサイコロ
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />

        {/* チンチロ3Dと同じ面の配置 */}
        <DiceFace position={[0, 0, 0]} rotation={[0, 0, 0]} number={1} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} number={2} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} number={3} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} number={4} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} number={5} size={size} />
        <DiceFace position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} number={6} size={size} />
      </mesh>
    </RigidBody>
  )
})

Dice3D.displayName = "Dice3D"
