import { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Footer from '@/components/Footer'
import { useLenis } from '@/hooks/useLenis'

// Lazy load heavy sections
const About = lazy(() => import('@/components/sections/About'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Research = lazy(() => import('@/components/sections/Research'))
const Certifications = lazy(() => import('@/components/sections/Certifications'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Education = lazy(() => import('@/components/sections/Education'))
const Contact = lazy(() => import('@/components/sections/Contact'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  useLenis()

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Preload critical resources
    document.title = 'Yogesh H K — Java Full Stack Developer & AI Engineer'
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      {!isLoading && <ScrollProgress />}

      {/* Main App */}
      {!isLoading && (
        <div className="min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main>
            {/* Hero - not lazy loaded (above fold) */}
            <Hero />

            {/* Lazy loaded sections */}
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Research />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Certifications />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Education />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  )
}
