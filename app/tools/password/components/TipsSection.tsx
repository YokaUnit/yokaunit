import { Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TipsSection() {
  return (
    <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h3 className="font-semibold text-lg">💡 パスワード作成のプロのヒント</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              🛡️ セキュリティ
            </Badge>
            <div>
              <p className="text-sm font-medium">16文字以上を推奨</p>
              <p className="text-xs text-gray-600">長いパスワードほど安全性が向上します</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              🔒 複雑性
            </Badge>
            <div>
              <p className="text-sm font-medium">4種類の文字を組み合わせ</p>
              <p className="text-xs text-gray-600">大文字・小文字・数字・記号を混在させましょう</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              📱 管理
            </Badge>
            <div>
              <p className="text-sm font-medium">パスワードマネージャーを活用</p>
              <p className="text-xs text-gray-600">1Password、Bitwardenなどのツールがおすすめ</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              🔄 更新
            </Badge>
            <div>
              <p className="text-sm font-medium">定期的な変更</p>
              <p className="text-xs text-gray-600">重要なアカウントは3-6ヶ月ごとに更新</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
