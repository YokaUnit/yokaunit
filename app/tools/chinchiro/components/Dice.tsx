"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { DiceFace } from "./DiceFace"
import { determineTopFace, isOutOfBowl, getRandomImpulse, getRandomTorque } from "../lib/chinchiro-logic"

interface DiceProps {
  index: number
  position: [number, number, number]
  rolling: boolean
  onRest: (index: number, value: number, outOfBowl: boolean) => void
  color?: string
  resetPosition: number
  continueFromCurrent: boolean
  rollTrigger: number
}

export function Dice({
  index,
  position,
  rolling,
  onRest,
  color = "#ffffff",
  resetPosition,
  continueFromCurrent,
  rollTrigger,
}: DiceProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [rested, setRested] = useState(false)
  const [topFace, setTopFace] = useState(1)
  const [restingFrameCount, setRestingFrameCount] = useState(0)
  const size = 0.8

  const initialPosition: [number, number, number] = [position[0], 0.5, position[2]]

  useEffect(() => {
    if (resetPosition && rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation({
        x: initialPosition[0],
        y: 0.5,
        z: initialPosition[2],
      }, true)
      rigidBodyRef.current.setRotation({ x: Math.random(), y: Math.random(), z: Math.random(), w: Math.random() }, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      setRested(false)
      setRestingFrameCount(0)
    }
  }, [resetPosition])

  useEffect(() => {
    if (rolling && rigidBodyRef.current) {
      if (!continueFromCurrent) {
        rigidBodyRef.current.setTranslation({
          x: initialPosition[0],
          y: 0.5,
          z: initialPosition[2],
        }, true)
        rigidBodyRef.current.setRotation({ x: Math.random(), y: Math.random(), z: Math.random(), w: Math.random() }, true)
      } else {
        const currentPos = rigidBodyRef.current.translation()
        rigidBodyRef.current.setTranslation({
          x: currentPos.x,
          y: currentPos.y + 0.1,
          z: currentPos.z,
        }, true)
      }

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)

      setTimeout(() => {
        if (rigidBodyRef.current) {
          const impulse = getRandomImpulse()
          const torque = getRandomTorque()

          // @ts-ignore - Rapier API compatibility
          rigidBodyRef.current.applyImpulse({
            x: impulse[0],
            y: impulse[1],
            z: impulse[2],
          })
          // @ts-ignore - Rapier API compatibility  
          rigidBodyRef.current.applyTorqueImpulse({
            x: torque[0],
            y: torque[1],
            z: torque[2],
          })
        }
      }, 10)

      setRested(false)
      setRestingFrameCount(0)
    }
  }, [rollTrigger])

  useFrame(() => {
    if (rolling && !rested && rigidBodyRef.current) {
      const vel = rigidBodyRef.current.linvel()
      const angVel = rigidBodyRef.current.angvel()

      // より厳密な停止判定（閾値を小さく）
      const isResting =
        Math.abs(vel.x) < 0.01 &&
        Math.abs(vel.y) < 0.01 &&
        Math.abs(vel.z) < 0.01 &&
        Math.abs(angVel.x) < 0.01 &&
        Math.abs(angVel.y) < 0.01 &&
        Math.abs(angVel.z) < 0.01

      if (isResting) {
        // 連続して10フレーム停止状態を確認してから判定（約0.16秒）
        setRestingFrameCount(prev => prev + 1)
        
        if (restingFrameCount >= 10) {
          const face = determineTopFace(rigidBodyRef.current.rotation())
          setTopFace(face)
          setRested(true)

          const outOfBowl = isOutOfBowl(rigidBodyRef.current.translation())
          onRest(index, face, outOfBowl)
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
      restitution={0.1}
      friction={0.8}
      mass={10}
      position={initialPosition}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />

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
