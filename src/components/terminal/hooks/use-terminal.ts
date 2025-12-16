import type {TerminalOutput} from '@/src/types'
import {executeCommand} from '@/src/utils/command-executor'
import type {CommandInputRef} from '../../command-input'
import {useCallback, useEffect, useRef, useState} from 'react'
import type {ThemeName} from '@/src/contexts/theme-context'
import {useTheme} from '@/src/contexts/theme-context'

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

  // focus input when terminal is clicked
  const focusInput = () => {
    inputRef.current?.focusInput()
  }

  // Automatically scroll to the bottom when there is new output
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [history])

  const handleCommand = useCallback(
    (command: string) => {
      if (!command.trim()) {
        setHistory((prev) => [...prev, {type: 'input', content: command}])
        return
      }

      // Use function form to ensure the latest state update
      setHistory((prev) => {
        // 1. Process and get output
        const output = executeCommand(command)

        // Handle Theme Command
        if (output.specialAction === 'setTheme' && output.themeName) {
          setTheme(output.themeName as ThemeName) // <-- GỌI setTheme
        }

        // Check for special actions
        if (output.specialAction === 'clear') {
          return [] // Reset history to an empty array
        }

        // 2. Add input and output to history
        return [
          ...prev,
          {type: 'input', content: command},
          {type: 'output', content: output.content, isError: output.isError},
        ]
      })
    },
    [setTheme],
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
  }
}
