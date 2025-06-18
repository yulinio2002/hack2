// src/pages/Dashboard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useExpensesGetCategory } from '../hooks/useExpensesSummary'
import type { ExpenseCategory } from '../types/expenseCategory'
const Dashboard: React.FC = () => {
  // Obtener las categorías de gastos
  const {
    data: categoriesResponse,
    isLoading,
    isError,
  } = useExpensesGetCategory()

  // Los datos reales están en categoriesResponse?.data
  const categories: ExpenseCategory[] = categoriesResponse?.data ?? []

  if (isLoading) {
    return <div className="p-4">Cargando categorías de gastos...</div>
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Error al cargar las categorías. Intenta recargar.
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Categorías de Gastos</h1>

      {/* Grid de Categorías */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="text-lg font-medium text-gray-700">
                {category.name}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Ver detalles →
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No hay categorías registradas
        </div>
      )}
    </div>
  )
}

export default Dashboard