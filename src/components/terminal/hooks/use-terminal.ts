import type {TerminalOutput} from '@/src/types'
import {executeCommand} from '@/src/utils/command-executor'
import type {CommandInputRef} from '../../command-input'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useTheme} from '@/src/contexts/theme-context'
import {useCommandHistory} from '@/src/hooks/use-command-history'
import {commandRegistry} from '@/src/commands'
import {useGlobalKeyboardShortcuts} from './use-global-keyboard-shortcuts'

export const useTerminal = () => {
  // Get available commands for autocomplete
  const availableCommands = commandRegistry.getNames()
  const [history, setHistory] = useState<TerminalOutput[]>(() => {
    const welcomeOutput = executeCommand('welcome')
    return [
      {type: 'input', content: 'welcome'},
      {type: 'output', content: welcomeOutput.content, isError: welcomeOutput.isError},
    ]
  })
  const historyEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<CommandInputRef>(null)
  const {setTheme} = useTheme()

  // Command history navigation
  const {addToHistory, navigatePrevious, navigateNext} = useCommandHistory({
    maxSize: 100,
    persistToStorage: true,
  })

  /**
   * Focus input when terminal is clicked
   */
  const focusInput = useCallback(() => {
    inputRef.current?.focusInput()
  }, [])

  // Automatically scroll to the bottom when there is new output
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [history])

  /**
   * Handle special actions and return whether to clear history
   */
  const handleSpecialAction = useCallback(
    (output: ReturnType<typeof executeCommand>): boolean => {
      if (!('specialAction' in output)) {
        return false
      }

      switch (output.specialAction) {
        case 'setTheme':
          setTheme(output.themeName)
          return false // Don't clear history
        case 'clear':
          return true // Clear history
        default:
          return false
      }
    },
    [setTheme],
  )

  /**
   * Handle command execution
   */
  const handleCommand = useCallback(
    (command: string) => {
      // Add to command history (for up/down navigation)
      addToHistory(command)

      if (!command.trim()) {
        setHistory((prev) => [...prev, {type: 'input', content: command}])
        return
      }

      // 1. Execute command and get output
      const output = executeCommand(command)

      // 2. Handle special actions (side effects)
      const shouldClear = handleSpecialAction(output)

      // 3. Update history based on action
      if (shouldClear) {
        setHistory([])
        return
      }

      setHistory((prev) => [
        ...prev,
        {type: 'input', content: command},
        {type: 'output', content: output.content, isError: output.isError},
      ])
    },
    [handleSpecialAction, addToHistory],
  )

  // Setup global keyboard shortcuts
  useGlobalKeyboardShortcuts({
    onClear: () => handleCommand('clear'),
  })

  return {
    history,
    historyEndRef,
    inputRef,
    focusInput,
    handleCommand,
    navigatePrevious,
    navigateNext,
    availableCommands,
  }
}
