'use client';

import React from 'react';
import { useConsumptionTaxContext } from '../context/ConsumptionTaxContext';
import { formatCurrency, TAX_RATES, DEFAULT_CURRENCY_RATES } from '../lib/tax-calculator';

export function TaxCalculator() {
  const {
    inputAmount,
    selectedTaxRate,
    calculationType,
    selectedCurrency,
    result,
    isLoading,
    error,
    errors,
    canCalculate,
    updateInputAmount,
    updateTaxRate,
    updateCalculationType,
    updateCurrency,
    calculate,
    reset,
  } = useConsumptionTaxContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canCalculate) {
      calculate();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canCalculate) {
      e.preventDefault();
      calculate();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          消費税計算機
        </h2>
        <p className="text-blue-100 text-center text-sm md:text-base">
          税込・税抜・税額を簡単計算
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 計算種別選択 */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              計算種別
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { value: 'tax-included', label: '税込から税抜', desc: '税込価格→税抜価格' },
                { value: 'tax-excluded', label: '税抜から税込', desc: '税抜価格→税込価格' },
                { value: 'tax-only', label: '税額のみ計算', desc: '税抜価格→税額' },
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateCalculationType(value as any)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    calculationType === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-gray-500 mt-1">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 金額入力 */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
              {calculationType === 'tax-included' ? '税込金額' :
               calculationType === 'tax-excluded' ? '税抜金額' : '基準金額'}
            </label>
            <div className="relative">
              <input
                id="amount"
                type="text"
                value={inputAmount}
                onChange={(e) => updateInputAmount(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="例: 1100"
                className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 ${
                  errors.amount
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                autoComplete="off"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                {selectedCurrency.symbol}
              </div>
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.amount}
              </p>
            )}
          </div>

          {/* 税率選択 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="taxRate" className="block text-sm font-semibold text-gray-700">
                税率
              </label>
              <select
                id="taxRate"
                value={selectedTaxRate}
                onChange={(e) => updateTaxRate(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              >
                <option value={10}>10% (標準税率)</option>
                <option value={8}>8% (軽減税率)</option>
                <option value={5}>5% (旧税率)</option>
                <option value={3}>3% (導入時税率)</option>
                {[1, 2, 4, 6, 7, 9, 12, 15, 20, 25].map(rate => (
                  <option key={rate} value={rate}>{rate}% (カスタム)</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="currency" className="block text-sm font-semibold text-gray-700">
                通貨
              </label>
              <select
                id="currency"
                value={selectedCurrency.code}
                onChange={(e) => {
                  const currency = DEFAULT_CURRENCY_RATES.find(c => c.code === e.target.value);
                  if (currency) updateCurrency(currency);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              >
                {DEFAULT_CURRENCY_RATES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={!canCalculate || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  計算中...
                </span>
              ) : (
                '計算する'
              )}
            </button>
            
            <button
              type="button"
              onClick={reset}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              リセット
            </button>
          </div>
        </form>

        {/* 計算結果 */}
        {result && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              計算結果
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <div className="text-sm text-gray-600 mb-1">基準金額</div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(result.baseAmount, selectedCurrency)}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <div className="text-sm text-gray-600 mb-1">消費税額</div>
                <div className="text-xl font-bold text-orange-600">
                  {formatCurrency(result.taxAmount, selectedCurrency)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  税率: {result.taxRate}%
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-green-100 sm:col-span-2 lg:col-span-1">
                <div className="text-sm text-gray-600 mb-1">合計金額</div>
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.totalAmount, selectedCurrency)}
                </div>
              </div>
            </div>

            {/* 計算式表示 */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-green-100">
              <div className="text-xs text-gray-500 mb-1">計算式</div>
              <div className="text-sm font-mono text-gray-700">
                {calculationType === 'tax-included' && (
                  <>
                    税抜 = {formatCurrency(result.totalAmount, selectedCurrency)} ÷ (1 + {result.taxRate}%) = {formatCurrency(result.baseAmount, selectedCurrency)}
                    <br />
                    税額 = {formatCurrency(result.totalAmount, selectedCurrency)} - {formatCurrency(result.baseAmount, selectedCurrency)} = {formatCurrency(result.taxAmount, selectedCurrency)}
                  </>
                )}
                {calculationType === 'tax-excluded' && (
                  <>
                    税額 = {formatCurrency(result.baseAmount, selectedCurrency)} × {result.taxRate}% = {formatCurrency(result.taxAmount, selectedCurrency)}
                    <br />
                    税込 = {formatCurrency(result.baseAmount, selectedCurrency)} + {formatCurrency(result.taxAmount, selectedCurrency)} = {formatCurrency(result.totalAmount, selectedCurrency)}
                  </>
                )}
                {calculationType === 'tax-only' && (
                  <>
                    税額 = {formatCurrency(result.baseAmount, selectedCurrency)} × {result.taxRate}% = {formatCurrency(result.taxAmount, selectedCurrency)}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
