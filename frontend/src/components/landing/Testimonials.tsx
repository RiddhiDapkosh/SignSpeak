import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Teacher, ASL Educator',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    content: 'SignSpeak has transformed how I communicate with my deaf students. The accuracy is incredible and the real-time translation makes classroom interactions seamless.',
    rating: 5,
  },
  {
    name: 'Rahul Sharma',
    role: 'Parent',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    content: 'My daughter uses sign language, and this app has helped our entire family learn to communicate with her. The Hindi translation feature is amazing!',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Accessibility Advocate',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    content: 'The technology behind SignSpeak is groundbreaking. As someone who works in accessibility, I can see the huge impact this makes for deaf and mute individuals.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Users Worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how SignSpeak is making a real difference in people's lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
