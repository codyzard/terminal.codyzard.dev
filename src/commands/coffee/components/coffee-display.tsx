'use client'
import {useEffect, useRef} from 'react'
import {useTerminalScroll} from '@/src/contexts/terminal-scroll-context'
import type {CoffeeStrength, CoffeeTemp, CoffeeType} from '../types'
import {ACHIEVEMENTS, COFFEE_FRAMES, COFFEE_TYPES, FRAME_LABELS} from '../constants'
import {useCoffeeAnimation} from '../hooks/use-coffee-animation'
import {useCoffeeStats} from '../hooks/use-coffee-stats'
import {calculateCaffeine, getRandomQuote} from '../utils'

type CoffeeDisplayProps = {
  coffeeType: CoffeeType
  strength: CoffeeStrength
  temp: CoffeeTemp
}

export const CoffeeDisplay = ({coffeeType, strength, temp}: CoffeeDisplayProps) => {
  const {stats, newAchievements, updateStats} = useCoffeeStats(coffeeType, strength, temp)
  const {requestScroll} = useTerminalScroll()
  const {frameIndex, isComplete} = useCoffeeAnimation(() => {
    updateStats()
    requestScroll()
  })
  const bottomRef = useRef<HTMLDivElement>(null)

  const config = COFFEE_TYPES[coffeeType]
  const caffeine = calculateCaffeine(coffeeType, strength, temp)

  // Auto-scroll during animation
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'})
  }, [frameIndex, isComplete])

  const getMessage = () => {
    const parts = []
    if (temp === 'iced') parts.push('🧊 Iced')
    if (strength === 'strong') parts.push('💪 Extra Strong')
    if (strength === 'decaf') parts.push('😴 Decaf')
    parts.push(config.name)
    return parts.join(' ')
  }

  const quote = getRandomQuote()

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='text-lg font-bold text-amber-400'>
        {config.emoji} Brewing your {getMessage()}...
      </div>

      {/* Animation */}
      <div className='flex items-center gap-4'>
        <pre className='text-yellow-600 dark:text-yellow-400'>{COFFEE_FRAMES[frameIndex]}</pre>
        <div className='text-sm text-gray-400'>{FRAME_LABELS[frameIndex]}</div>
      </div>

      {/* Progress bar */}
      {!isComplete && (
        <div className='w-full rounded-full bg-gray-700'>
          <div
            className='h-2 rounded-full bg-linear-to-r from-yellow-600 to-amber-500 transition-all duration-300'
            style={{width: `${((frameIndex + 1) / COFFEE_FRAMES.length) * 100}%`}}
          />
        </div>
      )}

      {/* Completion */}
      {isComplete && (
        <div className='space-y-3'>
          <div className='text-green-400'>✅ {getMessage()} ready!</div>

          {/* Quote */}
          <div className='rounded border border-amber-500/50 bg-amber-900/20 p-3 text-sm text-gray-300 italic'>
            💭 &quot;{quote}&quot;
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div className='rounded bg-green-900/30 p-2'>
              <div className='text-gray-400'>Caffeine</div>
              <div className='text-green-400'>+{caffeine}mg ⚡</div>
            </div>
            <div className='rounded bg-blue-900/30 p-2'>
              <div className='text-gray-400'>Total Brews</div>
              <div className='text-blue-400'>{stats.totalCoffees + 1} ☕</div>
            </div>
          </div>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className='rounded border border-yellow-500 bg-yellow-900/20 p-3'>
              <div className='mb-2 font-bold text-yellow-400'>🎉 Achievement Unlocked!</div>
              {newAchievements.map((id) => {
                const achievement = ACHIEVEMENTS.find((a) => a.id === id)
                return (
                  <div key={id} className='text-sm text-yellow-300'>
                    {achievement?.name}
                  </div>
                )
              })}
            </div>
          )}

          {/* Caffeine Warning */}
          {stats.currentCaffeine + caffeine > 400 && (
            <div className='rounded border border-red-500/50 bg-red-900/20 p-2 text-sm text-red-400'>
              ⚠️ High caffeine level! Maybe switch to water? 💧
            </div>
          )}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
