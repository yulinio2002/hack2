import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../api/expenses'

export const useExpensesSummary = (year: number, month: number) =>
    useQuery({
        queryKey: ['summary', year, month],
        queryFn: () => getSummary(year, month),
    })