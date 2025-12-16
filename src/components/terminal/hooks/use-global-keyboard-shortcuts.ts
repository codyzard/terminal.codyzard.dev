import {useEffect} from 'react'

interface UseGlobalKeyboardShortcutsOptions {
  onClear: () => void
}

/**
 * Custom hook for handling global keyboard shortcuts
 * Currently handles: Cmd/Ctrl + K (clear terminal)
 */
export const useGlobalKeyboardShortcuts = ({onClear}: UseGlobalKeyboardShortcutsOptions) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K - Clear terminal
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault() // Prevent browser default (Quick Find)
        onClear()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClear])
}
