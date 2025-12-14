'use client'
import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string | JSX.Element
  delay?: number // Độ trễ giữa các ký tự (ms)
  onTypingComplete?: () => void
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 20, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (typeof text !== 'string') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedText('')

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onTypingComplete && onTypingComplete()
      return
    }

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      // Hoàn thành gõ chữ
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onTypingComplete && onTypingComplete()
    }
  }, [index, text, delay, onTypingComplete])

  if (typeof text !== 'string') {
    return <>{text}</>
  }

  return <>{displayedText}</>
}

export default Typewriter
