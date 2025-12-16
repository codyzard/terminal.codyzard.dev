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
    <div className="h-screen overflow-y-auto font-mono terminal" onClick={focusInput}>
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
