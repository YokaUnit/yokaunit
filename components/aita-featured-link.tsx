"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AITAFeaturedLink() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-6"
    >
      <Link href="/AITA" className="block">
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-red-200 bg-gradient-to-br from-red-50 to-white hover:translate-y-[-2px]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* 炎のロゴ */}
              <div className="flex-shrink-0">
                <Image
                  src="/yokaunit_fire.png"
                  alt="炎"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                  priority
                />
              </div>

              {/* テキストコンテンツ */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-red-900 group-hover:text-red-700 transition-colors">
                    世界炎上裁判所
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">by YokaUnit</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 leading-relaxed mb-1">
                  「これって私が悪い？」Redditの人気掲示板「AITA（Am I The Asshole?／これって私が悪い？）」の投稿を、日本人の価値観で「アウト／セーフ」に判定！
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  TikTokのような縦型スクロールで、恋愛・家族・友人関係などの海外トラブルを次々と楽しめる参加型コンテンツ。自分の判断と日本人の判定、海外の判定割合を比べて、価値観の違いを発見しよう！
                </p>
              </div>

              {/* 矢印アイコン */}
              <div className="flex-shrink-0">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

