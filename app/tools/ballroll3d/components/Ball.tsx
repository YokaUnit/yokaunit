"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import { RigidBody, BallCollider, type RapierRigidBody } from "@react-three/rapier"

interface BallProps {
  position: [number, number, number]
  onPositionChange: (position: [number, number, number]) => void
  onLaunch: () => void
  onFall: () => void
  onRestNearEdge: () => void
  edgeZ: number
  resetTrigger: number
}

export function Ball({ position, onPositionChange, onLaunch, onFall, onRestNearEdge, edgeZ, resetTrigger }: BallProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [lastPosition, setLastPosition] = useState<[number, number, number]>(position)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null)
  const [restingFrames, setRestingFrames] = useState(0)
  const restingFramesRef = useRef(0)
  const radius = 0.5
  const reportedRef = useRef(false)
  const frameCountRef = useRef(0)

  useEffect(() => {
    if (resetTrigger && rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      setLastPosition(position)
    }
  }, [resetTrigger, position])

  useFrame(() => {
    if (!rigidBodyRef.current) return
    const t = rigidBodyRef.current.translation()
    const p: [number, number, number] = [t.x, t.y, t.z]
    frameCountRef.current = (frameCountRef.current + 1) % 3
    if (frameCountRef.current === 0) {
      if (Math.abs(p[0] - lastPosition[0]) > 0.01 || Math.abs(p[1] - lastPosition[1]) > 0.01 || Math.abs(p[2] - lastPosition[2]) > 0.01) {
        onPositionChange(p)
        setLastPosition(p)
      }
    }

    // 落下検出
    if (!reportedRef.current && t.y < -5) {
      reportedRef.current = true
      onFall()
    }

    // 停止検出→エッジ付近で止まったら確定
    const v = rigidBodyRef.current.linvel()
    const w = rigidBodyRef.current.angvel()
    const resting = Math.abs(v.x) < 0.02 && Math.abs(v.y) < 0.02 && Math.abs(v.z) < 0.02 && Math.abs(w.x) < 0.02 && Math.abs(w.y) < 0.02 && Math.abs(w.z) < 0.02
    if (resting) {
      const next = restingFramesRef.current + 1
      restingFramesRef.current = next
      setRestingFrames(next)
      if (!reportedRef.current && next > 12) {
        reportedRef.current = true
        onRestNearEdge()
      }
    } else if (restingFramesRef.current !== 0) {
      restingFramesRef.current = 0
      setRestingFrames(0)
    }
  })

  const onPointerDown = (e: any) => {
    e.stopPropagation()
    if (e.preventDefault) e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setDragCurrent({ x: e.clientX, y: e.clientY })
  }

  const onPointerMove = (e: any) => {
    if (!isDragging) return
    if (e.preventDefault) e.preventDefault()
    setDragCurrent({ x: e.clientX, y: e.clientY })
  }

  const onPointerUp = () => {
    if (!isDragging || !dragStart || !dragCurrent || !rigidBodyRef.current) {
      setIsDragging(false)
      setDragStart(null)
      setDragCurrent(null)
      return
    }

    // ドラッグ方向: 上方向にドラッグで前進（Z+）とする
    const dx = dragCurrent.x - dragStart.x
    const dy = dragCurrent.y - dragStart.y
    const length = Math.hypot(dx, dy)
    if (length > 2) {
      const power = length * 0.05 // 強めのスケール、上限なし
      const angle = Math.atan2(-dy, dx) // 画面座標基準
      const dirZ = Math.cos(angle)
      const dirX = Math.sin(angle)

      // 少し上向き + 前方へインパルス
      // @ts-ignore
      rigidBodyRef.current.wakeUp()
      // @ts-ignore
      rigidBodyRef.current.applyImpulse({ x: dirX * power, y: 0.05 * power, z: dirZ * power }, true)
      onLaunch()
    }

    setIsDragging(false)
    setDragStart(null)
    setDragCurrent(null)
  }

  // 外部トリガで発射（角度/パワー使用）
  // 外部ボタン発射は廃止。ドラッグでのみ発射。

  return (
    <RigidBody
      ref={rigidBodyRef}
      restitution={0.4}
      friction={0.7}
      gravityScale={1}
      ccd
      enabledTranslations={[true, true, true]}
      linearDamping={0.05}
      angularDamping={0.05}
      mass={1}
      position={position}
    >
      <BallCollider args={[radius]} />
      <mesh
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color="#2563EB" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* 大きめの透明ヒットエリア（ドラッグしやすく） */}
      <mesh
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <sphereGeometry args={[radius * 1.8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* ドラッグ中のエイミング矢印（高品質ライン+コーン） */}
      {isDragging && dragStart && dragCurrent && rigidBodyRef.current && (
        (() => {
          const t = rigidBodyRef.current.translation()
          const dx = dragCurrent.x - dragStart.x
          const dy = dragCurrent.y - dragStart.y
          const len = Math.hypot(dx, dy) // 無制限
          const angle = Math.atan2(-dy, dx)
          const dirX = Math.sin(angle)
          const dirZ = Math.cos(angle)
          const arrowLen = Math.min(12, 1 + len * 0.02) // 表示は最大長を設けて視認性確保
          const headLen = 0.7
          const shaftLen = Math.max(0.5, arrowLen - headLen)
          const rotY = Math.atan2(dirX, dirZ)

          return (
            <group position={[t.x, t.y + 0.1, t.z]} rotation={[0, rotY, 0]}>
              <Line
                points={[[0, 0, 0], [0, 0, shaftLen]]}
                color="#FBBF24"
                lineWidth={3}
                dashed={false}
              />
              <mesh position={[0, 0, shaftLen + headLen / 2]}>
                <coneGeometry args={[0.25, headLen, 24]} />
                <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} />
              </mesh>
            </group>
          )
        })()
      )}
    </RigidBody>
  )
}


