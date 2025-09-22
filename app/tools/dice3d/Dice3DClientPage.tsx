"use client"

import { Suspense, useEffect, useRef, createRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { useDice3D } from "./hooks/useDice3D"
import { Dice3D, type Dice3DRef } from "./components/Dice3D"
import { Ground, Walls, Lighting } from "./components/Environment3D"
import { ControlPanel } from "./components/ControlPanel"

export function Dice3DClientPage() {
  const {
    diceInstances,
    diceResults,
    isRolling,
    physics,
    addDice,
    clearAllDice,
    removeLastDice,
    rollAllDice,
    resetAllDice,
    updatePhysics,
    handleDiceRest,
    getStatistics,
  } = useDice3D()

  const diceRefs = useRef<Map<number, React.RefObject<Dice3DRef | null>>>(new Map())

   // サイコロのrefを管理
   useEffect(() => {
     diceInstances.forEach(dice => {
       if (!diceRefs.current.has(dice.id)) {
         const ref = createRef<Dice3DRef>()
         diceRefs.current.set(dice.id, ref)
       }
     })

    // 削除されたサイコロのrefを削除
    const currentIds = new Set(diceInstances.map(d => d.id))
    for (const [id, ref] of diceRefs.current.entries()) {
      if (!currentIds.has(id)) {
        diceRefs.current.delete(id)
      }
    }
  }, [diceInstances])

  // 初期サイコロを追加（1個のみ、一度だけ）
  useEffect(() => {
    let mounted = true
    if (diceInstances.length === 0 && mounted) {
      addDice(1)
    }
    return () => {
      mounted = false
    }
  }, []) // 依存配列を空にして一度だけ実行

  const statistics = getStatistics()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <BackgroundAnimation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎲 Dice 3D Simulator
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              物理エンジンベースのサイコロシミュレーター
            </p>
            <p className="text-gray-500">
              サイコロを無限に増やして、投げる力や回転を調整できます
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3Dビューポート */}
            <div className="lg:col-span-3">
               <div className="overflow-hidden">
                <div className="h-[70vh] min-h-[500px]">
                <Canvas 
                  shadows 
                  gl={{ antialias: true, alpha: false }} 
                  dpr={1}
                >
                  <Suspense fallback={null}>
                    {/* チンチロ3Dと同じ照明設定 */}
                    <ambientLight intensity={0.7} />
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={1}
                      castShadow
                      shadow-mapSize-width={1024}
                      shadow-mapSize-height={1024}
                    />
                    
                    {/* チンチロ3Dと同じpark背景 */}
                    <Environment preset="park" background />
                    
                    <Physics 
                      gravity={[0, -15, 0]} 
                      debug={false}
                    >
                      {/* 環境 */}
                      <Ground />
                      <Walls />
                      
                       {/* サイコロ */}
                       {diceInstances.map(dice => {
                         const ref = diceRefs.current.get(dice.id)
                         if (ref) {
                           return (
                             <Dice3D
                               key={dice.id}
                               ref={ref}
                               id={dice.id}
                               position={dice.position}
                               color={dice.color}
                               physics={physics}
                               onRest={handleDiceRest}
                             />
                           )
                         }
                         return null
                       })}
                    </Physics>
                    
                    {/* カメラコントロール（チンチロ3D風） */}
                    <PerspectiveCamera
                      makeDefault
                      position={[0, 8, 12]}
                      fov={50}
                    />
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={5}
                      maxDistance={25}
                      maxPolarAngle={Math.PI / 2.1}
                      target={[0, 0, 0]}
                    />
                  </Suspense>
                </Canvas>
              </div>
              
                {/* 操作説明 */}
                <div className="p-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>🖱️ ドラッグ: 視点回転</div>
                    <div>🔍 ホイール: ズーム</div>
                    <div>⌨️ 右クリック+ドラッグ: パン</div>
                  </div>
                </div>
              </div>
            </div>

             {/* サイドバー */}
             <div className="lg:col-span-1">
               <div className="space-y-4">
                 <ControlPanel
                   diceCount={diceInstances.length}
                   isRolling={isRolling}
                   physics={physics}
                   results={diceResults}
                   statistics={statistics}
                   onAddDice={addDice}
                   onRemoveDice={removeLastDice}
                   onClearAll={clearAllDice}
                   onRollAll={rollAllDice}
                   onResetAll={resetAllDice}
                   onUpdatePhysics={updatePhysics}
                 />
               </div>
             </div>
          </div>

          {/* 機能説明 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 無限サイコロ</h3>
              <p className="text-gray-600 text-sm">
                サイコロを1個ずつ、または5個・10個まとめて追加できます。
                物理エンジンにより、リアルな挙動を実現しています。
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">⚙️ 物理調整</h3>
              <p className="text-gray-600 text-sm">
                投げる力の強さ、回転の強さ、反発係数、摩擦係数を
                リアルタイムで調整できます。
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📊 統計表示</h3>
              <p className="text-gray-600 text-sm">
                サイコロの結果を自動集計し、合計・平均・分布を
                リアルタイムで表示します。
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
