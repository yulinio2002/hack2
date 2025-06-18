import type { ExpenseCategory } from './expenseCategory';

export interface Expense {
  id: number
  expenseCategory: ExpenseCategory
  year: number
  month: number
  amount: number
}

