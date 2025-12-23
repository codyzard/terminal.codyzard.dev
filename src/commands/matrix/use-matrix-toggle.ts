import {useEffect, useRef, useState} from 'react'
import {useMatrix} from '../../contexts/matrix-context'
import {useTerminalScroll} from '../../contexts/terminal-scroll-context'

export const useMatrixToggle = () => {
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

  return {
    action,
  }
}
