"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getTools, type Tool } from "@/lib/actions/tools"
import { useState, useEffect } from "react"

export function PopularTools() {
  const [popularTools, setPopularTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularTools = async () => {
      try {
        const { tools } = await getTools({
          isPopular: true,
          limit: 15,
          userRole: "basic", // プレミアムツールと非公開ツールを除外
        })
        setPopularTools(tools)
      } catch (error) {
        console.error("人気のツール取得エラー:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularTools()
  }, [])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        whileHover={{ y: -2 }}
      >
        <Card className="overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-base font-semibold text-blue-900 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1.5 text-blue-500" />
              人気のツール
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-base font-semibold text-blue-900 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1.5 text-blue-500" />
            人気のツール
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="space-y-1.5">
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <Link
                  href={tool.href}
                  className="block text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors duration-200"
                >
                  {tool.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
