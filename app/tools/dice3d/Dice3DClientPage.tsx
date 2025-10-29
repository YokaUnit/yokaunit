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
import { CategoryTools } from "@/components/category-tools"

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

          {/* モバイル用のサイコロ数表示 */}
          <div className="lg:hidden mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
              <span className="text-lg font-bold text-gray-800">現在のサイコロ数: {diceInstances.length}個</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3Dビューポート */}
            <div className="lg:col-span-3">
               <div className="overflow-hidden">
                <div className="h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] lg:min-h-[500px]">
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
                    <div className="md:hidden">📱 タッチ: 視点回転・ズーム</div>
                    <div className="hidden md:block">🖱️ ドラッグ: 視点回転</div>
                    <div className="hidden md:block">🔍 ホイール: ズーム</div>
                    <div className="hidden md:block">⌨️ 右クリック+ドラッグ: パン</div>
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

          {/* 1. モバイル用の結果表示 */}
          <div className="lg:hidden mt-6">
            {diceResults.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">🎯 結果</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                  {diceResults.map((result, index) => (
                    <div key={result.id || index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-3 text-center border border-blue-200">
                      <div className="text-2xl font-bold text-blue-800">{result.value}</div>
                      <div className="text-xs text-blue-600">#{index + 1}</div>
                    </div>
                  ))}
                </div>
                {statistics && statistics.total > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-800">{statistics.total}</div>
                        <div className="text-xs text-green-600">合計</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-800">{statistics.average.toFixed(1)}</div>
                        <div className="text-xs text-green-600">平均</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. モバイル用のメインアクションボタン */}
          <div className="lg:hidden mt-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={rollAllDice}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 flex-1"
                >
                  🎲 サイコロを振る
                </button>
                <button
                  onClick={resetAllDice}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  🔄 リセット
                </button>
              </div>
            </div>
          </div>

          {/* 3. モバイル用のサイコロ管理 */}
          <div className="lg:hidden mt-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">🎲 サイコロ管理</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => addDice()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    ➕ 1個追加
                  </button>
                  <button
                    onClick={() => addDice(5)}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    ➕ 5個追加
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={removeLastDice}
                    disabled={diceInstances.length <= 1}
                    className="bg-red-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    🗑️ 1個削除
                  </button>
                  <button
                    onClick={clearAllDice}
                    disabled={diceInstances.length === 0}
                    className="bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    🧹 全削除
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* 4. モバイル用の物理設定 */}
          <div className="lg:hidden mt-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">⚙️ 物理設定</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投げる力: {physics.impulseStrength}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={physics.impulseStrength}
                    onChange={(e) => updatePhysics({ impulseStrength: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    回転力: {physics.torqueStrength}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={physics.torqueStrength}
                    onChange={(e) => updatePhysics({ torqueStrength: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    反発係数: {physics.restitution}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={physics.restitution}
                    onChange={(e) => updatePhysics({ restitution: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    摩擦係数: {physics.friction}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={physics.friction}
                    onChange={(e) => updatePhysics({ friction: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
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

      <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="dice3d" limit={8} />
      
      {/* SEO記事 */}
      <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mx-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎲 サイコロ完全ガイド：物理演算・確率論・ゲーム文化の科学</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              サイコロの歴史と文化的意義
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">古代の起源</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>メソポタミア</strong>: 最古のサイコロ発見</li>
                  <li>• <strong>古代エジプト</strong>: 神聖な儀式での使用</li>
                  <li>• <strong>ギリシャ・ローマ</strong>: 娯楽として普及</li>
                  <li>• <strong>中世ヨーロッパ</strong>: 騎士道文化との融合</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">日本の伝統</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>双六</strong>: 江戸時代の庶民娯楽</li>
                  <li>• <strong>すごろく</strong>: 教育的なゲーム</li>
                  <li>• <strong>チンチロ</strong>: 伝統的な賭博ゲーム</li>
                  <li>• <strong>現代</strong>: デジタル時代への継承</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              物理演算と3Dシミュレーション
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">物理法則</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  重力<br/>
                  摩擦力<br/>
                  弾性衝突<br/>
                  空気抵抗
                </div>
                <p className="text-sm text-gray-600">
                  サイコロの動きを決定する
                  基本的な物理要素。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">3Dエンジン</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  リアルタイム<br/>
                  物理演算<br/>
                  レンダリング<br/>
                  アニメーション
                </div>
                <p className="text-sm text-gray-600">
                  現実的なサイコロの
                  挙動を再現する技術。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">確率の公平性</h4>
                <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                  製造精度<br/>
                  摩耗の影響<br/>
                  偏りの検出<br/>
                  補正アルゴリズム
                </div>
                <p className="text-sm text-gray-600">
                  公平な結果を保証する
                  技術的な配慮。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              確率論と統計分析
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">基本的な確率</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-green-600">単一サイコロ</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 各面: 1/6 = 16.67%</li>
                      <li>• 期待値: 3.5</li>
                      <li>• 分散: 2.92</li>
                      <li>• 標準偏差: 1.71</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1 text-blue-600">複数サイコロ</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 合計値の分布</li>
                      <li>• 正規分布への近似</li>
                      <li>• 中心極限定理</li>
                      <li>• 統計的検定</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">実用的な応用</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>ゲーム設計</strong>: バランス調整と難易度設定</li>
                  <li>• <strong>品質管理</strong>: 製造プロセスの監視</li>
                  <li>• <strong>統計学教育</strong>: 確率概念の理解</li>
                  <li>• <strong>研究ツール</strong>: ランダムサンプリング</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              現代ゲーム文化でのサイコロ
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">ゲームジャンル</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1">テーブルトークRPG</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• ダンジョンズ&ドラゴンズ</li>
                      <li>• クトゥルフ神話TRPG</li>
                      <li>• ソードワールド</li>
                      <li>• カタン</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h5 className="font-semibold text-sm mb-1">ボードゲーム</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• モノポリー</li>
                      <li>• バックギャモン</li>
                      <li>• ヤッツィー</li>
                      <li>• チンチロ</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">デジタル化の影響</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>オンラインゲーム</strong>: 遠隔地でのプレイ</li>
                  <li>• <strong>VR/AR</strong>: 没入感のある体験</li>
                  <li>• <strong>AI対戦</strong>: 人工知能との対戦</li>
                  <li>• <strong>統計分析</strong>: プレイデータの活用</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              サイコロは、人類の歴史と共に歩んできた重要な道具です。
              現代の技術により、より公平で楽しいゲーム体験を提供しています。
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
              <span>#サイコロ</span>
              <span>#3D物理演算</span>
              <span>#確率論</span>
              <span>#ゲーム文化</span>
              <span>#統計学</span>
              <span>#YokaUnit</span>
            </div>
          </div>

        </div>
      </section>
      
      <RelatedTools currentToolSlug="dice3d" />

      <SiteFooter />
    </div>
  )
}