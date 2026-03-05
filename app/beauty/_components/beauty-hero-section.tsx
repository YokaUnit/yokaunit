"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function BeautyHeroSection() {
  return (
    <section className="relative py-10 md:py-16 bg-gradient-to-b from-rose-50 via-rose-50 to-rose-100">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center bg-white/85 backdrop-blur-md rounded-3xl px-6 py-8 md:px-10 md:py-10 shadow-xl border border-rose-100"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/logo_heart.png"
                alt="YokaUnit Beauty"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="text-left">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                YokaUnit Beauty
              </p>
              <p className="text-sm md:text-base text-rose-700">
                あなたの「似合う」を見つける美容診断サイト
              </p>
            </div>
          </div>

          <motion.h1
            className="text-2xl md:text-4xl font-bold text-rose-950 mb-4 leading-snug"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            あなたの素肌に
            <span className="inline-block text-rose-500 ml-1 mr-1">本当に合う</span>
            美容が、わかる。
          </motion.h1>

          <motion.p
            className="text-sm md:text-lg text-rose-800 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            肌質・毛穴・パーソナルカラー……。
            <br className="hidden md:block" />
            「なんとなく」でコスメを選ぶ前に、
            <span className="font-semibold text-rose-600">診断で自分のタイプを知る。</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-7 py-5 text-base font-semibold shadow-lg shadow-rose-200 w-full sm:w-auto transition-all duration-300"
                onClick={() => {
                  window.location.href = "/beauty/diagnosis/skin-type"
                }}
              >
                無料で肌質診断をはじめる
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-rose-300 text-rose-800 hover:bg-rose-50 rounded-full px-7 py-5 text-base font-medium w-full sm:w-auto"
                onClick={() => {
                  window.location.href = "/beauty/diagnosis"
                }}
              >
                他の美容診断を見る
              </Button>
            </motion.div>
          </motion.div>

          <p className="mt-4 text-xs md:text-sm text-rose-600">
            所要時間は約<span className="font-semibold">1〜2分</span>。すべて無料・登録不要で使えます。
          </p>
        </motion.div>
      </div>
    </section>
  )
}

