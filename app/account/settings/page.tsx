"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Settings, Heart, Crown, Clock, Save, Loader2, Mail, Phone, Calendar, UserCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    phone_number: "",
    birth_date: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { isLoggedIn, user, profile, isPremium, refreshProfile, ensureProfileExists } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)

      if (!isLoggedIn || !user) {
        router.push("/login")
        return
      }

      // プロフィールが存在することを確認
      if (user && !profile) {
        await ensureProfileExists(user.id)
      }

      if (profile) {
        setFormData({
          username: profile.username || "",
          full_name: profile.full_name || "",
          phone_number: profile.phone_number || "",
          birth_date: profile.birth_date || "",
        })
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [isLoggedIn, user, profile, router, ensureProfileExists])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)

    try {
      console.log("Saving profile data:", formData)

      // ユーザー名の重複チェック
      if (formData.username !== profile?.username) {
        const { data: existingUser, error: checkError } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", formData.username)
          .neq("id", user.id)
          .maybeSingle()

        if (checkError) {
          console.error("Error checking username:", checkError)
          throw new Error("ユーザー名の確認中にエラーが発生しました")
        }

        if (existingUser) {
          toast({
            title: "エラー",
            description: "このユーザー名は既に使用されています。",
            variant: "destructive",
          })
          setIsSaving(false)
          return
        }
      }

      // プロフィール更新
      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          birth_date: formData.birth_date,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) {
        console.error("Error updating profile:", error)
        throw error
      }

      // プロフィール情報を再取得
      await refreshProfile()

      toast({
        title: "保存完了",
        description: "プロフィール情報を更新しました。",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "エラー",
        description: "プロフィールの更新に失敗しました。",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BackgroundAnimation />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg"
          >
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">読み込み中...</p>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BackgroundAnimation />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
          >
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">この機能を利用するにはログインが必要です。</p>
            <Button onClick={() => router.push("/login")} className="bg-blue-600 hover:bg-blue-700">
              ログイン
            </Button>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <BackgroundAnimation />
      <ScrollToTop />

      <main className="flex-1 relative">
        <div className="container mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "マイページ", href: "/account" },
                { label: "設定", href: "/account/settings" },
              ]}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto mt-6"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* サイドバー */}
              <motion.div variants={itemVariants} className="w-full lg:w-80">
                <motion.div variants={cardHoverVariants} whileHover="hover" className="mb-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
                        >
                          <User className="h-12 w-12 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl text-center">{profile?.username || "ユーザー"}</CardTitle>
                        <p className="text-sm text-gray-500 text-center">{profile?.email}</p>
                        {isPremium && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 flex items-center gap-1 px-3 py-1">
                              <Crown className="h-3 w-3" />
                              <span>プレミアム会員</span>
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  {[
                    { href: "/account", icon: User, label: "アカウント情報", active: false },
                    { href: "/account/favorites", icon: Heart, label: "お気に入り", active: false },
                    { href: "/account/history", icon: Clock, label: "利用履歴", active: false },
                    { href: "/account/settings", icon: Settings, label: "設定", active: true },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Button
                        variant={item.active ? "default" : "outline"}
                        className={`w-full justify-start h-12 transition-all duration-300 ${
                          item.active
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                            : "bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200 hover:border-blue-300"
                        }`}
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* メインコンテンツ */}
              <motion.div variants={itemVariants} className="flex-1">
                <motion.div variants={cardHoverVariants} whileHover="hover">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Settings className="h-6 w-6 text-blue-600" />
                        プロフィール設定
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="username" className="flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-600" />
                              ユーザー名 *
                            </Label>
                            <Input
                              id="username"
                              name="username"
                              type="text"
                              value={formData.username}
                              onChange={handleInputChange}
                              placeholder="ユーザー名を入力"
                              required
                              className="bg-white/60 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            />
                            <p className="text-sm text-gray-500">ヘッダーやマイページに表示される名前です</p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="full_name" className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-blue-600" />
                              氏名
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              type="text"
                              value={formData.full_name}
                              onChange={handleInputChange}
                              placeholder="氏名を入力"
                              className="bg-white/60 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="phone_number" className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-600" />
                              電話番号
                            </Label>
                            <Input
                              id="phone_number"
                              name="phone_number"
                              type="tel"
                              value={formData.phone_number}
                              onChange={handleInputChange}
                              placeholder="09012345678"
                              className="bg-white/60 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            />
                            <p className="text-sm text-gray-500">ハイフンなしで入力してください</p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="birth_date" className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              生年月日
                            </Label>
                            <Input
                              id="birth_date"
                              name="birth_date"
                              type="date"
                              value={formData.birth_date}
                              onChange={handleInputChange}
                              min="1900-01-01"
                              max={new Date().toISOString().split("T")[0]}
                              className="bg-white/60 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="md:col-span-2 space-y-2"
                          >
                            <Label className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-blue-600" />
                              メールアドレス
                            </Label>
                            <Input
                              type="email"
                              value={profile?.email || ""}
                              disabled
                              className="bg-gray-50/80 backdrop-blur-sm border-gray-200"
                            />
                            <p className="text-sm text-gray-500">メールアドレスは変更できません</p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200"
                        >
                          <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                            {isSaving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                保存中...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                保存する
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="bg-white/60 backdrop-blur-sm hover:bg-white/80"
                            asChild
                          >
                            <Link href="/account">キャンセル</Link>
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
