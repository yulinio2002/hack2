import { useQuery } from '@tanstack/react-query'
import { getExpensesCategory, getSummary, deleteExpense } from '../api/expenses'
import { use } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export const useDeleteExpense = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id: number) => deleteExpense(id),
        onSuccess: () => {
            // Invalidar y refrescar la query de summaries después de eliminar
            queryClient.invalidateQueries({ queryKey: ['expensesSummary'] })
        },
        onError: (error) => {
            console.error('Error al eliminar gasto:', error)
        }
    })
}

