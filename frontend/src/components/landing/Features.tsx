import { motion } from 'framer-motion'
import { Camera, Zap, Globe, Volume2, History, ChartBar as BarChart3, Shield, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const features = [
  {
    icon: Camera,
    title: 'Real-Time Detection',
    description: 'Detect ASL hand gestures instantly using advanced AI and MediaPipe technology.',
    gradient: 'from-purple-500 to-primary-500',
  },
  {
    icon: Zap,
    title: 'Instant Translation',
    description: 'Convert detected signs to text in milliseconds with high accuracy.',
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Translate into English, Hindi, and Marathi with native script support.',
    gradient: 'from-accent-500 to-purple-500',
  },
  {
    icon: Volume2,
    title: 'Text-to-Speech',
    description: 'Convert translated text to natural speech in multiple languages.',
    gradient: 'from-purple-500 to-primary-500',
  },
  {
    icon: History,
    title: 'History Tracking',
    description: 'Keep track of all your translations and access them anytime.',
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'View your progress with detailed statistics and charts.',
    gradient: 'from-accent-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure with end-to-end encryption and RLS policies.',
    gradient: 'from-purple-500 to-primary-500',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Accuracy',
    description: 'Powered by TensorFlow for 98%+ recognition accuracy.',
    gradient: 'from-primary-500 to-accent-500',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-purple-600 to-primary-500 bg-clip-text text-transparent">
              Seamless Communication
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to break communication barriers and connect with the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 border-0 bg-gray-50 dark:bg-gray-800/50">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
