import {useState, useRef, useEffect, useCallback, type KeyboardEvent} from 'react'

interface UseCommandInputOptions {
  onCommand: (command: string) => void
  onNavigatePrevious?: (currentCommand: string) => string
  onNavigateNext?: (currentCommand: string) => string
  autoFocus?: boolean
}

/**
 * Custom hook for managing command input state and keyboard interactions
 * Handles command execution, history navigation, and input focus
 */
export const useCommandInput = ({
  onCommand,
  onNavigatePrevious,
  onNavigateNext,
  autoFocus = true,
}: UseCommandInputOptions) => {
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus on mount if enabled
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  /**
   * Focus the input programmatically
   */
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  /**
   * Handle keyboard events (Enter, Arrow Up, Arrow Down)
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // Handle Enter key - Execute command
      if (e.key === 'Enter') {
        onCommand(command)
        setCommand('')
        return
      }

      // Handle Up Arrow - Navigate to previous command
      if (e.key === 'ArrowUp') {
        e.preventDefault() // Prevent cursor movement
        if (onNavigatePrevious) {
          const previousCommand = onNavigatePrevious(command)
          setCommand(previousCommand)
        }
        return
      }

      // Handle Down Arrow - Navigate to next command
      if (e.key === 'ArrowDown') {
        e.preventDefault() // Prevent cursor movement
        if (onNavigateNext) {
          const nextCommand = onNavigateNext(command)
          setCommand(nextCommand)
        }
        return
      }
    },
    [command, onCommand, onNavigatePrevious, onNavigateNext],
  )

  /**
   * Handle input change
   */
  const handleChange = useCallback((value: string) => {
    setCommand(value)
  }, [])

  return {
    command,
    inputRef,
    focusInput,
    handleKeyDown,
    handleChange,
  }
}
