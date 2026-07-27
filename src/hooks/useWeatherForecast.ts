import { useEffect, useState } from 'react'
import { getWeatherForecast } from '../services'
import type { Location, WeatherForecast } from '../types'

type ForecastStatus = 'error' | 'loading' | 'success'

interface LoadedForecast {
  forecast: WeatherForecast
  location: Location
}

export function useWeatherForecast(location: Location) {
  const [loadedForecast, setLoadedForecast] = useState<LoadedForecast | null>(
    null,
  )
  const [status, setStatus] = useState<ForecastStatus>('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadForecast() {
      setStatus('loading')

      try {
        const nextForecast = await getWeatherForecast(location, {
          signal: controller.signal,
        })

        setLoadedForecast({
          forecast: nextForecast,
          location,
        })
        setStatus('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setStatus('error')
      }
    }

    void loadForecast()

    return () => controller.abort()
  }, [location])

  return {
    forecast: loadedForecast?.forecast ?? null,
    forecastLocation: loadedForecast?.location ?? null,
    status,
  }
}
