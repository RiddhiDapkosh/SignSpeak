-- Create speech_history table
CREATE TABLE IF NOT EXISTS speech_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'hi', 'mr')),
  audio_text TEXT NOT NULL,
  speed DECIMAL(3,2) DEFAULT 1.0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE speech_history ENABLE ROW LEVEL SECURITY;

-- Create policies for speech_history
CREATE POLICY "select_own_speech_history" ON speech_history FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_speech_history" ON speech_history FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_speech_history" ON speech_history FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_speech_history_user_id ON speech_history(user_id);
CREATE INDEX IF NOT EXISTS idx_speech_history_timestamp ON speech_history(timestamp DESC);