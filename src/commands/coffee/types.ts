export type CoffeeType = 'regular' | 'espresso' | 'cappuccino' | 'mocha' | 'latte'
export type CoffeeStrength = 'regular' | 'strong' | 'decaf'
export type CoffeeTemp = 'hot' | 'iced'

export type CoffeeStats = {
  totalCoffees: number
  currentCaffeine: number
  achievements: string[]
  lastBrew: number
  favoriteType: Record<string, number>
}

export type CoffeeConfig = {
  emoji: string
  name: string
  caffeine: number
  description: string
}

export type Achievement = {
  id: string
  name: string
  condition: (stats: CoffeeStats) => boolean
}
