import React, { createContext, useState } from 'react'
import { login, register } from '../api/auth'

interface AuthContextValue {
  token: string | null
  userEmail: string | null
  signIn: (email: string, passwd: string) => Promise<void>
  signUp: (email: string, passwd: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue>(null!)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('email'))

  const signIn = async (email: string, passwd: string) => {
    const res = await login({ email, passwd })
    // Debugging: ver estructura completa de la respuesta JSON
    console.debug('Auth login response:', res.data)

    const raw = res.data as any
    // Soporta { data: {...} } o { result: {...} }
    const lvl1 = raw.data ?? raw.result
    // Anidaciones adicionales, si existieran
    const lvl2 = lvl1?.data ?? lvl1?.result
    const payload = lvl2 ?? lvl1 ?? raw

    const tkn = payload.token ?? payload.accessToken ?? payload.access_token
    if (!tkn) {
      console.error('Login payload missing token:', payload)
      throw new Error('Error al autenticar: no se recibió token del servidor')
    }

    const em = payload.email ?? payload.user?.email ?? email

    setToken(tkn)
    setUserEmail(em)
    localStorage.setItem('token', tkn)
    localStorage.setItem('email', em)
  }

  const signUp = async (email: string, passwd: string) => {
    await register({ email, passwd })
  }

  const signOut = () => {
    setToken(null)
    setUserEmail(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ token, userEmail, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
