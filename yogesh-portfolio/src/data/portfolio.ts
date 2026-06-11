import type { Project, SkillCategory, Certificate, Experience, Education, Research, Stat, NavItem, ContactInfo } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Research',   href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export const STATS: Stat[] = [
  { label: 'CGPA',           value: '8.3', icon: '🎓', color: '#00F5FF' },
  { label: 'Major Projects', value: '5',   suffix: '+', icon: '🚀', color: '#7C3AED' },
  { label: 'Certifications', value: '6',   suffix: '+', icon: '🏆', color: '#38BDF8' },
  { label: 'Research Paper', value: '1',   icon: '📄', color: '#A855F7' },
]

export const TYPEWRITER_STRINGS = [
  'Java Full Stack Developer',
  'React Developer',
  'Problem Solver',
  'Software Engineer',
  'AI Enthusiast',
]

// ─── Skills (aligned exactly with resume) ─────────────────────────────────────
export const SKILLS: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    color: '#00F5FF',
    skills: [
      { name: 'HTML5',      level: 92, category: 'Frontend', color: '#E34F26' },
      { name: 'CSS3',       level: 88, category: 'Frontend', color: '#1572B6' },
      { name: 'JavaScript', level: 85, category: 'Frontend', color: '#F7DF1E' },
      { name: 'React.js',   level: 82, category: 'Frontend', color: '#61DAFB' },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: '#7C3AED',
    skills: [
      { name: 'Java',        level: 92, category: 'Backend', color: '#ED8B00' },
      { name: 'Spring Boot', level: 80, category: 'Backend', color: '#6DB33F' },
      { name: 'JDBC',        level: 87, category: 'Backend', color: '#00758F' },
      { name: 'REST APIs',   level: 85, category: 'Backend', color: '#61DAFB' },
      { name: 'JSP',         level: 83, category: 'Backend', color: '#5382A1' },
      { name: 'Servlets',    level: 83, category: 'Backend', color: '#7C3AED' },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    color: '#38BDF8',
    skills: [
      { name: 'MySQL',   level: 88, category: 'Database', color: '#4479A1' },
      { name: 'MongoDB', level: 75, category: 'Database', color: '#47A248' },
    ],
  },
  {
    name: 'Tools',
    icon: '🔧',
    color: '#A855F7',
    skills: [
      { name: 'VS Code', level: 95, category: 'Tools', color: '#007ACC' },
      { name: 'Git',     level: 88, category: 'Tools', color: '#F05032' },
      { name: 'GitHub',  level: 90, category: 'Tools', color: '#ffffff' },
    ],
  },
  {
    name: 'Concepts',
    icon: '💡',
    color: '#00F5FF',
    skills: [
      { name: 'OOP',             level: 92, category: 'Concepts', color: '#00F5FF' },
      { name: 'MVC Architecture',level: 88, category: 'Concepts', color: '#7C3AED' },
      { name: 'JWT Auth',        level: 84, category: 'Concepts', color: '#38BDF8' },
      { name: 'SDLC',            level: 85, category: 'Concepts', color: '#A855F7' },
      { name: 'Agile',           level: 80, category: 'Concepts', color: '#00F5FF' },
      { name: 'API Integration', level: 86, category: 'Concepts', color: '#F59E0B' },
    ],
  },
]

// ─── Core Projects (from resume) ──────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'gymPro',
    title: 'GymPro',
    subtitle: 'Gym Membership Management System',
    description:
      'Engineered a full-stack Gym Membership Management System with secure authentication, member & trainer management, attendance tracking, and reporting using MVC architecture.',
    longDescription:
      'Full-stack system built with Java, JSP, Servlets, MySQL, JDBC, React.js, HTML5, CSS3, and JavaScript. Implements MVC architecture, RESTful communication, JWT-secured authentication, and relational database design for a complete gym operations platform.',
    tech: ['Java', 'JSP', 'Servlets', 'MySQL', 'JDBC', 'React.js', 'HTML5', 'CSS3', 'JavaScript'],
    features: [
      'Secure User Authentication',
      'Member & Trainer Management',
      'Attendance Tracking',
      'Membership Handling',
      'Reporting Features',
      'MVC Architecture',
    ],
    github: 'https://github.com/Yogesh7564/gymPro',
    featured: true,
    color: '#00F5FF',
    gradient: 'from-cyan-500/20 to-violet-600/20',
  },
  {
    id: 'showtracker',
    title: 'ShowTracker',
    subtitle: 'Ticket Booking Platform',
    description:
      'Web-based ticket booking platform enabling users to discover and reserve tickets for movies, events, and sports with location-based search and responsive UI.',
    longDescription:
      'ShowTracker enables users to search by location, browse events, and book tickets with full booking management. Built on a relational MySQL database with responsive UI and efficient storage of user and booking data.',
    tech: ['Java', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'JDBC'],
    features: [
      'Location-Based Search',
      'Ticket Booking & Reservations',
      'Movies, Events & Sports',
      'Booking Management',
      'Responsive UI',
      'MySQL Database',
    ],
    github: 'https://github.com/Yogesh7564/showtracker',
    featured: false,
    color: '#7C3AED',
    gradient: 'from-violet-600/20 to-purple-500/20',
  },
  {
    id: 'darunet',
    title: 'DARU-Net',
    subtitle: 'Forest Burned Area Detection · Deep Learning',
    description:
      'Designed a dual-path deep learning model for identifying forest burned areas using multi-source SAR and optical satellite imagery with web-based visualization.',
    longDescription:
      'DARU-Net is a dual-path deep learning architecture processing SAR and optical satellite images to identify forest burned areas. Users upload satellite imagery to receive burned area size, accuracy metrics, and regional visualizations via the web application.',
    tech: ['Deep Learning', 'SAR Imagery', 'Optical Imagery', 'CNN', 'Python', 'Computer Vision'],
    features: [
      'Dual-Path Deep Learning Model',
      'SAR + Optical Image Fusion',
      'Satellite Image Upload',
      'Burned Area Size Metrics',
      'Accuracy Visualization',
      'Regional Detection Output',
    ],
    github: 'https://github.com/Yogesh7564/daru-net',
    featured: false,
    color: '#38BDF8',
    gradient: 'from-sky-400/20 to-cyan-500/20',
  },
]

// ─── Flagship Enterprise Projects ─────────────────────────────────────────────
export interface FlagshipMetric {
  icon: string; value: string; label: string; color: string
}
export interface FlagshipFeatureGroup {
  group: string; icon: string; items: string[]
}
export interface FlagshipProject {
  id: string; tag: string; title: string; subtitle: string; type: string
  overview: string; accentColor: string; secondColor: string
  github: string; demo?: string
  tech: { name: string; color: string; category: string }[]
  metrics: FlagshipMetric[]
  featureGroups: FlagshipFeatureGroup[]
  impact: { icon: string; title: string; description: string }[]
  highlights: string[]
  mockupType: 'attendance' | 'studysync'
}

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'attendance-system',
    tag: 'Enterprise Workforce',
    title: 'Employee Attendance Management System',
    subtitle: 'Full-Stack Enterprise Workforce Platform',
    type: 'MERN Stack · REST API · Role-Based Access Control',
    overview:
      'An enterprise-grade attendance management platform enabling organizations to track employee attendance in real-time, monitor work-hours, generate detailed reports, and visualize workforce analytics — all behind a secure JWT-authenticated, role-based portal.',
    accentColor: '#00F5FF',
    secondColor: '#7C3AED',
    github: 'https://github.com/Yogesh7564/employee-attendance',
    tech: [
      { name: 'React.js',      color: '#61DAFB', category: 'Frontend'  },
      { name: 'Redux Toolkit', color: '#764ABC', category: 'Frontend'  },
      { name: 'Tailwind CSS',  color: '#38BDF8', category: 'Frontend'  },
      { name: 'Node.js',       color: '#8CC84B', category: 'Backend'   },
      { name: 'Express.js',    color: '#ffffff', category: 'Backend'   },
      { name: 'MongoDB',       color: '#47A248', category: 'Database'  },
      { name: 'JWT Auth',      color: '#00F5FF', category: 'Security'  },
      { name: 'Recharts',      color: '#FF6B6B', category: 'Analytics' },
      { name: 'REST APIs',     color: '#A855F7', category: 'Backend'   },
      { name: 'RBAC',          color: '#F59E0B', category: 'Security'  },
    ],
    metrics: [
      { icon: '🔐', value: 'JWT',   label: 'Auth System',   color: '#00F5FF' },
      { icon: '👔', value: '2',     label: 'Role Portals',  color: '#7C3AED' },
      { icon: '📊', value: 'Live',  label: 'Analytics',     color: '#38BDF8' },
      { icon: '📅', value: 'Cal',   label: 'Visualization', color: '#A855F7' },
      { icon: '📤', value: 'CSV',   label: 'Export Reports',color: '#00F5FF' },
      { icon: '📱', value: '100%',  label: 'Responsive',    color: '#38BDF8' },
    ],
    featureGroups: [
      {
        group: 'Authentication & Security', icon: '🔐',
        items: ['JWT Authentication & Authorization', 'Role-Based Access Control (RBAC)', 'Protected Routes', 'Secure Session Management'],
      },
      {
        group: 'Employee Portal', icon: '👤',
        items: ['Daily Check-In / Check-Out', 'Attendance History & Calendar', 'Monthly Summary & Stats', 'Personal Analytics Dashboard'],
      },
      {
        group: 'Manager Portal', icon: '📊',
        items: ['Team Attendance Analytics', 'Department-Based Filtering', 'Real-Time Monitoring', 'CSV Report Export'],
      },
    ],
    impact: [
      { icon: '⚡', title: 'Automated Tracking',   description: 'Eliminated manual attendance logging, automating the full check-in/out lifecycle.' },
      { icon: '📈', title: 'Workforce Visibility',  description: 'Manager dashboards provide real-time insight into team availability and attendance trends.' },
      { icon: '🗂️', title: 'Report Generation',    description: 'One-click CSV exports let managers audit attendance data across any time range or department.' },
    ],
    highlights: [
      'Scalable MERN stack with modular architecture',
      'Redux Toolkit for predictable global state',
      'Recharts-powered analytics visualizations',
      'Mobile-first responsive enterprise UI',
    ],
    mockupType: 'attendance',
  },
  {
    id: 'studysync',
    tag: 'AI-Inspired Productivity',
    title: 'StudySync AI',
    subtitle: 'Smart Study Planner & Productivity Tracker',
    type: 'Java Spring Boot · React.js · MySQL · JWT',
    overview:
      'StudySync AI is a comprehensive full-stack academic productivity platform helping students plan studies, manage tasks, track attendance, monitor performance, and sharpen focus with Pomodoro sessions — all in a single intelligent dashboard powered by Spring Boot and React.',
    accentColor: '#A855F7',
    secondColor: '#38BDF8',
    github: 'https://github.com/Yogesh7564/studysync-ai',
    tech: [
      { name: 'Java 17',        color: '#ED8B00', category: 'Backend'   },
      { name: 'Spring Boot',    color: '#6DB33F', category: 'Backend'   },
      { name: 'Spring Security',color: '#6DB33F', category: 'Security'  },
      { name: 'Hibernate',      color: '#59666C', category: 'ORM'       },
      { name: 'MySQL',          color: '#4479A1', category: 'Database'  },
      { name: 'React.js',       color: '#61DAFB', category: 'Frontend'  },
      { name: 'Chart.js',       color: '#FF6384', category: 'Analytics' },
      { name: 'JWT Auth',       color: '#A855F7', category: 'Security'  },
      { name: 'BCrypt',         color: '#38BDF8', category: 'Security'  },
      { name: 'Spring JPA',     color: '#6DB33F', category: 'Backend'   },
    ],
    metrics: [
      { icon: '🔒', value: 'JWT',   label: 'Secure Auth',    color: '#A855F7' },
      { icon: '📚', value: '6+',    label: 'Modules',        color: '#38BDF8' },
      { icon: '⏱️', value: 'Pomo',  label: 'Focus Timer',    color: '#A855F7' },
      { icon: '📋', value: 'Task',  label: 'Management',     color: '#38BDF8' },
      { icon: '📊', value: 'Live',  label: 'Analytics',      color: '#A855F7' },
      { icon: '🎯', value: '100%',  label: 'Data Isolation', color: '#38BDF8' },
    ],
    featureGroups: [
      {
        group: 'Academic Planning', icon: '📚',
        items: ['Date-Based Study Planner', 'Daily & Weekly Tracking', 'Subject-Wise Attendance', 'Attendance Warning System'],
      },
      {
        group: 'Task & Performance', icon: '✅',
        items: ['Task Management with Priority', 'Search, Pagination & Filters', 'Marks & Exam Analytics', 'Academic Performance Charts'],
      },
      {
        group: 'Productivity & Security', icon: '⚡',
        items: ['Pomodoro Focus Timer', 'JWT + BCrypt Auth', 'User-Specific Data Isolation', 'Profile Management'],
      },
    ],
    impact: [
      { icon: '🎓', title: 'Academic Clarity',   description: 'Centralizes study planning, attendance, and marks — replacing scattered tools with one dashboard.' },
      { icon: '🔥', title: 'Productivity Boost', description: 'Pomodoro integration and task prioritization drive measurable focus and study session quality.' },
      { icon: '🛡️', title: 'Data Security',      description: 'Spring Security + BCrypt ensures secure, isolated user data with enterprise-grade password protection.' },
    ],
    highlights: [
      'Layered Spring Boot architecture (Controller → Service → Repository)',
      'Spring Data JPA + Hibernate for clean ORM',
      'Chart.js-driven academic performance charts',
      'Pagination, validation & global exception handling',
    ],
    mockupType: 'studysync',
  },
]

// ─── Certifications (all 6, exact details from certificates) ─────────────────
export const CERTIFICATES: Certificate[] = [
  {
    id: 'nptel-java',
    title: 'Programming In Java',
    issuer: 'NPTEL · IIT Kharagpur',
    date: 'Jan – Apr 2025',
    color: '#00F5FF',
    icon: '☕',
  },
  {
    id: 'intel-ai',
    title: 'AI for All',
    issuer: 'Intel Technology India · Skill India Digital Hub',
    date: 'Aug 5, 2025',
    color: '#0071C5',
    icon: '🤖',
  },
  {
    id: 'deloitte-analytics',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte · Forage',
    date: 'Aug 1, 2025',
    color: '#86BC25',
    icon: '📊',
  },
  {
    id: 'udemy-java',
    title: 'The Complete Java Masterclass with Practical Examples',
    issuer: 'Udemy · CodeXpert Academy',
    date: 'Aug 10, 2025',
    color: '#A435F0',
    icon: '💻',
  },
  {
    id: 'gfg-fullstack',
    title: 'Full Stack Web Development',
    issuer: 'GeeksforGeeks · Nation SkillUp',
    date: 'Oct 2025',
    color: '#38BDF8',
    icon: '🌐',
  },
  {
    id: 'dhee-intern',
    title: 'Java Full Stack Web Development',
    issuer: 'Dhee Coding Lab Pvt. Ltd.',
    date: 'Feb – May 2026',
    color: '#7C3AED',
    icon: '🚀',
  },
]

// ─── Experience (exactly from resume) ─────────────────────────────────────────
export const EXPERIENCE: Experience[] = [
  {
    id: 'dhee-intern',
    role: 'Java Full Stack Intern',
    company: 'Dhee Coding Lab Pvt. Ltd.',
    period: 'Feb 2026 – May 2026',
    description: [
      'Completed a Java Full Stack Internship gaining hands-on experience in Java, Spring Boot, React.js, HTML5, CSS3, JavaScript, JDBC, and MySQL.',
      'Developed responsive web applications and built RESTful APIs from the ground up.',
      'Integrated relational databases and applied OOP concepts throughout the project lifecycle.',
      'Implemented MVC architecture to deliver scalable and maintainable solutions.',
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'HTML5', 'CSS3', 'JavaScript', 'JDBC', 'MySQL', 'REST APIs', 'MVC'],
    type: 'internship',
  },
]

// ─── Education (exactly from resume) ──────────────────────────────────────────
export const EDUCATION: Education[] = [
  {
    id: 'ait-be',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    institution: 'Adichunchanagiri Institute of Technology, Chikkamagaluru',
    period: '2022 – 2026',
    grade: '8.3 CGPA',
    description:
      'Pursuing B.E. in Computer Science at AIT, Chikkamagaluru, with a strong focus on Java full-stack development, web technologies, and AI/ML research.',
    highlights: [
      'CGPA: 8.3',
      'IEEE research paper published',
      'Java Full Stack Internship (Dhee Coding Lab)',
      '3 industry-recognized certifications',
    ],
  },
  {
    id: 'mdr-puc',
    degree: 'Higher Secondary Education (Class 12)',
    field: 'Science (PCM)',
    institution: 'MDR PU Science College, Tumakuru',
    period: '2020 – 2022',
    grade: '86.66%',
    description:
      'Completed higher secondary education in Science stream with 86.66%, building a strong foundation in Mathematics, Physics, and Computer Science.',
    highlights: [
      'Percentage: 86.66%',
      'Science stream (PCM)',
      'Strong mathematics foundation',
    ],
  },
]

// ─── Research ─────────────────────────────────────────────────────────────────
export const RESEARCH: Research[] = [
  {
    id: 'flood-detection',
    title: 'Flood Detection and Mapping: A Comprehensive Survey of SAR and Deep Learning Approaches',
    conference: 'IEEE International Conference',
    year: '2025',
    abstract:
      'This paper presents a comprehensive survey of flood detection and mapping techniques utilizing Synthetic Aperture Radar (SAR) imagery combined with deep learning approaches. We review state-of-the-art architectures and propose improvements for real-world deployment scenarios.',
    keywords: ['SAR', 'Deep Learning', 'Flood Detection', 'Remote Sensing', 'Computer Vision', 'CNN'],
    status: 'published',
  },
]

// ─── Contact (exactly from resume) ────────────────────────────────────────────
export const CONTACT: ContactInfo = {
  email: 'yogeshhk098@gmail.com',
  phone: '+91-7483156309',
  linkedin: 'https://www.linkedin.com/in/yogesh-h-k',
  github: 'https://github.com/Yogesh7564',
  location: 'Chikkamagaluru, Karnataka, India',
}
