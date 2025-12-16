'use client'
import type {ReactNode} from 'react'
import {createContext, useContext} from 'react'
import {useLocalStorage} from '../hooks/use-local-storage'

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
  const [theme, setTheme] = useLocalStorage<ThemeName>('terminal-theme', 'dark')

  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

type ThemeWrapperProps = {
  children: ReactNode
}

export const ThemeWrapper = ({children}: ThemeWrapperProps) => {
  const {theme} = useTheme()

  return <div className={`app-container ${theme}`}>{children}</div>
}
