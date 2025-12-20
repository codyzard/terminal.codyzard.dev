'use client'
import type {ReactNode} from 'react'
import {createContext, useContext} from 'react'

type TerminalScrollContextType = {
  requestScroll: () => void
}

const defaultContextValue: TerminalScrollContextType = {
  requestScroll: () => {},
}

export const TerminalScrollContext = createContext<TerminalScrollContextType>(defaultContextValue)

type TerminalScrollProviderProps = {
  children: ReactNode
  requestScroll: () => void
}

export const TerminalScrollProvider = ({children, requestScroll}: TerminalScrollProviderProps) => {
  return (
    <TerminalScrollContext.Provider value={{requestScroll}}>
      {children}
    </TerminalScrollContext.Provider>
  )
}

export const useTerminalScroll = () => useContext(TerminalScrollContext)
