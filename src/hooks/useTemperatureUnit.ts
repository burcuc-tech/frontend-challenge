import { useEffect, useState } from 'react'
import type { TemperatureUnit } from '../types'

const TEMPERATURE_UNIT_STORAGE_KEY = 'weather-forecast:temperature-unit'

function loadTemperatureUnit(): TemperatureUnit {
  try {
    const storedUnit = window.localStorage.getItem(
      TEMPERATURE_UNIT_STORAGE_KEY,
    )

    return storedUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius'
  } catch {
    return 'celsius'
  }
}

export function useTemperatureUnit() {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(
    loadTemperatureUnit,
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(
        TEMPERATURE_UNIT_STORAGE_KEY,
        temperatureUnit,
      )
    } catch {
      // The selected unit remains available for the current session.
    }
  }, [temperatureUnit])

  return {
    setTemperatureUnit,
    temperatureUnit,
  }
}
