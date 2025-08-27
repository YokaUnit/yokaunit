'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useConsumptionTaxCalculator } from '../hooks/useConsumptionTaxCalculator';
import type { TaxCalculation, CurrencyRate, CalculationHistory } from '../lib/tax-calculator';

interface ConsumptionTaxContextType {
  // State
  inputAmount: string;
  selectedTaxRate: number;
  calculationType: 'tax-included' | 'tax-excluded' | 'tax-only';
  selectedCurrency: CurrencyRate;
  result: TaxCalculation | null;
  history: CalculationHistory[];
  isLoading: boolean;
  error: string | null;
  errors: {
    amount?: string;
    taxRate?: string;
  };

  // Actions
  updateInputAmount: (amount: string) => void;
  updateTaxRate: (rate: number) => void;
  updateCalculationType: (type: 'tax-included' | 'tax-excluded' | 'tax-only') => void;
  updateCurrency: (currency: CurrencyRate) => void;
  calculate: () => void;
  reset: () => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
  loadFromHistory: (historyItem: CalculationHistory) => void;
  exportToCSV: () => void;

  // Computed values
  hasResult: boolean;
  hasHistory: boolean;
  canCalculate: boolean;
}

const ConsumptionTaxContext = createContext<ConsumptionTaxContextType | undefined>(undefined);

interface ConsumptionTaxProviderProps {
  children: ReactNode;
}

export function ConsumptionTaxProvider({ children }: ConsumptionTaxProviderProps) {
  const hookValues = useConsumptionTaxCalculator();

  return (
    <ConsumptionTaxContext.Provider value={hookValues}>
      {children}
    </ConsumptionTaxContext.Provider>
  );
}

export function useConsumptionTaxContext() {
  const context = useContext(ConsumptionTaxContext);
  if (context === undefined) {
    throw new Error('useConsumptionTaxContext must be used within a ConsumptionTaxProvider');
  }
  return context;
}
