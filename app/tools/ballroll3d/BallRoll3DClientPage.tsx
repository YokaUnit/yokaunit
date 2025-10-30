"use client"

import { useEffect, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, History, HelpCircle, Volume2, VolumeX, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Share2, Gamepad2, Smartphone, Monitor, Zap, Trophy, Gauge, Play, RefreshCw } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { RelatedTools } from "@/components/related-tools"
import { CategoryTools } from "@/components/category-tools"
import { useMediaQuery } from "@/hooks/use-mobile"
import { useBallRoll3DGame } from "./hooks/useBallRoll3DGame"
import { Ball } from "./components/Ball"
import { GameEnvironment } from "./components/GameEnvironment"

function CameraControls({ isMobile, platformDepth, edgeZ, ballZ }) {
  const { camera } = useThree()

  useEffect(() => {
    // ボールとエッジが両方入るよう距離を調整
    const y = isMobile ? 12 : 12
    const span = Math.max(10, edgeZ - ballZ)
    const z = ballZ - Math.min(12, span * 0.6)
    camera.position.set(0, y, z)
    camera.lookAt(0, 1, edgeZ)
    camera.updateProjectionMatrix()
  }, [camera, isMobile, platformDepth, edgeZ, ballZ])

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
      const y = isMobile ? 12 : 12
      const span = Math.max(10, edgeZ - ballZ)
      const z = ballZ - Math.min(12, span * 0.6)
      camera.position.set(0, y, z)
      camera.lookAt(0, 1, edgeZ)
      camera.updateProjectionMatrix()
    }
    return () => {
      window.zoomInCamera = undefined
      window.zoomOutCamera = undefined
      window.resetCameraPosition = undefined
    }
  }, [camera, isMobile, platformDepth, edgeZ])

  return <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} target={[0, 1, edgeZ]} />
}

function Breadcrumbs({ items }) {
  return (
    <nav className="flex mb-4" aria-label="パンくずリスト">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
            {index === items.length - 1 ? (
              <span className="text-gray-500" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function ScoreDisplay({ score, brink, result }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
        <Trophy className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">スコア: {score}</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-full">
        <Gauge className="h-4 w-4 text-purple-600" />
        <span className="text-sm font-medium text-purple-700">ギリギリ距離: {brink.toFixed(2)} m</span>
      </div>
      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
        <Target className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">結果: {result}</span>
      </div>
    </div>
  )
}

export default function BallRoll3DClientPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const game = useBallRoll3DGame()
  const platformDepth = 80
  const platformWidth = 34
  const edgeZ = platformDepth / 2 - 0.2
  const ballStartZ = 0 // ボールを原点に配置

  useEffect(() => {
    game.setEdgeZ(edgeZ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeZ])

  const zoomIn = () => window.zoomInCamera && window.zoomInCamera()
  const zoomOut = () => window.zoomOutCamera && window.zoomOutCamera()
  const resetCamera = () => window.resetCameraPosition && window.resetCameraPosition()

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundAnimation />
      <div className="relative z-10">
        <SiteHeader />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "ツール一覧", href: "/tools" }, { label: "ボール転がし3D", href: "/tools/ballroll3d" }]} />

            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ボール転がし3D｜“落ちる直前”を攻める物理ゲーム</h1>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                パワーと角度を決めてボールを飛ばし、平台の先端“ギリギリ”で止められるか？
                <strong>壁・障害物・コインなしの、究極にシンプルな駆け引き。</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Zap className="h-3 w-3 mr-1" />物理エンジン</Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Gamepad2 className="h-3 w-3 mr-1" />直感操作</Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Smartphone className="h-3 w-3 mr-1" />スマホ対応</Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><Monitor className="h-3 w-3 mr-1" />PC対応</Badge>
              </div>
            </div>

            <Card className="shadow-lg border-0 overflow-hidden mb-6 animate-fade-in-up">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full"><Target className="h-5 w-5 text-blue-600 dark:text-blue-300" /></div>
                    <div>
                      <CardTitle className="text-xl">ボール転がし3D</CardTitle>
                      <CardDescription>ギリギリで止めるほど高得点！</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center space-x-2">
                      <Switch id="sound-mode" checked={game.soundEnabled} onCheckedChange={game.setSoundEnabled} />
                      <Label htmlFor="sound-mode" className="text-xs">音を出す</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => game.setSoundEnabled(!game.soundEnabled)} title={game.soundEnabled ? "音を消す" : "音を出す"}>{game.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[70vh] md:h-[80vh] w-full bg-gray-900 touch-none select-none">
                  <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-white">Loading...</div>}>
                    <Canvas shadows>
                      <PerspectiveCamera makeDefault position={[0, 12, -10]} fov={60} />
                      <ambientLight intensity={0.7} />
                      <directionalLight position={[5, 8, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                      <Physics gravity={[0, -20, 0]}>
                        <GameEnvironment platformDepth={platformDepth} platformWidth={platformWidth} edgeZ={edgeZ} />
                        <Ball 
                          position={[0, 0.6, 0.5]}
                          onPositionChange={game.updateBallPosition}
                          onLaunch={game.onLaunch}
                          onFall={game.onFall}
                          onRestNearEdge={game.onRestNearEdge}
                          edgeZ={edgeZ}
                          resetTrigger={game.resetTrigger}
                        />
                      </Physics>
                      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={80} blur={2.5} far={20} />
                      <Environment preset="park" background />
                      <CameraControls isMobile={isMobile} platformDepth={platformDepth} edgeZ={edgeZ} ballZ={game.currentBallZ} />
                    </Canvas>
                  </Suspense>

                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white shadow-md" onClick={zoomIn}><ZoomIn className="h-4 w-4" /></Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white shadow-md" onClick={zoomOut}><ZoomOut className="h-4 w-4" /></Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white shadow-md" onClick={resetCamera}><RotateCcw className="h-4 w-4" /></Button>
                  </div>

                  <div className="md:hidden absolute bottom-2 left-2 flex items-center gap-2 bg-white/80 p-2 rounded-md">
                    <Switch id="sound-mode-mobile" checked={game.soundEnabled} onCheckedChange={game.setSoundEnabled} />
                    <Label htmlFor="sound-mode-mobile" className="text-xs">音を出す</Label>
                  </div>
                </div>

                <div className="p-4">
                  <ScoreDisplay score={game.score} brink={game.brinkDistance} result={game.resultLabel} />

                  <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-xs text-gray-500">角度</span>
                      <Badge className="bg-white text-gray-800 border">{game.angleDeg}°</Badge>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-xs text-gray-500">パワー</span>
                      <Badge className="bg-white text-gray-800 border">{game.power}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" onClick={game.resetRound} className="col-span-1" title="リセット" size="lg"><RefreshCw className="h-4 w-4 mr-1" />リセット</Button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm" onClick={game.shareGame} className="text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm"><Share2 className="h-4 w-4 mr-2" />友達にシェアする</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="rules" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 h-10 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="rules" className="rounded-md flex items-center gap-2 h-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"><HelpCircle className="h-4 w-4" /><span>ルール</span></TabsTrigger>
                <TabsTrigger value="history" className="rounded-md flex items-center gap-2 h-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"><History className="h-4 w-4" /><span>履歴</span></TabsTrigger>
              </TabsList>

              <TabsContent value="rules">
                <Card className="shadow-md border-0">
                  <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><HelpCircle className="h-4 w-4" />ボール転がし3Dのルール</CardTitle></CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>パワーと角度を決めてボールを発射。平台の先端で“止める”ほど高得点。落ちたら0点。</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>障害物・壁・コインはありません</li>
                        <li>止まった位置と先端の距離（ギリギリ距離）が小さいほど高得点</li>
                        <li>一度発射したら、停止または落下で結果が確定</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="shadow-md border-0">
                  <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><History className="h-4 w-4" />最近の結果</CardTitle></CardHeader>
                  <CardContent className="p-3">
                    {game.history.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm py-4 bg-gray-50 rounded-lg">まだ履歴がありません</div>
                    ) : (
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {game.history.map((item) => (
                          <div key={item.id} className="border rounded-md p-2 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2 items-center text-xs">
                                <Badge variant="outline" className="bg-white">角度 {item.angle}°</Badge>
                                <Badge variant="outline" className="bg-white">パワー {item.power}</Badge>
                                <Badge variant="outline" className="bg-white">距離 {item.brink.toFixed(2)}m</Badge>
                              </div>
                              <div className="text-xs text-gray-500">{new Date(item.id).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                            </div>
                            <div className="mt-1 font-medium text-sm">スコア: {item.score} | 結果: {item.result}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 ギリギリを攻める快感：ボール転がし3D</h2>
                <div className="prose max-w-none text-gray-700 space-y-6">
                  <p>余計な要素を削ぎ落し、“ギリギリ止める”という一点に集中したミニゲーム。短時間で何度も挑戦できる中毒性が魅力です。</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <CategoryTools category="ゲーム" title="関連ツール（ゲーム）" currentToolSlug="ballroll3d" limit={8} />
        <RelatedTools currentToolSlug="ballroll3d" />
        <SiteFooter />
      </div>
    </div>
  )
}


