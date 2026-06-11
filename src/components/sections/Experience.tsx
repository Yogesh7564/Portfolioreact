import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import { EXPERIENCE } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const typeColor = exp.type === 'internship' ? '#00F5FF' : exp.type === 'work' ? '#7C3AED' : '#38BDF8'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-16 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/30 to-transparent" />

      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="flex-shrink-0 mt-5">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10"
            style={{
              borderColor: typeColor,
              background: `${typeColor}10`,
              boxShadow: `0 0 20px ${typeColor}30`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xl">💼</span>
          </motion.div>
        </div>

        {/* Card */}
        <div className="flex-1 mb-10">
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${typeColor}, ${typeColor}40, transparent)` }}
            />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 0% 50%, ${typeColor}06 0%, transparent 60%)` }}
            />

            <div className="p-6 sm:p-8 relative z-10">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-space text-white mb-1">{exp.role}</h3>

                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium" style={{ color: typeColor }}>{exp.company}</span>
                    {exp.companyUrl && (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-300 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 glass px-3 py-1.5 rounded-full border border-white/10">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                    style={{ borderColor: `${typeColor}30`, background: `${typeColor}10`, color: typeColor }}
                  >
                    {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2 mb-5">
                {exp.description.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-gray-400"
                  >
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: typeColor }} />
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${typeColor}25`,
                      background: `${typeColor}08`,
                      color: `${typeColor}cc`,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[30%] h-[50%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Experience"
          title="Where I've "
          highlight="worked"
          description="Professional experience building real-world applications and gaining industry expertise."
        />

        <div>
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
