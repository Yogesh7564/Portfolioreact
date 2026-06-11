import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const isHovering = useRef(false)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }

    const handleMouseEnterLink = () => {
      isHovering.current = true
    }

    const handleMouseLeaveLink = () => {
      isHovering.current = false
    }

    const links = document.querySelectorAll('a, button, [role="button"], input, textarea')
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink)
      link.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY, dotX, dotY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[99998] mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          border: '1.5px solid rgba(0, 245, 255, 0.6)',
        }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[99999] mix-blend-screen hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          backgroundColor: '#00F5FF',
        }}
      />
    </>
  )
}
