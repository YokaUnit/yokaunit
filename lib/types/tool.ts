export interface Tool {
  id: string
  slug: string
  title: string
  description: string
  category: string
  subcategory: string | null
  tags: string[]
  icon: string
  href: string
  image_url: string | null
  is_premium: boolean
  is_private: boolean
  is_new: boolean
  is_popular: boolean
  is_active: boolean
  likes_count: number
  view_count: number
  created_at: string
  updated_at: string
}

