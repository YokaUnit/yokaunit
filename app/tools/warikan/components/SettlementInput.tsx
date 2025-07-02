"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Calculator, User } from "lucide-react"
import type { Member } from "../lib/simple-calculator"

interface SettlementInputProps {
  members: Member[]
  onUpdateMemberPaid: (id: string, amount: number) => void
  onUpdateMemberName: (id: string, name: string) => void
  onCalculate: () => void
}

export function SettlementInput({
  members,
  onUpdateMemberPaid,
  onUpdateMemberName,
  onCalculate,
}: SettlementInputProps) {
  const totalPaid = members.reduce((sum, member) => sum + member.actualPaid, 0)
  const totalShouldPay = members.reduce((sum, member) => sum + member.shouldPay, 0)
  const difference = totalPaid - totalShouldPay

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">💰 実際の支払い入力</h2>
        <p className="text-gray-600">誰がいくら払ったかを入力してください</p>
      </div>

      {/* メンバー入力 */}
      <div className="space-y-4">
        {members.map((member, index) => (
          <Card key={member.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-md p-4">
            <div className="space-y-4">
              {/* 名前入力 */}
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <Input
                  value={member.name}
                  onChange={(e) => onUpdateMemberName(member.id, e.target.value)}
                  placeholder={`メンバー${index + 1}`}
                  className="flex-1 font-medium"
                />
              </div>

              {/* 支払い情報 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">負担額</label>
                  <div className="text-lg font-bold text-green-600">¥{member.shouldPay.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">実際の支払い</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={member.actualPaid || ""}
                      onChange={(e) => onUpdateMemberPaid(member.id, Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="text-lg font-bold pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">円</span>
                  </div>
                </div>
              </div>

              {/* 差額表示 */}
              <div className="text-center">
                {member.actualPaid - member.shouldPay > 0 ? (
                  <span className="text-sm text-green-600 font-medium">
                    +¥{(member.actualPaid - member.shouldPay).toLocaleString()} 多く支払い
                  </span>
                ) : member.actualPaid - member.shouldPay < 0 ? (
                  <span className="text-sm text-red-600 font-medium">
                    -¥{Math.abs(member.actualPaid - member.shouldPay).toLocaleString()} 不足
                  </span>
                ) : (
                  <span className="text-sm text-gray-600 font-medium">ちょうど</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 合計表示 */}
      <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-md p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-700 font-medium">合計支払い額</span>
            <span className="text-xl font-bold text-blue-800">¥{totalPaid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700 font-medium">合計負担額</span>
            <span className="text-lg font-semibold text-blue-700">¥{totalShouldPay.toLocaleString()}</span>
          </div>
          {difference !== 0 && (
            <div className="flex justify-between items-center border-t pt-2">
              <span className={`font-medium ${difference > 0 ? "text-green-700" : "text-red-700"}`}>差額</span>
              <span className={`text-lg font-bold ${difference > 0 ? "text-green-800" : "text-red-800"}`}>
                {difference > 0 ? "+" : ""}¥{difference.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* 計算ボタン */}
      <Button
        onClick={onCalculate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-lg"
        disabled={totalPaid === 0}
      >
        <Calculator className="h-5 w-5 mr-2" />
        精算方法を計算
      </Button>

      {/* ヒント */}
      <Card className="bg-yellow-50/80 backdrop-blur-sm border-0 shadow-md p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 入力のコツ</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 名前は後で変更できます（「田中さん」「山田さん」など）</li>
          <li>• 実際に支払った金額を正確に入力してください</li>
          <li>• 0円の場合は空欄のままでOKです</li>
          <li>• 合計が一致しなくても精算方法を計算できます</li>
        </ul>
      </Card>
    </div>
  )
}
