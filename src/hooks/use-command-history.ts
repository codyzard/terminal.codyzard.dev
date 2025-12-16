import {useState, useCallback, useEffect} from 'react'
import {useLocalStorage} from './use-local-storage'

interface UseCommandHistoryOptions {
  maxSize?: number
  persistToStorage?: boolean
  storageKey?: string
}

/**
 * Custom hook for managing command history with navigation
 * Supports up/down arrow navigation like a real terminal
 */
export const useCommandHistory = (options: UseCommandHistoryOptions = {}) => {
  const {maxSize = 100, persistToStorage = true, storageKey = 'terminal-command-history'} = options

  // Load history from localStorage if persistence is enabled
  const [persistedHistory, setPersistedHistory] = useLocalStorage<string[]>(
    storageKey,
    persistToStorage ? [] : [],
  )

  // Use persisted history if available, otherwise empty array
  const initialHistory = persistToStorage ? persistedHistory : []
  const [history, setHistory] = useState<string[]>(initialHistory)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [temporaryCommand, setTemporaryCommand] = useState<string>('')

  // Sync history to localStorage when it changes (if persistence enabled)
  useEffect(() => {
    if (persistToStorage) {
      setPersistedHistory(history)
    }
  }, [history, persistToStorage, setPersistedHistory])

  /**
   * Add a command to history
   * Skips empty commands and duplicate consecutive commands
   */
  const addToHistory = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim()

      // Skip empty commands
      if (!trimmedCommand) {
        return
      }

      setHistory((prev) => {
        // Skip if same as last command
        if (prev.length > 0 && prev[prev.length - 1] === trimmedCommand) {
          return prev
        }

        // Add to history and limit size
        const newHistory = [...prev, trimmedCommand]
        if (newHistory.length > maxSize) {
          return newHistory.slice(-maxSize) // Keep only last maxSize items
        }
        return newHistory
      })

      // Reset navigation state
      setCurrentIndex(-1)
      setTemporaryCommand('')
    },
    [maxSize],
  )

  /**
   * Navigate to previous command (up arrow)
   * @param currentCommand - The current command in the input
   * @returns The previous command from history, or current if at beginning
   */
  const navigatePrevious = useCallback(
    (currentCommand: string): string => {
      if (history.length === 0) {
        return currentCommand
      }

      // Save current command if we're at the bottom
      if (currentIndex === -1) {
        setTemporaryCommand(currentCommand)
      }

      // Calculate new index
      const newIndex = currentIndex === -1 ? history.length - 1 : Math.max(0, currentIndex - 1)

      setCurrentIndex(newIndex)
      return history[newIndex]
    },
    [history, currentIndex],
  )

  /**
   * Navigate to next command (down arrow)
   * @param currentCommand - The current command in the input
   * @returns The next command from history, or temporary command if at end
   */
  const navigateNext = useCallback(
    (currentCommand: string): string => {
      if (history.length === 0 || currentIndex === -1) {
        return currentCommand
      }

      // Calculate new index
      const newIndex = currentIndex + 1

      // If we've reached the end, restore the temporary command
      if (newIndex >= history.length) {
        setCurrentIndex(-1)
        return temporaryCommand
      }

      setCurrentIndex(newIndex)
      return history[newIndex]
    },
    [history, currentIndex, temporaryCommand],
  )

  /**
   * Reset navigation state
   */
  const resetNavigation = useCallback(() => {
    setCurrentIndex(-1)
    setTemporaryCommand('')
  }, [])

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
    setTemporaryCommand('')
  }, [])

  /**
   * Get history size
   */
  const size = history.length

  return {
    history,
    addToHistory,
    navigatePrevious,
    navigateNext,
    resetNavigation,
    clearHistory,
    size,
    currentIndex,
  }
}
