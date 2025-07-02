"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, ExternalLink, AlertCircle } from "lucide-react"
import type { CalculationResultType } from "../lib/warikan-calculator"

interface CalculationResultProps {
  result: CalculationResultType | null
  onShare: () => void
}

export function CalculationResult({ result, onShare }: CalculationResultProps) {
  if (!result) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
        <div className="text-gray-500">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">総支払額を入力して計算ボタンを押してください</p>
        </div>
      </Card>
    )
  }

  const handlePayPayTransfer = (from: string, to: string, amount: number) => {
    const payPayUrl = `paypay://payment?amount=${amount}&note=${encodeURIComponent(`${from}→${to} 割り勘`)}`
    window.open(payPayUrl, "_blank")
  }

  return (
    <div className="space-y-4">
      {/* サマリー */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md p-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">総支払額</p>
            <p className="text-lg font-bold text-gray-900">¥{result.totalAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">一人あたり</p>
            <p className="text-lg font-bold text-blue-600">¥{result.perPersonAmount.toLocaleString()}</p>
          </div>
        </div>

        {result.summary.difference !== 0 && (
          <div className="mt-3 pt-3 border-t border-blue-100">
            <p className="text-xs text-center text-gray-600">
              実際の支払額との差額:
              <span className={`font-medium ml-1 ${result.summary.difference > 0 ? "text-green-600" : "text-red-600"}`}>
                ¥{Math.abs(result.summary.difference).toLocaleString()}
                {result.summary.difference > 0 ? " 余り" : " 不足"}
              </span>
            </p>
          </div>
        )}
      </Card>

      {/* 精算方法 */}
      {result.transactions.length > 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-center">精算方法</h3>
          <div className="space-y-3">
            {result.transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.from} → {transaction.to}
                  </p>
                  <p className="text-lg font-bold text-blue-600">¥{transaction.amount.toLocaleString()}</p>
                </div>
                <Button
                  onClick={() => handlePayPayTransfer(transaction.from, transaction.to, transaction.amount)}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  PayPay
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-6 text-center">
          <div className="text-green-600">
            <p className="text-sm font-medium">🎉 精算完了！</p>
            <p className="text-xs text-gray-600 mt-1">全員の支払いが均等です</p>
          </div>
        </Card>
      )}

      {/* 共有ボタン */}
      <Button onClick={onShare} variant="outline" className="w-full py-3 rounded-xl border-gray-200 hover:bg-gray-50">
        <Share2 className="h-4 w-4 mr-2" />
        計算結果を共有
      </Button>
    </div>
  )
}
