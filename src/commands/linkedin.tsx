import type {Command} from '../types'
import {userData} from '../config/user-data'

export const linkedinCommand: Command = {
  name: 'linkedin',
  description: 'Opens my LinkedIn profile in a new tab.',
  execute: () => {
    window.open(userData.linkedin, '_blank')
    return {content: 'Opening LinkedIn profile in a new tab...'}
  },
}
