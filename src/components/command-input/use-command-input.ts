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

  /**
   * Clear frozen suggestions and close autocomplete
   */
  const clearAutocomplete = useCallback(() => {
    setFrozenSuggestions([])
    autocomplete.reset()
  }, [autocomplete])

  // Use frozen suggestions when open, otherwise calculate current suggestions
  const currentSuggestions = autocomplete.isOpen
    ? frozenSuggestions
    : enableAutocomplete
      ? autocomplete.getCurrentSuggestions(command)
      : []

  /**
   * Handle Tab key - Autocomplete
   */
  const handleTabKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!enableAutocomplete) return false

      e.preventDefault() // Prevent focus change

      // Get current matches before Tab action
      const suggestions = autocomplete.getCurrentSuggestions(command)
      const {completed, shouldUpdateInput, shouldOpen} = autocomplete.handleTab(command)

      // Freeze suggestions when opening
      if (shouldOpen) {
        setFrozenSuggestions(suggestions)
      }

      // Update command if autocompleted (single match)
      if (shouldUpdateInput) {
        setCommand(completed)
        setFrozenSuggestions([])
      }

      return true
    },
    [command, enableAutocomplete, autocomplete],
  )

  /**
   * Handle Escape key - Close autocomplete
   */
  const handleEscapeKey = useCallback(() => {
    autocomplete.closeSuggestions()
    setFrozenSuggestions([])
  }, [autocomplete])

  /**
   * Handle Enter key - Execute command
   */
  const handleEnterKey = useCallback(() => {
    onCommand(command)
    setCommand('')
    clearAutocomplete()
  }, [command, onCommand, clearAutocomplete])

  /**
   * Handle Arrow Up key - Navigate to previous command in history
   */
  const handleArrowUpKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault() // Prevent cursor movement
      if (onNavigatePrevious) {
        const previousCommand = onNavigatePrevious(command)
        setCommand(previousCommand)
      }
    },
    [command, onNavigatePrevious],
  )

  /**
   * Handle Arrow Down key - Navigate to next command in history
   */
  const handleArrowDownKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault() // Prevent cursor movement
      if (onNavigateNext) {
        const nextCommand = onNavigateNext(command)
        setCommand(nextCommand)
      }
    },
    [command, onNavigateNext],
  )

  /**
   * Main keyboard event handler - delegates to specific key handlers
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Tab':
          handleTabKey(e)
          break
        case 'Escape':
          handleEscapeKey()
          break
        case 'Enter':
          handleEnterKey()
          break
        case 'ArrowUp':
          handleArrowUpKey(e)
          break
        case 'ArrowDown':
          handleArrowDownKey(e)
          break
        default:
          // No action for other keys
          break
      }
    },
    [handleTabKey, handleEscapeKey, handleEnterKey, handleArrowUpKey, handleArrowDownKey],
  )

  /**
   * Handle input change
   */
  const handleChange = useCallback((value: string) => {
    setCommand(value)
    // Keep suggestions open and unchanged while typing
    // Suggestions stay static until closed by Enter or Escape
  }, [])

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
