"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Home, Search, ArrowLeft, Wrench, Calculator, Key, Sparkles } from "lucide-react"
import { useState } from "react"

const popularTools = [
  { name: "パスワード生成", href: "/tools/password", icon: Key },
  { name: "チンチロ", href: "/tools/chinchiro", icon: Sparkles },
  { name: "計算ツール", href: "/tools", icon: Calculator },
  { name: "その他ツール", href: "/tools", icon: Wrench },
]

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Client-side navigation without useRouter
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div className="mb-8" variants={itemVariants}>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="YokaUnit"
                width={80}
                height={80}
                className="mx-auto hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* 404 Number with Animation */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.h1
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Illustration */}
          <motion.div className="mb-8" variants={floatingVariants} animate="animate">
            <div className="relative w-64 h-64 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-center">
                  <Wrench className="h-16 w-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">ツールが見つかりません</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              おっと！ページが見つかりませんでした
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              お探しのページは移動、削除、または一時的に利用できない可能性があります。
              <br />
              でも大丈夫！他にも便利なツールがたくさんあります。
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div className="mb-8" variants={itemVariants}>
            <Card className="max-w-md mx-auto backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardContent className="p-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="ツールを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                ホームに戻る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/tools">
                <Wrench className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                ツール一覧を見る
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back()
                } else {
                  window.location.href = "/"
                }
              }}
              className="group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              前のページに戻る
            </Button>
          </motion.div>

          {/* Popular Tools */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">人気のツール</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {popularTools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <Link href={tool.href} className="block">
                          <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</p>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            className="mt-12 p-4 rounded-2xl backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">豆知識</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              404エラーの「404」は、HTTPステータスコードの一つで、 「Not Found（見つかりません）」を意味します。
              インターネットの歴史と共に歩んできた、ちょっと有名な数字なんです！
            </p>
          </motion.div>
        </motion.div>
      </div>

      <ScrollToTop />
    </div>
  )
}
