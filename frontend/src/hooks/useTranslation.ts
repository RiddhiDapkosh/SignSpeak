import { useState, useCallback } from 'react'

export function useTranslation() {
  const [translating, setTranslating] = useState(false)

  const translationMap: Record<string, { hindi: string; marathi: string }> = {
    'hello': { hindi: 'नमस्ते', marathi: 'नमस्कार' },
    'thank you': { hindi: 'धन्यवाद', marathi: 'धन्यवाद' },
    'good morning': { hindi: 'सुप्रभात', marathi: 'शुभ सकाळ' },
    'good night': { hindi: 'शुभ रात्रि', marathi: 'शुभ रात्री' },
    'yes': { hindi: 'हाँ', marathi: 'हो' },
    'no': { hindi: 'नहीं', marathi: 'नाही' },
    'please': { hindi: 'कृपया', marathi: 'कृपया' },
    'sorry': { hindi: 'माफ़ करना', marathi: 'माफ़ करा' },
    'welcome': { hindi: 'स्वागत है', marathi: 'स्वागत आहे' },
    'how are you': { hindi: 'आप कैसे हैं?', marathi: 'तू कसा आहेस?' },
  }

  const getTranslation = useCallback((text: string) => {
    setTranslating(true)

    const lowerText = text.toLowerCase().trim()
    const mapped = translationMap[lowerText]

    const result = {
      original: text,
      english: text,
      hindi: mapped?.hindi || transliterateToHindi(text),
      marathi: mapped?.marathi || transliterateToMarathi(text)
    }

    setTranslating(false)
    return result
  }, [])

  return { getTranslation, translating }
}

function transliterateToHindi(text: string): string {
  const charMap: Record<string, string> = {
    'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'द', 'e': 'ए', 'f': 'फ',
    'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज', 'k': 'क', 'l': 'ल',
    'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प', 'q': 'क्यू', 'r': 'र',
    's': 'स', 't': 'त', 'u': 'उ', 'v': 'व', 'w': 'डब्ल्यू', 'x': 'एक्स',
    'y': 'य', 'z': 'ज़', ' ': ' '
  }

  return text.toLowerCase().split('').map(c => charMap[c] || c).join('')
}

function transliterateToMarathi(text: string): string {
  const charMap: Record<string, string> = {
    'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'द', 'e': 'ए', 'f': 'फ',
    'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज', 'k': 'क', 'l': 'ल',
    'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प', 'q': 'क्यू', 'r': 'र',
    's': 'स', 't': 'त', 'u': 'उ', 'v': 'व', 'w': 'डब्ल्यू', 'x': 'एक्स',
    'y': 'य', 'z': 'झ', ' ': ' '
  }

  return text.toLowerCase().split('').map(c => charMap[c] || c).join('')
}
