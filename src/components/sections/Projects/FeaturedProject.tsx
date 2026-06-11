import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import type { Project } from '@/types'
import GlowButton from '@/components/ui/GlowButton'

interface FeaturedProjectProps {
  project: Project
}

// Fake laptop/dashboard mockup
function DashboardMockup({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-[16/10] max-w-lg mx-auto">
      {/* Laptop shell */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          boxShadow: `0 0 50px ${color}20, 0 0 100px ${color}10`,
        }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="glass rounded px-3 py-1 text-xs text-gray-500 font-mono">
              localhost:8080/gymPro/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex h-[calc(100%-36px)]">
          {/* Sidebar */}
          <div className="w-12 sm:w-16 border-r border-white/5 p-2 flex flex-col gap-2">
            {['🏠', '👥', '💪', '📊', '⚙️'].map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs cursor-pointer ${
                  i === 0 ? 'text-white' : 'text-gray-600'
                }`}
                style={i === 0 ? { background: `${color}20`, border: `1px solid ${color}40` } : {}}
              >
                {icon}
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 overflow-hidden">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Members', value: '248', color: '#00F5FF' },
                { label: 'Active', value: '186', color: '#7C3AED' },
                { label: 'Revenue', value: '₹48K', color: '#38BDF8' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass rounded-lg p-2 border border-white/5"
                >
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="glass rounded-lg p-2 border border-white/5 mb-2">
              <div className="text-xs text-gray-500 mb-2">Membership Trend</div>
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 45, 80, 60, 90, 70, 85, 75, 95, 80, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                    style={{ background: `linear-gradient(to top, ${color}80, ${color}30)` }}
                  />
                ))}
              </div>
            </div>

            {/* Members list */}
            <div className="glass rounded-lg p-2 border border-white/5">
              <div className="text-xs text-gray-500 mb-2">Recent Members</div>
              {['Arjun K', 'Priya S', 'Rahul M'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-2 py-1"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
                    style={{ background: `${color}30` }}>
                    {name[0]}
                  </div>
                  <span className="text-xs text-gray-400">{name}</span>
                  <span className="ml-auto text-xs text-green-400">Active</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="absolute -bottom-8 left-0 right-0 h-8 opacity-20"
        style={{ background: `linear-gradient(to bottom, ${color}20, transparent)`, filter: 'blur(4px)' }} />
    </div>
  )
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={containerRef} className="mb-20">
      {/* Featured label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-[1px] w-8 bg-cyan-500" />
        <span className="text-sm text-cyan-500 font-mono tracking-widest uppercase">Featured Project</span>
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden border border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${project.color}, #7C3AED, transparent)` }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 0% 0%, ${project.color}06 0%, transparent 50%)`,
          }}
        />

        <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12 relative z-10">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono px-3 py-1.5 rounded-full border"
                  style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}10` }}
                >
                  ★ Featured
                </span>
                <span className="text-xs text-gray-500 font-mono">{project.tech.slice(0, 3).join(' · ')}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-space text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>

              <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                {project.longDescription}
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={12} style={{ color: project.color, flexShrink: 0 }} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${project.color}30`,
                      background: `${project.color}08`,
                      color: `${project.color}cc`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <GlowButton
                  href={project.github}
                  variant="primary"
                  size="sm"
                  icon={<Github size={15} />}
                >
                  View Code
                </GlowButton>
                {project.demo && (
                  <GlowButton
                    href={project.demo}
                    variant="secondary"
                    size="sm"
                    icon={<ExternalLink size={15} />}
                    iconRight
                  >
                    Live Demo
                  </GlowButton>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            style={{ y }}
            className="flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="w-full"
            >
              <DashboardMockup color={project.color} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
