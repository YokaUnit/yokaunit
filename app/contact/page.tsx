"use client"

import type React from "react"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Mail, Phone, ArrowRight, Send, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [inquiryType, setInquiryType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const inquiryCategories = [
    { value: "general", label: "一般的なお問い合わせ" },
    { value: "tool-request", label: "ツール開発のご要望" },
    { value: "bug-report", label: "エラー・不具合の報告" },
    { value: "feature-request", label: "機能改善のご提案" },
    { value: "premium", label: "有料会員について" },
    { value: "corporate", label: "企業向けサービス" },
    { value: "advertisement", label: "広告掲載のご相談" },
    { value: "partnership", label: "業務提携について" },
    { value: "media", label: "メディア取材について" },
    { value: "api", label: "API連携について" },
    { value: "security", label: "セキュリティについて" },
    { value: "other", label: "その他ご意見・ご要望" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          inquiryType,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "送信に失敗しました")
      }

      setIsSubmitted(true)
      toast({
        title: "お問い合わせを送信しました",
        description: "内容を確認次第、担当者よりご連絡いたします。",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "エラーが発生しました",
        description: error instanceof Error ? error.message : "お問い合わせの送信に失敗しました。後ほど再度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "お問い合わせ", href: "/contact" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
              <p className="text-sm text-gray-600">お気軽にご相談ください。迅速に対応いたします</p>
            </motion.div>

            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 h-9">
                <TabsTrigger value="form" className="text-xs">
                  お問い合わせフォーム
                </TabsTrigger>
                <TabsTrigger value="info" className="text-xs">
                  連絡先情報
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {isSubmitted ? (
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-3 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, type: "spring" }}
                        >
                          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        </motion.div>
                        <CardTitle className="text-green-600 text-lg">お問い合わせありがとうございます</CardTitle>
                        <CardDescription className="text-green-700">
                          内容を確認次第、担当者よりご連絡いたします
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-green-700 mb-4">
                          お問い合わせいただき、ありがとうございます。
                          <br />
                          内容を確認次第、担当者より2営業日以内にご連絡いたします。
                        </p>
                        <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
                          ホームに戻る
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                          お問い合わせフォーム
                        </CardTitle>
                        <CardDescription className="text-xs">
                          以下のフォームに必要事項をご入力の上、送信ボタンをクリックしてください
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="space-y-1"
                            >
                              <Label htmlFor="name" className="text-xs font-medium">
                                お名前 <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="name"
                                placeholder="山田 太郎"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-9 text-sm"
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="space-y-1"
                            >
                              <Label htmlFor="email" className="text-xs font-medium">
                                メールアドレス <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-9 text-sm"
                              />
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="space-y-1"
                          >
                            <Label htmlFor="inquiry-type" className="text-xs font-medium">
                              お問い合わせ種類 <span className="text-red-500">*</span>
                            </Label>
                            <Select value={inquiryType} onValueChange={setInquiryType} required>
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="お問い合わせの種類を選択してください" />
                              </SelectTrigger>
                              <SelectContent>
                                {inquiryCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="space-y-1"
                          >
                            <Label htmlFor="subject" className="text-xs font-medium">
                              件名 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="subject"
                              placeholder="お問い合わせの件名"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                              className="h-9 text-sm"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="space-y-1"
                          >
                            <Label htmlFor="message" className="text-xs font-medium">
                              お問い合わせ内容 <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="お問い合わせ内容を詳しくご記入ください"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="min-h-[100px] text-sm resize-none"
                              required
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="flex items-start space-x-2"
                          >
                            <Checkbox id="privacy" required className="mt-1" />
                            <label
                              htmlFor="privacy"
                              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                                プライバシーポリシー
                              </a>
                              に同意します
                            </label>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="flex justify-end pt-2"
                          >
                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="h-9 text-sm px-6 bg-blue-600 hover:bg-blue-700"
                            >
                              {isLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  送信中...
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  送信する
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="info">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3"
                >
                  {[
                    {
                      icon: MessageSquare,
                      title: "お問い合わせフォーム",
                      desc: "フォームからお気軽にお問い合わせください。通常2営業日以内に返信いたします。",
                      color: "blue",
                    },
                    {
                      icon: Mail,
                      title: "メールでのお問い合わせ",
                      desc: "yokaunit.info@gmail.com",
                      color: "green",
                    },
                    {
                      icon: Phone,
                      title: "お電話でのお問い合わせ",
                      desc: "0**-****-****（現在準備中）",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-start space-x-3">
                          <item.icon className={`h-5 w-5 text-${item.color}-500 mt-0.5 flex-shrink-0`} />
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-end pt-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 hover:bg-blue-50"
                      onClick={() => router.push("/corporate")}
                    >
                      企業の方はこちら <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
