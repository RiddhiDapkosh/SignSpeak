-- Create sentences table
CREATE TABLE IF NOT EXISTS sentences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sentence TEXT NOT NULL,
  translated_english TEXT,
  translated_hindi TEXT,
  translated_marathi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;

-- Create policies for sentences
CREATE POLICY "select_own_sentences" ON sentences FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_sentences" ON sentences FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_sentences" ON sentences FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sentences_user_id ON sentences(user_id);
CREATE INDEX IF NOT EXISTS idx_sentences_created_at ON sentences(created_at DESC);