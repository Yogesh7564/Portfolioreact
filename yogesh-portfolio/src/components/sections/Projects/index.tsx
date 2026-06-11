import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PROJECTS, FLAGSHIP_PROJECTS } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'
import FeaturedProject from './FeaturedProject'
import ProjectCard from './ProjectCard'
import FlagshipCaseStudy from './FlagshipCaseStudy'

function SectionDivider({ label, color }: { label: string; color: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 my-12 sm:my-16"
    >
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${color}40)` }} />
      <span
        className="text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full border"
        style={{ borderColor: `${color}30`, background: `${color}08`, color }}
      >
        {label}
      </span>
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
    </motion.div>
  )
}

export default function Projects() {
  const featuredProject = PROJECTS.find(p => p.featured)
  const otherProjects = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[50%] h-[35%] opacity-[0.04] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[40%] h-[40%] opacity-[0.04] blur-[110px]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
        {/* subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Portfolio"
          title="Things I've "
          highlight="Built"
          description="Enterprise-grade applications, research tools, and full-stack platforms solving real-world problems."
        />

        {/* ── Flagship Enterprise Projects ── */}
        <SectionDivider label="Flagship Enterprise Projects" color="#00F5FF" />

        {FLAGSHIP_PROJECTS.map((project, i) => (
          <FlagshipCaseStudy key={project.id} project={project} reverse={i % 2 !== 0} />
        ))}

        {/* ── Featured Project ── */}
        <SectionDivider label="Featured Project" color="#7C3AED" />

        {featuredProject && <FeaturedProject project={featuredProject} />}

        {/* ── Other Projects ── */}
        <SectionDivider label="More Projects" color="#38BDF8" />

        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
