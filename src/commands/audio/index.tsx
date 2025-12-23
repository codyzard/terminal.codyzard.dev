import type {Command} from '../../types'
import {AudioToggle} from './audio-toggle'

export const audioCommand: Command = {
  name: 'audio',
  description: 'Toggle audio effects (typing sounds).',
  execute: () => ({
    content: <AudioToggle />,
  }),
}
