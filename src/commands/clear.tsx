import type {Command} from '../types'

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clears the terminal history.',
  execute: () => {
    return {
      content: '',
      specialAction: 'clear',
    }
  },
}
