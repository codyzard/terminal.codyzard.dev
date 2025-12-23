'use client'

import {MatrixRain} from '../matrix-rain'
import {useIsMounted} from '@/src/hooks/use-is-mounted'
import {useMatrix} from '@/src/contexts/matrix-context'

/**
 * Matrix rain background for terminal
 * Only renders after client-side mount to avoid hydration issues
 */
export const TerminalMatrixBackground = () => {
  const {isMatrixEnabled} = useMatrix()
  const isMounted = useIsMounted()

  if (!isMounted || !isMatrixEnabled) {
    return null
  }

  return (
    <div className='pointer-events-none fixed inset-0 z-0 bg-black'>
      <MatrixRain className='absolute inset-0' opacity={0.15} />
    </div>
  )
}
