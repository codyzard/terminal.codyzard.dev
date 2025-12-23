'use client'

import {useMatrixAnimation} from './use-matrix-animation'

interface MatrixRainProps {
  className?: string
  fontSize?: number
  speed?: number
  opacity?: number
}

/**
 * Matrix rain effect component
 * Renders animated falling characters on a canvas
 */
export const MatrixRain = ({className = '', fontSize, speed, opacity}: MatrixRainProps) => {
  const canvasRef = useMatrixAnimation({fontSize, speed, opacity})

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />
}
