import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How accurate is the sign language recognition?',
    answer: 'Our AI model achieves 98%+ accuracy for ASL alphabet recognition. We use TensorFlow combined with MediaPipe hand tracking for precise landmark detection.',
  },
  {
    question: 'Which languages are supported for translation?',
    answer: 'Currently, SignSpeak supports English, Hindi, and Marathi. We\'re actively working on adding more languages based on user feedback.',
  },
  {
    question: 'Does the app work offline?',
    answer: 'Camera detection works offline once loaded. Translation and speech synthesis features require an internet connection.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Yes, we use end-to-end encryption and Row Level Security (RLS) policies. Your translation history is only accessible by you.',
  },
  {
    question: 'Can I use this on mobile devices?',
    answer: 'Yes! SignSpeak is fully responsive and works on smartphones, tablets, and desktop computers.',
  },
  {
    question: 'What sign language does the app support?',
    answer: 'Currently we support ASL (American Sign Language) alphabet. We\'re working on adding ISL (Indian Sign Language) and other sign languages.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about SignSpeak.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-500 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
