import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { OnboardingForm } from "@/components/auth/onboarding-form"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "初回設定 - YokaUnit",
  robots: { index: false, follow: false },
}

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-8 px-4 relative z-10">
        <div className="w-full max-w-md">
          <Suspense
            fallback={
              <div className="min-h-[320px] flex items-center justify-center">
                <p className="text-sm text-gray-600">読み込み中...</p>
              </div>
            }
          >
            <OnboardingForm />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

