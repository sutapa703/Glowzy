import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Home, 
  Camera, 
  ShoppingBag, 
  Palette, 
  Stethoscope, 
  User, 
  LogOut,
  Sparkles
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Scan', icon: Camera, path: '/scan' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Makeup', icon: Palette, path: '/makeup' },
    { name: 'Consult', icon: Stethoscope, path: '/consult' },
    { name: 'Profile', icon: User, path: '/profile' },
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Beauty Ease
              </span>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-pink-100 md:hidden">
        <div className="flex justify-around items-center py-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <nav className="fixed left-0 top-16 h-full w-64 bg-white/50 backdrop-blur-sm border-r border-pink-100 hidden md:block">
        <div className="p-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content Area Adjustment for Desktop */}
      <div className="md:ml-64"></div>
    </div>
  )
}