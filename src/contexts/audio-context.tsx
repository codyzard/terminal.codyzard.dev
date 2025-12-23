'use client'

import {createContext, useContext, type ReactNode} from 'react'
import {useLocalStorage} from '../hooks/use-local-storage'

interface AudioContextType {
  isAudioEnabled: boolean
  isMusicEnabled: boolean
  isTypingSoundEnabled: boolean
  volume: number
  toggleAudio: () => void
  toggleMusic: () => void
  toggleTypingSound: () => void
  setVolume: (volume: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

const AUDIO_STORAGE_KEY = 'terminal-audio-enabled'
const MUSIC_STORAGE_KEY = 'terminal-music-enabled'
const TYPING_SOUND_STORAGE_KEY = 'terminal-typing-sound-enabled'
const VOLUME_STORAGE_KEY = 'terminal-volume'

export const AudioProvider = ({children}: {children: ReactNode}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useLocalStorage(AUDIO_STORAGE_KEY, false)
  const [isMusicEnabled, setIsMusicEnabled] = useLocalStorage(MUSIC_STORAGE_KEY, false)
  const [isTypingSoundEnabled, setIsTypingSoundEnabled] = useLocalStorage(
    TYPING_SOUND_STORAGE_KEY,
    true,
  )
  const [volume, setVolume] = useLocalStorage(VOLUME_STORAGE_KEY, 0.5)

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev)
  }

  const toggleMusic = () => {
    setIsMusicEnabled((prev) => !prev)
  }

  const toggleTypingSound = () => {
    setIsTypingSoundEnabled((prev) => !prev)
  }

  return (
    <AudioContext.Provider
      value={{
        isAudioEnabled,
        isMusicEnabled,
        isTypingSoundEnabled,
        volume,
        toggleAudio,
        toggleMusic,
        toggleTypingSound,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
