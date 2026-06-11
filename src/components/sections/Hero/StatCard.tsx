import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import type { Stat } from '@/types'

interface StatCardProps {
  stat: Stat
  index: number
}

export default function StatCard({ stat, index }: StatCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const numericValue = parseFloat(stat.value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-4 sm:p-5 text-center border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${stat.color}15 0%, transparent 70%)`,
        }}
      />

      <div className="text-2xl mb-1">{stat.icon}</div>

      <div
        className="text-2xl sm:text-3xl font-bold font-space"
        style={{ color: stat.color }}
      >
        {inView ? (
          <CountUp
            start={0}
            end={numericValue}
            duration={2}
            decimals={numericValue % 1 !== 0 ? 1 : 0}
          />
        ) : '0'}
        {stat.suffix && <span>{stat.suffix}</span>}
      </div>

      <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">{stat.label}</div>
    </motion.div>
  )
}
