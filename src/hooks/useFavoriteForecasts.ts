import { useEffect, useState } from 'react'
import { getFavoriteWeather } from '../services'
import type { FavoriteWeather, Location } from '../types'

type FavoriteForecasts = Record<number, FavoriteWeather>

export function useFavoriteForecasts(locations: Location[]) {
  const locationsKey = locations.map((location) => location.id).join(',')
  const [result, setResult] = useState<{
    forecasts: FavoriteForecasts
    locationsKey: string
  }>({
    forecasts: {},
    locationsKey: '',
  })

  useEffect(() => {
    if (locations.length === 0) {
      return
    }

    const controller = new AbortController()

    async function loadFavoriteForecasts() {
      const results = await Promise.allSettled(
        locations.map(async (location) => {
          return getFavoriteWeather(location, {
            signal: controller.signal,
          })
        }),
      )

      if (controller.signal.aborted) {
        return
      }

      const nextForecasts: FavoriteForecasts = {}

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          nextForecasts[result.value.location.id] = result.value
        }
      })

      setResult({
        forecasts: nextForecasts,
        locationsKey,
      })
    }

    void loadFavoriteForecasts()

    return () => controller.abort()
  }, [locations, locationsKey])

  if (locations.length === 0) {
    return {
      forecasts: {},
      isLoading: false,
    }
  }

  return {
    forecasts: result.locationsKey === locationsKey ? result.forecasts : {},
    isLoading: result.locationsKey !== locationsKey,
  }
}
