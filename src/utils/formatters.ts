import type { TemperatureUnit } from '../types'

const DEFAULT_LOCALE = 'en-US'

export function convertTemperature(
  valueInCelsius: number,
  unit: TemperatureUnit,
): number {
  return unit === 'fahrenheit'
    ? (valueInCelsius * 9) / 5 + 32
    : valueInCelsius
}

export function formatTemperature(
  valueInCelsius: number,
  unit: TemperatureUnit = 'celsius',
  includeUnit = false,
): string {
  const value = Math.round(convertTemperature(valueInCelsius, unit))
  const unitLabel = unit === 'fahrenheit' ? 'F' : 'C'

  return `${value}°${includeUnit ? unitLabel : ''}`
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions,
  locale = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}

export function formatLocation(name: string, country: string): string {
  return [name, country].filter(Boolean).join(', ')
}

export function formatTime(value: string, locale = DEFAULT_LOCALE): string {
  return formatDate(value, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }, locale)
}

export function formatVisibility(valueInMeters: number): string {
  const valueInKilometers = valueInMeters / 1000
  return `${Number(valueInKilometers.toFixed(1))} km`
}

export function formatWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const index = Math.round(normalizedDegrees / 45) % directions.length

  return directions[index]
}

export function getUvIndexLabel(value: number): string {
  if (value <= 2) return 'Low'
  if (value <= 5) return 'Moderate'
  if (value <= 7) return 'High'
  if (value <= 10) return 'Very high'
  return 'Extreme'
}
