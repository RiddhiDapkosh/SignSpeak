import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-primary-500 to-accent-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start Breaking Communication Barriers Today
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of users who are already using SignSpeak to connect with the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl gap-2"
              >
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/camera">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 gap-2"
              >
                Try Without Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
