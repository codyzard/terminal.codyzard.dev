import type {Command} from '../types'
import {blogCommand} from './blog'
import {clearCommand} from './clear'
import {contactCommand} from './contact'
import {githubCommand} from './github'
import {helpCommand, setCommandRegistry} from './help'
import {linkedinCommand} from './linkedin'
import {resumeCommand} from './resume'
import {skillsCommand} from './skills'
import {summaryCommand} from './summary'
import {themeCommand} from './theme'
import {welcomeCommand} from './welcome'

// Export all commands as a registry
export const commands: {[key: string]: Command} = {
  help: helpCommand,
  summary: summaryCommand,
  contact: contactCommand,
  welcome: welcomeCommand,
  skills: skillsCommand,
  clear: clearCommand,
  resume: resumeCommand,
  theme: themeCommand,
  blog: blogCommand,
  github: githubCommand,
  linkedin: linkedinCommand,
}

// Set the registry for help command to access
setCommandRegistry(commands)
