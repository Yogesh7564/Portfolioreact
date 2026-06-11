import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { CONTACT } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle'
import GlowButton from '@/components/ui/GlowButton'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const CONTACT_LINKS = [
  { icon: Mail,     label: 'Email',    value: 'yogeshhk098@gmail.com',      href: `mailto:${CONTACT.email}`, color: '#00F5FF' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yogesh-h-k',  href: CONTACT.linkedin,          color: '#0A66C2' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Yogesh7564',        href: CONTACT.github,            color: '#ffffff' },
  { icon: MapPin,   label: 'Location', value: 'Chikkamagaluru, Karnataka',   href: '#',                       color: '#A855F7' },
]

function ContactLink({ link, index }: { link: typeof CONTACT_LINKS[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const Icon = link.icon

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
      whileHover={{ x: 4 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
      >
        <Icon size={18} style={{ color: link.color }} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{link.label}</p>
        <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{link.value}</p>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate EmailJS integration
    // In production: import emailjs and call emailjs.sendForm()
    await new Promise(r => setTimeout(r, 1500))

    try {
      // TODO: Replace with actual EmailJS credentials
      // await emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current!, 'PUBLIC_KEY')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputClasses = `
    w-full px-4 py-3 rounded-xl text-sm
    bg-white/5 border border-white/10
    text-white placeholder-gray-600
    focus:outline-none focus:border-cyan-500/50 focus:bg-white/8
    transition-all duration-200
  `

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[50%] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, #7C3AED 0%, transparent 70%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Let's build something "
          highlight="together"
          description="Have an opportunity, project, or just want to connect? I'm always open to interesting conversations."
          centered
        />

        <div ref={ref} className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28">
              <div className="glass rounded-3xl p-6 border border-white/10 mb-6">
                <div className="text-3xl mb-3">👋</div>
                <h3 className="text-lg font-bold text-white font-space mb-2">Let's Talk</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  I'm actively looking for opportunities. Whether it's a full-time role, internship,
                  or an interesting project — let's connect.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">Currently available</span>
                </div>
              </div>

              <div className="space-y-3">
                {CONTACT_LINKS.map((link, i) => (
                  <ContactLink key={link.label} link={link} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #00F5FF, #7C3AED, transparent)' }} />

              <h3 className="text-xl font-bold text-white font-space mb-6">Send a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Arjun Kumar"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="arjun@company.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Job Opportunity / Collaboration / ..."
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Hi Yogesh, I came across your portfolio and..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={16} />
                    Failed to send. Please email me directly.
                  </motion.div>
                )}

                <GlowButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                  icon={
                    status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )
                  }
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </GlowButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
