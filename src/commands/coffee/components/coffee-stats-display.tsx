'use client'
import type {CoffeeStats, CoffeeType} from '../types'
import {ACHIEVEMENTS, COFFEE_TYPES, STORAGE_KEY} from '../constants'
import {useLocalStorage} from '@/src/hooks/use-local-storage'

const getDefaultStats = (): CoffeeStats => ({
  totalCoffees: 0,
  currentCaffeine: 0,
  achievements: [],
  lastBrew: 0,
  favoriteType: {},
})

export const CoffeeStatsDisplay = () => {
  const [stats] = useLocalStorage<CoffeeStats>(STORAGE_KEY, getDefaultStats())

  const favoriteType = Object.entries(stats.favoriteType).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold text-amber-400">☕ Coffee Statistics</div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded bg-gray-800 p-3">
          <div className="text-sm text-gray-400">Total Brews</div>
          <div className="text-2xl font-bold text-green-400">{stats.totalCoffees}</div>
        </div>
        <div className="rounded bg-gray-800 p-3">
          <div className="text-sm text-gray-400">Current Caffeine</div>
          <div className="text-2xl font-bold text-yellow-400">{stats.currentCaffeine}mg</div>
        </div>
      </div>

      {favoriteType && (
        <div className="rounded bg-gray-800 p-3">
          <div className="text-sm text-gray-400">Favorite</div>
          <div className="text-lg text-cyan-400">
            {COFFEE_TYPES[favoriteType[0] as CoffeeType].emoji}{' '}
            {COFFEE_TYPES[favoriteType[0] as CoffeeType].name} ({favoriteType[1]}x)
          </div>
        </div>
      )}

      <div>
        <div className="mb-2 text-sm font-bold text-gray-400">
          Achievements ({stats.achievements.length}/{ACHIEVEMENTS.length})
        </div>
        <div className="space-y-1">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded p-2 ${
                stats.achievements.includes(achievement.id)
                  ? 'bg-yellow-900/30 text-yellow-400'
                  : 'bg-gray-800 text-gray-600'
              }`}
            >
              {achievement.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
