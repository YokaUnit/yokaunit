import { NextRequest, NextResponse } from "next/server"
import { uploadToolImage, validateImageFile } from "@/lib/actions/storage"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // 認証チェック（管理者のみ）
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // 管理者権限チェック（必要に応じて実装）
    // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    // if (profile?.role !== 'admin') {
    //   return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 })
    // }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const toolSlug = formData.get("toolSlug") as string

    if (!file || !toolSlug) {
      return NextResponse.json(
        { error: "ファイルとツールスラッグが必要です" },
        { status: 400 }
      )
    }

    // バリデーション
    const validation = validateImageFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // アップロード
    const publicUrl = await uploadToolImage(file, toolSlug)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "画像のアップロードに失敗しました" },
      { status: 500 }
    )
  }
}

