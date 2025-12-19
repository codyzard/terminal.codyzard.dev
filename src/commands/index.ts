import {commandRegistry} from '../utils/command-registry'
import {awardsCommand} from './awards'
import {blogCommand} from './blog'
import {clearCommand} from './clear'
import {contactCommand} from './contact'
import {githubCommand} from './github'
import {helpCommand, setCommandRegistry} from './help'
import {linkedinCommand} from './linkedin'
import {neofetchCommand} from './neofetch'
import {resumeCommand} from './resume'
import {skillsCommand} from './skills'
import {snakeCommand} from './snake'
import {summaryCommand} from './summary'
import {themeCommand} from './theme'
import {typingCommand} from './typing'
import {weatherCommand} from './weather'
import {welcomeCommand} from './welcome'
import {whoamiCommand} from './whoami'

// Register all commands in the registry
commandRegistry.register(clearCommand, ['cls']) // Add alias 'cls' for clear
commandRegistry.register(resumeCommand, ['cv']) // Add alias 'cv' for resume
commandRegistry.register(githubCommand, ['gh']) // Add alias 'gh' for github
commandRegistry.register(linkedinCommand, ['li']) // Add alias 'li' for linkedin
commandRegistry.register(neofetchCommand, ['nf', 'fetch']) // Add aliases for neofetch

commandRegistry.registerBulk([
  helpCommand,
  summaryCommand,
  contactCommand,
  welcomeCommand,
  whoamiCommand,
  skillsCommand,
  awardsCommand,
  weatherCommand,
  themeCommand,
  blogCommand,
  typingCommand,
  snakeCommand,
])

// Set the registry for help command to access
// Convert to object for backward compatibility
setCommandRegistry(commandRegistry.toObject())

// Export the registry instance
export {commandRegistry}

// Export commands object for backward compatibility
export const commands = commandRegistry.toObject()
