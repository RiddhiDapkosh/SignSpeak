import { motion } from 'framer-motion'
import { Camera, Hand, Type, Globe, Volume2 } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    step: '01',
    title: 'Start Camera',
    description: 'Open the camera translator and allow camera access.',
  },
  {
    icon: Hand,
    step: '02',
    title: 'Show Signs',
    description: 'Position your hand and make ASL alphabet gestures.',
  },
  {
    icon: Type,
    step: '03',
    title: 'AI Recognition',
    description: 'Our AI detects hand landmarks and predicts the letter.',
  },
  {
    icon: Globe,
    step: '04',
    title: 'Translation',
    description: 'Build words and sentences, then translate to multiple languages.',
  },
  {
    icon: Volume2,
    step: '05',
    title: 'Speech Output',
    description: 'Convert translations to natural speech instantly.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start translating sign language in just a few simple steps.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-primary-500 to-accent-500 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative z-10 shadow-lg">
                  <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-primary-500 text-white text-sm font-medium">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mt-2">
                    <step.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
