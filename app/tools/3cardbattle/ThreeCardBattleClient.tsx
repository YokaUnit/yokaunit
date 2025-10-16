"use client"

import React, { useMemo, useState } from "react"
import { BackgroundAnimation } from "@/components/background-animation"

type Player = { id: number; name: string; score: number }
type Phase = "setup" | "playing" | "result"

export default function ThreeCardBattleClient() {
  const [phase, setPhase] = useState<Phase>("setup")
  const [numPlayers, setNumPlayers] = useState<number>(2)
  const [rounds, setRounds] = useState<number>(10) // 0 = 無限
  const isInfinite = rounds === 0
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", score: 0 },
    { id: 2, name: "Player 2", score: 0 },
  ])

  const [currentRound, setCurrentRound] = useState<number>(1)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
  const [selections, setSelections] = useState<Record<number, number>>({}) // playerId -> 0|1|2
  const [winningCard, setWinningCard] = useState<number | null>(null)
  const [history, setHistory] = useState<
    Array<{ round: number; winning: number; picks: Array<{ playerId: number; pick: number; hit: boolean }> }>
  >([])
  const [turnBanner, setTurnBanner] = useState<string | null>(null)
  const [pendingReveal, setPendingReveal] = useState<boolean>(false)

  const sortedLeaderboard = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players])

  const applyNumPlayers = (n: number) => {
    setNumPlayers(n)
    const next = Array.from({ length: n }, (_, i) => players[i] || { id: i + 1, name: `Player ${i + 1}`, score: 0 })
    setPlayers(next.map((p, i) => ({ ...p, id: i + 1 })))
  }

  const startGame = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })))
    setCurrentRound(1)
    setCurrentPlayerIndex(0)
    setSelections({})
    setWinningCard(null)
    setHistory([])
    setPhase("playing")
    setTimeout(() => {
      const first = players[0]?.name || "Player 1"
      setTurnBanner(`${first}`)
      setTimeout(() => setTurnBanner(null), 1000)
    }, 100)
  }

  const handlePick = (cardIndex: number) => {
    if (winningCard !== null || pendingReveal) return
    const player = players[currentPlayerIndex]
    const nextSel = { ...selections, [player.id]: cardIndex }
    setSelections(nextSel)

    const isLastPlayerThisRound = currentPlayerIndex === players.length - 1
    if (!isLastPlayerThisRound) {
      const nextIndex = currentPlayerIndex + 1
      setCurrentPlayerIndex(nextIndex)
      setTimeout(() => {
        const name = players[nextIndex]?.name || `Player ${nextIndex + 1}`
        setTurnBanner(`${name}`)
        setTimeout(() => setTurnBanner(null), 900)
      }, 50)
      return
    }
    // Last player picked → wait for manual reveal
    setPendingReveal(true)
  }

  const revealWinning = () => {
    if (pendingReveal === false || winningCard !== null) return
    const winning = Math.floor(Math.random() * 3)
    setWinningCard(winning)

    const picks = players.map((p) => {
      const pick = selections[p.id]
      const hit = pick === winning
      return { playerId: p.id, pick, hit }
    })

    setPlayers((prev) => prev.map((p) => ({ ...p, score: picks.find((x) => x.playerId === p.id)?.hit ? p.score + 1 : p.score })))
    setHistory((prev) => [...prev, { round: currentRound, winning, picks }])

    setTimeout(() => {
      if (!isInfinite && currentRound >= rounds) {
        setPhase("result")
        return
      }
      setCurrentRound((r) => r + 1)
      setCurrentPlayerIndex(0)
      setSelections({})
      setWinningCard(null)
      setPendingReveal(false)
      setTimeout(() => {
        const first = players[0]?.name || "Player 1"
        setTurnBanner(`${first}`)
        setTimeout(() => setTurnBanner(null), 900)
      }, 80)
    }, 1200)
  }

  const renderCards = (disabled: boolean) => {
    const labels = ["A", "B", "C"]
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
        {labels.map((label, idx) => {
          const isWin = winningCard === idx
          return (
            <button
              key={idx}
              disabled={disabled || winningCard !== null}
              onClick={() => handlePick(idx)}
              className={`group relative aspect-[3/4] rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                winningCard === null
                  ? "bg-white/90 hover:shadow-lg hover:border-blue-300"
                  : isWin
                  ? "bg-green-50 border-green-400"
                  : "bg-red-50 border-red-300"
              }`}
              title={`カード ${label}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
              <div className="relative h-full w-full flex items-center justify-center">
                {winningCard === null ? (
                  <span className="font-extrabold text-3xl text-gray-900">{label}</span>
                ) : (
                  <span className={`font-extrabold ${isWin ? "text-3xl text-green-700" : "text-2xl text-red-600"}`}>
                    {isWin ? "HIT!" : "MISS"}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {turnBanner && (
        <div className="fixed inset-x-0 top-16 z-30 flex justify-center pointer-events-none">
          <div className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-extrabold shadow-lg animate-bounce">
            <span>🎮</span>
            <span>{turnBanner} のターン！</span>
          </div>
        </div>
      )}

      {phase === "setup" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4 text-center">3枚カードバトル</h1>
          <p className="text-center text-gray-600 mb-6">3枚のカードから当たりを当ててスコアを競うシンプルゲーム</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-4 border">
              <label className="block text-sm font-semibold text-gray-700 mb-2">プレイヤー数</label>
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={6} value={numPlayers} onChange={(e) => applyNumPlayers(parseInt(e.target.value))} className="w-full" />
                <span className="text-sm font-bold w-8 text-right">{numPlayers}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <label className="block text-sm font-semibold text-gray-700 mb-2">ラウンド数</label>
              <div className="flex items-center gap-2">
                <input type="range" min={0} max={20} value={rounds} onChange={(e) => setRounds(parseInt(e.target.value))} className="w-full" />
                <span className="text-sm font-bold w-16 text-right">{isInfinite ? "∞" : rounds}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">0 にすると無限ラウンド</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {players.slice(0, numPlayers).map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 bg-white rounded-xl border p-3">
                <span className="text-sm text-gray-500 w-20">Player {i + 1}</span>
                <input
                  value={p.name}
                  onChange={(e) => setPlayers((prev) => prev.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                  placeholder={`Player ${i + 1}`}
                  className="flex-1 rounded-md border px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={startGame} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow hover:opacity-95">
              ゲーム開始
            </button>
          </div>
        </div>
      )}

      {phase === "playing" && (
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-gray-700 text-sm">ラウンド {currentRound}{!isInfinite && ` / ${rounds}`}</div>
              <div className="text-gray-700 text-sm">ターン: <span className="font-bold text-blue-700">{players[currentPlayerIndex].name}</span></div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={startGame}
                className="px-3 py-2 rounded-lg text-xs bg-blue-600 text-white font-semibold hover:bg-blue-700"
                title="同じ設定でやり直す"
              >
                同じ設定でやり直す
              </button>
              <button
                onClick={() => setPhase('setup')}
                className="px-3 py-2 rounded-lg text-xs border font-semibold text-gray-700 bg-white hover:bg-gray-50"
                title="設定に戻る"
              >
                設定に戻る
              </button>
            </div>
            {!isInfinite && (
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${(currentRound - 1) / rounds * 100}%` }} />
              </div>
            )}

            <div className="mt-4">{renderCards(pendingReveal)}</div>

            {pendingReveal && winningCard === null && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={revealWinning}
                  className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow"
                >
                  当たりを見る
                </button>
              </div>
            )}

            {winningCard !== null && (
              <div className="text-center mt-4">
                <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold">当たりは {['A','B','C'][winningCard]}！</div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border p-4">
              <h2 className="font-bold mb-3">スコア / 今回の選択</h2>
              <ul className="space-y-2">
                {players.slice(0, numPlayers).map((p, i) => {
                  const pick = selections[p.id]
                  const pickedLabel = pick != null ? ['A','B','C'][pick] : '未選択'
                  const isHit = winningCard !== null && pick === winningCard
                  const pickBadgeClass = pick == null
                    ? 'text-gray-500 border-gray-300 bg-white'
                    : pick === 0
                      ? 'text-rose-700 border-rose-200 bg-gradient-to-r from-rose-50 to-rose-100'
                      : pick === 1
                        ? 'text-amber-700 border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100'
                        : 'text-emerald-700 border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100'
                  return (
                    <li key={p.id} className={`flex items-center justify-between rounded-lg px-3 py-2 border ${i === currentPlayerIndex ? 'bg-blue-50 border-blue-200 animate-pulse' : 'bg-white'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{p.name}</span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border shadow-sm ${pickBadgeClass}`}>{pickedLabel}</span>
                        {winningCard !== null && (
                          <span className={`text-xs font-bold ${isHit ? 'text-green-600' : 'text-red-500'}`}>{isHit ? 'HIT' : 'MISS'}</span>
                        )}
                      </div>
                      <span className="text-gray-700">{p.score} pt</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border p-4">
              <h2 className="font-bold mb-3">履歴（当たりのみ）</h2>
              <div className="text-sm text-gray-700 space-y-2 max-h-64 overflow-auto pr-1">
                {history.slice().reverse().map((h, idx) => {
                  const winners = h.picks.filter((pk) => pk.hit)
                  const winningLabel = ['A','B','C'][h.winning]
                  const winningBadgeClass = h.winning === 0
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : h.winning === 1
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  return (
                    <div key={idx} className="border rounded-lg p-2 bg-white">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                          ラウンド {h.round}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-semibold ${winningBadgeClass}`}>
                          当たりカード: {winningLabel}
                        </span>
                      </div>
                      {winners.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {winners.map((pk) => {
                            const name = players.find((p) => p.id === pk.playerId)?.name || `Player #${pk.playerId}`
                            return (
                              <span
                                key={`${h.round}-${pk.playerId}`}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-300"
                              >
                                {name}
                              </span>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-gray-400">当たりなし</div>
                      )}
                    </div>
                  )
                })}
                {history.length === 0 && <div className="text-center text-gray-400">まだ履歴はありません</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">結果発表</h2>
          <div className="max-w-md mx-auto mb-6">
            <ul className="space-y-2">
              {sortedLeaderboard.slice(0, numPlayers).map((p, idx) => (
                <li key={p.id} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${idx === 0 ? 'bg-yellow-50 border-yellow-300' : 'bg-white'}`}>
                  <span className="font-semibold text-gray-800">{idx + 1}位 {p.name}</span>
                  <span className="text-gray-700">{p.score} pt</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button onClick={startGame} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">もう一度同じ設定で遊ぶ</button>
            <button onClick={() => setPhase('setup')} className="px-5 py-3 rounded-xl border font-bold text-gray-700 bg-white hover:bg-gray-50">設定に戻る</button>
          </div>
        </div>
      )}
    </div>
  )
}


