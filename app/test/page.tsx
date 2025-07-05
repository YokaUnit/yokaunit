'use client'


import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeleteUserPage() {
  const [userId, setUserId] = useState("")
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setStatus("loading")
    setError("")

    try {
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "削除に失敗しました")

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err.message)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle>ユーザー削除ツール</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">
          SupabaseのService RoleでユーザーIDを指定して完全削除します。
        </p>
        <Input
          placeholder="ユーザーID (UUID) を入力"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleDelete} disabled={status === "loading" || !userId}>
          {status === "loading" ? "削除中..." : "削除する"}
        </Button>
        {status === "success" && <p className="text-green-600 mt-3">✅ 削除成功</p>}
        {status === "error" && <p className="text-red-600 mt-3">❌ {error}</p>}
      </CardContent>
    </Card>
  )
}
