import { RigidBody } from "@react-three/rapier"

// 地面コンポーネント（チンチロ3D風のテーブル）
export function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </RigidBody>
  )
}

// 壁コンポーネント（チンチロ3D風）
export function Walls() {
  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-4, 0, 0]} receiveShadow>
          <boxGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#D4A76A" transparent opacity={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[4, 0, 0]} receiveShadow>
          <boxGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#D4A76A" transparent opacity={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, -4]} receiveShadow>
          <boxGeometry args={[8, 2, 0.5]} />
          <meshStandardMaterial color="#D4A76A" transparent opacity={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, 4]} receiveShadow>
          <boxGeometry args={[8, 2, 0.5]} />
          <meshStandardMaterial color="#D4A76A" transparent opacity={0.7} />
        </mesh>
      </RigidBody>
    </>
  )
}

// 照明コンポーネント（不要 - メインの照明を使用）
export function Lighting() {
  return null
}
