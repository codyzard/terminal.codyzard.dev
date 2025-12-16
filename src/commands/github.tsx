import type {Command} from '../types'
import {userData} from '../config/user-data'

export const githubCommand: Command = {
  name: 'github',
  description: 'Opens my GitHub profile in a new tab.',
  execute: () => {
    window.open(userData.github, '_blank')
    return {content: 'Opening GitHub profile in a new tab...'}
  },
}
