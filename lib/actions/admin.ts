import { createServerSupabaseClient } from "@/lib/supabase"

export interface InProgressTool {
  id: string
  name: string
  description: string
  category: string
  estimated_completion: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DeveloperMessage {
  id: string
  message: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// 開発中のツール関連
export async function getInProgressTools(): Promise<InProgressTool[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("in_progress_tools")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      // テーブルが存在しない場合は空配列を返す
      if (error.code === "42P01") {
        console.warn("in_progress_tools table does not exist yet")
        return []
      }
      throw new Error(`Error fetching in progress tools: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error in getInProgressTools:", error)
    return []
  }
}

export async function createInProgressTool(tool: {
  name: string
  description: string
  category: string
  estimated_completion: string
}): Promise<InProgressTool> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("in_progress_tools").insert([tool]).select().single()

  if (error) {
    throw new Error(`Error creating in progress tool: ${error.message}`)
  }

  return data
}

export async function updateInProgressTool(
  id: string,
  tool: {
    name: string
    description: string
    category: string
    estimated_completion: string
  },
): Promise<InProgressTool> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("in_progress_tools").update(tool).eq("id", id).select().single()

  if (error) {
    throw new Error(`Error updating in progress tool: ${error.message}`)
  }

  return data
}

export async function deleteInProgressTool(id: string): Promise<void> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("in_progress_tools").update({ is_active: false }).eq("id", id)

  if (error) {
    throw new Error(`Error deleting in progress tool: ${error.message}`)
  }
}

// 開発者メッセージ関連
export async function getDeveloperMessages(): Promise<DeveloperMessage[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("developer_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      // テーブルが存在しない場合は空配列を返す
      if (error.code === "42P01") {
        console.warn("developer_messages table does not exist yet")
        return []
      }
      throw new Error(`Error fetching developer messages: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error in getDeveloperMessages:", error)
    return []
  }
}

export async function getActiveDeveloperMessages(): Promise<DeveloperMessage[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("developer_messages")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      // テーブルが存在しない場合は空配列を返す
      if (error.code === "42P01") {
        console.warn("developer_messages table does not exist yet")
        return []
      }
      throw new Error(`Error fetching active developer messages: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error in getActiveDeveloperMessages:", error)
    return []
  }
}

export async function getLatestDeveloperMessage(): Promise<DeveloperMessage | null> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("developer_messages")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      // テーブルが存在しない場合やデータがない場合はnullを返す
      if (error.code === "42P01" || error.code === "PGRST116") {
        console.warn("developer_messages table does not exist yet or no data found")
        return null
      }
      throw new Error(`Error fetching latest developer message: ${error.message}`)
    }

    return data || null
  } catch (error) {
    console.error("Error in getLatestDeveloperMessage:", error)
    return null
  }
}

export async function createDeveloperMessage(message: string): Promise<DeveloperMessage> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("developer_messages").insert([{ message }]).select().single()

  if (error) {
    throw new Error(`Error creating developer message: ${error.message}`)
  }

  return data
}

export async function updateDeveloperMessage(id: string, message: string): Promise<DeveloperMessage> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("developer_messages").update({ message }).eq("id", id).select().single()

  if (error) {
    throw new Error(`Error updating developer message: ${error.message}`)
  }

  return data
}

export async function deleteDeveloperMessage(id: string): Promise<void> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("developer_messages").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting developer message: ${error.message}`)
  }
}

export async function toggleDeveloperMessageActive(id: string, isActive: boolean): Promise<DeveloperMessage> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("developer_messages")
    .update({ is_active: isActive })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw new Error(`Error toggling developer message active status: ${error.message}`)
  }

  return data
}
