"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section 
      className="relative py-10 md:py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/hero/sky.png)',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center bg-white/60 backdrop-blur-md rounded-2xl px-6 py-8 shadow-lg"
        >
          <motion.h1
            className="text-2xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="text-blue-600 inline-block"
              whileHover={{ scale: 1.05, color: "#1E40AF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              "こんなの欲しかった"
            </motion.span>
            を、
            <br />
            カタチにするサイト
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            無料で便利なWebツールを多数公開中。
            <br className="hidden sm:block" />
            あなたの「あったらいいな」も実現します。
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-5 text-base font-medium shadow-lg w-full sm:w-auto transition-all duration-300"
                onClick={() => {
                  window.location.href = "/tools"
                }}
              >
                ツールを探す
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
