import {describe, it, expect} from 'vitest'
import {
  getNextPosition,
  isOutOfBounds,
  isSamePosition,
  generateRandomFood,
  createEmptyBoard,
  getDirectionFromKey,
} from './game-logic'
import type {Position} from './types'
import {BOARD_WIDTH, BOARD_HEIGHT, CELL_EMPTY} from './types'

describe('Snake Game Logic', () => {
  describe('getNextPosition', () => {
    const startPos: Position = {x: 5, y: 5}

    it('should move UP correctly', () => {
      const next = getNextPosition(startPos, 'UP')
      expect(next).toEqual({x: 5, y: 4})
    })

    it('should move DOWN correctly', () => {
      const next = getNextPosition(startPos, 'DOWN')
      expect(next).toEqual({x: 5, y: 6})
    })

    it('should move LEFT correctly', () => {
      const next = getNextPosition(startPos, 'LEFT')
      expect(next).toEqual({x: 4, y: 5})
    })

    it('should move RIGHT correctly', () => {
      const next = getNextPosition(startPos, 'RIGHT')
      expect(next).toEqual({x: 6, y: 5})
    })

    it('should handle edge positions', () => {
      const topLeft: Position = {x: 0, y: 0}
      expect(getNextPosition(topLeft, 'UP')).toEqual({x: 0, y: -1})
      expect(getNextPosition(topLeft, 'LEFT')).toEqual({x: -1, y: 0})
    })
  })

  describe('isOutOfBounds', () => {
    it('should return false for position within bounds', () => {
      expect(isOutOfBounds({x: 0, y: 0})).toBe(false)
      expect(isOutOfBounds({x: 10, y: 7})).toBe(false)
      expect(isOutOfBounds({x: BOARD_WIDTH - 1, y: BOARD_HEIGHT - 1})).toBe(false)
    })

    it('should return true for negative x coordinate', () => {
      expect(isOutOfBounds({x: -1, y: 5})).toBe(true)
    })

    it('should return true for negative y coordinate', () => {
      expect(isOutOfBounds({x: 5, y: -1})).toBe(true)
    })

    it('should return true for x coordinate >= BOARD_WIDTH', () => {
      expect(isOutOfBounds({x: BOARD_WIDTH, y: 5})).toBe(true)
      expect(isOutOfBounds({x: BOARD_WIDTH + 1, y: 5})).toBe(true)
    })

    it('should return true for y coordinate >= BOARD_HEIGHT', () => {
      expect(isOutOfBounds({x: 5, y: BOARD_HEIGHT})).toBe(true)
      expect(isOutOfBounds({x: 5, y: BOARD_HEIGHT + 1})).toBe(true)
    })

    it('should handle corner cases', () => {
      expect(isOutOfBounds({x: -1, y: -1})).toBe(true)
      expect(isOutOfBounds({x: BOARD_WIDTH, y: BOARD_HEIGHT})).toBe(true)
    })
  })

  describe('isSamePosition', () => {
    it('should return true for identical positions', () => {
      const pos1: Position = {x: 5, y: 5}
      const pos2: Position = {x: 5, y: 5}
      expect(isSamePosition(pos1, pos2)).toBe(true)
    })

    it('should return false for different x coordinates', () => {
      const pos1: Position = {x: 5, y: 5}
      const pos2: Position = {x: 6, y: 5}
      expect(isSamePosition(pos1, pos2)).toBe(false)
    })

    it('should return false for different y coordinates', () => {
      const pos1: Position = {x: 5, y: 5}
      const pos2: Position = {x: 5, y: 6}
      expect(isSamePosition(pos1, pos2)).toBe(false)
    })

    it('should return false for completely different positions', () => {
      const pos1: Position = {x: 5, y: 5}
      const pos2: Position = {x: 10, y: 10}
      expect(isSamePosition(pos1, pos2)).toBe(false)
    })

    it('should handle edge positions', () => {
      expect(isSamePosition({x: 0, y: 0}, {x: 0, y: 0})).toBe(true)
      expect(isSamePosition({x: 0, y: 0}, {x: 0, y: 1})).toBe(false)
    })
  })

  describe('generateRandomFood', () => {
    it('should generate food within board bounds', () => {
      const snake: Position[] = [{x: 0, y: 0}]
      const food = generateRandomFood(snake)
      expect(food.x).toBeGreaterThanOrEqual(0)
      expect(food.x).toBeLessThan(BOARD_WIDTH)
      expect(food.y).toBeGreaterThanOrEqual(0)
      expect(food.y).toBeLessThan(BOARD_HEIGHT)
    })

    it('should not generate food on snake position', () => {
      const snake: Position[] = [{x: 5, y: 5}]
      const food = generateRandomFood(snake)
      expect(isSamePosition(food, snake[0])).toBe(false)
    })

    it('should not generate food on any snake segment', () => {
      const snake: Position[] = [
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5},
      ]
      const food = generateRandomFood(snake)
      for (const segment of snake) {
        expect(isSamePosition(food, segment)).toBe(false)
      }
    })

    it('should generate food when snake is large', () => {
      // Create a snake that occupies half the board
      const snake: Position[] = []
      for (let i = 0; i < BOARD_WIDTH * BOARD_HEIGHT * 0.5; i++) {
        snake.push({x: i % BOARD_WIDTH, y: Math.floor(i / BOARD_WIDTH)})
      }
      const food = generateRandomFood(snake)
      expect(food.x).toBeGreaterThanOrEqual(0)
      expect(food.y).toBeGreaterThanOrEqual(0)
      for (const segment of snake) {
        expect(isSamePosition(food, segment)).toBe(false)
      }
    })
  })

  describe('createEmptyBoard', () => {
    it('should create board with correct dimensions', () => {
      const board = createEmptyBoard()
      expect(board).toHaveLength(BOARD_HEIGHT)
      expect(board[0]).toHaveLength(BOARD_WIDTH)
    })

    it('should initialize all cells with CELL_EMPTY', () => {
      const board = createEmptyBoard()
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          expect(board[y][x]).toBe(CELL_EMPTY)
        }
      }
    })

    it('should create independent arrays', () => {
      const board = createEmptyBoard()
      board[0][0] = 'X'
      expect(board[0][1]).toBe(CELL_EMPTY)
      expect(board[1][0]).toBe(CELL_EMPTY)
    })
  })

  describe('getDirectionFromKey', () => {
    describe('Arrow keys', () => {
      it('should return UP for ArrowUp when not moving DOWN', () => {
        expect(getDirectionFromKey('ArrowUp', 'LEFT')).toBe('UP')
        expect(getDirectionFromKey('ArrowUp', 'RIGHT')).toBe('UP')
        expect(getDirectionFromKey('ArrowUp', 'UP')).toBe('UP')
      })

      it('should return null for ArrowUp when moving DOWN', () => {
        expect(getDirectionFromKey('ArrowUp', 'DOWN')).toBeNull()
      })

      it('should return DOWN for ArrowDown when not moving UP', () => {
        expect(getDirectionFromKey('ArrowDown', 'LEFT')).toBe('DOWN')
        expect(getDirectionFromKey('ArrowDown', 'RIGHT')).toBe('DOWN')
        expect(getDirectionFromKey('ArrowDown', 'DOWN')).toBe('DOWN')
      })

      it('should return null for ArrowDown when moving UP', () => {
        expect(getDirectionFromKey('ArrowDown', 'UP')).toBeNull()
      })

      it('should return LEFT for ArrowLeft when not moving RIGHT', () => {
        expect(getDirectionFromKey('ArrowLeft', 'UP')).toBe('LEFT')
        expect(getDirectionFromKey('ArrowLeft', 'DOWN')).toBe('LEFT')
        expect(getDirectionFromKey('ArrowLeft', 'LEFT')).toBe('LEFT')
      })

      it('should return null for ArrowLeft when moving RIGHT', () => {
        expect(getDirectionFromKey('ArrowLeft', 'RIGHT')).toBeNull()
      })

      it('should return RIGHT for ArrowRight when not moving LEFT', () => {
        expect(getDirectionFromKey('ArrowRight', 'UP')).toBe('RIGHT')
        expect(getDirectionFromKey('ArrowRight', 'DOWN')).toBe('RIGHT')
        expect(getDirectionFromKey('ArrowRight', 'RIGHT')).toBe('RIGHT')
      })

      it('should return null for ArrowRight when moving LEFT', () => {
        expect(getDirectionFromKey('ArrowRight', 'LEFT')).toBeNull()
      })
    })

    describe('WASD keys', () => {
      it('should return UP for W when not moving DOWN', () => {
        expect(getDirectionFromKey('w', 'LEFT')).toBe('UP')
        expect(getDirectionFromKey('W', 'RIGHT')).toBe('UP')
      })

      it('should return null for W when moving DOWN', () => {
        expect(getDirectionFromKey('w', 'DOWN')).toBeNull()
      })

      it('should return DOWN for S when not moving UP', () => {
        expect(getDirectionFromKey('s', 'LEFT')).toBe('DOWN')
        expect(getDirectionFromKey('S', 'RIGHT')).toBe('DOWN')
      })

      it('should return null for S when moving UP', () => {
        expect(getDirectionFromKey('s', 'UP')).toBeNull()
      })

      it('should return LEFT for A when not moving RIGHT', () => {
        expect(getDirectionFromKey('a', 'UP')).toBe('LEFT')
        expect(getDirectionFromKey('A', 'DOWN')).toBe('LEFT')
      })

      it('should return null for A when moving RIGHT', () => {
        expect(getDirectionFromKey('a', 'RIGHT')).toBeNull()
      })

      it('should return RIGHT for D when not moving LEFT', () => {
        expect(getDirectionFromKey('d', 'UP')).toBe('RIGHT')
        expect(getDirectionFromKey('D', 'DOWN')).toBe('RIGHT')
      })

      it('should return null for D when moving LEFT', () => {
        expect(getDirectionFromKey('d', 'LEFT')).toBeNull()
      })
    })

    describe('Case sensitivity', () => {
      it('should handle lowercase keys', () => {
        expect(getDirectionFromKey('arrowup', 'LEFT')).toBe('UP')
        expect(getDirectionFromKey('arrowdown', 'LEFT')).toBe('DOWN')
      })

      it('should handle uppercase WASD keys', () => {
        expect(getDirectionFromKey('W', 'LEFT')).toBe('UP')
        expect(getDirectionFromKey('A', 'UP')).toBe('LEFT')
        expect(getDirectionFromKey('S', 'LEFT')).toBe('DOWN')
        expect(getDirectionFromKey('D', 'UP')).toBe('RIGHT')
      })
    })

    describe('Invalid keys', () => {
      it('should return null for unrecognized keys', () => {
        expect(getDirectionFromKey('x', 'UP')).toBeNull()
        expect(getDirectionFromKey('Space', 'UP')).toBeNull()
        expect(getDirectionFromKey('Enter', 'UP')).toBeNull()
        expect(getDirectionFromKey('1', 'UP')).toBeNull()
      })
    })
  })
})
