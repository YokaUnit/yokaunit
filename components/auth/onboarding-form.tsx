"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

type MeResponse = {
  user: { id: string; email?: string | null } | null
  profile: {
    id: string
    email: string
    username: string | null
    full_name: string | null
    phone_number: string | null
    birth_date: string | null
  } | null
  isProfileComplete: boolean
}

export function OnboardingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const next = useMemo(() => searchParams.get("next") ?? "/", [searchParams])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("/api/me", { cache: "no-store" })
        if (!res.ok) throw new Error("ユーザー情報の取得に失敗しました")
        const me = (await res.json()) as MeResponse

        if (!me.user) {
          router.replace(`/login?next=${encodeURIComponent("/onboarding")}`)
          return
        }

        setUsername(me.profile?.username ?? "")
        setFullName(me.profile?.full_name ?? "")
        setPhoneNumber(me.profile?.phone_number ?? "")
        setBirthDate(me.profile?.birth_date ?? "")

        if (me.isProfileComplete) {
          router.replace(next)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "読み込みに失敗しました")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router, next])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    if (!username || !fullName || !phoneNumber || !birthDate) {
      setError("すべての必須項目を入力してください")
      setSaving(false)
      return
    }
    if (!acceptTerms) {
      setError("利用規約とプライバシーポリシーに同意してください")
      setSaving(false)
      return
    }

    const cleanPhoneNumber = phoneNumber.replace(/-/g, "")

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error("ログインが必要です")

      const { error: upsertError } = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          phone_number: cleanPhoneNumber,
          birth_date: birthDate,
        })
        .eq("id", user.id)

      if (upsertError) throw upsertError

      toast({ title: "初回設定を保存しました", description: "引き続きご利用いただけます。" })
      router.replace(next)
      router.refresh()
    } catch (e: any) {
      setError(e?.message || "保存に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">初回設定</CardTitle>
        <CardDescription className="text-center">プロフィール情報を入力して利用を開始できます</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6 text-sm text-gray-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            読み込み中...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  ユーザー名 <span className="text-red-500">*</span>
                </Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={saving} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  氏名 <span className="text-red-500">*</span>
                </Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={saving} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  電話番号 <span className="text-red-500">*</span>
                </Label>
                <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={saving} required />
                <p className="text-xs text-gray-500">ハイフンなしで入力してください</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">
                  生年月日 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  disabled={saving}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} />
              <label htmlFor="terms" className="text-sm">
                <span>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    利用規約
                  </Link>{" "}
                  と{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    プライバシーポリシー
                  </Link>
                  に同意します
                </span>
              </label>
            </div>

            {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

            <Button type="submit" className="w-full" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "保存中..." : "保存して続行"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-gray-500">この情報はアカウント設定からいつでも変更できます。</p>
      </CardFooter>
    </Card>
  )
}

