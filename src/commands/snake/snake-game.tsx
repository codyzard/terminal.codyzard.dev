'use client'
import {useEffect, useState, useCallback, useRef} from 'react'
import type {Position, Direction} from './types'
import {
  INITIAL_SNAKE,
  INITIAL_FOOD,
  INITIAL_DIRECTION,
  GAME_SPEED,
  SCORE_PER_FOOD,
  CELL_FOOD,
  CELL_SNAKE_HEAD,
  CELL_SNAKE_BODY,
} from './types'
import {
  getNextPosition,
  isOutOfBounds,
  isSamePosition,
  generateRandomFood,
  createEmptyBoard,
  getDirectionFromKey,
} from './game-logic'
import {GameTitle} from './components/game-title'
import {ScoreDisplay} from './components/score-display'
import {GameBoard} from './components/game-board'
import {GameOverScreen} from './components/game-over-screen'
import {StartScreen} from './components/start-screen'
import {Instructions} from './components/instructions'

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const directionRef = useRef<Direction>(INITIAL_DIRECTION)

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) {
        if (e.key === ' ' || e.key === 'Enter') {
          resetGame()
        }
        return
      }

      const newDirection = getDirectionFromKey(e.key, directionRef.current)
      if (newDirection) {
        directionRef.current = newDirection
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, gameOver, resetGame])

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const newHead = getNextPosition(head, directionRef.current)

        if (
          isOutOfBounds(newHead) ||
          prevSnake.some((segment) => isSamePosition(segment, newHead))
        ) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        if (isSamePosition(newHead, food)) {
          setScore((prev) => prev + SCORE_PER_FOOD)
          setFood(generateRandomFood(newSnake))
          return newSnake
        }

        newSnake.pop()
        return newSnake
      })
    }, GAME_SPEED)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, food])

  const renderBoard = useCallback(() => {
    const board = createEmptyBoard()

    board[food.y][food.x] = CELL_FOOD

    snake.forEach((segment, index) => {
      board[segment.y][segment.x] = index === 0 ? CELL_SNAKE_HEAD : CELL_SNAKE_BODY
    })

    return board
  }, [snake, food])

  const board = renderBoard()

  return (
    <div className="flex flex-col items-center justify-center font-mono">
      <GameTitle />
      <ScoreDisplay score={score} />
      <GameBoard board={board} />
      {gameOver && <GameOverScreen score={score} />}
      {!isPlaying && !gameOver && <StartScreen />}
      {isPlaying && !gameOver && <Instructions />}
    </div>
  )
}
