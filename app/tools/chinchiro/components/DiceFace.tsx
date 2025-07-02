import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

// サイコロの面コンポーネント（本物のサイコロのような配置）
export function DiceFace({ position, rotation, number, size }) {
  const blackLogoTexture = useLoader(TextureLoader, "/logo_black.png")
  const redLogoTexture = useLoader(TextureLoader, "/logo_red.png")

  const logoSize = size * 0.15 // ロゴのサイズを調整

  // 各面のロゴ配置パターン
  const getLogoPositions = (faceNumber) => {
    switch (faceNumber) {
      case 1:
        return [{ pos: [0, 0], isRed: true }] // 中央に赤ロゴ1つ
      case 2:
        return [
          { pos: [-logoSize, logoSize], isRed: false }, // 左上
          { pos: [logoSize, -logoSize], isRed: false }, // 右下
        ]
      case 3:
        return [
          { pos: [-logoSize, logoSize], isRed: false }, // 左上
          { pos: [0, 0], isRed: false }, // 中央
          { pos: [logoSize, -logoSize], isRed: false }, // 右下
        ]
      case 4:
        return [
          { pos: [-logoSize, logoSize], isRed: false }, // 左上
          { pos: [logoSize, logoSize], isRed: false }, // 右上
          { pos: [-logoSize, -logoSize], isRed: false }, // 左下
          { pos: [logoSize, -logoSize], isRed: false }, // 右下
        ]
      case 5:
        return [
          { pos: [-logoSize, logoSize], isRed: false }, // 左上
          { pos: [logoSize, logoSize], isRed: false }, // 右上
          { pos: [0, 0], isRed: false }, // 中央
          { pos: [-logoSize, -logoSize], isRed: false }, // 左下
          { pos: [logoSize, -logoSize], isRed: false }, // 右下
        ]
      case 6:
        return [
          { pos: [-logoSize, logoSize], isRed: false }, // 左上
          { pos: [0, logoSize], isRed: false }, // 上中央
          { pos: [logoSize, logoSize], isRed: false }, // 右上
          { pos: [-logoSize, -logoSize], isRed: false }, // 左下
          { pos: [0, -logoSize], isRed: false }, // 下中央
          { pos: [logoSize, -logoSize], isRed: false }, // 右下
        ]
      default:
        return []
    }
  }

  const logoPositions = getLogoPositions(number)

  return (
    <group position={position} rotation={rotation}>
      {/* 面の背景（白） */}
      <mesh position={[0, 0, size / 2 + 0.001]}>
        <planeGeometry args={[size * 0.8, size * 0.8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* ロゴの配置 */}
      {logoPositions.map((logo, index) => (
        <mesh key={index} position={[logo.pos[0], logo.pos[1], size / 2 + 0.002]}>
          <planeGeometry args={[logoSize * 2, logoSize * 2]} />
          <meshBasicMaterial map={logo.isRed ? redLogoTexture : blackLogoTexture} transparent />
        </mesh>
      ))}
    </group>
  )
}
