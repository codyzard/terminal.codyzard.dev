import type {Command} from '../types'

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Opens my professional Resume in a new browser tab.',
  execute: () => {
    window.open('/resume.pdf', '_blank')

    return {
      content: 'Opening Resume in a new tab...',
    }
  },
}
