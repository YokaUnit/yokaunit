import { RigidBody } from "@react-three/rapier"

// 机コンポーネント
export function Table() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </RigidBody>
  )
}

// 器コンポーネント
export function Bowl() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[8, 1, 8]} />
        <meshStandardMaterial color="#E6B17E" />
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[7.5, 1, 7.5]} />
          <meshStandardMaterial color="#F7D9B5" />
        </mesh>
      </mesh>
    </RigidBody>
  )
}

// 壁のコンポーネント
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
