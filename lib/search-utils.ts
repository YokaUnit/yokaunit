/**
 * 検索クエリを正規化する関数
 * ひらがな・カタカナ、全角・半角を統一して検索精度を向上
 */
export function normalizeSearchQuery(query: string): string {
  return (
    query
      // カタカナをひらがなに変換
      .replace(/[ァ-ヶ]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0x60)
      })
      // 全角英数字を半角に変換
      .replace(/[ａ-ｚＡ-Ｚ０-９]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0xfee0)
      })
      // 全角スペースを半角に変換
      .replace(/　/g, " ")
      // 連続するスペースを1つに統一
      .replace(/\s+/g, " ")
      .trim()
  )
}

/**
 * 検索対象テキストを正規化する関数
 */
export function normalizeSearchTarget(text: string): string {
  return normalizeSearchQuery(text.toLowerCase())
}

/**
 * 検索マッチング関数
 */
export function isSearchMatch(target: string, query: string): boolean {
  if (!query.trim()) return true

  const normalizedTarget = normalizeSearchTarget(target)
  const normalizedQuery = normalizeSearchQuery(query.toLowerCase())

  return normalizedTarget.includes(normalizedQuery)
}
