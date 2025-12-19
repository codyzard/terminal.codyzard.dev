import type {Command} from '../../types'
import {SnakeGame} from './snake-game'

export const snakeCommand: Command = {
  name: 'snake',
  description: 'Play the classic Snake game in your terminal.',
  execute: () => ({
    content: <SnakeGame />,
  }),
}
