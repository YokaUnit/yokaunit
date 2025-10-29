"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Shield, 
  RefreshCw, 
  History, 
  Share2, 
  Settings
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// インポート
import { PasswordSettings } from './types'
import { exportPasswords, downloadFile } from './utils'
import { usePasswordGenerator, usePasswordHistory, usePasswordSettings, useClipboard } from './hooks'
import { PasswordDisplay } from './components/PasswordDisplay'
import { MultiplePasswordDisplay } from './components/MultiplePasswordDisplay'
import { HistoryDisplay } from './components/HistoryDisplay'
import { SettingsPanel } from './components/SettingsPanel'
import { TipsSection } from './components/TipsSection'

export function PasswordGeneratorClient() {
  const [activeTab, setActiveTab] = useState("single")
  const [showPassword, setShowPassword] = useState(false)
  
  const { toast } = useToast()
  
  // カスタムフック
  const { settings, setSettings } = usePasswordSettings()
  const {
    password,
    setPassword,
    multiplePasswords,
    setMultiplePasswords,
    passwordCount,
    setPasswordCount,
    isGenerating,
    passwordStrength,
    strengthAnalysis,
    generatePassword,
    generateMultiplePasswords
  } = usePasswordGenerator()
  
  const {
    passwordHistory,
    favorites,
    historyFilter,
    setHistoryFilter,
    addToHistory,
    toggleFavorite,
    removeFromHistory,
    clearHistory,
    filteredHistory
  } = usePasswordHistory()
  
  const {
    copied,
    copiedIndexes,
    copyToClipboard,
    copyMultiplePassword,
    copyAllPasswords
  } = useClipboard()

  // 初回パスワード生成
  useEffect(() => {
    handleGeneratePassword()
    handleGenerateMultiplePasswords()
  }, [])

  // パスワード生成ハンドラー
  const handleGeneratePassword = async () => {
    const newPassword = await generatePassword(settings)
    if (newPassword) {
      addToHistory(newPassword, settings, passwordStrength)
    }
  }

  // 複数パスワード生成ハンドラー
  const handleGenerateMultiplePasswords = async () => {
    await generateMultiplePasswords(settings)
  }

  // コピー機能
  const handleCopyPassword = async () => {
    const success = await copyToClipboard(password)
    if (success) {
      toast({
        title: "コピーしました",
        description: "パスワードがクリップボードにコピーされました",
      })
    }
  }

  const handleCopyMultiplePassword = async (index: number) => {
    const success = await copyMultiplePassword(index, multiplePasswords[index])
    if (success) {
      toast({
        title: "コピーしました",
        description: "パスワードがクリップボードにコピーされました",
      })
    }
  }

  const handleCopyAllPasswords = async () => {
    const success = await copyAllPasswords(multiplePasswords)
    if (success) {
      toast({
        title: "すべてコピーしました",
        description: `${multiplePasswords.length}個のパスワードがクリップボードにコピーされました`,
      })
    }
  }

  // エクスポート機能
  const handleExportPasswords = (format: 'csv' | 'txt') => {
    const { content, filename } = exportPasswords(passwordHistory, format)
    const mimeType = format === 'csv' ? 'text/csv' : 'text/plain'
    downloadFile(content, filename, mimeType)
    
    toast({
      title: "エクスポート完了",
      description: `${filename}をダウンロードしました`,
    })
  }

  // シェア機能
  const handleSharePassword = async () => {
    const shareData = {
      title: "YokaUnit - パスワード生成ツール",
      text: "安全で強力なパスワードを簡単に生成！YokaUnitの無料パスワード生成ツールをチェック！",
      url: "https://yokaunit.com/tools/password",
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "シェアしました",
          description: "友達にツールを共有しました！",
        })
      } else {
        await navigator.clipboard.writeText(shareData.url)
        toast({
          title: "URLをコピーしました",
          description: "リンクがクリップボードにコピーされました",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
      try {
        await navigator.clipboard.writeText(shareData.url)
        toast({
          title: "URLをコピーしました",
          description: "リンクがクリップボードにコピーされました",
        })
      } catch (clipboardError) {
        toast({
          title: "シェアに失敗しました",
          description: "もう一度お試しください",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* メインカード */}
      <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold">🔐 パスワード生成ツール</CardTitle>
                <CardDescription className="text-blue-100 text-sm sm:text-base">
                  セキュリティ専門家推奨の高強度パスワードを瞬時に生成
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSharePassword}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">シェア</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    ツールを友達にシェア
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 h-12 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="single"
                className="rounded-md flex items-center gap-2 h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <Shield className="h-4 w-4" />
                <span>単一生成</span>
              </TabsTrigger>
              <TabsTrigger
                value="multiple"
                className="rounded-md flex items-center gap-2 h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4" />
                <span>一括生成</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-md flex items-center gap-2 h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <History className="h-4 w-4" />
                <span>履歴</span>
              </TabsTrigger>
            </TabsList>

            {/* 単一パスワード生成 */}
            <TabsContent value="single" className="space-y-6">
              <PasswordDisplay
                password={password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                copied={copied}
                isGenerating={isGenerating}
                strengthAnalysis={strengthAnalysis}
                onCopy={handleCopyPassword}
                onGenerate={handleGeneratePassword}
              />
              <SettingsPanel
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGeneratePassword}
                isGenerating={isGenerating}
              />
            </TabsContent>

            {/* 一括パスワード生成 */}
            <TabsContent value="multiple" className="space-y-6">
              <MultiplePasswordDisplay
                passwords={multiplePasswords}
                passwordCount={passwordCount}
                setPasswordCount={setPasswordCount}
                copiedIndexes={copiedIndexes}
                isGenerating={isGenerating}
                onCopyAll={handleCopyAllPasswords}
                onCopySingle={handleCopyMultiplePassword}
                onRegenerate={handleGenerateMultiplePasswords}
              />
              <SettingsPanel
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGenerateMultiplePasswords}
                isGenerating={isGenerating}
              />
            </TabsContent>

            {/* 履歴タブ */}
            <TabsContent value="history" className="space-y-6">
              <HistoryDisplay
                filteredHistory={filteredHistory}
                historyFilter={historyFilter}
                setHistoryFilter={setHistoryFilter}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onRemoveFromHistory={removeFromHistory}
                onClearHistory={clearHistory}
                onExportPasswords={handleExportPasswords}
              />
            </TabsContent>
          </Tabs>

          <TipsSection />
        </CardContent>
      </Card>
    </div>
  )
}