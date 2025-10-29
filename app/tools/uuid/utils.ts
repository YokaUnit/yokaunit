import { UuidVersion, UuidFormat, UuidSettings, UuidValidationResult } from './types'

// UUID v1 生成（タイムスタンプベース）
export const generateUuidV1 = (): string => {
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
export const generateUuidV4 = (): string => {
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

// UUID v5 生成（SHA-1ハッシュベース）
export const generateUuidV5 = (namespace: string, name: string): string => {
  // 簡易的なv5実装（実際のSHA-1ではなく擬似実装）
  const combined = namespace + name
  let hash = 0
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 32bit整数に変換
  }
  
  // ハッシュを16進数に変換
  const hashHex = Math.abs(hash).toString(16).padStart(8, '0')
  
  // v5形式でUUIDを構築
  const timeLow = hashHex.slice(0, 8)
  const timeMid = hashHex.slice(8, 12) || '0000'
  const timeHighAndVersion = '5' + (hashHex.slice(12, 15) || '000')
  
  // クロックシーケンス（名前空間ベース）
  const clockSeq = Math.floor(Math.abs(hash) / 0x10000) | 0x8000
  const clockSeqHex = clockSeq.toString(16).padStart(4, '0')
  
  // ノード（名前ベース）
  const node = Array.from({ length: 6 }, (_, i) => {
    const charCode = name.charCodeAt(i % name.length)
    return (charCode % 256).toString(16).padStart(2, '0')
  }).join('')
  
  return `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeqHex}-${node}`
}

// Nil UUID生成
export const generateNilUuid = (): string => {
  return "00000000-0000-0000-0000-000000000000"
}

// UUID生成メイン関数
export const generateUuidString = (settings: UuidSettings): string => {
  let baseUuid: string

  switch (settings.version) {
    case "v1":
      baseUuid = generateUuidV1()
      break
    case "v4":
      baseUuid = generateUuidV4()
      break
    case "v5":
      baseUuid = generateUuidV5(settings.namespace || '', settings.name || '')
      break
    case "nil":
      baseUuid = generateNilUuid()
      break
    default:
      baseUuid = generateUuidV4()
  }

  // フォーマット適用
  let formattedUuid = baseUuid
  
  if (!settings.format.includeHyphens) {
    formattedUuid = formattedUuid.replace(/-/g, '')
  }
  
  if (settings.format.uppercase) {
    formattedUuid = formattedUuid.toUpperCase()
  }

  if (settings.format.brackets) {
    formattedUuid = `{${formattedUuid}}`
  }

  return formattedUuid
}

// UUID バリデーション
export const validateUuid = (input: string): UuidValidationResult => {
  const errors: string[] = []
  
  // 基本的な文字チェック
  const cleanInput = input.trim().toLowerCase()
  
  // ハイフンありの場合の正規表現
  const uuidRegexWithHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  // ハイフンなしの場合の正規表現
  const uuidRegexWithoutHyphens = /^[0-9a-f]{32}$/i
  // Nil UUID
  const nilUuidRegex = /^0{8}-?0{4}-?0{4}-?0{4}-?0{12}$/i
  // ブラケット形式
  const bracketRegex = /^\{[0-9a-f-]+\}$/i

  let isValid = false
  let detectedVersion = ""
  let detectedFormat = ""
  let detectedVariant = ""
  let timestamp: Date | undefined
  let node: string | undefined

  if (nilUuidRegex.test(cleanInput)) {
    isValid = true
    detectedVersion = "Nil UUID"
    detectedFormat = cleanInput.includes('-') ? "ハイフン付き" : "ハイフンなし"
  } else if (bracketRegex.test(cleanInput)) {
    const innerUuid = cleanInput.slice(1, -1)
    const innerResult = validateUuid(innerUuid)
    if (innerResult.isValid) {
      isValid = true
      detectedVersion = innerResult.version || ""
      detectedFormat = "ブラケット形式"
      detectedVariant = innerResult.variant || ""
    }
  } else if (uuidRegexWithHyphens.test(cleanInput)) {
    isValid = true
    const versionChar = cleanInput.charAt(14)
    detectedVersion = `Version ${versionChar}`
    detectedFormat = "ハイフン付き（標準形式）"
    
    // バリアント部分のチェック
    const variantChar = cleanInput.charAt(19)
    if (!['8', '9', 'a', 'b'].includes(variantChar)) {
      errors.push("バリアント部分が正しくありません")
    } else {
      detectedVariant = `Variant ${variantChar}`
    }

    // v1の場合、タイムスタンプを解析
    if (versionChar === '1') {
      const timeLow = cleanInput.slice(0, 8)
      const timeMid = cleanInput.slice(9, 13)
      const timeHigh = cleanInput.slice(14, 18)
      const timestampHex = timeHigh + timeMid + timeLow
      const timestampMs = parseInt(timestampHex, 16) / 10000 // 100ns単位をmsに変換
      timestamp = new Date(timestampMs)
      node = cleanInput.slice(24, 36)
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
    } else {
      detectedVariant = `Variant ${variantChar}`
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
    
    if (!/^[0-9a-f-{}]*$/i.test(cleanInput)) {
      errors.push("無効な文字が含まれています（16進数、ハイフン、ブラケットのみ有効）")
    }
  }

  return {
    isValid,
    version: detectedVersion,
    format: detectedFormat,
    variant: detectedVariant,
    errors: errors.length > 0 ? errors : undefined,
    timestamp,
    node
  }
}

// UUID統計情報の計算
export const calculateUuidStats = (history: any[]): any => {
  const stats = {
    totalGenerated: history.length,
    versionCounts: {
      v1: 0,
      v4: 0,
      v5: 0,
      nil: 0
    },
    formatCounts: {
      'ハイフン付き': 0,
      'ハイフンなし': 0,
      '大文字': 0,
      'ブラケット': 0
    },
    lastGenerated: history.length > 0 ? history[0].timestamp : undefined
  }

  history.forEach(item => {
    // バージョンカウント
    if (item.settings.version) {
      stats.versionCounts[item.settings.version as keyof typeof stats.versionCounts]++
    }

    // フォーマットカウント
    if (item.settings.format) {
      if (item.settings.format.includeHyphens) stats.formatCounts['ハイフン付き']++
      if (!item.settings.format.includeHyphens) stats.formatCounts['ハイフンなし']++
      if (item.settings.format.uppercase) stats.formatCounts['大文字']++
      if (item.settings.format.brackets) stats.formatCounts['ブラケット']++
    }
  })

  return stats
}

// UUID比較関数
export const compareUuids = (uuid1: string, uuid2: string): number => {
  const clean1 = uuid1.toLowerCase().replace(/[^0-9a-f]/g, '')
  const clean2 = uuid2.toLowerCase().replace(/[^0-9a-f]/g, '')
  return clean1.localeCompare(clean2)
}

// UUID形式の正規化
export const normalizeUuid = (uuid: string): string => {
  return uuid.toLowerCase().replace(/[{}]/g, '')
}

// UUIDの衝突チェック
export const checkUuidCollision = (uuids: string[]): { hasCollision: boolean; collisions: string[] } => {
  const normalized = uuids.map(normalizeUuid)
  const unique = new Set(normalized)
  const collisions = normalized.filter((uuid, index) => normalized.indexOf(uuid) !== index)
  
  return {
    hasCollision: collisions.length > 0,
    collisions: [...new Set(collisions)]
  }
}

// UUID生成時間の測定
export const measureUuidGenerationTime = (count: number, settings: UuidSettings): number => {
  const start = performance.now()
  
  for (let i = 0; i < count; i++) {
    generateUuidString(settings)
  }
  
  const end = performance.now()
  return end - start
}
