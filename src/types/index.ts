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

// SetTypingAnimation action - toggle typing animation
type SetTypingAnimationExecutionResult = BaseExecutionResult & {
  specialAction: 'setTypingAnimation'
  enabled: boolean
}

// SetTypingSpeed action - set typing speed
type SetTypingSpeedExecutionResult = BaseExecutionResult & {
  specialAction: 'setTypingSpeed'
  speed: number
}

// Union type - easy to extend with new actions
export type ExecutionResult =
  | BaseExecutionResult
  | ClearExecutionResult
  | SetThemeExecutionResult
  | SetTypingAnimationExecutionResult
  | SetTypingSpeedExecutionResult

export type TerminalOutput = {
  id: string
  type: 'input' | 'output'
  content: string | ReactNode
  isError?: boolean
}

export type Command = {
  name: string
  description: string
  execute: (args?: string[]) => ExecutionResult
}
