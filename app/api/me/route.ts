import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  if (!user) {
    return NextResponse.json({ user: null, profile: null, isProfileComplete: false }, { status: 200 })
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id,email,username,full_name,phone_number,birth_date,avatar_url,role,is_active,created_at,updated_at")
    .eq("id", user.id)
    .maybeSingle()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  const isProfileComplete =
    !!profile &&
    !!profile.username &&
    !!profile.full_name &&
    !!profile.phone_number &&
    !!profile.birth_date

  return NextResponse.json(
    {
      user: { id: user.id, email: user.email },
      profile,
      isProfileComplete,
    },
    { status: 200 }
  )
}

