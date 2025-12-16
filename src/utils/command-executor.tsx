import type {ExecutionResult} from '../types'
import {commands} from '../commands'

export const executeCommand = (fullCommand: string): ExecutionResult => {
  const parts = fullCommand.trim().split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)

  const command = commands[commandName]

  if (command) {
    return command.execute(args)
  }

  // Xử lý lệnh không tồn tại
  return {
    content: (
      <>
        <span className="text-red-500">Error:</span> Command **&apos;{commandName}&apos;** not
        found.
        <br />
        Type **&apos;help&apos;** to see available commands.
      </>
    ),
    isError: true,
  }
}
