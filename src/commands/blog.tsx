import type {Command} from '../types'
import {userData} from '../config/user-data'

export const blogCommand: Command = {
  name: 'blog',
  description: 'Opens my development blog in a new tab.',
  execute: () => {
    window.open(userData.blog, '_blank')
    return {content: 'Opening blog in a new tab...'}
  },
}
