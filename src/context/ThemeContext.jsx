import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check local storage first, then system preference, default to light
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    // Force remove both classes first
    root.classList.remove('light', 'dark')
    // Add the new theme class
    root.classList.add(theme)
    // Save to localStorage
    localStorage.setItem('theme', theme)
    
    // Force a CSS re-computation by toggling a temporary class
    root.style.setProperty('--theme-transition', 'true')
    requestAnimationFrame(() => {
      root.style.removeProperty('--theme-transition')
    })
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}