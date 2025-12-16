import type {ReactNode} from 'react'
import type {ThemeName} from '../contexts/theme-context'

// Base result - used for normal output
type BaseExecutionResult = {
  content: string | ReactNode
  isError?: boolean
}

// Clear action - clears terminal history
type ClearExecutionResult = BaseExecutionResult & {
  specialAction: 'clear'
}

// SetTheme action - changes terminal theme
type SetThemeExecutionResult = BaseExecutionResult & {
  specialAction: 'setTheme'
  themeName: ThemeName
}

// Union type - easy to extend with new actions
export type ExecutionResult =
  | BaseExecutionResult
  | ClearExecutionResult
  | SetThemeExecutionResult

export type TerminalOutput = {
  type: 'input' | 'output'
  content: string | ReactNode
  isError?: boolean
}

export type Command = {
  name: string
  description: string
  execute: (args?: string[]) => ExecutionResult
}
