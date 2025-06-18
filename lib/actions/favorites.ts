"use client"

import { supabase } from "@/lib/supabase"

export async function getUserFavorites(): Promise<string[]> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("ℹ️ getUserFavorites: No authenticated user, returning empty favorites")
      return []
    }

    console.log("✅ getUserFavorites: User authenticated:", user.email)

    const { data, error } = await supabase.from("user_favorites").select("tool_slug").eq("user_id", user.id)

    if (error) {
      console.error("❌ Error fetching favorites:", error)
      return []
    }

    console.log("✅ Favorites fetched:", data.length, "items")
    return data.map((item) => item.tool_slug)
  } catch (error) {
    console.error("❌ Error in getUserFavorites:", error)
    return []
  }
}

export async function toggleFavorite(
  toolSlug: string,
): Promise<{ success: boolean; isFavorited: boolean; message: string }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("認証情報が見つかりません。再ログインしてください。")
    }

    console.log("✅ toggleFavorite: User authenticated:", user.email)
    const userId = user.id

    // 現在のお気に入り状態を確認
    const { data: existingFavorite, error: checkError } = await supabase
      .from("user_favorites")
      .select()
      .eq("user_id", userId)
      .eq("tool_slug", toolSlug)
      .maybeSingle()

    if (checkError) {
      console.error("❌ Error checking favorite status:", checkError)
      throw new Error("お気に入りの確認に失敗しました")
    }

    let isFavorited = false
    let message = ""

    if (existingFavorite) {
      // お気に入りから削除
      console.log("🗑️ Removing favorite for tool:", toolSlug)
      const { error: deleteError } = await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("tool_slug", toolSlug)

      if (deleteError) {
        console.error("❌ Error removing favorite:", deleteError)
        throw new Error("お気に入りの削除に失敗しました")
      }

      // いいね数を減らす - 修正された引数名を使用
      const { error: updateError } = await supabase.rpc("decrement_likes", {
        tool_slug: toolSlug,
      })

      if (updateError) {
        console.error("❌ Error decrementing likes:", updateError)
      }

      isFavorited = false
      message = "お気に入りから削除しました"
    } else {
      // お気に入りに追加
      console.log("❤️ Adding favorite for tool:", toolSlug)
      const { error: insertError } = await supabase.from("user_favorites").insert({
        user_id: userId,
        tool_slug: toolSlug,
      })

      if (insertError) {
        console.error("❌ Error adding favorite:", insertError)
        throw new Error("お気に入りの追加に失敗しました")
      }

      // いいね数を増やす - 修正された引数名を使用
      const { error: updateError } = await supabase.rpc("increment_likes", {
        tool_slug: toolSlug,
      })

      if (updateError) {
        console.error("❌ Error incrementing likes:", updateError)
      }

      isFavorited = true
      message = "お気に入りに追加しました"
    }

    console.log("✅ toggleFavorite completed:", { toolSlug, isFavorited })

    return { success: true, isFavorited, message }
  } catch (error) {
    console.error("❌ Error in toggleFavorite:", error)
    throw error
  }
}
