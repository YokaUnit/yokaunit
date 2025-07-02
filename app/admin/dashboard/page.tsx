"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Clock, MessageSquare, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import {
  getInProgressTools,
  createInProgressTool,
  updateInProgressTool,
  deleteInProgressTool,
  getDeveloperMessages,
  createDeveloperMessage,
  updateDeveloperMessage,
  deleteDeveloperMessage,
  toggleDeveloperMessageActive,
  type InProgressTool,
  type DeveloperMessage,
} from "@/lib/actions/admin"
import { toast } from "sonner"

export default function AdminDashboardPage() {
  const { isAdmin, isDeveloper, profile, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [inProgressTools, setInProgressTools] = useState<InProgressTool[]>([])
  const [developerMessages, setDeveloperMessages] = useState<DeveloperMessage[]>([])
  const [editingTool, setEditingTool] = useState<InProgressTool | null>(null)
  const [isAddingTool, setIsAddingTool] = useState(false)
  const [newTool, setNewTool] = useState({
    name: "",
    description: "",
    category: "",
    estimated_completion: "",
  })
  const [editingMessage, setEditingMessage] = useState<DeveloperMessage | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    // ページ遷移時にトップにスクロール
    window.scrollTo(0, 0)

    // 認証が完了するまで待つ
    if (authLoading) return

    // 管理者権限の確認
    const checkAuth = () => {
      const developer = localStorage.getItem("isDeveloper") === "true"
      setIsLoading(false)

      // 管理者または開発者でない場合はホームにリダイレクト
      if (!isAdmin && !developer) {
        router.push("/")
        return
      }

      // データを読み込み
      loadData()
    }

    checkAuth()
  }, [isAdmin, isDeveloper, authLoading, router])

  const loadData = async () => {
    try {
      const [tools, messages] = await Promise.all([getInProgressTools(), getDeveloperMessages()])
      setInProgressTools(tools)
      setDeveloperMessages(messages)
    } catch (error) {
      console.error("Error loading data:", error)
      toast.error("データの読み込みに失敗しました")
    }
  }

  const handleEditTool = (tool: InProgressTool) => {
    setEditingTool({ ...tool })
  }

  const handleUpdateTool = async () => {
    if (!editingTool) return

    try {
      await updateInProgressTool(editingTool.id, {
        name: editingTool.name,
        description: editingTool.description,
        category: editingTool.category,
        estimated_completion: editingTool.estimated_completion,
      })
      await loadData()
      setEditingTool(null)
      toast.success("ツールを更新しました")
    } catch (error) {
      console.error("Error updating tool:", error)
      toast.error("ツールの更新に失敗しました")
    }
  }

  const handleDeleteTool = async (id: string) => {
    try {
      await deleteInProgressTool(id)
      await loadData()
      toast.success("ツールを削除しました")
    } catch (error) {
      console.error("Error deleting tool:", error)
      toast.error("ツールの削除に失敗しました")
    }
  }

  const handleAddTool = async () => {
    if (!newTool.name || !newTool.description || !newTool.category || !newTool.estimated_completion) return

    try {
      await createInProgressTool(newTool)
      await loadData()
      setNewTool({
        name: "",
        description: "",
        category: "",
        estimated_completion: "",
      })
      setIsAddingTool(false)
      toast.success("ツールを追加しました")
    } catch (error) {
      console.error("Error adding tool:", error)
      toast.error("ツールの追加に失敗しました")
    }
  }

  const handleUpdateMessage = async () => {
    if (!editingMessage || !newMessage.trim()) return

    try {
      await updateDeveloperMessage(editingMessage.id, newMessage)
      await loadData()
      setEditingMessage(null)
      setNewMessage("")
      toast.success("メッセージを更新しました")
    } catch (error) {
      console.error("Error updating message:", error)
      toast.error("メッセージの更新に失敗しました")
    }
  }

  const handleCreateMessage = async () => {
    if (!newMessage.trim()) return

    try {
      await createDeveloperMessage(newMessage)
      await loadData()
      setNewMessage("")
      toast.success("メッセージを作成しました")
    } catch (error) {
      console.error("Error creating message:", error)
      toast.error("メッセージの作成に失敗しました")
    }
  }

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDeveloperMessage(id)
      await loadData()
      toast.success("メッセージを削除しました")
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("メッセージの削除に失敗しました")
    }
  }

  const handleToggleMessageActive = async (id: string, currentActive: boolean) => {
    try {
      await toggleDeveloperMessageActive(id, !currentActive)
      await loadData()
      toast.success(`メッセージを${!currentActive ? "表示" : "非表示"}にしました`)
    } catch (error) {
      console.error("Error toggling message active:", error)
      toast.error("メッセージの表示切り替えに失敗しました")
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>読み込み中...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!isAdmin && localStorage.getItem("isDeveloper") !== "true") {
    return null // リダイレクト中
  }

  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "管理者ダッシュボード", href: "/admin/dashboard" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-amber-800 mb-2">
                {isAdmin ? "管理者ダッシュボード" : "開発者ダッシュボード"}
              </h1>
              <p className="text-amber-700">
                YokaUnitの管理機能にアクセスしています。
                {profile?.email && ` (${profile.email})`}
              </p>
            </div>

            <Tabs defaultValue="in-progress">
              <TabsList className="bg-amber-100 text-amber-700">
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-white">
                  開発中のツール
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-white">
                  開発者メッセージ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="in-progress" className="mt-4">
                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-600" />
                      開発中のツール管理
                    </CardTitle>
                    <CardDescription>
                      現在開発中のツールを管理します。ホームページに表示される情報を更新できます。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isAddingTool ? (
                      <div className="border rounded-md p-4 bg-amber-50 mb-4">
                        <h3 className="font-medium mb-3">新しいツールを追加</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">ツール名</label>
                            <Input
                              value={newTool.name}
                              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                              placeholder="ツール名を入力"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">説明</label>
                            <Textarea
                              value={newTool.description}
                              onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                              placeholder="ツールの説明を入力"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">カテゴリ</label>
                            <Input
                              value={newTool.category}
                              onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                              placeholder="カテゴリを入力"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">公開予定</label>
                            <Input
                              value={newTool.estimated_completion}
                              onChange={(e) => setNewTool({ ...newTool, estimated_completion: e.target.value })}
                              placeholder="例: 来週公開予定"
                              className="mt-1"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsAddingTool(false)
                                setNewTool({
                                  name: "",
                                  description: "",
                                  category: "",
                                  estimated_completion: "",
                                })
                              }}
                            >
                              キャンセル
                            </Button>
                            <Button onClick={handleAddTool}>追加</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setIsAddingTool(true)}
                        className="mb-4 bg-amber-600 hover:bg-amber-700 flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        新しい開発中ツールを追加
                      </Button>
                    )}

                    <div className="space-y-4">
                      {inProgressTools.map((tool) => (
                        <div key={tool.id} className="border rounded-md p-4 bg-amber-50">
                          {editingTool && editingTool.id === tool.id ? (
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium">ツール名</label>
                                <Input
                                  value={editingTool.name}
                                  onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">説明</label>
                                <Textarea
                                  value={editingTool.description}
                                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">カテゴリ</label>
                                <Input
                                  value={editingTool.category}
                                  onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">公開予定</label>
                                <Input
                                  value={editingTool.estimated_completion}
                                  onChange={(e) =>
                                    setEditingTool({ ...editingTool, estimated_completion: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex justify-end gap-2 pt-2">
                                <Button variant="outline" onClick={() => setEditingTool(null)}>
                                  キャンセル
                                </Button>
                                <Button onClick={handleUpdateTool}>更新</Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">{tool.name}</h3>
                                  <p className="text-sm text-gray-600">{tool.description}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-amber-600 border-amber-300"
                                    onClick={() => handleEditTool(tool)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 border-red-300"
                                    onClick={() => handleDeleteTool(tool.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">カテゴリ: {tool.category}</span>
                                <span className="text-amber-700">{tool.estimated_completion}</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-4">
                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-amber-600" />
                      開発者メッセージ管理
                    </CardTitle>
                    <CardDescription>
                      ホームページに表示される開発者からのメッセージを管理します。is_activeがtrueのメッセージのみホームページに表示されます。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 bg-amber-50">
                        <h3 className="font-medium mb-2">新しいメッセージを作成</h3>
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="新しいメッセージを入力..."
                          className="mb-3"
                          rows={4}
                        />
                        <Button onClick={handleCreateMessage} className="bg-amber-600 hover:bg-amber-700">
                          メッセージを作成
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">既存のメッセージ</h3>
                        {developerMessages.map((message) => (
                          <div key={message.id} className="border rounded-md p-4 bg-white">
                            {editingMessage && editingMessage.id === message.id ? (
                              <div className="space-y-3">
                                <Textarea
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  className="w-full"
                                  rows={4}
                                />
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setEditingMessage(null)
                                      setNewMessage("")
                                    }}
                                  >
                                    キャンセル
                                  </Button>
                                  <Button onClick={handleUpdateMessage}>更新</Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant={message.is_active ? "default" : "secondary"}>
                                        {message.is_active ? "表示中" : "非表示"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      作成日: {new Date(message.created_at).toLocaleString("ja-JP")}
                                    </p>
                                  </div>
                                  <div className="flex gap-2 ml-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className={
                                        message.is_active
                                          ? "text-orange-600 border-orange-300"
                                          : "text-green-600 border-green-300"
                                      }
                                      onClick={() => handleToggleMessageActive(message.id, message.is_active)}
                                    >
                                      {message.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-amber-600 border-amber-300"
                                      onClick={() => {
                                        setEditingMessage(message)
                                        setNewMessage(message.message)
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-300"
                                      onClick={() => handleDeleteMessage(message.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
