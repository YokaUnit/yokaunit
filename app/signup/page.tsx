import { SignupForm } from "@/components/auth/signup-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundAnimation } from "@/components/background-animation"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundAnimation />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-8 px-4 relative z-10">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
