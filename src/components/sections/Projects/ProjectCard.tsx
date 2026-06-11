import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 group-hover:h-[3px]"
        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80, transparent)` }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}10` }}
              >
                {project.featured ? 'Featured' : 'Project'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-space text-white group-hover:text-cyan-100 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{project.subtitle}</p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github size={16} />
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Live Demo"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-gray-400">
              <ArrowRight size={10} style={{ color: project.color }} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full border transition-all duration-200 hover:scale-105"
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
      </div>
    </motion.div>
  )
}
