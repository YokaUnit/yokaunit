// 消費税計算ライブラリ
export interface TaxCalculation {
  baseAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  calculationType: 'tax-included' | 'tax-excluded' | 'tax-only';
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

export interface CalculationHistory {
  id: string;
  timestamp: Date;
  calculation: TaxCalculation;
  currency?: CurrencyRate;
  note?: string;
}

// 日本の消費税率（履歴対応）
export const TAX_RATES = {
  current: 10,
  reduced: 8,
  history: [
    { rate: 10, startDate: '2019-10-01', endDate: null, description: '標準税率' },
    { rate: 8, startDate: '2019-10-01', endDate: null, description: '軽減税率' },
    { rate: 8, startDate: '2014-04-01', endDate: '2019-09-30', description: '旧税率' },
    { rate: 5, startDate: '1997-04-01', endDate: '2014-03-31', description: '旧税率' },
    { rate: 3, startDate: '1989-04-01', endDate: '1997-03-31', description: '導入時税率' },
  ]
} as const;

// 主要通貨の初期レート（実際のAPIから取得する場合の基準値）
export const DEFAULT_CURRENCY_RATES: CurrencyRate[] = [
  { code: 'JPY', name: '日本円', rate: 1, symbol: '¥' },
  { code: 'USD', name: 'アメリカドル', rate: 150, symbol: '$' },
  { code: 'EUR', name: 'ユーロ', rate: 165, symbol: '€' },
  { code: 'GBP', name: 'イギリスポンド', rate: 190, symbol: '£' },
  { code: 'CNY', name: '中国元', rate: 21, symbol: '¥' },
  { code: 'KRW', name: '韓国ウォン', rate: 0.11, symbol: '₩' },
];

/**
 * 税込み価格から税抜き価格を計算
 */
export function calculateTaxExcluded(taxIncludedAmount: number, taxRate: number): TaxCalculation {
  const baseAmount = Math.floor(taxIncludedAmount / (1 + taxRate / 100));
  const taxAmount = taxIncludedAmount - baseAmount;
  
  return {
    baseAmount,
    taxRate,
    taxAmount,
    totalAmount: taxIncludedAmount,
    calculationType: 'tax-excluded'
  };
}

/**
 * 税抜き価格から税込み価格を計算
 */
export function calculateTaxIncluded(baseAmount: number, taxRate: number): TaxCalculation {
  const taxAmount = Math.floor(baseAmount * taxRate / 100);
  const totalAmount = baseAmount + taxAmount;
  
  return {
    baseAmount,
    taxRate,
    taxAmount,
    totalAmount,
    calculationType: 'tax-included'
  };
}

/**
 * 税額のみを計算
 */
export function calculateTaxOnly(baseAmount: number, taxRate: number): TaxCalculation {
  const taxAmount = Math.floor(baseAmount * taxRate / 100);
  
  return {
    baseAmount,
    taxRate,
    taxAmount,
    totalAmount: baseAmount + taxAmount,
    calculationType: 'tax-only'
  };
}

/**
 * 外貨を日本円に換算
 */
export function convertCurrency(amount: number, fromCurrency: CurrencyRate, toCurrency: CurrencyRate): number {
  if (fromCurrency.code === toCurrency.code) return amount;
  
  // 一度JPYに変換してから目的通貨に変換
  const jpyAmount = fromCurrency.code === 'JPY' ? amount : amount * fromCurrency.rate;
  const convertedAmount = toCurrency.code === 'JPY' ? jpyAmount : jpyAmount / toCurrency.rate;
  
  return Math.round(convertedAmount * 100) / 100;
}

/**
 * 計算結果をフォーマット
 */
export function formatCurrency(amount: number, currency: CurrencyRate = DEFAULT_CURRENCY_RATES[0]): string {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.code === 'JPY' ? 0 : 2,
  });
  
  try {
    return formatter.format(amount);
  } catch {
    // フォールバック
    return `${currency.symbol}${amount.toLocaleString('ja-JP')}`;
  }
}

/**
 * 計算履歴を生成
 */
export function createCalculationHistory(calculation: TaxCalculation, currency?: CurrencyRate, note?: string): CalculationHistory {
  return {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    calculation,
    currency,
    note,
  };
}

/**
 * CSVエクスポート用のデータを生成（Excel対応・BOM付きUTF-8）
 */
export function generateCSVData(history: CalculationHistory[]): string {
  const headers = [
    '日時',
    '計算種別',
    '基準金額',
    '税率(%)',
    '税額',
    '合計金額',
    '通貨',
    'メモ'
  ];
  
  const rows = history.map(item => [
    item.timestamp.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    item.calculation.calculationType === 'tax-included' ? '税込→税抜計算' :
    item.calculation.calculationType === 'tax-excluded' ? '税抜→税込計算' : '税額のみ計算',
    item.calculation.baseAmount.toLocaleString('ja-JP'),
    `${item.calculation.taxRate}%`,
    item.calculation.taxAmount.toLocaleString('ja-JP'),
    item.calculation.totalAmount.toLocaleString('ja-JP'),
    item.currency?.name || '日本円',
    item.note || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n'); // Windows改行コードを使用
  
  // BOM付きUTF-8でエンコード（Excel文字化け対策）
  const BOM = '\uFEFF';
  return BOM + csvContent;
}

/**
 * 入力値の検証
 */
export function validateInput(value: string): { isValid: boolean; error?: string } {
  if (!value.trim()) {
    return { isValid: false, error: '金額を入力してください' };
  }
  
  const numValue = parseFloat(value.replace(/[,¥$€£₩]/g, ''));
  
  if (isNaN(numValue)) {
    return { isValid: false, error: '有効な数値を入力してください' };
  }
  
  if (numValue < 0) {
    return { isValid: false, error: '負の値は入力できません' };
  }
  
  if (numValue > 999999999999) {
    return { isValid: false, error: '金額が大きすぎます' };
  }
  
  return { isValid: true };
}

/**
 * 税率の検証
 */
export function validateTaxRate(rate: number): { isValid: boolean; error?: string } {
  if (rate < 0 || rate > 100) {
    return { isValid: false, error: '税率は0%から100%の間で入力してください' };
  }
  
  return { isValid: true };
}
