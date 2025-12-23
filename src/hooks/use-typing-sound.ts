import {useCallback, useRef} from 'react'
import {useAudio} from '../contexts/audio-context'

/**
 * Hook for playing typing sound effects
 * Uses Web Audio API to generate retro keyboard sounds
 */
export const useTypingSound = () => {
  const {isAudioEnabled, isTypingSoundEnabled, volume} = useAudio()
  const audioContextRef = useRef<AudioContext | null>(null)

  const playTypingSound = useCallback(() => {
    if (!isAudioEnabled || !isTypingSoundEnabled) return

    // Lazy init AudioContext (user gesture required)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const ctx = audioContextRef.current
    if (!ctx) return

    try {
      // Create oscillator for the "click" sound
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Configure sound - short, high-pitched click
      oscillator.type = 'square'
      oscillator.frequency.value = 800 + Math.random() * 200 // Random pitch variation

      // Volume envelope
      gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

      // Play
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.05)
    } catch (error) {
      console.warn('Failed to play typing sound:', error)
    }
  }, [isAudioEnabled, isTypingSoundEnabled, volume])

  return {playTypingSound}
}
