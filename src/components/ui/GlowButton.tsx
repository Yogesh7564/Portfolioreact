import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  icon?: ReactNode
  iconRight?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  icon,
  iconRight = false,
  disabled = false,
  type = 'button',
}: GlowButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
    {
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    {
      'bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] hover:scale-[1.02] active:scale-[0.98]':
        variant === 'primary',
      'bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]':
        variant === 'secondary',
      'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20':
        variant === 'outline',
      'text-gray-400 hover:text-white hover:bg-white/5': variant === 'ghost',
    },
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      {/* Shimmer effect */}
      {variant === 'primary' && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 shimmer" />
        </span>
      )}

      {icon && !iconRight && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconRight && <span className="relative z-10">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
