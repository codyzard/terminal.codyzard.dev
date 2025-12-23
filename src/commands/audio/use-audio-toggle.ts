import {useEffect, useRef, useState} from 'react'
import {useAudio} from '../../contexts/audio-context'
import {useTerminalScroll} from '../../contexts/terminal-scroll-context'

export const useAudioToggle = () => {
  const {isAudioEnabled, isTypingSoundEnabled, toggleAudio} = useAudio()
  const {requestScroll} = useTerminalScroll()
  const [action, setAction] = useState<'enabled' | 'disabled' | null>(null)
  const hasToggledRef = useRef(false)

  // Toggle ONCE on mount
  useEffect(() => {
    if (!hasToggledRef.current) {
      hasToggledRef.current = true

      const willBeEnabled = !isAudioEnabled
      toggleAudio()
      setAction(willBeEnabled ? 'enabled' : 'disabled')

      setTimeout(() => requestScroll(), 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    action,
    isTypingSoundEnabled,
  }
}
