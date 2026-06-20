import { useState, useCallback } from 'react'

export type SupportedLanguage = 'en' | 'hi' | 'mr'

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices()
    setVoices(availableVoices)
  }, [])

  const speak = useCallback((text: string, language: SupportedLanguage = 'en', rate: number = 1) => {
    if (!text) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1

    const langMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      mr: 'mr-IN'
    }
    utterance.lang = langMap[language]

    const voice = voices.find(v => v.lang.startsWith(langMap[language].split('-')[0]))
    if (voice) utterance.voice = voice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [voices])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis.resume()
  }, [])

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    loadVoices,
    voices
  }
}
