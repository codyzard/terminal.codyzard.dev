import {useState, useCallback} from 'react'

interface UseCommandAutocompleteOptions {
  availableCommands: string[]
  minCharsForSuggestions?: number
}

/**
 * Custom hook for command autocomplete functionality
 * Mimics standard terminal behavior:
 * - 1 match: complete immediately
 * - Multiple matches: show list below
 */
export const useCommandAutocomplete = ({
  availableCommands,
  minCharsForSuggestions = 0,
}: UseCommandAutocompleteOptions) => {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Get filtered suggestions based on input
   * Uses prefix matching for simplicity
   */
  const getSuggestions = useCallback(
    (input: string): string[] => {
      const trimmedInput = input.trim().toLowerCase()

      // Return empty if input is too short
      if (trimmedInput.length < minCharsForSuggestions) {
        return []
      }

      // Filter commands that start with the input
      const suggestions = availableCommands.filter((cmd) =>
        cmd.toLowerCase().startsWith(trimmedInput),
      )

      // Sort by length (shorter matches first)
      return suggestions.sort((a, b) => a.length - b.length)
    },
    [availableCommands, minCharsForSuggestions],
  )

  /**
   * Get current suggestions for given input
   */
  const getCurrentSuggestions = useCallback(
    (input: string) => {
      return getSuggestions(input)
    },
    [getSuggestions],
  )

  /**
   * Handle Tab key press
   * Terminal-style behavior:
   * - 1 match: complete immediately
   * - Multiple matches: show list (toggle on subsequent Tab)
   */
  const handleTab = useCallback(
    (currentInput: string): {completed: string; shouldOpen: boolean; shouldUpdateInput: boolean} => {
      const suggestions = getSuggestions(currentInput)

      // No suggestions
      if (suggestions.length === 0) {
        return {completed: currentInput, shouldOpen: false, shouldUpdateInput: false}
      }

      // Single suggestion - complete immediately
      if (suggestions.length === 1) {
        setIsOpen(false)
        return {completed: suggestions[0], shouldOpen: false, shouldUpdateInput: true}
      }

      // Multiple suggestions - toggle list display
      if (!isOpen) {
        // First Tab - show suggestions
        setIsOpen(true)
        return {completed: currentInput, shouldOpen: true, shouldUpdateInput: false}
      } else {
        // Subsequent Tab - close suggestions
        setIsOpen(false)
        return {completed: currentInput, shouldOpen: false, shouldUpdateInput: false}
      }
    },
    [getSuggestions, isOpen],
  )

  /**
   * Open suggestions (show the list)
   */
  const openSuggestions = useCallback(() => {
    setIsOpen(true)
  }, [])

  /**
   * Close suggestions
   */
  const closeSuggestions = useCallback(() => {
    setIsOpen(false)
  }, [])

  /**
   * Reset autocomplete state
   */
  const reset = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    getSuggestions,
    getCurrentSuggestions,
    handleTab,
    openSuggestions,
    closeSuggestions,
    reset,
  }
}
