import {useState, useRef, useEffect, useCallback, type KeyboardEvent} from 'react'
import {useCommandAutocomplete} from '@/src/hooks/use-command-autocomplete'

interface UseCommandInputOptions {
  onCommand: (command: string) => void
  onNavigatePrevious?: (currentCommand: string) => string
  onNavigateNext?: (currentCommand: string) => string
  availableCommands?: string[]
  enableAutocomplete?: boolean
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
  availableCommands = [],
  enableAutocomplete = true,
  autoFocus = true,
}: UseCommandInputOptions) => {
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Store frozen suggestions when Tab is pressed
  const [frozenSuggestions, setFrozenSuggestions] = useState<string[]>([])

  // Autocomplete functionality
  const autocomplete = useCommandAutocomplete({
    availableCommands,
    minCharsForSuggestions: 0,
  })

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

  // Use frozen suggestions when open, otherwise calculate current suggestions
  const currentSuggestions = autocomplete.isOpen
    ? frozenSuggestions
    : (enableAutocomplete ? autocomplete.getCurrentSuggestions(command) : [])

  /**
   * Handle keyboard events (Enter, Arrow Up, Arrow Down, Tab, Escape)
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // Handle Tab key - Autocomplete
      if (e.key === 'Tab' && enableAutocomplete) {
        e.preventDefault() // Prevent focus change

        // Get current matches before Tab action
        const suggestions = autocomplete.getCurrentSuggestions(command)

        const {completed, shouldUpdateInput, shouldOpen} = autocomplete.handleTab(command)

        // Freeze suggestions when opening
        if (shouldOpen) {
          setFrozenSuggestions(suggestions)
        }

        if (shouldUpdateInput) {
          setCommand(completed)
          // Clear frozen suggestions after autocomplete
          setFrozenSuggestions([])
        }
        return
      }

      // Handle Escape key - Close autocomplete
      if (e.key === 'Escape') {
        autocomplete.closeSuggestions()
        setFrozenSuggestions([])
        return
      }

      // Handle Enter key - execute command
      if (e.key === 'Enter') {
        onCommand(command)
        setCommand('')
        autocomplete.reset()
        setFrozenSuggestions([])
        return
      }

      // Handle Up Arrow - command history only
      if (e.key === 'ArrowUp') {
        e.preventDefault() // Prevent cursor movement
        if (onNavigatePrevious) {
          const previousCommand = onNavigatePrevious(command)
          setCommand(previousCommand)
        }
        return
      }

      // Handle Down Arrow - command history only
      if (e.key === 'ArrowDown') {
        e.preventDefault() // Prevent cursor movement
        if (onNavigateNext) {
          const nextCommand = onNavigateNext(command)
          setCommand(nextCommand)
        }
        return
      }
    },
    [
      command,
      onCommand,
      onNavigatePrevious,
      onNavigateNext,
      enableAutocomplete,
      autocomplete,
      setFrozenSuggestions,
    ],
  )

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (value: string) => {
      setCommand(value)
      // Keep suggestions open and unchanged while typing
      // Suggestions stay static until closed by Enter or Escape
    },
    [],
  )

  return {
    command,
    inputRef,
    focusInput,
    handleKeyDown,
    handleChange,
    // Autocomplete state
    suggestions: currentSuggestions,
    showSuggestions: autocomplete.isOpen && currentSuggestions.length > 0,
  }
}
