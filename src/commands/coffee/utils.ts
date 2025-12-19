import type {CoffeeStrength, CoffeeTemp, CoffeeType} from './types'
import {
  AFTERNOON_QUOTES,
  COFFEE_TYPES,
  EVENING_QUOTES,
  GENERAL_QUOTES,
  MORNING_QUOTES,
} from './constants'

// ============================================================================
// Quote Helpers
// ============================================================================

export const getTimeBasedQuotes = (): string[] => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return MORNING_QUOTES
  if (hour >= 12 && hour < 18) return AFTERNOON_QUOTES
  if (hour >= 18 || hour < 5) return EVENING_QUOTES
  return GENERAL_QUOTES
}

export const getRandomQuote = (): string => {
  const quotes = [...getTimeBasedQuotes(), ...GENERAL_QUOTES]
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// ============================================================================
// Caffeine Calculation
// ============================================================================

export const calculateCaffeine = (
  type: CoffeeType,
  strength: CoffeeStrength,
  temp: CoffeeTemp,
): number => {
  let caffeine = COFFEE_TYPES[type].caffeine
  if (strength === 'strong') caffeine *= 1.5
  if (strength === 'decaf') caffeine *= 0.1
  if (temp === 'iced') caffeine *= 0.9
  return Math.round(caffeine)
}
