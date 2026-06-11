import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { NAV_ITEMS } from '@/data/portfolio'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Active section detection
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[999] transition-all duration-500',
          isScrolled
            ? 'py-3 glass-dark shadow-[0_1px_0_rgba(255,255,255,0.05)]'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-lg border border-cyan-500/50 flex items-center justify-center text-sm font-bold gradient-text font-space relative overflow-hidden">
              <span className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
              <span className="relative">YHK</span>
            </div>
            <span className="font-space font-semibold text-white hidden sm:block">
              Yogesh<span className="text-cyan-500">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-cyan-500'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              download
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Resume
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-4 right-4 z-[998] glass-dark rounded-2xl p-4 md:hidden border border-white/10"
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-500"
                >
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
