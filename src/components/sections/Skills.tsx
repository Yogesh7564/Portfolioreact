import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SKILLS } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'
import type { Skill } from '@/types'

interface SkillBarProps {
  skill: Skill
  index: number
  isVisible: boolean
}

function SkillBar({ skill, index, isVisible }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-mono" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
        >
          <div className="absolute inset-0 shimmer opacity-50" />
        </motion.div>
      </div>
    </motion.div>
  )
}

interface SkillCategoryCardProps {
  category: typeof SKILLS[0]
  index: number
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Category glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}60, transparent)` }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${category.color}08 0%, transparent 70%)` }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
        >
          {category.icon}
        </div>
        <h3 className="text-base font-semibold text-white font-space">{category.name}</h3>
      </div>

      {/* Skill bars */}
      <div className="space-y-4 relative z-10">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} isVisible={inView} />
        ))}
      </div>
    </motion.div>
  )
}

// Floating tech bubble
function TechBubble({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1, y: -3 }}
      className="px-3 py-1.5 rounded-full text-xs font-medium border cursor-default"
      style={{
        borderColor: `${color}40`,
        background: `${color}10`,
        color: color,
      }}
    >
      {name}
    </motion.div>
  )
}

const ALL_TECH = [
  { name: 'Java', color: '#ED8B00' },
  { name: 'React', color: '#61DAFB' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Git', color: '#F05032' },
  { name: 'REST APIs', color: '#00F5FF' },
  { name: 'MVC', color: '#7C3AED' },
  { name: 'JDBC', color: '#38BDF8' },
  { name: 'JSP', color: '#5382A1' },
  { name: 'Servlets', color: '#A855F7' },
  { name: 'JWT', color: '#00F5FF' },
  { name: 'OOP', color: '#ED8B00' },
  { name: 'Agile', color: '#38BDF8' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Technical Skills"
          title="The tech behind the "
          highlight="magic"
          description="A carefully curated toolkit for building modern, scalable applications."
          centered
        />

        {/* Tech bubble cloud */}
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 max-w-3xl mx-auto"
        >
          {ALL_TECH.map((tech, i) => (
            <TechBubble key={tech.name} name={tech.name} color={tech.color} delay={i * 0.05} />
          ))}
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !activeCategory
                ? 'bg-cyan-500 text-black'
                : 'glass text-gray-400 hover:text-white border border-white/10'
            }`}
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            All Skills
          </motion.button>
          {SKILLS.map(cat => (
            <motion.button
              key={cat.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.name
                  ? 'text-black'
                  : 'glass text-gray-400 hover:text-white border-white/10'
              }`}
              style={activeCategory === cat.name ? { background: cat.color, borderColor: cat.color } : {}}
              onClick={() => setActiveCategory(prev => prev === cat.name ? null : cat.name)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory || 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {(activeCategory
              ? SKILLS.filter(s => s.name === activeCategory)
              : SKILLS
            ).map((category, i) => (
              <SkillCategoryCard key={category.name} category={category} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 h-[1px] w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00F5FF40, #7C3AED40, transparent)' }}
        />
      </div>
    </section>
  )
}
