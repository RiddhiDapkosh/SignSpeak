-- Create detection_history table
CREATE TABLE IF NOT EXISTS detection_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  detected_sign TEXT NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE detection_history ENABLE ROW LEVEL SECURITY;

-- Create policies for detection_history
CREATE POLICY "select_own_detection_history" ON detection_history FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_detection_history" ON detection_history FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_detection_history" ON detection_history FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_detection_history_user_id ON detection_history(user_id);
CREATE INDEX IF NOT EXISTS idx_detection_history_timestamp ON detection_history(timestamp DESC);