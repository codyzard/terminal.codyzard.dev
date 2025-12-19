'use client'
import {useState, useEffect, type ReactNode, isValidElement, cloneElement} from 'react'

interface TypingAnimationProps {
  children: ReactNode
  speed?: number // Characters per second (for text) or elements per second (for JSX)
  enabled?: boolean
  onComplete?: () => void
}

/**
 * Extract text content from React elements recursively
 */
const extractTextFromReactNode = (node: ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''

  if (isValidElement(node)) {
    const children = (node.props as {children?: ReactNode}).children
    if (!children) return ''
    if (typeof children === 'string') return children
    if (Array.isArray(children)) {
      return children.map(extractTextFromReactNode).join('')
    }
    return extractTextFromReactNode(children)
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('')
  }

  return ''
}

/**
 * Component that animates text appearing character by character
 * Like a terminal typing effect
 * - Plain text: Character-by-character typing
 * - React elements: Progressive reveal with typing effect
 */
export const TypingAnimation = ({
  children,
  speed = 50,
  enabled = true,
  onComplete,
}: TypingAnimationProps) => {
  const [displayedLength, setDisplayedLength] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Extract all text content for calculating typing duration
  const fullText = extractTextFromReactNode(children)
  const isString = typeof children === 'string'

  useEffect(() => {
    // If animation is disabled, show everything immediately
    if (!enabled) {
      setDisplayedLength(fullText.length)
      setIsComplete(true)
      onComplete?.()
      return
    }

    // Reset state
    setDisplayedLength(0)
    setIsComplete(false)

    // Animate character by character
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentIndex++
        setDisplayedLength(currentIndex)
      } else {
        setIsComplete(true)
        onComplete?.()
        clearInterval(interval)
      }
    }, 1000 / speed)

    return () => clearInterval(interval)
  }, [fullText.length, speed, enabled, onComplete])

  // Animation disabled - show immediately
  if (!enabled) {
    return <>{children}</>
  }

  // Plain text - simple character slicing
  if (isString) {
    return (
      <span>
        {children.slice(0, displayedLength)}
        {!isComplete && <span className="animate-pulse">▋</span>}
      </span>
    )
  }

  // React elements - progressive reveal
  return (
    <span>
      <ProgressiveReveal currentLength={displayedLength}>{children}</ProgressiveReveal>
      {!isComplete && <span className="ml-1 animate-pulse">▋</span>}
    </span>
  )
}

/**
 * Helper component that progressively reveals React elements based on text length
 */
const ProgressiveReveal = ({
  children,
  currentLength,
}: {
  children: ReactNode
  currentLength: number
}) => {
  const processNode = (node: ReactNode, charCount: number): {node: ReactNode; newCount: number} => {
    if (!node) return {node: null, newCount: charCount}

    // String node
    if (typeof node === 'string') {
      const nodeLength = node.length
      const endPos = charCount + nodeLength

      if (currentLength <= charCount) {
        // Haven't reached this text yet
        return {node: null, newCount: charCount}
      } else if (currentLength >= endPos) {
        // Show full text
        return {node, newCount: endPos}
      } else {
        // Show partial text
        const visibleLength = currentLength - charCount
        return {node: node.slice(0, visibleLength), newCount: currentLength}
      }
    }

    // Number node
    if (typeof node === 'number') {
      const str = String(node)
      return processNode(str, charCount)
    }

    // React element
    if (isValidElement(node)) {
      const children = (node.props as {children?: ReactNode}).children

      if (!children) {
        return {node: currentLength > charCount ? node : null, newCount: charCount}
      }

      let currentCount = charCount
      const processedChildren = Array.isArray(children)
        ? children.map((child, index) => {
            const result = processNode(child, currentCount)
            currentCount = result.newCount
            return <span key={index}>{result.node}</span>
          })
        : (() => {
            const result = processNode(children, currentCount)
            currentCount = result.newCount
            return result.node
          })()

      // Clone element with processed children
      return {node: cloneElement(node, {}, processedChildren), newCount: currentCount}
    }

    // Array of nodes
    if (Array.isArray(node)) {
      let currentCount = charCount
      const processedNodes = node.map((child, index) => {
        const result = processNode(child, currentCount)
        currentCount = result.newCount
        return <span key={index}>{result.node}</span>
      })
      return {node: <>{processedNodes}</>, newCount: currentCount}
    }

    return {node: null, newCount: charCount}
  }

  const {node} = processNode(children, 0)
  return <>{node}</>
}
