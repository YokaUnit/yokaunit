// UUIDバージョンの型定義
export type UuidVersion = "v1" | "v4" | "v5" | "nil"

// UUIDフォーマットの型定義
export interface UuidFormat {
  uppercase: boolean
  includeHyphens: boolean
  brackets: boolean
}

// UUID設定の型定義
export interface UuidSettings {
  version: UuidVersion
  format: UuidFormat
  namespace?: string
  name?: string
}

// UUID履歴の型定義
export interface UuidHistory {
  id: string
  uuid: string
  timestamp: Date
  settings: UuidSettings
  isValid: boolean
  isFavorite: boolean
}

// UUIDバリデーション結果の型定義
export interface UuidValidationResult {
  isValid: boolean
  version?: string
  format?: string
  variant?: string
  errors?: string[]
  timestamp?: Date
  node?: string
}

// UUID統計情報の型定義
export interface UuidStats {
  totalGenerated: number
  versionCounts: Record<UuidVersion, number>
  formatCounts: Record<string, number>
  lastGenerated?: Date
}

// UUIDプリセットの型定義
export interface UuidPreset {
  name: string
  description: string
  settings: UuidSettings
}

// UUIDプリセット定義
export const UUID_PRESETS: Record<string, UuidPreset> = {
  standard: {
    name: "標準",
    description: "PostgreSQL互換の標準UUID",
    settings: {
      version: "v4",
      format: {
        uppercase: false,
        includeHyphens: true,
        brackets: false
      }
    }
  },
  uppercase: {
    name: "大文字",
    description: "大文字で出力",
    settings: {
      version: "v4",
      format: {
        uppercase: true,
        includeHyphens: true,
        brackets: false
      }
    }
  },
  compact: {
    name: "コンパクト",
    description: "ハイフンなしのコンパクト形式",
    settings: {
      version: "v4",
      format: {
        uppercase: false,
        includeHyphens: false,
        brackets: false
      }
    }
  },
  timestamp: {
    name: "タイムスタンプ",
    description: "v1タイムスタンプベース",
    settings: {
      version: "v1",
      format: {
        uppercase: false,
        includeHyphens: true,
        brackets: false
      }
    }
  },
  nil: {
    name: "Nil UUID",
    description: "すべて0のNil UUID",
    settings: {
      version: "nil",
      format: {
        uppercase: false,
        includeHyphens: true,
        brackets: false
      }
    }
  },
  namespaced: {
    name: "名前空間",
    description: "v5名前空間ベース",
    settings: {
      version: "v5",
      format: {
        uppercase: false,
        includeHyphens: true,
        brackets: false
      },
      namespace: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      name: "example"
    }
  }
}

// UUIDバージョン情報
export const UUID_VERSION_INFO = {
  v1: {
    name: "Version 1",
    description: "タイムスタンプベース（MACアドレス使用）",
    useCase: "分散システムでの一意性保証",
    security: "中程度（MACアドレスが漏洩する可能性）"
  },
  v4: {
    name: "Version 4",
    description: "ランダムベース",
    useCase: "一般的な用途（推奨）",
    security: "高（予測困難）"
  },
  v5: {
    name: "Version 5",
    description: "SHA-1ハッシュベース（名前空間）",
    useCase: "名前空間ベースの一意性",
    security: "高（決定論的だが予測困難）"
  },
  nil: {
    name: "Nil UUID",
    description: "すべて0の特殊UUID",
    useCase: "テスト・デバッグ用途",
    security: "なし（固定値）"
  }
}
