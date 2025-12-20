import type {ReactNode} from 'react'
import {commandRegistry} from './command-registry'

type TokenType = 'command' | 'arg' | 'error'

type Token = {
  type: TokenType
  value: string
}

/**
 * Parse command string into tokens for syntax highlighting
 */
export const parseCommand = (input: string): Token[] => {
  if (!input.trim()) {
    return []
  }

  const parts = input.trim().split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Check if command exists
  const commandExists = commandRegistry.has(commandName)

  const tokens: Token[] = [
    {
      type: commandExists ? 'command' : 'error',
      value: parts[0],
    },
  ]

  // Add arguments
  args.forEach((arg) => {
    tokens.push({
      type: 'arg',
      value: arg,
    })
  })

  return tokens
}

/**
 * Render highlighted command with CSS variables
 */
export const HighlightedCommand = ({command}: {command: string}): ReactNode => {
  const tokens = parseCommand(command)

  if (tokens.length === 0) {
    return <span>{command}</span>
  }

  return (
    <span>
      {tokens.map((token, index) => (
        <span key={index}>
          <span
            style={{
              color: `var(--${token.type}-color, var(--text-color))`,
            }}
          >
            {token.value}
          </span>
          {index < tokens.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

/**
 * Get inline style for a token type
 */
export const getTokenStyle = (type: TokenType): React.CSSProperties => {
  return {
    color: `var(--${type}-color, var(--text-color))`,
  }
}
