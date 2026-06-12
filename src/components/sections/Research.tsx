import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Award, TrendingUp, Quote, ExternalLink } from 'lucide-react'
import { RESEARCH } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'
import GlowButton from '@/components/ui/GlowButton'

function ResearchMetric({ icon, value, label, color, index }: {
  icon: string
  value: string
  label: string
  color: string
  index: number
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      className="text-center p-5 glass rounded-2xl border border-white/10 group hover:border-white/20 transition-all"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold font-space" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  )
}

export default function Research() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="research" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(0,245,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] h-[40%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Research"
          title="Published at "
          highlight="IEEE"
          description="Contributing to the global research community with novel approaches in deep learning and remote sensing."
          centered
        />

        {RESEARCH.map((paper) => (
          <motion.div
            key={paper.id}
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main research card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-8"
              style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)' }}>

              {/* Top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #38BDF8, #00F5FF, #7C3AED, transparent)' }} />

              {/* Decorative corner */}
              <div className="absolute top-6 right-4 sm:right-6 opacity-10 overflow-hidden">
                <div className="text-[50px] sm:text-[80px] font-bold font-space leading-none text-cyan-500 select-none">IEEE</div>
              </div>

              <div className="p-6 sm:p-8 lg:p-12">
                {/* Conference badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
                  style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <Award size={14} className="text-sky-400" />
                  <span className="text-xs font-medium text-sky-400">{paper.conference} · {paper.year}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ background: paper.status === 'published' ? '#22c55e20' : '#f59e0b20', color: paper.status === 'published' ? '#22c55e' : '#f59e0b', border: `1px solid ${paper.status === 'published' ? '#22c55e40' : '#f59e0b40'}` }}
                  >
                    {paper.status}
                  </span>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Paper info */}
                  <div className="lg:col-span-2">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-2xl lg:text-3xl font-bold font-space text-white mb-4 leading-tight"
                    >
                      {paper.title}
                    </motion.h3>

                    {/* Quote-style abstract */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 }}
                      className="relative p-4 rounded-xl mb-5"
                      style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.1)' }}
                    >
                      <Quote size={16} className="text-sky-500/50 mb-2" />
                      <p className="text-sm text-gray-400 leading-relaxed italic">
                        {paper.abstract}
                      </p>
                    </motion.div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {paper.keywords.map((kw, i) => (
                        <motion.span
                          key={kw}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="text-xs px-2.5 py-1 rounded-full border"
                          style={{ borderColor: 'rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.05)', color: '#38BDF8' }}
                        >
                          {kw}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                      <GlowButton variant="primary" size="sm" icon={<BookOpen size={14} />}>
                        Read Paper
                      </GlowButton>
                      <GlowButton variant="outline" size="sm" icon={<ExternalLink size={14} />} iconRight>
                        IEEE Digital Library
                      </GlowButton>
                    </div>
                  </div>

                  {/* Research metrics */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Research Highlights</h4>
                    <div className="space-y-3">
                      {[
                        { icon: '📄', value: '1', label: 'Publication', color: '#00F5FF' },
                        { icon: '🔭', value: 'SAR + DL', label: 'Methodology', color: '#38BDF8' },
                        { icon: '🌊', value: 'Flood', label: 'Application Domain', color: '#7C3AED' },
                        { icon: '🏆', value: 'IEEE', label: 'Publication Venue', color: '#A855F7' },
                      ].map((m, i) => (
                        <div key={m.label} className="flex items-center gap-3 glass rounded-xl p-3 border border-white/10">
                          <span className="text-lg">{m.icon}</span>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: m.color }}>{m.value}</div>
                            <div className="text-xs text-gray-500">{m.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Impact visualization */}
                    <div className="mt-4 p-4 glass rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={14} className="text-cyan-500" />
                        <span className="text-xs text-gray-400">Research Timeline</span>
                      </div>
                      <div className="space-y-2">
                        {['Literature Review', 'Dataset Collection', 'Model Training', 'Paper Writing', 'IEEE Submission', 'Publication'].map((step, i) => (
                          <div key={step} className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: i <= 4 ? '#00F5FF' : '#374151' }}
                            />
                            <span className="text-xs" style={{ color: i <= 4 ? '#9ca3af' : '#4b5563' }}>{step}</span>
                            {i <= 4 && <span className="ml-auto text-xs text-green-500">✓</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
