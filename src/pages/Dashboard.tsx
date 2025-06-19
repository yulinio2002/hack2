import React from 'react'
import { Link } from 'react-router-dom'
import { useExpensesSummary } from '../hooks/useExpensesSummary'
import type { ExpenseSummary } from '../types/expenseSummary'

const Dashboard: React.FC = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const { data, isLoading, isError } = useExpensesSummary(year, month)
  const summaries: ExpenseSummary[] = data?.data ?? []

  if (isLoading) return <div className="p-4">Cargando resumen...</div>
  if (isError) return <div className="p-4 text-red-600">Error al cargar resumen.</div>

  return (
    <div>
      <h1 className="text-xl mb-4">Resumen de {month}/{year}</h1>
      {summaries.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {summaries.map(item => (
            <Link
              to={`/category/${item.expenseCategory.id}?year=${year}&month=${month}`}
              key={item.expenseCategory.id}
              className="block border rounded p-4 hover:shadow"
            >
              <h2 className="font-semibold">{item.expenseCategory.name}</h2>
              <div className="mt-2 text-sm text-gray-500">Total: S/. {item.amount}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No hay datos para este mes.</div>
      )}
    </div>
  )
}

export default Dashboard
