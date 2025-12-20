'use client'
import CommandHistory from '../command-history'
import CommandInput from '../command-input'
import {TerminalScrollProvider} from '@/src/contexts/terminal-scroll-context'
import {useCallback} from 'react'
import {useTerminal} from './hooks/use-terminal'

export const Terminal = () => {
  const {
    focusInput,
    history,
    inputRef,
    handleCommand,
    historyEndRef,
    navigatePrevious,
    navigateNext,
    availableCommands,
  } = useTerminal()

  const requestScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
    })
  }, [historyEndRef])

  return (
    <div
      className='terminal h-screen overflow-y-auto p-4 font-mono text-sm md:text-base'
      onClick={focusInput}
    >
      <TerminalScrollProvider requestScroll={requestScroll}>
        <CommandHistory history={history} />
        <CommandInput
          ref={inputRef}
          onCommand={handleCommand}
          onNavigatePrevious={navigatePrevious}
          onNavigateNext={navigateNext}
          availableCommands={availableCommands}
        />
        <div ref={historyEndRef} />
      </TerminalScrollProvider>
    </div>
  )
}
