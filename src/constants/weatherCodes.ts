import type { WeatherCondition } from '../types'

const UNKNOWN_CONDITION: WeatherCondition = {
  label: 'Unknown conditions',
}

export const WEATHER_CONDITIONS: Record<number, WeatherCondition> = {
  0: { label: 'Clear sky' },
  1: { label: 'Mainly clear' },
  2: { label: 'Partly cloudy' },
  3: { label: 'Overcast' },
  45: { label: 'Fog' },
  48: { label: 'Rime fog' },
  51: { label: 'Light drizzle' },
  53: { label: 'Drizzle' },
  55: { label: 'Heavy drizzle' },
  56: { label: 'Freezing drizzle' },
  57: { label: 'Heavy freezing drizzle' },
  61: { label: 'Light rain' },
  63: { label: 'Rain' },
  65: { label: 'Heavy rain' },
  66: { label: 'Freezing rain' },
  67: { label: 'Heavy freezing rain' },
  71: { label: 'Light snow' },
  73: { label: 'Snow' },
  75: { label: 'Heavy snow' },
  77: { label: 'Snow grains' },
  80: { label: 'Light rain showers' },
  81: { label: 'Rain showers' },
  82: { label: 'Heavy rain showers' },
  85: { label: 'Light snow showers' },
  86: { label: 'Heavy snow showers' },
  95: { label: 'Thunderstorm' },
  96: { label: 'Thunderstorm with hail' },
  99: { label: 'Heavy thunderstorm with hail' },
}

export function getWeatherCondition(code: number): WeatherCondition {
  return WEATHER_CONDITIONS[code] ?? UNKNOWN_CONDITION
}
