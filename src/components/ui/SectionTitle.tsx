import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  centered = false,
  className,
}: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const titleParts = highlight ? title.split(highlight) : [title]

  return (
    <div
      ref={ref}
      className={cn(
        'mb-16',
        centered && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
          style={{ justifyContent: centered ? 'center' : 'flex-start' }}
        >
          <span className="h-[1px] w-8 bg-cyan-500" />
          <span className="text-sm font-mono text-cyan-500 tracking-widest uppercase">
            {eyebrow}
          </span>
          <span className="h-[1px] w-8 bg-cyan-500" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-space leading-tight"
      >
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="gradient-text">{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-gray-400 max-w-2xl"
          style={{ margin: centered ? '1rem auto 0' : '1rem 0 0' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
