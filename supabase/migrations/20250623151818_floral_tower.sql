/*
  # Create products table for beauty products

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `category` (text)
      - `price` (decimal)
      - `original_price` (decimal, optional for sales)
      - `image_url` (text)
      - `description` (text)
      - `rating` (decimal)
      - `review_count` (integer)
      - `skin_types` (text array)
      - `ingredients` (text array)
      - `is_featured` (boolean)
      - `is_available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for all authenticated users to read products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  original_price decimal(10,2) CHECK (original_price >= 0),
  image_url text NOT NULL,
  description text NOT NULL DEFAULT '',
  rating decimal(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0 CHECK (review_count >= 0),
  skin_types text[] DEFAULT '{}',
  ingredients text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for all authenticated users to read products
CREATE POLICY "Authenticated users can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (is_available = true);

-- Insert sample products
INSERT INTO products (name, brand, category, price, original_price, image_url, description, rating, review_count, skin_types, ingredients, is_featured) VALUES
('Gentle Foaming Cleanser', 'BeautyLab', 'cleanser', 24.99, 29.99, 'https://images.pexels.com/photos/7428100/pexels-photo-7428100.jpeg?auto=compress&cs=tinysrgb&w=300', 'A gentle foaming cleanser suitable for all skin types', 4.8, 245, ARRAY['all'], ARRAY['Glycerin', 'Sodium Cocoyl Glutamate', 'Chamomile Extract'], true),
('Niacinamide 10% Serum', 'SkinScience', 'serum', 18.99, NULL, 'https://images.pexels.com/photos/7428092/pexels-photo-7428092.jpeg?auto=compress&cs=tinysrgb&w=300', 'High-strength niacinamide serum for oily and combination skin', 4.6, 189, ARRAY['oily', 'combination'], ARRAY['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid'], true),
('Hyaluronic Acid Moisturizer', 'HydraGlow', 'moisturizer', 32.99, NULL, 'https://images.pexels.com/photos/7428095/pexels-photo-7428095.jpeg?auto=compress&cs=tinysrgb&w=300', 'Intensive hydrating moisturizer with multiple types of hyaluronic acid', 4.9, 312, ARRAY['dry', 'normal'], ARRAY['Hyaluronic Acid', 'Ceramides', 'Squalane'], true),
('Vitamin C Brightening Serum', 'GlowUp', 'serum', 45.99, 55.99, 'https://images.pexels.com/photos/7428089/pexels-photo-7428089.jpeg?auto=compress&cs=tinysrgb&w=300', 'Potent vitamin C serum for brightening and anti-aging', 4.7, 156, ARRAY['all'], ARRAY['L-Ascorbic Acid', 'Vitamin E', 'Ferulic Acid'], false),
('SPF 50 Mineral Sunscreen', 'SunSafe', 'sunscreen', 28.99, NULL, 'https://images.pexels.com/photos/7428097/pexels-photo-7428097.jpeg?auto=compress&cs=tinysrgb&w=300', 'Broad-spectrum mineral sunscreen for sensitive skin', 4.5, 203, ARRAY['sensitive', 'all'], ARRAY['Zinc Oxide', 'Titanium Dioxide', 'Aloe Vera'], false),
('Retinol Night Treatment', 'AgeDefense', 'treatment', 52.99, NULL, 'https://images.pexels.com/photos/7428093/pexels-photo-7428093.jpeg?auto=compress&cs=tinysrgb&w=300', 'Advanced retinol treatment for anti-aging and skin renewal', 4.4, 89, ARRAY['normal', 'combination'], ARRAY['Retinol', 'Peptides', 'Bakuchiol'], false),
('Illuminating Foundation', 'PerfectBase', 'makeup', 39.99, NULL, 'https://images.pexels.com/photos/7428101/pexels-photo-7428101.jpeg?auto=compress&cs=tinysrgb&w=300', 'Medium coverage foundation with natural finish', 4.6, 167, ARRAY['all'], ARRAY['Hyaluronic Acid', 'SPF 15', 'Antioxidants'], false),
('Soothing Face Mask', 'CalmSkin', 'treatment', 15.99, 19.99, 'https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=300', 'Weekly soothing mask for sensitive and irritated skin', 4.8, 298, ARRAY['sensitive', 'dry'], ARRAY['Oatmeal', 'Honey', 'Calendula Extract'], false);