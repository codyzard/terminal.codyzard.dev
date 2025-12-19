export type Position = {x: number; y: number}
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export const BOARD_WIDTH = 20
export const BOARD_HEIGHT = 15
export const CELL_SIZE = 20
export const GAME_SPEED = 150
export const SCORE_PER_FOOD = 10

export const INITIAL_SNAKE: Position[] = [{x: 10, y: 7}]
export const INITIAL_FOOD: Position = {x: 15, y: 7}
export const INITIAL_DIRECTION: Direction = 'RIGHT'

export const CELL_EMPTY = '·'
export const CELL_FOOD = '🍌'
export const CELL_SNAKE_HEAD = '🐵'
export const CELL_SNAKE_BODY = '🐒'
