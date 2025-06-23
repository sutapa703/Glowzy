import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Camera, 
  ShoppingBag, 
  Palette, 
  Stethoscope, 
  TrendingUp,
  Star,
  Heart,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  const quickActions = [
    {
      title: 'Scan Your Skin',
      description: 'Get instant skin analysis with AI',
      icon: Camera,
      color: 'from-pink-500 to-rose-500',
      path: '/scan'
    },
    {
      title: 'Shop Products',
      description: 'Personalized beauty recommendations',
      icon: ShoppingBag,
      color: 'from-purple-500 to-indigo-500',
      path: '/shop'
    },
    {
      title: 'Makeup Guide',
      description: 'Tutorials for your skin type',
      icon: Palette,
      color: 'from-orange-500 to-pink-500',
      path: '/makeup'
    },
    {
      title: 'Consult Doctor',
      description: 'Professional skincare advice',
      icon: Stethoscope,
      color: 'from-teal-500 to-cyan-500',
      path: '/consult'
    }
  ]

  const todaysTips = [
    {
      title: 'Morning Skincare Routine',
      tip: 'Start with a gentle cleanser, followed by vitamin C serum and SPF 30+',
      icon: '🌅'
    },
    {
      title: 'Hydration Reminder',
      tip: 'Drink at least 8 glasses of water for glowing skin from within',
      icon: '💧'
    },
    {
      title: 'Sleep Beauty',
      tip: 'Get 7-8 hours of sleep for natural skin repair and regeneration',
      icon: '😴'
    }
  ]

  const recentAnalysis = {
    date: '2025-01-07',
    skinType: 'Combination',
    concerns: ['Mild acne', 'Dry patches'],
    score: 78
  }

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Beautiful'}! ✨
            </h1>
            <p className="text-pink-100 text-lg">
              Ready to enhance your natural beauty today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
        </div>
        
        {recentAnalysis && (
          <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Latest Skin Analysis</p>
                <p className="text-white font-semibold">
                  {recentAnalysis.skinType} skin • Score: {recentAnalysis.score}/100
                </p>
              </div>
              <button 
                onClick={() => navigate('/scan')}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Beauty Tips */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Beauty Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todaysTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-2xl mb-3">{tip.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-pink-100 rounded-full mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-pink-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <p className="text-gray-600 text-sm">Scans Done</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2">
            <ShoppingBag className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">5</p>
          <p className="text-gray-600 text-sm">Products Bought</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
            <Star className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">8</p>
          <p className="text-gray-600 text-sm">Tutorials Watched</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full mx-auto mb-2">
            <Heart className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">92%</p>
          <p className="text-gray-600 text-sm">Skin Health</p>
        </div>
      </div>
    </div>
  )
}