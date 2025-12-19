import type {Achievement, CoffeeConfig, CoffeeStats, CoffeeType} from './types'

// ============================================================================
// Storage
// ============================================================================

export const STORAGE_KEY = 'coffee-stats'

// ============================================================================
// Coffee Configurations
// ============================================================================

export const COFFEE_TYPES: Record<CoffeeType, CoffeeConfig> = {
  regular: {
    emoji: '☕',
    name: 'Regular Coffee',
    caffeine: 95,
    description: 'Classic drip coffee',
  },
  espresso: {
    emoji: '☕',
    name: 'Espresso',
    caffeine: 150,
    description: 'Strong and concentrated',
  },
  cappuccino: {
    emoji: '🧋',
    name: 'Cappuccino',
    caffeine: 80,
    description: 'Espresso with steamed milk foam',
  },
  mocha: {
    emoji: '🍫',
    name: 'Mocha',
    caffeine: 90,
    description: 'Coffee with chocolate',
  },
  latte: {
    emoji: '🥛',
    name: 'Latte',
    caffeine: 75,
    description: 'Espresso with lots of steamed milk',
  },
}

// ============================================================================
// ASCII Art Frames
// ============================================================================

export const COFFEE_FRAMES = [
  `    [  ]
   (    )
   |    |
   '----'`,
  `    [~~]
   ( ~~  )
   | ~~  |
   '-----'`,
  `    [≈≈]
   (≈≈≈≈ )
   |≈≈≈≈ |
   '-----'`,
  `    [≈≈]
   (≈≈≈≈ )
   |≈≈≈≈ |
   '-----'`,
  `    [☕]
   (≈≈≈≈ )
   |≈≈≈≈ |
   '-----'`,
]

export const FRAME_LABELS = ['Preparing...', 'Heating...', 'Brewing...', 'Finishing...', 'Done!']

// ============================================================================
// Quotes by Time of Day
// ============================================================================

export const MORNING_QUOTES = [
  'Good morning! Time to brew some productivity.',
  'Rise and grind! ☕',
  'First coffee of the day hits different.',
  'Morning coffee: The most important commit of the day.',
]

export const AFTERNOON_QUOTES = [
  'Afternoon pick-me-up! ☕',
  'Debugging afternoon slump with caffeine.',
  'Post-lunch coffee = Second wind.',
  'Coffee: Because afternoon meetings exist.',
]

export const EVENING_QUOTES = [
  'Late night coding session fuel! 🌙',
  'Burning the midnight oil with coffee.',
  'Coffee at night? Living dangerously! 😎',
  'Debug mode: Activated. Sleep mode: Deactivated.',
]

export const GENERAL_QUOTES = [
  'Debugging is twice as hard as writing code in the first place.',
  'Coffee: Because adulting is hard.',
  'Programmer: An organism that turns coffee into code.',
  'Code. Coffee. Repeat.',
]

// ============================================================================
// Achievements
// ============================================================================

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_coffee',
    name: '☕ First Brew',
    condition: (stats: CoffeeStats) => stats.totalCoffees >= 1,
  },
  {
    id: 'coffee_lover',
    name: '❤️ Coffee Lover',
    condition: (stats: CoffeeStats) => stats.totalCoffees >= 10,
  },
  {
    id: 'caffeine_addict',
    name: '⚡ Caffeine Addict',
    condition: (stats: CoffeeStats) => stats.totalCoffees >= 50,
  },
  {
    id: 'barista',
    name: '👨‍🍳 Home Barista',
    condition: (stats: CoffeeStats) => Object.keys(stats.favoriteType).length >= 4,
  },
  {
    id: 'night_owl',
    name: '🦉 Night Owl',
    condition: (_stats: CoffeeStats) => new Date().getHours() >= 22 || new Date().getHours() < 6,
  },
]
