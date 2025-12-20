import type {ExecutionResult} from '../types'
import {commandRegistry} from '../commands'

export const executeCommand = (fullCommand: string): ExecutionResult => {
  const parts = fullCommand.trim().split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Get command from registry (supports aliases)
  const command = commandRegistry.get(commandName)

  if (command) {
    return command.execute(args)
  }

  // Handle command not found
  return {
    content: (
      <>
        <span className='text-red-500'>Error:</span> Command **&apos;{commandName}&apos;** not
        found.
        <br />
        Type **&apos;help&apos;** to see available commands.
      </>
    ),
    isError: true,
  }
}
