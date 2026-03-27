"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

export function YokaUnitSeriesSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-6"
    >
      <section className="mb-8">
        <motion.h2
          className="text-xl font-bold text-gray-900 mb-4 relative inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          YokaUnitシリーズ
          <motion.span
            className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.h2>
      </section>

      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}
