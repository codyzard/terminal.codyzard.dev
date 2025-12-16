import {useState, useEffect, useCallback} from 'react'

type SetValue<T> = T | ((prevValue: T) => T)

/**
 * Custom hook for managing localStorage with React state
 * @param key - The localStorage key
 * @param defaultValue - The default value if key doesn't exist
 * @returns [value, setValue] tuple similar to useState
 */
export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  // Initialize state with value from localStorage or default
  const [value, setValue] = useState<T>(() => {
    // Return default value during SSR
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  // Update localStorage when value changes
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, value])

  // Memoized setter function
  const updateValue = useCallback((newValue: SetValue<T>) => {
    setValue((prevValue) => {
      const valueToStore = newValue instanceof Function ? newValue(prevValue) : newValue
      return valueToStore
    })
  }, [])

  return [value, updateValue] as const
}
