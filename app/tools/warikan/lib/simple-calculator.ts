export interface Member {
  id: string
  name: string
  shouldPay: number
  actualPaid: number
}

export interface Settlement {
  from: string
  to: string
  amount: number
}

export interface SettlementResultType {
  settlements: Settlement[]
  totalTransfers: number
  isBalanced: boolean
}

export interface SimpleCalculatorResult {
  totalAmount: number
  peopleCount: number
  perPersonAmount: number
  roundedTotal: number
  remainder: number
}

export function calculateSimpleWarikan(totalAmount: number, peopleCount: number, roundUp = 1): SimpleCalculatorResult {
  if (totalAmount <= 0 || peopleCount <= 0) {
    return {
      totalAmount: 0,
      peopleCount: 0,
      perPersonAmount: 0,
      roundedTotal: 0,
      remainder: 0,
    }
  }

  const baseAmount = Math.floor(totalAmount / peopleCount)
  const roundedAmount = Math.ceil(baseAmount / roundUp) * roundUp
  const roundedTotal = roundedAmount * peopleCount
  const remainder = roundedTotal - totalAmount

  return {
    totalAmount,
    peopleCount,
    perPersonAmount: roundedAmount,
    roundedTotal,
    remainder,
  }
}

export function calculateSettlement(members: Member[]): SettlementResultType {
  // Calculate balances (positive = owes money, negative = should receive money)
  const balances = members.map((member) => ({
    name: member.name,
    balance: member.shouldPay - member.actualPaid,
  }))

  // Separate debtors and creditors
  const debtors = balances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance)
  const creditors = balances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance)

  const settlements: Settlement[] = []
  let totalTransfers = 0

  // Create a copy to work with
  const workingDebtors = [...debtors]
  const workingCreditors = creditors.map((c) => ({ ...c, balance: Math.abs(c.balance) }))

  // Match debtors with creditors
  while (workingDebtors.length > 0 && workingCreditors.length > 0) {
    const debtor = workingDebtors[0]
    const creditor = workingCreditors[0]

    const transferAmount = Math.min(debtor.balance, creditor.balance)

    if (transferAmount > 0) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: transferAmount,
      })
      totalTransfers += transferAmount
    }

    // Update balances
    debtor.balance -= transferAmount
    creditor.balance -= transferAmount

    // Remove settled parties
    if (debtor.balance === 0) {
      workingDebtors.shift()
    }
    if (creditor.balance === 0) {
      workingCreditors.shift()
    }
  }

  // Check if settlement is balanced
  const totalShouldPay = members.reduce((sum, m) => sum + m.shouldPay, 0)
  const totalActualPaid = members.reduce((sum, m) => sum + m.actualPaid, 0)
  const isBalanced = Math.abs(totalShouldPay - totalActualPaid) < 0.01

  return {
    settlements,
    totalTransfers,
    isBalanced,
  }
}
