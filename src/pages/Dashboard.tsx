import React, { useState, useEffect } from 'react'
import { useExpensesSummary, useDeleteExpense } from '../hooks/useExpensesSummary'
import type { ExpenseSummary } from '../types/expenseSummary'
import Card from '../components/Card'

const Dashboard: React.FC = () => {
  
  const { data, isLoading, isError, refetch } = useExpensesSummary()
  const deleteExpenseMutation = useDeleteExpense() // Llamar el hook en el nivel superior
  const _summaries: ExpenseSummary[] = data?.data ?? [] 
  const [summaries, setSummaries] = useState<ExpenseSummary[]>(_summaries)

  // Actualizar el estado local cuando cambien los datos del servidor
  useEffect(() => {
    setSummaries(_summaries)
    console.log("_sum", _summaries)
    console.log("summaries", _summaries) // Usar _summaries aquí ya que summaries aún no se ha actualizado
  }, [_summaries]) // Dependencia en _summaries, no array vacío

  async function deleteFunction(id: number) {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este resumen?')
    if (!confirmDelete) return
    
    try {
      // Si useDeleteExpense devuelve una mutación
      await deleteExpenseMutation.mutateAsync(id)
      
      // Opción 1: Refrescar los datos del servidor
      await refetch()
      
      // Opción 2: Actualizar el estado local directamente (más rápido)
      // setSummaries(prev => prev.filter(item => item.id !== id))
      
      console.log(`Eliminado`)
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  if (isLoading) {
    return <div className="p-4">Cargando resumen...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error al cargar el resumen.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Resumen de Gastos</h1>
      {summaries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map(item => (
            <Card key={item.id} item={item} deleteFunction={deleteFunction}/>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No hay datos</div>
      )}
    </div>
  )
}

export default Dashboard