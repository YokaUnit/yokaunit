"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users } from "lucide-react"

interface MemberCountSelectProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export function MemberCountSelect({ value, onChange, max = 20 }: MemberCountSelectProps) {
  const options = Array.from({ length: max - 1 }, (_, i) => i + 2) // 2人から20人まで

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Users className="h-4 w-4 inline mr-1" />
        人数
      </label>
      <Select value={value.toString()} onValueChange={(val) => onChange(Number.parseInt(val))}>
        <SelectTrigger className="rounded-xl border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {options.map((count) => (
            <SelectItem key={count} value={count.toString()}>
              {count}人
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
