import {useEffect, useRef} from 'react'
import {MATRIX_CHARACTERS, MATRIX_COLOR, MATRIX_CONFIG} from './matrix-constants'

interface UseMatrixAnimationOptions {
  fontSize?: number
  speed?: number
  opacity?: number
}

/**
 * Custom hook for Matrix rain animation
 * Handles canvas setup, animation loop, and cleanup
 */
export const useMatrixAnimation = ({
  fontSize = MATRIX_CONFIG.fontSize,
  speed = MATRIX_CONFIG.speed,
  opacity = MATRIX_CONFIG.opacity,
}: UseMatrixAnimationOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    // Initial resize with a small delay to ensure parent is rendered
    setTimeout(resizeCanvas, 10)
    resizeCanvas()

    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * MATRIX_CONFIG.initialDropOffset
    }

    let animationId: number

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = MATRIX_COLOR
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = MATRIX_CHARACTERS.charAt(Math.floor(Math.random() * MATRIX_CHARACTERS.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > MATRIX_CONFIG.dropResetProbability) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    const timeoutId = setTimeout(draw, 100) // Delay start slightly

    const handleResize = () => {
      resizeCanvas()
      // Reinitialize drops on resize
      const newColumns = Math.floor(canvas.width / fontSize)
      drops.length = newColumns
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = Math.random() * MATRIX_CONFIG.initialDropOffset
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [fontSize, speed, opacity])

  return canvasRef
}
