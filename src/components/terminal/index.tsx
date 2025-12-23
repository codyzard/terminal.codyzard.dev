'use client'
import CommandHistory from '../command-history'
import CommandInput from '../command-input'
import {MatrixRain} from '../matrix-rain'
import {useIsMounted} from '@/src/hooks/use-is-mounted'
import {useMatrix} from '@/src/contexts/matrix-context'
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

  const {isMatrixEnabled} = useMatrix()
  const isMounted = useIsMounted()

  const requestScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      historyEndRef.current?.scrollIntoView({behavior: 'smooth'})
    })
  }, [historyEndRef])

  return (
    <div
      className='terminal relative h-screen overflow-y-auto p-4 font-mono text-sm md:text-base'
      onClick={focusInput}
      style={isMounted && isMatrixEnabled ? {backgroundColor: 'transparent'} : undefined}
    >
      {isMounted && isMatrixEnabled && (
        <div className='pointer-events-none fixed inset-0 z-0 bg-black'>
          <MatrixRain className='absolute inset-0' opacity={0.15} />
        </div>
      )}
      <div className='relative z-10'>
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
    </div>
  )
}
