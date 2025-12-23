import type {ExecutionResult} from '../types'
import {commandRegistry} from '../commands'
import {suggestCommands} from './command-suggestions'

export const executeCommand = (fullCommand: string): ExecutionResult => {
  const parts = fullCommand.trim().split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Get command from registry (supports aliases)
  const command = commandRegistry.get(commandName)

  if (command) {
    return command.execute(args)
  }

  // Find similar commands
  const suggestions = suggestCommands(commandName)

  // Handle command not found
  return {
    content: (
      <>
        <span className='text-red-500'>Error:</span> Command **&apos;{commandName}&apos;** not
        found.
        <br />
        {suggestions.length > 0 && (
          <>
            <br />
            <span className='text-yellow-500'>Did you mean:</span>
            <ul className='mt-1 ml-4'>
              {suggestions.map((suggestion) => (
                <li key={suggestion} className='text-[#00cc00]'>
                  {suggestion}
                </li>
              ))}
            </ul>
            <br />
          </>
        )}
        Type **&apos;help&apos;** to see available commands.
      </>
    ),
    isError: true,
  }
}
