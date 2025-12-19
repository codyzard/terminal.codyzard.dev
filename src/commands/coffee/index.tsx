import type {Command} from '../../types'
import type {CoffeeStrength, CoffeeTemp, CoffeeType} from './types'
import {CoffeeDisplay} from './components/coffee-display'
import {CoffeeStatsDisplay} from './components/coffee-stats-display'

export const coffeeCommand: Command = {
  name: 'coffee',
  description: 'Brew coffee! Try: coffee, coffee espresso iced, coffee stats',
  execute: (args) => {
    // Show stats
    if (args?.[0] === 'stats') {
      return {content: <CoffeeStatsDisplay />}
    }

    // Parse arguments
    const input = args?.join(' ').toLowerCase() || ''

    // Determine coffee type
    let coffeeType: CoffeeType = 'regular'
    if (input.includes('espresso')) coffeeType = 'espresso'
    else if (input.includes('cappuccino')) coffeeType = 'cappuccino'
    else if (input.includes('mocha')) coffeeType = 'mocha'
    else if (input.includes('latte')) coffeeType = 'latte'

    // Determine strength
    let strength: CoffeeStrength = 'regular'
    if (input.includes('strong')) strength = 'strong'
    else if (input.includes('decaf')) strength = 'decaf'

    // Determine temperature
    const temp: CoffeeTemp = input.includes('iced') ? 'iced' : 'hot'

    return {
      content: <CoffeeDisplay coffeeType={coffeeType} strength={strength} temp={temp} />,
    }
  },
}
