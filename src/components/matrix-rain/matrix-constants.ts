/**
 * Matrix rain effect constants
 */

/**
 * Characters used in the Matrix rain effect
 * Mix of Katakana characters and numbers
 */
export const MATRIX_CHARACTERS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'

/**
 * Matrix green color
 */
export const MATRIX_COLOR = '#00ff00'

/**
 * Default configuration for Matrix rain
 */
export const MATRIX_CONFIG = {
  fontSize: 14,
  speed: 33,
  opacity: 0.05,
  fadeOpacity: 0.05,
  dropResetProbability: 0.975,
  initialDropOffset: -100,
} as const
