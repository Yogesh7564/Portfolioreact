import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, ArrowDown, ExternalLink } from 'lucide-react'
import { STATS, TYPEWRITER_STRINGS, CONTACT } from '@/data/portfolio'
import StatCard from './StatCard'
import GlowButton from '@/components/ui/GlowButton'
import { gsap } from 'gsap'

const TECH_ICONS = [
  { name: 'Java',   bg: '#ED8B00', symbol: '☕', x: '10%', y: '20%', delay: 0 },
  { name: 'React',  bg: '#61DAFB', symbol: '⚛',  x: '85%', y: '15%', delay: 0.5 },
  { name: 'MySQL',  bg: '#4479A1', symbol: '🗄',  x: '8%',  y: '65%', delay: 1 },
  { name: 'Git',    bg: '#F05032', symbol: '⎇',  x: '88%', y: '70%', delay: 0.8 },
  { name: 'Spring', bg: '#6DB33F', symbol: '🍃', x: '50%', y: '5%',  delay: 1.2 },
  { name: 'AI',     bg: '#7C3AED', symbol: '🤖', x: '15%', y: '45%', delay: 0.3 },
]

function TechIcon({ icon }: { icon: typeof TECH_ICONS[0] }) {
  return (
    <motion.div
      className="absolute z-10"
      style={{ left: icon.x, top: icon.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { delay: icon.delay + 1, duration: 0.5 },
        scale:   { delay: icon.delay + 1, duration: 0.5, type: 'spring' },
        y:       { delay: icon.delay + 1.5, duration: 3 + icon.delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg shadow-lg border border-white/10 backdrop-blur-sm"
        style={{ background: `${icon.bg}20`, borderColor: `${icon.bg}40` }}
        title={icon.name}
      >
        <span>{icon.symbol}</span>
      </div>
    </motion.div>
  )
}

// ── Premium avatar (no photo) ──────────────────────────────────────────────
function ProfileImage() {
  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1033 50%, #0c1a2e 100%)',
        boxShadow: '0 0 40px rgba(124, 58, 237, 0.35), 0 0 80px rgba(0, 245, 255, 0.15)',
        border: '2px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Inner glow rings */}
      <div
        className="absolute inset-4 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-8 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }}
      />

      {/* Monogram */}
      <div className="relative z-10 text-center select-none">
        <div
          className="text-5xl sm:text-6xl lg:text-7xl font-black font-space leading-none"
          style={{
            background: 'linear-gradient(135deg, #00F5FF 0%, #7C3AED 50%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.4))',
          }}
        >
          YHK
        </div>
        <div className="text-[10px] sm:text-xs text-gray-500 mt-2 tracking-[0.3em] uppercase font-mono">
          Developer
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 rounded-full opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 shimmer opacity-15 pointer-events-none" />
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const profileRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileRef.current) return
      const rect = profileRef.current.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / rect.width
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / rect.height
      gsap.to(profileRef.current, { x: dx * 12, y: dy * 12, duration: 0.5, ease: 'power2.out' })
    }
    const handleMouseLeave = () => {
      if (!profileRef.current) return
      gsap.to(profileRef.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const typewriterSequence = TYPEWRITER_STRINGS.flatMap(s => [s, 2000])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #111827 0%, #1a0533 40%, #0a1628 80%, #111827 100%)' }}
    >
      {/* Mesh gradient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] rounded-full opacity-15 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite reverse' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {TECH_ICONS.map(icon => <TechIcon key={icon.name} icon={icon} />)}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ── */}
          <div className="text-center lg:text-left order-2 lg:order-1">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p className="text-gray-400 text-base sm:text-lg mb-2 font-mono">Hi, I'm</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space leading-none mb-4">
                <span className="text-white">Yogesh</span>
                <br />
                <span className="gradient-text">H K</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6 min-h-[2rem]"
            >
              <TypeAnimation
                sequence={typewriterSequence as (string | number)[]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#00F5FF' }}
              />
              <span className="animate-cursor-blink border-r-2 border-cyan-500 ml-1" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Building scalable web applications with Java, React, and cutting-edge AI.
              IEEE published researcher passionate about turning complex problems into elegant solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <GlowButton href="#projects" variant="primary" size="lg" icon={<ExternalLink size={18} />} iconRight>
                View Projects
              </GlowButton>
              <GlowButton href="/resume.pdf" variant="secondary" size="lg" icon={<Download size={18} />}>
                Resume
              </GlowButton>
            </motion.div>

            {/* Social links — real URLs from CONTACT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {[
                { icon: Github,   href: CONTACT.github,            label: 'GitHub' },
                { icon: Linkedin, href: CONTACT.linkedin,          label: 'LinkedIn' },
                { icon: Mail,     href: `mailto:${CONTACT.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile photo ── */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              className="relative"
            >
              {/* Rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-cyan-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute rounded-full border border-violet-500/15"
                  style={{ width: '88%', height: '88%' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                {/* Orbit dot */}
                <motion.div
                  className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(0,245,255,0.9)]"
                  style={{ top: '6%', left: '50%', translateX: '-50%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Photo wrapper */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto">
                {/* Ambient glow behind photo */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-50"
                  style={{ background: 'radial-gradient(circle, #7C3AED 0%, #00F5FF 60%, transparent 80%)' }}
                />
                <ProfileImage />

                {/* Status badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 px-3 py-1.5 glass rounded-xl border border-green-500/30 flex items-center gap-1.5 text-xs font-medium text-green-400 whitespace-nowrap"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to Work
                </motion.div>

                {/* IEEE badge */}
                <motion.div
                  className="absolute -top-3 -left-6 px-3 py-1.5 glass rounded-xl border border-cyan-500/30 flex items-center gap-1.5 text-xs font-medium text-cyan-400 whitespace-nowrap"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  📄 IEEE Published
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 lg:mt-20"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-500 transition-colors group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <ArrowDown size={16} className="group-hover:text-cyan-500" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
