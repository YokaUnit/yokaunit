"use client"

import { motion } from "framer-motion"
import { AITAPost } from "../lib/types"

interface CommentsProps {
  comments: AITAPost["comments"]
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="space-y-3">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4"
          >
            <p className="text-white text-xs sm:text-sm leading-relaxed">
              {comment.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

