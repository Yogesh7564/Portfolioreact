import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Code2, Brain, Microscope, Award, Zap } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const JOURNEY_ITEMS = [
  {
    year: '2022',
    title: 'Started Engineering',
    description: 'Joined Adichunchanagiri Institute of Technology for B.E. in Computer Science. Discovered passion for programming through Java fundamentals.',
    icon: BookOpen,
    color: '#00F5FF',
  },
  {
    year: '2023',
    title: 'Built Core Skills',
    description: 'Mastered Java OOP, data structures, and web technologies. Completed Udemy Java Masterclass and NPTEL Programming in Java certification.',
    icon: Code2,
    color: '#38BDF8',
  },
  {
    year: '2024',
    title: 'Full Stack Development',
    description: 'Dove deep into full-stack development — Servlets, JSP, JDBC, MySQL, and React. Built first major projects including GymPro management system.',
    icon: Zap,
    color: '#7C3AED',
  },
  {
    year: '2024-25',
    title: 'AI & Research',
    description: 'Explored Deep Learning and computer vision. Co-authored an IEEE research paper on flood detection using SAR imagery and deep learning.',
    icon: Brain,
    color: '#A855F7',
  },
  {
    year: '2025',
    title: 'IEEE Publication',
    description: 'Published research on "Flood Detection and Mapping: A Comprehensive Survey of SAR and Deep Learning Approaches" at IEEE Conference.',
    icon: Microscope,
    color: '#00F5FF',
  },
  {
    year: '2026',
    title: 'Industry Internship',
    description: 'Java Full Stack Intern at Dhee Coding Lab. Building production REST APIs, React applications, and scalable MVC architectures.',
    icon: Award,
    color: '#38BDF8',
  },
]

interface TimelineItemProps {
  item: typeof JOURNEY_ITEMS[0]
  index: number
  isLeft: boolean
}

function TimelineItem({ item, index, isLeft }: TimelineItemProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-10`}
    >
      {/* Content card */}
      <div className="flex-1">
        <div className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${isLeft ? '100%' : '0%'} 50%, ${item.color}10 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono px-2 py-1 rounded-full border"
                style={{ borderColor: `${item.color}40`, color: item.color, background: `${item.color}10` }}>
                {item.year}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10"
          style={{
            borderColor: item.color,
            background: `${item.color}15`,
            boxShadow: `0 0 15px ${item.color}30`,
          }}
        >
          <Icon size={16} style={{ color: item.color }} />
        </div>
      </div>

      {/* Spacer for alternate side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

function PassionCard({ icon, title, description, color }: {
  icon: string
  title: string
  description: string
  color: string
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      <div className="mt-3 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[40%] h-[50%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="About Me"
          title="From curiosity to "
          highlight="code"
          description="A journey of building, learning, and pushing boundaries in software engineering."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div>
            <motion.div style={{ y }} className="relative">
              {/* Story card */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 mb-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl">
                    👋
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-space">Yogesh H K</h3>
                    <p className="text-sm text-cyan-500">Java Full Stack Developer</p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                  <p>
                    I'm a Computer Science engineering student at{' '}
                    <span className="text-white font-medium">Adichunchanagiri Institute of Technology</span>{' '}
                    with a 8.3 CGPA, driven by a deep passion for building software that matters.
                  </p>
                  <p>
                    My journey began with Java fundamentals and quickly evolved into building full-stack
                    applications — from servlet-backed APIs to React-powered dashboards. I believe in
                    clean architecture, scalable design, and writing code that reads like a story.
                  </p>
                  <p>
                    Beyond the web, I'm fascinated by{' '}
                    <span className="text-violet-400 font-medium">Artificial Intelligence</span> and
                    Deep Learning. I've had the privilege of publishing research at an{' '}
                    <span className="text-cyan-400 font-medium">IEEE Conference</span> on flood
                    detection using SAR imagery — blending remote sensing with neural networks.
                  </p>
                  <p>
                    Currently interning at{' '}
                    <span className="text-white font-medium">Dhee Coding Lab</span>, I'm honing my
                    skills in production-grade full-stack development, building REST APIs and
                    scalable React applications.
                  </p>
                </div>
              </div>

              {/* Passion cards */}
              <div className="grid grid-cols-2 gap-4">
                <PassionCard
                  icon="☕"
                  title="Java Ecosystem"
                  description="Building robust backends with Servlets, JSP, JDBC, and REST APIs."
                  color="#ED8B00"
                />
                <PassionCard
                  icon="🤖"
                  title="AI & Deep Learning"
                  description="Exploring CNNs, SAR imagery, and intelligent data systems."
                  color="#7C3AED"
                />
                <PassionCard
                  icon="⚛️"
                  title="React Development"
                  description="Creating fast, interactive UIs with modern React patterns."
                  color="#61DAFB"
                />
                <PassionCard
                  icon="📊"
                  title="Research"
                  description="IEEE published. Passionate about solving real-world problems."
                  color="#00F5FF"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-5 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent hidden md:block" />

            <div className="space-y-2 md:pl-2">
              {JOURNEY_ITEMS.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={i}
                  isLeft={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
