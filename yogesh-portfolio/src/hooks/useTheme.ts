import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme
      return stored || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (theme === 'light') {
      root.classList.add('light')
      body.classList.add('light-mode')
    } else {
      root.classList.remove('light')
      body.classList.remove('light-mode')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
