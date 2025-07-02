export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status:
            | "active"
            | "canceled"
            | "past_due"
            | "unpaid"
            | "incomplete"
            | "incomplete_expired"
            | "trialing"
            | null
          subscription_start_date: string | null
          subscription_end_date: string | null
          subscription_plan: "プロ" | "プレミアム" | "エンタープライズ" | null
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          phone_number?: string | null
          birth_date?: string | null
          avatar_url?: string | null
          role?: "basic" | "premium" | "admin"
          is_active?: boolean
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | "active"
            | "canceled"
            | "past_due"
            | "unpaid"
            | "incomplete"
            | "incomplete_expired"
            | "trialing"
            | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          subscription_plan?: "プロ" | "プレミアム" | "エンタープライズ" | null
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          phone_number?: string | null
          birth_date?: string | null
          avatar_url?: string | null
          role?: "basic" | "premium" | "admin"
          is_active?: boolean
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | "active"
            | "canceled"
            | "past_due"
            | "unpaid"
            | "incomplete"
            | "incomplete_expired"
            | "trialing"
            | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          subscription_plan?: "プロ" | "プレミアム" | "エンタープライズ" | null
        }
      }
      tools: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          category: string
          subcategory: string | null
          tags: string[]
          icon: string
          href: string
          is_premium: boolean
          is_private: boolean
          is_new: boolean
          is_popular: boolean
          is_active: boolean
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          category: string
          subcategory?: string | null
          tags?: string[]
          icon?: string
          href: string
          is_premium?: boolean
          is_private?: boolean
          is_new?: boolean
          is_popular?: boolean
          is_active?: boolean
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          category?: string
          subcategory?: string | null
          tags?: string[]
          icon?: string
          href?: string
          is_premium?: boolean
          is_private?: boolean
          is_new?: boolean
          is_popular?: boolean
          is_active?: boolean
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
