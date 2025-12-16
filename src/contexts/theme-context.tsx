'use client'
import type {ReactNode} from 'react'
import {createContext, useState, useContext} from 'react'

export type ThemeName = 'dark' | 'light' | 'hacker'

interface ThemeContextType {
  theme: ThemeName
  setTheme: (name: ThemeName) => void
}

const defaultContextValue: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return 'dark'

    const savedTheme = localStorage.getItem('terminal-theme') as ThemeName
    return savedTheme || 'dark'
  })

  const handleSetTheme = (name: ThemeName) => {
    setTheme(name)
    localStorage.setItem('terminal-theme', name)
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme: handleSetTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

type ThemeWrapperProps = {
  children: ReactNode
}

export const ThemeWrapper = ({children}: ThemeWrapperProps) => {
  const {theme} = useTheme()

  return <div className={`app-container ${theme}`}>{children}</div>
}
