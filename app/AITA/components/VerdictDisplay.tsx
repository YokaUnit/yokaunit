"use client"

import { motion } from "framer-motion"
import { AITAPost, PostState } from "../lib/types"

interface VerdictDisplayProps {
  post: AITAPost
  state: PostState
}

export default function VerdictDisplay({ post, state }: VerdictDisplayProps) {
  const difference = state.japaneseVerdict.out - post.redditVerdict.out

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-4 sm:mb-6 md:mb-8"
    >
      <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-center px-2">
        日本人の判決
      </h3>
      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl">🔴</span>
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">
              アウト
            </span>
          </div>
          <span className="text-white font-bold text-base sm:text-lg md:text-xl">
            {state.japaneseVerdict.out}%
          </span>
        </div>
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl">🟢</span>
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">
              セーフ
            </span>
          </div>
          <span className="text-white font-bold text-base sm:text-lg md:text-xl">
            {state.japaneseVerdict.safe}%
          </span>
        </div>
      </div>
      <div className="text-center px-2">
        <p className="text-white text-xs sm:text-sm">
          海外との差{" "}
          <span className="font-bold text-sm sm:text-base md:text-lg">
            {difference > 0 ? "+" : ""}
            {difference}%
          </span>
        </p>
      </div>
    </motion.div>
  )
}

