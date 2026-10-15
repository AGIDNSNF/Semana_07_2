import { useEffect } from 'react'
import { ThemeContext } from './ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)

    // Cleanup activo
    return () => {
      console.log(`🧹 Limpiando tema: ${theme}`)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}