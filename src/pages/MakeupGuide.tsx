import React, { useState } from 'react'
import { Play, Clock, Eye, Palette, Star, BookOpen } from 'lucide-react'

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  skinTypes: string[]
  thumbnail: string
  rating: number
  views: number
  category: string
}

export default function MakeupGuide() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSkinType, setSelectedSkinType] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = [
    'all', 'everyday', 'evening', 'special-occasion', 'natural', 'glam'
  ]

  const skinTypes = [
    'all', 'oily', 'dry', 'combination', 'sensitive', 'normal'
  ]

  const difficulties = [
    'all', 'Beginner', 'Intermediate', 'Advanced'
  ]

  const [tutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Everyday Natural Glow',
      description: 'Perfect for daily wear with minimal products',
      duration: '8 min',
      difficulty: 'Beginner',
      skinTypes: ['all'],
      thumbnail: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      views: 1250,
      category: 'everyday'
    },
    {
      id: '2',
      title: 'Smoky Eye for Oily Skin',
      description: 'Long-lasting smoky eye technique for oily skin types',
      duration: '15 min',
      difficulty: 'Intermediate',
      skinTypes: ['oily', 'combination'],
      thumbnail: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      views: 890,
      category: 'evening'
    },
    {
      id: '3',
      title: 'Bridal Makeup Masterclass',
      description: 'Complete bridal look with contouring and highlighting',
      duration: '25 min',
      difficulty: 'Advanced',
      skinTypes: ['all'],
      thumbnail: 'https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      views: 2100,
      category: 'special-occasion'
    },
    {
      id: '4',
      title: 'No-Makeup Makeup Look',
      description: 'Enhance natural beauty with subtle techniques',
      duration: '6 min',
      difficulty: 'Beginner',
      skinTypes: ['all'],
      thumbnail: 'https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      views: 1680,
      category: 'natural'
    },
    {
      id: '5',
      title: 'Sensitive Skin Foundation',
      description: 'Gentle application techniques for sensitive skin',
      duration: '10 min',
      difficulty: 'Beginner',
      skinTypes: ['sensitive'],
      thumbnail: 'https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      views: 745,
      category: 'everyday'
    },
    {
      id: '6',
      title: 'Glamorous Party Look',
      description: 'Bold and dramatic makeup for special events',
      duration: '20 min',
      difficulty: 'Advanced',
      skinTypes: ['all'],
      thumbnail: 'https://images.pexels.com/photos/3373742/pexels-photo-3373742.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      views: 1420,
      category: 'glam'
    }
  ])

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    const matchesSkinType = selectedSkinType === 'all' || 
                           tutorial.skinTypes.includes(selectedSkinType) ||
                           tutorial.skinTypes.includes('all')
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty
    
    return matchesCategory && matchesSkinType && matchesDifficulty
  })

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-600',
    'Intermediate': 'bg-yellow-100 text-yellow-600',
    'Advanced': 'bg-red-100 text-red-600'
  }

  return (
    <div className="pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Makeup Tutorials & Guides
        </h1>
        <p className="text-gray-600 text-lg">
          Learn professional makeup techniques tailored to your skin type
        </p>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Master Your Makeup Skills
            </h2>
            <p className="text-pink-100 mb-6">
              From beginner basics to advanced techniques, our tutorials are designed to help you create stunning looks that complement your unique features and skin type.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>50+ Tutorials</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>HD Video Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Expert Artists</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
              <Palette className="w-24 h-24 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Skin Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skin Type</label>
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {skinTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Skin Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map(tutorial => (
          <div key={tutorial.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-800 ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{tutorial.duration}</span>
              </div>

              {/* Difficulty Badge */}
              <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium ${difficultyColors[tutorial.difficulty]}`}>
                {tutorial.difficulty}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>

              {/* Rating and Views */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(tutorial.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{tutorial.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{tutorial.views.toLocaleString()}</span>
                </div>
              </div>

              {/* Skin Types */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tutorial.skinTypes.slice(0, 3).map(type => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Watch Button */}
              <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Tutorial</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No tutorials found</h3>
          <p className="text-gray-600">Try adjusting your filter criteria</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-12 bg-pink-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pro Tips for Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Start with Clean Skin</h4>
              <p className="text-gray-600 text-sm">Always begin with freshly cleansed and moisturized skin for best results.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Practice Makes Perfect</h4>
              <p className="text-gray-600 text-sm">Don't worry if you don't get it right the first time - keep practicing!</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Quality Tools Matter</h4>
              <p className="text-gray-600 text-sm">Invest in good brushes and tools for better application and blending.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Less is More</h4>
              <p className="text-gray-600 text-sm">Build up gradually - you can always add more, but it's harder to take away.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}