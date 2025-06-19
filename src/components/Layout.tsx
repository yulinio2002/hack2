import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const logout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <>
      <header className="bg-gray-800 text-white px-4 py-2 flex justify-between">
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Resumen</Link>
          <Link to="/goals" className="hover:underline">Metas</Link>
        </nav>
        <button onClick={logout} className="hover:underline text-sm">Salir</button>
      </header>
      <main className="p-4">{children}</main>
    </>
  )
}

export default Layout
