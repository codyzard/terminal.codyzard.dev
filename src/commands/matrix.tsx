'use client'

import {useEffect, useRef, useState} from 'react'
import {useMatrix} from '../contexts/matrix-context'
import {useTerminalScroll} from '../contexts/terminal-scroll-context'
import type {Command} from '../types'

const MatrixToggle = () => {
  const {isMatrixEnabled, toggleMatrix} = useMatrix()
  const {requestScroll} = useTerminalScroll()
  const [action, setAction] = useState<'enabled' | 'disabled' | null>(null)
  const hasToggledRef = useRef(false)

  // Toggle ONCE on mount using ref to prevent re-toggle on re-renders
  useEffect(() => {
    if (!hasToggledRef.current) {
      // Mark as toggled immediately
      hasToggledRef.current = true

      // Determine what action we're doing BEFORE toggle
      const willBeEnabled = !isMatrixEnabled

      // Do the toggle
      toggleMatrix()

      // Set the action message
      setAction(willBeEnabled ? 'enabled' : 'disabled')

      // Request scroll after toggle
      setTimeout(() => requestScroll(), 100)
    }
    // Only run on mount - no dependencies!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Show loading while determining action
  if (action === null) {
    return null
  }

  return (
    <div className='my-2 font-mono text-sm'>
      <div className='text-[#00ff00]'>
        Matrix background has been <span className='font-bold'>{action}</span>.
      </div>
      <div className='mt-1 text-[#008000]'>
        {action === 'enabled'
          ? 'Digital rain is now falling in the background...'
          : 'The Matrix has been paused.'}
      </div>
      <div className='mt-2 text-[#666]'>
        Type <span className='text-[#00cc00]'>matrix</span> again to toggle.
      </div>
    </div>
  )
}

export const matrixCommand: Command = {
  name: 'matrix',
  description: 'Toggle Matrix digital rain effect in terminal background.',
  execute: () => ({
    content: <MatrixToggle />,
  }),
}
