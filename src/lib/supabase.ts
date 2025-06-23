import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserProfile {
  id: string
  email: string
  full_name: string
  skin_type?: 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal'
  skin_concerns?: string[]
  age_range?: string
  created_at: string
  updated_at: string
}

export interface SkinAnalysis {
  id: string
  user_id: string
  analysis_date: string
  skin_type: string
  concerns: string[]
  recommendations: {
    products: string[]
    treatments: string[]
    home_remedies: string[]
    doctor_consultation: boolean
  }
  confidence_score: number
}

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  image_url: string
  description: string
  rating: number
  skin_types: string[]
  ingredients: string[]
}