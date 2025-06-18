"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isLoading, setIsLoading] = useState(true)
  const { refreshProfile } = useAuth()

  useEffect(() => {
    if (sessionId) {
      // 少し待ってからプロフィールを更新（Webhookの処理を待つ）
      setTimeout(() => {
        refreshProfile()
        setIsLoading(false)
      }, 2000)
    } else {
      setIsLoading(false)
    }
  }, [sessionId, refreshProfile])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {isLoading ? (
                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                  ) : (
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  )}
                </div>
                <CardTitle className="text-2xl">{isLoading ? "処理中..." : "サブスクリプション開始完了！"}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {!isLoading && (
                  <>
                    <p className="text-gray-600">
                      YokaUnitの有料プランへのご登録ありがとうございます。
                      <br />
                      プレミアム機能をお楽しみください！
                    </p>
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/">ホームに戻る</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/account">アカウント設定</Link>
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
