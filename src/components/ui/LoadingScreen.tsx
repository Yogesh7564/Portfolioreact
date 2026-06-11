import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('Initializing...')

  const loadingTexts = [
    'Initializing...',
    'Loading assets...',
    'Building UI...',
    'Almost ready...',
    'Welcome.',
  ]

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    let textIndex = 0

    interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12 + 5
        if (next >= 100) {
          clearInterval(interval)
          setText('Welcome.')
          setTimeout(onComplete, 600)
          return 100
        }
        textIndex = Math.floor((next / 100) * loadingTexts.length)
        setText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)])
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111827]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center">
          {/* Logo mark */}
          <motion.div
            className="w-20 h-20 mx-auto mb-8 relative"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/50 animate-spin-slow" />
            <div className="absolute inset-2 rounded-xl border border-violet-500/50 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold gradient-text font-space">
              YHK
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-2xl font-bold text-white mb-2 font-space tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Yogesh H K
          </motion.h1>

          <motion.p
            className="text-sm text-gray-400 mb-12 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-mono">{text}</span>
              <span className="text-xs font-mono gradient-text-cyan">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
