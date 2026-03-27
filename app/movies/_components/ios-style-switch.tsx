"use client"

import { cn } from "@/lib/utils"

/** iOS 風トグル（行全体の button が role=switch） */
export function IosStyleSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-200",
        checked ? "bg-[#34C759]" : "bg-zinc-600"
      )}
    >
      <span
        className={cn(
          "h-[27px] w-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          checked ? "translate-x-[20px]" : "translate-x-0"
        )}
      />
    </span>
  )
}
