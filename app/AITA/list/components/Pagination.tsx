"use client"

import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = "/AITA/list" }: PaginationProps) {
  const pages = []
  const maxVisible = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let endPage = Math.min(totalPages, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="ページネーション">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors border border-white/10"
        >
          前へ
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={`${basePath}?page=1`}
            className="px-3 py-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors border border-white/10"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-2 rounded-lg transition-colors border ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-500"
              : "bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border-white/10"
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <Link
            href={`${basePath}?page=${totalPages}`}
            className="px-3 py-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors border border-white/10"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors border border-white/10"
        >
          次へ
        </Link>
      )}
    </nav>
  )
}

