'use client'
import {useEffect, useState} from 'react'
import {COFFEE_FRAMES} from '../constants'

export const useCoffeeAnimation = (onComplete: () => void) => {
  const [frameIndex, setFrameIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (frameIndex < COFFEE_FRAMES.length - 1) {
      const timer = setTimeout(() => {
        setFrameIndex(frameIndex + 1)
      }, 700)
      return () => clearTimeout(timer)
    } else if (!isComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsComplete(true)
      onComplete()
    }
  }, [frameIndex, isComplete, onComplete])

  return {
    frameIndex,
    isComplete,
  }
}
