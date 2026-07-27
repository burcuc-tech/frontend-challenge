import { useEffect, useState } from 'react'
import { getWeatherForecast } from '../services'
import type { Location, WeatherForecast } from '../types'

type ForecastStatus = 'error' | 'loading' | 'success'

export function useWeatherForecast(location: Location) {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null)
  const [status, setStatus] = useState<ForecastStatus>('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadForecast() {
      setStatus('loading')

      try {
        const nextForecast = await getWeatherForecast(location, {
          signal: controller.signal,
        })

        setForecast(nextForecast)
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
    forecast,
    status,
  }
}
