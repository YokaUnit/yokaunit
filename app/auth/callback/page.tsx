import { Suspense } from "react"
import { AuthCallbackClient } from "./AuthCallbackClient"

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-gray-600">ログイン処理中です...</p>
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  )
}

