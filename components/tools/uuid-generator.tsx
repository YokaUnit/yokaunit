"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw, Check, Info, Hash, Share2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

type UuidVersion = "v1" | "v4" | "nil"

interface UuidFormat {
  uppercase: boolean
  includeHyphens: boolean
}

export function UuidGenerator() {
  const [uuid, setUuid] = useState("")
  const [multipleUuids, setMultipleUuids] = useState<string[]>([])
  const [uuidCount, setUuidCount] = useState(5)
  const [version, setVersion] = useState<UuidVersion>("v4")
  const [format, setFormat] = useState<UuidFormat>({
    uppercase: false,
    includeHyphens: true,
  })
  const [validationInput, setValidationInput] = useState("")
  const [validationResults, setValidationResults] = useState<{
    isValid: boolean
    version?: string
    format?: string
    errors?: string[]
  }>({
    isValid: false,
  })
  const [copied, setCopied] = useState(false)
  const [copiedIndexes, setCopiedIndexes] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("single")
  const { toast } = useToast()

  // 初回レンダリング時にUUIDを生成
  useEffect(() => {
    generateUuid()
    generateMultipleUuids()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // バリデーション実行
  useEffect(() => {
    if (validationInput.trim()) {
      validateUuid(validationInput.trim())
    } else {
      setValidationResults({ isValid: false })
    }
  }, [validationInput])

  // UUID v1 生成（タイムスタンプベース）
  const generateUuidV1 = (): string => {
    // 簡易的なv1実装（実際のMACアドレスではなくランダム値を使用）
    const timestamp = Date.now()
    const timestampHex = timestamp.toString(16).padStart(12, '0')
    
    // タイムスタンプを分割してv1形式に配置
    const timeLow = timestampHex.slice(-8)
    const timeMid = timestampHex.slice(-12, -8)
    const timeHighAndVersion = '1' + timestampHex.slice(-15, -12) // version 1
    
    // クロックシーケンス（ランダム）
    const clockSeq = Math.floor(Math.random() * 0x3fff) | 0x8000 // variant bits
    const clockSeqHex = clockSeq.toString(16).padStart(4, '0')
    
    // ノード（MACアドレスの代わりにランダム値）
    const node = Array.from({ length: 6 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('')
    
    return `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeqHex}-${node}`
  }

  // UUID v4 生成（ランダムベース）
  const generateUuidV4 = (): string => {
    const hex = '0123456789abcdef'
    let uuid = ''
    
    for (let i = 0; i < 32; i++) {
      const randomValue = Math.floor(Math.random() * 16)
      
      if (i === 12) {
        // version 4
        uuid += '4'
      } else if (i === 16) {
        // variant bits (10xx)
        uuid += hex[8 + Math.floor(Math.random() * 4)]
      } else {
        uuid += hex[randomValue]
      }
      
      // ハイフン挿入位置
      if ([7, 11, 15, 19].includes(i)) {
        uuid += '-'
      }
    }
    
    return uuid
  }

  // Nil UUID生成
  const generateNilUuid = (): string => {
    return "00000000-0000-0000-0000-000000000000"
  }

  // UUID生成メイン関数
  const generateUuidString = (): string => {
    let baseUuid: string

    switch (version) {
      case "v1":
        baseUuid = generateUuidV1()
        break
      case "v4":
        baseUuid = generateUuidV4()
        break
      case "nil":
        baseUuid = generateNilUuid()
        break
      default:
        baseUuid = generateUuidV4()
    }

    // フォーマット適用
    let formattedUuid = baseUuid
    
    if (!format.includeHyphens) {
      formattedUuid = formattedUuid.replace(/-/g, '')
    }
    
    if (format.uppercase) {
      formattedUuid = formattedUuid.toUpperCase()
    }

    return formattedUuid
  }

  const generateUuid = () => {
    const newUuid = generateUuidString()
    setUuid(newUuid)
    setCopied(false)
  }

  const generateMultipleUuids = () => {
    const newUuids = []
    for (let i = 0; i < uuidCount; i++) {
      newUuids.push(generateUuidString())
    }
    setMultipleUuids(newUuids)
    setCopiedIndexes([])
  }

  // UUID バリデーション
  const validateUuid = (input: string) => {
    const errors: string[] = []
    
    // 基本的な文字チェック
    const cleanInput = input.trim().toLowerCase()
    
    // ハイフンありの場合の正規表現
    const uuidRegexWithHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    // ハイフンなしの場合の正規表現
    const uuidRegexWithoutHyphens = /^[0-9a-f]{32}$/i
    // Nil UUID
    const nilUuidRegex = /^0{8}-?0{4}-?0{4}-?0{4}-?0{12}$/i

    let isValid = false
    let detectedVersion = ""
    let detectedFormat = ""

    if (nilUuidRegex.test(cleanInput)) {
      isValid = true
      detectedVersion = "Nil UUID"
      detectedFormat = cleanInput.includes('-') ? "ハイフン付き" : "ハイフンなし"
    } else if (uuidRegexWithHyphens.test(cleanInput)) {
      isValid = true
      const versionChar = cleanInput.charAt(14)
      detectedVersion = `Version ${versionChar}`
      detectedFormat = "ハイフン付き（標準形式）"
      
      // バリアント部分のチェック
      const variantChar = cleanInput.charAt(19)
      if (!['8', '9', 'a', 'b'].includes(variantChar)) {
        errors.push("バリアント部分が正しくありません")
      }
    } else if (uuidRegexWithoutHyphens.test(cleanInput)) {
      isValid = true
      const versionChar = cleanInput.charAt(12)
      detectedVersion = `Version ${versionChar}`
      detectedFormat = "ハイフンなし"
      
      // バリアント部分のチェック
      const variantChar = cleanInput.charAt(16)
      if (!['8', '9', 'a', 'b'].includes(variantChar)) {
        errors.push("バリアント部分が正しくありません")
      }
    } else {
      // 詳細なエラーメッセージ
      if (cleanInput.length === 0) {
        errors.push("UUIDが入力されていません")
      } else if (cleanInput.includes('-')) {
        if (cleanInput.length !== 36) {
          errors.push(`長さが正しくありません（現在: ${cleanInput.length}文字、期待値: 36文字）`)
        }
        const parts = cleanInput.split('-')
        if (parts.length !== 5) {
          errors.push("ハイフンの数が正しくありません（4個必要）")
        } else {
          const expectedLengths = [8, 4, 4, 4, 12]
          parts.forEach((part, index) => {
            if (part.length !== expectedLengths[index]) {
              errors.push(`セクション${index + 1}の長さが正しくありません`)
            }
          })
        }
      } else {
        if (cleanInput.length !== 32) {
          errors.push(`長さが正しくありません（現在: ${cleanInput.length}文字、期待値: 32文字）`)
        }
      }
      
      if (!/^[0-9a-f-]*$/i.test(cleanInput)) {
        errors.push("無効な文字が含まれています（16進数とハイフンのみ有効）")
      }
    }

    setValidationResults({
      isValid,
      version: detectedVersion,
      format: detectedFormat,
      errors: errors.length > 0 ? errors : undefined,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    toast({
      title: "コピーしました",
      description: "UUIDがクリップボードにコピーされました",
    })

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const copyMultipleUuid = (index: number) => {
    navigator.clipboard.writeText(multipleUuids[index])
    setCopiedIndexes((prev) => [...prev, index])
    toast({
      title: "コピーしました",
      description: "UUIDがクリップボードにコピーされました",
    })

    setTimeout(() => {
      setCopiedIndexes((prev) => prev.filter((i) => i !== index))
    }, 3000)
  }

  const copyAllUuids = () => {
    const allUuids = multipleUuids.join("\n")
    navigator.clipboard.writeText(allUuids)
    setCopiedIndexes([...Array(multipleUuids.length).keys()])
    toast({
      title: "すべてコピーしました",
      description: `${multipleUuids.length}個のUUIDがクリップボードにコピーされました`,
    })

    setTimeout(() => {
      setCopiedIndexes([])
    }, 3000)
  }

  const shareUuid = async () => {
    const shareData = {
      title: "YokaUnit - UUID生成ツール",
      text: "PostgreSQL対応のUUID生成ツール！開発者必携の高機能UUIDジェネレーター",
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
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
              <Hash className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">UUID生成ツール</CardTitle>
              <CardDescription className="text-sm">PostgreSQL対応のUUID生成・バリデーション</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareUuid}
              className="text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">シェア</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  PostgreSQL対応のUUID（8-4-4-4-12形式）を生成します。v1（タイムスタンプ）、v4（ランダム）、Nil UUIDに対応。
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5">
        <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-10 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="single"
              className="rounded-md flex items-center gap-2 h-8 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <Hash className="h-4 w-4" />
              <span className="hidden sm:inline">単一</span>
            </TabsTrigger>
            <TabsTrigger
              value="multiple"
              className="rounded-md flex items-center gap-2 h-8 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">一括</span>
            </TabsTrigger>
            <TabsTrigger
              value="validate"
              className="rounded-md flex items-center gap-2 h-8 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">検証</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    className="font-mono text-base sm:text-lg h-14 sm:h-12 border-2 focus:border-indigo-500 text-center sm:text-left"
                    readOnly
                  />
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 sm:h-12 sm:w-12 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      onClick={copyToClipboard}
                      title="クリップボードにコピー"
                    >
                      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 sm:h-12 sm:w-12 border-2 hover:bg-indigo-50 dark:hover:bg-gray-700"
                      onClick={generateUuid}
                      title="新しいUUIDを生成"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">UUIDバージョン</label>
                    <Select value={version} onValueChange={(value) => setVersion(value as UuidVersion)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v4">v4 (ランダム) - 推奨</SelectItem>
                        <SelectItem value="v1">v1 (タイムスタンプ)</SelectItem>
                        <SelectItem value="nil">Nil UUID (すべて0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">フォーマット設定</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="uppercase"
                          checked={format.uppercase}
                          onCheckedChange={(checked) =>
                            setFormat(prev => ({ ...prev, uppercase: checked as boolean }))
                          }
                        />
                        <label htmlFor="uppercase" className="text-sm">大文字で出力</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hyphens"
                          checked={format.includeHyphens}
                          onCheckedChange={(checked) =>
                            setFormat(prev => ({ ...prev, includeHyphens: checked as boolean }))
                          }
                        />
                        <label htmlFor="hyphens" className="text-sm">ハイフン付き (PostgreSQL標準)</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-12 sm:h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-sm"
              onClick={generateUuid}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              新しいUUIDを生成
            </Button>
          </TabsContent>

          <TabsContent value="multiple" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm sm:text-base">生成数:</span>
                  <Badge variant="outline" className="text-sm px-2 py-1 bg-white dark:bg-gray-700">
                    {uuidCount}
                  </Badge>
                </div>
                <Button variant="outline" onClick={copyAllUuids} className="h-10 text-sm">
                  <Copy className="h-4 w-4 mr-2" />
                  すべてコピー
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">1</span>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={uuidCount}
                    onChange={(e) => setUuidCount(parseInt(e.target.value))}
                    className="flex-1 mx-4"
                  />
                  <span className="text-sm">50</span>
                </div>
              </div>

              <div className="border rounded-lg divide-y max-h-64 overflow-y-auto bg-white dark:bg-gray-700">
                {multipleUuids.map((uuidItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <code className="font-mono flex-1 truncate text-sm mr-2">{uuidItem}</code>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => copyMultipleUuid(index)}
                        title="クリップボードにコピー"
                      >
                        {copiedIndexes.includes(index) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">UUIDバージョン</label>
                <Select value={version} onValueChange={(value) => setVersion(value as UuidVersion)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v4">v4 (ランダム) - 推奨</SelectItem>
                    <SelectItem value="v1">v1 (タイムスタンプ)</SelectItem>
                    <SelectItem value="nil">Nil UUID (すべて0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium">フォーマット設定</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase-multi"
                      checked={format.uppercase}
                      onCheckedChange={(checked) =>
                        setFormat(prev => ({ ...prev, uppercase: checked as boolean }))
                      }
                    />
                    <label htmlFor="uppercase-multi" className="text-sm">大文字で出力</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hyphens-multi"
                      checked={format.includeHyphens}
                      onCheckedChange={(checked) =>
                        setFormat(prev => ({ ...prev, includeHyphens: checked as boolean }))
                      }
                    />
                    <label htmlFor="hyphens-multi" className="text-sm">ハイフン付き (PostgreSQL標準)</label>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-12 sm:h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-sm"
              onClick={generateMultipleUuids}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              新しいUUIDを一括生成
            </Button>
          </TabsContent>

          <TabsContent value="validate" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">検証するUUID</label>
                <Textarea
                  value={validationInput}
                  onChange={(e) => setValidationInput(e.target.value)}
                  placeholder="UUIDを入力してください（例: 123e4567-e89b-12d3-a456-426614174000）"
                  className="font-mono text-sm h-20"
                />
              </div>

              {validationInput.trim() && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    {validationResults.isValid ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <h3 className="font-medium">
                      {validationResults.isValid ? "有効なUUID" : "無効なUUID"}
                    </h3>
                  </div>

                  {validationResults.isValid && (
                    <div className="space-y-2">
                      {validationResults.version && (
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                            {validationResults.version}
                          </Badge>
                        </div>
                      )}
                      {validationResults.format && (
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                            {validationResults.format}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {validationResults.errors && validationResults.errors.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-red-700 mb-2">エラー:</h4>
                      <ul className="space-y-1">
                        {validationResults.errors.map((error, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 bg-indigo-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-5 w-5 text-indigo-500" />
            <h3 className="font-medium text-sm sm:text-base">UUID活用のポイント</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                PostgreSQL
              </Badge>
              <p>8-4-4-4-12形式でPostgreSQLのUUID型として直接使用できます。</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                セキュリティ
              </Badge>
              <p>v4（ランダム）は予測困難で、分散システムでも安全に使用できます。</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5 bg-white dark:bg-gray-700 text-xs">
                プライバシー
              </Badge>
              <p>生成されたUUIDはブラウザ内で作成され、サーバーには送信されません。</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
