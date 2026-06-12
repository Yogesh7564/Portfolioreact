import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { CERTIFICATES } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'

// Issuer brand colors for the detail spotlight
const ISSUER_META: Record<string, { bg: string; label: string }> = {
  'nptel-java':         { bg: '#00F5FF', label: 'Government Certified' },
  'intel-ai':           { bg: '#0071C5', label: 'Industry Certified' },
  'deloitte-analytics': { bg: '#86BC25', label: 'Big-4 Simulation' },
  'udemy-java':         { bg: '#A435F0', label: 'Online Learning' },
  'gfg-fullstack':      { bg: '#38BDF8', label: 'Full Stack Track' },
  'dhee-intern':        { bg: '#7C3AED', label: 'Internship Credential' },
}

// ── Single cert card ──────────────────────────────────────────────────────────
interface CertCardProps {
  cert: typeof CERTIFICATES[0]
  index: number
  isActive: boolean
  onClick: () => void
}

function CertCard({ cert, index, isActive, onClick }: CertCardProps) {
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const meta = ISSUER_META[cert.id] ?? { bg: cert.color, label: 'Certified' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -12 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border transition-colors duration-300 h-full"
        animate={{
          scale: isActive ? 1.03 : hovered ? 1.01 : 1,
          rotateY: hovered ? 4 : 0,
          rotateX: hovered ? -2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          background: `linear-gradient(135deg, ${cert.color}12 0%, rgba(17,24,39,0.85) 100%)`,
          borderColor: isActive ? cert.color + '55' : hovered ? cert.color + '30' : 'rgba(255,255,255,0.09)',
          boxShadow: isActive ? `0 0 28px ${cert.color}22, 0 0 56px ${cert.color}10` : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${cert.color}, ${cert.color}50, transparent)`,
            opacity: isActive || hovered ? 1 : 0.5,
          }}
        />

        {/* Watermark icon */}
        <div className="absolute top-2 right-2 text-2xl opacity-[0.07] select-none">{cert.icon}</div>

        <div className="p-4">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}28` }}
          >
            {cert.icon}
          </div>

          {/* Label badge */}
          <div className="mb-2.5">
            <span
              className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${meta.bg}35`, background: `${meta.bg}10`, color: meta.bg }}
            >
              {meta.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xs font-semibold text-white leading-snug mb-1.5 line-clamp-2">
            {cert.title}
          </h3>

          {/* Issuer */}
          <p className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2">{cert.issuer}</p>

          {/* Date strip */}
          <div className="flex items-center gap-1.5 mt-auto">
            <div className="h-[1px] flex-1" style={{ background: `${cert.color}25` }} />
            <span className="text-[9px] font-mono" style={{ color: cert.color }}>{cert.date}</span>
          </div>

          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] mt-2 hover:opacity-80 transition-opacity"
              style={{ color: cert.color }}
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={9} /> Verify
            </a>
          )}
        </div>

        {/* Active ring */}
        {isActive && (
          <motion.div
            layoutId="activeCertRing"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1px solid ${cert.color}45`, boxShadow: `inset 0 0 18px ${cert.color}0d` }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Spotlight detail ──────────────────────────────────────────────────────────
function CertSpotlight({ cert }: { cert: typeof CERTIFICATES[0] }) {
  const meta = ISSUER_META[cert.id] ?? { bg: cert.color, label: 'Certified' }

  const highlights: Record<string, string[]> = {
    'nptel-java':         ['12-week government-recognized course', 'Core Java: OOP, multithreading, file I/O', 'Graded assignments + proctored final exam', 'Issued by IIT Kharagpur'],
    'intel-ai':           ['Offered by Intel Technology India', 'Through Skill India Digital Hub · NSDC', 'Course completed in 4 hours', 'Certified on Aug 5, 2025'],
    'deloitte-analytics': ['Practical tasks in Data Analysis', 'Practical tasks in Forensic Technology', 'Issued via Forage platform', 'July – August 2025'],
    'udemy-java':         ['Complete Java with Practical Examples', 'Instructor: CodeXpert Academy · 3 hours', 'Certificate No: UC-835c241d-...', 'Issued Aug 10, 2025'],
    'gfg-fullstack':      ['HTML5, CSS3, JavaScript, React.js', 'Node.js, Express.js, MongoDB, REST APIs', 'Git version control & responsive design', 'Nation SkillUp Programme · Oct 2025'],
    'dhee-intern':        ['Java, Spring Boot, React.js, MySQL', 'Built RESTful APIs & responsive web apps', 'Applied OOP & MVC architecture', 'Dhee Coding Lab Pvt. Ltd. · Feb–May 2026'],
  }

  const pts = highlights[cert.id] ?? []

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        background: `linear-gradient(135deg, ${cert.color}0d, rgba(17,24,39,0.9))`,
        borderColor: `${cert.color}28`,
        boxShadow: `0 0 40px ${cert.color}12`,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Large icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
        >
          {cert.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${meta.bg}35`, background: `${meta.bg}10`, color: meta.bg }}
            >
              {meta.label}
            </span>
            <span className="text-[10px] text-gray-600 font-mono">{cert.date}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white font-space leading-tight mb-0.5">
            {cert.title}
          </h3>
          <p className="text-xs" style={{ color: cert.color }}>{cert.issuer}</p>
        </div>
      </div>

      {pts.length > 0 && (
        <div className="mt-4 grid sm:grid-cols-2 gap-1.5">
          {pts.map(pt => (
            <div key={pt} className="flex items-start gap-2 text-xs text-gray-400">
              <CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: cert.color }} />
              {pt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const prev = () => setActiveIndex(i => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length)
  const next = () => setActiveIndex(i => (i + 1) % CERTIFICATES.length)
  const activeCert = CERTIFICATES[activeIndex]

  return (
    <section id="certifications" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-0 w-[30%] h-[40%] opacity-4 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Credentials"
          title="Certified &amp; "
          highlight="Validated"
          description="6 industry-recognized certifications across AI, data analytics, Java, and full-stack development."
          centered
        />

        {/* Counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-3 px-6 py-2.5 glass rounded-full border border-white/10">
            <Award className="text-yellow-400" size={16} />
            <span className="text-sm font-medium">
              <span
                className="font-bold"
                style={{
                  background: 'linear-gradient(135deg,#00F5FF,#7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {CERTIFICATES.length}
              </span>
              <span className="text-gray-400 ml-1">Professional Certifications</span>
            </span>
          </div>
        </motion.div>

        {/* Spotlight detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <CertSpotlight cert={activeCert} />
          </motion.div>
        </AnimatePresence>

        {/* Cards grid — 3 cols mobile → 6 cols desktop */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8"
        >
          {CERTIFICATES.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex justify-center items-center gap-3">
          <motion.button
            onClick={prev}
            className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </motion.button>

          <div className="flex items-center gap-1.5">
            {CERTIFICATES.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '20px' : '6px',
                  height: '6px',
                  background: i === activeIndex ? c.color : '#374151',
                }}
                aria-label={`Certificate ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
