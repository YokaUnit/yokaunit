"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { RouletteItem } from "../lib/types"

interface RouletteWheelProps {
  items: RouletteItem[]
  isSpinning: boolean
  result: RouletteItem | null
  targetIndex?: number | null
  onSpinComplete?: () => void
}

export function RouletteWheel({ items, isSpinning, result, targetIndex = null, onSpinComplete }: RouletteWheelProps) {
  const [rotation, setRotation] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const rafRef = useRef<number | null>(null)
  const spinStartTime = useRef<number | null>(null)
  const totalRotationRef = useRef(0)
  const [phase, setPhase] = useState<"idle" | "accelerate" | "cruise" | "decelerate">("idle")
  const audioCtxRef = useRef<AudioContext | null>(null)
  const lastTickIndexRef = useRef<number>(-1)
  const pinKickRef = useRef(0)

  const anglePerItem = useMemo(() => (items.length > 0 ? 360 / items.length : 360), [items.length])

  // SVG円弧パス生成
  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = (angleDeg - 90) * Math.PI / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`
  }

  useEffect(() => {
    if (!isSpinning || items.length === 0) {
      setPhase("idle")
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const startTime = performance.now()
    spinStartTime.current = startTime
    const initialRotation = totalRotationRef.current

    // 目標インデックス（事前決定）と目標角度
    const target = (typeof targetIndex === "number" && targetIndex >= 0) ? targetIndex : Math.floor(Math.random() * items.length)
    const anglePer = anglePerItem
    // 最低周回数（じらし効果）
    const baseTurns = 6 + Math.floor(Math.random() * 4) // 6-9周
    const targetAngle = baseTurns * 360 + target * anglePer

    const accelerateMs = 550
    const cruiseMs = 800
    const decelerateMs = 1400
    const totalMs = accelerateMs + cruiseMs + decelerateMs

    setPhase("accelerate")

    const tickState = { lastTickIndex: -1 }

    const animate = (now: number) => {
      const elapsed = now - startTime
      let rot = initialRotation

      if (elapsed <= accelerateMs) {
        // 加速: ease-outで素早く加速
        const t = elapsed / accelerateMs
        const ease = t * t
        rot = initialRotation + ease * (targetAngle * 0.2)
        setPhase("accelerate")
      } else if (elapsed <= accelerateMs + cruiseMs) {
        // 巡航: 一定速度
        const t = (elapsed - accelerateMs) / cruiseMs
        rot = initialRotation + (targetAngle * 0.2) + t * (targetAngle * 0.5)
        setPhase("cruise")
      } else if (elapsed <= totalMs) {
        // 減速: 強めのease-outでじらす
        const t = (elapsed - accelerateMs - cruiseMs) / decelerateMs
        const ease = 1 - Math.pow(1 - t, 3)
        // ピンに当たる近接時は微小ブレーキ（じらし）
        const base = initialRotation + (targetAngle * 0.7) + ease * (targetAngle * 0.3)
        const atDeg = base % 360
        const distanceToSeparator = Math.min(
          ...Array.from({ length: items.length }, (_, i) => Math.abs(atDeg - i * anglePer))
        )
        const near = distanceToSeparator < Math.max(2, anglePer * 0.04) // 角度閾値
        rot = base - (near ? Math.min(1.5, (Math.max(0.5, 2 - distanceToSeparator)) * 0.6) : 0)
        setPhase("decelerate")
      } else {
        rot = initialRotation + targetAngle
      }

      setRotation(rot)
      totalRotationRef.current = rot

      // 現在インデックス更新とチック演出
      // ポインタは12時方向固定。回転角から現在セグメントを逆算
      const pointerAngle = ((360 - (rot % 360)) + 360) % 360
      const idx = Math.floor(pointerAngle / anglePer) % items.length
      if (idx !== currentIndex) {
        setCurrentIndex(idx)
        // 軽量なチック音（WebAudio）
        try {
          if (!audioCtxRef.current) {
            const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
            if (Ctx) audioCtxRef.current = new Ctx()
          }
          const ctx = audioCtxRef.current
          if (ctx && ctx.state !== "suspended") {
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.frequency.value = 900
            g.gain.value = 0.0001
            o.connect(g)
            g.connect(ctx.destination)
            const t = ctx.currentTime
            o.start(t)
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.03)
            o.stop(t + 0.04)
          }
        } catch {}
      }

      if (elapsed < totalMs) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // 最終位置を結果に合わせて微調整
        const snap = target * anglePer
        setRotation(initialRotation + baseTurns * 360 + snap)
        totalRotationRef.current = initialRotation + baseTurns * 360 + snap
        setCurrentIndex(target)
        onSpinComplete?.()
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isSpinning, items, targetIndex, onSpinComplete, currentIndex])

  if (items.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">🎰</div>
          <p className="text-lg">ルーレット項目を追加してください</p>
        </div>
      </div>
    )
  }

  const size = 400
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 8

  return (
    <div className="w-full max-w-2xl mx-auto aspect-square relative">
      {/* ルーレット本体 */}
      <div className="relative w-full h-full">
        <motion.div
          className="w-full h-full rounded-full border-8 border-gray-800 shadow-2xl relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotate: rotation, scale: isSpinning ? [1, 1.03, 1] : 1 }}
          transition={{ scale: { duration: 0.3, repeat: isSpinning ? Infinity : 0 } }}
        >
          <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
            <defs>
              <radialGradient id="wheelGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
              </radialGradient>
            </defs>
            <circle cx={cx} cy={cy} r={radius} fill="url(#wheelGlow)" />

            {items.map((item, index) => {
              // 1つ→360°, 2つ→各180°
              const start = index * anglePerItem
              const end = (index + 1) * anglePerItem
              const d = describeArc(cx, cy, radius, start, end)
              const active = currentIndex === index && phase !== "idle"
              return (
                <g key={item.id}>
                  <path d={d} fill={item.color} opacity={active ? 1 : 0.95} />
                  {/* 境界線 */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={polarToCartesian(cx, cy, radius, start).x}
                    y2={polarToCartesian(cx, cy, radius, start).y}
                    stroke="white"
                    strokeOpacity="0.6"
                    strokeWidth="2"
                  />
                  {/* ラベル */}
                  <g transform={`rotate(${start + anglePerItem / 2} ${cx} ${cy})`}>
                    <foreignObject x={cx - (items.length <= 2 ? 90 : 50)} y={cy - radius * 0.7} width={items.length <= 2 ? 180 : 100} height={radius * 0.6}>
                      <div className="flex flex-col items-center justify-center text-center" style={{ transform: "rotate(-90deg)" }}>
                        {item.emoji && <div className={items.length <= 2 ? "text-5xl" : "text-3xl"}>{item.emoji}</div>}
                        <div className={`${items.length <= 2 ? "text-xl" : "text-sm"} font-bold text-white drop-shadow-lg`}>{item.name}</div>
                        {item.weight !== 1 && (
                          <div className={`${items.length <= 2 ? "text-sm" : "text-xs"} text-white/80`}>{item.weight.toFixed(1)}x</div>
                        )}
                      </div>
                    </foreignObject>
                  </g>
                </g>
              )
            })}
          </svg>
        </motion.div>

        {/* 上部の固定ピン（わずかにバウンド） */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 origin-top"
          animate={{ rotate: phase === "decelerate" ? [0, -3, 0] : 0 }}
          transition={{ duration: 0.2, repeat: phase === "decelerate" ? Infinity : 0 }}
        >
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[28px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" />
          <div className="mx-auto h-2 w-10 bg-yellow-300/70 blur-sm rounded-full" />
        </motion.div>

        {/* 中央の円 */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="w-24 h-24 bg-white rounded-full border-4 border-gray-800 shadow-xl flex items-center justify-center"
            animate={{
              scale: isSpinning ? [1, 1.1, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 0.2,
                repeat: isSpinning ? Infinity : 0,
              }
            }}
          >
            {isSpinning ? (
              <motion.div
                className="text-4xl"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                🎰
              </motion.div>
            ) : result ? (
              <div className="text-4xl">{result.emoji || "🎉"}</div>
            ) : (
              <div className="text-4xl">🎲</div>
            )}
          </motion.div>
        </div>

        {/* パーティクル効果（スピン中） */}
        <AnimatePresence>
          {isSpinning && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 現在の項目表示（スピン中） */}
      {isSpinning && (
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
            <div className="text-2xl mb-1">
              {items[currentIndex]?.emoji || "🎲"}
            </div>
            <div className="text-lg font-bold text-gray-800">
              {items[currentIndex]?.name || "回転中..."}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

