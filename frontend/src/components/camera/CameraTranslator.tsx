import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCamera, usePrediction, useTranslation, useSpeechSynthesis } from '@/hooks'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Select } from '@/components/ui/Select'
import {
  Camera,
  CameraOff,
  Hand,
  Volume2,
  Square,
  Play,
  Pause,
  Trash2,
  Globe,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/hooks/useSpeechSynthesis'

const CONFIDENCE_THRESHOLD = 80

export function CameraTranslator() {
  const { videoRef, canvasRef, startCamera, stopCamera, captureFrame } = useCamera()
  const { prediction, isDetecting, startDetection, stopDetection } = usePrediction()
  const { getTranslation } = useTranslation()
  const { speak, stop: stopSpeech, isSpeaking, loadVoices } = useSpeechSynthesis()

  const [cameraActive, setCameraActive] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [currentSentence, setCurrentSentence] = useState('')
  const [wordHistory, setWordHistory] = useState<string[]>([])
  const [sentenceHistory, setSentenceHistory] = useState<string[]>([])
  const [translation, setTranslation] = useState<{ english: string; hindi: string; marathi: string } | null>(null)
  const [speechLanguage, setSpeechLanguage] = useState<SupportedLanguage>('en')
  const [speechRate, setSpeechRate] = useState(1)
  const [lastLetter, setLastLetter] = useState('')
  const [letterCount, setLetterCount] = useState(0)

  useEffect(() => {
    loadVoices()
  }, [loadVoices])

  const handlePrediction = useCallback((pred: { sign: string; confidence: number }) => {
    if (pred.confidence >= CONFIDENCE_THRESHOLD && pred.sign !== lastLetter) {
      setCurrentWord(prev => prev + pred.sign)
      setLastLetter(pred.sign)
      setLetterCount(0)
    } else if (pred.sign === lastLetter) {
      setLetterCount(prev => prev + 1)

      if (letterCount >= 2 && currentWord.length > 0) {
        const newWord = currentWord
        setWordHistory(prev => [...prev, newWord])
        setCurrentSentence(prev => prev + (prev ? ' ' : '') + newWord)
        setCurrentWord('')
        setLastLetter('')
        setLetterCount(0)
      }
    }
  }, [lastLetter, letterCount, currentWord])

  const handleStartCamera = async () => {
    const success = await startCamera()
    if (success) {
      setCameraActive(true)
      startDetection(handlePrediction)
    }
  }

  const handleStopCamera = () => {
    stopCamera()
    stopDetection()
    setCameraActive(false)
  }

  const handleTranslate = () => {
    if (currentSentence || currentWord) {
      const text = currentSentence + (currentSentence && currentWord ? ' ' : '') + currentWord
      const result = getTranslation(text)
      setTranslation(result)
    }
  }

  const handleSpeak = (text: string, lang: SupportedLanguage) => {
    stopSpeech()
    speak(text, lang, speechRate)
  }

  const handleClear = () => {
    setCurrentWord('')
    setCurrentSentence('')
    setTranslation(null)
    setLastLetter('')
    setLetterCount(0)
  }

  const handleNewSentence = () => {
    if (currentSentence) {
      setSentenceHistory(prev => [...prev, currentSentence])
      setCurrentSentence('')
      setCurrentWord('')
      setTranslation(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Live Camera
                </CardTitle>
                <div className="flex gap-2">
                  {cameraActive ? (
                    <Button variant="outline" onClick={handleStopCamera} className="gap-2">
                      <CameraOff className="w-4 h-4" />
                      Stop
                    </Button>
                  ) : (
                    <Button onClick={handleStartCamera} className="gap-2">
                      <Camera className="w-4 h-4" />
                      Start Camera
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    'w-full h-full object-cover transform scale-x-[-1]',
                    !cameraActive && 'hidden'
                  )}
                />
                <canvas ref={canvasRef} className="hidden" />

                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-400 text-lg mb-2">Camera Preview</p>
                      <p className="text-gray-500 text-sm">Click "Start Camera" to begin</p>
                    </div>
                  </div>
                )}

                {cameraActive && prediction && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {prediction.probabilities.map((p, i) => (
                        <div
                          key={i}
                          className={cn(
                            'p-2 rounded-lg text-center',
                            i === 0
                              ? 'bg-purple-500/80 backdrop-blur-sm'
                              : 'bg-gray-800/80 backdrop-blur-sm'
                          )}
                        >
                          <p className={cn(
                            'text-2xl font-bold',
                            i === 0 ? 'text-white' : 'text-gray-300'
                          )}>
                            {p.sign}
                          </p>
                          <p className={cn(
                            'text-xs',
                            i === 0 ? 'text-white/80' : 'text-gray-400'
                          )}>
                            {p.prob.toFixed(1)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {cameraActive && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                      Live
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand className="w-5 h-5 text-purple-600" />
                Current Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        key={prediction.sign}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
                      >
                        <span className="text-5xl font-bold text-white">
                          {prediction.sign}
                        </span>
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Sign</p>
                        <p className="text-xs text-gray-400">Confidence: {prediction.confidence.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={prediction.confidence} className="w-32" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Start camera to begin detection
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Word & Sentence Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                  Current Word
                </label>
                <div className="min-h-[48px] px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentWord}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-mono font-semibold text-purple-700 dark:text-purple-300"
                    >
                      {currentWord || '-'}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                  Current Sentence
                </label>
                <div className="min-h-[72px] px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <p className="text-base text-gray-900 dark:text-white">
                    {currentSentence || '-'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleClear} variant="outline" className="flex-1 gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
                <Button onClick={handleNewSentence} variant="secondary" className="flex-1 gap-2">
                  <Square className="w-4 h-4" />
                  New Sentence
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleTranslate} className="w-full gap-2">
                <Globe className="w-4 h-4" />
                Translate
              </Button>

              {translation && (
                <Tabs defaultValue="english" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="english" className="flex-1">EN</TabsTrigger>
                    <TabsTrigger value="hindi" className="flex-1">हिंदी</TabsTrigger>
                    <TabsTrigger value="marathi" className="flex-1">मराठी</TabsTrigger>
                  </TabsList>

                  <TabsContent value="english" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-gray-900 dark:text-white">{translation.english}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="hindi" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-gray-900 dark:text-white">{translation.hindi}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="marathi" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-gray-900 dark:text-white">{translation.marathi}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-600" />
                Speech Synthesis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                    Language
                  </label>
                  <Select
                    value={speechLanguage}
                    onChange={(e) => setSpeechLanguage(e.target.value as SupportedLanguage)}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                    Speed
                  </label>
                  <Select
                    value={speechRate.toString()}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSpeak(translation?.english || currentSentence || currentWord, speechLanguage)}
                  disabled={!currentSentence && !currentWord && !translation}
                  className="flex-1 gap-2"
                >
                  {isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isSpeaking ? 'Speaking...' : 'Speak'}
                </Button>
                <Button
                  onClick={stopSpeech}
                  variant="outline"
                  disabled={!isSpeaking}
                  className="gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </div>

              {translation && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpeak(translation.english, 'en')}
                    className="w-full"
                  >
                    EN
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpeak(translation.hindi, 'hi')}
                    className="w-full"
                  >
                    हिंदी
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpeak(translation.marathi, 'mr')}
                    className="w-full"
                  >
                    मराठी
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {wordHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Word History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {wordHistory.slice(-10).map((word, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
