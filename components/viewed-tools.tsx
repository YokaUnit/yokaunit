"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Tool } from "@/lib/types/tool"

export function ViewedTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViewed = async () => {
      try {
        const res = await fetch("/api/tools?tab=all&sort=views&limit=20&offset=0", { cache: "no-store" })
        if (!res.ok) throw new Error("閲覧数順の取得に失敗しました")
        const json = (await res.json()) as { tools: Tool[] }
        setTools(json.tools || [])
      } catch (e) {
        console.error("閲覧数順の取得に失敗:", e)
      } finally {
        setLoading(false)
      }
    }
    const t = setTimeout(fetchViewed, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} whileHover={{ y: -2 }}>
      <Card className="overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-base font-semibold text-emerald-900 flex items-center">
            <Eye className="h-4 w-4 mr-1.5 text-emerald-600" />
            閲覧数が多いツール
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="space-y-1.5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />)
              : tools.map((tool, index) => (
                  <motion.div key={tool.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: index * 0.02 }}>
                    <div className="flex items-center justify-between">
                      <Link href={tool.href} className="block text-xs text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1.5 rounded transition-colors duration-200">
                        {tool.title}
                      </Link>
                      <div className="flex items-center gap-1 ml-2">
                        <Eye className="h-3 w-3 text-gray-400" />
                        <span className="text-[11px] text-gray-500 tabular-nums">{tool.view_count ?? 0}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


