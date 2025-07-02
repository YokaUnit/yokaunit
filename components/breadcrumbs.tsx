"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-1 text-sm text-gray-500 mb-4"
      aria-label="パンくずリスト"
    >
      <Link
        href="/"
        className="flex items-center hover:text-blue-600 transition-colors duration-200"
        aria-label="ホームページに戻る"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center space-x-1"
        >
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="font-medium text-gray-900" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 transition-colors duration-200">
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </motion.nav>
  )
}
