import type {ReactNode} from 'react'

export type ExecutionResult = {
  content: string | ReactNode
  isError?: boolean
  specialAction?: 'clear'
}

export type TerminalOutput = {
  type: 'input' | 'output'
  content: string | ReactNode
  isError?: boolean
}

export type Command = {
  name: string
  description: string
  execute: (args: string[]) => { content: string | ReactNode; isError?: boolean }
}
