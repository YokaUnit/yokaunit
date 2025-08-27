'use client';

import React, { useState } from 'react';
import { useConsumptionTaxContext } from '../context/ConsumptionTaxContext';
import { formatCurrency } from '../lib/tax-calculator';

export function CalculationHistory() {
  const {
    history,
    hasHistory,
    clearHistory,
    removeHistoryItem,
    loadFromHistory,
    exportToCSV,
  } = useConsumptionTaxContext();

  const [showConfirmClear, setShowConfirmClear] = useState(false);

  if (!hasHistory) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">計算履歴はありません</h3>
        <p className="text-gray-500 text-sm">
          消費税の計算を実行すると、ここに履歴が表示されます。
        </p>
      </div>
    );
  }

  const getCalculationTypeLabel = (type: string) => {
    switch (type) {
      case 'tax-included': return '税込→税抜';
      case 'tax-excluded': return '税抜→税込';
      case 'tax-only': return '税額計算';
      default: return type;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-1">計算履歴</h3>
            <p className="text-purple-100 text-sm">
              {history.length}件の計算履歴があります
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV出力
            </button>
            
            <button
              onClick={() => setShowConfirmClear(true)}
              className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              全削除
            </button>
          </div>
        </div>
      </div>

      {/* 確認ダイアログ */}
      {showConfirmClear && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h4 className="text-lg font-bold text-gray-900 mb-3">履歴を全削除しますか？</h4>
            <p className="text-gray-600 text-sm mb-6">
              この操作は取り消せません。すべての計算履歴が削除されます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  clearHistory();
                  setShowConfirmClear(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                削除する
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 履歴リスト */}
      <div className="max-h-96 overflow-y-auto">
        {history.map((item, index) => (
          <div
            key={item.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
              index === 0 ? 'bg-blue-50/50' : ''
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* 左側: 計算情報 */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getCalculationTypeLabel(item.calculation.calculationType)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.timestamp.toLocaleString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {index === 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      最新
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">基準:</span>
                    <span className="font-medium ml-1">
                      {formatCurrency(item.calculation.baseAmount, item.currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">税額:</span>
                    <span className="font-medium ml-1 text-orange-600">
                      {formatCurrency(item.calculation.taxAmount, item.currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">合計:</span>
                    <span className="font-medium ml-1 text-green-600">
                      {formatCurrency(item.calculation.totalAmount, item.currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">税率:</span>
                    <span className="font-medium ml-1">
                      {item.calculation.taxRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 右側: アクション */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadFromHistory(item)}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  再計算
                </button>
                
                <button
                  onClick={() => removeHistoryItem(item.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* フッター */}
      <div className="px-6 py-4 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          履歴は最大100件まで保存されます。ブラウザのローカルストレージに保存されます。
        </p>
      </div>
    </div>
  );
}
