import { Navbar, Footer } from '@/components/layout'
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from '@/components/landing'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
