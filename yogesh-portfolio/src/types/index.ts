export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tech: string[]
  features: string[]
  github: string
  demo?: string
  image?: string
  featured?: boolean
  color: string
  gradient: string
}

export interface Skill {
  name: string
  level: number
  category: string
  icon?: string
  color: string
}

export interface SkillCategory {
  name: string
  icon: string
  color: string
  skills: Skill[]
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  verifyUrl?: string
  color: string
  icon: string
}

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  period: string
  description: string[]
  tech: string[]
  type: 'work' | 'internship' | 'freelance'
}

export interface Education {
  id: string
  degree: string
  field: string
  institution: string
  period: string
  grade: string
  description: string
  highlights: string[]
}

export interface Research {
  id: string
  title: string
  conference: string
  year: string
  abstract: string
  keywords: string[]
  doi?: string
  pdfUrl?: string
  status: 'published' | 'submitted' | 'in-review'
}

export interface Stat {
  label: string
  value: string
  suffix?: string
  icon: string
  color: string
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactInfo {
  email: string
  phone: string
  linkedin: string
  github: string
  location: string
}
