"use client"

import { RigidBody, CuboidCollider } from "@react-three/rapier"
import { Edges } from "@react-three/drei"

const SURFACE_SIZE = 20
const WALL_HEIGHT = 3.8
const WALL_THICKNESS = 0.45
const BASE_THICKNESS = 0.35
const FLOOR_THICKNESS = 0.05
const FLOOR_ELEVATION = -FLOOR_THICKNESS / 2
const BASE_ELEVATION = -(FLOOR_THICKNESS + BASE_THICKNESS / 2)
const COLLIDER_HEIGHT = BASE_THICKNESS + FLOOR_THICKNESS
const COLLIDER_OFFSET = -COLLIDER_HEIGHT / 2

// 地面
export function Ground() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider
        args={[SURFACE_SIZE / 2, COLLIDER_HEIGHT / 2, SURFACE_SIZE / 2]}
        position={[0, COLLIDER_OFFSET, 0]}
      />
      {/* ベースプレート */}
      <mesh receiveShadow position={[0, BASE_ELEVATION, 0]}>
        <boxGeometry args={[SURFACE_SIZE + 1.2, BASE_THICKNESS, SURFACE_SIZE + 1.2]} />
        <meshStandardMaterial color="#c38f52" roughness={0.9} metalness={0.04} />
        <Edges color="#9c6e33" />
      </mesh>

      {/* プレイフロア */}
      <mesh receiveShadow position={[0, FLOOR_ELEVATION, 0]}>
        <boxGeometry args={[SURFACE_SIZE, FLOOR_THICKNESS, SURFACE_SIZE]} />
        <meshStandardMaterial color="#d8aa68" roughness={0.85} metalness={0.05} />
        <Edges color="#b68647" />
      </mesh>

      {/* インナーパネル */}
      <mesh receiveShadow position={[0, FLOOR_ELEVATION + 0.005, 0]}>
        <boxGeometry args={[SURFACE_SIZE - 1, FLOOR_THICKNESS * 0.5, SURFACE_SIZE - 1]} />
        <meshStandardMaterial color="#f0c98a" roughness={0.8} metalness={0.04} />
      </mesh>
    </RigidBody>
  )
}

// 壁（サイコロが遠くに飛ばないように）
export function Walls() {
  const wallMaterialProps = {
    roughness: 0.6,
    metalness: 0.1,
    color: "#deb271",
  }

  const edgeColor = "#b68647"
  const capMaterialProps = {
    color: "#f1c27d",
    roughness: 0.55,
    metalness: 0.08,
  }

  return (
    <>
      {/* 前後の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, WALL_HEIGHT / 2, SURFACE_SIZE / 2]}>
          <boxGeometry args={[SURFACE_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial {...wallMaterialProps} />
          <Edges color={edgeColor} />
        </mesh>
        <mesh position={[0, WALL_HEIGHT - 0.25, SURFACE_SIZE / 2]}>
          <boxGeometry args={[SURFACE_SIZE, 0.5, WALL_THICKNESS + 0.1]} />
          <meshStandardMaterial {...capMaterialProps} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, WALL_HEIGHT / 2, -SURFACE_SIZE / 2]}>
          <boxGeometry args={[SURFACE_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial {...wallMaterialProps} />
          <Edges color={edgeColor} />
        </mesh>
        <mesh position={[0, WALL_HEIGHT - 0.25, -SURFACE_SIZE / 2]}>
          <boxGeometry args={[SURFACE_SIZE, 0.5, WALL_THICKNESS + 0.1]} />
          <meshStandardMaterial {...capMaterialProps} />
        </mesh>
      </RigidBody>
      
      {/* 左右の壁 */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[SURFACE_SIZE / 2, WALL_HEIGHT / 2, 0]}>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, SURFACE_SIZE]} />
          <meshStandardMaterial {...wallMaterialProps} />
          <Edges color={edgeColor} />
        </mesh>
        <mesh position={[SURFACE_SIZE / 2, WALL_HEIGHT - 0.25, 0]}>
          <boxGeometry args={[WALL_THICKNESS + 0.1, 0.5, SURFACE_SIZE]} />
          <meshStandardMaterial {...capMaterialProps} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-SURFACE_SIZE / 2, WALL_HEIGHT / 2, 0]}>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, SURFACE_SIZE]} />
          <meshStandardMaterial {...wallMaterialProps} />
          <Edges color={edgeColor} />
        </mesh>
        <mesh position={[-SURFACE_SIZE / 2, WALL_HEIGHT - 0.25, 0]}>
          <boxGeometry args={[WALL_THICKNESS + 0.1, 0.5, SURFACE_SIZE]} />
          <meshStandardMaterial {...capMaterialProps} />
        </mesh>
      </RigidBody>

      {/* コーナーピラー */}
      {[
        [SURFACE_SIZE / 2, SURFACE_SIZE / 2],
        [SURFACE_SIZE / 2, -SURFACE_SIZE / 2],
        [-SURFACE_SIZE / 2, SURFACE_SIZE / 2],
        [-SURFACE_SIZE / 2, -SURFACE_SIZE / 2],
      ].map(([x, z]) => (
        <RigidBody key={`${x}-${z}`} type="fixed" colliders="cuboid">
          <mesh position={[x, WALL_HEIGHT / 2, z]}>
            <boxGeometry args={[WALL_THICKNESS + 0.1, WALL_HEIGHT, WALL_THICKNESS + 0.1]} />
            <meshStandardMaterial color="#e1ba7a" roughness={0.6} metalness={0.1} />
            <Edges color={edgeColor} />
          </mesh>
          <mesh position={[x, WALL_HEIGHT - 0.25, z]}>
            <boxGeometry args={[WALL_THICKNESS + 0.2, 0.5, WALL_THICKNESS + 0.2]} />
            <meshStandardMaterial {...capMaterialProps} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}

// 照明（最適化）
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={512} // シャドウマップサイズを削減
        shadow-mapSize-height={512}
        shadow-camera-far={25}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
    </>
  )
}