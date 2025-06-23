import React, { useState } from 'react'
import { Search, Filter, Star, Heart, ShoppingCart, Eye } from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  skinTypes: string[]
  isWishlisted: boolean
  isOnSale?: boolean
}

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSkinType, setSelectedSkinType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  const categories = [
    'all', 'cleanser', 'moisturizer', 'serum', 'sunscreen', 'treatment', 'makeup'
  ]

  const skinTypes = [
    'all', 'oily', 'dry', 'combination', 'sensitive', 'normal'
  ]

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Gentle Foaming Cleanser',
      brand: 'BeautyLab',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://images.pexels.com/photos/7428100/pexels-photo-7428100.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      reviews: 245,
      category: 'cleanser',
      skinTypes: ['all'],
      isWishlisted: false,
      isOnSale: true
    },
    {
      id: '2',
      name: 'Niacinamide 10% Serum',
      brand: 'SkinScience',
      price: 18.99,
      image: 'https://images.pexels.com/photos/7428092/pexels-photo-7428092.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      reviews: 189,
      category: 'serum',
      skinTypes: ['oily', 'combination'],
      isWishlisted: false
    },
    {
      id: '3',
      name: 'Hyaluronic Acid Moisturizer',
      brand: 'HydraGlow',
      price: 32.99,
      image: 'https://images.pexels.com/photos/7428095/pexels-photo-7428095.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9,
      reviews: 312,
      category: 'moisturizer',
      skinTypes: ['dry', 'normal'],
      isWishlisted: true
    },
    {
      id: '4',
      name: 'Vitamin C Brightening Serum',
      brand: 'GlowUp',
      price: 45.99,
      originalPrice: 55.99,
      image: 'https://images.pexels.com/photos/7428089/pexels-photo-7428089.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7,
      reviews: 156,
      category: 'serum',
      skinTypes: ['all'],
      isWishlisted: false,
      isOnSale: true
    },
    {
      id: '5',
      name: 'SPF 50 Mineral Sunscreen',
      brand: 'SunSafe',
      price: 28.99,
      image: 'https://images.pexels.com/photos/7428097/pexels-photo-7428097.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.5,
      reviews: 203,
      category: 'sunscreen',
      skinTypes: ['sensitive', 'all'],
      isWishlisted: false
    },
    {
      id: '6',
      name: 'Retinol Night Treatment',
      brand: 'AgeDefense',
      price: 52.99,
      image: 'https://images.pexels.com/photos/7428093/pexels-photo-7428093.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.4,
      reviews: 89,
      category: 'treatment',
      skinTypes: ['normal', 'combination'],
      isWishlisted: false
    },
    {
      id: '7',
      name: 'Illuminating Foundation',
      brand: 'PerfectBase',
      price: 39.99,
      image: 'https://images.pexels.com/photos/7428101/pexels-photo-7428101.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      reviews: 167,
      category: 'makeup',
      skinTypes: ['all'],
      isWishlisted: true
    },
    {
      id: '8',
      name: 'Soothing Face Mask',
      brand: 'CalmSkin',
      price: 15.99,
      originalPrice: 19.99,
      image: 'https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      reviews: 298,
      category: 'treatment',
      skinTypes: ['sensitive', 'dry'],
      isWishlisted: false,
      isOnSale: true
    }
  ])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSkinType = selectedSkinType === 'all' || 
                           product.skinTypes.includes(selectedSkinType) ||
                           product.skinTypes.includes('all')
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesSkinType && matchesPrice
  })

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId])
  }

  return (
    <div className="pb-20 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Beauty Shop
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
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
                      {category.charAt(0).toUpperCase() + category.slice(1)}
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
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Sale Badge */}
              {product.isOnSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Sale
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
              >
                <Heart 
                  className={`w-4 h-4 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                />
              </button>

              {/* Quick View */}
              <button className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Quick View</span>
                </div>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-gray-800">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Skin Types */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.skinTypes.slice(0, 2).map(type => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product.id)}
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}