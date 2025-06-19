import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { signIn } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
    nav('/')
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block mb-2 w-full rounded border px-2 py-1"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block mb-4 w-full rounded border px-2 py-1"
        required
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 text-white py-2 transition-colors active:bg-blue-800 hover:bg-blue-700"
      >
        Entrar
      </button>
      <p className="mt-2 text-sm text-center">
        ¿No tienes cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
      </p>
    </form>
  )
}
