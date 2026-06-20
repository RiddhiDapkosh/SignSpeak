export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
}

export interface DetectionHistory {
  id: string
  user_id: string
  detected_sign: string
  confidence_score: number
  timestamp: string
}

export interface Sentence {
  id: string
  user_id: string
  sentence: string
  translated_english: string
  translated_hindi: string
  translated_marathi: string
  created_at: string
}

export interface SpeechHistory {
  id: string
  user_id: string
  language: 'en' | 'hi' | 'mr'
  audio_text: string
  timestamp: string
}

export interface AnalyticsData {
  id: string
  user_id: string
  total_signs: number
  total_sentences: number
  average_accuracy: number
  date: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    speech_speed: number
    voice_type: string
    confidence_threshold: number
    preferred_language: 'en' | 'hi' | 'mr'
  }
}

export interface PredictionResult {
  sign: string
  confidence: number
  probability: number
}

export interface TranslationResult {
  original: string
  english: string
  hindi: string
  marathi: string
}
