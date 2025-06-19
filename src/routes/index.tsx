import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/Dashboard'
import CategoryDetail from '../pages/CategoryDetail'
import Goals from '../pages/Goals'
import Layout from '../components/Layout'

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/category/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CategoryDetail />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/goals"
        element={
          <PrivateRoute>
            <Layout>
              <Goals />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
