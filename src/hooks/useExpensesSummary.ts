import { useQuery } from '@tanstack/react-query'
import { getExpensesCategory, getSummary, deleteExpense, createExpense} from '../api/expenses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ExpenseCategoryCreate } from '../types/expenseCategory'

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


export const useCreateExpense = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (payload: any) => createExpense(payload),
        onSuccess: () => {
            // Invalidar y refrescar la query de summaries después de crear
            queryClient.invalidateQueries({ queryKey: ['expensesSummary'] })
        },
        onError: (error) => {
            console.error('Error al crear gasto:', error)
        }
    })
}

