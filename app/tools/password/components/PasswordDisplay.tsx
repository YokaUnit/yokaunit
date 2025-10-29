import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Eye, EyeOff, RefreshCw, Shield } from "lucide-react"
import { PasswordStrengthAnalysis } from '../types'
import { getStrengthIcon, getStrengthText } from '../utils'

interface PasswordDisplayProps {
  password: string
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  copied: boolean
  isGenerating: boolean
  strengthAnalysis: PasswordStrengthAnalysis
  onCopy: () => void
  onGenerate: () => void
}

export function PasswordDisplay({
  password,
  showPassword,
  setShowPassword,
  copied,
  isGenerating,
  strengthAnalysis,
  onCopy,
  onGenerate
}: PasswordDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={() => {}} // readOnly
              className="font-mono text-lg h-14 border-2 focus:border-indigo-500 text-center sm:text-left pr-12"
              readOnly
              placeholder="パスワードを生成してください..."
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2 justify-center sm:justify-start">
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700"
              onClick={onCopy}
              title="クリップボードにコピー"
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700"
              onClick={onGenerate}
              disabled={isGenerating}
              title="新しいパスワードを生成"
            >
              <RefreshCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* パスワード強度分析 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 ${getStrengthIcon(strengthAnalysis.strength)}`} />
              <span className="font-medium">パスワード強度:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${getStrengthIcon(strengthAnalysis.strength)}`}>
                {getStrengthText(strengthAnalysis.strength)}
              </span>
              <Badge variant="outline" className="text-xs">
                {strengthAnalysis.strength}/8
              </Badge>
            </div>
          </div>

          <Progress 
            value={(strengthAnalysis.strength / 8) * 100} 
            className="h-3"
          />

          {/* 詳細分析 */}
          {password && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{strengthAnalysis.entropy}</div>
                <div className="text-xs text-gray-500">エントロピー</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{password.length}</div>
                <div className="text-xs text-gray-500">文字数</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{strengthAnalysis.complexity}</div>
                <div className="text-xs text-gray-500">文字種</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-bold text-purple-600">{strengthAnalysis.timeToCrack}</div>
                <div className="text-xs text-gray-500">クラック時間</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
