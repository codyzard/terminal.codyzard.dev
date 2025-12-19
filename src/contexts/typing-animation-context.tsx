'use client'
import type {ReactNode} from 'react'
import {createContext, useContext} from 'react'
import {useLocalStorage} from '../hooks/use-local-storage'

interface TypingAnimationContextType {
  enabled: boolean
  speed: number
  setEnabled: (enabled: boolean) => void
  setSpeed: (speed: number) => void
}

const defaultContextValue: TypingAnimationContextType = {
  enabled: false,
  speed: 300,
  setEnabled: () => {},
  setSpeed: () => {},
}

export const TypingAnimationContext =
  createContext<TypingAnimationContextType>(defaultContextValue)

interface TypingAnimationProviderProps {
  children: ReactNode
}

export const TypingAnimationProvider: React.FC<TypingAnimationProviderProps> = ({children}) => {
  const [enabled, setEnabled] = useLocalStorage<boolean>('terminal-typing-animation', false)
  const [speed, setSpeed] = useLocalStorage<number>('terminal-typing-speed', 300)

  return (
    <TypingAnimationContext.Provider value={{enabled, speed, setEnabled, setSpeed}}>
      {children}
    </TypingAnimationContext.Provider>
  )
}

export const useTypingAnimation = () => useContext(TypingAnimationContext)
