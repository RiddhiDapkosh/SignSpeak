import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Camera, Sparkles, Globe, Volume2, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-400/10 dark:bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Sign Language Translation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Break Communication Barriers
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
              with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Translate sign language into text and speech in real time using AI-powered
            hand gesture recognition. Supporting English, Hindi, and Marathi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/camera">
              <Button variant="outline" size="lg" className="gap-2">
                <Camera className="w-4 h-4" />
                Start Translation
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary-500/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
                <div className="bg-gray-900 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-400 text-lg">Camera Preview</p>
                    <p className="text-gray-500 text-sm">Real-time hand gesture recognition</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Camera className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">26</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">ASL Letters</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Real-time</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Speech</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
