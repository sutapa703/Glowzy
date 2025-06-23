import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Calendar, Edit, Save, Camera, History, Heart, ShoppingBag } from 'lucide-react'

export default function Profile() {
  const { profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    skin_type: profile?.skin_type || '',
    skin_concerns: profile?.skin_concerns || [],
    age_range: profile?.age_range || ''
  })

  const skinTypes = ['oily', 'dry', 'combination', 'sensitive', 'normal']
  const skinConcerns = [
    'Acne', 'Dark spots', 'Fine lines', 'Wrinkles', 'Dry patches', 
    'Oily T-zone', 'Large pores', 'Redness', 'Sensitivity', 'Dullness'
  ]
  const ageRanges = ['Under 18', '18-25', '26-35', '36-45', '46-55', '55+']

  const handleSave = async () => {
    const { error } = await updateProfile(formData)
    if (!error) {
      setIsEditing(false)
    }
  }

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      skin_concerns: prev.skin_concerns?.includes(concern)
        ? prev.skin_concerns.filter(c => c !== concern)
        : [...(prev.skin_concerns || []), concern]
    }))
  }

  const recentActivity = [
    { type: 'scan', title: 'Skin Analysis', date: '2 days ago', icon: Camera },
    { type: 'purchase', title: 'Niacinamide Serum', date: '1 week ago', icon: ShoppingBag },
    { type: 'consultation', title: 'Dr. Sarah Johnson', date: '2 weeks ago', icon: User },
    { type: 'tutorial', title: 'Everyday Natural Glow', date: '3 weeks ago', icon: Heart }
  ]

  const stats = [
    { label: 'Scans Completed', value: '12', icon: Camera },
    { label: 'Products Purchased', value: '5', icon: ShoppingBag },
    { label: 'Tutorials Watched', value: '8', icon: Heart },
    { label: 'Consultations', value: '2', icon: User }
  ]

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile?.full_name || 'Your Name'}</h1>
                <p className="text-pink-100">{profile?.email}</p>
                <p className="text-pink-100 text-sm">
                  Member since {new Date(profile?.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800">{profile?.full_name || 'Not set'}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">{profile?.email}</p>
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    {isEditing ? (
                      <select
                        value={formData.age_range}
                        onChange={(e) => setFormData({...formData, age_range: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="">Select age range</option>
                        {ageRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-800">{profile?.age_range || 'Not set'}</p>
                    )}
                  </div>

                  {/* Skin Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skin Type</label>
                    {isEditing ? (
                      <select
                        value={formData.skin_type}
                        onChange={(e) => setFormData({...formData, skin_type: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="">Select skin type</option>
                        {skinTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-800">
                        {profile?.skin_type ? 
                          profile.skin_type.charAt(0).toUpperCase() + profile.skin_type.slice(1) : 
                          'Not set'
                        }
                      </p>
                    )}
                  </div>

                  {/* Skin Concerns */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skin Concerns</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skinConcerns.map(concern => (
                          <label key={concern} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.skin_concerns?.includes(concern) || false}
                              onChange={() => handleConcernToggle(concern)}
                              className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                            />
                            <span className="text-sm text-gray-700">{concern}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile?.skin_concerns?.map(concern => (
                          <span
                            key={concern}
                            className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                          >
                            {concern}
                          </span>
                        )) || <p className="text-gray-500">Not set</p>}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <stat.icon className="w-4 h-4 text-pink-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors duration-200">
                    View Scan History
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                    My Orders
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                    Consultation History
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}