"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Player } from "../hooks/useBombCardGame"

interface PlayerInfoProps {
  players: Player[]
  currentPlayerIndex: number
  showCardReduction: boolean
}

export function PlayerInfo({ players, currentPlayerIndex, showCardReduction }: PlayerInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-1 mb-2">
        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
        <h3 className="text-xs font-bold text-gray-700">プレイヤー</h3>
        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {players.map((player, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-lg p-2 border-2 transition-all duration-300",
              index === currentPlayerIndex && !player.isEliminated
                ? "bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 shadow-md"
                : player.isEliminated
                  ? "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 opacity-70"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
            )}
            animate={index === currentPlayerIndex && !player.isEliminated ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* アクティブプレイヤーの光る効果 */}
            {index === currentPlayerIndex && !player.isEliminated && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-200/50 to-red-200/50 rounded-lg"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    index === currentPlayerIndex && !player.isEliminated
                      ? "bg-orange-500 animate-pulse"
                      : player.isEliminated
                        ? "bg-red-500"
                        : "bg-blue-400",
                  )}
                />
                <span
                  className={cn(
                    "font-bold text-xs truncate",
                    player.isEliminated ? "text-red-600 line-through" : "text-gray-800",
                  )}
                >
                  {player.name}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <AnimatePresence>
                  {showCardReduction && index === currentPlayerIndex && player.previousCards !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 10 }}
                      className="text-xs font-bold text-red-600 bg-red-100 px-1 py-0.5 rounded-full whitespace-nowrap"
                    >
                      💥
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className={cn(
                    "text-xs font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap",
                    player.isEliminated
                      ? "bg-red-100 text-red-600"
                      : index === currentPlayerIndex
                        ? "bg-orange-200 text-orange-800"
                        : "bg-blue-100 text-blue-800",
                  )}
                >
                  {player.remainingCards}枚
                </div>
              </div>
            </div>

            {player.isEliminated && (
              <div className="absolute top-0.5 right-0.5 text-xs font-bold text-red-500 bg-red-100 px-1 rounded text-xs">
                ×
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
