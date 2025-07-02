"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import type { SettlementResultType } from "../lib/simple-calculator"

interface SettlementResultProps {
  result: SettlementResultType | null
  onShare: () => void
}

export function SettlementResult({ result, onShare }: SettlementResultProps) {
  if (!result) return null

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">💸 精算方法</h2>
        <p className="text-gray-600">
          {result.settlements.length === 0 ? "精算の必要はありません" : `${result.settlements.length}回の送金で完了`}
        </p>
      </div>

      {result.settlements.length === 0 ? (
        /* 精算不要の場合 */
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-md p-8">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-2">精算完了！</h3>
              <p className="text-green-700">全員の支払いがちょうどです</p>
            </div>
          </div>
        </Card>
      ) : (
        /* 精算が必要な場合 */
        <div className="space-y-4">
          {result.settlements.map((settlement, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">{settlement.from}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-800">{settlement.to}</span>
                    </div>
                    <p className="text-sm text-gray-600">送金</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">¥{settlement.amount.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}

          {/* 合計 */}
          <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-md p-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 font-medium">総送金額</span>
              <span className="text-xl font-bold text-blue-800">¥{result.totalTransfers.toLocaleString()}</span>
            </div>
          </Card>
        </div>
      )}

      {/* バランス確認 */}
      {!result.isBalanced && (
        <Card className="bg-orange-50 border-orange-200 p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <p className="text-sm text-orange-700">計算に誤差があります。入力金額を確認してください。</p>
          </div>
        </Card>
      )}

      {/* 共有ボタン */}
      <Button
        onClick={onShare}
        variant="outline"
        className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-4 rounded-xl text-lg bg-transparent"
      >
        <Share2 className="h-5 w-5 mr-2" />
        精算結果を共有
      </Button>

      {/* 使い方のヒント */}
      <Card className="bg-gray-50/80 backdrop-blur-sm border-0 shadow-md p-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 精算のコツ</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 送金は上から順番に行うと効率的です</li>
          <li>• PayPayやLINE Payなどを活用しましょう</li>
          <li>• 端数は四捨五入して調整してもOKです</li>
        </ul>
      </Card>
    </div>
  )
}
