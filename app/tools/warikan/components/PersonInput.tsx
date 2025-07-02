"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Edit3 } from "lucide-react"
import type { Person } from "../lib/warikan-calculator"

interface PersonInputProps {
  person: Person
  onUpdate: (updates: Partial<Person>) => void
  onRemove: () => void
  canRemove: boolean
}

export function PersonInput({ person, onUpdate, onRemove, canRemove }: PersonInputProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(person.name)

  const handleNameSubmit = () => {
    onUpdate({ name: tempName || person.name })
    setIsEditingName(false)
  }

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit()
    } else if (e.key === "Escape") {
      setTempName(person.name)
      setIsEditingName(false)
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center flex-1">
          {isEditingName ? (
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleNameKeyDown}
              className="text-sm font-medium border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              placeholder="名前を入力"
              autoFocus
            />
          ) : (
            <button
              onClick={() => {
                setTempName(person.name)
                setIsEditingName(true)
              }}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span>{person.name}</span>
              <Edit3 className="h-3 w-3 ml-1 opacity-50" />
            </button>
          )}
        </div>

        {canRemove && (
          <Button onClick={onRemove} variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-red-500">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">支払額</label>
          <div className="relative">
            <Input
              type="number"
              value={person.paid || ""}
              onChange={(e) => onUpdate({ paid: Number.parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="pr-8 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">円</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">負担比率</label>
          <div className="relative">
            <Input
              type="number"
              step="0.1"
              value={person.ratio || ""}
              onChange={(e) => onUpdate({ ratio: Number.parseFloat(e.target.value) || 1 })}
              placeholder="1.0"
              className="pr-8 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">倍</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
