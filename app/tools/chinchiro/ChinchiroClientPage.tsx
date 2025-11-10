"use client"

import { useEffect, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dice1Icon as DiceIcon,
  History,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  Gamepad2,
  Smartphone,
  Monitor,
  Zap,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { useMediaQuery } from "@/hooks/use-mobile"
import { useChinchiroGame } from "./hooks/useChinchiroGame"
import { Dice } from "./components/Dice"
import { Table, Bowl, Walls } from "./components/GameEnvironment"

// カメラコントロールコンポーネント
function CameraControls({ isMobile }) {
  const { camera } = useThree()

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 9, 14)
    } else {
      camera.position.set(0, 8, 12)
    }
    camera.updateProjectionMatrix()
  }, [camera, isMobile])

  useEffect(() => {
    window.zoomInCamera = () => {
      camera.position.y *= 0.8
      camera.position.z *= 0.8
      camera.updateProjectionMatrix()
    }

    window.zoomOutCamera = () => {
      camera.position.y *= 1.2
      camera.position.z *= 1.2
      camera.updateProjectionMatrix()
    }

    window.resetCameraPosition = () => {
      if (isMobile) {
        camera.position.set(0, 9, 14)
      } else {
        camera.position.set(0, 8, 12)
      }
      camera.updateProjectionMatrix()
    }

    return () => {
      window.zoomInCamera = undefined
      window.zoomOutCamera = undefined
      window.resetCameraPosition = undefined
    }
  }, [camera, isMobile])

  return <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.5} />
}

// パンくずリストコンポーネント
function Breadcrumbs({ items }) {
  return (
    <nav className="flex mb-4" aria-label="パンくずリスト">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
            {index === items.length - 1 ? (
              <span className="text-gray-500" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// 結果表示コンポーネント
function ResultDisplay({ result, resultClass }) {
  if (!result) return null

  if (result.includes("しょんべん")) {
    return (
      <div className="flex flex-col items-center">
        <div className={`text-xl ${resultClass} font-medium py-2 px-4 rounded-full bg-gray-50 shadow-sm`}>
          しょんべん！
        </div>
        <div className="text-xs text-gray-500 mt-1">（サイコロが器から出ました）</div>
      </div>
    )
  }

  return (
    <div className={`text-xl ${resultClass} font-medium py-2 px-4 rounded-full bg-gray-50 shadow-sm`}>{result}</div>
  )
}

// チンチロゲームのメインコンポーネント
export default function ChinchiroClientPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const game = useChinchiroGame()

  const zoomIn = () => {
    if (window.zoomInCamera) {
      window.zoomInCamera()
    }
  }

  const zoomOut = () => {
    if (window.zoomOutCamera) {
      window.zoomOutCamera()
    }
  }

  const resetCamera = () => {
    if (window.resetCameraPosition) {
      window.resetCameraPosition()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundAnimation />
      <div className="relative z-10">
        <SiteHeader />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "ツール一覧", href: "/tools" },
                { label: "チンチロ3D", href: "/tools/chinchiro" },
              ]}
            />

            {/* ヒーローセクション */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                チンチロ3D｜リアルな物理演算で楽しむ無料サイコロゲーム
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                物理エンジンでリアルに転がる3Dチンチロサイコロ。ゾロ目、シゴロ、ヒフミ、そしてしょんべん（枠外）も忠実に再現。
                <strong>スマホ・PCどちらでも無料ですぐにブラウザで遊べます。</strong>
              </p>

              {/* 特徴バッジ */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Zap className="h-3 w-3 mr-1" />
                  物理エンジン
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Gamepad2 className="h-3 w-3 mr-1" />
                  3Dリアル
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Smartphone className="h-3 w-3 mr-1" />
                  スマホ対応
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  <Monitor className="h-3 w-3 mr-1" />
                  PC対応
                </Badge>
              </div>
            </div>

            {/* ゲーム画面 */}
            <Card className="shadow-lg border-0 overflow-hidden mb-6 animate-fade-in-up">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                      <DiceIcon className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">3Dチンチロサイコロ</CardTitle>
                      <CardDescription>物理エンジンでリアルに転がるサイコロゲーム</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center space-x-2">
                      <Switch id="continue-mode" checked={game.continueMode} onCheckedChange={game.setContinueMode} />
                      <Label htmlFor="continue-mode" className="text-xs">
                        現在位置から回す
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => game.setSoundEnabled(!game.soundEnabled)}
                      title={game.soundEnabled ? "音を消す" : "音を出す"}
                    >
                      {game.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[300px] md:h-[400px] w-full bg-gray-900">
                  <Suspense
                    fallback={
                      <div className="h-full w-full flex items-center justify-center text-white">Loading...</div>
                    }
                  >
                    <Canvas shadows>
                      <PerspectiveCamera makeDefault position={isMobile ? [0, 9, 14] : [0, 8, 12]} fov={50} />
                      <ambientLight intensity={0.7} />
                      <directionalLight
                        position={[5, 5, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                      />
                      <Physics gravity={[0, -20, 0]}>
                        <Table />
                        <Bowl />
                        <Walls />
                        <Dice
                          index={0}
                          position={[-1.5, 0, 0]}
                          rolling={game.rolling}
                          onRest={game.handleDiceRest}
                          color="#f5f5f5"
                          resetPosition={game.resetTrigger}
                          continueFromCurrent={game.continueMode}
                          rollTrigger={game.rollTrigger}
                        />
                        <Dice
                          index={1}
                          position={[0, 0, 0]}
                          rolling={game.rolling}
                          onRest={game.handleDiceRest}
                          color="#f5f5f5"
                          resetPosition={game.resetTrigger}
                          continueFromCurrent={game.continueMode}
                          rollTrigger={game.rollTrigger}
                        />
                        <Dice
                          index={2}
                          position={[1.5, 0, 0]}
                          rolling={game.rolling}
                          onRest={game.handleDiceRest}
                          color="#f5f5f5"
                          resetPosition={game.resetTrigger}
                          continueFromCurrent={game.continueMode}
                          rollTrigger={game.rollTrigger}
                        />
                      </Physics>
                      <Environment preset="park" background />
                      <CameraControls isMobile={isMobile} />
                    </Canvas>
                  </Suspense>

                  {/* カメラコントロール */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/80 hover:bg-white shadow-md"
                      onClick={zoomIn}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/80 hover:bg-white shadow-md"
                      onClick={zoomOut}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/80 hover:bg-white shadow-md"
                      onClick={resetCamera}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* モバイル用のコントロール */}
                  <div className="md:hidden absolute bottom-2 left-2 flex items-center gap-2 bg-white/80 p-2 rounded-md">
                    <Switch
                      id="continue-mode-mobile"
                      checked={game.continueMode}
                      onCheckedChange={game.setContinueMode}
                    />
                    <Label htmlFor="continue-mode-mobile" className="text-xs">
                      現在位置から回す
                    </Label>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex gap-2 mb-2">
                      {game.diceValues.map((value, index) => (
                        <Badge key={index} variant="outline" className="text-lg px-3 py-1 bg-white shadow-sm">
                          {value || "-"}
                        </Badge>
                      ))}
                    </div>
                    <ResultDisplay result={game.result} resultClass={game.resultClass} />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      className="col-span-3 bg-amber-600 hover:bg-amber-700 text-white"
                      size="lg"
                      onClick={game.rollDice}
                      disabled={game.rolling}
                    >
                      {game.rolling ? "振っています..." : "サイコロを振る"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={game.resetDice}
                      className="col-span-1"
                      title="サイコロをリセット"
                      size="lg"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      <span className="text-xs">リセット</span>
                    </Button>
                  </div>

                  {/* シェアボタン */}
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={game.shareGame}
                      className="text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      友達にシェアする
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* コンパクトなタブ（モバイルファースト） */}
            <Tabs defaultValue="rules" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 h-10 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger
                  value="rules"
                  className="rounded-md flex items-center gap-2 h-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>ルール</span>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-md flex items-center gap-2 h-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <History className="h-4 w-4" />
                  <span>履歴</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rules">
                <Card className="shadow-md border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      チンチロリンのルール
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>チンチロリン</strong>
                        は日本の伝統的なサイコロゲームで、3つのサイコロを振って出た目の組み合わせで勝敗を決めます。
                      </p>

                      <div>
                        <h3 className="font-bold mb-2 text-sm">役の一覧（強い順）</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-500 text-xs">最強</Badge>
                            <span className="font-medium">ピンゾロ（1-1-1）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500 text-xs">強い</Badge>
                            <span className="font-medium">ゾロ目（同じ数字が3つ）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500 text-xs">強い</Badge>
                            <span className="font-medium">シゴロ（4-5-6）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-500 text-xs">普通</Badge>
                            <span className="font-medium">通常の目（同じ数字が2つ）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gray-500 text-xs">負け</Badge>
                            <span className="font-medium">ヒフミ（1-2-3）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gray-500 text-xs">負け</Badge>
                            <span className="font-medium">ブタ（それ以外）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gray-500 text-xs">負け</Badge>
                            <span className="font-medium">しょんべん（器から出る）</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="shadow-md border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <History className="h-4 w-4" />
                      最近の結果
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    {game.history.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm py-4 bg-gray-50 rounded-lg">
                        まだ履歴がありません
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {game.history.map((item) => (
                          <div key={item.id} className="border rounded-md p-2 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1">
                                {item.values.map((value, i) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-white">
                                    {value}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.id).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                            <div className="mt-1 font-medium text-sm">{item.result}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-16">
              <RelatedTools currentToolSlug="chinchiro" />
            </div>

            {/* SEO記事セクション */}
            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎲 チンチロ完全ガイド：物理演算・確率論・日本の伝統ゲーム文化</h2>
                
                <div className="prose max-w-none text-gray-700 space-y-6">
                  <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      チンチロの歴史と文化的背景
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      チンチロ（チンチロリン）は、日本で古くから親しまれている
                      サイコロを使った伝統的なゲームです。その名前の由来は諸説ありますが、
                      「チンチロ」という音がサイコロの転がる音を表現しているとされています。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      特に飲み会や宴会の場で楽しまれ、単純なルールながら
                      運と戦略のバランスが絶妙な、日本独特のゲーム文化を
                      代表する存在です。
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎲</span>
                        チンチロの基本ルールと用語
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-900 mb-2">基本ルール</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 3つのサイコロを振る</li>
                            <li>• 出た目の組み合わせで勝敗を決める</li>
                            <li>• ゾロ目（同じ目3つ）が最高</li>
                            <li>• しょんべん（枠外）は最悪</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-900 mb-2">重要な用語</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>ゾロ目</strong>: 同じ目が3つ揃う</li>
                            <li>• <strong>シゴロ</strong>: 4,5,6の組み合わせ</li>
                            <li>• <strong>ヒフミ</strong>: 1,2,3の組み合わせ</li>
                            <li>• <strong>しょんべん</strong>: 枠外に出る</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-gray-900 mb-2">勝敗の判定</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ゾロ目 > シゴロ > ヒフミ > その他</li>
                            <li>• 同じ組み合わせは合計で比較</li>
                            <li>• しょんべんは即座に負け</li>
                            <li>• 引き分けの場合は再戦</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🔬</span>
                        物理演算と3D技術
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                          <h4 className="font-semibold text-gray-900 mb-2">物理エンジン</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 重力と慣性の法則</li>
                            <li>• 摩擦と反発の計算</li>
                            <li>• 衝突検出と応答</li>
                            <li>• リアルタイム演算</li>
                          </ul>
                        </div>
                        
                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                          <h4 className="font-semibold text-gray-900 mb-2">3Dレンダリング</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• WebGL技術の活用</li>
                            <li>• ライティングとシャドウ</li>
                            <li>• テクスチャマッピング</li>
                            <li>• アニメーション制御</li>
                          </ul>
                        </div>
                        
                        <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                          <h4 className="font-semibold text-gray-900 mb-2">技術的メリット</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 本物のサイコロ感</li>
                            <li>• 予測不可能な動き</li>
                            <li>• 視覚的な楽しさ</li>
                            <li>• 没入感の向上</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      確率論と数学的分析
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">各組み合わせの確率</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>ゾロ目</strong>: 6/216 = 2.78%</li>
                          <li>• <strong>シゴロ</strong>: 6/216 = 2.78%</li>
                          <li>• <strong>ヒフミ</strong>: 6/216 = 2.78%</li>
                          <li>• <strong>その他の組み合わせ</strong>: 198/216 = 91.67%</li>
                          <li>• <strong>しょんべん</strong>: 物理演算により変動</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">統計的分析</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• <strong>期待値計算</strong>: 各結果の価値と確率</li>
                          <li>• <strong>分散分析</strong>: 結果のばらつき</li>
                          <li>• <strong>相関分析</strong>: 物理パラメータとの関係</li>
                          <li>• <strong>仮説検定</strong>: ランダム性の検証</li>
                          <li>• <strong>モンテカルロ法</strong>: シミュレーション分析</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎪</span>
                      チンチロの社会的・文化的意義
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">コミュニケーション</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          アイスブレイク<br/>
                          世代間交流<br/>
                          文化継承<br/>
                          共同体験
                        </div>
                        <p className="text-sm text-gray-600">
                          年齢や立場を超えて
                          楽しめる共通体験。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">心理的効果</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          緊張と解放<br/>
                          期待と不安<br/>
                          達成感<br/>
                          ストレス解消
                        </div>
                        <p className="text-sm text-gray-600">
                          運の要素による
                          心理的な起伏。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">教育的価値</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded mb-2">
                          確率の理解<br/>
                          数学的思考<br/>
                          リスク管理<br/>
                          意思決定
                        </div>
                        <p className="text-sm text-gray-600">
                          遊びながら学べる
                          数学的要素。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      責任あるゲームプレイ
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">適切な楽しみ方</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-red-600">避けるべき行為</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 過度な賭け事</li>
                              <li>• 依存的なプレイ</li>
                              <li>• 他人への強要</li>
                              <li>• 未成年への不適切な使用</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1 text-green-600">推奨される使い方</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 適度な時間でのプレイ</li>
                              <li>• 楽しさを重視</li>
                              <li>• 全員が納得するルール</li>
                              <li>• 教育的な活用</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">健全なゲーム文化</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>娯楽性重視</strong>: 勝敗よりも楽しさを優先</li>
                          <li>• <strong>社会的交流</strong>: 人とのつながりを大切に</li>
                          <li>• <strong>文化的理解</strong>: 伝統ゲームの価値を尊重</li>
                          <li>• <strong>教育的活用</strong>: 学習機会としての活用</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🌐</span>
                      デジタル時代のチンチロ
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">オンライン化のメリット</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">技術的メリット</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 正確な物理演算</li>
                              <li>• リアルタイム結果</li>
                              <li>• 履歴の自動保存</li>
                              <li>• マルチプラットフォーム対応</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">社会的メリット</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• 遠隔地との交流</li>
                              <li>• アクセシビリティ向上</li>
                              <li>• 文化的継承</li>
                              <li>• グローバルな普及</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">YokaUnit 3Dチンチロの特徴</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>高精度物理演算</strong>: リアルなサイコロの動きを再現</li>
                          <li>• <strong>3Dレンダリング</strong>: 美しいビジュアルとアニメーション</li>
                          <li>• <strong>モバイル対応</strong>: スマホ・タブレットで快適プレイ</li>
                          <li>• <strong>履歴機能</strong>: 過去の結果を記録・分析</li>
                          <li>• <strong>音響効果</strong>: 臨場感のあるサウンド</li>
                          <li>• <strong>プライバシー保護</strong>: ブラウザ内完結でデータ漏洩なし</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎭</span>
                      チンチロと日本のゲーム文化
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">伝統的なゲーム文化</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">歴史的背景</h5>
                            <p className="text-xs text-gray-600">
                              江戸時代から続く
                              庶民の娯楽文化
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">地域性</h5>
                            <p className="text-xs text-gray-600">
                              地方ごとに異なる
                              ルールと文化
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">社会的役割</h5>
                            <p className="text-xs text-gray-600">
                              コミュニティの
                              結束を深める役割
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">現代への継承</h5>
                            <p className="text-xs text-gray-600">
                              デジタル時代でも
                              愛され続ける文化
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">文化的価値</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>無形文化財</strong>: 日本の伝統的な娯楽文化</li>
                          <li>• <strong>世代間交流</strong>: 年齢を超えた共通体験</li>
                          <li>• <strong>地域コミュニティ</strong>: 地域の結束を深める</li>
                          <li>• <strong>国際交流</strong>: 日本文化の海外発信</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      YokaUnitの3Dチンチロサイコロは、日本の伝統ゲーム文化を
                      最新技術で再現した革新的なゲームです。
                      この記事が、チンチロの魅力と文化的価値の理解に役立てば幸いです。
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                      <span>#チンチロ</span>
                      <span>#サイコロゲーム</span>
                      <span>#物理演算</span>
                      <span>#3Dゲーム</span>
                      <span>#日本文化</span>
                      <span>#伝統ゲーム</span>
                      <span>#YokaUnit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="chinchiro" limit={8} />
        
        <SiteFooter />
      </div>
    </div>
  )
}
