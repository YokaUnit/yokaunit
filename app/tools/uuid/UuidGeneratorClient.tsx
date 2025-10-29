"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { 
  Hash, 
  RefreshCw, 
  History, 
  Share2, 
  AlertCircle,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// インポート
import { UuidSettings } from './types'
import { useUuidGenerator, useUuidHistory, useUuidSettings, useUuidValidation, useClipboard } from './hooks'
import { UuidDisplay } from './components/UuidDisplay'
import { MultipleUuidDisplay } from './components/MultipleUuidDisplay'
import { ValidationDisplay } from './components/ValidationDisplay'
import { HistoryDisplay } from './components/HistoryDisplay'
import { SettingsPanel } from './components/SettingsPanel'

export function UuidGeneratorClient() {
  const [activeTab, setActiveTab] = useState("single")
  
  const { toast } = useToast()
  
  // カスタムフック
  const { settings, setSettings } = useUuidSettings()
  const {
    uuid,
    setUuid,
    multipleUuids,
    setMultipleUuids,
    uuidCount,
    setUuidCount,
    isGenerating,
    generationTime,
    generateUuid,
    generateMultipleUuids
  } = useUuidGenerator()
  
  const {
    uuidHistory,
    favorites,
    historyFilter,
    setHistoryFilter,
    stats,
    addToHistory,
    toggleFavorite,
    removeFromHistory,
    clearHistory,
    filteredHistory
  } = useUuidHistory()
  
  const {
    validationInput,
    setValidationInput,
    validationResults,
    validateUuidInput
  } = useUuidValidation()
  
  const {
    copied,
    copiedIndexes,
    copyToClipboard,
    copyMultipleUuid,
    copyAllUuids
  } = useClipboard()

  // 初回UUID生成
  useEffect(() => {
    handleGenerateUuid()
    handleGenerateMultipleUuids()
  }, [])

  // UUID生成ハンドラー
  const handleGenerateUuid = async () => {
    const newUuid = await generateUuid(settings)
    if (newUuid) {
      addToHistory(newUuid, settings, true)
    }
  }

  // 複数UUID生成ハンドラー
  const handleGenerateMultipleUuids = async () => {
    await generateMultipleUuids(settings)
  }

  // コピー機能
  const handleCopyUuid = async () => {
    const success = await copyToClipboard(uuid)
    if (success) {
      toast({
        title: "コピーしました",
        description: "UUIDがクリップボードにコピーされました",
      })
    }
  }

  const handleCopyMultipleUuid = async (index: number) => {
    const success = await copyMultipleUuid(index, multipleUuids[index])
    if (success) {
      toast({
        title: "コピーしました",
        description: "UUIDがクリップボードにコピーされました",
      })
    }
  }

  const handleCopyAllUuids = async () => {
    const success = await copyAllUuids(multipleUuids)
    if (success) {
      toast({
        title: "すべてコピーしました",
        description: `${multipleUuids.length}個のUUIDがクリップボードにコピーされました`,
      })
    }
  }

  // エクスポート機能
  const handleExportUuids = (format: 'csv' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0]
    let content = ''
    let filename = ''
    
    if (format === 'csv') {
      content = 'UUID,Version,Format,Timestamp,Settings\n'
      uuidHistory.forEach(item => {
        content += `"${item.uuid}",${item.settings.version},"${JSON.stringify(item.settings.format)}","${item.timestamp.toISOString()}","${JSON.stringify(item.settings)}"\n`
      })
      filename = `uuids-${timestamp}.csv`
    } else {
      content = `UUID履歴 - ${timestamp}\n${'='.repeat(50)}\n\n`
      uuidHistory.forEach((item, index) => {
        content += `${index + 1}. ${item.uuid}\n`
        content += `   バージョン: ${item.settings.version} | 作成日: ${item.timestamp.toLocaleString()}\n`
        content += `   形式: ${item.settings.format.uppercase ? '大文字' : '小文字'}, ${item.settings.format.includeHyphens ? 'ハイフン付き' : 'ハイフンなし'}, ${item.settings.format.brackets ? 'ブラケット付き' : 'ブラケットなし'}\n\n`
      })
      filename = `uuids-${timestamp}.txt`
    }
    
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "エクスポート完了",
      description: `${filename}をダウンロードしました`,
    })
  }

  // シェア機能
  const handleShareUuid = async () => {
    const shareData = {
      title: "YokaUnit - UUID生成ツール",
      text: "PostgreSQL対応の高機能UUID生成・バリデーションツール！開発者必携のプロ仕様ツール",
      url: "https://yokaunit.com/tools/uuid",
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "シェアしました",
          description: "開発者仲間にツールを共有しました！",
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
                <Hash className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold">🔑 UUID生成ツール</CardTitle>
                <CardDescription className="text-blue-100 text-sm sm:text-base">
                  開発者必携の高機能UUIDジェネレーター・バリデーション
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
                      onClick={handleShareUuid}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-10 px-3 touch-manipulation"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">シェア</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    ツールを開発者仲間にシェア
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/10 hover:bg-white/20 touch-manipulation">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    YokaUnitの高機能UUID生成ツール！PostgreSQL対応（8-4-4-4-12形式）でv1～v5、Nil UUIDに対応。履歴管理・バリデーション・エクスポート機能完備。
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 h-14 sm:h-12 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="single"
                className="rounded-md flex items-center gap-2 h-12 sm:h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-manipulation"
              >
                <Hash className="h-4 w-4" />
                <span className="hidden xs:inline">単一生成</span>
                <span className="xs:hidden">単一</span>
              </TabsTrigger>
              <TabsTrigger
                value="multiple"
                className="rounded-md flex items-center gap-2 h-12 sm:h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-manipulation"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden xs:inline">一括生成</span>
                <span className="xs:hidden">一括</span>
              </TabsTrigger>
              <TabsTrigger
                value="validate"
                className="rounded-md flex items-center gap-2 h-12 sm:h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-manipulation"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="hidden xs:inline">検証</span>
                <span className="xs:hidden">検証</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-md flex items-center gap-2 h-12 sm:h-10 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 touch-manipulation"
              >
                <History className="h-4 w-4" />
                <span className="hidden xs:inline">履歴</span>
                <span className="xs:hidden">履歴</span>
              </TabsTrigger>
            </TabsList>

            {/* 単一UUID生成 */}
            <TabsContent value="single" className="space-y-6">
              <UuidDisplay
                uuid={uuid}
                copied={copied}
                isGenerating={isGenerating}
                generationTime={generationTime}
                onCopy={handleCopyUuid}
                onGenerate={handleGenerateUuid}
              />
              <SettingsPanel
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGenerateUuid}
                isGenerating={isGenerating}
              />
            </TabsContent>

            {/* 一括UUID生成 */}
            <TabsContent value="multiple" className="space-y-6">
              <MultipleUuidDisplay
                uuids={multipleUuids}
                uuidCount={uuidCount}
                setUuidCount={setUuidCount}
                copiedIndexes={copiedIndexes}
                isGenerating={isGenerating}
                generationTime={generationTime}
                onCopyAll={handleCopyAllUuids}
                onCopySingle={handleCopyMultipleUuid}
                onRegenerate={handleGenerateMultipleUuids}
              />
              <SettingsPanel
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGenerateMultipleUuids}
                isGenerating={isGenerating}
              />
            </TabsContent>

            {/* UUID検証 */}
            <TabsContent value="validate" className="space-y-6">
              <ValidationDisplay
                validationInput={validationInput}
                setValidationInput={setValidationInput}
                validationResults={validationResults}
              />
            </TabsContent>

            {/* 履歴タブ */}
            <TabsContent value="history" className="space-y-6">
              <HistoryDisplay
                filteredHistory={filteredHistory}
                historyFilter={historyFilter}
                setHistoryFilter={setHistoryFilter}
                favorites={favorites}
                stats={stats}
                onToggleFavorite={toggleFavorite}
                onRemoveFromHistory={removeFromHistory}
                onClearHistory={clearHistory}
                onExportUuids={handleExportUuids}
              />
            </TabsContent>
          </Tabs>

          {/* ヒントセクション */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="h-5 w-5 text-indigo-500" />
              <h3 className="font-semibold text-lg">💡 UUID活用のプロのヒント</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                    PostgreSQL
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">8-4-4-4-12形式で直接使用</p>
                    <p className="text-xs text-gray-600">PostgreSQLのUUID型として直接使用できます</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                    セキュリティ
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">v4（ランダム）を推奨</p>
                    <p className="text-xs text-gray-600">予測困難で分散システムでも安全に使用</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                    プライバシー
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">ブラウザ内完結</p>
                    <p className="text-xs text-gray-600">生成されたUUIDはサーバーに送信されません</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                    開発効率
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">履歴管理で効率化</p>
                    <p className="text-xs text-gray-600">過去のUUIDを簡単に参照・再利用</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
