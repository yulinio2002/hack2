import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/Dashboard'
import CategoryDetail from '../pages/CategoryDetail.tsx'
import Goals from '../pages/Goals'

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/category/:id" element={<PrivateRoute><CategoryDetail/></PrivateRoute>} />
      <Route path="/goals" element={<PrivateRoute><Goals/></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
)
