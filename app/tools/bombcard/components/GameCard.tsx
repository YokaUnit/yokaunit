"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GameCardProps {
  index: number
  isSelected: boolean
  isFlipped: boolean
  isBomb: boolean
  onClick: () => void
  disabled: boolean
}

export function GameCard({ index, isSelected, isFlipped, isBomb, onClick, disabled }: GameCardProps) {
  return (
    <div className="perspective-1000 w-full mx-auto" style={{ width: "80px", height: "110px" }}>
      <motion.div
        className={cn("relative w-full h-full cursor-pointer", disabled && "cursor-not-allowed opacity-50")}
        onClick={disabled ? undefined : onClick}
        whileHover={!disabled ? { scale: 1.05, y: -2 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: isSelected && isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        {/* カード裏面（初期状態 - YokaUnitロゴ） */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl border-2 border-blue-200 flex flex-col items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src="/logo.png" alt="YokaUnit" className="w-8 h-8 mb-1 object-contain" />
          <div className="text-xs font-bold text-blue-700 text-center leading-tight">YokaUnit</div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        </div>

        {/* カード表面（フリップ後 - 結果表示） */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl shadow-xl border-2 flex items-center justify-center text-white font-bold text-sm tracking-wide",
            isBomb
              ? "bg-gradient-to-br from-red-500 via-red-600 to-red-700 border-red-400"
              : "bg-gradient-to-br from-green-500 via-green-600 to-green-700 border-green-400",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center relative">
            <motion.div
              className="text-xl mb-1"
              animate={isBomb ? { rotate: [0, -10, 10, -10, 0] } : { scale: [1, 1.1, 1] }}
              transition={{ duration: 0.4, repeat: isBomb ? 2 : 1 }}
            >
              {isBomb ? "💣" : "✅"}
            </motion.div>
            <div className="text-xs font-bold tracking-wider">{isBomb ? "BOMB" : "SAFE"}</div>
            {isBomb && (
              <motion.div
                className="absolute -top-1 -right-1 text-yellow-300 text-xs"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 0.25, repeat: 3 }}
              >
                ⚡
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
