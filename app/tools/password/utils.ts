import { PasswordSettings, PasswordStrengthAnalysis } from './types'

// パスワード強度の詳細分析
export const analyzePasswordStrength = (pwd: string): PasswordStrengthAnalysis => {
  let strength = 0
  let length = 0
  let complexity = 0
  let entropy = 0
  
  // 長さによる強度
  if (pwd.length >= 8) { strength += 1; length += 1 }
  if (pwd.length >= 12) { strength += 1; length += 1 }
  if (pwd.length >= 16) { strength += 1; length += 1 }
  if (pwd.length >= 20) { strength += 1; length += 1 }
  
  // 文字種による強度
  const hasUpper = /[A-Z]/.test(pwd)
  const hasLower = /[a-z]/.test(pwd)
  const hasNumber = /[0-9]/.test(pwd)
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd)
  
  if (hasUpper) { strength += 1; complexity += 1 }
  if (hasLower) { strength += 1; complexity += 1 }
  if (hasNumber) { strength += 1; complexity += 1 }
  if (hasSymbol) { strength += 1; complexity += 1 }
  
  // エントロピー計算
  let charsetSize = 0
  if (hasUpper) charsetSize += 26
  if (hasLower) charsetSize += 26
  if (hasNumber) charsetSize += 10
  if (hasSymbol) charsetSize += 32
  
  entropy = Math.log2(Math.pow(charsetSize, pwd.length))
  
  // クラック時間の推定
  const timeToCrack = calculateTimeToCrack(entropy)
  
  return {
    strength: Math.min(strength, 8),
    length,
    complexity,
    entropy: Math.round(entropy),
    timeToCrack
  }
}

// クラック時間の計算
export const calculateTimeToCrack = (entropy: number): string => {
  const guessesPerSecond = 1e9 // 1秒間に10億回の試行
  const seconds = Math.pow(2, entropy) / guessesPerSecond
  
  if (seconds < 60) return `${Math.round(seconds)}秒`
  if (seconds < 3600) return `${Math.round(seconds / 60)}分`
  if (seconds < 86400) return `${Math.round(seconds / 3600)}時間`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)}日`
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)}年`
  return `${Math.round(seconds / 31536000000)}千年`
}

// パスワード生成ロジック
export const generatePasswordString = (settings: PasswordSettings): string => {
  let charset = ""
  
  // カスタム文字セットが指定されている場合はそれを使用
  if (settings.customCharset) {
    charset = settings.customCharset
  } else {
    // 基本文字セット
    const uppercaseChars = settings.excludeSimilar ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercaseChars = settings.excludeSimilar ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"
    const numberChars = settings.excludeSimilar ? "23456789" : "0123456789"
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-="
    
    // 曖昧な文字を除外
    const ambiguousChars = settings.excludeAmbiguous ? "{}[]()/\\'\"`~,;.<>" : ""
    
    if (settings.includeUppercase) charset += uppercaseChars
    if (settings.includeLowercase) charset += lowercaseChars
    if (settings.includeNumbers) charset += numberChars
    if (settings.includeSymbols) charset += symbolChars.replace(new RegExp(`[${ambiguousChars}]`, 'g'), '')
  }
  
  // 少なくとも1つの文字種を選択する必要がある
  if (!charset) {
    charset = "abcdefghijklmnopqrstuvwxyz"
  }
  
  let newPassword = ""
  for (let i = 0; i < settings.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    newPassword += charset[randomIndex]
  }
  
  return newPassword
}

// 強度表示のヘルパー関数
export const getStrengthColor = (strength: number): string => {
  if (strength <= 2) return "bg-red-500"
  if (strength <= 4) return "bg-yellow-500"
  if (strength <= 6) return "bg-blue-500"
  return "bg-green-500"
}

export const getStrengthText = (strength: number): string => {
  if (strength <= 2) return "弱い"
  if (strength <= 4) return "普通"
  if (strength <= 6) return "強い"
  return "最強"
}

export const getStrengthIcon = (strength: number): string => {
  if (strength <= 2) return "text-red-500"
  if (strength <= 4) return "text-yellow-500"
  if (strength <= 6) return "text-blue-500"
  return "text-green-500"
}

// エクスポート機能
export const exportPasswords = (
  passwordHistory: any[], 
  format: 'csv' | 'txt'
): { content: string; filename: string } => {
  const timestamp = new Date().toISOString().split('T')[0]
  let content = ''
  let filename = ''
  
  if (format === 'csv') {
    content = 'Password,Strength,Timestamp,Settings\n'
    passwordHistory.forEach(item => {
      content += `"${item.password}",${item.strength},"${item.timestamp.toISOString()}","${JSON.stringify(item.settings)}"\n`
    })
    filename = `passwords-${timestamp}.csv`
  } else {
    content = `パスワード履歴 - ${timestamp}\n${'='.repeat(50)}\n\n`
    passwordHistory.forEach((item, index) => {
      content += `${index + 1}. ${item.password}\n`
      content += `   強度: ${item.strength}/8 | 作成日: ${item.timestamp.toLocaleString()}\n`
      content += `   設定: 長さ${item.settings.length}, 大文字${item.settings.includeUppercase ? '✓' : '✗'}, 小文字${item.settings.includeLowercase ? '✓' : '✗'}, 数字${item.settings.includeNumbers ? '✓' : '✗'}, 記号${item.settings.includeSymbols ? '✓' : '✗'}\n\n`
    })
    filename = `passwords-${timestamp}.txt`
  }
  
  return { content, filename }
}

// ファイルダウンロード
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
