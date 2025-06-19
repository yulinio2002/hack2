import type { ExpenseCategory } from './expenseCategory'

export interface ExpenseSummary {
  expenseCategory: ExpenseCategory
  amount: number
  year: number
  month: number
}