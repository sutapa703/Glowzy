/*
  # Create skin analyses table

  1. New Tables
    - `skin_analyses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `analysis_date` (timestamp)
      - `skin_type` (text)
      - `concerns` (text array)
      - `recommendations` (jsonb)
      - `confidence_score` (integer)
      - `image_url` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `skin_analyses` table
    - Add policies for authenticated users to manage their own analyses
*/

CREATE TABLE IF NOT EXISTS skin_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  analysis_date timestamptz DEFAULT now(),
  skin_type text NOT NULL,
  concerns text[] DEFAULT '{}',
  recommendations jsonb NOT NULL DEFAULT '{}',
  confidence_score integer CHECK (confidence_score >= 0 AND confidence_score <= 100),
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skin_analyses ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own analyses
CREATE POLICY "Users can read own analyses"
  ON skin_analyses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own analyses
CREATE POLICY "Users can insert own analyses"
  ON skin_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own analyses
CREATE POLICY "Users can update own analyses"
  ON skin_analyses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own analyses
CREATE POLICY "Users can delete own analyses"
  ON skin_analyses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);