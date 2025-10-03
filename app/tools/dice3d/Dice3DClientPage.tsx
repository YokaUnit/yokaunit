"use client"

import { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { useDice3D } from "./hooks/useDice3D"
import { Dice3D } from "./components/Dice3D"
import { Ground, Walls, Lighting } from "./components/Environment3D"
import { ControlPanel } from "./components/ControlPanel"
import { RelatedTools } from "@/components/related-tools"

export function Dice3DClientPage() {
  const {
    diceInstances,
    diceResults,
    physics,
    resetTrigger,
    rollTrigger,
    addDice,
    clearAllDice,
    removeLastDice,
    rollAllDice,
    resetAllDice,
    updatePhysics,
    handleDiceRest,
    getStatistics,
    initializeDice,
  } = useDice3D()

  // 初期サイコロを追加
  useEffect(() => {
    initializeDice()
  }, [initializeDice])

  const statistics = getStatistics()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <BackgroundAnimation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              🎲 サイコロ｜無料オンラインサイコロ
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              <strong>無料でサイコロを振れるオンラインツール。</strong>リアルな3D物理エンジンでサイコロを投げ、<strong>TRPG・ボードゲーム・すごろくに最適。</strong>
              1個から複数個まで同時に振れて、確率計算・統計機能付き。<strong>スマホ・PCで今すぐ使える！</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                { label: '🆓 完全無料', color: 'bg-green-100 text-green-800' },
                { label: '📱 スマホ対応', color: 'bg-blue-100 text-blue-800' },
                { label: '🎮 TRPG対応', color: 'bg-purple-100 text-purple-800' },
                { label: '🎲 複数同時', color: 'bg-yellow-100 text-yellow-800' },
                { label: '📊 統計機能', color: 'bg-indigo-100 text-indigo-800' },
                { label: '⚡ 瞬時計算', color: 'bg-pink-100 text-pink-800' },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3Dビューポート */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden">
                <div className="h-[70vh] min-h-[500px]">
                  <Canvas 
                    shadows 
                    gl={{ 
                      antialias: false, // アンチエイリアスを無効化してパフォーマンス向上
                      alpha: false,
                      powerPreference: "high-performance" // 高性能GPU使用
                    }} 
                    dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1} // SSR対応
                    performance={{ min: 0.5 }} // パフォーマンス最適化
                  >
                    <Suspense fallback={null}>
                      <Lighting />
                      <Environment preset="park" background />
                      
                      <Physics 
                        gravity={[0, -15, 0]} 
                        debug={false}
                        timeStep={1/60} // 固定タイムステップでパフォーマンス向上
                        paused={false}
                      >
                        {/* 環境 */}
                        <Ground />
                        <Walls />
                        
                        {/* サイコロ */}
                        {diceInstances.map((dice, index) => (
                          <Dice3D
                            key={dice.id}
                            index={index}
                            position={dice.position}
                            color={dice.color}
                            rolling={true}
                            onRest={handleDiceRest}
                            resetTrigger={resetTrigger}
                            rollTrigger={rollTrigger}
                            physics={physics}
                          />
                        ))}
                      </Physics>
                      
                      {/* カメラコントロール */}
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
                  isRolling={false}
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

          {/* 機能説明とSEO対策 */}
          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3">🎯 複数サイコロ対応</h2>
                <p className="text-gray-600 text-sm">
                  サイコロを1個ずつ、または5個・10個まとめて追加可能。最大数十個のサイコロを同時に振ることができ、
                  TRPG、ボードゲーム、確率実験など様々な用途に対応します。
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3">⚙️ リアルタイム物理調整</h2>
                <p className="text-gray-600 text-sm">
                  投げる力、回転力、反発係数、摩擦係数をリアルタイムで調整可能。
                  物理エンジンRapierを使用し、現実に近いサイコロの挙動を再現します。
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3">📊 高度な統計機能</h2>
                <p className="text-gray-600 text-sm">
                  サイコロの結果を自動集計し、合計値・平均値・各面の出現分布をリアルタイム表示。
                  確率論の学習や統計的検証にも活用できます。
                </p>
              </div>
            </div>

            {/* SEO対策用の詳細説明 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">オンラインサイコロの特徴と使い方</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎲 高精度な物理演算</h3>
                  <p className="mb-4">
                    WebGL技術とRapier物理エンジンを組み合わせ、現実のサイコロと同等の挙動を実現。
                    重力、慣性、摩擦、反発など、すべての物理法則を正確にシミュレートします。
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">🎮 TRPG・ボードゲームに最適</h3>
                  <p>
                    <strong>TRPG（テーブルトークRPG）</strong>、<strong>ボードゲーム</strong>、<strong>すごろく</strong>、確率実験、統計学習、
                    ゲーム開発のテストなど、様々なシーンでご活用いただけます。オンラインセッションでも大活躍！
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📱 クロスプラットフォーム対応</h3>
                  <p className="mb-4">
                    PC、タブレット、スマートフォンのブラウザで動作。インストール不要で、
                    いつでもどこでも高品質な3Dサイコロシミュレーションをお楽しみいただけます。
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">🔬 教育・研究用途</h3>
                  <p>
                    確率論、統計学の学習教材として最適。大数の法則の検証や、
                    サイコロの公平性テストなど、学術的な用途にもご利用いただけます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <RelatedTools currentToolSlug="dice3d" />

      <SiteFooter />
    </div>
  )
}