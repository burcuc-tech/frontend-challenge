import { useEffect, useState } from 'react'
import { getWeatherForecast } from '../services'
import type { Location, WeatherForecast } from '../types'

type ForecastStatus = 'error' | 'loading' | 'success'

const FORECAST_REFRESH_INTERVAL_MS = 15 * 60_000
const REFRESH_BOUNDARY_DELAY_MS = 5_000

interface LoadedForecast {
  forecast: WeatherForecast
  location: Location
}

export function useWeatherForecast(location: Location) {
  const [loadedForecast, setLoadedForecast] = useState<LoadedForecast | null>(
    null,
  )
  const [requestVersion, setRequestVersion] = useState(0)
  const [status, setStatus] = useState<ForecastStatus>('loading')

  useEffect(() => {
    let intervalId: number | undefined
    const refreshForecast = () => {
      setRequestVersion((version) => version + 1)
    }
    const millisecondsUntilNextBoundary =
      FORECAST_REFRESH_INTERVAL_MS
      - (Date.now() % FORECAST_REFRESH_INTERVAL_MS)
      + REFRESH_BOUNDARY_DELAY_MS
    const timeoutId = window.setTimeout(() => {
      refreshForecast()
      intervalId = window.setInterval(
        refreshForecast,
        FORECAST_REFRESH_INTERVAL_MS,
      )
    }, millisecondsUntilNextBoundary)

    return () => {
      window.clearTimeout(timeoutId)

      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

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
  }, [location, requestVersion])

  return {
    forecast: loadedForecast?.forecast ?? null,
    forecastLocation: loadedForecast?.location ?? null,
    retryForecast: () => setRequestVersion((version) => version + 1),
    status,
  }
}
