import type {Position, Direction} from './types'
import {BOARD_WIDTH, BOARD_HEIGHT, CELL_EMPTY} from './types'

export const getNextPosition = (position: Position, direction: Direction): Position => {
  switch (direction) {
    case 'UP':
      return {x: position.x, y: position.y - 1}
    case 'DOWN':
      return {x: position.x, y: position.y + 1}
    case 'LEFT':
      return {x: position.x - 1, y: position.y}
    case 'RIGHT':
      return {x: position.x + 1, y: position.y}
  }
}

export const isOutOfBounds = (position: Position): boolean => {
  return position.x < 0 || position.x >= BOARD_WIDTH || position.y < 0 || position.y >= BOARD_HEIGHT
}

export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export const generateRandomFood = (snake: Position[]): Position => {
  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
    }
  } while (snake.some((segment) => isSamePosition(segment, food)))
  return food
}

export const createEmptyBoard = (): string[][] => {
  return Array.from({length: BOARD_HEIGHT}, () =>
    Array.from({length: BOARD_WIDTH}, () => CELL_EMPTY),
  )
}

export const getDirectionFromKey = (key: string, currentDirection: Direction): Direction | null => {
  const keyLower = key.toLowerCase()

  if ((keyLower === 'arrowup' || keyLower === 'w') && currentDirection !== 'DOWN') {
    return 'UP'
  }
  if ((keyLower === 'arrowdown' || keyLower === 's') && currentDirection !== 'UP') {
    return 'DOWN'
  }
  if ((keyLower === 'arrowleft' || keyLower === 'a') && currentDirection !== 'RIGHT') {
    return 'LEFT'
  }
  if ((keyLower === 'arrowright' || keyLower === 'd') && currentDirection !== 'LEFT') {
    return 'RIGHT'
  }

  return null
}
