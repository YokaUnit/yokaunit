'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  calculateTaxIncluded,
  calculateTaxExcluded,
  calculateTaxOnly,
  createCalculationHistory,
  validateInput,
  validateTaxRate,
  DEFAULT_CURRENCY_RATES,
  TAX_RATES,
  type TaxCalculation,
  type CurrencyRate,
  type CalculationHistory,
} from '../lib/tax-calculator';

interface CalculatorState {
  inputAmount: string;
  selectedTaxRate: number;
  calculationType: 'tax-included' | 'tax-excluded' | 'tax-only';
  selectedCurrency: CurrencyRate;
  result: TaxCalculation | null;
  history: CalculationHistory[];
  isLoading: boolean;
  error: string | null;
}

interface FormErrors {
  amount?: string;
  taxRate?: string;
}

export function useConsumptionTaxCalculator() {
  const [state, setState] = useState<CalculatorState>({
    inputAmount: '',
    selectedTaxRate: TAX_RATES.current,
    calculationType: 'tax-included',
    selectedCurrency: DEFAULT_CURRENCY_RATES[0], // JPY
    result: null,
    history: [],
    isLoading: false,
    error: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  // 強制的に再レンダリングを促すためのヘルパー
  const triggerUpdate = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('consumption-tax-history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setState(prev => ({ ...prev, history: parsedHistory }));
      }
    } catch (error) {
      console.warn('履歴の読み込みに失敗しました:', error);
    }
  }, []);

  // 履歴をローカルストレージに保存
  const saveHistoryToStorage = useCallback((history: CalculationHistory[]) => {
    try {
      localStorage.setItem('consumption-tax-history', JSON.stringify(history));
    } catch (error) {
      console.warn('履歴の保存に失敗しました:', error);
    }
  }, []);

  // 金額入力の更新
  const updateInputAmount = useCallback((amount: string) => {
    setState(prev => ({ ...prev, inputAmount: amount, error: null }));
    
    // リアルタイムバリデーション
    const validation = validateInput(amount);
    setErrors(prev => ({ ...prev, amount: validation.error }));
  }, []);

  // 税率の更新
  const updateTaxRate = useCallback((rate: number) => {
    setState(prev => ({ ...prev, selectedTaxRate: rate, error: null }));
    
    // リアルタイムバリデーション
    const validation = validateTaxRate(rate);
    setErrors(prev => ({ ...prev, taxRate: validation.error }));
  }, []);

  // 計算種別の更新
  const updateCalculationType = useCallback((type: 'tax-included' | 'tax-excluded' | 'tax-only') => {
    setState(prev => ({ ...prev, calculationType: type, error: null }));
  }, []);

  // 通貨の更新
  const updateCurrency = useCallback((currency: CurrencyRate) => {
    setState(prev => ({ ...prev, selectedCurrency: currency }));
  }, []);

  // 計算実行
  const calculate = useCallback(() => {
    const { inputAmount, selectedTaxRate, calculationType } = state;
    
    // バリデーション
    const amountValidation = validateInput(inputAmount);
    const rateValidation = validateTaxRate(selectedTaxRate);
    
    if (!amountValidation.isValid || !rateValidation.isValid) {
      setErrors({
        amount: amountValidation.error,
        taxRate: rateValidation.error,
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    setErrors({});

    try {
      const amount = parseFloat(inputAmount.replace(/[,¥$€£₩]/g, ''));
      let result: TaxCalculation;

      switch (calculationType) {
        case 'tax-included':
          result = calculateTaxIncluded(amount, selectedTaxRate);
          break;
        case 'tax-excluded':
          result = calculateTaxExcluded(amount, selectedTaxRate);
          break;
        case 'tax-only':
          result = calculateTaxOnly(amount, selectedTaxRate);
          break;
        default:
          throw new Error('不正な計算種別です');
      }

      // 履歴に追加
      const historyItem = createCalculationHistory(result, state.selectedCurrency);
      const newHistory = [historyItem, ...state.history].slice(0, 100); // 最大100件

      // 状態を更新（履歴の更新を確実にするため、別々に更新）
      setState(prev => ({
        ...prev,
        result,
        isLoading: false,
      }));

      // 履歴を別途更新して確実に反映させる
      setState(prev => ({
        ...prev,
        history: newHistory,
      }));

      saveHistoryToStorage(newHistory);
      triggerUpdate(); // 強制的に再レンダリングを促す
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '計算中にエラーが発生しました',
        isLoading: false,
      }));
    }
  }, [state, saveHistoryToStorage]);

  // リセット
  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      inputAmount: '',
      result: null,
      error: null,
    }));
    setErrors({});
  }, []);

  // 履歴をクリア
  const clearHistory = useCallback(() => {
    const emptyHistory: CalculationHistory[] = [];
    setState(prev => ({ ...prev, history: emptyHistory }));
    localStorage.removeItem('consumption-tax-history');
    triggerUpdate();
  }, [triggerUpdate]);

  // 履歴から削除
  const removeHistoryItem = useCallback((id: string) => {
    const newHistory = state.history.filter(item => item.id !== id);
    setState(prev => ({ ...prev, history: newHistory }));
    saveHistoryToStorage(newHistory);
    triggerUpdate();
  }, [state.history, saveHistoryToStorage, triggerUpdate]);

  // 履歴項目を再計算として設定
  const loadFromHistory = useCallback((historyItem: CalculationHistory) => {
    setState(prev => ({
      ...prev,
      inputAmount: historyItem.calculation.baseAmount.toString(),
      selectedTaxRate: historyItem.calculation.taxRate,
      calculationType: historyItem.calculation.calculationType,
      selectedCurrency: historyItem.currency || DEFAULT_CURRENCY_RATES[0],
      result: historyItem.calculation,
    }));
  }, []);

  // CSVエクスポート
  const exportToCSV = useCallback(() => {
    const { history } = state;
    if (history.length === 0) return;

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
      item.timestamp.toLocaleString('ja-JP'),
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
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\r\n'); // Windows改行コードを使用

    // BOM付きUTF-8でエンコード（Excel文字化け対策）
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;
    
    const blob = new Blob([csvWithBOM], { 
      type: 'text/csv;charset=utf-8;' 
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const fileName = `消費税計算履歴_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // メモリリークを防ぐためURLを解放
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }, [state.history]);

  return {
    // State
    inputAmount: state.inputAmount,
    selectedTaxRate: state.selectedTaxRate,
    calculationType: state.calculationType,
    selectedCurrency: state.selectedCurrency,
    result: state.result,
    history: state.history,
    isLoading: state.isLoading,
    error: state.error,
    errors,

    // Actions
    updateInputAmount,
    updateTaxRate,
    updateCalculationType,
    updateCurrency,
    calculate,
    reset,
    clearHistory,
    removeHistoryItem,
    loadFromHistory,
    exportToCSV,

    // Computed values
    hasResult: state.result !== null,
    hasHistory: state.history.length > 0,
    canCalculate: state.inputAmount.trim() !== '' && !errors.amount && !errors.taxRate,
  };
}
