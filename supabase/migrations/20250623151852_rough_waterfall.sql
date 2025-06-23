/*
  # Create consultations table for doctor appointments

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `doctor_name` (text)
      - `doctor_specialization` (text)
      - `consultation_type` (text)
      - `appointment_date` (timestamp)
      - `appointment_time` (text)
      - `status` (text)
      - `price` (decimal)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policies for users to manage their own consultations
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  doctor_specialization text NOT NULL,
  consultation_type text NOT NULL CHECK (consultation_type IN ('video', 'phone', 'chat')),
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own consultations
CREATE POLICY "Users can read own consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own consultations
CREATE POLICY "Users can insert own consultations"
  ON consultations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own consultations
CREATE POLICY "Users can update own consultations"
  ON consultations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own consultations
CREATE POLICY "Users can delete own consultations"
  ON consultations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);