"use client"

import { RigidBody } from "@react-three/rapier"

// 地面
export function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh receiveShadow position={[0, -1, 0]}>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </RigidBody>
  )
}

// 壁（サイコロが遠くに飛ばないように）
export function Walls() {
  return (
    <>
      {/* 前後の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 10]}>
          <boxGeometry args={[20, 4, 0.1]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, -10]}>
          <boxGeometry args={[20, 4, 0.1]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
      
      {/* 左右の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[10, 2, 0]}>
          <boxGeometry args={[0.1, 4, 20]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-10, 2, 0]}>
          <boxGeometry args={[0.1, 4, 20]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
    </>
  )
}

// 照明
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}