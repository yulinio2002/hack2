import React, { useState } from 'react'
import { useGoals, useCreateGoal, useUpdateGoal } from '../hooks/useGoals'
import type { Goal } from '../types/goal'

export default function Goals() {
  const { data, isLoading, isError } = useGoals()
  const goals: Goal[] = data?.data ?? []
  const createMutation = useCreateGoal()
  const updateMutation = useUpdateGoal()
  const [amount, setAmount] = useState<number>(0)
  const now = new Date()

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    await createMutation.mutateAsync({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      amount,
    })
    setAmount(0)
  }

  const changeAmount = (id: number, newAmount: number) => {
    updateMutation.mutate({ id, data: { amount: newAmount } })
  }

  if (isLoading) return <div>Cargando metas…</div>
  if (isError) return <div className="text-red-600">Error al cargar metas.</div>

  return (
    <div>
      <h1 className="text-xl mb-4">Metas de ahorro</h1>
      <form onSubmit={addGoal} className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="S/. meta"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border rounded px-2 py-1 flex-1"
          min={0}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          + Añadir
        </button>
      </form>
      <ul className="space-y-2">
        {goals.map(g => (
          <li key={g.id} className="border p-2 flex items-center space-x-4">
            <span className="w-24">{g.year}/{g.month}</span>
            <input
              type="number"
              defaultValue={g.amount}
              onBlur={e => changeAmount(g.id, Number(e.target.value))}
              className="border px-2 py-1 rounded flex-1"
              min={0}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
