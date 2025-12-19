'use client'
import CommandHistory from '../command-history'
import CommandInput from '../command-input'
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

  return (
    <div
      className="terminal h-screen overflow-y-auto p-4 font-mono text-sm md:p-6 md:text-base lg:p-8"
      onClick={focusInput}
    >
      <CommandHistory history={history} />
      <CommandInput
        ref={inputRef}
        onCommand={handleCommand}
        onNavigatePrevious={navigatePrevious}
        onNavigateNext={navigateNext}
        availableCommands={availableCommands}
      />
      <div ref={historyEndRef} />
    </div>
  )
}
