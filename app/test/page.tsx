"use client";

import React, { useMemo, useState } from "react";
import { BackgroundAnimation } from "@/components/background-animation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type Player = { id: number; name: string; score: number };
type Phase = "setup" | "playing" | "result";

export default function TestPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [rounds, setRounds] = useState<number>(10); // 0 = 無限
  const isInfinite = rounds === 0;
  const [turnBanner, setTurnBanner] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", score: 0 },
    { id: 2, name: "Player 2", score: 0 },
  ]);

  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [selections, setSelections] = useState<Record<number, number>>({}); // playerId -> 0|1|2
  const [winningCard, setWinningCard] = useState<number | null>(null);
  const [history, setHistory] = useState<
    Array<{ round: number; winning: number; picks: Array<{ playerId: number; pick: number; hit: boolean }> }>
  >([]);

  const sortedLeaderboard = useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  const applyNumPlayers = (n: number) => {
    setNumPlayers(n);
    const next = Array.from({ length: n }, (_, i) => players[i] || { id: i + 1, name: `Player ${i + 1}`, score: 0 });
    setPlayers(next.map((p, i) => ({ ...p, id: i + 1 })));
  };

  const startGame = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setSelections({});
    setWinningCard(null);
    setHistory([]);
    setPhase("playing");
    // 初手プレイヤーのターン表示
    setTimeout(() => {
      const first = players[0]?.name || "Player 1";
      setTurnBanner(`${first}`);
      setTimeout(() => setTurnBanner(null), 1000);
    }, 100);
  };

  const handlePick = (cardIndex: number) => {
    // Ignore clicks if reveal in progress
    if (winningCard !== null) return;
    const player = players[currentPlayerIndex];
    const nextSel = { ...selections, [player.id]: cardIndex };
    setSelections(nextSel);

    const isLastPlayerThisRound = currentPlayerIndex === players.length - 1;
    if (!isLastPlayerThisRound) {
      const nextIndex = currentPlayerIndex + 1;
      setCurrentPlayerIndex(nextIndex);
      // 次のプレイヤーのターン表示
      setTimeout(() => {
        const name = players[nextIndex]?.name || `Player ${nextIndex + 1}`;
        setTurnBanner(`${name}`);
        setTimeout(() => setTurnBanner(null), 900);
      }, 50);
      return;
    }

    // Reveal winning card and score
    const winning = Math.floor(Math.random() * 3);
    setWinningCard(winning);

    const picks = players.map((p) => {
      const pick = nextSel[p.id];
      const hit = pick === winning;
      return { playerId: p.id, pick, hit };
    });

    // Update scores
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, score: picks.find((x) => x.playerId === p.id)?.hit ? p.score + 1 : p.score })),
    );

    // Save history for this round
    setHistory((prev) => [...prev, { round: currentRound, winning, picks }]);

    // Proceed to next round after a short delay
    setTimeout(() => {
      if (!isInfinite && currentRound >= rounds) {
        setPhase("result");
        return;
      }
      setCurrentRound((r) => r + 1);
      setCurrentPlayerIndex(0);
      setSelections({});
      setWinningCard(null);
      // 新しいラウンドの先頭プレイヤーのターン表示
      setTimeout(() => {
        const first = players[0]?.name || "Player 1";
        setTurnBanner(`${first}`);
        setTimeout(() => setTurnBanner(null), 900);
      }, 80);
    }, 1200);
  };

  const resetGame = () => {
    setPhase("setup");
    setPlayers((prev) => prev.map((p, i) => ({ id: i + 1, name: `Player ${i + 1}`, score: 0 })));
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setSelections({});
    setWinningCard(null);
    setHistory([]);
  };

  const renderCards = (disabled: boolean) => {
    const labels = ["A", "B", "C"];
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
        {labels.map((label, idx) => {
          const isWin = winningCard === idx;
          const isCurrent = players[currentPlayerIndex]?.id != null;
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
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        {turnBanner && (
          <div className="fixed inset-x-0 top-16 z-30 flex justify-center pointer-events-none">
            <div className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-extrabold shadow-lg animate-bounce">
              <span>🎮</span>
              <span>{turnBanner} のターン！</span>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {phase === "setup" && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-4 text-center">カード三択バトル</h1>
                <p className="text-center text-gray-600 mb-6">3枚のカードから当たりを当ててスコアを競うシンプルゲーム</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">プレイヤー数</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={numPlayers}
                        onChange={(e) => applyNumPlayers(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm font-bold w-8 text-right">{numPlayers}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ラウンド数</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={20}
                        value={rounds}
                        onChange={(e) => setRounds(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm font-bold w-16 text-right">{isInfinite ? '∞' : rounds}</span>
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
                        onChange={(e) =>
                          setPlayers((prev) => prev.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))
                        }
                        placeholder={`Player ${i + 1}`}
                        className="flex-1 rounded-md border px-3 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow hover:opacity-95"
                  >
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
                  {!isInfinite && (
                    <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${(currentRound-1)/(rounds)*100}%` }} />
                    </div>
                  )}

                  <div className="mt-4">
                    {renderCards(false)}
                  </div>

                  {winningCard !== null && (
                    <div className="text-center mt-4">
                      <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold">
                        当たりは {['A','B','C'][winningCard]}！
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border p-4">
                    <h2 className="font-bold mb-3">スコア / 今回の選択</h2>
                    <ul className="space-y-2">
                      {players.slice(0, numPlayers).map((p, i) => {
                        const pick = selections[p.id];
                        const pickedLabel = pick != null ? ['A','B','C'][pick] : '未選択';
                        const isHit = winningCard !== null && pick === winningCard;
                        return (
                          <li key={p.id} className={`flex items-center justify-between rounded-lg px-3 py-2 border ${i===currentPlayerIndex? 'bg-blue-50 border-blue-200 animate-pulse':'bg-white'}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{p.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${pick==null? 'text-gray-500 border-gray-300':'text-gray-700 border-gray-300'}`}>{pickedLabel}</span>
                              {winningCard !== null && (
                                <span className={`text-xs font-bold ${isHit? 'text-green-600':'text-red-500'}`}>{isHit? 'HIT':'MISS'}</span>
                              )}
                            </div>
                            <span className="text-gray-700">{p.score} pt</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow border p-4">
                    <h2 className="font-bold mb-3">履歴</h2>
                    <div className="text-xs text-gray-600 space-y-2 max-h-64 overflow-auto pr-1">
                      {history.slice().reverse().map((h, idx) => (
                        <div key={idx} className="border rounded-lg p-2 bg-white">
                          <div className="mb-1 font-semibold">R{h.round} 当たり: {['A','B','C'][h.winning]}</div>
                          <div className="grid grid-cols-2 gap-1">
                            {h.picks.map((pk) => (
                              <div key={`${h.round}-${pk.playerId}`} className="flex items-center justify-between text-gray-700">
                                <span>#{pk.playerId}</span>
                                <span>{['A','B','C'][pk.pick]}</span>
                                <span className={`font-bold ${pk.hit? 'text-green-600':'text-gray-400'}`}>{pk.hit? '✓':'-'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
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
                      <li key={p.id} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${idx===0? 'bg-yellow-50 border-yellow-300':'bg-white'}`}>
                        <span className="font-semibold text-gray-800">{idx+1}位 {p.name}</span>
                        <span className="text-gray-700">{p.score} pt</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={startGame}
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                  >
                    もう一度同じ設定で遊ぶ
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-5 py-3 rounded-xl border font-bold text-gray-700 bg-white hover:bg-gray-50"
                  >
                    設定に戻る
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


