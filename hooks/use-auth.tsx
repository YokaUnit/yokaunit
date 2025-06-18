"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  email: string | null
  username: string | null
  full_name: string | null
  phone_number: string | null
  birth_date: string | null
  avatar_url: string | null
  role: "basic" | "premium" | "admin"
  is_active: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isLoggedIn: boolean
  isPremium: boolean
  isAdmin: boolean
  isDeveloper: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  ensureProfileExists: (userId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log("📋 Fetching profile for user:", userId)
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("❌ Error fetching profile:", error)
        return null
      }

      console.log("✅ Profile fetched:", data.username)
      return data as Profile
    } catch (error) {
      console.error("❌ Unexpected error fetching profile:", error)
      return null
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        console.log("🚀 Initializing authentication...")
        setIsLoading(true)

        // 現在のセッションを取得
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("❌ Error getting session:", sessionError)
          return
        }

        if (currentSession && mounted) {
          console.log("✅ Session found:", currentSession.user.email)
          setSession(currentSession)
          setUser(currentSession.user)

          // プロフィールを取得
          const profileData = await fetchProfile(currentSession.user.id)
          if (mounted) {
            setProfile(profileData)
          }
        } else {
          console.log("ℹ️ No active session found")
        }
      } catch (error) {
        console.error("❌ Error initializing auth:", error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return

      console.log("🔄 Auth state changed:", event)

      switch (event) {
        case "SIGNED_IN":
          if (newSession) {
            console.log("✅ User signed in:", newSession.user.email)
            setSession(newSession)
            setUser(newSession.user)

            // プロフィールを取得
            const profileData = await fetchProfile(newSession.user.id)
            if (mounted) {
              setProfile(profileData)
            }

            // ユーザー情報をコンソールに表示
            console.log("👤 User Profile:", {
              id: newSession.user.id,
              email: newSession.user.email,
              username: profileData?.username,
              fullName: profileData?.full_name,
              role: profileData?.role,
            })

            toast({
              title: "ログイン成功",
              description: `${profileData?.username || "ユーザー"}さん、おかえりなさい！`,
            })
          }
          break

        case "SIGNED_OUT":
          console.log("👋 User signed out")
          setSession(null)
          setUser(null)
          setProfile(null)
          break

        case "TOKEN_REFRESHED":
          console.log("🔄 Token refreshed")
          if (newSession) {
            setSession(newSession)
          }
          break

        default:
          console.log("ℹ️ Auth event:", event)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [toast])

  const ensureProfileExists = async (userId: string) => {
    try {
      console.log("🔍 Ensuring profile exists for user:", userId)

      // Check if profile already exists
      let profileData = await fetchProfile(userId)

      if (!profileData) {
        console.log("📝 Creating new profile for user:", userId)

        // Get user email from current user
        const userEmail = user?.email || ""

        // Create new profile
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            email: userEmail,
            username: userEmail.split("@")[0], // Use email prefix as default username
            role: "basic",
            is_active: true,
          })
          .select()
          .single()

        if (error) {
          console.error("❌ Error creating profile:", error)
          return
        }

        profileData = data as Profile
        console.log("✅ Profile created successfully")
      }

      setProfile(profileData)
    } catch (error) {
      console.error("❌ Error ensuring profile exists:", error)
    }
  }

  const signOut = async () => {
    try {
      console.log("🚪 Signing out...")
      setIsLoading(true)

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("❌ Sign out error:", error)
        toast({
          title: "エラー",
          description: "ログアウトに失敗しました。",
          variant: "destructive",
        })
      } else {
        console.log("✅ Signed out successfully")
        setSession(null)
        setUser(null)
        setProfile(null)

        toast({
          title: "ログアウト",
          description: "ログアウトしました。",
        })

        // ホームページにリダイレクト
        router.push("/")
      }
    } catch (error) {
      console.error("❌ Unexpected sign out error:", error)
      toast({
        title: "エラー",
        description: "ログアウトに失敗しました。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isLoggedIn = !!user && !!session
  const isPremium = profile?.role === "premium" || profile?.role === "admin"
  const isAdmin = profile?.role === "admin"
  const isDeveloper = false

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isLoggedIn,
        isPremium,
        isAdmin,
        isDeveloper,
        signOut,
        refreshProfile,
        ensureProfileExists,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
