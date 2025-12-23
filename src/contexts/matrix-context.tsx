'use client'

import {createContext, useContext, type ReactNode} from 'react'
import {useLocalStorage} from '../hooks/use-local-storage'

interface MatrixContextType {
  isMatrixEnabled: boolean
  toggleMatrix: () => void
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined)

const MATRIX_STORAGE_KEY = 'terminal-matrix-enabled'

export const MatrixProvider = ({children}: {children: ReactNode}) => {
  const [isMatrixEnabled, setIsMatrixEnabled] = useLocalStorage(MATRIX_STORAGE_KEY, false)

  const toggleMatrix = () => {
    setIsMatrixEnabled((prev) => !prev)
  }

  return (
    <MatrixContext.Provider value={{isMatrixEnabled, toggleMatrix}}>
      {children}
    </MatrixContext.Provider>
  )
}

export const useMatrix = () => {
  const context = useContext(MatrixContext)
  if (context === undefined) {
    throw new Error('useMatrix must be used within a MatrixProvider')
  }
  return context
}
