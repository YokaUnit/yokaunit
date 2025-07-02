export const dynamic = "force-dynamic"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Wrench, Calculator, Key, Sparkles } from "lucide-react"

const popularTools = [
  { name: "パスワード生成", href: "/tools/password", icon: Key },
  { name: "チンチロ", href: "/tools/chinchiro", icon: Sparkles },
  { name: "計算ツール", href: "/tools", icon: Calculator },
  { name: "その他ツール", href: "/tools", icon: Wrench },
]

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="YokaUnit"
                width={80}
                height={80}
                className="mx-auto hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Illustration */}
          <div className="mb-8">
            <div className="relative w-64 h-64 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-center">
                  <Wrench className="h-16 w-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">ツールが見つかりません</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              おっと！ページが見つかりませんでした
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              お探しのページは移動、削除、または一時的に利用できない可能性があります。
              <br />
              でも大丈夫！他にも便利なツールがたくさんあります。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>

          {/* Popular Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">人気のツール</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {popularTools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Card
                    key={tool.name}
                    className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-4 text-center">
                      <Link href={tool.href} className="block">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</p>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 p-4 rounded-2xl backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">豆知識</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              404エラーの「404」は、HTTPステータスコードの一つで、 「Not Found（見つかりません）」を意味します。
              インターネットの歴史と共に歩んできた、ちょっと有名な数字なんです！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
