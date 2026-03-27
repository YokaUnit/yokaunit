/** Filmarks 平均（5.0満点）から短いラベル */
export function recommendLabel(filmarksAvg: number) {
  if (filmarksAvg >= 4.5) return "高い"
  if (filmarksAvg >= 4.0) return "やや高い"
  if (filmarksAvg >= 3.5) return "ふつう"
  return "控えめ"
}
