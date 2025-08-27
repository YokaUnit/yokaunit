// 消費税計算ツールの型定義

export interface TaxCalculationResult {
  baseAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  calculationType: 'tax-included' | 'tax-excluded' | 'tax-only';
}

export interface CurrencyInfo {
  code: string;
  name: string;
  rate: number;
  symbol: string;
  flag?: string;
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: Date;
  calculation: TaxCalculationResult;
  currency?: CurrencyInfo;
  note?: string;
}

export interface CalculatorState {
  inputAmount: string;
  selectedTaxRate: number;
  calculationType: 'tax-included' | 'tax-excluded' | 'tax-only';
  selectedCurrency: CurrencyInfo;
  result: TaxCalculationResult | null;
  history: CalculationHistoryItem[];
  isLoading: boolean;
  error: string | null;
}

export interface FormErrors {
  amount?: string;
  taxRate?: string;
}

export interface CalculatorProps {
  initialCurrency?: CurrencyInfo;
  showHistory?: boolean;
  showCurrencyConverter?: boolean;
  maxHistoryItems?: number;
}

// SEO用のメタデータ型
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
}

// 構造化データ用の型
export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
}
