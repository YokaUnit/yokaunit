"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"
import type { RouletteItem, RouletteMode } from "../lib/types"

interface RouletteFormProps {
  items: RouletteItem[]
  mode: RouletteMode
  multipleCount: number
  allowDuplicates: boolean
  onAddItem: (name: string, weight: number, emoji?: string) => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, updates: Partial<RouletteItem>) => void
  onModeChange: (mode: RouletteMode) => void
  onMultipleCountChange: (count: number) => void
  onAllowDuplicatesChange: (allow: boolean) => void
}

export function RouletteForm({
  items,
  mode,
  multipleCount,
  allowDuplicates,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onModeChange,
  onMultipleCountChange,
  onAllowDuplicatesChange,
}: RouletteFormProps) {
  const [newItemName, setNewItemName] = useState("")
  const [newItemWeight, setNewItemWeight] = useState(1)
  const [newItemEmoji, setNewItemEmoji] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editWeight, setEditWeight] = useState(1)
  const [editEmoji, setEditEmoji] = useState("")

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem(newItemName.trim(), newItemWeight, newItemEmoji.trim() || undefined)
      setNewItemName("")
      setNewItemWeight(1)
      setNewItemEmoji("")
    }
  }

  const startEdit = (item: RouletteItem) => {
    setEditingId(item.id)
    setEditName(item.name)
    setEditWeight(item.weight)
    setEditEmoji(item.emoji || "")
  }

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdateItem(editingId, {
        name: editName.trim(),
        weight: editWeight,
        emoji: editEmoji.trim() || undefined,
      })
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const quickEmojis = ["🎁", "🎉", "🎊", "🏆", "⭐", "💎", "🎯", "🍀", "🌟", "✨"]

  return (
    <div className="space-y-6">
      {/* モード選択 */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-4">抽選モード</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "normal" as RouletteMode, label: "通常", desc: "均等確率" },
            { value: "weighted" as RouletteMode, label: "重み付け", desc: "確率調整" },
            { value: "multiple" as RouletteMode, label: "複数当選", desc: "複数選択" },
            { value: "elimination" as RouletteMode, label: "除外", desc: "1つ除外" },
          ].map((m) => (
            <button
              key={m.value}
              onClick={() => onModeChange(m.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === m.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-bold">{m.label}</div>
              <div className="text-xs text-gray-600 mt-1">{m.desc}</div>
            </button>
          ))}
        </div>

        {mode === "multiple" && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                当選数: {multipleCount}
              </label>
              <input
                type="range"
                min="2"
                max={Math.min(items.length, 10)}
                value={multipleCount}
                onChange={(e) => onMultipleCountChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => onAllowDuplicatesChange(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">重複当選を許可</span>
            </label>
          </div>
        )}
      </Card>

      {/* 項目追加フォーム */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-4">ルーレット項目を追加</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="項目名（例: 特賞、1等、2等...）"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="絵文字（任意）"
              value={newItemEmoji}
              onChange={(e) => setNewItemEmoji(e.target.value)}
              maxLength={2}
              className="w-20"
            />
            {mode === "weighted" && (
              <Input
                type="number"
                placeholder="重み"
                value={newItemWeight}
                onChange={(e) => setNewItemWeight(parseFloat(e.target.value) || 1)}
                min="0.1"
                step="0.1"
                className="w-24"
              />
            )}
            <Button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-1" />
              追加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setNewItemEmoji(emoji)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 項目一覧 */}
      {items.length > 0 && (
        <Card className="p-6 bg-white/90 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-4">ルーレット項目一覧 ({items.length}件)</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                style={{ backgroundColor: `${item.color}20` }}
              >
                {editingId === item.id ? (
                  <>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      value={editEmoji}
                      onChange={(e) => setEditEmoji(e.target.value)}
                      maxLength={2}
                      className="w-20"
                    />
                    {mode === "weighted" && (
                      <Input
                        type="number"
                        value={editWeight}
                        onChange={(e) => setEditWeight(parseFloat(e.target.value) || 1)}
                        min="0.1"
                        step="0.1"
                        className="w-24"
                      />
                    )}
                    <Button
                      size="sm"
                      onClick={saveEdit}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-2xl">{item.emoji || "🎲"}</div>
                    <div className="flex-1 font-medium">{item.name}</div>
                    {mode === "weighted" && (
                      <div className="text-sm text-gray-600">
                        重み: {item.weight.toFixed(1)}
                      </div>
                    )}
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: item.color }}
                    />
                    <Button
                      size="sm"
                      onClick={() => startEdit(item)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

