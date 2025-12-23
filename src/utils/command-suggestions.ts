import {commandRegistry} from '../commands'
import {findSimilarStrings} from './string-similarity/index'

/**
 * Find similar commands based on user input
 * @param input - The command that was not found
 * @param threshold - Minimum similarity score (default: 0.4)
 * @param maxSuggestions - Maximum number of suggestions (default: 3)
 * @returns Array of suggested command names
 */
export const suggestCommands = (input: string, threshold = 0.4, maxSuggestions = 3): string[] => {
  // Get all available command names (including aliases)
  const allCommands = commandRegistry.getNames()

  // Find similar commands
  return findSimilarStrings(input, allCommands, threshold, maxSuggestions)
}
