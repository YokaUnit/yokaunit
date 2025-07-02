"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { getActiveDeveloperMessages } from "@/lib/actions/admin"
import { useEffect, useState } from "react"
import type { DeveloperMessage } from "@/lib/actions/admin"

const defaultMessages = [
  {
    id: "default-1",
    message:
      "今週は企業案件対応中です！来週から新しい要望の選定を再開します。\nポモドーロタイマーが完成しました！ぜひご利用ください。",
    is_active: true,
    created_at: "2023-12-22T00:00:00Z",
    updated_at: "2023-12-22T00:00:00Z",
  },
  {
    id: "default-2",
    message: "MP4→MP3変換ツールは来週完成予定です。お楽しみに！",
    is_active: true,
    created_at: "2023-12-21T00:00:00Z",
    updated_at: "2023-12-21T00:00:00Z",
  },
]

export function AdminMessage() {
  const [messages, setMessages] = useState<DeveloperMessage[]>(defaultMessages)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const activeMessages = await getActiveDeveloperMessages()
        if (activeMessages && activeMessages.length > 0) {
          setMessages(activeMessages)
        }
      } catch (error) {
        console.error("Error fetching developer messages:", error)
        // エラーの場合はデフォルトメッセージを使用
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-blue-100">
            <CardHeader className="pb-2 pt-3 px-3 bg-blue-50 flex flex-row items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/logo_black.png" alt="YokaUnit Developer" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-blue-900">開発者からのメッセージ</h3>
                <p className="text-xs text-blue-700">
                  最終更新: {new Date(message.updated_at).toLocaleDateString("ja-JP")}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-xs text-gray-700 whitespace-pre-line">{message.message}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
