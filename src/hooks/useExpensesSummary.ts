import { useQuery } from '@tanstack/react-query'
import { getExpensesCategory, getSummary } from '../api/expenses'

export const useExpensesGetCategory = () =>
    useQuery({
        queryKey: ['expensesCategory'],
        queryFn: () => getExpensesCategory()
    })

    export const useExpensesSummary = () =>
    useQuery({
        queryKey: ['expensesSummary'],
        queryFn: () => getSummary()
    })


