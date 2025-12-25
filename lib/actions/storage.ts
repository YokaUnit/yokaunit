import { createServerSupabaseClient } from "@/lib/supabase"
import { supabase } from "@/lib/supabase"

/**
 * ツール画像をSupabase Storageにアップロード
 * @param file アップロードする画像ファイル
 * @param toolSlug ツールのスラッグ（ファイル名として使用）
 * @returns 公開URL
 */
export async function uploadToolImage(
  file: File,
  toolSlug: string
): Promise<string> {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
  const fileName = `${toolSlug}.${fileExt}`
  const filePath = `tools/${fileName}`

  // クライアントサイド用（ブラウザから直接アップロード）
  if (typeof window !== 'undefined') {
    const { data, error } = await supabase.storage
      .from('toolsimage')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // 既存ファイルを上書き
      })

    if (error) {
      throw new Error(`画像のアップロードに失敗しました: ${error.message}`)
    }

    // 公開URLを取得
    const { data: { publicUrl } } = supabase.storage
      .from('toolsimage')
      .getPublicUrl(filePath)

    return publicUrl
  }

  // サーバーサイド用
  const supabaseClient = createServerSupabaseClient()
  const { data, error } = await supabaseClient.storage
    .from('toolsimage')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    throw new Error(`画像のアップロードに失敗しました: ${error.message}`)
  }

  // 公開URLを取得
  const { data: { publicUrl } } = supabaseClient.storage
    .from('toolsimage')
    .getPublicUrl(filePath)

  return publicUrl
}

/**
 * ツール画像を削除
 * @param toolSlug ツールのスラッグ
 */
export async function deleteToolImage(toolSlug: string): Promise<void> {
  // ファイル拡張子を推測（png, jpg, jpeg, webpを試す）
  const extensions = ['png', 'jpg', 'jpeg', 'webp']
  
  for (const ext of extensions) {
    const filePath = `tools/${toolSlug}.${ext}`
    
    if (typeof window !== 'undefined') {
      const { error } = await supabase.storage
        .from('toolsimage')
        .remove([filePath])
      
      // エラーでも続行（ファイルが存在しない可能性がある）
      if (error && error.message !== 'Object not found') {
        console.warn(`Failed to delete ${filePath}:`, error.message)
      }
    } else {
      const supabaseClient = createServerSupabaseClient()
      const { error } = await supabaseClient.storage
        .from('toolsimage')
        .remove([filePath])
      
      if (error && error.message !== 'Object not found') {
        console.warn(`Failed to delete ${filePath}:`, error.message)
      }
    }
  }
}

/**
 * ツールの画像URLを更新
 * @param toolSlug ツールのスラッグ
 * @param imageUrl 新しい画像URL
 */
export async function updateToolImageUrl(
  toolSlug: string,
  imageUrl: string
): Promise<void> {
  const supabaseClient = createServerSupabaseClient()
  
  const { error } = await supabaseClient
    .from('tools')
    .update({ image_url: imageUrl })
    .eq('slug', toolSlug)

  if (error) {
    throw new Error(`画像URLの更新に失敗しました: ${error.message}`)
  }
}

/**
 * 画像ファイルのバリデーション
 * @param file 画像ファイル
 * @returns バリデーション結果
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // ファイルサイズチェック（5MB以下）
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: '画像サイズは5MB以下にしてください' }
  }

  // ファイル形式チェック
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'PNG、JPEG、WebP形式のみ対応しています' }
  }

  return { valid: true }
}

