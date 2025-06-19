import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useExpensesSummary } from '../hooks/useExpensesSummary'
import type { ExpenseSummary } from '../types/expenseSummary'
import { formatCurrency } from '../utils/formatters'

const Dashboard: React.FC = () => {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const { data, isLoading, isError } = useExpensesSummary(year, month)
  const summaries: ExpenseSummary[] = data?.data ?? []

  if (isLoading) return <div className="p-4">Cargando resumen...</div>
  if (isError) return <div className="p-4 text-red-600">Error al cargar resumen.</div>

  return (
    <div>
      <h1 className="text-xl mb-4">Resumen de {month}/{year}</h1>
      <div className="mb-4 flex gap-2">
        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i).map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {summaries.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {summaries.map(item => (
            <Link
              to={`/category/${item.expenseCategory.id}?year=${year}&month=${month}`}
              key={item.expenseCategory.id}
              className="block border rounded p-4 hover:shadow"
            >
              <h2 className="font-semibold">{item.expenseCategory.name}</h2>
              <div className="mt-2 text-sm text-gray-500">Total: {formatCurrency(item.amount)}</div>
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
