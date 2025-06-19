import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useExpenseDetails } from '../hooks/useExpensesSummary'
import { createExpense, deleteExpense } from '../api/expenses'
import type { Expense } from '../types/expense'
import { formatCurrency } from '../utils/formatters'

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>()
  const [search] = useSearchParams()
  const year = Number(search.get('year'))
  const month = Number(search.get('month'))
  const { data, isLoading, isError, refetch } = useExpenseDetails(year, month, Number(id))
  const expenses: Expense[] = data?.data ?? []
  const [amount, setAmount] = useState<number>(0)

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    await createExpense({ amount, year, month, categoryId: Number(id) })
    setAmount(0)
    refetch()
  }

  const removeExpense = async (expenseId: number) => {
    await deleteExpense(expenseId)
    refetch()
  }

  if (isLoading) return <div>Cargando detalles…</div>
  if (isError) return <div className="text-red-600">Error al cargar detalles.</div>

  return (
    <div>
      <h1 className="text-xl mb-4">Detalle de categoría {id} – {month}/{year}</h1>

      <form onSubmit={addExpense} className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border rounded px-2 py-1 flex-1"
          min={0}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          + Agregar
        </button>
      </form>

      <ul className="space-y-2">
        {expenses.map(exp => (
          <li key={exp.id} className="border p-2 flex justify-between">
            <span>{formatCurrency(exp.amount)}</span>
            <button
              onClick={() => removeExpense(exp.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
