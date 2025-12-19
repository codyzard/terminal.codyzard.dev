'use client'
import {useEffect, useState, useCallback, useRef} from 'react'
import type {Command} from '../types'

// ============================================================================
// Types
// ============================================================================

type Position = {x: number; y: number}
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

// ============================================================================
// Constants
// ============================================================================

const BOARD_WIDTH = 20
const BOARD_HEIGHT = 15
const CELL_SIZE = 20
const GAME_SPEED = 150
const SCORE_PER_FOOD = 10

const INITIAL_SNAKE: Position[] = [{x: 10, y: 7}]
const INITIAL_FOOD: Position = {x: 15, y: 7}
const INITIAL_DIRECTION: Direction = 'RIGHT'

const CELL_EMPTY = '·'
const CELL_FOOD = '🍌'
const CELL_SNAKE_HEAD = '🐵'
const CELL_SNAKE_BODY = '🐒'

// ============================================================================
// Helper Functions
// ============================================================================

const getNextPosition = (position: Position, direction: Direction): Position => {
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

const isOutOfBounds = (position: Position): boolean => {
  return (
    position.x < 0 || position.x >= BOARD_WIDTH || position.y < 0 || position.y >= BOARD_HEIGHT
  )
}

const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

const generateRandomFood = (snake: Position[]): Position => {
  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
    }
  } while (snake.some((segment) => isSamePosition(segment, food)))
  return food
}

const createEmptyBoard = (): string[][] => {
  return Array.from({length: BOARD_HEIGHT}, () =>
    Array.from({length: BOARD_WIDTH}, () => CELL_EMPTY),
  )
}

const getDirectionFromKey = (key: string, currentDirection: Direction): Direction | null => {
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

// ============================================================================
// UI Components
// ============================================================================

const GameTitle = () => (
  <div className="mb-2 font-bold text-green-400 text-2xl text-center">🐍 SNAKE GAME 🐍</div>
)

const ScoreDisplay = ({score}: {score: number}) => (
  <div className="mb-2 text-center">
    <span className="text-cyan-400">Score: </span>
    <span className="font-bold text-yellow-400">{score}</span>
  </div>
)

const GameBoard = ({board}: {board: string[][]}) => {
  // Responsive cell size
  const cellSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : CELL_SIZE

  return (
    <div
      className="inline-block bg-black p-1 sm:p-2 border-2 border-green-400 max-w-full overflow-x-auto"
      style={{width: 'fit-content'}}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${cellSize}px)`,
          gap: '0',
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: cellSize < 20 ? '10px' : '14px',
              }}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  )
}

const GameOverScreen = ({score}: {score: number}) => (
  <div className="mt-4 text-center">
    <div className="font-bold text-red-500 text-2xl">GAME OVER!</div>
    <div className="mt-2 text-yellow-400">Final Score: {score}</div>
    <div className="mt-2 text-gray-400">Press SPACE or ENTER to restart</div>
  </div>
)

const StartScreen = () => (
  <div className="mt-4 text-center">
    <div className="text-yellow-400">Press SPACE or ENTER to start</div>
  </div>
)

const Instructions = () => (
  <div className="mt-4 text-gray-400 text-sm">
    <div>Controls: Arrow Keys or WASD</div>
    <div>Eat apples 🍌 to grow and score points!</div>
  </div>
)

// ============================================================================
// Main Game Component
// ============================================================================

const SnakeGame = () => {
  // Game state
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const directionRef = useRef<Direction>(INITIAL_DIRECTION)

  // Reset game to initial state
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
  }, [])

  // Keyboard input handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Handle restart
      if (!isPlaying || gameOver) {
        if (e.key === ' ' || e.key === 'Enter') {
          resetGame()
        }
        return
      }

      // Handle direction change
      const newDirection = getDirectionFromKey(e.key, directionRef.current)
      if (newDirection) {
        directionRef.current = newDirection
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, gameOver, resetGame])

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const newHead = getNextPosition(head, directionRef.current)

        // Check collisions
        if (
          isOutOfBounds(newHead) ||
          prevSnake.some((segment) => isSamePosition(segment, newHead))
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Create new snake with new head
        const newSnake = [newHead, ...prevSnake]

        // Check if food eaten
        if (isSamePosition(newHead, food)) {
          setScore((prev) => prev + SCORE_PER_FOOD)
          setFood(generateRandomFood(newSnake))
          return newSnake // Keep tail (grow)
        }

        // Normal movement (remove tail)
        newSnake.pop()
        return newSnake
      })
    }, GAME_SPEED)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, food])

  // Render board
  const renderBoard = useCallback(() => {
    const board = createEmptyBoard()

    // Place food
    board[food.y][food.x] = CELL_FOOD

    // Place snake
    snake.forEach((segment, index) => {
      board[segment.y][segment.x] = index === 0 ? CELL_SNAKE_HEAD : CELL_SNAKE_BODY
    })

    return board
  }, [snake, food])

  const board = renderBoard()

  return (
    <div className="flex flex-col justify-center items-center font-mono">
      <GameTitle />
      <ScoreDisplay score={score} />
      <GameBoard board={board} />
      {gameOver && <GameOverScreen score={score} />}
      {!isPlaying && !gameOver && <StartScreen />}
      {isPlaying && !gameOver && <Instructions />}
    </div>
  )
}

// ============================================================================
// Command Export
// ============================================================================

export const snakeCommand: Command = {
  name: 'snake',
  description: 'Play the classic Snake game in your terminal.',
  execute: () => ({
    content: <SnakeGame />,
  }),
}
