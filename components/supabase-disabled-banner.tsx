"use client"

/**
 * Supabaseを意図的に無効にしている場合に表示するバナー。
 * .env.local に NEXT_PUBLIC_SUPABASE_ENABLED=false を設定すると表示されます。
 */
export function SupabaseDisabledBanner() {
  if (process.env.NEXT_PUBLIC_SUPABASE_ENABLED !== "false") return null

  return (
    <div
      className="bg-amber-500/90 text-amber-950 text-center py-2 px-4 text-sm font-medium"
      role="status"
    >
      現在、ログイン・お気に入り・ツール一覧などのデータ機能は停止しています。復旧時は
      NEXT_PUBLIC_SUPABASE_ENABLED を削除するか true に設定してください。
    </div>
  )
}
