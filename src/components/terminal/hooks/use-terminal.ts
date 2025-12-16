import type {TerminalOutput} from '@/src/types'
import {executeCommand} from '@/src/utils/command-executor'
import type {CommandInputRef} from '../../command-input'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useTheme} from '@/src/contexts/theme-context'
import {useCommandHistory} from '@/src/hooks/use-command-history'

export const useTerminal = () => {
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

  // focus input when terminal is clicked
  const focusInput = () => {
    inputRef.current?.focusInput()
  }

  // Automatically scroll to the bottom when there is new output
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [history])

  // Handle special actions and return whether to clear history
  const handleSpecialAction = useCallback(
    (output: ReturnType<typeof executeCommand>): boolean => {
      if ('specialAction' in output) {
        if (output.specialAction === 'setTheme') {
          setTheme(output.themeName)
          return false // Don't clear history
        }
        if (output.specialAction === 'clear') {
          return true // Clear history
        }
      }
      return false
    },
    [setTheme],
  )

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

  // Add global keyboard shortcut for 'clear' command (Cmd + K or Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Condition: Key 'k' (case-insensitive)
      // AND (CmdKey on Mac OR CtrlKey on Windows/Linux)
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault() // Very important: Prevent the browser from opening Quick Find or other default actions

        // Call clear command
        handleCommand('clear')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCommand])

  return {
    history,
    historyEndRef,
    inputRef,
    focusInput,
    handleCommand,
    navigatePrevious,
    navigateNext,
  }
}
