import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import type { FlagshipProject } from '@/data/portfolio'
import GlowButton from '@/components/ui/GlowButton'
import AttendanceMockup from './mockups/AttendanceMockup'
import StudySyncMockup from './mockups/StudySyncMockup'

// ─── Tech Badge ───────────────────────────────────────────────────────────────
function TechBadge({
  tech,
  index,
  inView,
}: {
  tech: FlagshipProject['tech'][0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.05 * index, type: 'spring', stiffness: 260, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-default select-none transition-all duration-200"
      style={{
        borderColor: hovered ? tech.color + '60' : tech.color + '25',
        background: hovered ? tech.color + '18' : tech.color + '08',
        color: hovered ? tech.color : tech.color + 'bb',
        boxShadow: hovered ? `0 0 12px ${tech.color}25` : 'none',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: tech.color }}
      />
      {tech.name}
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] whitespace-nowrap z-20 pointer-events-none"
          style={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db' }}
        >
          {tech.category}
        </motion.span>
      )}
    </motion.div>
  )
}

// ─── Metric Pill ──────────────────────────────────────────────────────────────
function MetricPill({
  metric,
  index,
  inView,
}: {
  metric: FlagshipProject['metrics'][0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.5 }}
      className="flex flex-col items-center gap-1 p-3 rounded-2xl border border-white/8 group hover:border-white/15 transition-all duration-300"
      style={{ background: `${metric.color}06` }}
    >
      <span className="text-xl">{metric.icon}</span>
      <span className="text-sm font-bold font-space" style={{ color: metric.color }}>
        {metric.value}
      </span>
      <span className="text-[10px] text-gray-500 text-center leading-tight">{metric.label}</span>
    </motion.div>
  )
}

// ─── Feature Group ────────────────────────────────────────────────────────────
function FeatureGroup({
  group,
  index,
  inView,
  accentColor,
}: {
  group: FlagshipProject['featureGroups'][0]
  index: number
  inView: boolean
  accentColor: string
}) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 * index + 0.2 }}
      className="rounded-xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-base">{group.icon}</span>
        <span className="flex-1 text-sm font-medium text-gray-200">{group.group}</span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={14} className="text-gray-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-white/5 pt-2">
              {group.items.map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 size={11} style={{ color: accentColor, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Impact Card ──────────────────────────────────────────────────────────────
function ImpactCard({
  item,
  index,
  inView,
  accentColor,
}: {
  item: FlagshipProject['impact'][0]
  index: number
  inView: boolean
  accentColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index + 0.3 }}
      className="rounded-2xl p-4 border border-white/8 hover:border-white/15 transition-all duration-300 group relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 100%, ${accentColor}08 0%, transparent 70%)` }}
      />
      <div className="relative z-10">
        <div className="text-2xl mb-2">{item.icon}</div>
        <h4 className="text-sm font-semibold text-white mb-1.5">{item.title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface FlagshipCaseStudyProps {
  project: FlagshipProject
  reverse?: boolean
}

export default function FlagshipCaseStudy({ project, reverse = false }: FlagshipCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [bodyRef, bodyInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const Mockup =
    project.mockupType === 'attendance'
      ? () => <AttendanceMockup accentColor={project.accentColor} />
      : () => <StudySyncMockup accentColor={project.accentColor} />

  return (
    <div ref={containerRef} className="relative mb-12 sm:mb-16 lg:mb-20">
      {/* Outer card */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 60 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden border border-white/10"
        style={{ background: 'rgba(255,255,255,0.015)', backdropFilter: 'blur(24px)' }}
      >
        {/* Animated gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}, ${project.secondColor}, ${project.accentColor}40, transparent)`,
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: reverse
              ? `radial-gradient(ellipse at 100% 0%, ${project.accentColor}06 0%, transparent 55%)`
              : `radial-gradient(ellipse at 0% 0%, ${project.accentColor}06 0%, transparent 55%)`,
          }}
        />

        {/* ── Header strip ── */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-10 pt-8 pb-6 border-b border-white/5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 mb-3"
              >
                <div className="h-[1px] w-6" style={{ background: project.accentColor }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: project.accentColor }}
                >
                  {project.tag}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                  style={{
                    borderColor: `${project.accentColor}35`,
                    background: `${project.accentColor}10`,
                    color: project.accentColor,
                  }}
                >
                  Flagship
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space text-white leading-tight mb-1"
              >
                {project.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
                className="text-sm text-gray-500"
              >
                {project.subtitle}
              </motion.p>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              <GlowButton href={project.github} variant="primary" size="sm" icon={<Github size={14} />}>
                GitHub
              </GlowButton>
              {project.demo && (
                <GlowButton
                  href={project.demo}
                  variant="secondary"
                  size="sm"
                  icon={<ExternalLink size={14} />}
                  iconRight
                >
                  Live Demo
                </GlowButton>
              )}
            </motion.div>
          </div>

          {/* Type / stack line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="mt-3 text-xs font-mono text-gray-600"
          >
            {project.type}
          </motion.p>
        </div>

        {/* ── Body ── */}
        <div ref={bodyRef} className={`relative z-10 grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/5`}>

          {/* Left panel */}
          <div className={`p-6 sm:p-8 lg:p-10 flex flex-col gap-7 ${reverse ? 'lg:order-2' : ''}`}>

            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} style={{ color: project.accentColor }} />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overview</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{project.overview}</p>
            </div>

            {/* Metrics grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Metrics</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-2">
                {project.metrics.map((m, i) => (
                  <MetricPill key={m.label} metric={m} index={i} inView={bodyInView} />
                ))}
              </div>
            </div>

            {/* Feature groups */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Feature Breakdown</span>
              </div>
              <div className="space-y-2">
                {project.featureGroups.map((g, i) => (
                  <FeatureGroup
                    key={g.group}
                    group={g}
                    index={i}
                    inView={bodyInView}
                    accentColor={project.accentColor}
                  />
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <TechBadge key={t.name} tech={t} index={i} inView={bodyInView} />
                ))}
              </div>
            </div>

            {/* Architecture highlights */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Architecture Highlights</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {project.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: -12 }}
                    animate={bodyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.05 * i + 0.4 }}
                    className="flex items-start gap-2 text-xs text-gray-400"
                  >
                    <CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className={`p-6 sm:p-8 lg:p-10 flex flex-col gap-7 ${reverse ? 'lg:order-1' : ''}`}>

            {/* Dashboard mockup */}
            <motion.div style={{ y: mockupY }} className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={bodyInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Mockup />
              </motion.div>
            </motion.div>

            {/* Business impact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Impact</span>
              </div>
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                {project.impact.map((item, i) => (
                  <ImpactCard
                    key={item.title}
                    item={item}
                    index={i}
                    inView={bodyInView}
                    accentColor={project.accentColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
