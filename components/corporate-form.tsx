"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function CorporateForm() {
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("")
  const [position, setPosition] = useState("")
  const [employeeCount, setEmployeeCount] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [inquiryType, setInquiryType] = useState("")
  const [inquiry, setInquiry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 実際のアプリではここでフォーム送信APIを呼び出します
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      toast({
        title: "お問い合わせを送信しました",
        description: "内容を確認次第、担当者より2営業日以内にご連絡いたします。",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "エラーが発生しました",
        description: "お問い合わせの送信に失敗しました。後ほど再度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">企業向けお問い合わせフォーム</CardTitle>
        <CardDescription className="text-xs">
          以下のフォームに必要事項をご入力ください。担当者より2営業日以内にご連絡いたします。
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-green-600 font-medium mb-2 text-lg">お問い合わせありがとうございます</h3>
            <p className="text-sm text-gray-600 mb-4">
              内容を確認次第、担当者より2営業日以内にご連絡いたします。
              <br />
              緊急の場合は、お電話でもお気軽にお問い合わせください。
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-800">📞 緊急連絡先: 03-1234-5678 (平日9:00-18:00)</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-sm font-medium">
                  会社名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company-name"
                  placeholder="株式会社サンプル"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee-count" className="text-sm font-medium">
                  従業員数
                </Label>
                <Select value={employeeCount} onValueChange={setEmployeeCount}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="従業員数を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10名</SelectItem>
                    <SelectItem value="11-50">11-50名</SelectItem>
                    <SelectItem value="51-100">51-100名</SelectItem>
                    <SelectItem value="101-500">101-500名</SelectItem>
                    <SelectItem value="501-1000">501-1000名</SelectItem>
                    <SelectItem value="1000+">1000名以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-sm font-medium">
                  担当者名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-name"
                  placeholder="山田 太郎"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-medium">
                  役職
                </Label>
                <Input
                  id="position"
                  placeholder="部長"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium">
                  部署名
                </Label>
                <Input
                  id="department"
                  placeholder="情報システム部"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  電話番号
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                メールアドレス <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9"
              />
            </div>

            {/* プロジェクト詳細 */}
            <div className="space-y-2">
              <Label htmlFor="inquiry-type" className="text-sm font-medium">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </Label>
              <Select value={inquiryType} onValueChange={setInquiryType} required>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="お問い合わせの種類を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ui-ux-design">UI/UXデザイン・制作</SelectItem>
                  <SelectItem value="seo-website">SEO特化Webサイト制作</SelectItem>
                  <SelectItem value="landing-page">高コンバージョンLP制作</SelectItem>
                  <SelectItem value="responsive-design">レスポンシブサイト制作</SelectItem>
                  <SelectItem value="ecommerce">ECサイト構築</SelectItem>
                  <SelectItem value="cms-development">CMS構築・カスタマイズ</SelectItem>
                  <SelectItem value="web-system">Webシステム開発</SelectItem>
                  <SelectItem value="mobile-app">モバイルアプリ開発</SelectItem>
                  <SelectItem value="maintenance">保守・運用サポート</SelectItem>
                  <SelectItem value="seo-consulting">SEOコンサルティング</SelectItem>
                  <SelectItem value="custom-development">カスタム開発</SelectItem>
                  <SelectItem value="dx-consulting">DXコンサルティング</SelectItem>
                  <SelectItem value="security">セキュリティ強化</SelectItem>
                  <SelectItem value="other">その他のご相談</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  ご予算
                </Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="ご予算を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50">50万円未満（一式）</SelectItem>
                    <SelectItem value="50-100">50-100万円（一式）</SelectItem>
                    <SelectItem value="100-300">100-300万円（一式）</SelectItem>
                    <SelectItem value="monthly-20-50">月額20-50万円</SelectItem>
                    <SelectItem value="monthly-50-100">月額50-100万円</SelectItem>
                    <SelectItem value="custom">カスタム見積もり</SelectItem>
                    <SelectItem value="consultation">予算相談したい</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-sm font-medium">
                  希望開始時期
                </Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="開始時期を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">すぐに開始したい</SelectItem>
                    <SelectItem value="1month">1ヶ月以内</SelectItem>
                    <SelectItem value="3months">3ヶ月以内</SelectItem>
                    <SelectItem value="6months">6ヶ月以内</SelectItem>
                    <SelectItem value="1year">1年以内</SelectItem>
                    <SelectItem value="undecided">未定・相談したい</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiry" className="text-sm font-medium">
                お問い合わせ詳細 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="inquiry"
                placeholder="プロジェクトの詳細、現在の課題、期待する効果などをお聞かせください。ご予算についてもお気軽にご相談ください。"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                className="min-h-[100px] resize-none"
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="privacy" required className="mt-1" />
              <label
                htmlFor="privacy"
                className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  プライバシーポリシー
                </a>
                および
                <a href="/terms" className="text-blue-600 hover:underline">
                  利用規約
                </a>
                に同意します
              </label>
            </div>
          </form>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter className="flex justify-end pt-0">
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 px-8">
            {isLoading ? "送信中..." : "無料相談を申し込む"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
