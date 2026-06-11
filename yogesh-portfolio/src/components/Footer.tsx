import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { CONTACT, NAV_ITEMS } from '@/data/portfolio'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.8), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg border border-cyan-500/30 flex items-center justify-center text-sm font-bold gradient-text font-space">
                YHK
              </div>
              <span className="font-space font-semibold text-white">
                Yogesh H K<span className="text-cyan-500">.</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Java Full Stack Developer & AI enthusiast. Building the future one commit at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors animated-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3">
              {[
                { icon: Github, href: CONTACT.github, label: 'GitHub' },
                { icon: Linkedin, href: CONTACT.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
                  whileHover={{ y: -2 }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} Yogesh H K. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <Heart size={10} className="text-red-500 fill-red-500 mx-0.5" /> using React, TypeScript & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
