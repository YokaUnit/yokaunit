import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Check, AlertCircle, Clock, Hash } from "lucide-react"
import { UuidValidationResult } from '../types'

interface ValidationDisplayProps {
  validationInput: string
  setValidationInput: (input: string) => void
  validationResults: UuidValidationResult
}

export function ValidationDisplay({
  validationInput,
  setValidationInput,
  validationResults
}: ValidationDisplayProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">検証するUUID</label>
        <Textarea
          value={validationInput}
          onChange={(e) => setValidationInput(e.target.value)}
          placeholder="UUIDを入力してください（例: 123e4567-e89b-12d3-a456-426614174000）"
          className="font-mono text-sm h-20"
        />
      </div>

      {validationInput.trim() && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-4">
            {validationResults.isValid ? (
              <Check className="h-6 w-6 text-green-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500" />
            )}
            <h3 className="text-lg font-semibold">
              {validationResults.isValid ? "有効なUUID" : "無効なUUID"}
            </h3>
          </div>

          {validationResults.isValid && (
            <div className="space-y-4">
              {/* UUID情報 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {validationResults.version || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500">バージョン</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-green-600">
                    {validationResults.format || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500">形式</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-blue-600">
                    {validationResults.variant || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500">バリアント</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-purple-600">
                    {validationInput.length}
                  </div>
                  <div className="text-xs text-gray-500">文字数</div>
                </div>
              </div>

              {/* バージョン別の詳細情報 */}
              {validationResults.version && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="h-4 w-4 text-indigo-600" />
                    <span className="font-medium text-sm">詳細情報</span>
                  </div>
                  
                  {validationResults.timestamp && (
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        <span className="font-medium">タイムスタンプ:</span> {validationResults.timestamp.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {validationResults.node && (
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <span className="font-medium">ノード:</span> {validationResults.node}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* バリデーション結果バッジ */}
              <div className="flex flex-wrap gap-2">
                {validationResults.version && (
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                    {validationResults.version}
                  </Badge>
                )}
                {validationResults.format && (
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                    {validationResults.format}
                  </Badge>
                )}
                {validationResults.variant && (
                  <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
                    {validationResults.variant}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {validationResults.errors && validationResults.errors.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                エラー詳細
              </h4>
              <div className="space-y-2">
                {validationResults.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600 flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <span className="text-red-500 mt-0.5">•</span>
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ヒント */}
      <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Hash className="h-5 w-5 text-indigo-500" />
          <h3 className="font-medium text-sm sm:text-base">UUID検証のポイント</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              形式
            </Badge>
            <p>8-4-4-4-12の形式でハイフンで区切られた32文字の16進数です。</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              バージョン
            </Badge>
            <p>13番目の文字でバージョン（1-5）が識別されます。</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
              バリアント
            </Badge>
            <p>17番目の文字でバリアント（8,9,a,b）が識別されます。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
