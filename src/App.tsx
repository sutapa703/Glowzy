import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import AuthForm from './components/AuthForm'
import Dashboard from './pages/Dashboard'
import SkinScan from './pages/SkinScan'
import Shop from './pages/Shop'
import MakeupGuide from './pages/MakeupGuide'
import Consultation from './pages/Consultation'
import Profile from './pages/Profile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <ProtectedRoute>
            <Layout>
              <SkinScan />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Layout>
              <Shop />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/makeup"
        element={
          <ProtectedRoute>
            <Layout>
              <MakeupGuide />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/consult"
        element={
          <ProtectedRoute>
            <Layout>
              <Consultation />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App