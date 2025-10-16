"use client"

import React, { useEffect, useMemo, useState } from "react"

type Phase = "setup" | "trapA" | "trapB" | "ready" | "playing" | "result"
type Player = "A" | "B"

type Sweet = { id: string; x: number; y: number }

function randomLayout(count: number): Sweet[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `cake-${i + 1}`,
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 10,
  }))
}

export default function RussianSweetsClient() {
  const [phase, setPhase] = useState<Phase>("setup")
  const [nameA, setNameA] = useState("Aさん")
  const [nameB, setNameB] = useState("Bさん")
  const [trapA, setTrapA] = useState<string | null>(null)
  const [trapB, setTrapB] = useState<string | null>(null)
  const [turn, setTurn] = useState<Player>("A")
  const [count, setCount] = useState<number>(10) // 1-20
  const [board, setBoard] = useState<Sweet[]>(randomLayout(10))
  const [removed, setRemoved] = useState<Set<string>>(new Set())
  const [loser, setLoser] = useState<Player | null>(null)

  const currentPlayerName = useMemo(() => (turn === "A" ? nameA : nameB), [turn, nameA, nameB])

  const resetGame = () => {
    setTrapA(null)
    setTrapB(null)
    setTurn("A")
    setBoard(randomLayout(count))
    setRemoved(new Set())
    setLoser(null)
  }

  const startGame = () => {
    resetGame()
    setPhase("trapA")
  }

  const handleTrapPick = (player: Player, sweetId: string) => {
    if (player === "A") {
      setTrapA(sweetId)
      setPhase("trapB")
    } else {
      setTrapB(sweetId)
      setPhase("ready")
      setTurn("A")
    }
  }

  const handlePick = (sweetId: string) => {
    if (phase !== "playing" || removed.has(sweetId) || loser) return
    const nextRemoved = new Set(removed)
    nextRemoved.add(sweetId)
    setRemoved(nextRemoved)

    const opponentTrap = turn === "A" ? trapB : trapA
    if (opponentTrap === sweetId || (turn === "A" && trapA === sweetId) || (turn === "B" && trapB === sweetId)) {
      setLoser(turn)
      setPhase("result")
      return
    }
    setTurn(turn === "A" ? "B" : "A")
  }

  useEffect(() => {
    if (phase === "trapA") {
      setBoard(randomLayout(count))
      setRemoved(new Set())
    }
  }, [phase, count])

  return (
    <div className="max-w-4xl mx-auto">
      {phase === "setup" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4 text-center">ロシアンスイーツ</h1>
          <p className="text-center text-gray-600 mb-6">2人用の心理戦×運ゲー。散らばるスイーツから選び、相手の“外れ”を引いたら即アウト！</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white rounded-xl border p-3">
              <span className="text-sm text-gray-500 w-20">A</span>
              <input value={nameA} onChange={(e) => setNameA(e.target.value)} className="flex-1 rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl border p-3">
              <span className="text-sm text-gray-500 w-20">B</span>
              <input value={nameB} onChange={(e) => setNameB(e.target.value)} className="flex-1 rounded-md border px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-4 border">
              <label className="block text-sm font-semibold text-gray-700 mb-2">ケーキの数（最大20）</label>
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={20} value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full" />
                <span className="text-sm font-bold w-10 text-right">{count}</span>
              </div>
              <div className="mt-2">
                <button onClick={() => setBoard(randomLayout(count))} className="px-3 py-2 rounded-lg text-xs border font-semibold text-gray-700 bg-white hover:bg-gray-50">再配置</button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-sm text-gray-700">下のボードに <strong>🍰 ケーキ</strong> をランダムに散らします。この配置のままゲームを進めます。</p>
            </div>
          </div>
          <div className="relative mt-4 h-[320px] bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border">
            {board.map((s) => (
              <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 select-none" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <div className="text-3xl sm:text-4xl">🍰</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={startGame} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow hover:opacity-95">ゲーム開始</button>
          </div>
        </div>
      )}

      {phase === "trapA" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">{nameA} のシークレット“アウト”選択</h2>
          <p className="text-center text-gray-600 mb-4">相手には見せないでね</p>
          <div className="relative mt-2 h-[320px] bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border">
            {board.map((s) => (
              <button
                key={s.id}
                onClick={() => handleTrapPick("A", s.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-transparent"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title="アウトにするケーキを選ぶ"
              >
                <div className="text-4xl hover:scale-110 transition-transform">🍰</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "trapB" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">{nameB} のシークレット“アウト”選択</h2>
          <p className="text-center text-gray-600 mb-4">相手には見せないでね</p>
          <div className="relative mt-2 h-[320px] bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border">
            {board.map((s) => (
              <button
                key={s.id}
                onClick={() => handleTrapPick("B", s.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-transparent"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title="アウトにするケーキを選ぶ"
              >
                <div className="text-4xl hover:scale-110 transition-transform">🍰</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "ready" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">準備完了</h2>
          <p className="text-gray-600">この配置のままゲームを開始します</p>
          <div className="relative mt-4 h-[240px] bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border">
            {board.filter((s) => !removed.has(s.id)).map((s) => (
              <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 select-none" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <div className="text-3xl">🍰</div>
              </div>
            ))}
          </div>
          <button onClick={() => setPhase("playing")} className="mt-4 px-6 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700">ゲームスタート</button>
        </div>
      )}

      {phase === "playing" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-700 text-sm">ターン: <span className="font-bold text-rose-700">{currentPlayerName}</span></div>
            <div className="flex items-center gap-2">
              <button onClick={startGame} className="px-3 py-2 rounded-lg text-xs bg-rose-600 text-white font-semibold hover:bg-rose-700">リマッチ</button>
              <button onClick={() => setPhase("setup")} className="px-3 py-2 rounded-lg text-xs border font-semibold text-gray-700 bg-white hover:bg-gray-50">設定に戻る</button>
            </div>
          </div>
          <div className="relative mt-6 h-[320px] bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border">
            {board.filter((s) => !removed.has(s.id)).map((s) => (
              <button
                key={s.id}
                onClick={() => handlePick(s.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title="ケーキ"
              >
                <div className="text-4xl">🍰</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">勝敗結果</h2>
          {loser && (
            <div className="mb-4">
              <p className="text-lg"><span className="font-bold text-rose-700">{loser === "A" ? nameB : nameA}</span> の勝ち！</p>
              <p className="text-sm text-gray-600">負け: {loser === "A" ? nameA : nameB}</p>
            </div>
          )}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button onClick={startGame} className="px-5 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700">同設定で遊ぶ</button>
            <button onClick={() => setPhase("setup")} className="px-5 py-3 rounded-xl border font-bold text-gray-700 bg-white hover:bg-gray-50">設定に戻る</button>
          </div>
        </div>
      )}
    </div>
  )
}


