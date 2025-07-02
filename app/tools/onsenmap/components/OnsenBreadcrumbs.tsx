import Link from "next/link"
import { ChevronRight, Home, Map } from "lucide-react"

interface OnsenBreadcrumbsProps {
  currentPage?: string
}

export function OnsenBreadcrumbs({ currentPage }: OnsenBreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg px-2 md:px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="w-3 md:w-4 h-3 md:h-4 mr-1" />
        <span className="hidden sm:inline">ホーム</span>
      </Link>
      <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-gray-400" />
      <Link href="/tools" className="hover:text-blue-600 transition-colors">
        ツール
      </Link>
      <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-gray-400" />
      <Link href="/tools/onsenmap" className="flex items-center hover:text-blue-600 transition-colors">
        <Map className="w-3 md:w-4 h-3 md:h-4 mr-1" />
        温泉マップ
      </Link>
      {currentPage && (
        <>
          <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-32 md:max-w-none" title={currentPage}>
            {currentPage}
          </span>
        </>
      )}
    </nav>
  )
}
