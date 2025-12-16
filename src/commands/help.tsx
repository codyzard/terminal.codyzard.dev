import type {Command} from '../types'

// This will be injected by the command registry
let commandRegistry: {[key: string]: Command} = {}

export const setCommandRegistry = (registry: {[key: string]: Command}) => {
  commandRegistry = registry
}

export const helpCommand: Command = {
  name: 'help',
  description: 'Lists all available commands.',
  execute: () => {
    const commandList = Object.values(commandRegistry)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cmd) => (
        <div key={cmd.name} className="flex space-x-4">
          <span className="inline-block w-24 text-yellow-400">{cmd.name}</span>
          <span>{cmd.description}</span>
        </div>
      ))

    return {
      content: (
        <>
          <p className="mb-2">Available commands:</p>
          {commandList}
          <p className="mt-2">Type any command above and press Enter.</p>
        </>
      ),
    }
  },
}
