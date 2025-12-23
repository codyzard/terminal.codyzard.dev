import type {Command} from '../../types'
import {MatrixToggle} from './matrix-toggle'

export const matrixCommand: Command = {
  name: 'matrix',
  description: 'Toggle Matrix digital rain effect in terminal background.',
  execute: () => ({
    content: <MatrixToggle />,
  }),
}
