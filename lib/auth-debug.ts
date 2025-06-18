import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function debugAuthState() {
  try {
    const supabase = createServerSupabaseClient()

    // Get session and user
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    const debugInfo = {
      session: {
        exists: !!sessionData.session,
        userId: sessionData.session?.user?.id,
        email: sessionData.session?.user?.email,
        error: sessionError?.message,
      },
      user: {
        exists: !!userData.user,
        userId: userData.user?.id,
        email: userData.user?.email,
        error: userError?.message,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("🔍 Auth Debug Info:", debugInfo)

    return {
      user: userData.user || sessionData.session?.user,
      session: sessionData.session,
      debugInfo,
    }
  } catch (error) {
    console.error("❌ Error in debugAuthState:", error)
    return null
  }
}
