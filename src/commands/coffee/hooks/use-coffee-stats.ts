'use client'
import {useCallback, useState} from 'react'
import type {CoffeeStats, CoffeeStrength, CoffeeTemp, CoffeeType} from '../types'
import {ACHIEVEMENTS, STORAGE_KEY} from '../constants'
import {useLocalStorage} from '@/src/hooks/use-local-storage'
import {calculateCaffeine} from '../utils'

const getDefaultStats = (): CoffeeStats => ({
  totalCoffees: 0,
  currentCaffeine: 0,
  achievements: [],
  lastBrew: 0,
  favoriteType: {},
})

export const useCoffeeStats = (
  coffeeType: CoffeeType,
  strength: CoffeeStrength,
  temp: CoffeeTemp,
) => {
  const [stats, setStats] = useLocalStorage<CoffeeStats>(STORAGE_KEY, getDefaultStats())
  const [newAchievements, setNewAchievements] = useState<string[]>([])

  const updateStats = useCallback(() => {
    const newStats: CoffeeStats = {
      ...stats,
      totalCoffees: stats.totalCoffees + 1,
      currentCaffeine: stats.currentCaffeine + calculateCaffeine(coffeeType, strength, temp),
      lastBrew: Date.now(),
      favoriteType: {
        ...stats.favoriteType,
        [coffeeType]: (stats.favoriteType[coffeeType] || 0) + 1,
      },
    }

    // Check for new achievements
    const unlockedAchievements = ACHIEVEMENTS.filter(
      (achievement) =>
        achievement.condition(newStats) && !newStats.achievements.includes(achievement.id),
    ).map((a) => a.id)

    if (unlockedAchievements.length > 0) {
      newStats.achievements = [...newStats.achievements, ...unlockedAchievements]
      setNewAchievements(unlockedAchievements)
    }

    setStats(newStats)
  }, [stats, coffeeType, strength, temp, setStats])

  return {
    stats,
    newAchievements,
    updateStats,
  }
}
