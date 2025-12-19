"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface VoteButtonsProps {
  onVote: (verdict: "out" | "safe") => void
}

export default function VoteButtons({ onVote }: VoteButtonsProps) {
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = (verdict: "out" | "safe") => {
    if (isVoting) return // 既に投票中の場合は何もしない
    
    setIsVoting(true)
    onVote(verdict)
  }

  return (
    <div className="mb-24 sm:mb-8 md:mb-8 pb-4 sm:pb-0" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}>
      <p className="text-center text-white/70 text-xs sm:text-sm mb-2 sm:mb-3 px-2">
        ※投票後、結果が表示されます
      </p>
      <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2">
        <motion.button
          whileHover={isVoting ? {} : { scale: 1.05, y: -2 }}
          whileTap={isVoting ? {} : { scale: 0.95 }}
          onClick={() => handleVote("out")}
          disabled={isVoting}
          className={`relative flex-1 max-w-[140px] sm:max-w-[180px] md:max-w-[220px] text-white font-bold py-5 sm:py-6 md:py-7 px-3 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all shadow-2xl overflow-hidden group touch-manipulation min-h-[120px] sm:min-h-[140px] ${
            isVoting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl md:text-3xl backdrop-blur-sm">
              ✕
            </div>
            <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide">アウト</span>
          </div>
        </motion.button>
        <motion.button
          whileHover={isVoting ? {} : { scale: 1.05, y: -2 }}
          whileTap={isVoting ? {} : { scale: 0.95 }}
          onClick={() => handleVote("safe")}
          disabled={isVoting}
          className={`relative flex-1 max-w-[140px] sm:max-w-[180px] md:max-w-[220px] text-white font-bold py-5 sm:py-6 md:py-7 px-3 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all shadow-2xl overflow-hidden group touch-manipulation min-h-[120px] sm:min-h-[140px] ${
            isVoting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl md:text-3xl backdrop-blur-sm">
              ✓
            </div>
            <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide">セーフ</span>
          </div>
        </motion.button>
      </div>
    </div>
  )
}
