import type {Command} from '../types'

// This will be injected by the command registry
let commandRegistry: {[key: string]: Command} = {}

export const setCommandRegistry = (registry: {[key: string]: Command}) => {
  commandRegistry = registry
}

const shortcuts = [
  {key: 'Tab', description: 'Autocomplete command (show suggestions if multiple matches)'},
  {key: '↑ / ↓', description: 'Navigate through command history'},
  {key: 'Enter', description: 'Execute command'},
  {key: 'Esc', description: 'Close autocomplete suggestions'},
  {key: 'Cmd/Ctrl + K', description: 'Clear terminal'},
]

export const helpCommand: Command = {
  name: 'help',
  description: 'Lists all available commands.',
  execute: () => {
    const commandList = Object.values(commandRegistry)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cmd) => (
        <div key={cmd.name} className="flex space-x-4">
          <span className="inline-block w-36 text-yellow-400">{cmd.name}</span>
          <span>{cmd.description}</span>
        </div>
      ))

    return {
      content: (
        <>
          <p className="mb-2 font-bold">Available commands:</p>
          <div className="mb-4">{commandList}</div>

          <p className="mt-4 mb-2 font-bold">Keyboard shortcuts:</p>
          <div className="mb-2">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.key} className="flex space-x-4">
                <span className="inline-block w-36 text-cyan-400">{shortcut.key}</span>
                <span>{shortcut.description}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-gray-400">
            Tip: Type a command and press Tab to see suggestions.
          </p>
        </>
      ),
    }
  },
}
