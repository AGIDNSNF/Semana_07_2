import { useState, useEffect } from 'react'

export const useLocalStorage = (key, defaultValue) => {
  // Inicialización lazy: solo lee localStorage una vez
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error leyendo localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  // Sincronizar con localStorage cuando cambia el valor
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error guardando en localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}