// パスワード履歴の型定義
export interface PasswordHistory {
  id: string
  password: string
  timestamp: Date
  settings: PasswordSettings
  strength: number
  isFavorite: boolean
}

// パスワード設定の型定義
export interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
  customCharset: string
  preset: string
}

// パスワード強度分析の型定義
export interface PasswordStrengthAnalysis {
  strength: number
  length: number
  complexity: number
  entropy: number
  timeToCrack: string
}

// プリセットの型定義
export interface PasswordPreset {
  name: string
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar?: boolean
  excludeAmbiguous?: boolean
}

// プリセット定義
export const PRESETS: Record<string, PasswordPreset> = {
  basic: { 
    name: "基本", 
    length: 12, 
    includeUppercase: true, 
    includeLowercase: true, 
    includeNumbers: true, 
    includeSymbols: false 
  },
  strong: { 
    name: "強力", 
    length: 16, 
    includeUppercase: true, 
    includeLowercase: true, 
    includeNumbers: true, 
    includeSymbols: true 
  },
  maximum: { 
    name: "最大", 
    length: 24, 
    includeUppercase: true, 
    includeLowercase: true, 
    includeNumbers: true, 
    includeSymbols: true, 
    excludeSimilar: true 
  },
  pin: { 
    name: "PIN", 
    length: 6, 
    includeUppercase: false, 
    includeLowercase: false, 
    includeNumbers: true, 
    includeSymbols: false 
  },
  memorable: { 
    name: "覚えやすい", 
    length: 14, 
    includeUppercase: true, 
    includeLowercase: true, 
    includeNumbers: true, 
    includeSymbols: false, 
    excludeSimilar: true 
  }
}
