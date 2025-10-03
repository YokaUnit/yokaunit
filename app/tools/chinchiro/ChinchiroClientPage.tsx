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

            {/* SEO用のコンテンツ */}
            <div className="prose max-w-none text-sm">
              <h2 className="text-xl font-bold mb-3">3Dチンチロサイコロゲームについて</h2>
              <p className="mb-4">
                この<strong>3Dチンチロサイコロゲーム</strong>は、物理エンジンを使用してリアルなサイコロの動きを再現した
                <strong>無料ブラウザゲーム</strong>
                です。スマートフォンでもPCでも、どちらでも快適に遊べるサイコロシミュレーターとして設計されています。
              </p>

              <h3 className="text-lg font-bold mb-2">物理演算によるリアルな動き</h3>
              <p className="mb-4">
                従来のランダム数値生成とは異なり、実際の物理法則に基づいてサイコロが転がります。重力、摩擦、反発などの
                <strong>物理演算</strong>により、本物のサイコロを振っているような臨場感を味わえます。
              </p>

              <h3 className="text-lg font-bold mb-2">飲み会でも使えるミニゲーム</h3>
              <p className="mb-4">
                チンチロリンは日本の伝統的なゲームで、<strong>飲み会でも使えるミニゲーム</strong>
                として親しまれています。 「しょんべん」という独特な用語も含め、本格的なチンチロの雰囲気を楽しめます。
              </p>
            </div>
          </div>
        </main>

        <RelatedTools currentToolSlug="chinchiro" />
        
        <SiteFooter />
      </div>
    </div>
  )
}
