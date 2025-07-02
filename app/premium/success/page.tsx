"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { refreshProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          // プロフィールを更新して最新の情報を取得
          await refreshProfile()

          // すぐにローディングを解除（2秒待機を削除）
          setIsLoading(false)
        } catch (error) {
          console.error("Error verifying payment:", error)
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId, refreshProfile])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col relative">
        <BackgroundAnimation />
        <SiteHeader />
        <main className="flex-1 relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">決済を確認しています...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">決済が完了しました！</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900">🎉 ありがとうございます！</h2>
                  <p className="text-gray-700">
                    YokaUnitを応援していただき、心から感謝いたします！
                    <br />
                    あなたのサポートが、より良いツール開発の原動力になります。
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium">
                      💝 プレミアム会員として、一緒にYokaUnitを成長させていきましょう！
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">🚀 これからご利用いただける特典</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>✨ 広告の非表示でストレスフリー</li>
                    <li>🛠️ プレミアムツールへの特別アクセス</li>
                    <li>💬 優先サポートで安心</li>
                    <li>🎯 あなたの要望を優先開発</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/tools">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      🎉 プレミアムツールを使ってみる
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/account/settings">
                    <Button variant="outline" className="w-full sm:w-auto">
                      ⚙️ アカウント設定
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    🙏 <strong>開発者より:</strong>{" "}
                    あなたのサポートのおかげで、YokaUnitはより多くの人に価値を提供できます。本当にありがとうございます！
                  </p>
                </div>

                <div className="text-xs text-gray-500 pt-4 border-t">
                  <p>📧 領収書はご登録のメールアドレスに送信されます。</p>
                  <p>
                    💬 ご不明な点は
                    <Link href="/contact" className="text-blue-600 hover:underline mx-1">
                      お問い合わせ
                    </Link>
                    ください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function PremiumSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col relative">
          <BackgroundAnimation />
          <SiteHeader />
          <main className="flex-1 relative z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">読み込み中...</p>
            </div>
          </main>
          <SiteFooter />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
