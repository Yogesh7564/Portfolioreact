import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Star, CheckCircle2 } from 'lucide-react'
import { EDUCATION } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'

// ── Circular grade visual ─────────────────────────────────────────────────────
function GradeVisual({ grade, index }: { grade: string; index: number }) {
  // grade is either "8.3 CGPA" or "86.66%"
  const isPercent = grade.includes('%')
  const raw = parseFloat(grade)
  const percentage = isPercent ? raw : (raw / 10) * 100
  const label = isPercent ? '%' : 'CGPA'
  const max = isPercent ? '100' : '10.0'
  const gradientId = `gradeGrad-${index}`

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="40" fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percentage / 100) }}
            transition={{ duration: 2, delay: 0.5 + index * 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={index === 0 ? '#00F5FF' : '#A855F7'} />
              <stop offset="100%" stopColor={index === 0 ? '#7C3AED' : '#38BDF8'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-lg font-bold font-space"
            style={{
              background: index === 0
                ? 'linear-gradient(135deg,#00F5FF,#7C3AED)'
                : 'linear-gradient(135deg,#A855F7,#38BDF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {raw}
          </span>
          <span className="text-[10px] text-gray-500">{label}</span>
        </div>
      </div>
      <p className="text-xs text-gray-600">Out of {max}</p>
    </div>
  )
}

// ── Single education card ─────────────────────────────────────────────────────
function EduCard({ edu, index }: { edu: typeof EDUCATION[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const accentColor  = index === 0 ? '#00F5FF' : '#A855F7'
  const isCurrently  = index === 0
  const statusText   = isCurrently ? 'Currently Enrolled · Graduating 2026' : 'Completed'
  const statusColor  = isCurrently ? '#22c55e' : '#38BDF8'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15 }}
      className="relative mb-6"
    >
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/18 transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: index === 0
              ? 'linear-gradient(90deg, #00F5FF, #7C3AED, transparent)'
              : 'linear-gradient(90deg, #A855F7, #38BDF8, transparent)',
          }}
        />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid sm:grid-cols-3 gap-8 items-start">

            {/* ── Info ── */}
            <div className="sm:col-span-2">
              {/* Institution row */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}28` }}
                >
                  🎓
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-space leading-tight">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <MapPin size={10} />
                    Karnataka, India
                  </div>
                </div>
              </div>

              {/* Degree + field */}
              <div className="mb-3">
                <h4 className="text-xl sm:text-2xl font-bold text-white font-space">{edu.degree}</h4>
                <p className="text-sm font-medium mt-1" style={{ color: accentColor }}>{edu.field}</p>
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={13} />
                <span>{edu.period}</span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">{edu.description}</p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-2">
                {edu.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <CheckCircle2 size={11} className="flex-shrink-0" style={{ color: accentColor }} />
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Grade ring + status ── */}
            <div className="flex flex-col items-center gap-4">
              <GradeVisual grade={edu.grade} index={index} />

              {/* Status */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs mb-1"
                  style={{ color: statusColor }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                  {statusText}
                </div>
              </div>

              {/* Stars */}
              <div className="glass rounded-xl p-3 border border-white/10 w-full text-center">
                <div className="flex justify-center mb-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Academic Performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Education() {
  return (
    <section id="education" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[30%] h-[40%] opacity-4 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Education"
          title="Academic "
          highlight="Foundation"
          description="Strong academic roots from Science background through Computer Science Engineering."
          centered
        />
        {EDUCATION.map((edu, i) => (
          <EduCard key={edu.id} edu={edu} index={i} />
        ))}
      </div>
    </section>
  )
}
