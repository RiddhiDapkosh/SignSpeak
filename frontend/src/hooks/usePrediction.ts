import { useState, useCallback, useRef, useEffect } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface Prediction {
  sign: string
  confidence: number
  probabilities: { sign: string; prob: number }[]
}

export function usePrediction() {
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generatePrediction = useCallback((): Prediction => {
    const sign = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
    const confidence = 85 + Math.random() * 14

    const probabilities = ALPHABET.split('').map(s => ({
      sign: s,
      prob: s === sign ? confidence : Math.random() * (100 - confidence) / 25
    })).sort((a, b) => b.prob - a.prob).slice(0, 5)

    return { sign, confidence, probabilities }
  }, [])

  const startDetection = useCallback((onPredict: (pred: Prediction) => void) => {
    setIsDetecting(true)
    intervalRef.current = setInterval(() => {
      const pred = generatePrediction()
      setPrediction(pred)
      onPredict(pred)
    }, 1500)
  }, [generatePrediction])

  const stopDetection = useCallback(() => {
    setIsDetecting(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPrediction(null)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { prediction, isDetecting, startDetection, stopDetection, generatePrediction }
}
